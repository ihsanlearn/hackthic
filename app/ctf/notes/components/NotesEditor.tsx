"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Note } from "./NotesTypes"

interface NotesEditorProps {
    selectedNote: Note | undefined
    onUpdateNote: (field: keyof Note, value: string) => void
}

export function NotesEditor({ selectedNote, onUpdateNote }: NotesEditorProps) {
  return (
    <div className="flex-1 h-full">
        {selectedNote ? (
            <Card className="h-full flex flex-col">
            <CardContent className="h-full flex flex-col p-6 gap-4">
                <Input 
                    className="text-xl font-bold border-none shadow-none px-0 h-auto focus-visible:ring-0" 
                    value={selectedNote.title}
                    onChange={(e) => onUpdateNote("title", e.target.value)}
                    placeholder="Note Title"
                />
                <Textarea 
                    className="flex-1 resize-none border-none shadow-none p-0 focus-visible:ring-0 leading-relaxed" 
                    value={selectedNote.content}
                    onChange={(e) => onUpdateNote("content", e.target.value)}
                    placeholder="Start typing your finding..."
                />
            </CardContent>
            </Card>
        ) : (
        <div className="h-full flex items-center justify-center border rounded-md border-dashed text-muted-foreground bg-muted/20">
            Select or create a note to start editing.
        </div>
        )}
    </div>
  )
}
