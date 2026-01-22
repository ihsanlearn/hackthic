"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileCode, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { importKatanaResults } from "@/app/(main)/targets/actions"

interface KatanaUploadProps {
    targetId: string
    onUploadComplete: () => void
}

export function KatanaUpload({ targetId, onUploadComplete }: KatanaUploadProps) {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
    const [progress, setProgress] = useState('')

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        setStatus('uploading')
        setProgress('Reading file...')
        const reader = new FileReader()

        reader.onload = async (e) => {
            try {
                const text = e.target?.result as string
                const lines = text.split('\n')
                const allResults: any[] = []

                // 1. Parsing
                setProgress('Parsing JSON...')
                for (const line of lines) {
                    if (!line.trim()) continue
                    try {
                        const json = JSON.parse(line)
                        if (json.endpoint || (json.request && json.request.endpoint)) {
                            allResults.push(json)
                        }
                    } catch (err) {
                        // ignore invalid lines
                    }
                }

                if (allResults.length === 0) {
                    throw new Error("No valid JSON lines found")
                }

                // 2. Batching
                const BATCH_SIZE = 500;
                const total = allResults.length;
                let processed = 0;

                for (let i = 0; i < total; i += BATCH_SIZE) {
                    const chunk = allResults.slice(i, i + BATCH_SIZE);
                    await importKatanaResults(targetId, chunk);
                    processed += chunk.length;
                    setProgress(`Importing ${processed}/${total}...`);
                }

                setStatus('success')
                setProgress('')
                onUploadComplete()
                setTimeout(() => setStatus('idle'), 2000)
            } catch (error: any) {
                console.error("Upload error:", error)
                alert(`Import Failed: ${error.message || "Unknown error"}`)
                setStatus('error')
                setProgress('')
                setTimeout(() => setStatus('idle'), 2000)
            } finally {
                // Reset file input
                event.target.value = ''
            }
        }

        reader.onerror = () => {
            alert("Failed to read file")
            setStatus('error')
            setTimeout(() => setStatus('idle'), 2000)
        }

        reader.readAsText(file)
    }

    return (
        <div className="flex items-center gap-2">
            <input
                type="file"
                accept=".json,.jsonl"
                className="hidden"
                id={`katana-upload-${targetId}`}
                onChange={handleFileUpload}
                disabled={status === 'uploading'}
            />
            <label htmlFor={`katana-upload-${targetId}`}>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-7 px-2 gap-1.5 cursor-pointer text-xs font-medium border border-orange-500/20 bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 ${
                        status === 'success' ? 'text-green-600 border-green-500/50 bg-green-500/10' : 
                        status === 'error' ? 'text-red-600 border-red-500/50' : ''
                    }`} 
                    asChild 
                    disabled={status === 'uploading'}
                >
                    <span>
                        {status === 'uploading' ? <Loader2 className="h-3 w-3 animate-spin" /> : 
                         status === 'success' ? <CheckCircle2 className="h-3 w-3" /> : 
                         status === 'error' ? <AlertCircle className="h-3 w-3" /> :
                         <FileCode className="h-3 w-3" />}
                        {status === 'uploading' ? (progress || 'Importing...') : 
                         status === 'success' ? 'Done' : 
                         'Import Katana'}
                    </span>
                </Button>
            </label>
        </div>
    )
}
