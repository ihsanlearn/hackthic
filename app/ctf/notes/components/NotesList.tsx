"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Trash, Search } from "lucide-react"
import { Note } from "./NotesTypes"

interface NotesListProps {
    notes: Note[]
    selectedNoteId: string | null
    onSelectNote: (id: string) => void
    onCreateNote: () => void
    onDeleteNote: (id: string, e: React.MouseEvent) => void
    search: string
    onSearchChange: (value: string) => void
}

export function NotesList({ notes, selectedNoteId, onSelectNote, onCreateNote, onDeleteNote, search, onSearchChange }: NotesListProps) {
    const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="w-full md:w-1/3 flex flex-col gap-4 h-full">
        <div className="flex items-center gap-2">
        <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search notes..." 
                className="pl-8" 
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
        <Button size="icon" onClick={onCreateNote}><Plus className="h-4 w-4" /></Button>
        </div>
        
        <ScrollArea className="flex-1 border rounded-md bg-card">
        <div className="flex flex-col p-2 gap-2">
            {filteredNotes.length === 0 && (
                <div className="text-center text-sm text-muted-foreground py-4">
                    No notes found.
                </div>
            )}
            {filteredNotes.map(note => (
                <div 
                    key={note.id}
                    onClick={() => onSelectNote(note.id)}
                    className={`p-3 rounded-md cursor-pointer transition-colors flex justify-between items-start group ${selectedNoteId === note.id ? "bg-primary/10 text-primary border-primary/20 border" : "hover:bg-muted"}`}
                >
                    <div className="flex-1 overflow-hidden">
                        <p className="font-medium truncate">{note.title || "Untitled"}</p>
                        <p className="text-xs text-muted-foreground truncate">{note.date}</p>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                        onClick={(e) => onDeleteNote(note.id, e)}
                    >
                        <Trash className="h-3 w-3" />
                    </Button>
                </div>
            ))}
        </div>
        </ScrollArea>
    </div>
  )
}
