"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

type DesignType = 'editorial' | 'gallery' | 'dynamic'
type WidgetPosition = 'left' | 'right' | 'both' | 'none'

interface DesignContextType {
  currentDesign: DesignType
  widgetPosition: WidgetPosition
  isDarkMode: boolean
  setCurrentDesign: (design: DesignType) => void
  setWidgetPosition: (position: WidgetPosition) => void
  toggleDarkMode: () => void
}

const DesignContext = createContext<DesignContextType | undefined>(undefined)

export function DesignProvider({ children }: { children: ReactNode }) {
  const [currentDesign, setCurrentDesign] = useState<DesignType>('editorial')
  const [widgetPosition, setWidgetPosition] = useState<WidgetPosition>('right')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <DesignContext.Provider
      value={{
        currentDesign,
        widgetPosition,
        isDarkMode,
        setCurrentDesign,
        setWidgetPosition,
        toggleDarkMode,
      }}
    >
      {children}
    </DesignContext.Provider>
  )
}

export function useDesign() {
  const context = useContext(DesignContext)
  if (context === undefined) {
    throw new Error('useDesign must be used within a DesignProvider')
  }
  return context
}

