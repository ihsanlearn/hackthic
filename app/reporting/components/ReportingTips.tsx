"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ReportingTips() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Always verify the impact before reporting.</p>
            <p>• Use clear, reproducible steps.</p>
            <p>• Include screenshots or video PoCs.</p>
            <p>• Calculate CVSS score accurately.</p>
        </CardContent>
    </Card>
  )
}
