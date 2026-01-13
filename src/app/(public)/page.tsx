"use client"

import { useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { DesignToggle } from '@/components/home/design-switcher/DesignToggle'
import { WidgetPositionToggle } from '@/components/home/design-switcher/WidgetPositionToggle'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { EditorialDesign } from '@/components/home/designs/EditorialDesign'
import { GalleryDesign } from '@/components/home/designs/GalleryDesign'
import { DynamicDesign } from '@/components/home/designs/DynamicDesign'
import { useDesign } from '@/context/design-context'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const { currentDesign, widgetPosition } = useDesign()
  const [showControls, setShowControls] = useState(false)

  const renderDesign = () => {
    switch (currentDesign) {
      case 'editorial':
        return <EditorialDesign widgetPosition={widgetPosition} />
      case 'gallery':
        return <GalleryDesign widgetPosition={widgetPosition} />
      case 'dynamic':
        return <DynamicDesign widgetPosition={widgetPosition} />
      default:
        return <EditorialDesign widgetPosition={widgetPosition} />
    }
  }

  return (
    <PageLayout>
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Floating Controls */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowControls(!showControls)}
          className={cn(
            "p-3 rounded-full shadow-lg backdrop-blur-sm",
            "bg-gradient-to-br from-black to-red-600",
            "text-white font-bold text-sm"
          )}
        >
          {showControls ? '▼' : '▲'}
        </motion.button>

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-2 bg-white/90 dark:bg-black/90 backdrop-blur-lg p-4 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
            >
              <ThemeToggle />
              <DesignToggle />
              <WidgetPositionToggle />
              
              <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Current: <span className="text-red-600 dark:text-red-400 font-bold">{currentDesign.toUpperCase()}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Widgets: {widgetPosition}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDesign}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderDesign()}
        </motion.div>
      </AnimatePresence>
    </div>
    </PageLayout>
  )
}

