"use client"

import { PageLayout } from '@/components/layout/PageLayout'
import { useState } from 'react'
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Music, 
  Play, 
  Calendar,
  MapPin,
  Heart,
  Share2,
  ExternalLink,
  Clock,
  Users,
  Award
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useDesign } from '@/context/design-context'

// Mock artist data
const artist = {
  name: "Amina Blu",
  stageName: "Amina Blu",
  bio: "Amina Blu is a groundbreaking Afro-Soul artist from Lagos, Nigeria. With a voice that blends traditional Yoruba melodies with contemporary soul, she has captivated audiences worldwide. Her journey with Afroqueens began in Season 1, where she quickly became a fan favorite for her powerful performances and authentic storytelling.",
  genre: "Afro-Soul",
  location: "Lagos, Nigeria",
  season: "Season 1",
  featured: true,
  streams: "2.4M",
  followers: "150K",
  awards: 3,
  
  socialMedia: {
    instagram: "@aminablu",
    twitter: "@aminablu_music",
    youtube: "Amina Blu Official",
    spotify: "Amina Blu"
  },
  
  music: {
    topTracks: [
      { id: 1, title: "Ojú Ònà", streams: "850K", duration: "3:45" },
      { id: 2, title: "Shadow Dance", streams: "720K", duration: "4:12" },
      { id: 3, title: "Midnight Bloom", streams: "580K", duration: "3:58" },
      { id: 4, title: "River Flow", streams: "520K", duration: "4:30" },
    ],
    spotifyUrl: "https://open.spotify.com/artist/example"
  },
  
  gallery: [
    { id: 1, type: 'photo', caption: 'Studio Session' },
    { id: 2, type: 'photo', caption: 'Live Performance' },
    { id: 3, type: 'video', caption: 'Behind the Scenes' },
    { id: 4, type: 'photo', caption: 'Award Night' },
  ],
  
  timeline: [
    { year: 2020, event: "Released debut single 'First Light'" },
    { year: 2021, event: "Joined Afroqueens Season 1" },
    { year: 2022, event: "Won Best New Artist at Afrima Awards" },
    { year: 2023, event: "Headlined Afroqueens World Tour" },
  ]
}

export default function ArtistProfilePage() {
  const [activeTab, setActiveTab] = useState<'music' | 'gallery' | 'timeline'>('music')
  const { currentDesign } = useDesign()

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Cover Image */}
        <div className="h-64 md:h-80 bg-gradient-to-r from-red-900/80 via-red-700/60 to-red-900/80" />
        
        {/* Profile Header */}
        <div className="relative container mx-auto px-4 -mt-16 md:-mt-24">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Profile Image */}
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl border-4 border-white dark:border-black bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">AB</span>
            </div>
            
            {/* Artist Info */}
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{artist.stageName}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{artist.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-red-600 hover:text-white transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-red-600 hover:text-white transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-red-600" />
                  <span className="font-medium">{artist.genre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-red-600" />
                  <span className="font-medium">{artist.season}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="font-medium">{artist.location}</span>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex items-center gap-4 mt-6">
                {[
                  { icon: Instagram, label: 'Instagram', url: artist.socialMedia.instagram },
                  { icon: Twitter, label: 'Twitter', url: artist.socialMedia.twitter },
                  { icon: Youtube, label: 'YouTube', url: artist.socialMedia.youtube },
                  { icon: Music, label: 'Spotify', url: artist.music.spotifyUrl },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="text-sm">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{artist.streams}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Streams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{artist.followers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{artist.awards}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Awards</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">#1</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Chart Position</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Bio & Tabs */}
            <div className="lg:col-span-2">
              {/* Bio */}
              <div className={cn(
                "rounded-2xl p-6 mb-8",
                currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                currentDesign === 'gallery' && "bg-gray-900 border border-gray-800",
                currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-900/80 to-black border border-gray-800"
              )}>
                <h2 className="text-2xl font-bold mb-4">Artist Bio</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{artist.bio}</p>
                <button className="text-red-600 font-medium hover:text-red-700 flex items-center gap-2">
                  Read Full Story
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b mb-8">
                {[
                  { id: 'music', label: 'Music', icon: Music },
                  { id: 'gallery', label: 'Gallery', icon: Play },
                  { id: 'timeline', label: 'Journey', icon: Calendar },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 border-b-2 -mb-px transition-colors",
                      activeTab === tab.id
                        ? "border-red-600 text-red-600"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600"
                    )}
                  >
                    <tab.icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-8">
                {activeTab === 'music' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">Top Tracks</h3>
                    {artist.music.topTracks.map((track, index) => (
                      <motion.div
                        key={track.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors",
                          currentDesign === 'editorial' && "bg-gray-50 dark:bg-gray-900",
                          currentDesign === 'gallery' && "bg-gray-900",
                          currentDesign === 'dynamic' && "bg-gray-900/50"
                        )}
                      >
                        <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center">
                          <span className="text-red-600 font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{track.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{track.streams} streams</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{track.duration}</span>
                          <button className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700">
                            <Play className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                    
                    <div className="mt-8 text-center">
                      <a
                        href={artist.music.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                      >
                        <Music className="h-5 w-5" />
                        Listen on Spotify
                      </a>
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {artist.gallery.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "aspect-square rounded-xl overflow-hidden relative group cursor-pointer",
                          currentDesign === 'editorial' && "bg-gray-200 dark:bg-gray-800",
                          currentDesign === 'gallery' && "bg-gray-800",
                          currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-800 to-black"
                        )}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                          <p className="text-white text-sm">{item.caption}</p>
                          {item.type === 'video' && (
                            <Play className="h-8 w-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div className="space-y-8">
                    {artist.timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center">
                            <span className="text-red-600 font-bold">{item.year}</span>
                          </div>
                          {index < artist.timeline.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-700 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <h4 className="font-bold text-lg mb-2">{item.event}</h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            Detailed description of this milestone in the artist's journey.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Featured Episode */}
              <div className={cn(
                "rounded-2xl overflow-hidden",
                currentDesign === 'editorial' && "bg-gradient-to-br from-red-600 to-red-800",
                currentDesign === 'gallery' && "bg-gradient-to-br from-red-900 to-black",
                currentDesign === 'dynamic' && "bg-gradient-to-br from-red-800 via-red-900 to-black"
              )}>
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Featured Episode</h3>
                  <p className="text-red-100 mb-4">Season 1, Episode 3</p>
                  <button className="w-full py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                    <Play className="h-5 w-5" />
                    Watch Now
                  </button>
                </div>
              </div>

              {/* Related Artists */}
              <div className={cn(
                "rounded-2xl p-6",
                currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                currentDesign === 'gallery' && "bg-gray-900 border border-gray-800",
                currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-900/80 to-black border border-gray-800"
              )}>
                <h3 className="text-xl font-bold mb-4">Related Artists</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700" />
                      <div>
                        <h4 className="font-medium">Artist {i}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Afro-Pop • Season 1</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className={cn(
                "rounded-2xl p-6",
                currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                currentDesign === 'gallery' && "bg-gray-900 border border-gray-800",
                currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-900/80 to-black border border-gray-800"
              )}>
                <h3 className="text-xl font-bold mb-4">Career Highlights</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-red-600" />
                      <span>Awards</span>
                    </div>
                    <span className="font-bold">{artist.awards}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-red-600" />
                      <span>Collaborations</span>
                    </div>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Play className="h-5 w-5 text-red-600" />
                      <span>Music Videos</span>
                    </div>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-red-600" />
                      <span>Tours</span>
                    </div>
                    <span className="font-bold">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

