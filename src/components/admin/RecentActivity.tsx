"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, UserPlus, FileText, Image, Video } from "lucide-react"
import { useDesign } from "@/context/design-context"
import { cn } from "@/lib/utils"

const mockActivities = [
  {
    id: 1,
    icon: UserPlus,
    label: "New artist application",
    detail: "Zuri Okafor applied for Season 3",
    time: "5 mins ago",
  },
  {
    id: 2,
    icon: FileText,
    label: "Blog post published",
    detail: "Behind the Scenes: Lagos Sessions",
    time: "2 hours ago",
  },
  {
    id: 3,
    icon: Image,
    label: "Gallery updated",
    detail: "12 new photos added to Season 2",
    time: "Yesterday",
  },
  {
    id: 4,
    icon: Video,
    label: "Episode scheduled",
    detail: "Season 2 Episode 8",
    time: "2 days ago",
  },
]

export function RecentActivity() {
  const { isDarkMode } = useDesign()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Activity className="h-4 w-4 text-red-500" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockActivities.map((activity) => (
          <div
            key={activity.id}
            className={cn(
              "flex items-start gap-3 rounded-lg p-2 transition-colors",
              isDarkMode 
                ? "hover:bg-gray-900/60" 
                : "hover:bg-gray-50"
            )}
          >
            <div className={cn(
              "mt-1 flex h-7 w-7 items-center justify-center rounded-full",
              isDarkMode 
                ? "bg-red-900/30 text-red-300" 
                : "bg-red-50 text-red-600"
            )}>
              <activity.icon className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1">
              <p className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>{activity.label}</p>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                {activity.detail}
              </p>
              <p className={cn(
                "mt-0.5 text-xs",
                isDarkMode ? "text-gray-500" : "text-gray-400"
              )}>
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}





// components/admin/RecentActivity.tsx
// 'use client'

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Activity, User, Edit, Trash2, Plus, Upload } from 'lucide-react'
// import { cn } from '@/lib/utils'
// import { useDesign } from '@/context/design-context'
// import type { ActivityLog } from '@prisma/client'

// interface RecentActivityProps {
//   activities?: Array<{
//     id: string
//     action: string
//     description: string | null
//     entityType: string
//     entityId: string | null
//     createdAt: Date
//     user: {
//       name: string | null
//       email: string
//     } | null
//   }>
// }

// const getActionIcon = (action: string) => {
//   switch (action) {
//     case 'CREATE':
//     case 'USER_CREATED':
//       return <Plus className="h-4 w-4 text-green-500" />
//     case 'UPDATE':
//     case 'EDIT':
//       return <Edit className="h-4 w-4 text-blue-500" />
//     case 'DELETE':
//       return <Trash2 className="h-4 w-4 text-red-500" />
//     case 'UPLOAD':
//       return <Upload className="h-4 w-4 text-purple-500" />
//     case 'SIGN_IN':
//       return <User className="h-4 w-4 text-yellow-500" />
//     default:
//       return <Activity className="h-4 w-4 text-gray-500" />
//   }
// }

// const getActionColor = (action: string) => {
//   switch (action) {
//     case 'CREATE':
//     case 'USER_CREATED':
//       return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
//     case 'UPDATE':
//     case 'EDIT':
//       return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
//     case 'DELETE':
//       return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
//     case 'UPLOAD':
//       return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
//     case 'SIGN_IN':
//       return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
//     default:
//       return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
//   }
// }

// const formatTimeAgo = (date: Date) => {
//   const now = new Date()
//   const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000)
  
//   if (diffInSeconds < 60) return 'Just now'
//   if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
//   if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
//   if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
//   return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
// }

// export function RecentActivity({ activities = [] }: RecentActivityProps) {
//   const { isDarkMode } = useDesign()

//   // If no activities provided, show sample data
//   const displayActivities = activities.length > 0 ? activities : [
//     {
//       id: '1',
//       action: 'CREATE',
//       description: 'Created new artist profile',
//       entityType: 'ARTIST',
//       entityId: '123',
//       createdAt: new Date(Date.now() - 300000), // 5 minutes ago
//       user: { name: 'Admin User', email: 'admin@afroqueens.com' }
//     },
//     {
//       id: '2',
//       action: 'UPDATE',
//       description: 'Updated blog post content',
//       entityType: 'BLOG_POST',
//       entityId: '456',
//       createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
//       user: { name: 'Content Editor', email: 'editor@afroqueens.com' }
//     },
//     {
//       id: '3',
//       action: 'UPLOAD',
//       description: 'Uploaded gallery images',
//       entityType: 'GALLERY',
//       entityId: '789',
//       createdAt: new Date(Date.now() - 7200000), // 2 hours ago
//       user: { name: 'Media Manager', email: 'media@afroqueens.com' }
//     },
//     {
//       id: '4',
//       action: 'SIGN_IN',
//       description: 'User signed in to dashboard',
//       entityType: 'USER',
//       entityId: '101',
//       createdAt: new Date(Date.now() - 14400000), // 4 hours ago
//       user: { name: 'System Admin', email: 'admin@afroqueens.com' }
//     }
//   ]

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Activity className="h-5 w-5" />
//           Recent Activity
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {displayActivities.map((activity) => (
//             <div
//               key={activity.id}
//               className={cn(
//                 "flex items-start gap-3 p-3 rounded-lg transition-colors",
//                 isDarkMode 
//                   ? "hover:bg-gray-800" 
//                   : "hover:bg-gray-50"
//               )}
//             >
//               <div className="mt-1">
//                 {getActionIcon(activity.action)}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2 mb-1">
//                   <Badge 
//                     variant="outline" 
//                     className={cn("text-xs", getActionColor(activity.action))}
//                   >
//                     {activity.action.replace('_', ' ')}
//                   </Badge>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     {formatTimeAgo(activity.createdAt)}
//                   </span>
//                 </div>
//                 <p className="text-sm font-medium text-gray-900 dark:text-white">
//                   {activity.description}
//                 </p>
//                 <div className="flex items-center gap-2 mt-1">
//                   {activity.user && (
//                     <>
//                       <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
//                         <span className="text-xs font-medium text-red-600 dark:text-red-300">
//                           {activity.user.name?.charAt(0) || 'U'}
//                         </span>
//                       </div>
//                       <span className="text-xs text-gray-500 dark:text-gray-400">
//                         {activity.user.name}
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
          
//           {displayActivities.length === 0 && (
//             <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//               <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
//               <p>No recent activity</p>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }