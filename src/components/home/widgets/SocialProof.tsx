"use client"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Star, Twitter, Instagram, Youtube } from 'lucide-react'

interface SocialProofProps {
  variant?: 'light' | 'dark'
}

const testimonials = [
  {
    name: "Sarah K.",
    role: "Music Producer",
    text: "Afroqueens changed my career trajectory completely.",
    rating: 5
  },
  {
    name: "Amina T.",
    role: "Artist",
    text: "The mentorship program is phenomenal. Highly recommend!",
    rating: 5
  },
]

const socialLinks = [
  { icon: Twitter, label: "Twitter", followers: "25K" },
  { icon: Instagram, label: "Instagram", followers: "45K" },
  { icon: Youtube, label: "YouTube", followers: "18K" },
]

export function SocialProof({ variant = 'light' }: SocialProofProps) {
  const isDark = variant === 'dark'

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
        Community
      </h3>
      
      {/* Testimonials */}
      <div className="space-y-4 mb-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "p-4 rounded-lg",
              isDark ? "bg-gray-800/50" : "bg-gray-50"
            )}
          >
            <div className="flex gap-1 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className={cn(
              "text-sm mb-2",
              isDark ? "text-gray-300" : "text-gray-700"
            )}>
              "{testimonial.text}"
            </p>
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-xs font-medium",
                isDark ? "text-gray-400" : "text-gray-600"
              )}>
                {testimonial.name}
              </span>
              <span className={cn(
                "text-xs",
                isDark ? "text-gray-500" : "text-gray-400"
              )}>
                {testimonial.role}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Social Links */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <p className={cn(
          "text-sm font-medium mb-3",
          isDark ? "text-gray-400" : "text-gray-600"
        )}>
          Follow Us
        </p>
        <div className="flex gap-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex-1 flex flex-col items-center justify-center p-3 rounded-lg transition-colors",
                isDark 
                  ? "bg-gray-800/50 hover:bg-gray-800" 
                  : "bg-gray-100 hover:bg-gray-200"
              )}
            >
              <social.icon className={cn(
                "h-5 w-5 mb-1",
                isDark ? "text-gray-400" : "text-gray-600"
              )} />
              <span className={cn(
                "text-xs font-medium",
                isDark ? "text-gray-400" : "text-gray-600"
              )}>
                {social.followers}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

