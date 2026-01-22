"use client"

import { useState } from "react"
import { useLocalStorage } from "@/lib/hooks"
import { Note } from "./components/NotesTypes"
import { NotesList } from "./components/NotesList"
import { NotesEditor } from "./components/NotesEditor"

export default function NotesPage() {
  const [notes, setNotes] = useLocalStorage<Note[]>("pentest-notes-list", [])
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const createNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "New Note",
      content: "",
      date: new Date().toLocaleDateString()
    }
    setNotes(prev => [newNote, ...prev])
    setSelectedNoteId(newNote.id)
  }

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setNotes(prev => prev.filter(n => n.id !== id))
    if (selectedNoteId === id) setSelectedNoteId(null)
  }

  const updateSelectedNote = (field: keyof Note, value: string) => {
    setNotes(prev => prev.map(n => n.id === selectedNoteId ? { ...n, [field]: value } : n))
  }

  const selectedNote = notes.find(n => n.id === selectedNoteId)

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      <NotesList 
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
        onCreateNote={createNote}
        onDeleteNote={deleteNote}
        search={search}
        onSearchChange={setSearch}
      />
      
      <NotesEditor 
        selectedNote={selectedNote}
        onUpdateNote={updateSelectedNote}
      />
    </div>
  )
}
