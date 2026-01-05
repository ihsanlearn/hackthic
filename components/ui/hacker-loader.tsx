"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface HackerLoaderProps {
  text?: string
  className?: string
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

export function HackerLoader({ text = "LOADING", className }: HackerLoaderProps) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    let iteration = 0
    let interval: NodeJS.Timeout

    const startScramble = () => {
      interval = setInterval(() => {
        setDisplayText(prev => 
            text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index]
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join("")
        )

        if (iteration >= text.length) {
          clearInterval(interval)
          // Loop the animation
          setTimeout(() => {
            iteration = 0
            startScramble()
          }, 2000)
        }

        iteration += 1 / 3
      }, 30)
    }

    startScramble()

    return () => clearInterval(interval)
  }, [text])

  return (
    <div className={cn("font-mono text-sm tracking-widest text-primary animate-pulse", className)}>
      {displayText}
    </div>
  )
}
