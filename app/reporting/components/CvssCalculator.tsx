"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export function CvssCalculator() {
  return (
    <Card className="bg-muted">
        <CardHeader>
            <CardTitle className="text-sm">CVSS Calculator</CardTitle>
        </CardHeader>
        <CardContent>
            <Button variant="outline" className="w-full" onClick={() => window.open('https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator', '_blank')}>
                Open Calculator <FileText className="ml-2 h-4 w-4"/>
            </Button>
        </CardContent>
    </Card>
  )
}
