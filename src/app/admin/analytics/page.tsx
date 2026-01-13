"use client"

import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Heart,
  Share2,
  Calendar,
  Globe
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDesign } from '@/context/design-context'
import { cn } from '@/lib/utils'

export default function AnalyticsPage() {
  const { isDarkMode } = useDesign()

  const metrics = [
    { label: 'Total Views', value: '542,890', icon: Eye, change: '+12%', color: 'text-blue-500' },
    { label: 'Total Likes', value: '84,562', icon: Heart, change: '+8%', color: 'text-red-500' },
    { label: 'Total Shares', value: '23,412', icon: Share2, change: '+15%', color: 'text-green-500' },
    { label: 'Active Users', value: '12,345', icon: Users, change: '+22%', color: 'text-purple-500' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className={cn(
          "text-3xl font-bold",
          isDarkMode ? "text-white" : "text-gray-900"
        )}>Analytics Dashboard</h1>
        <p className={cn(
          "mt-2",
          isDarkMode ? "text-gray-400" : "text-gray-600"
        )}>
          Comprehensive analytics and insights for the Afroqueens platform
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn(
                    "text-sm font-medium",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>{metric.label}</p>
                  <p className={cn(
                    "text-3xl font-bold mt-2",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500">{metric.change}</span>
                  </div>
                </div>
                <div className={cn(metric.color, "p-3 rounded-lg bg-opacity-10")}>
                  <metric.icon className={cn("h-6 w-6", metric.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Last 30 days of platform traffic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={cn(
              "h-64 flex items-center justify-center",
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            )}>
              <div className="text-center">
                <BarChart3 className={cn(
                  "h-12 w-12 mx-auto mb-4",
                  isDarkMode ? "text-gray-400" : "text-gray-400"
                )} />
                <p className={cn(
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Chart visualization coming soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>User engagement across content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={cn(
              "h-64 flex items-center justify-center",
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            )}>
              <div className="text-center">
                <TrendingUp className={cn(
                  "h-12 w-12 mx-auto mb-4",
                  isDarkMode ? "text-gray-400" : "text-gray-400"
                )} />
                <p className={cn(
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Engagement chart coming soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Insights</CardTitle>
          <CardDescription>Key performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Globe className={cn(
                "h-8 w-8 mx-auto mb-2",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )} />
              <p className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>45</p>
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>Countries Reached</p>
            </div>
            <div className="text-center">
              <Calendar className={cn(
                "h-8 w-8 mx-auto mb-2",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )} />
              <p className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>24</p>
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>Episodes Published</p>
            </div>
            <div className="text-center">
              <Users className={cn(
                "h-8 w-8 mx-auto mb-2",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )} />
              <p className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>50+</p>
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>Artists Featured</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

