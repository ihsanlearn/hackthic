"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/ui/code-block"
import { Search } from "lucide-react"
import { payloadCategories } from "./payload-data"

export function PayloadLibrary() {
  const [search, setSearch] = useState("")

  return (
    <div className="space-y-6">
        <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
            type="search"
            placeholder="Search payloads..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        </div>

        <Tabs defaultValue="xss" className="w-full">
        <TabsList className="flex w-full flex-wrap h-auto justify-start gap-2 bg-transparent p-0">
            {payloadCategories.map((cat) => (
            <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-background"
            >
                {cat.name}
            </TabsTrigger>
            ))}
        </TabsList>
        {payloadCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2">
                {cat.payloads
                .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.code.includes(search))
                .map((payload, idx) => (
                <Card key={idx}>
                    <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{payload.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <CodeBlock code={payload.code} />
                    </CardContent>
                </Card>
                ))}
            </div>
                {cat.payloads.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.code.includes(search)).length === 0 && (
                <div className="text-center text-muted-foreground py-10">No payloads found matching your search.</div>
                )}
            </TabsContent>
        ))}
        </Tabs>
    </div>
  )
}
