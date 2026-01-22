"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface SqliTestingProps {
  notes: string
  onUpdateNotes: (value: string) => void
}

export function SqliTesting({ notes, onUpdateNotes }: SqliTestingProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
            <Card>
            <CardHeader>
                <CardTitle>Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                    <div className="flex items-center space-x-2">
                    <Checkbox id="sqli-1" />
                    <label htmlFor="sqli-1" className="text-sm font-medium leading-none">
                        Test all input fields with single quote '
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="sqli-2" />
                    <label htmlFor="sqli-2" className="text-sm font-medium leading-none">
                        Test numeric IDs with logic operators (AND 1=1)
                    </label>
                </div>
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
                    placeholder="Log SQL errors or behaviors..."
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
