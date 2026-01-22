"use client"

import { OwaspCard } from "./components/OwaspCard"
import { MethodologyCard } from "./components/MethodologyCard"

export default function KBPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground">Security concepts, checklists, and methodology references.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         <OwaspCard />
         <MethodologyCard />
      </div>
    </div>
  )
}
