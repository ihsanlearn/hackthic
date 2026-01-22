"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PortScanProps {
  notes: string
  onUpdateNotes: (value: string) => void
}

export function PortScan({ notes, onUpdateNotes }: PortScanProps) {
  return (
    <AccordionItem value="port-scan" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">4</Badge>
          <span className="text-lg font-semibold text-foreground">Port Scanning & Service Detection</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          Identify all listening services. A common mistake is only scanning ports 80/443. Many vulnerabilities live on administrative ports like 8080, 8443, 8888, or database ports.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Scanning Strategy</h4>
            <Tabs defaultValue="fast" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fast">Fast Discovery</TabsTrigger>
                <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="fast" className="space-y-3 mt-2">
                <div>
                    <p className="text-xs font-semibold mb-1">Naabu (Fast SYN Scan)</p>
                    <CodeBlock code="naabu -list resolved_subs.txt -p - -rate 1500 -o open_ports.txt" />
                    <p className="text-[10px] text-muted-foreground mt-1">
                        <code>-p -</code>: Scan all 65535 ports. <code>-rate</code>: Packets per second (adjust based on network quality).
                    </p>
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="space-y-3 mt-2">
                <div>
                    <p className="text-xs font-semibold mb-1">Nmap Service Scan</p>
                    <CodeBlock code="nmap -sV -sC -iL open_ports.txt -oN nmap_service_scan.txt" />
                    <p className="text-[10px] text-muted-foreground mt-1">
                        <code>-sV</code>: Version detection. <code>-sC</code>: Default scripts (safe).
                    </p>
                </div>
                <div>
                   <p className="text-xs font-semibold mb-1">RustScan (Alternative)</p>
                   <CodeBlock code="rustscan -a target.com -- -sV -sC" />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Interesting Services</h4>
            <Textarea 
              placeholder="e.g. SSH on 2222, Jenkins on 8080..." 
              className="h-[150px] font-mono text-xs resize-none"
              value={notes}
              onChange={(e) => onUpdateNotes(e.target.value)}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
