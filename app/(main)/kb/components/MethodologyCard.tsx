"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MethodologyCard() {
  const steps = [
      "Information Gathering & Reconnaissance",
      "Configuration Management Testing",
      "Identity Management Testing",
      "Authentication Testing",
      "Authorization Testing",
      "Session Management Testing",
      "Input Validation Testing",
      "Client-Side Testing"
  ]

  return (
    <Card>
    <CardHeader>
        <CardTitle>Methodology Checklist</CardTitle>
        <CardDescription>General steps for a web application engagement.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
        {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-2">
                <Badge variant="outline">{index + 1}</Badge>
                <p className="text-sm">{step}</p>
            </div>
        ))}
    </CardContent>
    </Card>
  )
}
