import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { UserRole } from "@prisma/client"
import { prisma } from "@/lib/prisma"

// Define role hierarchy
const ROLE_HIERARCHY: Record<UserRole, number> = {
  SUPER_ADMIN: 5,
  ADMIN: 4,
  EDITOR: 3,
  ARTIST: 2,
  VIEWER: 1,
  USER: 1, // VIEWER and USER are equivalent
}

// Permission types based on your models
type Permission = 
  | 'artist:create' | 'artist:read' | 'artist:update' | 'artist:delete'
  | 'episode:create' | 'episode:read' | 'episode:update' | 'episode:delete'
  | 'blog:create' | 'blog:read' | 'blog:update' | 'blog:delete'
  | 'gallery:create' | 'gallery:read' | 'gallery:update' | 'gallery:delete'
  | 'user:manage' | 'settings:manage'

// Define role permissions
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    'artist:create', 'artist:read', 'artist:update', 'artist:delete',
    'episode:create', 'episode:read', 'episode:update', 'episode:delete',
    'blog:create', 'blog:read', 'blog:update', 'blog:delete',
    'gallery:create', 'gallery:read', 'gallery:update', 'gallery:delete',
    'user:manage', 'settings:manage'
  ],
  
  ADMIN: [
    'artist:create', 'artist:read', 'artist:update', 'artist:delete',
    'episode:create', 'episode:read', 'episode:update', 'episode:delete',
    'blog:create', 'blog:read', 'blog:update', 'blog:delete',
    'gallery:create', 'gallery:read', 'gallery:update', 'gallery:delete'
  ],
  
  EDITOR: [
    'artist:read', 'artist:update',
    'episode:read', 'episode:update',
    'blog:create', 'blog:read', 'blog:update', 'blog:delete',
    'gallery:create', 'gallery:read', 'gallery:update'
  ],
  
  ARTIST: [
    'artist:read', 'artist:update', // Can only update their own
    'blog:create', 'blog:read', 'blog:update', // Only their own blogs
    'gallery:create', 'gallery:read' // Only their gallery
  ],
  
  USER: [
    'artist:read',
    'episode:read',
    'blog:read',
    'gallery:read'
  ],
  
  VIEWER: [
    'artist:read',
    'episode:read',
    'blog:read',
    'gallery:read'
  ]
}

// Utility functions
export async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    redirect('/admin/login')
  }
  return session.user
}

export async function requireRole(minRole: UserRole) {
  const user = await requireAuth()
  
  if (ROLE_HIERARCHY[user.role] < ROLE_HIERARCHY[minRole]) {
    redirect('/unauthorized')
  }
  
  return user
}

export function hasPermission(user: { role: UserRole }, permission: Permission): boolean {
  return ROLE_PERMISSIONS[user.role]?.includes(permission) || false
}

export async function checkPermission(permission: Permission) {
  const user = await requireAuth()
  
  if (!hasPermission(user, permission)) {
    redirect('/unauthorized')
  }
  
  return user
}

// Artist-specific permission (can only edit own profile)
export async function canEditArtist(user: { id: string; role: UserRole }, artistId: string) {
  // Admins can edit any artist
  if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') {
    return true
  }
  
  // Artists can only edit their own profile
  if (user.role === 'ARTIST') {
    const artist = await prisma.artist.findUnique({
      where: { id: artistId },
      select: { userId: true }
    })
    
    return artist?.userId === user.id
  }
  
  return false
}

