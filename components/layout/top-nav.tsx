"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { GlobalSearch } from "../global-search"
import { UserNav } from "../auth/user-nav"
import type { User } from "@supabase/supabase-js"

import { TargetSelector } from "../target-selector"

export function TopNav({ user }: { user: User | null }) {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <header className="flex h-14 items-center gap-4 border-b border-border/40 bg-background px-4 lg:h-[60px] lg:px-6">
      <TargetSelector />
      <div className="w-full flex-1">
        <GlobalSearch />
      </div>
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      
      <UserNav user={user} />
    </header>
  )
}
