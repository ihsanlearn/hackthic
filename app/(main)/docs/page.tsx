"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { DocsList } from "./components/DocsList"

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground">Knowledge base, methodologies, and report templates.</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
            type="search"
            placeholder="Search documentation..."
            className="w-full md:w-1/2"
        />
      </div>

      <DocsList />
    </div>
  )
}
