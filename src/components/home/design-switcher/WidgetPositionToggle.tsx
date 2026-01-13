"use client"

import { PanelLeft, PanelRight, PanelsTopBottom, Square } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDesign } from "@/context/design-context"
import { motion } from "framer-motion"

const positions = [
  { id: 'left', icon: PanelLeft, label: 'Left' },
  { id: 'right', icon: PanelRight, label: 'Right' },
  { id: 'both', icon: PanelsTopBottom, label: 'Both' },
  { id: 'none', icon: Square, label: 'None' },
]

export function WidgetPositionToggle() {
  const { widgetPosition, setWidgetPosition } = useDesign()

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Widget Position</p>
      <div className="grid grid-cols-4 gap-1">
        {positions.map((pos) => (
          <motion.button
            key={pos.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setWidgetPosition(pos.id as any)}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-all",
              "hover:bg-gray-100 dark:hover:bg-gray-900",
              widgetPosition === pos.id
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            )}
            title={pos.label}
          >
            <pos.icon className="h-4 w-4" />
            <span className="text-xs mt-1">{pos.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

