"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { Tool } from "../types"

interface ToolCardProps {
    tool: Tool
    categoryName: string
    target?: string
}

export function ToolCard({ tool, categoryName, target }: ToolCardProps) {
  const getFormattedCommand = () => {
    if (!tool.command) return ""
    if (!target) return tool.command

    let cmd = tool.command
    // Replace common placeholders
    cmd = cmd.replace(/target\.com/g, target)
    cmd = cmd.replace(/target@gmail\.com/g, target)
    cmd = cmd.replace(/email@gmail\.com/g, target)
    cmd = cmd.replace(/username/g, target)
    
    // Also handle https://target if user typed domain without protocol but placeholder has it?
    // Actually the above replace might break https://target.com if I just replace target.com with something else.
    // Use case: 
    // cmd: https://target.com
    // target: example.com
    // result: https://example.com -> Correct.
    
    return cmd
  }

  const formattedCommand = getFormattedCommand()

  return (
    <Card className="flex flex-col h-full">
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{tool.name}</CardTitle>
                <Badge variant={tool.status === "Connected" || tool.status === "Ready" ? "default" : "secondary"}>
                {tool.status || "Unknown"}
                </Badge>
            </div>
            <CardDescription>{categoryName}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
            {tool.description || "No description provided."}
            </p>
            {formattedCommand && (
                <div className="space-y-2">
                    <p className="text-xs font-medium">Quick Command:</p>
                    <CodeBlock
                      code={formattedCommand}
                      className="bg-muted p-2 text-xs truncate overflow-hidden text-ellipsis whitespace-nowrap"
                    />
                </div>
            )}
        </CardContent>
    </Card>
  )
}
