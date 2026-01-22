"use client"

import { Accordion } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocalStorage } from "@/lib/hooks"

// Import modular components
import { ReconSetup } from "./components/ReconSetup"
import { TargetIntel } from "./components/TargetIntel"
import { SubdomainEnum } from "./components/SubdomainEnum"
import { PortScan } from "./components/PortScan"
import { HttpProbing } from "./components/HttpProbing"
import { ContentDiscovery } from "./components/ContentDiscovery"
import { ParamDiscovery } from "./components/ParamDiscovery"
import { VulnScanning } from "./components/VulnScanning"
import { JsRecon } from "./components/JsRecon"
import { Automation } from "./components/Automation"

export default function ReconPage() {
  const [notes, setNotes] = useLocalStorage("recon-notes", {
    subdomain: "",
    ports: "",
    discovery: "",
    params: "",
    general: "",
  } as Record<string, string>)

  const updateNote = (key: string, value: string) => {
    setNotes(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Cyber Security Reconnaissance Workflow</h1>
          <p className="text-xl text-muted-foreground mt-2">Methodical asset discovery and enumeration for professional engagements.</p>
        </div>
        
        <Card className="bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Purpose & Philosophy</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none text-sm text-foreground/80">
            <p>
              Reconnaissance is the most critical phase of the cyber kill chain. Its purpose is to gain a holistic understanding of the target's infrastructure, technology stack, and attack surface before probing for vulnerabilities.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Passive Recon:</strong> Gathering information without directly interacting with the target (e.g., Whois, OSINT). Low risk, highly stealthy.</li>
              <li><strong>Active Recon:</strong> Directly probing the target (e.g., Port scanning, Fuzzing). Higher risk of detection, requires authorization.</li>
            </ul>
            <p className="mt-2 font-semibold text-primary">
              ⚠️ This workflow is intended for legal, authorized penetration testing and bug bounty hunting only.
            </p>
          </CardContent>
        </Card>
      </div>

      <Accordion type="multiple" defaultValue={["setup", "subdomain"]} className="w-full space-y-4">
        
        <ReconSetup notes={notes.general} onUpdateNotes={(v) => updateNote("general", v)} />
        
        <TargetIntel />
        
        <SubdomainEnum notes={notes.subdomain} onUpdateNotes={(v) => updateNote("subdomain", v)} />
        
        <PortScan notes={notes.ports} onUpdateNotes={(v) => updateNote("ports", v)} />
        
        <HttpProbing />
        
        <ContentDiscovery notes={notes.discovery} onUpdateNotes={(v) => updateNote("discovery", v)} />
        
        <ParamDiscovery />
        
        <VulnScanning />
        
        <JsRecon />
        
        <Automation />

      </Accordion>
    </div>
  )
}
