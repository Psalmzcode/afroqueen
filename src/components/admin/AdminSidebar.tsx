"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  Image,
  Video,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  Mail,
  Music,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut, useSession } from "next-auth/react"
import { useDesign } from "@/context/design-context"

const navItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  {
    title: "Artists",
    href: "/admin/artists",
    icon: Users,
    subItems: [
      { title: "All Artists", href: "/admin/artists" },
      { title: "Add New", href: "/admin/artists/new" },
    ],
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: Image,
  },
  {
    title: "Episodes",
    href: "/admin/episodes",
    icon: Video,
  },
  { title: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const { data: session } = useSession()
  const { isDarkMode } = useDesign()

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  return (
    <>
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={cn(
          "lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg transition-colors",
          isDarkMode ? "bg-gray-900" : "bg-white"
        )}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r transition-all duration-200 ease-in-out lg:translate-x-0",
          isDarkMode 
            ? "bg-black border-gray-800" 
            : "bg-white border-gray-200",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
        suppressHydrationWarning
      >
        <div className={cn(
          "flex h-16 items-center border-b px-6",
          isDarkMode ? "border-gray-800" : "border-gray-200"
        )}>
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="p-2 bg-red-600 rounded-lg">
              <Music className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className={isDarkMode ? "text-white" : "text-black"}>Afro</span>
              <span className="text-red-600">Queens</span>
            </span>
            <span className={cn(
              "ml-2 text-xs font-medium px-2 py-1 rounded-full",
              isDarkMode 
                ? "bg-red-900/30 text-red-300" 
                : "bg-red-100 text-red-700"
            )}>
              Admin
            </span>
          </Link>
        </div>

        <div className={cn(
          "p-6 border-b",
          isDarkMode ? "border-gray-800" : "border-gray-200"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
              <span className="text-white font-bold">
                {session?.user?.name?.charAt(0) || "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                "font-medium truncate",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                {session?.user?.name || "Admin User"}
              </p>
              <p className={cn(
                "text-sm truncate",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                {session?.user?.email || "admin@afroqueens.com"}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <span className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              isDarkMode 
                ? "bg-red-900/30 text-red-300" 
                : "bg-red-100 text-red-800"
            )}>
              {session?.user?.role || "SUPER_ADMIN"}
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/")
              const isExpanded = expandedItems.includes(item.title)
              const hasSubItems = item.subItems && item.subItems.length > 0

              return (
                <div key={item.title}>
                  <button
                    onClick={() => (hasSubItems ? toggleExpand(item.title) : undefined)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? isDarkMode
                          ? "bg-red-900/20 text-red-300"
                          : "bg-red-50 text-red-700"
                        : isDarkMode
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </div>
                    {hasSubItems && (
                      <svg
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {hasSubItems && isExpanded && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems!.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className={cn(
                            "block px-3 py-2 rounded text-sm transition-colors",
                            pathname === subItem.href
                              ? "text-red-600 font-medium"
                              : isDarkMode
                                ? "text-gray-400 hover:text-gray-300"
                                : "text-gray-600 hover:text-gray-900"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className={cn(
            "mt-8 pt-6 border-t",
            isDarkMode ? "border-gray-800" : "border-gray-200"
          )}>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isDarkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}


