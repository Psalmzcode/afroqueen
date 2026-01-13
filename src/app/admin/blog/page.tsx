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
  User,
  FileText,
  CheckCircle,
  Clock,
  Archive
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

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const { isDarkMode } = useDesign()

  const blogPosts = [
    {
      id: '1',
      title: 'The Rise of African Female Producers',
      excerpt: 'Breaking the glass ceiling in music production...',
      category: 'Industry Insights',
      author: 'Amina Diallo',
      status: 'published',
      featured: true,
      views: 2450,
      likes: 156,
      comments: 42,
      publishedAt: '2024-12-01',
    },
    // Add more posts...
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
            <FileText className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        )
      case 'scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        )
      case 'archived':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Archive className="h-3 w-3 mr-1" />
            Archived
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
          )}>Blog Management</h1>
          <p className={cn(
            "mt-2",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Create and manage blog posts for the Afroqueens platform
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Post
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
                  placeholder="Search posts..."
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
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="spotlights">Artist Spotlights</SelectItem>
                <SelectItem value="industry">Industry Insights</SelectItem>
                <SelectItem value="behind">Behind the Scenes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Posts ({blogPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div>
                      <div className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{post.title}</div>
                      <div className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        {post.excerpt}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className={cn(
                        "h-4 w-4",
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      )} />
                      {post.author}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(post.status)}
                      {post.featured && (
                        <Badge variant="outline" className="border-red-200 text-red-700">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className={cn(
                          "font-medium",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>{post.views.toLocaleString()}</div>
                        <div className={cn(
                          "text-xs",
                          isDarkMode ? "text-gray-500" : "text-gray-500"
                        )}>views</div>
                      </div>
                      <div>
                        <div className={cn(
                          "font-medium",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>{post.likes}</div>
                        <div className={cn(
                          "text-xs",
                          isDarkMode ? "text-gray-500" : "text-gray-500"
                        )}>likes</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className={cn(
                        "h-4 w-4",
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      )} />
                      {new Date(post.publishedAt).toLocaleDateString()}
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
                        <Link href={`/admin/blog/${post.id}`}>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/blog/${post.id}`} target="_blank">
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

