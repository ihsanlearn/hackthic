"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Target, getTargets } from "@/app/targets/actions"

interface TargetContextType {
    activeTarget: Target | null
    setActiveTarget: (target: Target | null) => void
    targets: Target[]
    refreshTargets: () => Promise<void>
    isLoading: boolean
}

const TargetContext = createContext<TargetContextType | undefined>(undefined)

export function TargetProvider({ children }: { children: React.ReactNode }) {
    const [activeTarget, setActiveTargetState] = useState<Target | null>(null)
    const [targets, setTargets] = useState<Target[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Helper to sync with localStorage
    const setActiveTarget = (target: Target | null) => {
        setActiveTargetState(target)
        if (target) {
            localStorage.setItem("active_target_id", target.id)
        } else {
            localStorage.removeItem("active_target_id")
        }
    }

    const refreshTargets = async () => {
        try {
            const fetchedTargets = await getTargets()
            setTargets(fetchedTargets)
            
            // Restore active target selection
            const storedId = localStorage.getItem("active_target_id")
            if (storedId) {
                const found = fetchedTargets.find(t => t.id === storedId)
                if (found) {
                    setActiveTargetState(found)
                }
            } else if (fetchedTargets.length > 0 && !activeTarget) {
                 // Optional: Auto-select first target if none selected? 
                 // Let's not auto-select for now to allow "No Target" state.
            }
        } catch (error) {
            console.error("Failed to load targets", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        refreshTargets()
    }, [])

    return (
        <TargetContext.Provider value={{ activeTarget, setActiveTarget, targets, refreshTargets, isLoading }}>
            {children}
        </TargetContext.Provider>
    )
}

export function useTarget() {
    const context = useContext(TargetContext)
    if (context === undefined) {
        throw new Error("useTarget must be used within a TargetProvider")
    }
    return context
}
