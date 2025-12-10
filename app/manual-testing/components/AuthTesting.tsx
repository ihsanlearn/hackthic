"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CodeBlock } from "@/components/ui/code-block"
import { Textarea } from "@/components/ui/textarea"

interface AuthTestingProps {
  notes: string
  onUpdateNotes: (value: string) => void
}

export function AuthTesting({ notes, onUpdateNotes }: AuthTestingProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
            <Card>
            <CardHeader>
                <CardTitle>Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox id="auth-1" />
                    <label htmlFor="auth-1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Test for default credentials
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="auth-2" />
                    <label htmlFor="auth-2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Test for weak password policy
                    </label>
                </div>
                    <div className="flex items-center space-x-2">
                    <Checkbox id="auth-3" />
                    <label htmlFor="auth-3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Test username enumeration
                    </label>
                </div>
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle>Methodology</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>1. Identify all login portals (Admin, User, API).</p>
                <p>2. Attempt to bypass login prompts (SQLi, direct browsing).</p>
                <p>3. Check for lack of rate limiting on login forms.</p>
            </CardContent>
            </Card>
        </div>
        <div className="space-y-4">
            <Card>
            <CardHeader>
                <CardTitle>Common Payloads</CardTitle>
            </CardHeader>
            <CardContent>
                <CodeBlock code="admin' --" />
                <CodeBlock code="admin' # " className="mt-2" />
                <CodeBlock code="admin' OR 1=1 --" className="mt-2" />
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle>Session Notes</CardTitle>
            </CardHeader>
            <CardContent>
                    <Textarea 
                    placeholder="Log auth anomalies..."
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
