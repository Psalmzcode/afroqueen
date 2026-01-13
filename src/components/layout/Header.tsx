"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Music, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggleCompact } from './ThemeToggle'
import { useDesign } from '@/context/design-context'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Artists', href: '/artists' },
  { name: 'Blog', href: '/blog' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Episodes', href: '/episodes' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { currentDesign } = useDesign()

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all",
      currentDesign === 'editorial' && "bg-white/80 dark:bg-black/80 border-gray-200 dark:border-gray-800",
      currentDesign === 'gallery' && "bg-black/90 border-gray-800",
      currentDesign === 'dynamic' && "bg-gradient-to-r from-black/90 to-red-950/90 border-red-900/30"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className={cn(
              "p-2 rounded-lg",
              currentDesign === 'editorial' && "bg-red-600",
              currentDesign === 'gallery' && "bg-gradient-to-br from-red-600 to-red-800",
              currentDesign === 'dynamic' && "bg-gradient-to-r from-red-600 to-red-800"
            )}>
              <Music className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className={cn(
                currentDesign === 'gallery' ? "text-white" : "text-black dark:text-white"
              )}>
                Afro
              </span>
              <span className="text-red-600">Queens</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-red-600",
                  pathname === item.href
                    ? "text-red-600"
                    : currentDesign === 'gallery' 
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 dark:text-gray-300"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-red-600">
              <Search className="h-5 w-5" />
            </button>
            <ThemeToggleCompact />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-red-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

