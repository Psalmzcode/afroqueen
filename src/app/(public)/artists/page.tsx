"use client"

import { PageLayout } from '@/components/layout/PageLayout'
import { FeaturedArtists } from '@/components/home/widgets/FeaturedArtists'
import { useState } from 'react'
import { Search, Filter, Grid, List, ChevronDown, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useDesign } from '@/context/design-context'
import Link from 'next/link'

const genres = [
  'All Genres', 'Afrobeats', 'Afro-Soul', 'Afro-Pop', 'Afro-Jazz', 
  'Afro-House', 'Afro-R&B', 'Afro-Fusion', 'Amapiano', 'Highlife'
]

const seasons = ['All Seasons', 'Season 1', 'Season 2', 'Season 3', 'Upcoming']
const statuses = ['All', 'Active', 'Featured', 'Alumni']

export default function ArtistsPage() {
  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All Genres')
  const [selectedSeason, setSelectedSeason] = useState('All Seasons')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const { currentDesign } = useDesign()

  // Filter artists based on selections
  const filteredArtists = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Artist ${i + 1}`,
    stageName: `Stage Name ${i + 1}`,
    genre: genres[Math.floor(Math.random() * (genres.length - 1)) + 1],
    season: seasons[Math.floor(Math.random() * (seasons.length - 1)) + 1],
    status: statuses[Math.floor(Math.random() * (statuses.length - 1)) + 1],
    streams: `${Math.floor(Math.random() * 5) + 1}M`,
    featured: i < 3,
  }))

  const handleClearFilters = () => {
    setSearch('')
    setSelectedGenre('All Genres')
    setSelectedSeason('All Seasons')
    setSelectedStatus('All')
  }

  const activeFilters = [
    selectedGenre !== 'All Genres' && selectedGenre,
    selectedSeason !== 'All Seasons' && selectedSeason,
    selectedStatus !== 'All' && selectedStatus,
    search && `Search: "${search}"`
  ].filter(Boolean)

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className={cn(
          "absolute inset-0",
          currentDesign === 'editorial' && "bg-gradient-to-br from-red-50 to-white dark:from-red-900/10 dark:to-black",
          currentDesign === 'gallery' && "bg-gradient-to-b from-black via-red-900/20 to-black",
          currentDesign === 'dynamic' && "bg-gradient-to-b from-black via-red-950/30 to-black"
        )} />
        
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover <span className="text-red-600">Extraordinary</span> Talent
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Meet the phenomenal African female artists changing the music landscape, 
              one note at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-16 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search artists by name, genre, or season..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Layout & Filter Toggles */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
                <button
                  onClick={() => setLayout('grid')}
                  className={cn(
                    "px-3 py-2 rounded-md transition-colors",
                    layout === 'grid' 
                      ? "bg-white dark:bg-gray-800 shadow-sm"
                      : "hover:bg-white/50 dark:hover:bg-gray-800/50"
                  )}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={cn(
                    "px-3 py-2 rounded-md transition-colors",
                    layout === 'list' 
                      ? "bg-white dark:bg-gray-800 shadow-sm"
                      : "hover:bg-white/50 dark:hover:bg-gray-800/50"
                  )}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",
                  showFilters 
                    ? "bg-red-600 text-white" 
                    : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800"
                )}
              >
                <Filter className="h-5 w-5" />
                Filters
                {activeFilters.length > 0 && (
                  <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilters.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {activeFilters.map((filter, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                >
                  {filter}
                  <button
                    onClick={handleClearFilters}
                    className="hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleClearFilters}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Genre Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Genre</label>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-full transition-colors",
                          selectedGenre === genre
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                        )}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Season Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Season</label>
                  <div className="grid grid-cols-2 gap-2">
                    {seasons.map((season) => (
                      <button
                        key={season}
                        onClick={() => setSelectedSeason(season)}
                        className={cn(
                          "px-3 py-2 text-sm rounded-lg transition-colors text-left",
                          selectedSeason === season
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                        )}
                      >
                        {season}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={cn(
                          "px-3 py-2 text-sm rounded-lg transition-colors",
                          selectedStatus === status
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Artists Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              Featured Artists <span className="text-red-600">({filteredArtists.length})</span>
            </h2>
            <select className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900">
              <option>Sort by: Featured</option>
              <option>Sort by: Name A-Z</option>
              <option>Sort by: Latest</option>
              <option>Sort by: Most Streams</option>
            </select>
          </div>

          {layout === 'grid' ? (
            <FeaturedArtists 
              layout="grid" 
              variant={currentDesign === 'gallery' || currentDesign === 'dynamic' ? 'dark' : 'light'}
            />
          ) : (
            <div className="space-y-4">
              {filteredArtists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "rounded-xl p-6 border transition-all hover:shadow-lg",
                    currentDesign === 'editorial' && "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
                    currentDesign === 'gallery' && "bg-gray-900 border-gray-800",
                    currentDesign === 'dynamic' && "bg-gradient-to-r from-gray-900/80 to-black border-gray-800"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {artist.stageName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link 
                            href={`/artists/${artist.stageName.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-xl font-bold hover:text-red-600 transition-colors"
                          >
                            {artist.stageName}
                          </Link>
                          <p className="text-gray-600 dark:text-gray-400">{artist.name}</p>
                        </div>
                        {artist.featured && (
                          <span className="px-3 py-1 bg-red-600 text-white text-xs rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{artist.genre}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{artist.season}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
                        <span className="text-sm text-red-600 font-medium">{artist.streams} streams</span>
                      </div>
                    </div>
                    <Link 
                      href={`/artists/${artist.stageName.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors inline-block"
                    >
                      View Profile
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((num) => (
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
            <h2 className="text-3xl font-bold text-white mb-4">Are You an Artist?</h2>
            <p className="text-red-100 mb-8 max-w-2xl mx-auto">
              Join the Afroqueens movement and take your career to the next level. 
              Apply now to be part of our next season.
            </p>
            <button className="px-8 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

