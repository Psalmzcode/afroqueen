"use client"

import { FeaturedArtists } from '../widgets/FeaturedArtists'
import { LatestContent } from '../widgets/LatestContent'
import { StatsWidget } from '../widgets/StatsWidget'
import { NewsletterWidget } from '../widgets/NewsletterWidget'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Play, Sparkles, Music, Heart } from 'lucide-react'

interface GalleryDesignProps {
  widgetPosition: 'left' | 'right' | 'both' | 'none'
}

export function GalleryDesign({ widgetPosition }: GalleryDesignProps) {
  const hasLeftWidget = widgetPosition === 'left' || widgetPosition === 'both'
  const hasRightWidget = widgetPosition === 'right' || widgetPosition === 'both'

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Full-bleed Hero */}
      <div className="relative h-screen overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/30 to-black"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-red-500 rounded-full"
              initial={{ y: -100, x: Math.random() * 100 }}
              animate={{
                y: [0, 1000],
                x: [Math.random() * 100, Math.random() * 100 + 100],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Sparkles className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
                AFROQUEENS
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mb-8"
          >
            A visual celebration of African female musical excellence
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <button className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all transform hover:scale-105">
              <Play className="inline h-5 w-5 mr-2" />
              Explore Artists
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all border border-white/30">
              View Gallery
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-sm text-gray-400">Scroll to explore</div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Widgets */}
          {hasLeftWidget && (
            <aside className="lg:w-1/4 space-y-6">
              <div className="bg-gray-900 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Music className="h-5 w-5 text-red-500" />
                  Quick Stats
                </h3>
                <StatsWidget variant="dark" />
              </div>
            </aside>
          )}

          {/* Main Gallery */}
          <main className={cn(
            "flex-1",
            hasLeftWidget && hasRightWidget ? "lg:w-1/2" :
            hasLeftWidget || hasRightWidget ? "lg:w-3/4" : "w-full"
          )}>
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">
                  <span className="text-red-500">Featured</span> Artists
                </h2>
                <div className="flex items-center gap-2 text-gray-400">
                  <Heart className="h-5 w-5" />
                  <span>Tap to explore</span>
                </div>
              </div>
              <FeaturedArtists 
                layout="masonry" 
                variant="dark"
              />
            </section>

            {/* Video Grid */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Latest Episodes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-black/50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-red-600 transition-colors">
                        <Play className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-xl font-bold mb-2">Episode {i}</h3>
                      <p className="text-gray-300">Behind the scenes with our artists</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </main>

          {/* Right Widgets */}
          {hasRightWidget && (
            <aside className="lg:w-1/4 space-y-6">
              <div className="bg-gray-900 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
                <NewsletterWidget variant="dark" />
              </div>
              <div className="bg-gradient-to-br from-red-900/30 to-black rounded-2xl p-6">
                <LatestContent variant="dark" layout="compact" />
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-red-900/20 to-black/50 py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Join the Movement</h2>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
            Be part of the revolution amplifying African female voices in music
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-transform transform hover:scale-105">
            Support #FEMUP70%
          </button>
        </div>
      </div>
    </div>
  )
}

