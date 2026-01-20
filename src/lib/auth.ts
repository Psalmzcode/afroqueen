// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { prisma } from "@/lib/prisma"
// import * as argon2 from "argon2"
// import { UserRole } from "@prisma/client"

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma) as any,
//   session: {
//     strategy: "database",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   pages: {
//     signIn: '/admin/login',
//     error: '/admin/login',
//   },
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email as string },
//           select: {
//             id: true,
//             email: true,
//             name: true,
//             password: true,
//             role: true,
//             image: true,
//             isActive: true,
//           }
//         })

//         // Check if user exists, has password, and is active
//         if (!user || !user.password || !user.isActive) {
//           return null
//         }

//         // Verify password with Argon2
//         const isPasswordValid = await argon2.verify(
//           user.password,
//           credentials.password as string
//         )

//         if (!isPasswordValid) {
//           return null
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//           image: user.image,
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async session({ session, user, token }) {
//       const dbUser = await prisma.user.findUnique({
//         where: { email: session.user?.email as string },
//         select: {
//           id: true,
//           name: true,
//           email: true,
//           role: true,
//           image: true,
//           isActive: true,
//           artistProfile: {
//             select: {
//               id: true,
//               stageName: true,
//               slug: true,
//             }
//           }
//         }
//       })

//       if (session.user && dbUser) {
//         session.user.id = dbUser.id
//         session.user.name = dbUser.name
//         session.user.email = dbUser.email
//         session.user.role = dbUser.role as UserRole
//         session.user.image = dbUser.image
//         session.user.isActive = dbUser.isActive

//         // Add artist profile if exists
//         if (dbUser.artistProfile) {
//           session.user.artistId = dbUser.artistProfile.id
//           session.user.artistStageName = dbUser.artistProfile.stageName
//           session.user.artistSlug = dbUser.artistProfile.slug
//         }
//       }

//       return session
//     },

//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.role = user.role
//       }
//       return token
//     },

//     async signIn({ user, account, profile, email, credentials }) {
//       // Additional security check
//       if (user) {
//         const dbUser = await prisma.user.findUnique({
//           where: { email: user.email as string },
//           select: { isActive: true }
//         })

//         // Prevent inactive users from signing in
//         if (!dbUser?.isActive) {
//           return false
//         }
//       }
//       return true
//     }
//   },
// })
// lib/auth/index.ts
// auth.ts - PRODUCTION-READY SECURE CONFIGURATION
// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import Credentials from "next-auth/providers/credentials"
// import { prisma } from "@/lib/prisma"
// import { verifyPassword } from "@/lib/auth/password"
// import { UserRole } from "@prisma/client"

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma) as any,

//   // ============================================
//   // SECURITY: Use JWT for Credentials Provider
//   // ============================================
//   session: {
//     strategy: "jwt", // REQUIRED for Credentials provider
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//     updateAge: 24 * 60 * 60, // Refresh every 24 hours
//   },

//   jwt: {
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },

//   // ============================================
//   // SECURITY: Custom pages to prevent leaking info
//   // ============================================
//   pages: {
//     signIn: '/login',
//     error: '/login',
//   },

//   providers: [
//     Credentials({
//       id: "credentials",
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         try {
//           // ============================================
//           // SECURITY: Input validation
//           // ============================================
//           if (!credentials?.email || !credentials?.password) {
//             return null // Don't reveal which field is missing
//           }

//           // ============================================
//           // SECURITY: Sanitize email input
//           // ============================================
//           const email = credentials.email.toString().toLowerCase().trim()

//           // Basic email validation
//           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//           if (!emailRegex.test(email)) {
//             return null
//           }

//           // ============================================
//           // SECURITY: Rate limiting (implement in authorize)
//           // Consider using Upstash Redis for production
//           // ============================================

//           const user = await prisma.user.findUnique({
//             where: { email },
//             select: {
//               id: true,
//               email: true,
//               name: true,
//               password: true,
//               role: true,
//               image: true,
//               isActive: true,
//               emailVerified: true,
//             }
//           })

//           // ============================================
//           // SECURITY: Timing attack prevention
//           // Always verify password even if user doesn't exist
//           // ============================================
//           const dummyHash = "$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
//           const passwordToVerify = user?.password || dummyHash

//           const isPasswordValid = await verifyPassword(
//             passwordToVerify,
//             credentials.password.toString()
//           )

//           // ============================================
//           // SECURITY: Generic error message
//           // Don't reveal if email exists or password is wrong
//           // ============================================
//           if (!user || !user.password || !user.isActive || !isPasswordValid) {
//             return null
//           }

//           // ============================================
//           // SECURITY: Update last login (async, non-blocking)
//           // ============================================
//           prisma.user.update({
//             where: { id: user.id },
//             data: { lastLogin: new Date() }
//           }).catch(err => console.error("Failed to update lastLogin:", err))

//           // ============================================
//           // SECURITY: NEVER return password in user object
//           // ============================================
//           return {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//             role: user.role,
//             image: user.image,
//             emailVerified: user.emailVerified,
//           }
//         } catch (error) {
//           console.error("Authorize error:", error)
//           return null // Generic failure
//         }
//       }
//     })
//   ],

//   callbacks: {
//     // ============================================
//     // SECURITY: JWT callback - add custom claims
//     // ============================================
//     async jwt({ token, user, trigger, session }) {
//       // Initial sign in
//       if (user) {
//         token.id = user.id
//         token.role = (user as any).role
//         token.isActive = true

//         // Fetch artist profile
//         const artistProfile = await prisma.artistProfile.findUnique({
//           where: { userId: user.id },
//           select: { id: true, stageName: true, slug: true }
//         })

//         if (artistProfile) {
//           token.artistProfile = artistProfile
//         }
//       }

//       // ============================================
//       // SECURITY: Validate user still active on token refresh
//       // ============================================
//       if (trigger === "update" || Date.now() % 100 === 0) { // Random check
//         const dbUser = await prisma.user.findUnique({
//           where: { id: token.id as string },
//           select: { isActive: true, role: true }
//         })

//         if (!dbUser?.isActive) {
//           // User deactivated - invalidate token
//           return null as any
//         }

//         // Update role if changed
//         token.role = dbUser.role
//       }

//       // Handle manual session updates
//       if (trigger === "update" && session?.user) {
//         token = { ...token, ...session.user }
//       }

//       return token
//     },

//     // ============================================
//     // SECURITY: Session callback - sanitize exposed data
//     // ============================================
//     async session({ session, token }) {
//       if (token) {
//         session.user = {
//           ...session.user,
//           id: token.id as string,
//           role: token.role as UserRole,
//           isActive: token.isActive as boolean,
//           ...(token.artistProfile && {
//             artistId: (token.artistProfile as any).id,
//             artistStageName: (token.artistProfile as any).stageName,
//             artistSlug: (token.artistProfile as any).slug,
//           })
//         }
//       }

//       return session
//     },

//     // ============================================
//     // SECURITY: Additional sign-in validation
//     // ============================================
//     async signIn({ user }) {
//       if (!user?.id) return false

//       const dbUser = await prisma.user.findUnique({
//         where: { id: user.id },
//         select: { isActive: true }
//       })

//       return dbUser?.isActive === true
//     },

//     // ============================================
//     // SECURITY: Redirect callback - prevent open redirects
//     // ============================================
//     async redirect({ url, baseUrl }) {
//       // Allows relative callback URLs
//       if (url.startsWith("/")) return `${baseUrl}${url}`

//       // Allows callback URLs on the same origin
//       if (new URL(url).origin === baseUrl) return url

//       // Default to base URL for external redirects
//       return baseUrl
//     }
//   },

//   events: {
//     async createUser({ user }) {
//       await prisma.activityLog.create({
//         data: {
//           userId: user.id,
//           action: 'USER_CREATED',
//           entityType: 'USER',
//           entityId: user.id,
//           description: `User ${user.email} created account`,
//         }
//       }).catch(err => console.error("Activity log error:", err))
//     },

//     async signIn({ user }) {
//       await prisma.activityLog.create({
//         data: {
//           userId: user.id,
//           action: 'SIGN_IN',
//           entityType: 'USER',
//           entityId: user.id,
//           description: `User ${user.email} signed in`,
//         }
//       }).catch(err => console.error("Activity log error:", err))
//     }
//   },

//   // ============================================
//   // SECURITY: Essential production settings
//   // ============================================
//   debug: false, // NEVER true in production
//   trustHost: true, // Required for production behind proxies

//   // ============================================
//   // SECURITY: Ensure cookies are secure
//   // ============================================
//   cookies: {
//     sessionToken: {
//       name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: 'lax',
//         path: '/',
//         secure: process.env.NODE_ENV === 'production', // HTTPS only in production
//       },
//     },
//   },
// })


// ============================================
// FILE 3: auth.ts (Root level)
// ============================================
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { verifyPassword } from "@/lib/auth/password"
import { UserRole } from "@prisma/client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,

  // ============================================
  // SECURITY: Use JWT for Credentials Provider
  // ============================================
  session: {
    strategy: "jwt", // REQUIRED for Credentials provider
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Refresh every 24 hours
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // ============================================
  // SECURITY: Custom pages to prevent leaking info
  // ============================================
  pages: {
    signIn: '/login',
    error: '/login',
  },

  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // ============================================
          // SECURITY: Input validation
          // ============================================
          if (!credentials?.email || !credentials?.password) {
            return null // Don't reveal which field is missing
          }

          // ============================================
          // SECURITY: Sanitize email input
          // ============================================
          const email = credentials.email.toString().toLowerCase().trim()

          // Basic email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(email)) {
            return null
          }

          const user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              role: true,
              image: true,
              isActive: true,
              emailVerified: true,
            }
          })

          // ============================================
          // SECURITY: Timing attack prevention
          // Always verify password even if user doesn't exist
          // ============================================
          const dummyHash = "$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
          const passwordToVerify = user?.password || dummyHash

          const isPasswordValid = await verifyPassword(
            passwordToVerify,
            credentials.password.toString()
          )

          // ============================================
          // SECURITY: Generic error message
          // Don't reveal if email exists or password is wrong
          // ============================================
          if (!user || !user.password || !user.isActive || !isPasswordValid) {
            return null
          }

          // ============================================
          // SECURITY: Update last login (async, non-blocking)
          // ============================================
          prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
          }).catch(err => console.error("Failed to update lastLogin:", err))

          // ============================================
          // SECURITY: NEVER return password in user object
          // ============================================
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
            emailVerified: user.emailVerified,
            isActive: user.isActive,
          }
        } catch (error) {
          console.error("Authorize error:", error)
          return null // Generic failure
        }
      }
    })
  ],

  callbacks: {
    // ============================================
    // SECURITY: JWT callback - add custom claims
    // ============================================
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id!
        token.role = (user as any).role
        token.isActive = true

        // Fetch artist profile
        try {
          const artistProfile = await prisma.artist.findUnique({
            where: { userId: user.id },
            select: { id: true, stageName: true, slug: true }
          })

          if (artistProfile) {
            token.artistProfile = artistProfile
          }
        } catch (error) {
          console.error("Failed to fetch artist profile:", error)
        }
      }

      // ============================================
      // SECURITY: Validate user still active on token refresh
      // ============================================
      if (trigger === "update") {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { isActive: true, role: true }
          })

          if (!dbUser?.isActive) {
            // User deactivated - invalidate token
            return {} as any
          }

          // Update role if changed
          token.role = dbUser.role
        } catch (error) {
          console.error("Failed to validate user:", error)
        }
      }

      // Handle manual session updates
      if (trigger === "update" && session?.user) {
        token = { ...token, ...session.user }
      }

      return token
    },

    // ============================================
    // SECURITY: Session callback - sanitize exposed data
    // ============================================
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
        session.user.isActive = token.isActive as boolean

        if (token.artistProfile) {
          session.user.artistId = (token.artistProfile as any).id
          session.user.artistStageName = (token.artistProfile as any).stageName
          session.user.artistSlug = (token.artistProfile as any).slug
        }
      }

      return session
    },

    // ============================================
    // SECURITY: Additional sign-in validation
    // ============================================
    async signIn({ user }) {
      if (!user?.id) return false

      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { isActive: true }
        })

        return dbUser?.isActive === true
      } catch (error) {
        console.error("SignIn callback error:", error)
        return false
      }
    },

    // ============================================
    // SECURITY: Redirect callback - prevent open redirects
    // ============================================
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url

      // Default to base URL for external redirects
      return baseUrl
    }
  },

  events: {
    async createUser({ user }) {
      try {
        await prisma.activityLog.create({
          data: {
            userId: user.id,
            action: 'USER_CREATED',
            entityType: 'USER',
            entityId: user.id,
            description: `User ${user.email} created account`,
          }
        })
      } catch (error) {
        console.error("Activity log error:", error)
      }
    },

    async signIn({ user }) {
      try {
        await prisma.activityLog.create({
          data: {
            userId: user.id,
            action: 'SIGN_IN',
            entityType: 'USER',
            entityId: user.id,
            description: `User ${user.email} signed in`,
          }
        })
      } catch (error) {
        console.error("Activity log error:", error)
      }
    }
  },

  // ============================================
  // SECURITY: Essential production settings
  // ============================================
  debug: process.env.NODE_ENV === 'development',
  trustHost: true,

  // ============================================
  // SECURITY: Ensure cookies are secure
  // ============================================
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
})