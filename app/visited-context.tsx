"use client"

import React, { createContext, useContext, useState } from "react"

interface VisitedContextType {
  visited: Set<string>
  markVisited: (id: string) => void
}

const VisitedContext = createContext<VisitedContextType | undefined>(undefined)

export function VisitedProvider({ children }: { children: React.ReactNode }) {
  const [visited, setVisited] = useState<Set<string>>(new Set())

  const markVisited = (id: string) => {
    setVisited((prev) => {
      const newSet = new Set(prev)
      newSet.add(id)
      return newSet
    })
  }

  return (
    <VisitedContext.Provider value={{ visited, markVisited }}>
      {children}
    </VisitedContext.Provider>
  )
}

export function useVisited() {
  const context = useContext(VisitedContext)
  if (context === undefined) {
    throw new Error("useVisited must be used within a VisitedProvider")
  }
  return context
}
