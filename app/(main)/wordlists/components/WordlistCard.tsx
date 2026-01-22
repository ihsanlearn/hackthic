"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, FileText, Check } from "lucide-react"
import { Wordlist } from "../types"
import { toast } from "sonner"

interface WordlistCardProps {
  wordlist: Wordlist
}

export function WordlistCard({ wordlist }: WordlistCardProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyPath = () => {
    navigator.clipboard.writeText(wordlist.path)
    setIsCopied(true)
    toast.success("Path copied to clipboard")
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Card className="flex flex-col h-full bg-card/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
            <CardTitle className="text-base font-medium w-full" title={wordlist.name}>
                {wordlist.name}
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-xs font-mono shrink-0 whitespace-nowrap">
            {wordlist.size || "Unknown"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {wordlist.description || "No description provided."}
        </p>
        
        <div className="bg-muted/50 p-2 rounded text-xs font-mono break-all relative group">
            {wordlist.path}
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={copyPath}
            >
                {isCopied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
            </Button>
        </div>

        {wordlist.line_count && (
            <div className="text-xs text-muted-foreground">
                {wordlist.line_count.toLocaleString()} lines
            </div>
        )}
      </CardContent>
    </Card>
  )
}
