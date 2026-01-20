'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  
  const user = session?.user
  
  return {
    // User data
    user,
    session,
    
    // Status
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    isError: status === 'unauthenticated',
    
    // Role checks
    hasRole: (role: string) => user?.role === role,
    hasAnyRole: (roles: string[]) => roles.includes(user?.role || ''),
    isAdmin: () => ['SUPER_ADMIN', 'ADMIN'].includes(user?.role || ''),
    isEditor: () => ['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(user?.role || ''),
    isArtist: () => user?.role === 'ARTIST' || ['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(user?.role || ''),
    
    // Actions
    logout: async () => {
      await signOut({ redirect: false })
      router.push('/admin/login')
      router.refresh()
    },
    refresh: update,
    
    // Raw status
    status,
  }
}