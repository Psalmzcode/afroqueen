"use client"

import { useEffect, useState } from 'react'
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
import { useDesign } from '@/context/design-context'
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

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const { isDarkMode } = useDesign()

  useEffect(() => {
    const fetchStats = async () => {
      const mockStats: DashboardStats = {
        totalArtists: 42,
        totalBlogPosts: 156,
        totalGalleryItems: 287,
        totalEpisodes: 24,
        totalUsers: 89,
        totalSubscribers: 1245,
        totalViews: 54289,
        totalEngagement: 12345,
      }
      setStats(mockStats)
      setLoading(false)
    }

    fetchStats()
  }, [])

  const statCards = [
    { title: 'Total Artists', value: stats?.totalArtists || 0, icon: Users, change: '+12%', color: 'bg-red-500' },
    { title: 'Blog Posts', value: stats?.totalBlogPosts || 0, icon: FileText, change: '+8%', color: 'bg-blue-500' },
    { title: 'Gallery Items', value: stats?.totalGalleryItems || 0, icon: Image, change: '+23%', color: 'bg-green-500' },
    { title: 'Episodes', value: stats?.totalEpisodes || 0, icon: Video, change: '+5%', color: 'bg-purple-500' },
    { title: 'Users', value: stats?.totalUsers || 0, icon: Users, change: '+15%', color: 'bg-yellow-500' },
    { title: 'Subscribers', value: stats?.totalSubscribers || 0, icon: MessageSquare, change: '+32%', color: 'bg-pink-500' },
  ]

  const engagementMetrics = [
    { label: 'Views', value: stats?.totalViews || 0, icon: Eye },
    { label: 'Likes', value: 8456, icon: Heart },
    { label: 'Shares', value: 2341, icon: Share2 },
    { label: 'Comments', value: 892, icon: MessageSquare },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={cn(isDarkMode ? "text-gray-400" : "text-gray-500")}>Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className={cn(
          "text-3xl font-bold",
          isDarkMode ? "text-white" : "text-gray-900"
        )}>Dashboard Overview</h1>
        <p className={cn(
          "mt-2",
          isDarkMode ? "text-gray-400" : "text-gray-600"
        )}>
          Welcome back! Here's what's happening with Afroqueens today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn(
                    "text-sm font-medium",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>{stat.title}</p>
                  <p className={cn(
                    "text-3xl font-bold mt-2",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>{stat.value.toLocaleString()}</p>
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
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>{metric.label}</p>
                      <p className={cn(
                        "text-2xl font-bold mt-1",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{metric.value.toLocaleString()}</p>
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
                {[
                  { title: 'Season 2 Finale', date: 'Tomorrow', time: '8:00 PM' },
                  { title: 'Artist Spotlight', date: 'Dec 25', time: '6:00 PM' },
                  { title: 'Behind the Scenes', date: 'Dec 28', time: '7:30 PM' },
                ].map((episode, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg transition-colors",
                      isDarkMode 
                        ? "hover:bg-gray-800" 
                        : "hover:bg-gray-50"
                    )}
                  >
                    <div>
                      <p className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{episode.title}</p>
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        {episode.date} • {episode.time}
                      </p>
                    </div>
                    <Music className="h-5 w-5 text-red-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


