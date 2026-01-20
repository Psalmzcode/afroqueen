// import 'next-auth'
// import { UserRole } from '@prisma/client'

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string
//       email: string
//       name?: string | null
//       role: UserRole
//       image?: string | null
//       isActive: boolean
//       artistId?: string
//       artistStageName?: string
//       artistSlug?: string
//     }
//   }
  
//   interface User {
//     id: string
//     email: string
//     name?: string | null
//     role: UserRole
//     image?: string | null
//     artistId?: string
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     id?: string
//     role?: UserRole
//   }
// }

import { DefaultSession } from "next-auth"
import { UserRole } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
      isActive: boolean
      artistId?: string
      artistStageName?: string
      artistSlug?: string
    } & DefaultSession["user"]
  }

  interface User {
    role: UserRole
    isActive: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
    isActive: boolean
    artistProfile?: {
      id: string
      stageName: string
      slug: string
    }
  }
}