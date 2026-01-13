"use client"

import { FeaturedArtists } from '../widgets/FeaturedArtists'
import { LatestContent } from '../widgets/LatestContent'
import { StatsWidget } from '../widgets/StatsWidget'
import { NewsletterWidget } from '../widgets/NewsletterWidget'
import { SocialProof } from '../widgets/SocialProof'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { PlayCircle, Volume2, Users, TrendingUp } from 'lucide-react'

interface EditorialDesignProps {
  widgetPosition: 'left' | 'right' | 'both' | 'none'
}

export function EditorialDesign({ widgetPosition }: EditorialDesignProps) {
  const hasLeftWidget = widgetPosition === 'left' || widgetPosition === 'both'
  const hasRightWidget = widgetPosition === 'right' || widgetPosition === 'both'

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <div className="h-1 w-8 bg-red-600"></div>
          <span className="text-sm font-semibold tracking-widest text-red-600 uppercase">
            Amplifying Voices
          </span>
          <div className="h-1 w-8 bg-red-600"></div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif font-bold mb-6 dark:text-white"
        >
          <span className="text-black dark:text-white">Afro</span>
          <span className="text-red-600">Queens</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Elevating African female musical talent through mentorship, collaboration, and global exposure.
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Widgets */}
        {hasLeftWidget && (
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/4 space-y-6"
          >
            <StatsWidget />
            <NewsletterWidget />
          </motion.aside>
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1",
          hasLeftWidget && hasRightWidget ? "lg:w-1/2" :
          hasLeftWidget || hasRightWidget ? "lg:w-3/4" : "w-full"
        )}>
          {/* Hero Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-black to-red-900 rounded-2xl p-8 mb-8 text-white"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <PlayCircle className="h-8 w-8" />
                <span className="font-semibold tracking-wider">FEATURED EPISODE</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Season 2 Premiere: Breaking Barriers</h2>
              <p className="text-gray-200 mb-6">
                Join us as we launch our second season with five phenomenal artists 
                ready to take the global stage. Exclusive interviews, studio sessions, 
                and behind-the-scenes access.
              </p>
              <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Watch Now
              </button>
            </div>
          </motion.div>

          {/* Featured Artists Grid */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold dark:text-white">Featured Artists</h2>
              <a href="/artists" className="text-red-600 hover:text-red-700 font-medium">
                View All →
              </a>
            </div>
            <FeaturedArtists layout="grid" />
          </section>

          {/* Latest Content */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Latest from Afroqueens</h2>
            <LatestContent layout="list" />
          </section>

          {/* Impact Stats */}
          <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Users, value: "50+", label: "Artists Empowered" },
                { icon: Volume2, value: "100K+", label: "Streams Generated" },
                { icon: TrendingUp, value: "70%", label: "Female Representation" },
                { icon: PlayCircle, value: "24", label: "Episodes Produced" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-red-600" />
                  <div className="text-3xl font-bold dark:text-white">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        {/* Right Widgets */}
        {hasRightWidget && (
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/4 space-y-6"
          >
            <SocialProof />
            <LatestContent layout="compact" />
          </motion.aside>
        )}
      </div>
    </div>
  )
}

