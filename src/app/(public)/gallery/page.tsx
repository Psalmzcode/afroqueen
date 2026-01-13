"use client"

import { PageLayout } from '@/components/layout/PageLayout'
import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Grid3x3, 
  Image as ImageIcon, 
  Video, 
  Download,
  Share2,
  Heart,
  X,
  Calendar,
  User,
  ChevronDown
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useDesign } from '@/context/design-context'

const galleryItems = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  type: i % 5 === 0 ? 'video' : 'photo',
  title: `Gallery Item ${i + 1}`,
  description: i % 3 === 0 
    ? 'Behind the scenes from Season 2 recording' 
    : i % 3 === 1 
    ? 'Live performance at Afroqueens Festival' 
    : 'Studio session with featured artists',
  category: i % 4 === 0 ? 'Behind the Scenes' : 
            i % 4 === 1 ? 'Live Performances' : 
            i % 4 === 2 ? 'Studio Sessions' : 'Events',
  artist: `Artist ${i % 6 + 1}`,
  season: `Season ${i % 3 + 1}`,
  date: `Dec ${i % 28 + 1}, 2025`,
  likes: Math.floor(Math.random() * 1000),
  downloads: Math.floor(Math.random() * 500),
}))

const categories = ['All', 'Behind the Scenes', 'Live Performances', 'Studio Sessions', 'Events', 'Interviews']
const artists = ['All Artists', 'Artist 1', 'Artist 2', 'Artist 3', 'Artist 4', 'Artist 5', 'Artist 6']
const seasons = ['All Seasons', 'Season 1', 'Season 2', 'Season 3']

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedArtist, setSelectedArtist] = useState('All Artists')
  const [selectedSeason, setSelectedSeason] = useState('All Seasons')
  const [layout, setLayout] = useState<'masonry' | 'grid'>('masonry')
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const { currentDesign } = useDesign()

  const filteredItems = galleryItems.filter(item => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false
    if (selectedArtist !== 'All Artists' && item.artist !== selectedArtist) return false
    if (selectedSeason !== 'All Seasons' && item.season !== selectedSeason) return false
    return true
  })

  const selectedItemData = selectedItem ? galleryItems.find(item => item.id === selectedItem) : null

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-900/20" />
        
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Visual <span className="text-red-400">Storytelling</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore behind-the-scenes moments, live performances, and studio sessions 
              from the Afroqueens universe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter Toggles */}
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors">
                  <Filter className="h-5 w-5" />
                  {selectedCategory}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute hidden group-hover:block z-50 mt-1 w-48 rounded-lg bg-gray-900 border border-gray-800 shadow-lg">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Artist Filter */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors">
                  <User className="h-5 w-5" />
                  {selectedArtist}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute hidden group-hover:block z-50 mt-1 w-48 rounded-lg bg-gray-900 border border-gray-800 shadow-lg">
                  {artists.map((artist) => (
                    <button
                      key={artist}
                      onClick={() => setSelectedArtist(artist)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {artist}
                    </button>
                  ))}
                </div>
              </div>

              {/* Season Filter */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors">
                  <Calendar className="h-5 w-5" />
                  {selectedSeason}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute hidden group-hover:block z-50 mt-1 w-48 rounded-lg bg-gray-900 border border-gray-800 shadow-lg">
                  {seasons.map((season) => (
                    <button
                      key={season}
                      onClick={() => setSelectedSeason(season)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCategory !== 'All' || selectedArtist !== 'All Artists' || selectedSeason !== 'All Seasons') && (
                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setSelectedArtist('All Artists')
                    setSelectedSeason('All Seasons')
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Layout Toggle & Search */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-1">
                <button
                  onClick={() => setLayout('masonry')}
                  className={cn(
                    "px-3 py-2 rounded-md transition-colors",
                    layout === 'masonry' 
                      ? "bg-gray-800"
                      : "hover:bg-gray-800"
                  )}
                >
                  <Grid3x3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setLayout('grid')}
                  className={cn(
                    "px-3 py-2 rounded-md transition-colors",
                    layout === 'grid' 
                      ? "bg-gray-800"
                      : "hover:bg-gray-800"
                  )}
                >
                  <ImageIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search gallery..."
                  className="pl-10 pr-4 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {layout === 'masonry' ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={`gallery-item-${item.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="break-inside-avoid mb-4"
                >
                  <div 
                    className={cn(
                      "rounded-xl overflow-hidden cursor-pointer group relative",
                      currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                      currentDesign === 'gallery' && "bg-gray-900 border border-gray-800",
                      currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-900/80 to-black border border-gray-800"
                    )}
                    onClick={() => setSelectedItem(item.id)}
                  >
                    {/* Image/Video Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-red-600/20 to-transparent relative">
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-red-600/80 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                            <Video className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-red-600 transition-colors">
                              <Heart className="h-4 w-4 text-white" />
                            </button>
                            <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-red-600 transition-colors">
                              <Download className="h-4 w-4 text-white" />
                            </button>
                            <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-red-600 transition-colors">
                              <Share2 className="h-4 w-4 text-white" />
                            </button>
                          </div>
                          <div className="text-white text-sm">
                            {item.likes} likes
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-red-600/10 text-red-600 text-xs rounded-full">
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500">{item.season}</span>
                      </div>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{item.artist}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={`gallery-item-${item.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedItem(item.id)}
                >
                  <div className={cn(
                    "rounded-xl overflow-hidden group",
                    currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                    currentDesign === 'gallery' && "bg-gray-900 border border-gray-800",
                    currentDesign === 'dynamic' && "bg-gradient-to-br from-gray-900/80 to-black border border-gray-800"
                  )}>
                    <div className="aspect-square bg-gradient-to-br from-red-600/20 to-transparent" />
                    <div className="p-4">
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{item.artist}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItemData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              layoutId={`gallery-item-${selectedItemData.id}`}
              className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-red-600 transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              {/* Content */}
              <div className="flex flex-col lg:flex-row">
                {/* Image/Video */}
                <div className="lg:w-2/3 bg-gradient-to-br from-red-600/20 to-transparent min-h-[300px] lg:min-h-[500px]" />
                
                {/* Details */}
                <div className="lg:w-1/3 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-red-600/10 text-red-600 text-sm rounded-full">
                      {selectedItemData.category}
                    </span>
                    <span className="text-sm text-gray-400">{selectedItemData.season}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3">{selectedItemData.title}</h2>
                  <p className="text-gray-400 mb-6">{selectedItemData.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="text-sm text-gray-400">Artist</div>
                        <div className="font-medium">{selectedItemData.artist}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="text-sm text-gray-400">Date</div>
                        <div className="font-medium">{selectedItemData.date}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedItemData.likes}</div>
                      <div className="text-sm text-gray-400">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedItemData.downloads}</div>
                      <div className="text-sm text-gray-400">Downloads</div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                      <Download className="h-5 w-5" />
                      Download
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                      <Share2 className="h-5 w-5" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}