"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"

// import { CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Settings, Terminal } from "lucide-react"

interface Tool {
    name: string
    description: string
    status: string
    version: string
    category: string
    command: string
}

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Card className="flex flex-col">
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{tool.name}</CardTitle>
                <Badge variant={tool.status === "Connected" || tool.status === "Ready" ? "default" : "secondary"}>
                {tool.status}
                </Badge>
            </div>
            <CardDescription>{tool.category}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
            <p className="text-sm text-muted-foreground">
            {tool.description}
            </p>
            <div className="space-y-2">
                <p className="text-xs font-medium">Quick Command:</p>
                <CodeBlock
                  code={tool.command}
                  className="bg-muted p-2 text-xs truncate overflow-hidden text-ellipsis whitespace-nowrap"
                />
            </div>
        </CardContent>
        {/* <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Settings className="mr-2 h-4 w-4" /> Config
            </Button>
            <Button size="sm" className="w-full sm:w-auto">
                <Terminal className="mr-2 h-4 w-4" /> Launch
            </Button>
        </CardFooter> */}
    </Card>
  )
}
