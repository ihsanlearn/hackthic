"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { WordlistCategory } from "../types"
import { WordlistCard } from "./WordlistCard"

interface WordlistListProps {
  categories: WordlistCategory[]
}

export function WordlistList({ categories }: WordlistListProps) {
  const [search, setSearch] = useState("")

  const defaultValue = categories.length > 0 ? categories[0].name.toLowerCase() : undefined

  return (
    <div className="space-y-6">
       <div className="relative w-full max-w-sm">
          <Label htmlFor="search" className="sr-only">Search</Label>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
              id="search"
              placeholder="Search wordlists..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
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
                const filteredLists = cat.wordlists.filter(w =>
                    w.name.toLowerCase().includes(search.toLowerCase()) ||
                    (w.description && w.description.toLowerCase().includes(search.toLowerCase())) ||
                    w.path.toLowerCase().includes(search.toLowerCase())
                )

                return (
                    <TabsContent key={cat.id} value={cat.name.toLowerCase()} className="m-0 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold tracking-tight">{cat.name} Collection</h2>
                            <span className="text-sm text-muted-foreground">{filteredLists.length} lists</span>
                        </div>
                        
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredLists.map((list) => (
                                <WordlistCard key={list.id} wordlist={list} />
                            ))}
                            {filteredLists.length === 0 && (
                                <div className="col-span-full text-center text-muted-foreground py-12 border rounded-lg bg-muted/10">
                                    No wordlists found matching your search in {cat.name}.
                                </div>
                            )}
                        </div>
                    </TabsContent>
                )
            })}
        </Tabs>
      ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">No wordlists found in the database.</p>
          </div>
      )}
    </div>
  )
}
