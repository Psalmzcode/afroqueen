"use client"

import Link from "next/link"
import { Plus, Users, FileText, Image, Video, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDesign } from "@/context/design-context"
import { cn } from "@/lib/utils"

export function QuickActions() {
  const { isDarkMode } = useDesign()
  
  const actions = [
    {
      title: "Add New Artist",
      description: "Create and onboard a new Afroqueens artist profile.",
      href: "/admin/artists/new",
      icon: Users,
      lightColor: "bg-red-50 text-red-700",
      darkColor: "bg-red-900/30 text-red-300",
    },
    {
      title: "Write Blog Post",
      description: "Share a new story, interview, or spotlight.",
      href: "/admin/blog/new",
      icon: FileText,
      lightColor: "bg-blue-50 text-blue-700",
      darkColor: "bg-blue-900/30 text-blue-300",
    },
    {
      title: "Upload Gallery Items",
      description: "Add new photos or visuals from recent sessions.",
      href: "/admin/gallery/upload",
      icon: Image,
      lightColor: "bg-green-50 text-green-700",
      darkColor: "bg-green-900/30 text-green-300",
    },
    {
      title: "Schedule Episode",
      description: "Plan and publish a new Afroqueens episode.",
      href: "/admin/episodes/new",
      icon: Video,
      lightColor: "bg-purple-50 text-purple-700",
      darkColor: "bg-purple-900/30 text-purple-300",
    },
    {
      title: "Send Newsletter",
      description: "Engage your subscribers with fresh updates.",
      href: "/admin/newsletter",
      icon: Mail,
      lightColor: "bg-pink-50 text-pink-700",
      darkColor: "bg-pink-900/30 text-pink-300",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">
          Quick Actions
        </CardTitle>
        <Plus className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <button className="w-full text-left">
              <div className={cn(
                "flex items-start gap-3 rounded-lg border border-dashed p-3 transition-colors",
                isDarkMode
                  ? "border-gray-700 hover:border-red-500/60 hover:bg-gray-900"
                  : "border-gray-200 hover:border-red-300 hover:bg-red-50/40"
              )}>
                <div
                  className={cn(
                    "mt-1 flex h-8 w-8 items-center justify-center rounded-md",
                    isDarkMode ? action.darkColor : action.lightColor
                  )}
                >
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className={cn(
                    "text-sm font-medium",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>{action.title}</p>
                  <p className={cn(
                    "text-xs",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          </Link>
        ))}
        <div className="pt-2">
          <Button variant="outline" className="w-full justify-center gap-2 text-xs">
            <Plus className="h-3 w-3" />
            View all admin tools
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


