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
  Gamepad2,
  Hammer,
  BookOpen,
  Archive,
  Settings,
  FileCode,
  Swords,
  StickyNote,
  Search,
  Binary,
  Image as ImageIcon,
  FileSearch,
  Code2
} from "lucide-react"
import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CTFSidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      name: "Dashboard",
      href: "/ctf",
      icon: LayoutDashboard,
      active: pathname === "/ctf",
    },
    {
      name: "Active Match",
      href: "/ctf/active",
      icon: Swords,
      active: pathname?.startsWith("/ctf/active"),
    },
    {
      name: "Forensics",
      icon: Search,
      active: pathname?.startsWith("/ctf/forensics"),
      children: [
        {
          name: "Tools & Material",
          href: "/ctf/forensics/tools",
          icon: Hammer,
          active: pathname?.startsWith("/ctf/forensics/tools"),
        }
      ]
    },
    {
      name: "Toolbox",
      href: "/ctf/tools",
      icon: Hammer,
      active: pathname?.startsWith("/ctf/tools"),
    },
    {
      name: "Cheat Sheets",
      href: "/ctf/cheatsheets",
      icon: FileCode,
      active: pathname?.startsWith("/ctf/cheatsheets"),
    },
    {
      name: "My Writeups",
      href: "/ctf/writeups",
      icon: BookOpen,
      active: pathname?.startsWith("/ctf/writeups"),
    },
    {
      name: "CTF Notes",
      href: "/ctf/notes",
      icon: StickyNote,
      active: pathname?.startsWith("/ctf/notes"),
    },
    {
      name: "Archives",
      href: "/ctf/archives",
      icon: Archive,
      active: pathname?.startsWith("/ctf/archives"),
    },
    {
      name: "Settings",
      href: "/ctf/settings",
      icon: Settings,
      active: pathname?.startsWith("/ctf/settings"),
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
            <Link href="/ctf" className="flex items-center" onClick={() => setOpen(false)}>
              <span className="font-bold text-lg">CTF Toolkit</span>
            </Link>
          </div>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-2">
              {routes.map((route, index) => (
                 route.children ? (
                    <Accordion type="single" collapsible key={index} className="w-full">
                        <AccordionItem value={route.name} className="border-none">
                            <AccordionTrigger className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary hover:no-underline py-2",
                                route.active ? "text-primary" : "text-muted-foreground"
                            )}>
                                <div className="flex items-center gap-3">
                                    <route.icon className="h-4 w-4" />
                                    {route.name}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-0 pl-4 space-y-1">
                                {route.children.map((child) => (
                                    <Link
                                        key={child.href}
                                        href={child.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
                                            child.active ? "bg-muted text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        <child.icon className="h-4 w-4" />
                                        {child.name}
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                 ) : (
                    <Link
                    key={route.href}
                    href={route.href!}
                    onClick={() => setOpen(false)}
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
                        route.active ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                    >
                    <route.icon className="h-4 w-4" />
                    {route.name}
                    </Link>
                 )
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn("hidden border-r border-border/40 bg-sidebar text-sidebar-foreground md:block w-64 shrink-0 font-mono", className)}>
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b border-border/40 px-4 lg:h-[60px] lg:px-6">
            <Link href="/ctf" className="flex items-center gap-2 font-bold tracking-widest text-primary">
               <Gamepad2 className="h-6 w-6" />
               <span className="text-xl">CTF Toolkit</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <nav className="grid items-start px-2 text-sm font-medium space-y-1">
              {routes.map((route, index) => (
                route.children ? (
                    <Accordion type="single" collapsible key={index} className="w-full px-2">
                        <AccordionItem value={route.name} className="border-none">
                            <AccordionTrigger className={cn(
                                "flex items-center gap-3 px-3 py-2 transition-all hover:bg-muted hover:text-primary hover:no-underline rounded-md group text-muted-foreground",
                                route.active && "text-primary font-medium" 
                            )}>
                                <div className="flex items-center gap-3">
                                    <route.icon className="h-4 w-4" />
                                    {route.name}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-0 pl-6 space-y-1 pt-1">
                                {route.children.map((child) => (
                                    <Link
                                        key={child.href}
                                        href={child.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 transition-all group border-l-2 border-transparent text-sm",
                                            child.active
                                                ? "bg-primary/10 text-primary border-primary"
                                                : "text-muted-foreground hover:bg-muted hover:border-primary/50 hover:text-primary"
                                        )}
                                    >
                                        <child.icon className="h-4 w-4" />
                                        {child.name}
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ) : (
                    <Link
                        key={route.href}
                        href={route.href!}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 transition-all group border-l-2 border-transparent mx-2",
                            route.active
                                ? "bg-primary/10 text-primary border-primary"
                                : "text-muted-foreground hover:bg-muted hover:border-primary/50 hover:text-primary"
                        )}
                    >
                    <route.icon className="h-4 w-4" />
                    {route.name}
                    </Link>
                )
              ))}
            </nav>
          </div>
          
          <div className="border-t border-border/40 p-4">
             <div className="text-xs text-muted-foreground font-mono">
                MODE: <span className="text-cyan-500">PLAYER</span><br/>
                SYS.VER: 2.4.0 <br />
                &copy; {new Date().getFullYear()} Hackthic.
             </div>
          </div>
        </div>
      </div>
    </>
  )
}
