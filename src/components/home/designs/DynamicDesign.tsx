"use client"

import { FeaturedArtists } from '../widgets/FeaturedArtists'
import { LatestContent } from '../widgets/LatestContent'
import { StatsWidget } from '../widgets/StatsWidget'
import { NewsletterWidget } from '../widgets/NewsletterWidget'
import { cn } from '@/lib/utils'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Music, 
  Mic2, 
  Headphones, 
  Radio,
  ChevronRight,
  Zap,
  Target,
  Globe
} from 'lucide-react'

interface DynamicDesignProps {
  widgetPosition: 'left' | 'right' | 'both' | 'none'
}

export function DynamicDesign({ widgetPosition }: DynamicDesignProps) {
  const [activeSection, setActiveSection] = useState('artists')
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const hasLeftWidget = widgetPosition === 'left' || widgetPosition === 'both'
  const hasRightWidget = widgetPosition === 'right' || widgetPosition === 'both'

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-screen"
            style={{
              background: `radial-gradient(circle, rgba(220, 38, 38, ${0.1 + Math.random() * 0.2}) 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with parallax effect */}
        <motion.header
          style={{ rotateX, rotateY }}
          className="text-center mb-16 p-8 rounded-3xl bg-gradient-to-r from-black/50 to-red-900/30 backdrop-blur-xl border border-white/10"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Zap className="h-6 w-6 text-red-500 animate-pulse" />
            <span className="font-bold tracking-widest text-red-400 uppercase text-sm">
              Interactive Experience
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent"
          >
            AFRO
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(220, 38, 38, 0.5)",
                  "0 0 40px rgba(220, 38, 38, 0.8)",
                  "0 0 20px rgba(220, 38, 38, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-red-500"
            >
              QUEENS
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Where African female talent meets interactive digital experience
          </motion.p>

          {/* Interactive tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: 'artists', label: 'Artists', icon: Mic2 },
              { id: 'music', label: 'Music', icon: Headphones },
              { id: 'stories', label: 'Stories', icon: Radio },
              { id: 'impact', label: 'Impact', icon: Target },
              { id: 'global', label: 'Global', icon: Globe },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
                  activeSection === tab.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                )}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  activeSection === tab.id && "rotate-90"
                )} />
              </motion.button>
            ))}
          </div>
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Widgets */}
          {hasLeftWidget && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/4 space-y-6"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-black/80 to-red-900/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-red-500" />
                  Live Stats
                </h3>
                <StatsWidget variant="interactive" />
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-red-900/20 to-black/80 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <NewsletterWidget variant="interactive" />
              </motion.div>
            </motion.aside>
          )}

          {/* Main Content - Changes based on active tab */}
          <main className={cn(
            "flex-1",
            hasLeftWidget && hasRightWidget ? "lg:w-1/2" :
            hasLeftWidget || hasRightWidget ? "lg:w-3/4" : "w-full"
          )}>
            <AnimatedContent activeSection={activeSection} />
          </main>

          {/* Right Widgets */}
          {hasRightWidget && (
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/4 space-y-6"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-black/80 to-gray-900/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <LatestContent variant="interactive" layout="compact" />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-red-900/40 to-black/80 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center"
              >
                <Music className="h-12 w-12 mx-auto mb-4 text-red-500" />
                <h3 className="text-lg font-bold mb-2">Interactive Player</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Explore music from featured artists
                </p>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-bold transition-colors">
                  Launch Player
                </button>
              </motion.div>
            </motion.aside>
          )}
        </div>
      </div>

      {/* Floating CTA */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="fixed bottom-8 right-8 z-20"
      >
        <button className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-full font-bold shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 transition-all group">
          <span className="flex items-center gap-2">
            Join Experience
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </motion.div>
    </div>
  )
}

function AnimatedContent({ activeSection }: { activeSection: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-gradient-to-br from-black/60 to-red-900/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
      >
        {activeSection === 'artists' && (
          <>
            <h2 className="text-3xl font-bold mb-6">Interactive Artist Showcase</h2>
            <FeaturedArtists 
              layout="interactive" 
              variant="dynamic"
            />
          </>
        )}
        
        {activeSection === 'music' && (
          <div className="text-center py-12">
            <Headphones className="h-24 w-24 mx-auto mb-6 text-red-500" />
            <h2 className="text-3xl font-bold mb-4">Immersive Music Experience</h2>
            <p className="text-gray-300 text-xl mb-8">
              Coming soon: Interactive audio visualizer and collaborative playlists
            </p>
          </div>
        )}
        
        {activeSection === 'stories' && (
          <LatestContent variant="dynamic" layout="grid" />
        )}
        
        {activeSection === 'impact' && (
          <div className="py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <Target className="inline h-8 w-8 mr-3 text-red-500" />
              Our #FEMUP70% Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { value: "70%", label: "Female Representation", desc: "Target for all events" },
                { value: "200%", label: "Stream Growth", desc: "Average artist increase" },
                { value: "50+", label: "Career Launches", desc: "Since platform launch" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="bg-black/50 rounded-2xl p-6 text-center border border-white/10"
                >
                  <div className="text-4xl font-bold text-red-500 mb-2">{stat.value}</div>
                  <div className="font-bold mb-1">{stat.label}</div>
                  <div className="text-gray-400 text-sm">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {activeSection === 'global' && (
          <div className="py-12 text-center">
            <Globe className="h-24 w-24 mx-auto mb-6 text-red-500" />
            <h2 className="text-3xl font-bold mb-4">Global Reach</h2>
            <p className="text-gray-300 text-xl mb-8">
              Connecting African female artists with audiences worldwide
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

