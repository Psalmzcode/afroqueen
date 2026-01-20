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






// 'use client'

// import { useTheme } from 'next-themes'
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts'

// interface StatsChartProps {
//   data?: {
//     totalViews: number
//     totalEngagement: number
//   }
// }


// const generateChartData = () => {
//   const data = []
//   const now = new Date()
  
//   for (let i = 30; i >= 0; i--) {
//     const date = new Date(now)
//     date.setDate(date.getDate() - i)
    
//     data.push({
//       date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//       views: Math.floor(Math.random() * 1000) + 500,
//       engagement: Math.floor(Math.random() * 300) + 100,
//       users: Math.floor(Math.random() * 200) + 50,
//     })
//   }
  
//   return data
// }

// export function StatsChart({ data }: StatsChartProps) {
//   const { theme } = useTheme()
//   const chartData = generateChartData()
  
//   const isDark = theme === 'dark'

//   return (
//     <div className="h-80">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           data={chartData}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid 
//             strokeDasharray="3 3" 
//             stroke={isDark ? '#374151' : '#e5e7eb'} 
//           />
//           <XAxis 
//             dataKey="date" 
//             stroke={isDark ? '#9ca3af' : '#6b7280'}
//             fontSize={12}
//           />
//           <YAxis 
//             stroke={isDark ? '#9ca3af' : '#6b7280'}
//             fontSize={12}
//           />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: isDark ? '#1f2937' : '#ffffff',
//               borderColor: isDark ? '#374151' : '#e5e7eb',
//               borderRadius: '0.5rem',
//             }}
//             labelStyle={{ color: isDark ? '#d1d5db' : '#374151' }}
//           />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="views"
//             name="Views"
//             stroke="#ef4444"
//             strokeWidth={2}
//             dot={false}
//             activeDot={{ r: 6 }}
//           />
//           <Line
//             type="monotone"
//             dataKey="engagement"
//             name="Engagement"
//             stroke="#3b82f6"
//             strokeWidth={2}
//             dot={false}
//             activeDot={{ r: 6 }}
//           />
//           <Line
//             type="monotone"
//             dataKey="users"
//             name="New Users"
//             stroke="#10b981"
//             strokeWidth={2}
//             dot={false}
//             activeDot={{ r: 6 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }
