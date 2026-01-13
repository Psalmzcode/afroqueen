"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, LayoutGrid, Layout } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDesign } from "@/context/design-context"
import { motion } from "framer-motion"

const designs = [
  { 
    id: 'editorial', 
    name: 'Editorial', 
    icon: LayoutDashboard,
    description: 'Clean magazine layout'
  },
  { 
    id: 'gallery', 
    name: 'Gallery', 
    icon: LayoutGrid,
    description: 'Visual immersive experience'
  },
  { 
    id: 'dynamic', 
    name: 'Dynamic', 
    icon: Layout,
    description: 'Interactive & animated'
  },
]

export function DesignToggle() {
  const { currentDesign, setCurrentDesign } = useDesign()

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Design Layout</p>
      <div className="flex flex-col gap-1">
        {designs.map((design) => (
          <motion.button
            key={design.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentDesign(design.id as any)}
            className={cn(
              "flex items-center justify-between p-2 rounded-lg text-sm transition-all",
              "hover:bg-gray-100 dark:hover:bg-gray-900",
              currentDesign === design.id 
                ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                : "text-gray-700 dark:text-gray-300"
            )}
          >
            <div className="flex items-center gap-2">
              <design.icon className="h-4 w-4" />
              <span className="font-medium">{design.name}</span>
            </div>
            {currentDesign === design.id && (
              <motion.div
                layoutId="activeDesign"
                className="h-2 w-2 rounded-full bg-red-600"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

