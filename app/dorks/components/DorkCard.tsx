"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Search } from "lucide-react"
import { CodeBlock } from "@/components/ui/code-block"
import { useState } from "react"
import { DorkEngine } from "./dorks-data"

interface DorkItem {
    name: string
    query: string
}

interface DorkCardProps {
    item: DorkItem
    targetDomain?: string
    engine: DorkEngine
}

import { useVisited } from "../../visited-context"

export function DorkCard({ item, targetDomain, engine }: DorkCardProps) {
    const [copied, setCopied] = useState(false)
    const { visited, markVisited } = useVisited()

    // Helper to format query with target
    const getFormattedQuery = () => {
        if (!targetDomain) return item.query

        switch (engine) {
            case 'google':
                return `site:${targetDomain} ${item.query}`
            case 'github':
                return `${item.query} "${targetDomain}"`
            case 'shodan':
                return `hostname:"${targetDomain}" ${item.query}`
            case 'fofa':
                return `domain="${targetDomain}" && ${item.query}`
            case 'censys':
                return `services.tls.certificates.leaf_data.names: "${targetDomain}" and ${item.query}` // Very specific, maybe just string search
             case 'hunter':
                return `domain="${targetDomain}"&&${item.query}`
            default:
                return `${item.query} ${targetDomain}`
        }
    }

    const dorkQuery = getFormattedQuery()
    const isVisited = visited.has(dorkQuery)

    const openSearch = () => {
        markVisited(dorkQuery)
        let url = ""
        const q = encodeURIComponent(dorkQuery)
        const qBase64 = btoa(dorkQuery)

        switch (engine) {
            case 'google':
                url = `https://www.google.com/search?q=${q}`
                break
            case 'github':
                url = `https://github.com/search?q=${q}&type=code`
                break
            case 'shodan':
                url = `https://www.shodan.io/search?query=${q}`
                break
            case 'fofa':
                url = `https://fofa.info/result?qbase64=${qBase64}`
                break
            case 'censys':
                url = `https://search.censys.io/search?resource=hosts&q=${q}`
                break
             case 'hunter':
                url = `https://hunter.how/search?q=${qBase64}`
                break
        }
        window.open(url, '_blank')
    }

  return (
    <Card 
        className={`flex flex-col h-full border-white/5 cursor-pointer hover:border-primary/50 transition-colors ${isVisited ? "border-l-4 border-l-green-500 bg-green-500/5" : "bg-card/50"}`}
        onClick={openSearch}
    >
        <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex justify-between items-center">
                {item.name}
                {isVisited && <span className="text-[10px] uppercase tracking-wider text-green-500 font-bold ml-2">Visited</span>}
            </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
             <div onClick={(e) => e.stopPropagation()}>
                <CodeBlock code={dorkQuery} className="text-xs bg-muted/50 p-2 break-all font-mono truncate overflow-hidden text-ellipsis whitespace-nowrap" />
             </div>
        </CardContent>
    </Card>
  )
}
