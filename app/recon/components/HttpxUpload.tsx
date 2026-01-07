"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HackerLoader } from "@/components/ui/hacker-loader"
import { Upload, FileJson, AlertCircle } from "lucide-react"
import { importHttpxResults } from "@/app/targets/actions"

interface HttpxUploadProps {
    targetId: string
    onUploadComplete: () => void
}

export function HttpxUpload({ targetId, onUploadComplete }: HttpxUploadProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [stats, setStats] = useState<{ total: number, valid: number } | null>(null)

    const [progress, setProgress] = useState<{ current: number, total: number } | null>(null)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsLoading(true)
        setError(null)
        setStats(null)
        setProgress(null)

        try {
            const text = await file.text()
            // Parse NDJSON (line delimited JSON)
            const lines = text.trim().split('\n')
            
            const results = lines.map((line, index) => {
                try {
                    return JSON.parse(line)
                } catch (err) {
                    console.warn(`Failed to parse line ${index + 1}:`, err)
                    return null
                }
            }).filter(item => item !== null)

            if (results.length === 0) {
                throw new Error("No valid JSON objects found in file")
            }

            console.log(`Parsed ${results.length} valid items from ${lines.length} lines`)
            
            // BATCHING LOGIC
            const BATCH_SIZE = 500
            const totalItems = results.length
            let processedItems = 0

            for (let i = 0; i < totalItems; i += BATCH_SIZE) {
                const chunk = results.slice(i, i + BATCH_SIZE)
                await importHttpxResults(targetId, chunk)
                
                processedItems += chunk.length
                setProgress({ current: processedItems, total: totalItems })
            }
            
            setStats({ total: lines.length, valid: results.length })
            onUploadComplete()
            setTimeout(() => setOpen(false), 2000) // Close after success

        } catch (err) {
            console.error(err)
            setError(err instanceof Error ? err.message : "Failed to process file")
        } finally {
            setIsLoading(false)
            setProgress(null)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Import Httpx JSON
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Import Httpx Results</DialogTitle>
                    <DialogDescription>
                        Upload a JSON output file from httpx (<code>-json</code> flag). 
                        We support Newline Delimited JSON (NDJSON).
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 space-y-4 hover:bg-muted/50 transition-colors">
                    {isLoading ? (
                        <div className="text-center space-y-2">
                            <HackerLoader text={progress ? "IMPORTING_BATCH" : "PARSING_DATA"} />
                            <p className="text-xs text-muted-foreground">
                                {progress 
                                    ? `Imported ${progress.current} / ${progress.total} assets...` 
                                    : "Analyzing assets..."
                                }
                            </p>
                        </div>
                    ) : stats ? (
                        <div className="text-center space-y-2 text-green-500">
                             <FileJson className="h-10 w-10 mx-auto" />
                             <p className="font-semibold">Import Successful!</p>
                             <p className="text-xs text-muted-foreground">Imported {stats.valid} assets.</p>
                        </div>
                    ) : (
                        <>
                            <div className="rounded-full bg-muted p-4">
                                <FileJson className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium">Click to select file</p>
                                <p className="text-xs text-muted-foreground">or drag and drop here</p>
                            </div>
                            <input 
                                type="file" 
                                accept=".json,.txt"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFileUpload}
                                disabled={isLoading}
                            />
                        </>
                    )}
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded">
                        <AlertCircle className="h-4 w-4" />
                        <p>{error}</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
