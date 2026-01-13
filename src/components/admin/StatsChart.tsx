"use client"

import { Card } from "@/components/ui/card"
import { useDesign } from "@/context/design-context"
import { cn } from "@/lib/utils"

// Simple placeholder chart using CSS bars.
// You can later replace this with a real chart library if you like.
const mockData = [
  { label: "Mon", value: 40 },
  { label: "Tue", value: 65 },
  { label: "Wed", value: 50 },
  { label: "Thu", value: 80 },
  { label: "Fri", value: 70 },
  { label: "Sat", value: 55 },
  { label: "Sun", value: 90 },
]

export function StatsChart() {
  const { isDarkMode } = useDesign()

  return (
    <div className="w-full">
      <div className="flex h-40 items-end gap-3">
        {mockData.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-1">
            <div className="relative flex w-full flex-1 items-end">
              <div className={cn(
                "h-full w-full rounded-full",
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              )} />
              <div
                className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-red-600 to-red-400"
                style={{ height: `${point.value}%`, maxHeight: "100%" }}
              />
            </div>
            <span className={cn(
              "text-xs",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}>
              {point.label}
            </span>
          </div>
        ))}
      </div>
      <div className={cn(
        "mt-3 flex items-center justify-between text-xs",
        isDarkMode ? "text-gray-400" : "text-gray-500"
      )}>
        <span>Engagement by day</span>
        <span>Mock data – hook up real stats later</span>
      </div>
    </div>
  )
}


