"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocalStorage } from "@/lib/hooks"
import { AuthTesting } from "./components/AuthTesting"
import { SqliTesting } from "./components/SqliTesting"
import { XssTesting } from "./components/XssTesting"

export default function ManualTestingPage() {
  const [notes, setNotes] = useLocalStorage("manual-notes", {
    auth: "",
    sqli: "",
    xss: "",
  } as Record<string, string>)

  const updateNote = (key: string, value: string) => {
      setNotes(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manual Testing Guide</h1>
        <p className="text-muted-foreground">Methodologies and checklists for manual vulnerability assessment.</p>
      </div>

      <Tabs defaultValue="auth" className="w-full">
        <TabsList className="flex w-full flex-wrap h-auto justify-start gap-2 bg-transparent p-0">
           <TabsTrigger value="auth" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-background">Authentication</TabsTrigger>
           <TabsTrigger value="sqli" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-background">SQL Injection</TabsTrigger>
           <TabsTrigger value="xss" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-background">XSS</TabsTrigger>
        </TabsList>

        <TabsContent value="auth" className="mt-6">
           <AuthTesting notes={notes.auth} onUpdateNotes={(v) => updateNote("auth", v)} />
        </TabsContent>

        <TabsContent value="sqli" className="mt-6">
           <SqliTesting notes={notes.sqli} onUpdateNotes={(v) => updateNote("sqli", v)} />
        </TabsContent>

        <TabsContent value="xss" className="mt-6">
           <XssTesting notes={notes.xss} onUpdateNotes={(v) => updateNote("xss", v)} />
        </TabsContent>

      </Tabs>
    </div>
  )
}
