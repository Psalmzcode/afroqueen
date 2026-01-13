"use client"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { FileText, Headphones, TrendingUp, ChevronRight } from 'lucide-react'

interface LatestContentProps {
  layout?: 'list' | 'compact' | 'grid'
  variant?: 'light' | 'dark' | 'dynamic' | 'interactive'
}

const content = [
  { 
    id: 1, 
    title: "The Rise of African Female Producers", 
    category: "Blog", 
    date: "Feb 12, 2026",
    icon: FileText
  },
  { 
    id: 2, 
    title: "Episode 3: Breaking Industry Barriers", 
    category: "Podcast", 
    date: "Feb 10, 2026",
    icon: Headphones
  },
  { 
    id: 3, 
    title: "#FEMUP70%: Our First Year Impact", 
    category: "Report", 
    date: "Feb 8, 2026",
    icon: TrendingUp
  },
]

export function LatestContent({ layout = 'list', variant = 'light' }: LatestContentProps) {
  const isDark = variant === 'dark' || variant === 'dynamic' || variant === 'interactive'

  if (layout === 'compact') {
    return (
      <div className="space-y-3">
        <h3 className={cn(
          "text-lg font-bold mb-4",
          isDark ? "text-white" : "text-gray-900"
        )}>
          Latest
        </h3>
        {content.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "p-3 rounded-lg cursor-pointer transition-all hover:translate-x-1",
              isDark 
                ? "bg-gray-800/50 hover:bg-gray-800/70 border border-white/5" 
                : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
            )}
          >
            <div className="flex items-start gap-3">
              <item.icon className={cn(
                "h-5 w-5 mt-0.5 flex-shrink-0",
                isDark ? "text-red-400" : "text-red-600"
              )} />
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-medium mb-1 line-clamp-2",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  {item.title}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className={cn(
                    isDark ? "text-gray-400" : "text-gray-500"
                  )}>
                    {item.category}
                  </span>
                  <span className={cn(
                    isDark ? "text-gray-600" : "text-gray-400"
                  )}>
                    •
                  </span>
                  <span className={cn(
                    isDark ? "text-gray-400" : "text-gray-500"
                  )}>
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={cn(
              "p-6 rounded-2xl cursor-pointer transition-all border",
              isDark 
                ? "bg-gradient-to-br from-gray-900/80 to-black/80 border-white/10 hover:border-red-500/50" 
                : "bg-white border-gray-200 hover:border-red-300"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
              isDark ? "bg-red-600/20" : "bg-red-100"
            )}>
              <item.icon className={cn(
                "h-6 w-6",
                isDark ? "text-red-400" : "text-red-600"
              )} />
            </div>
            <h3 className={cn(
              "text-lg font-bold mb-2",
              isDark ? "text-white" : "text-gray-900"
            )}>
              {item.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-sm",
                isDark ? "text-gray-400" : "text-gray-600"
              )}>
                {item.category}
              </span>
              <span className={cn(
                "text-sm",
                isDark ? "text-gray-500" : "text-gray-400"
              )}>
                {item.date}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  // Default list layout
  return (
    <div className="space-y-4">
      {content.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ x: 4 }}
          className={cn(
            "flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border",
            isDark 
              ? "bg-gray-900/50 border-gray-800 hover:border-red-500/50 hover:bg-gray-900/70" 
              : "bg-white border-gray-200 hover:border-red-200 hover:bg-red-50/50"
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
            isDark ? "bg-red-600/20" : "bg-red-100"
          )}>
            <item.icon className={cn(
              "h-6 w-6",
              isDark ? "text-red-400" : "text-red-600"
            )} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-lg font-semibold mb-1",
              isDark ? "text-white" : "text-gray-900"
            )}>
              {item.title}
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                isDark 
                  ? "bg-red-600/20 text-red-400" 
                  : "bg-red-100 text-red-700"
              )}>
                {item.category}
              </span>
              <span className={cn(
                isDark ? "text-gray-500" : "text-gray-400"
              )}>
                {item.date}
              </span>
            </div>
          </div>
          <ChevronRight className={cn(
            "h-5 w-5 flex-shrink-0",
            isDark ? "text-gray-600" : "text-gray-400"
          )} />
        </motion.div>
      ))}
    </div>
  )
}

