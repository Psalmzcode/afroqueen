"use client"

import { useState, useEffect } from 'react'
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
  UserCheck,
  UserX
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

interface Artist {
  id: string
  name: string
  stageName: string
  email: string
  genre: string
  season: string
  status: 'active' | 'alumni' | 'pending'
  featured: boolean
  viewCount: number
  joinedAt: string
}

export default function ArtistsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [seasonFilter, setSeasonFilter] = useState('all')
  const [artists, setArtists] = useState<Artist[]>([])
  const [selectedArtists, setSelectedArtists] = useState<string[]>([])
  const { isDarkMode } = useDesign()

  // Mock data - replace with API call
  useEffect(() => {
    const mockArtists: Artist[] = [
      {
        id: '1',
        name: 'Amina Diallo',
        stageName: 'Amina Blu',
        email: 'amina@example.com',
        genre: 'Afro-Soul',
        season: 'Season 1',
        status: 'active',
        featured: true,
        viewCount: 2450,
        joinedAt: '2024-01-15',
      },
      {
        id: '2',
        name: 'Nala Mbatha',
        stageName: 'Nala',
        email: 'nala@example.com',
        genre: 'Amapiano',
        season: 'Season 1',
        status: 'active',
        featured: true,
        viewCount: 1890,
        joinedAt: '2024-01-20',
      },
      {
        id: '3',
        name: 'Zara Kalu',
        stageName: 'Zara',
        email: 'zara@example.com',
        genre: 'Afrobeats',
        season: 'Season 2',
        status: 'active',
        featured: false,
        viewCount: 1560,
        joinedAt: '2024-06-10',
      },
    ]
    setArtists(mockArtists)
  }, [])

  const filteredArtists = artists.filter(artist => {
    if (search && !artist.stageName.toLowerCase().includes(search.toLowerCase()) && 
        !artist.name.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    if (statusFilter !== 'all' && artist.status !== statusFilter) return false
    if (seasonFilter !== 'all' && artist.season !== seasonFilter) return false
    return true
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedArtists(filteredArtists.map(a => a.id))
    } else {
      setSelectedArtists([])
    }
  }

  const handleSelectArtist = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedArtists(prev => [...prev, id])
    } else {
      setSelectedArtists(prev => prev.filter(artistId => artistId !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case 'alumni':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Alumni</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={cn(
            "text-3xl font-bold",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>Artists Management</h1>
          <p className={cn(
            "mt-2",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Manage all artists in the Afroqueens platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Link href="/admin/artists/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Artist
            </Button>
          </Link>
        </div>
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
                  placeholder="Search artists by name or stage name..."
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={seasonFilter} onValueChange={setSeasonFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seasons</SelectItem>
                <SelectItem value="Season 1">Season 1</SelectItem>
                <SelectItem value="Season 2">Season 2</SelectItem>
                <SelectItem value="Season 3">Season 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedArtists.length > 0 && (
            <div className={cn(
              "mt-4 flex items-center gap-3 p-3 rounded-lg",
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            )}>
              <span className={cn(
                "text-sm",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                {selectedArtists.length} artist(s) selected
              </span>
              <Button variant="outline" size="sm">
                <UserCheck className="h-4 w-4 mr-2" />
                Activate
              </Button>
              <Button variant="outline" size="sm">
                <UserX className="h-4 w-4 mr-2" />
                Deactivate
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Artists Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Artists ({filteredArtists.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedArtists.length === filteredArtists.length && filteredArtists.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                </TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Season</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArtists.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedArtists.includes(artist.id)}
                      onChange={(e) => handleSelectArtist(artist.id, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        {artist.stageName}
                        {artist.featured && (
                          <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        {artist.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      {artist.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{artist.genre}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{artist.season}</Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(artist.status)}
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "font-medium",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      {artist.viewCount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      {new Date(artist.joinedAt).toLocaleDateString()}
                    </span>
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
                        <Link href={`/admin/artists/${artist.id}`}>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/artists/${artist.stageName.toLowerCase().replace(/\s+/g, '-')}`} target="_blank">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" />
                            View Public Profile
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

