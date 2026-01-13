"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  Save, 
  ArrowLeft,
  Edit,
  Calendar,
  Eye,
  BarChart3,
  Image as ImageIcon,
  Music,
  Globe,
  Trash2,
  MoreVertical
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDesign } from '@/context/design-context'
import { cn } from '@/lib/utils'

export default function EditArtistPage() {
  const params = useParams()
  const router = useRouter()
  const artistSlug = params.slug as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [artist, setArtist] = useState<any>(null)
  const { isDarkMode } = useDesign()

  useEffect(() => {
    fetchArtist()
  }, [artistSlug])

  const fetchArtist = async () => {
    try {
      // Mock data - replace with API call
      const mockArtist = {
        id: artistSlug,
        name: 'Amina Blu',
        stageName: 'Amina Blu',
        slug: 'amina-blu',
        bio: 'Amina Blu is a groundbreaking Afro-Soul artist from Lagos, Nigeria...',
        genre: 'Afro-Soul',
        location: 'Lagos, Nigeria',
        nationality: 'Nigerian',
        season: 'Season 1',
        status: 'ACTIVE',
        featured: true,
        theme: 'classic',
        accentColor: '#DC2626',
        viewCount: 2450,
        streamCount: 2400000,
        joinedAt: '2024-01-15T00:00:00.000Z',
        instagram: 'https://instagram.com/aminablu',
        twitter: 'https://twitter.com/aminablu_music',
        youtube: 'https://youtube.com/c/AminaBluOfficial',
        spotify: 'https://open.spotify.com/artist/123456',
        soundcloud: 'https://soundcloud.com/amina-blu',
        appleMusic: 'https://music.apple.com/artist/123456',
        website: 'https://aminablu.com',
        profileImage: 'https://ui-avatars.com/api/?name=Amina+Blu&background=dc2626&color=fff',
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
      }
      
      setArtist(mockArtist)
    } catch (error) {
      console.error('Error fetching artist:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Show success message
    } catch (error) {
      console.error('Error saving artist:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this artist? This action cannot be undone.')) {
      try {
        // API call would go here
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.push('/admin/artists')
      } catch (error) {
        console.error('Error deleting artist:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={cn(isDarkMode ? "text-gray-400" : "text-gray-500")}>Loading artist...</div>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="text-center py-12">
        <h2 className={cn(
          "text-2xl font-bold mb-4",
          isDarkMode ? "text-white" : "text-gray-900"
        )}>Artist not found</h2>
        <Link href="/admin/artists">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Artists
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/artists">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className={cn(
              "text-3xl font-bold",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>{artist.stageName}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="outline">{artist.genre}</Badge>
              <Badge variant="outline">{artist.season}</Badge>
              {artist.featured && (
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                  Featured
                </Badge>
              )}
              <span className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Joined {new Date(artist.joinedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/artists/${artist.slug}`} target="_blank">
                <DropdownMenuItem className="cursor-pointer">
                  <Eye className="h-4 w-4 mr-2" />
                  View Public Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="cursor-pointer">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-600"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Artist
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? 'Saving...' : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="edit" className="space-y-6">
        <TabsList>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Update artist's profile details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        defaultValue={artist.name}
                        placeholder="Enter full legal name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stageName">Stage Name</Label>
                      <Input
                        id="stageName"
                        defaultValue={artist.stageName}
                        placeholder="Artist's stage name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biography</Label>
                    <Textarea
                      id="bio"
                      defaultValue={artist.bio}
                      placeholder="Tell the artist's story..."
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats & Quick Actions */}
            <div className="space-y-6">
              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>Profile Views</span>
                      <span className={cn(
                        "font-bold",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{artist.viewCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>Total Streams</span>
                      <span className={cn(
                        "font-bold",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{(artist.streamCount / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>Content Items</span>
                      <span className={cn(
                        "font-bold",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>24</span>
                    </div>
                    <div className={cn(
                      "pt-4 border-t",
                      isDarkMode ? "border-gray-800" : "border-gray-200"
                    )}>
                      <Button variant="outline" className="w-full gap-2">
                        <Calendar className="h-4 w-4" />
                        View Detailed Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Edit className="h-4 w-4" />
                    Add Timeline Event
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Music className="h-4 w-4" />
                    Update Music Links
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Manage Gallery
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Globe className="h-4 w-4" />
                    Update Social Links
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Artist Content</CardTitle>
              <CardDescription>
                Manage blog posts, gallery items, and episodes featuring this artist
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className={cn(
                  "w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <Edit className={cn(
                    "h-12 w-12",
                    isDarkMode ? "text-gray-400" : "text-gray-400"
                  )} />
                </div>
                <h3 className={cn(
                  "text-lg font-medium mb-2",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>Content Management</h3>
                <p className={cn(
                  "mb-6",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  This section will show all content related to the artist
                </p>
                <div className="flex gap-3 justify-center">
                  <Button>Add Blog Post</Button>
                  <Button variant="outline">Upload Media</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Performance metrics and engagement data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Analytics content would go here */}
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className={cn(
                    "h-12 w-12 mx-auto mb-4",
                    isDarkMode ? "text-gray-400" : "text-gray-400"
                  )} />
                  <p className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    Analytics dashboard coming soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>
                Photos, videos, and audio files for this artist
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Media gallery would go here */}
              <div className="text-center py-12">
                <ImageIcon className={cn(
                  "h-12 w-12 mx-auto mb-4",
                  isDarkMode ? "text-gray-400" : "text-gray-400"
                )} />
                <p className={cn(
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Media gallery coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

