"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"

export function VulnScanning() {
  return (
    <AccordionItem value="vuln-scan" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">8</Badge>
          <span className="text-lg font-semibold text-foreground">Vulnerability Scanning</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          Automated scanning for known CVEs and misconfigurations. ALWAYS verify results manually. Blindly reporting Nuclei output is the fastest way to get banned.
        </p>

        <div className="space-y-4">
           <h4 className="text-sm font-medium text-foreground">Nuclei Workflows</h4>
           <div className="grid gap-4 md:grid-cols-2">
               <div>
                   <p className="text-xs font-semibold mb-1">Standard Scan</p>
                   <CodeBlock code="nuclei -l live-web.txt -t cves/ -t misconfigurations/ -o nuclei_results.txt" />
               </div>
               <div>
                   <p className="text-xs font-semibold mb-1">Targeted Scan (e.g. Jira)</p>
                   <CodeBlock code="nuclei -l live-web.txt -tags jira -severity critical,high" />
               </div>
           </div>
           
           <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/50">
               <p className="text-xs font-semibold text-yellow-500 mb-1">⚠️ Safety First</p>
               <p className="text-xs text-muted-foreground">
                 Avoid using <code>-t intrusive</code> on production systems unless explicitly authorized. It can cause DoS or data corruption.
               </p>
           </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
