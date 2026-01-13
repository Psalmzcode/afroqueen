"use client"

import { PageLayout } from '@/components/layout/PageLayout'
import { useState } from 'react'
import { 
  Play, 
  Calendar, 
  Clock, 
  Users, 
  Eye, 
  ChevronRight,
  Filter,
  Search,
  ListVideo
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useDesign } from '@/context/design-context'

const episodes = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Episode ${i + 1}: ${i % 3 === 0 ? 'Breaking Barriers' : i % 3 === 1 ? 'Studio Sessions' : 'Live Performances'}`,
  description: i % 3 === 0 
    ? 'An in-depth look at how our artists overcome industry challenges' 
    : i % 3 === 1 
    ? 'Behind the scenes in the studio with featured artists' 
    : 'Live performances from our latest showcase event',
  season: `Season ${Math.floor(i / 4) + 1}`,
  episodeNumber: i + 1,
  duration: `${Math.floor(Math.random() * 30) + 20}:00`,
  views: Math.floor(Math.random() * 10000) + 1000,
  featuredArtists: Array.from({ length: Math.floor(Math.random() * 3) + 2 }, (_, j) => `Artist ${j + 1}`),
  airDate: `Dec ${Math.floor(Math.random() * 28) + 1}, 2025`,
}))

const seasons = ['All Seasons', 'Season 1', 'Season 2', 'Season 3']

export default function EpisodesPage() {
  const [selectedSeason, setSelectedSeason] = useState('All Seasons')
  const [search, setSearch] = useState('')
  const { currentDesign } = useDesign()

  const filteredEpisodes = episodes.filter(episode => {
    if (selectedSeason !== 'All Seasons' && episode.season !== selectedSeason) return false
    if (search && !episode.title.toLowerCase().includes(search.toLowerCase()) && 
        !episode.description.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className={cn(
          "absolute inset-0",
          currentDesign === 'editorial' && "bg-gradient-to-br from-red-50 to-white dark:from-red-900/10 dark:to-black",
          currentDesign === 'gallery' && "bg-gradient-to-b from-black via-red-900/30 to-black",
          currentDesign === 'dynamic' && "bg-gradient-to-b from-black via-red-950/40 to-black"
        )} />
        
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30">
                <ListVideo className="h-4 w-4 text-red-600" />
                <span className="text-sm font-semibold text-red-600">Afroqueens Series</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Watch the <span className="text-red-600">Journey</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Follow the incredible stories of African female artists as they navigate 
                the music industry, create timeless music, and build their careers.
              </p>
              
              {/* Season Navigation */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {seasons.map((season) => (
                  <button
                    key={season}
                    onClick={() => setSelectedSeason(season)}
                    className={cn(
                      "px-4 py-2 rounded-full transition-colors",
                      selectedSeason === season
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    )}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search & Stats */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search episodes..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{filteredEpisodes.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Episodes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Seasons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Views</div>
              </div>
            </div>
          </div>

          {/* Featured Episode */}
          {filteredEpisodes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "rounded-3xl overflow-hidden mb-12",
                currentDesign === 'editorial' && "bg-gradient-to-r from-red-600 to-red-800",
                currentDesign === 'gallery' && "bg-gradient-to-r from-red-900 to-black",
                currentDesign === 'dynamic' && "bg-gradient-to-r from-red-800 via-red-900 to-black"
              )}
            >
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                    <span className="text-sm font-medium">Featured Episode</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{filteredEpisodes[0].title}</h2>
                  <p className="text-red-100 mb-6">{filteredEpisodes[0].description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{filteredEpisodes[0].airDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{filteredEpisodes[0].duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">{filteredEpisodes[0].views.toLocaleString()} views</span>
                    </div>
                  </div>
                  
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    <Play className="h-5 w-5" />
                    Watch Now
                  </button>
                </div>
                
                <div className="hidden md:block relative">
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-red-900/50 to-red-900/80" />
                  <div className="h-full bg-gradient-to-br from-red-600/20 to-transparent flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">All Episodes</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEpisodes.slice(1).map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "rounded-2xl overflow-hidden group cursor-pointer",
                  currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                  currentDesign === 'gallery' && "bg-gray-900 border border-gray-800",
                  currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-900/80 to-black border border-gray-800"
                )}
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-red-600/20 to-transparent relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600/80 flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 transition-all">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Season Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                    {episode.season}
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-white text-sm">
                    {episode.duration}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-red-600">{episode.season}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-500">Episode {episode.episodeNumber}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                    {episode.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {episode.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {episode.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {episode.featuredArtists.length} artists
                      </div>
                    </div>
                    
                    <button className="text-red-600 hover:text-red-700">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                Previous
              </button>
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  className={cn(
                    "px-4 py-2 rounded-lg transition-colors",
                    num === 1
                      ? "bg-red-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {num}
                </button>
              ))}
              <button className="px-4 py-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                Next
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className={cn(
            "rounded-3xl p-8 md:p-12 text-center",
            currentDesign === 'editorial' && "bg-gradient-to-r from-red-600 to-red-800",
            currentDesign === 'gallery' && "bg-gradient-to-r from-red-900 to-black",
            currentDesign === 'dynamic' && "bg-gradient-to-r from-red-800 via-red-900 to-black"
          )}>
            <h2 className="text-3xl font-bold text-white mb-4">Never Miss an Episode</h2>
            <p className="text-red-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our YouTube channel and turn on notifications to be the 
              first to watch new episodes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Subscribe on YouTube
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors">
                Set Reminder
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}