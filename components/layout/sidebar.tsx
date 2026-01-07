"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  Menu, 
  LayoutDashboard, 
  Scan, 
  Bug, 
  Hammer, 
  Target,
  StickyNote, 
  Bomb, 
  Bot, 
  FileText, 
  BookOpen, 
  Settings,
  Search,
  FlaskConical,
  ShieldAlert,
  List
} from "lucide-react"
import { useState } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      active: pathname === "/",
      experimental: true,
    },
    {
      name: "Recon Workflow",
      href: "/recon",
      icon: Scan,
      active: pathname?.startsWith("/recon"),
    },
    {
      name: "Manual Testing",
      href: "/manual-testing",
      icon: Bug,
      active: pathname?.startsWith("/manual-testing"),
    },
    {
      name: "Tools Center",
      href: "/tools",
      icon: Hammer,
      active: pathname?.startsWith("/tools"),
    },
    {
      name: "Target Scope",
      href: "/targets",
      icon: Target,
      active: pathname?.startsWith("/targets"),
    },
    {
      name: "Pentest Notes",
      href: "/notes",
      icon: StickyNote,
      active: pathname?.startsWith("/notes"),
    },
    {
      name: "Payload Library",
      href: "/payloads",
      icon: Bomb,
      active: pathname?.startsWith("/payloads"),
    },
    {
      name: "Dorks",
      href: "/dorks",
      icon: Search,
      active: pathname?.startsWith("/dorks"),
    },
    {
      name: "Wordlists",
      href: "/wordlists",
      icon: List,
      active: pathname?.startsWith("/wordlists"),
    },
    {
      name: "Automations",
      href: "/automation",
      icon: Bot,
      active: pathname?.startsWith("/automation"),
      experimental: true,
    },
    {
      name: "Reporting",
      href: "/reporting",
      icon: FileText,
      active: pathname?.startsWith("/reporting"),
      experimental: true,
    },
    {
      name: "Knowledge Base",
      href: "/kb",
      icon: BookOpen,
      active: pathname?.startsWith("/kb"),
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      active: pathname?.startsWith("/settings"),
    },
    {
      name: "Legal & Ethical",
      href: "/legal",
      icon: ShieldAlert,
      active: pathname?.startsWith("/legal"),
    },
  ]

  return (
    <>
      {/* Mobile Trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <div className="px-7">
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <span className="font-bold text-lg">Hunt.Hub</span>
            </Link>
          </div>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
                    route.active ? "bg-muted text-primary" : "text-muted-foreground"
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {route.name}
                  {(route as any).experimental && (
                    <FlaskConical className="h-3 w-3 text-amber-500 ml-auto" />
                  )}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn("hidden border-r border-border/40 bg-sidebar text-sidebar-foreground md:block w-64 shrink-0 font-mono", className)}>
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b border-border/40 px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-primary">
               <span className="text-xl">&gt;_ Hackthic</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <nav className="grid items-start px-2 text-sm font-medium space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 transition-all group border-l-2 border-transparent",
                    route.href === "/legal" 
                        ? (route.active 
                            ? "bg-red-500/10 text-red-500 border-red-500 font-bold" 
                            : "text-red-500/70 hover:text-red-500 hover:bg-red-500/5 hover:border-red-500/50")
                        : (route.active
                            ? "bg-primary/10 text-primary border-primary"
                            : "text-muted-foreground hover:bg-muted hover:border-primary/50 hover:text-primary")
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {route.name}
                  {(route as any).experimental && (
                     <div className="ml-auto group/lab relative">
                        <FlaskConical className="h-3 w-3 text-amber-500" />
                        <span className="absolute right-0 top-full mt-1 hidden w-max bg-popover px-2 py-1 text-[10px] text-popover-foreground shadow-md rounded group-hover/lab:block z-50">Experimental</span>
                     </div>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="border-t border-border/40 p-4">
             <div className="text-xs text-muted-foreground font-mono">
                STATUS: <span className="text-green-500">ONLINE</span><br/>
                SYS.VER: 2.4.0 <br />
                &copy; {new Date().getFullYear()} Hackthic. License under CC BY 4.0.
             </div>
          </div>
        </div>
      </div>
    </>
  )
}
