"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"

export function HttpProbing() {
  return (
    <AccordionItem value="http-probing" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">5</Badge>
          <span className="text-lg font-semibold text-foreground">HTTP Probing & Fingerprinting</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          Filter your list of open ports/subdomains to find active HTTP servers. Fingerprinting the technology stack helps prioritize targets (e.g., outdated PHP vs modern React app).
        </p>

        <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Live Asset Probe (httpx)</h4>
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <CodeBlock code="httpx -l resolved_subs.txt -status-code -content-length -title -tech-detect -follow-redirects -o live_web.txt" />
                    <ul className="text-xs text-muted-foreground mt-2 list-disc list-inside space-y-1">
                        <li><code>-tech-detect</code>: Identifies CMS (WordPress, Drupal) and frameworks.</li>
                        <li><code>-status-code</code>: Filter by 200, 403, 500 later.</li>
                        <li><code>-follow-redirects</code>: Follow 3xx to the final destination.</li>
                    </ul>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg border text-xs">
                    <p className="font-semibold mb-2">Pro Tip: Spotting Anomalies</p>
                    <p>
                        Look for identical Content-Lengths across many subdomains—these are often default parked pages or WAF blocking pages. 
                        A <code>403 Forbidden</code> might be more interesting than a <code>404 Not Found</code> because the resource exists but is protected.
                    </p>
                </div>
            </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
