"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { ToolCategory } from "../types"
import { ToolCard } from "./ToolCard"
import { AddToolDialog } from "./AddToolDialog"

interface ToolsListProps {
  categories: ToolCategory[]
}

export function ToolsList({ categories }: ToolsListProps) {
  const [search, setSearch] = useState("")
  const [target, setTarget] = useState("")

  // Default to first category if available
  const defaultValue = categories.length > 0 ? categories[0].name.toLowerCase() : undefined

  return (
    <div className="space-y-6">
       <div className="flex justify-end">
         <AddToolDialog categories={categories} />
       </div>
       <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
         <div className="relative w-full">
            <Label htmlFor="search" className="sr-only">Search</Label>
            <Search className="absolute left-2.5 top-9 h-4 w-4 text-muted-foreground" />
            <div className="space-y-2">
                <Label htmlFor="search">Search Tools</Label>
                <Input
                    id="search"
                    placeholder="Filter tools..."
                    className="pl-8"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
        
        <div className="space-y-2">
            <Label htmlFor="target">Target</Label>
            <Input
                id="target"
                placeholder="example.com or username"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            />
        </div>
      </div>

      {categories.length > 0 ? (
        <Tabs defaultValue={defaultValue} className="w-full">
            <TabsList className="flex w-full flex-wrap h-auto justify-start gap-2 bg-transparent p-0 mb-6">
                {categories.map((cat) => (
                    <TabsTrigger
                        key={cat.id}
                        value={cat.name.toLowerCase()}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-background px-4 py-2"
                    >
                        {cat.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {categories.map((cat) => {
                const filteredTools = cat.tools.filter(t =>
                    t.name.toLowerCase().includes(search.toLowerCase()) ||
                    (t.description && t.description.toLowerCase().includes(search.toLowerCase())) ||
                    (t.command && t.command.toLowerCase().includes(search.toLowerCase()))
                )

                return (
                    <TabsContent key={cat.id} value={cat.name.toLowerCase()} className="m-0 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold tracking-tight">{cat.name} Arsenal</h2>
                            <span className="text-sm text-muted-foreground">{filteredTools.length} tools</span>
                        </div>
                        
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredTools.map((tool) => (
                                <ToolCard key={tool.id} tool={tool} categoryName={cat.name} target={target} />
                            ))}
                            {filteredTools.length === 0 && (
                                <div className="col-span-full text-center text-muted-foreground py-12 border rounded-lg bg-muted/10">
                                    No tools found matching your search in {cat.name}.
                                </div>
                            )}
                        </div>
                    </TabsContent>
                )
            })}
        </Tabs>
      ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">No tools configured in the database.</p>
              <p className="text-xs text-muted-foreground mt-2">Please run the seed script to populate tools.</p>
          </div>
      )}
    </div>
  )
}
