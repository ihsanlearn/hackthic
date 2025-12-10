"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"

export function Automation() {
  return (
    <AccordionItem value="automation" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">10</Badge>
          <span className="text-lg font-semibold text-foreground">Automation & Reporting</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          Consistency is key. Organize your data methodically so you can diff scanning results over time to find new assets (monitoring).
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Directory Structure</h4>
            <CodeBlock code={`/recon
  /target-name
    /subdomains
      passive.txt
      active.txt
      resolved.txt
    /http
      live.txt
      screenshots/
    /nmap
    /nuclei
    summary.md`} />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Recommended Tools</h4>
            <ul className="text-xs text-muted-foreground space-y-2">
                <li className="p-2 border rounded bg-muted/20">
                    <strong className="text-primary block mb-1">Anew (TomNomNom)</strong>
                    Great for piping results. <code>cat new.txt | anew old.txt</code> outputs only the new lines.
                </li>
                <li className="p-2 border rounded bg-muted/20">
                    <strong className="text-primary block mb-1">Notify (ProjectDiscovery)</strong>
                    Send alerts to Discord/Slack when a scan finishes or finds a critical vuln.
                </li>
            </ul>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
