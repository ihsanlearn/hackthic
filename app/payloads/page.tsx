"use client"

import { PayloadLibrary } from "./components/PayloadLibrary"

export default function PayloadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payload Library</h1>
        <p className="text-muted-foreground">Comprehensive collection of attack payloads and polyglots.</p>
      </div>

      <PayloadLibrary />
    </div>
  )
}
