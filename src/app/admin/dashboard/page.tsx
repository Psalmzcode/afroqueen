// "use client"

// import { useEffect, useState } from 'react'
// import {
//   Users,
//   FileText,
//   Image,
//   Video,
//   TrendingUp,
//   Eye,
//   Heart,
//   Share2,
//   Calendar,
//   Music,
//   MessageSquare,
// } from 'lucide-react'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { RecentActivity } from '@/components/admin/RecentActivity'
// import { QuickActions } from '@/components/admin/QuickActions'
// import { StatsChart } from '@/components/admin/StatsChart'
// import { useDesign } from '@/context/design-context'
// import { cn } from '@/lib/utils'

// interface DashboardStats {
//   totalArtists: number
//   totalBlogPosts: number
//   totalGalleryItems: number
//   totalEpisodes: number
//   totalUsers: number
//   totalSubscribers: number
//   totalViews: number
//   totalEngagement: number
// }

// export default function DashboardPage() {
//   const [stats, setStats] = useState<DashboardStats | null>(null)
//   const [loading, setLoading] = useState(true)
//   const { isDarkMode } = useDesign()

//   useEffect(() => {
//     const fetchStats = async () => {
//       const mockStats: DashboardStats = {
//         totalArtists: 42,
//         totalBlogPosts: 156,
//         totalGalleryItems: 287,
//         totalEpisodes: 24,
//         totalUsers: 89,
//         totalSubscribers: 1245,
//         totalViews: 54289,
//         totalEngagement: 12345,
//       }
//       setStats(mockStats)
//       setLoading(false)
//     }

//     fetchStats()
//   }, [])

//   const statCards = [
//     { title: 'Total Artists', value: stats?.totalArtists || 0, icon: Users, change: '+12%', color: 'bg-red-500' },
//     { title: 'Blog Posts', value: stats?.totalBlogPosts || 0, icon: FileText, change: '+8%', color: 'bg-blue-500' },
//     { title: 'Gallery Items', value: stats?.totalGalleryItems || 0, icon: Image, change: '+23%', color: 'bg-green-500' },
//     { title: 'Episodes', value: stats?.totalEpisodes || 0, icon: Video, change: '+5%', color: 'bg-purple-500' },
//     { title: 'Users', value: stats?.totalUsers || 0, icon: Users, change: '+15%', color: 'bg-yellow-500' },
//     { title: 'Subscribers', value: stats?.totalSubscribers || 0, icon: MessageSquare, change: '+32%', color: 'bg-pink-500' },
//   ]

//   const engagementMetrics = [
//     { label: 'Views', value: stats?.totalViews || 0, icon: Eye },
//     { label: 'Likes', value: 8456, icon: Heart },
//     { label: 'Shares', value: 2341, icon: Share2 },
//     { label: 'Comments', value: 892, icon: MessageSquare },
//   ]

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className={cn(isDarkMode ? "text-gray-400" : "text-gray-500")}>Loading dashboard...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className={cn(
//           "text-3xl font-bold",
//           isDarkMode ? "text-white" : "text-gray-900"
//         )}>Dashboard Overview</h1>
//         <p className={cn(
//           "mt-2",
//           isDarkMode ? "text-gray-400" : "text-gray-600"
//         )}>
//           Welcome back! Here's what's happening with Afroqueens today.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {statCards.map((stat, index) => (
//           <Card key={index} className="hover:shadow-lg transition-shadow">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className={cn(
//                     "text-sm font-medium",
//                     isDarkMode ? "text-gray-400" : "text-gray-600"
//                   )}>{stat.title}</p>
//                   <p className={cn(
//                     "text-3xl font-bold mt-2",
//                     isDarkMode ? "text-white" : "text-gray-900"
//                   )}>{stat.value.toLocaleString()}</p>
//                   <div className="flex items-center mt-2">
//                     <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//                     <span className="text-sm text-green-500">{stat.change} from last month</span>
//                   </div>
//                 </div>
//                 <div className={`${stat.color} p-3 rounded-lg`}>
//                   <stat.icon className="h-6 w-6 text-white" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Engagement Overview</CardTitle>
//               <CardDescription>Last 30 days of user engagement across the platform</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <StatsChart />
//             </CardContent>
//           </Card>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {engagementMetrics.map((metric, index) => (
//               <Card key={index}>
//                 <CardContent className="p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className={cn(
//                         "text-sm",
//                         isDarkMode ? "text-gray-400" : "text-gray-600"
//                       )}>{metric.label}</p>
//                       <p className={cn(
//                         "text-2xl font-bold mt-1",
//                         isDarkMode ? "text-white" : "text-gray-900"
//                       )}>{metric.value.toLocaleString()}</p>
//                     </div>
//                     <metric.icon className="h-8 w-8 text-red-500" />
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           <QuickActions />
//         </div>

//         <div className="space-y-6">
//           <RecentActivity />

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Calendar className="h-5 w-5" />
//                 Upcoming Episodes
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {[
//                   { title: 'Season 2 Finale', date: 'Tomorrow', time: '8:00 PM' },
//                   { title: 'Artist Spotlight', date: 'Dec 25', time: '6:00 PM' },
//                   { title: 'Behind the Scenes', date: 'Dec 28', time: '7:30 PM' },
//                 ].map((episode, index) => (
//                   <div
//                     key={index}
//                     className={cn(
//                       "flex items-center justify-between p-3 rounded-lg transition-colors",
//                       isDarkMode 
//                         ? "hover:bg-gray-800" 
//                         : "hover:bg-gray-50"
//                     )}
//                   >
//                     <div>
//                       <p className={cn(
//                         "font-medium",
//                         isDarkMode ? "text-white" : "text-gray-900"
//                       )}>{episode.title}</p>
//                       <p className={cn(
//                         "text-sm",
//                         isDarkMode ? "text-gray-400" : "text-gray-600"
//                       )}>
//                         {episode.date} • {episode.time}
//                       </p>
//                     </div>
//                     <Music className="h-5 w-5 text-red-500" />
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// app/admin/dashboard/page.tsx
import { prisma } from '@/lib/prisma'
import {
  Users,
  FileText,
  Image,
  Video,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Calendar,
  Music,
  MessageSquare,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RecentActivity } from '@/components/admin/RecentActivity'
import { QuickActions } from '@/components/admin/QuickActions'
import { StatsChart } from '@/components/admin/StatsChart'
import { cn } from '@/lib/utils'

interface DashboardStats {
  totalArtists: number
  totalBlogPosts: number
  totalGalleryItems: number
  totalEpisodes: number
  totalUsers: number
  totalSubscribers: number
  totalViews: number
  totalEngagement: number
}

export default async function DashboardPage() {
  // Fetch REAL data from database (server-side)
  const [
    totalArtists,
    totalBlogPosts,
    totalGalleryItems,
    totalEpisodes,
    totalUsers,
    totalSubscribers,
    totalViews,
    totalLikes,
    totalShares,
    totalComments,
    upcomingEpisodes,
    recentActivities
  ] = await Promise.all([
    // Main stats
    prisma.artist.count(),
    prisma.blogPost.count({ where: { status: 'PUBLISHED' } }),
    prisma.galleryItem.count(),
    prisma.episode.count(),
    prisma.user.count(),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),

    // Engagement stats (you might need to calculate these based on your analytics)
    // For now, using example calculations
    prisma.blogPost.aggregate({ _sum: { views: true } }),
    prisma.blogPost.aggregate({ _sum: { likes: true } }),
    prisma.blogPost.aggregate({ _sum: { shares: true } }),
    prisma.comment.count({ where: { isApproved: true } }),

    // Upcoming episodes (next 7 days)
    prisma.episode.findMany({
      where: {
        airDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
        },
        isPublished: false
      },
      take: 3,
      orderBy: { airDate: 'asc' },
      include: {
        season: {
          select: { name: true }
        }
      }
    }),

    // Recent activities
    prisma.activityLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    })
  ])

  // Calculate totals
  const stats: DashboardStats = {
    totalArtists,
    totalBlogPosts,
    totalGalleryItems,
    totalEpisodes,
    totalUsers,
    totalSubscribers,
    totalViews: totalViews._sum.views || 0,
    totalEngagement: (totalLikes._sum.likes || 0) + (totalShares._sum.shares || 0) + (totalComments || 0)
  }

  const statCards = [
    { title: 'Total Artists', value: stats.totalArtists, icon: Users, change: '+12%', color: 'bg-red-500' },
    { title: 'Blog Posts', value: stats.totalBlogPosts, icon: FileText, change: '+8%', color: 'bg-blue-500' },
    { title: 'Gallery Items', value: stats.totalGalleryItems, icon: Image, change: '+23%', color: 'bg-green-500' },
    { title: 'Episodes', value: stats.totalEpisodes, icon: Video, change: '+5%', color: 'bg-purple-500' },
    { title: 'Users', value: stats.totalUsers, icon: Users, change: '+15%', color: 'bg-yellow-500' },
    { title: 'Subscribers', value: stats.totalSubscribers, icon: MessageSquare, change: '+32%', color: 'bg-pink-500' },
  ]

  const engagementMetrics = [
    { label: 'Views', value: stats.totalViews, icon: Eye },
    { label: 'Likes', value: totalLikes._sum.likes || 0, icon: Heart },
    { label: 'Shares', value: totalShares._sum.shares || 0, icon: Share2 },
    { label: 'Comments', value: totalComments, icon: MessageSquare },
  ]

  // Format upcoming episodes
  const formattedEpisodes = upcomingEpisodes.map(episode => ({
    title: episode.title,
    date: formatDate(episode.airDate),
    time: formatTime(episode.airDate),
    season: episode.season?.name
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with Afroqueens today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                    {stat.value.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500">{stat.change} from last month</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Overview</CardTitle>
              <CardDescription>Last 30 days of user engagement across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <StatsChart />
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {engagementMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                        {metric.value.toLocaleString()}
                      </p>
                    </div>
                    <metric.icon className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <QuickActions />
        </div>

        <div className="space-y-6">
          <RecentActivity />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Episodes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formattedEpisodes.map((episode, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {episode.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {episode.date} • {episode.time}
                      </p>
                      {episode.season && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {episode.season}
                        </p>
                      )}
                    </div>
                    <Music className="h-5 w-5 text-red-500" />
                  </div>
                ))}

                {formattedEpisodes.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Music className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No upcoming episodes scheduled</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Helper functions for formatting dates
function formatDate(date: Date): string {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const eventDate = new Date(date)

  if (eventDate.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  }

  return eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}
