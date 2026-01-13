"use client"

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Image as ImageIcon,
  Video,
  Star,
  Calendar,
  User
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDesign } from '@/context/design-context'
import { cn } from '@/lib/utils'

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { isDarkMode } = useDesign()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={cn(
            "text-3xl font-bold",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>Gallery Management</h1>
          <p className={cn(
            "mt-2",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Manage photos, videos, and other media content
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center gap-2 rounded-lg p-1",
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          )}>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={cn(
                viewMode === 'grid' 
                  ? isDarkMode ? "bg-gray-700 shadow-sm" : "bg-white shadow-sm"
                  : ""
              )}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={cn(
                viewMode === 'list' 
                  ? isDarkMode ? "bg-gray-700 shadow-sm" : "bg-white shadow-sm"
                  : ""
              )}
            >
              List
            </Button>
          </div>
          <Link href="/admin/gallery/upload">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Upload
            </Button>
          </Link>
        </div>
      </div>

      {/* Gallery content would go here */}
      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <div className={cn(
              "w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center",
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            )}>
              <ImageIcon className={cn(
                "h-12 w-12",
                isDarkMode ? "text-gray-400" : "text-gray-400"
              )} />
            </div>
            <h3 className={cn(
              "text-lg font-medium mb-2",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>Gallery Management</h3>
            <p className={cn(
              "mb-6",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Upload and manage media files for the platform
            </p>
            <Link href="/admin/gallery/upload">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Upload First Media
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

