"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Folder } from "lucide-react"
import { docs } from "./docs-data"

export function DocsList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {docs.map((section) => (
            <Card key={section.category}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Folder className="h-5 w-5 text-primary" />
                    {section.category}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {section.items.map(item => (
                        <li key={item} className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer transition-colors">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            </Card>
    ))}
    </div>
  )
}
