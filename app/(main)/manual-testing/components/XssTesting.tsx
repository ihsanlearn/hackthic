"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface XssTestingProps {
  notes: string
  onUpdateNotes: (value: string) => void
}

export function XssTesting({ notes, onUpdateNotes }: XssTestingProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
            <Card>
                    <CardHeader><CardTitle>Contexts</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Check HTML Body, Attributes, JavaScript variables.
                    </CardContent>
            </Card>
        </div>
            <div className="space-y-4">
            <Card>
            <CardHeader>
                <CardTitle>Session Notes</CardTitle>
            </CardHeader>
            <CardContent>
                    <Textarea 
                    placeholder="Log XSS vectors..."
                    className="h-[150px]"
                    value={notes}
                    onChange={(e) => onUpdateNotes(e.target.value)}
                    />
            </CardContent>
            </Card>
            </div>
    </div>
  )
}
