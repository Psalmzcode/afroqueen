"use client"

import { Header } from './Header'
import { Footer } from './Footer'
import { ReactNode } from 'react'
import { useDesign } from '@/context/design-context'
import { cn } from '@/lib/utils'

interface PageLayoutProps {
  children: ReactNode
  className?: string
  hideHeader?: boolean
  hideFooter?: boolean
}

export function PageLayout({ 
  children, 
  className,
  hideHeader = false,
  hideFooter = false 
}: PageLayoutProps) {
  const { currentDesign } = useDesign()

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      currentDesign === 'editorial' && "bg-white dark:bg-black text-gray-900 dark:text-gray-100",
      currentDesign === 'gallery' && "bg-black text-white",
      currentDesign === 'dynamic' && "bg-gradient-to-b from-black to-red-950 text-white"
    )}>
      {!hideHeader && <Header />}
      <main className={cn("flex-1", className)}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}

