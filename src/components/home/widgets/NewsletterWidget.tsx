"use client"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { useState } from 'react'

interface NewsletterWidgetProps {
  variant?: 'light' | 'dark' | 'interactive'
}

export function NewsletterWidget({ variant = 'light' }: NewsletterWidgetProps) {
  const [email, setEmail] = useState('')
  const isDark = variant === 'dark' || variant === 'interactive'

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "rounded-2xl p-6",
        isDark 
          ? "bg-gradient-to-br from-red-900/20 to-black/80 border border-white/10" 
          : "bg-gradient-to-br from-red-50 to-white border border-red-200 shadow-lg"
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          isDark ? "bg-red-600/20" : "bg-red-100"
        )}>
          <Mail className={cn(
            "h-5 w-5",
            isDark ? "text-red-400" : "text-red-600"
          )} />
        </div>
        <h3 className={cn(
          "text-lg font-bold",
          isDark ? "text-white" : "text-gray-900"
        )}>
          Newsletter
        </h3>
      </div>
      
      <p className={cn(
        "text-sm mb-4",
        isDark ? "text-gray-300" : "text-gray-600"
      )}>
        Stay updated with latest episodes, artist features, and industry insights.
      </p>
      
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          // Handle newsletter signup
          setEmail('')
        }}
        className="space-y-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={cn(
            "w-full px-4 py-2 rounded-lg text-sm transition-colors",
            isDark 
              ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500" 
              : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500"
          )}
          required
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className={cn(
            "w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
            isDark 
              ? "bg-red-600 hover:bg-red-700 text-white" 
              : "bg-red-600 hover:bg-red-700 text-white"
          )}
        >
          <Send className="h-4 w-4" />
          Subscribe
        </motion.button>
      </form>
    </motion.div>
  )
}

