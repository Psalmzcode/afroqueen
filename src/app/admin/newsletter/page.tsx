"use client"

import { useState } from 'react'
import { 
  Mail, 
  Users, 
  Send, 
  Plus,
  Search,
  Filter,
  Calendar,
  TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDesign } from '@/context/design-context'
import { cn } from '@/lib/utils'

export default function NewsletterPage() {
  const [search, setSearch] = useState('')
  const { isDarkMode } = useDesign()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={cn(
            "text-3xl font-bold",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>Newsletter Management</h1>
          <p className={cn(
            "mt-2",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Manage subscribers and send newsletters
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>Total Subscribers</p>
                <p className={cn(
                  "text-3xl font-bold mt-2",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>1,245</p>
              </div>
              <Users className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>Active Campaigns</p>
                <p className={cn(
                  "text-3xl font-bold mt-2",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>3</p>
              </div>
              <Send className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>Open Rate</p>
                <p className={cn(
                  "text-3xl font-bold mt-2",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>68%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>Click Rate</p>
                <p className={cn(
                  "text-3xl font-bold mt-2",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>24%</p>
              </div>
              <Mail className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Newsletter content */}
      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <div className={cn(
              "w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center",
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            )}>
              <Mail className={cn(
                "h-12 w-12",
                isDarkMode ? "text-gray-400" : "text-gray-400"
              )} />
            </div>
            <h3 className={cn(
              "text-lg font-medium mb-2",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>Newsletter Management</h3>
            <p className={cn(
              "mb-6",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Manage subscribers and create email campaigns
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

