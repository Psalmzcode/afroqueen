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


