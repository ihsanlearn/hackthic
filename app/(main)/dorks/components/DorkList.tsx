"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DorkEngine, DorkCategory, DorkEngineConfig } from "../types"
import { DorkCard } from "./DorkCard"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DorkListProps {
  data: Record<DorkEngine, DorkCategory[]>
  engines: DorkEngineConfig[]
}

export function DorkList({ data, engines }: DorkListProps) {
  const [target, setTarget] = useState("")
  const [search, setSearch] = useState("")
  const [engine, setEngine] = useState<DorkEngine>("google")

  console.log(data)
  console.log(engine)

  const currentCategories = data[engine] || []
  const currentEngineUrl = engines.find(e => e.name.toLowerCase() === engine)?.base_url

  return (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-[250px_1fr]">
            {/* Sidebar Controls */}
            <div className="flex flex-col gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="engine">Search Engine</Label>
                    <Select value={engine} onValueChange={(val) => setEngine(val as DorkEngine)}>
                        <SelectTrigger id="engine" className="capitalize">
                            <SelectValue placeholder="Select Engine" />
                        </SelectTrigger>

                        <SelectContent>
                            {engines.length > 0 ? (
                                engines.map((eng) => (
                                    data[eng.name.toLowerCase() as DorkEngine] != null && (
                                        <SelectItem className="capitalize" key={eng.name} value={eng.name.toLowerCase()}>
                                            {eng.name}
                                        </SelectItem>
                                    )
                                ))
                            ) : (
                                <>
                                    <SelectItem value="google">Google</SelectItem>
                                    <SelectItem value="github">GitHub</SelectItem>
                                    <SelectItem value="shodan">Shodan</SelectItem>
                                    <SelectItem value="fofa">Fofa</SelectItem>
                                    <SelectItem value="censys">Censys</SelectItem>
                                    <SelectItem value="hunter">Hunter.how</SelectItem>
                                </>
                            )}
                        </SelectContent>
                    </Select>
                 </div>

                 <div className="space-y-2">
                    <Label htmlFor="target">Target Domain</Label>
                    <Input 
                        id="target" 
                        placeholder="example.com" 
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                    />
                 </div>

                 <div className="space-y-2">
                     <Label>Info</Label>
                     <div className="text-sm text-muted-foreground p-3 border rounded-md bg-muted/20">
                        Searching with <strong>{engine.charAt(0).toUpperCase() + engine.slice(1)}</strong>. 
                        Target domain will be automatically formatted for this engine's syntax.
                     </div>
                 </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
                 <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={`Search ${engine} dorks...`}
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <Tabs key={engine} defaultValue={currentCategories[0]?.category.toLowerCase().replace(/\s+/g, '-')} className="w-full">
                    <TabsList className="flex w-full flex-wrap h-auto justify-start gap-2 bg-transparent p-0 mb-4">
                        {currentCategories.map((cat) => {
                            const value = cat.category.toLowerCase().replace(/\s+/g, '-')
                            return (
                                <TabsTrigger 
                                    key={value} 
                                    value={value}
                                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-background"
                                >
                                    {cat.category}
                                </TabsTrigger>
                            )
                        })}
                    </TabsList>

                    {currentCategories.map((cat) => {
                        const value = cat.category.toLowerCase().replace(/\s+/g, '-')
                        const filteredItems = cat.items.filter(item => 
                            item.name.toLowerCase().includes(search.toLowerCase()) || 
                            item.query.toLowerCase().includes(search.toLowerCase())
                        )
                        
                        return (
                            <TabsContent key={value} value={value} className="m-0">
                                <div className="grid gap-4 md:grid-cols-2">
                                    {filteredItems.map((item, idx) => (
                                        <DorkCard key={idx} item={item} targetDomain={target} engine={engine} engineUrl={currentEngineUrl} />
                                    ))}
                                    {filteredItems.length === 0 && (
                                        <div className="col-span-full text-center text-muted-foreground py-10">
                                            No dorks found matching your search.
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </div>
        </div>
    </div>
  )
}
