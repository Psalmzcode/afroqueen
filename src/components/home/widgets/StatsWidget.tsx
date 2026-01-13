"use client"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Music, Mic2 } from 'lucide-react'

interface StatsWidgetProps {
  variant?: 'light' | 'dark' | 'interactive'
}

const stats = [
  { icon: Users, value: "50+", label: "Artists Empowered", color: "text-red-600" },
  { icon: Music, value: "100K+", label: "Streams Generated", color: "text-blue-600" },
  { icon: TrendingUp, value: "70%", label: "Female Representation", color: "text-green-600" },
  { icon: Mic2, value: "24", label: "Episodes Produced", color: "text-purple-600" },
]

export function StatsWidget({ variant = 'light' }: StatsWidgetProps) {
  const isDark = variant === 'dark' || variant === 'interactive'

  return (
    <div className={cn(
      "rounded-2xl p-6",
      isDark 
        ? "bg-gray-900/50 border border-white/10" 
        : "bg-white border border-gray-200 shadow-lg"
    )}>
      <h3 className={cn(
        "text-lg font-bold mb-4",
        isDark ? "text-white" : "text-gray-900"
      )}>
        Impact Stats
      </h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              isDark ? "bg-gray-800" : "bg-gray-100"
            )}>
              <stat.icon className={cn(
                "h-5 w-5",
                stat.color
              )} />
            </div>
            <div className="flex-1">
              <div className={cn(
                "text-2xl font-bold",
                isDark ? "text-white" : "text-gray-900"
              )}>
                {stat.value}
              </div>
              <div className={cn(
                "text-sm",
                isDark ? "text-gray-400" : "text-gray-600"
              )}>
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

