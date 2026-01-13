"use client"

import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { AuthProvider } from '@/components/admin/AuthProvider'
import { Toaster } from '@/components/ui/toast'
import { useDesign } from '@/context/design-context'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

function AdminLayoutContent({ children }: { children: ReactNode }) {
  const { isDarkMode } = useDesign()

  // Apply dark class to document for CSS variables
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div 
      className={cn(
        "min-h-screen transition-colors",
        isDarkMode 
          ? "bg-black text-white" 
          : "bg-gray-100 text-gray-900"
      )}
      suppressHydrationWarning
    >
      <AdminSidebar />
      <div className="lg:pl-64" suppressHydrationWarning>
        <AdminHeader />
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AuthProvider>
  )
}

