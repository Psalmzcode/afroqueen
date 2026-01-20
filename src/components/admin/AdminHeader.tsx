// "use client"

// import { useState, useEffect } from 'react'
// import { useSession, signOut } from 'next-auth/react'
// import { Bell, Search, Moon, Sun, ChevronDown } from 'lucide-react'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { useDesign } from '@/context/design-context'
// import { cn } from '@/lib/utils'

// export function AdminHeader() {
//   const [search, setSearch] = useState('')
//   const [mounted, setMounted] = useState(false)
//   const { isDarkMode, toggleDarkMode } = useDesign()
//   const { data: session } = useSession()

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted) {
//     return (
//       <header className={cn(
//         "sticky top-0 z-40 flex h-16 items-center gap-4 border-b px-4 sm:px-6 lg:px-8 transition-colors",
//         isDarkMode 
//           ? "bg-black border-gray-800" 
//           : "bg-white border-gray-200"
//       )}>
//         <div className="flex-1">
//           <div className="relative max-w-md">
//             <Search className={cn(
//               "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
//               isDarkMode ? "text-gray-400" : "text-gray-500"
//             )} />
//             <Input
//               type="search"
//               placeholder="Search in admin..."
//               value=""
//               className={cn(
//                 "w-full pl-9",
//                 isDarkMode 
//                   ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" 
//                   : "bg-gray-50 border-gray-300"
//               )}
//               disabled
//             />
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="h-10 w-10" />
//           <div className="h-10 w-10" />
//           <div className="h-10 w-10" />
//         </div>
//       </header>
//     )
//   }

//   return (
//     <header className={cn(
//       "sticky top-0 z-40 flex h-16 items-center gap-4 border-b px-4 sm:px-6 lg:px-8 transition-colors",
//       isDarkMode 
//         ? "bg-black border-gray-800" 
//         : "bg-white border-gray-200"
//     )}>
//       {/* Search */}
//       <div className="flex-1">
//         <div className="relative max-w-md">
//           <Search className={cn(
//             "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
//             isDarkMode ? "text-gray-400" : "text-gray-500"
//           )} />
//             <Input
//               type="search"
//               placeholder="Search in admin..."
//               className={cn(
//                 "w-full pl-9",
//                 isDarkMode 
//                   ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" 
//                   : "bg-gray-50 border-gray-300"
//               )}
//               value={search || ""}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//         </div>
//       </div>

//       {/* Right side actions */}
//       <div className="flex items-center gap-2">
//         {/* Theme Toggle */}
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={toggleDarkMode}
//           className="rounded-full"
//           title="Toggle theme"
//         >
//           {isDarkMode ? (
//             <Sun className="h-5 w-5" />
//           ) : (
//             <Moon className="h-5 w-5" />
//           )}
//         </Button>

//         {/* Notifications */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon" className="relative rounded-full">
//               <Bell className="h-5 w-5" />
//               <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-600 text-white text-xs">
//                 3
//               </Badge>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="w-80">
//             <DropdownMenuLabel>Notifications</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             {[
//               { title: 'New artist application', time: '2 min ago', unread: true },
//               { title: 'New comment on blog post', time: '1 hour ago', unread: true },
//               { title: 'Gallery upload completed', time: '3 hours ago', unread: false },
//               { title: 'Episode scheduled for publishing', time: '1 day ago', unread: false },
//             ].map((notification, index) => (
//               <DropdownMenuItem key={index} className="cursor-pointer p-3">
//                 <div className="flex items-start gap-3">
//                   <div className={`mt-1 h-2 w-2 rounded-full ${notification.unread ? 'bg-red-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
//                   <div className="flex-1">
//                     <p className="font-medium">{notification.title}</p>
//                     <p className={cn(
//                       "text-sm",
//                       isDarkMode ? "text-gray-400" : "text-gray-500"
//                     )}>{notification.time}</p>
//                   </div>
//                 </div>
//               </DropdownMenuItem>
//             ))}
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="cursor-pointer text-center text-red-600 justify-center">
//               View all notifications
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* User Menu */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="gap-2 px-2">
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src={session?.user?.image || undefined} />
//                 <AvatarFallback className="bg-red-600 text-white">
//                   {session?.user?.name?.charAt(0) || 'A'}
//                 </AvatarFallback>
//               </Avatar>
//               <span className="hidden md:inline">{session?.user?.name || 'Admin User'}</span>
//               <ChevronDown className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
//             <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
//             <DropdownMenuItem className="cursor-pointer">Activity Log</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem 
//               className="cursor-pointer text-red-600"
//               onClick={() => signOut({ callbackUrl: '/admin/login' })}
//             >
//               Logout
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   )
// }


// components/admin/AdminHeader.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Bell, Search, Moon, Sun, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useDesign } from '@/context/design-context'
import { cn } from '@/lib/utils'
import type { UserRole } from '@prisma/client'

interface AdminHeaderProps {
  user: {
    id: string
    name: string | null
    email: string
    role: UserRole
    image: string | null
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [search, setSearch] = useState('')
  const [mounted, setMounted] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDesign()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/admin/login')
    router.refresh()
  }

  if (!mounted) {
    return (
      <header className={cn(
        "sticky top-0 z-40 flex h-16 items-center gap-4 border-b px-4 sm:px-6 lg:px-8 transition-colors",
        isDarkMode 
          ? "bg-black border-gray-800" 
          : "bg-white border-gray-200"
      )}>
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className={cn(
              "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )} />
            <Input
              type="search"
              placeholder="Search in admin..."
              value=""
              className={cn(
                "w-full pl-9",
                isDarkMode 
                  ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" 
                  : "bg-gray-50 border-gray-300"
              )}
              disabled
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10" />
          <div className="h-10 w-10" />
          <div className="h-10 w-10" />
        </div>
      </header>
    )
  }

  return (
    <header className={cn(
      "sticky top-0 z-40 flex h-16 items-center gap-4 border-b px-4 sm:px-6 lg:px-8 transition-colors",
      isDarkMode 
        ? "bg-black border-gray-800" 
        : "bg-white border-gray-200"
    )}>
      {/* Search */}
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className={cn(
            "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
            isDarkMode ? "text-gray-400" : "text-gray-500"
          )} />
          <Input
            type="search"
            placeholder="Search in admin..."
            className={cn(
              "w-full pl-9",
              isDarkMode 
                ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" 
                : "bg-gray-50 border-gray-300"
            )}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-full"
          title="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-600 text-white text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { title: 'New artist application', time: '2 min ago', unread: true },
              { title: 'New comment on blog post', time: '1 hour ago', unread: true },
              { title: 'Gallery upload completed', time: '3 hours ago', unread: false },
              { title: 'Episode scheduled for publishing', time: '1 day ago', unread: false },
            ].map((notification, index) => (
              <DropdownMenuItem key={index} className="cursor-pointer p-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 h-2 w-2 rounded-full ${notification.unread ? 'bg-red-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
                  <div className="flex-1">
                    <p className="font-medium">{notification.title}</p>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>{notification.time}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-center text-red-600 justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image || undefined} />
                <AvatarFallback className="bg-red-600 text-white">
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">{user?.name || 'Admin User'}</span>
                <span className="text-xs text-gray-500">
                  {user?.role?.toLowerCase().replace('_', ' ')}
                </span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <Badge 
                  variant="outline" 
                  className="mt-1 w-fit capitalize"
                >
                  {user?.role?.toLowerCase().replace('_', ' ')}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => router.push('/admin/profile')}
            >
              Profile
            </DropdownMenuItem>
            {user?.role === 'SUPER_ADMIN' && (
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => router.push('/admin/settings')}
              >
                Settings
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => router.push('/admin/activity')}
            >
              Activity Log
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={handleSignOut}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}