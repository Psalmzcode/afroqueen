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
  Calendar,
  Clock,
  Users,
  Video,
  Play,
  CheckCircle,
  Clock as ClockIcon,
  Calendar as CalendarIcon
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDesign } from '@/context/design-context'
import { cn } from '@/lib/utils'

export default function EpisodesPage() {
  const [search, setSearch] = useState('')
  const [seasonFilter, setSeasonFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const { isDarkMode } = useDesign()

  const episodes = [
    {
      id: '1',
      title: 'Season 2 Premiere: Breaking Barriers',
      description: 'Join us as we launch our second season with five phenomenal artists...',
      season: 'Season 2',
      episodeNumber: 1,
      duration: '35:00',
      views: 15420,
      status: 'published',
      featured: true,
      artists: ['Amina Blu', 'Nala', 'Zara'],
      airDate: '2024-12-01',
    },
    // Add more episodes...
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Published
          </Badge>
        )
      case 'draft':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <Video className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        )
      case 'scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <ClockIcon className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={cn(
            "text-3xl font-bold",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>Episodes Management</h1>
          <p className={cn(
            "mt-2",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Create and manage episodes for the Afroqueens series
          </p>
        </div>
        <Link href="/admin/episodes/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Episode
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                )} />
                <Input
                  placeholder="Search episodes..."
                  className={cn(
                    "pl-9",
                    isDarkMode
                      ? "bg-gray-900 border-gray-700 text-white"
                      : ""
                  )}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <Select value={seasonFilter} onValueChange={setSeasonFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seasons</SelectItem>
                <SelectItem value="season-1">Season 1</SelectItem>
                <SelectItem value="season-2">Season 2</SelectItem>
                <SelectItem value="season-3">Season 3</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Episodes Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Episodes ({episodes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Episode</TableHead>
                <TableHead>Season</TableHead>
                <TableHead>Artists</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Air Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {episodes.map((episode) => (
                <TableRow key={episode.id}>
                  <TableCell>
                    <div>
                      <div className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        Episode {episode.episodeNumber}: {episode.title}
                      </div>
                      <div className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        {episode.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{episode.season}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className={cn(
                        "h-4 w-4",
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      )} />
                      <span className="text-sm">{episode.artists.length} Artists</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(episode.status)}
                      {episode.featured && (
                        <Badge variant="outline" className="border-red-200 text-red-700">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={cn(
                      "font-medium",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      {episode.views.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className={cn(
                        "h-4 w-4",
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      )} />
                      {episode.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className={cn(
                        "h-4 w-4",
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      )} />
                      {new Date(episode.airDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={`/admin/episodes/${episode.id}`}>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/episodes/${episode.id}`} target="_blank">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

