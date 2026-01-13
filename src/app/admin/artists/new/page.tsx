"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Save, 
  Upload, 
  X, 
  Image as ImageIcon,
  Music,
  Link,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDesign } from '@/context/design-context'
import { cn } from '@/lib/utils'

export default function NewArtistPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { isDarkMode } = useDesign()
  const [formData, setFormData] = useState({
    name: '',
    stageName: '',
    bio: '',
    genre: '',
    location: '',
    nationality: '',
    seasonId: '',
    status: 'ACTIVE',
    theme: 'classic',
    accentColor: '#DC2626',
    instagram: '',
    twitter: '',
    youtube: '',
    spotify: '',
    soundcloud: '',
    appleMusic: '',
    website: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/admin/artists')
    } catch (error) {
      console.error('Error creating artist:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn(
            "text-3xl font-bold",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>Add New Artist</h1>
          <p className={cn(
            "mt-2",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Add a new artist to the Afroqueens platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.push('/admin/artists')}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : 'Save Artist'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Essential details about the artist
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full legal name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stageName">Stage Name *</Label>
                    <Input
                      id="stageName"
                      name="stageName"
                      value={formData.stageName}
                      onChange={handleChange}
                      placeholder="Artist's stage name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biography *</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell the artist's story..."
                    rows={6}
                    required
                  />
                  <p className={cn(
                    "text-sm",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    Provide a compelling biography that highlights their journey and achievements.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Select
                      value={formData.genre}
                      onValueChange={(value) => handleSelectChange('genre', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="afrobeats">Afrobeats</SelectItem>
                        <SelectItem value="afro-soul">Afro-Soul</SelectItem>
                        <SelectItem value="afro-pop">Afro-Pop</SelectItem>
                        <SelectItem value="afro-jazz">Afro-Jazz</SelectItem>
                        <SelectItem value="afro-house">Afro-House</SelectItem>
                        <SelectItem value="afro-rnb">Afro-R&B</SelectItem>
                        <SelectItem value="amapiano">Amapiano</SelectItem>
                        <SelectItem value="highlife">Highlife</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Lagos, Nigeria"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="e.g., Nigerian"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Social Media & Music Links
                </CardTitle>
                <CardDescription>
                  Connect the artist's social profiles and music platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <span className="text-white text-xs">IG</span>
                      </div>
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="https://instagram.com/username"
                      type="url"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs">X</span>
                      </div>
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      placeholder="https://twitter.com/username"
                      type="url"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="spotify" className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-green-600 flex items-center justify-center">
                        <Music className="h-4 w-4 text-white" />
                      </div>
                      Spotify
                    </Label>
                    <Input
                      id="spotify"
                      name="spotify"
                      value={formData.spotify}
                      onChange={handleChange}
                      placeholder="https://open.spotify.com/artist/..."
                      type="url"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube" className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center">
                        <span className="text-white text-xs">YT</span>
                      </div>
                      YouTube
                    </Label>
                    <Input
                      id="youtube"
                      name="youtube"
                      value={formData.youtube}
                      onChange={handleChange}
                      placeholder="https://youtube.com/c/username"
                      type="url"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="soundcloud">SoundCloud</Label>
                    <Input
                      id="soundcloud"
                      name="soundcloud"
                      value={formData.soundcloud}
                      onChange={handleChange}
                      placeholder="https://soundcloud.com/username"
                      type="url"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appleMusic">Apple Music</Label>
                    <Input
                      id="appleMusic"
                      name="appleMusic"
                      value={formData.appleMusic}
                      onChange={handleChange}
                      placeholder="https://music.apple.com/artist/..."
                      type="url"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://artistwebsite.com"
                    type="url"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Media & Settings */}
          <div className="space-y-6">
            {/* Profile Images */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Images</CardTitle>
                <CardDescription>
                  Upload profile and cover photos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Profile Photo */}
                <div className="space-y-2">
                  <Label>Profile Photo</Label>
                  <div className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center",
                    isDarkMode ? "border-gray-700" : "border-gray-300"
                  )}>
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-white" />
                    </div>
                    <p className={cn(
                      "text-sm mb-3",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      Recommended: 400x400px, square
                    </p>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </Button>
                  </div>
                </div>

                {/* Cover Photo */}
                <div className="space-y-2">
                  <Label>Cover Photo</Label>
                  <div className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center",
                    isDarkMode ? "border-gray-700" : "border-gray-300"
                  )}>
                    <div className="w-full h-32 mx-auto mb-4 rounded-lg bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-white" />
                    </div>
                    <p className={cn(
                      "text-sm mb-3",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      Recommended: 1920x600px, landscape
                    </p>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Cover
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Artist platform settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seasonId">Season</Label>
                  <Select
                    value={formData.seasonId}
                    onValueChange={(value) => handleSelectChange('seasonId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="season-1">Season 1</SelectItem>
                      <SelectItem value="season-2">Season 2</SelectItem>
                      <SelectItem value="season-3">Season 3</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleSelectChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          Active
                        </div>
                      </SelectItem>
                      <SelectItem value="PENDING">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                          Pending
                        </div>
                      </SelectItem>
                      <SelectItem value="ALUMNI">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          Alumni
                        </div>
                      </SelectItem>
                      <SelectItem value="FEATURED">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          Featured
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Page Theme</Label>
                  <Select
                    value={formData.theme}
                    onValueChange={(value) => handleSelectChange('theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">Classic Afrobeat</SelectItem>
                      <SelectItem value="modern">Modern Minimal</SelectItem>
                      <SelectItem value="vibrant">Vibrant Pop</SelectItem>
                      <SelectItem value="elegant">Monochrome Elegance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex items-center gap-3">
                    <div 
                      className={cn(
                        "w-8 h-8 rounded border",
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      )}
                      style={{ backgroundColor: formData.accentColor }}
                    />
                    <Input
                      id="accentColor"
                      name="accentColor"
                      value={formData.accentColor}
                      onChange={handleChange}
                      className="font-mono"
                    />
                  </div>
                </div>

                <div className={cn(
                  "pt-4 border-t",
                  isDarkMode ? "border-gray-800" : "border-gray-200"
                )}>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      className={cn(
                        "rounded",
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      )}
                    />
                    <Label htmlFor="featured" className="font-medium">
                      Mark as Featured Artist
                    </Label>
                  </div>
                  <p className={cn(
                    "text-sm mt-1",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    Featured artists appear prominently on the homepage
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

