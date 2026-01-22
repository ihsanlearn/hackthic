"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"

export function AppearanceSettings() {
  const { setTheme } = useTheme()

  return (
    <Card>
        <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the interface look and feel.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setTheme('light')}>Light</Button>
            <Button variant="outline" onClick={() => setTheme('dark')}>Dark</Button>
            <Button variant="outline" onClick={() => setTheme('system')}>System</Button>
        </CardContent>
    </Card>
  )
}
