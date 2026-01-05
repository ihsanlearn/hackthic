"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Search,
  Hammer,
  Bomb,
  LayoutDashboard,
  Bug,
  StickyNote,
  Bot,
  FileText,
  BookOpen,
  ShieldAlert,
  Terminal,
  Code2
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { proxy, recon, scanning, fuzzing, exploitation, osint } from "@/app/tools/components/tools-data"
import { payloadCategories } from "@/app/payloads/components/payload-data"
import { getDorkEngines } from "@/app/dorks/actions"

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const [dorkEngines, setDorkEngines] = React.useState<string[]>([])
  const router = useRouter()

  React.useEffect(() => {
    // Fetch engines on mount
    getDorkEngines().then(engines => {
        if (engines.length > 0) {
            setDorkEngines(engines)
        } else {
            // Fallback if DB fetch fails or is empty (e.g. not logged in)
            setDorkEngines(['google', 'github', 'shodan', 'fofa', 'censys', 'hunter']) 
        }
    })

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  const allTools = [
      ...proxy.map(t => ({ ...t, category: 'Proxy' })), 
      ...recon.map(t => ({ ...t, category: 'Recon' })), 
      ...scanning.map(t => ({ ...t, category: 'Scanning' })), 
      ...fuzzing.map(t => ({ ...t, category: 'Fuzzing' })), 
      ...exploitation.map(t => ({ ...t, category: 'Exploitation' })), 
      ...osint.map(t => ({ ...t, category: 'OSINT' }))
  ]

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full bg-background justify-start rounded-[0.5rem] text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-60 lg:w-96 border-border/40 hover:bg-muted/50"
        )}
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search system...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog 
        open={open} 
        onOpenChange={setOpen}
        className="bg-popover text-popover-foreground border rounded-[0.5rem] border-border/50 **:[[cmdk-input-wrapper]]:border-b-border/40"
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/recon"))}>
              <Terminal className="mr-2 h-4 w-4" />
              <span>Recon Workflow</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/tools"))}>
              <Hammer className="mr-2 h-4 w-4" />
              <span>Tools Center</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/payloads"))}>
              <Bomb className="mr-2 h-4 w-4" />
              <span>Payload Library</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand(() => router.push("/dorks"))}>
              <Search className="mr-2 h-4 w-4" />
              <span>Dorks</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand(() => router.push("/kb"))}>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Knowledge Base</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/legal"))}>
              <ShieldAlert className="mr-2 h-4 w-4" />
              <span>Legal & Ethical</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="Tools & Commands">
             {allTools.map((tool) => (
                <CommandItem key={tool.name} onSelect={() => runCommand(() => router.push("/tools"))} value={tool.name}>
                    <Hammer className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                        <span>{tool.name}</span>
                        <span className="text-[10px] text-muted-foreground">{tool.category} • {tool.description.substring(0, 40)}...</span>
                    </div>
                </CommandItem>
             ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Payload Categories">
            {payloadCategories.map((cat) => (
                <CommandItem key={cat.id} onSelect={() => runCommand(() => router.push("/payloads"))} value={cat.name}>
                    <Bomb className="mr-2 h-4 w-4" />
                    <span>{cat.name} Payloads</span>
                </CommandItem>
            ))}
          </CommandGroup>

           <CommandSeparator />

           <CommandGroup heading="Dork Engines">
            {dorkEngines.map((engine) => (
                 <CommandItem key={engine} onSelect={() => runCommand(() => router.push("/dorks"))} value={engine + " dorks"}>
                    <Search className="mr-2 h-4 w-4" />
                    <span className="capitalize">{engine} Dorks</span>
                </CommandItem>
            ))}
           </CommandGroup>

        </CommandList>
      </CommandDialog>
    </>
  )
}
