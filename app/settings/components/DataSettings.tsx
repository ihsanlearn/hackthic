"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Trash2 } from "lucide-react"

export function DataSettings() {
  const clearData = () => {
    if (confirm("Are you sure you want to delete all local data? This actions include clearing all notes and recon data.")) {
        localStorage.clear()
        window.location.reload()
    }
  }

  return (
    <Card className="border-destructive/50">
        <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions related to your data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
                <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                    This application uses browser LocalStorage for data persistence. Clearing data will remove all your notes and recon logs permanently.
                </AlertDescription>
            </Alert>
        </CardContent>
        <CardFooter>
            <Button variant="destructive" onClick={clearData}>
                <Trash2 className="mr-2 h-4 w-4" /> Clear All Local Data
            </Button>
        </CardFooter>
    </Card>
  )
}
