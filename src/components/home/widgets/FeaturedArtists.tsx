"use client"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Music, Instagram, Play } from 'lucide-react'

interface FeaturedArtistsProps {
  layout?: 'grid' | 'masonry' | 'interactive'
  variant?: 'light' | 'dark' | 'dynamic'
}

const artists = [
  {
    id: 1,
    name: "Amina Blu",
    stageName: "Amina Blu",
    genre: "Afro-Soul",
    image: "/api/placeholder/400/400",
    color: "#DC2626",
    streamCount: "2.4M"
  },
  {
    id: 2,
    name: "Zahara Moyo",
    stageName: "Zahara",
    genre: "Afro-Pop",
    image: "/api/placeholder/400/400",
    color: "#059669",
    streamCount: "1.8M"
  },
  {
    id: 3,
    name: "Kemi Ade",
    stageName: "Kemi",
    genre: "Afro-Jazz",
    image: "/api/placeholder/400/400",
    color: "#7C3AED",
    streamCount: "1.2M"
  },
  {
    id: 4,
    name: "Nia Banks",
    stageName: "Nia B",
    genre: "Afro-House",
    image: "/api/placeholder/400/400",
    color: "#0EA5E9",
    streamCount: "3.1M"
  },
  {
    id: 5,
    name: "Sade Olowe",
    stageName: "Sade O",
    genre: "Afro-R&B",
    image: "/api/placeholder/400/400",
    color: "#F59E0B",
    streamCount: "1.5M"
  },
  {
    id: 6,
    name: "Yemi Kuti",
    stageName: "Yemi K",
    genre: "Afro-Fusion",
    image: "/api/placeholder/400/400",
    color: "#EC4899",
    streamCount: "2.7M"
  },
]

export function FeaturedArtists({ layout = 'grid', variant = 'light' }: FeaturedArtistsProps) {
  const isDark = variant === 'dark' || variant === 'dynamic'
  
  if (layout === 'masonry') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {artists.map((artist, index) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative rounded-2xl overflow-hidden group cursor-pointer",
              index === 0 || index === 4 ? "row-span-2" : "row-span-1",
              isDark ? "bg-gray-900" : "bg-white shadow-lg"
            )}
            style={{ height: index === 0 || index === 4 ? '500px' : '240px' }}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
              style={{ background: `linear-gradient(to top, ${artist.color}99, transparent)` }}
            />
            <div className="absolute inset-0 bg-gray-300 animate-pulse" />
            
            <div className="relative z-20 h-full flex flex-col justify-end p-6">
              <div className="mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  {artist.genre}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{artist.stageName}</h3>
              <p className="text-gray-200 text-sm mb-3">{artist.name}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/80">
                  <Play className="h-4 w-4" />
                  <span className="text-sm">{artist.streamCount} streams</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100">
                  Explore
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (layout === 'interactive') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <motion.div
            key={artist.id}
            whileHover={{ y: -8, scale: 1.02 }}
            className={cn(
              "relative rounded-2xl overflow-hidden group cursor-pointer border-2",
              isDark 
                ? "border-white/10 bg-gradient-to-br from-gray-900/80 to-black/80" 
                : "border-gray-200 bg-white"
            )}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <Music className="h-8 w-8 text-white" />
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700"
                >
                  <Play className="h-5 w-5 text-white" />
                </motion.button>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{artist.stageName}</h3>
              <p className={cn(
                "text-sm mb-3",
                isDark ? "text-gray-300" : "text-gray-600"
              )}>
                {artist.name} • {artist.genre}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-sm font-medium",
                  isDark ? "text-gray-400" : "text-gray-500"
                )}>
                  {artist.streamCount} streams
                </span>
                <Instagram className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  // Default grid layout
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artists.slice(0, 6).map((artist, index) => (
        <motion.div
          key={artist.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className={cn(
            "rounded-xl overflow-hidden border transition-all cursor-pointer",
            isDark 
              ? "bg-gray-900 border-gray-800 hover:border-red-500" 
              : "bg-white border-gray-200 hover:border-red-300"
          )}
        >
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{artist.stageName}</h3>
                <p className={cn(
                  "text-sm",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  {artist.genre}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <Music className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className={cn(
              "text-sm mb-4",
              isDark ? "text-gray-300" : "text-gray-700"
            )}>
              <p>{artist.name}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-sm font-medium",
                isDark ? "text-red-400" : "text-red-600"
              )}>
                {artist.streamCount} streams
              </span>
              <button className={cn(
                "px-4 py-1 rounded-full text-sm font-medium transition-colors",
                isDark 
                  ? "bg-red-600 hover:bg-red-700 text-white" 
                  : "bg-red-100 hover:bg-red-200 text-red-700"
              )}>
                Profile
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

