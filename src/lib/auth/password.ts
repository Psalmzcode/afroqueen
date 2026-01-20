// // lib/auth/password.ts
// import * as argon2 from 'argon2'

// /**
//  * Argon2 configuration optimized for security vs performance
//  * 
//  * Memory Cost (64MB): Memory-hard to prevent GPU attacks
//  * Time Cost (3): Number of iterations
//  * Parallelism (4): Uses multiple threads
//  * Type (argon2id): Hybrid version (resistant to both side-channel and timing attacks)
//  */
// const ARGON2_CONFIG = {
//   type: argon2.argon2id as const,
//   memoryCost: 65536,    // 64MB - memory usage per hash
//   timeCost: 3,          // 3 iterations
//   parallelism: 4,       // 4 threads
//   hashLength: 32,       // 32 bytes = 256 bits output
//   saltLength: 16,       // 16 bytes salt
// }

// /**
//  * Hash a password using Argon2
//  * @param password - Plain text password
//  * @returns Promise<string> - Hashed password
//  */
// export async function hashPassword(password: string): Promise<string> {
//   try {
//     if (!password || password.trim().length === 0) {
//       throw new Error('Password cannot be empty')
//     }

//     if (password.length < 8) {
//       throw new Error('Password must be at least 8 characters long')
//     }

//     return await argon2.hash(password, ARGON2_CONFIG)
//   } catch (error) {
//     console.error('❌ Password hashing failed:', error)
//     throw new Error('Could not hash password. Please try again.')
//   }
// }

// /**
//  * Verify a password against its hash
//  * @param hash - Hashed password from database
//  * @param password - Plain text password to verify
//  * @returns Promise<boolean> - True if password matches
//  */
// export async function verifyPassword(
//   hash: string, 
//   password: string
// ): Promise<boolean> {
//   try {
//     if (!hash || !password) {
//       return false
//     }

//     // Check if hash looks like Argon2 hash
//     if (!hash.startsWith('$argon2')) {
//       console.warn('⚠️ Non-Argon2 hash detected. Consider migrating passwords.')
//       return false
//     }

//     return await argon2.verify(hash, password)
//   } catch (error) {
//     console.error('❌ Password verification failed:', error)
//     return false
//   }
// }

// /**
//  * Check if password needs rehashing (if config changes in future)
//  * @param hash - Existing password hash
//  * @returns boolean - True if hash needs rehashing
//  */
// export function needsRehash(hash: string): boolean {
//   // Check if hash uses current configuration
//   // This is useful if you change ARGON2_CONFIG in the future
//   try {
//     if (!hash.startsWith('$argon2')) {
//       return true // Not using Argon2, needs migration
//     }

//     // Parse hash to check parameters (optional)
//     // Argon2 hashes contain: $argon2id$v=19$m=65536,t=3,p=4$...
//     const parts = hash.split('$')
//     if (parts.length < 5) return true

//     // Extract parameters from hash
//     const params = parts[3]
//     const [m, t, p] = params.split(',')

//     const memory = parseInt(m.split('=')[1])
//     const time = parseInt(t.split('=')[1])
//     const parallelism = parseInt(p.split('=')[1])

//     // Check if current config matches
//     return (
//       memory !== ARGON2_CONFIG.memoryCost ||
//       time !== ARGON2_CONFIG.timeCost ||
//       parallelism !== ARGON2_CONFIG.parallelism
//     )
//   } catch {
//     return true // If parsing fails, assume needs rehash
//   }
// }

// /**
//  * Validate password strength
//  * @param password - Password to validate
//  * @returns { score: number; valid: boolean; feedback: string[] }
//  */
// export function validatePasswordStrength(password: string): {
//   score: number
//   valid: boolean
//   feedback: string[]
// } {
//   const feedback: string[] = []
//   let score = 0

//   // Length check
//   if (password.length >= 8) {
//     score++
//   } else {
//     feedback.push('Password must be at least 8 characters long')
//   }

//   // Contains uppercase
//   if (/[A-Z]/.test(password)) {
//     score++
//   } else {
//     feedback.push('Include at least one uppercase letter')
//   }

//   // Contains lowercase
//   if (/[a-z]/.test(password)) {
//     score++
//   } else {
//     feedback.push('Include at least one lowercase letter')
//   }

//   // Contains number
//   if (/[0-9]/.test(password)) {
//     score++
//   } else {
//     feedback.push('Include at least one number')
//   }

//   // Contains special character
//   if (/[^A-Za-z0-9]/.test(password)) {
//     score++
//   } else {
//     feedback.push('Include at least one special character (!@#$%^&*)')
//   }

//   // Check for common passwords (you can expand this list)
//   const commonPasswords = [
//     'password', '12345678', 'qwerty', 'admin', 'letmein',
//     'welcome', 'monkey', 'password1', '123456789'
//   ]

//   if (commonPasswords.includes(password.toLowerCase())) {
//     score = 0
//     feedback.push('This password is too common. Please choose a stronger one.')
//   }

//   return {
//     score,
//     valid: score >= 4, // Need at least 4/5 criteria
//     feedback: feedback.length > 0 ? feedback : ['Password is strong!']
//   }
// }

// /**
//  * Generate a secure random password
//  * @param length - Desired password length (default: 16)
//  * @returns string - Generated password
//  */
// export function generateSecurePassword(length: number = 16): string {
//   const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
//   const lowercase = 'abcdefghijklmnopqrstuvwxyz'
//   const numbers = '0123456789'
//   const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

//   const allChars = uppercase + lowercase + numbers + symbols

//   // Ensure at least one of each character type
//   let password = ''
//   password += uppercase[Math.floor(Math.random() * uppercase.length)]
//   password += lowercase[Math.floor(Math.random() * lowercase.length)]
//   password += numbers[Math.floor(Math.random() * numbers.length)]
//   password += symbols[Math.floor(Math.random() * symbols.length)]

//   // Fill the rest with random characters
//   for (let i = password.length; i < length; i++) {
//     password += allChars[Math.floor(Math.random() * allChars.length)]
//   }

//   // Shuffle the password
//   return password
//     .split('')
//     .sort(() => Math.random() - 0.5)
//     .join('')
// }

// /**
//  * Generate a random reset token
//  * @returns string - 32 character hex token
//  */
// export function generateResetToken(): string {
//   return Array.from(crypto.getRandomValues(new Uint8Array(16)))
//     .map(b => b.toString(16).padStart(2, '0'))
//     .join('')
// }
// lib/auth/password.ts
// lib/auth/password.ts
import * as argon2 from 'argon2'

/**
 * Argon2 configuration optimized for security vs performance
 */
const ARGON2_CONFIG = {
  type: argon2.argon2id,
  memoryCost: 65536,    // 64MB - memory usage per hash
  timeCost: 3,          // 3 iterations
  parallelism: 4,       // 4 threads
  hashLength: 32,       // 32 bytes = 256 bits output
  saltLength: 16,       // 16 bytes salt
}

/**
 * Hash a password using Argon2
 * @param password - Plain text password
 * @returns Promise<string> - Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    if (!password || password.trim().length === 0) {
      throw new Error('Password cannot be empty')
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }

    return await argon2.hash(password, ARGON2_CONFIG)
  } catch (error) {
    console.error('❌ Password hashing failed:', error)
    throw new Error('Could not hash password. Please try again.')
  }
}

/**
 * Verify a password against its hash
 * @param hash - Hashed password from database
 * @param password - Plain text password to verify
 * @returns Promise<boolean> - True if password matches
 */
export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  try {
    if (!hash || !password) {
      return false
    }

    // Check if hash looks like Argon2 hash
    if (!hash.startsWith('$argon2')) {
      console.warn('⚠️ Non-Argon2 hash detected. Consider migrating passwords.')
      return false
    }

    return await argon2.verify(hash, password)
  } catch (error) {
    console.error('❌ Password verification failed:', error)
    return false
  }
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns { score: number; valid: boolean; feedback: string[] }
 */
export function validatePasswordStrength(password: string): {
  score: number
  valid: boolean
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0

  // Length check
  if (password.length >= 8) {
    score++
  } else {
    feedback.push('Password must be at least 8 characters long')
  }

  // Contains uppercase
  if (/[A-Z]/.test(password)) {
    score++
  } else {
    feedback.push('Include at least one uppercase letter')
  }

  // Contains lowercase
  if (/[a-z]/.test(password)) {
    score++
  } else {
    feedback.push('Include at least one lowercase letter')
  }

  // Contains number
  if (/[0-9]/.test(password)) {
    score++
  } else {
    feedback.push('Include at least one number')
  }

  // Contains special character
  if (/[^A-Za-z0-9]/.test(password)) {
    score++
  } else {
    feedback.push('Include at least one special character (!@#$%^&*)')
  }

  // Check for common passwords
  const commonPasswords = [
    'password', '12345678', 'qwerty', 'admin', 'letmein',
    'welcome', 'monkey', 'password1', '123456789', 'admin123',
    'test123', '123456', 'password123', '1234567890'
  ]

  if (commonPasswords.includes(password.toLowerCase())) {
    score = 0
    feedback.push('This password is too common. Please choose a stronger one.')
  }

  return {
    score,
    valid: score >= 4, // Need at least 4/5 criteria
    feedback: feedback.length > 0 ? feedback : ['Password is strong!']
  }
}

/**
 * Check if password needs rehashing
 * @param hash - Existing password hash
 * @returns boolean - True if hash needs rehashing
 */
export function needsRehash(hash: string): boolean {
  try {
    if (!hash.startsWith('$argon2')) {
      return true // Not using Argon2, needs migration
    }

    return false
  } catch {
    return true // If parsing fails, assume needs rehash
  }
}

/**
 * Generate a secure random password
 * @param length - Desired password length (default: 16)
 * @returns string - Generated password
 */
export function generateSecurePassword(length: number = 16): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  const allChars = uppercase + lowercase + numbers + symbols

  // Ensure at least one of each character type
  let password = ''
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]

  // Fill the rest with random characters
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }

  // Shuffle the password
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')
}

/**
 * Generate a random reset token
 * @returns string - 32 character hex token
 */
export function generateResetToken(): string {
  // For browser environments
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  // Fallback for Node.js
  const characters = '0123456789abcdef'
  let token = ''
  for (let i = 0; i < 32; i++) {
    token += characters[Math.floor(Math.random() * characters.length)]
  }
  return token
}