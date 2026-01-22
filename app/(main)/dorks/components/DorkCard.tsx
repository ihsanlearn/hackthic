"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"
import { DorkEngine, DorkItem } from "../types"

interface DorkCardProps {
    item: DorkItem
    targetDomain?: string
    engine: DorkEngine
    engineUrl?: string
}

import { useVisited } from "@/app/visited-context"

export function DorkCard({ item, targetDomain, engine, engineUrl }: DorkCardProps) {
    const { visited, markVisited } = useVisited()

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
                return `services.tls.certificates.leaf_data.names:"${targetDomain}" and ${item.query}` // Very specific, maybe just string search
            case 'hunter':
                return `domain="${targetDomain}"&&${item.query}`
            case 'bing':
                return `site:${targetDomain} ${item.query}`
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
        
        const baseUrl = engineUrl
        
        if (baseUrl) {
             switch (engine) {
                case 'shodan':
                    url = `${baseUrl}${q}`
                    break
                case 'github':
                     url = `${baseUrl}${q}&type=code`
                     break
                case 'fofa':
                    // Fofa sometimes uses result?qbase64= or just q=
                    url = `${baseUrl}${qBase64}`
                    break
                case 'hunter':
                     url = `${baseUrl}${qBase64}`
                     break
                case 'censys':
                     url = `${baseUrl}${q}`
                     break
                default:
                    // Google, Bing, and generic ones usually use 'q'
                    url = `${baseUrl}${q}`
            }
        } else {
             // Fallback hardcoded URLs if DB is empty or fails
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
                    url = `https://en.fofa.info/result?qbase64=${qBase64}`
                    break
                case 'censys':
                    url = `https://search.censys.io/search?resource=hosts&q=${q}`
                    break
                 case 'hunter':
                    url = `https://hunter.how/search?q=${qBase64}`
                    break
                case 'bing':
                    url = `https://www.bing.com/search?q=${q}`
                    break
            }
        }
       
        if (url) window.open(url, '_blank')
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
