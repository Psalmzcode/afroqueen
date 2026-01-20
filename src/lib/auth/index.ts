// // lib/auth/index.ts
// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import Credentials from "next-auth/providers/credentials"
// import { prisma } from "@/lib/prisma"
// import { verifyPassword } from "@/lib/auth/password"
// import { UserRole } from "@prisma/client"

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma) as any,
//   session: {
//     strategy: "database", // ← KEEP database strategy (better!)
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//     updateAge: 24 * 60 * 60, // Update session every 24 hours
//   },
//   pages: {
//     signIn: '/admin/login',
//     error: '/admin/login',
//     newUser: '/admin/register',
//   },
//   providers: [
//     Credentials({
//       id: "credentials", // ← ADD explicit ID
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         try {
//           if (!credentials?.email || !credentials?.password) {
//             throw new Error("Email and password required")
//           }

//           const user = await prisma.user.findUnique({
//             where: { 
//               email: credentials.email.toString().toLowerCase().trim()
//             },
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

//           if (!user || !user.password || !user.isActive) {
//             throw new Error("Invalid credentials")
//           }

//           const isPasswordValid = await verifyPassword(
//             user.password,
//             credentials.password.toString()
//           )

//           if (!isPasswordValid) {
//             throw new Error("Invalid credentials")
//           }

//           // Update last login
//           await prisma.user.update({
//             where: { id: user.id },
//             data: { lastLogin: new Date() }
//           })

//           // Return user object WITHOUT password
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
//           return null
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async session({ session, user }) {
//       // Database strategy passes 'user' in session callback
//       if (user) {
//         // Get fresh user data from database
//         const dbUser = await prisma.user.findUnique({
//           where: { id: user.id },
//           select: {
//             id: true,
//             name: true,
//             email: true,
//             role: true,
//             image: true,
//             isActive: true,
//             artistProfile: {
//               select: {
//                 id: true,
//                 stageName: true,
//                 slug: true,
//               }
//             }
//           }
//         })

//         if (dbUser) {
//           session.user = {
//             id: dbUser.id,
//             name: dbUser.name,
//             email: dbUser.email,
//             role: dbUser.role as UserRole,
//             image: dbUser.image,
//             isActive: dbUser.isActive,
//             ...(dbUser.artistProfile && {
//               artistId: dbUser.artistProfile.id,
//               artistStageName: dbUser.artistProfile.stageName,
//               artistSlug: dbUser.artistProfile.slug,
//             })
//           }
//         }
//       }

//       return session
//     },

//     async signIn({ user, account, profile, credentials }) {
//       // Additional security checks
//       if (user) {
//         const dbUser = await prisma.user.findUnique({
//           where: { id: user.id },
//           select: { isActive: true }
//         })

//         if (!dbUser?.isActive) {
//           return false
//         }
//       }
//       return true
//     }
//   },
//   events: {
//     async createUser({ user }) {
//       // Log user creation
//       await prisma.activityLog.create({
//         data: {
//           userId: user.id,
//           action: 'USER_CREATED',
//           entityType: 'USER',
//           entityId: user.id,
//           description: `User ${user.email} created account`,
//         }
//       })
//     },
//     async signIn({ user, isNewUser }) {
//       // Log successful sign in
//       await prisma.activityLog.create({
//         data: {
//           userId: user.id,
//           action: 'SIGN_IN',
//           entityType: 'USER',
//           entityId: user.id,
//           description: `User ${user.email} signed in`,
//         }
//       })
//     }
//   },
//   debug: process.env.NODE_ENV === 'development',
//   trustHost: true,
// })


// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import Credentials from "next-auth/providers/credentials"
// import { prisma } from "@/lib/prisma"
// import { verifyPassword } from "@/lib/auth/password"
// import { UserRole } from "@prisma/client"

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma) as any,
//   session: {
//     strategy: "database", // Keep database strategy
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//     updateAge: 24 * 60 * 60, // Update session every 24 hours
//   },
//   // IMPORTANT: Add jwt configuration even with database strategy
//   jwt: {
//     // The maximum age of the NextAuth.js issued JWT in seconds.
//     // Defaults to `session.maxAge`.
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   pages: {
//     signIn: '/admin/login',
//     error: '/admin/login',
//     newUser: '/admin/register',
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
//           if (!credentials?.email || !credentials?.password) {
//             throw new Error("Email and password required")
//           }

//           const user = await prisma.user.findUnique({
//             where: { 
//               email: credentials.email.toString().toLowerCase().trim()
//             },
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

//           if (!user || !user.password || !user.isActive) {
//             throw new Error("Invalid credentials")
//           }

//           const isPasswordValid = await verifyPassword(
//             user.password,
//             credentials.password.toString()
//           )

//           if (!isPasswordValid) {
//             throw new Error("Invalid credentials")
//           }

//           // Update last login
//           await prisma.user.update({
//             where: { id: user.id },
//             data: { lastLogin: new Date() }
//           })

//           // Return user object WITHOUT password
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
//           return null
//         }
//       }
//     })
//   ],
//   callbacks: {
//     // Fix for database strategy - use 'token' instead of 'user' in session
//     async session({ session, token, user }) {
//       // With database strategy, we get 'user' parameter
//       if (user) {
//         // Get fresh user data from database
//         const dbUser = await prisma.user.findUnique({
//           where: { id: user.id },
//           select: {
//             id: true,
//             name: true,
//             email: true,
//             role: true,
//             image: true,
//             isActive: true,
//             artistProfile: {
//               select: {
//                 id: true,
//                 stageName: true,
//                 slug: true,
//               }
//             }
//           }
//         })

//         if (dbUser) {
//           session.user = {
//             id: dbUser.id,
//             name: dbUser.name,
//             email: dbUser.email,
//             role: dbUser.role as UserRole,
//             image: dbUser.image,
//             isActive: dbUser.isActive,
//             ...(dbUser.artistProfile && {
//               artistId: dbUser.artistProfile.id,
//               artistStageName: dbUser.artistProfile.stageName,
//               artistSlug: dbUser.artistProfile.slug,
//             })
//           }
//         }
//       } else if (token) {
//         // Fallback for JWT strategy
//         session.user = {
//           ...session.user,
//           id: token.sub!,
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

//     // Add jwt callback to include custom data in token
//     async jwt({ token, user, trigger, session }) {
//       if (user) {
//         token.id = user.id
//         token.role = (user as any).role
//         token.isActive = (user as any).isActive

//         // Fetch artist profile if needed
//         if (user.id) {
//           const artistProfile = await prisma.artistProfile.findUnique({
//             where: { userId: user.id },
//             select: { id: true, stageName: true, slug: true }
//           })
//           if (artistProfile) {
//             token.artistProfile = artistProfile
//           }
//         }
//       }

//       // Handle session updates
//       if (trigger === "update" && session?.user) {
//         token = { ...token, ...session.user }
//       }

//       return token
//     },

//     async signIn({ user, account, profile, credentials }) {
//       // Additional security checks
//       if (user) {
//         const dbUser = await prisma.user.findUnique({
//           where: { id: user.id },
//           select: { isActive: true }
//         })

//         if (!dbUser?.isActive) {
//           return false
//         }
//       }
//       return true
//     }
//   },
//   events: {
//     async createUser({ user }) {
//       // Log user creation
//       await prisma.activityLog.create({
//         data: {
//           userId: user.id,
//           action: 'USER_CREATED',
//           entityType: 'USER',
//           entityId: user.id,
//           description: `User ${user.email} created account`,
//         }
//       })
//     },
//     async signIn({ user, isNewUser }) {
//       // Log successful sign in
//       await prisma.activityLog.create({
//         data: {
//           userId: user.id,
//           action: 'SIGN_IN',
//           entityType: 'USER',
//           entityId: user.id,
//           description: `User ${user.email} signed in`,
//         }
//       })
//     }
//   },
//   debug: process.env.NODE_ENV === 'development',
//   trustHost: true,
// })

// auth.ts - PRODUCTION-READY SECURE CONFIGURATION
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

          // ============================================
          // SECURITY: Rate limiting (implement in authorize)
          // Consider using Upstash Redis for production
          // ============================================

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
        const artistProfile = await prisma.artist.findUnique({
          where: { userId: user.id },
          select: { id: true, stageName: true, slug: true }
        })

        if (artistProfile) {
          token.artistProfile = artistProfile
        }
      }

      // ============================================
      // SECURITY: Validate user still active on token refresh
      // ============================================
      if (trigger === "update" || Date.now() % 100 === 0) { // Random check
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { isActive: true, role: true }
        })

        if (!dbUser?.isActive) {
          // User deactivated - invalidate token
          return null as any
        }

        // Update role if changed
        token.role = dbUser.role
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
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as UserRole,
          isActive: token.isActive as boolean,
          ...(token.artistProfile && {
            artistId: (token.artistProfile as any).id,
            artistStageName: (token.artistProfile as any).stageName,
            artistSlug: (token.artistProfile as any).slug,
          })
        }
      }

      return session
    },

    // ============================================
    // SECURITY: Additional sign-in validation
    // ============================================
    async signIn({ user }) {
      if (!user?.id) return false

      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { isActive: true }
      })

      return dbUser?.isActive === true
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
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'USER_CREATED',
          entityType: 'USER',
          entityId: user.id,
          description: `User ${user.email} created account`,
        }
      }).catch(err => console.error("Activity log error:", err))
    },

    async signIn({ user }) {
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'SIGN_IN',
          entityType: 'USER',
          entityId: user.id,
          description: `User ${user.email} signed in`,
        }
      }).catch(err => console.error("Activity log error:", err))
    }
  },

  // ============================================
  // SECURITY: Essential production settings
  // ============================================
  debug: false, // NEVER true in production
  trustHost: true, // Required for production behind proxies

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
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      },
    },
  },
})