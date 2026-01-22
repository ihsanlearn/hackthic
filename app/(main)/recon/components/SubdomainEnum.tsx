"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SubdomainEnumProps {
  notes: string
  onUpdateNotes: (value: string) => void
}

export function SubdomainEnum({ notes, onUpdateNotes }: SubdomainEnumProps) {
  return (
    <AccordionItem value="subdomain" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">3</Badge>
          <span className="text-lg font-semibold text-foreground">Subdomain Enumeration</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          The goal is to find every sub-asset. Combining passive sources with active bruteforcing and permutation scanning usually yields the best results.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Enumeration Strategy</h4>
            <Tabs defaultValue="passive" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="passive">Passive Scans</TabsTrigger>
                <TabsTrigger value="active">Active & Resolve</TabsTrigger>
              </TabsList>
              
              <TabsContent value="passive" className="space-y-3 mt-2">
                <div>
                    <p className="text-xs font-semibold mb-1">Subfinder</p>
                    <CodeBlock code="subfinder -d target.com -all -recursive -o subdomains/subfinder.txt" />
                    <p className="text-[10px] text-muted-foreground mt-1">
                        <code>-all</code>: Use all sources. <code>-recursive</code>: look for sub.sub.target.com.
                    </p>
                </div>
                <div>
                    <p className="text-xs font-semibold mb-1">Amass</p>
                    <CodeBlock code="amass enum -d target.com -config ~/.config/amass/config.ini -o subdomains/amass.txt" />
                </div>
              </TabsContent>

              <TabsContent value="active" className="space-y-3 mt-2">
                <div>
                    <p className="text-xs font-semibold mb-1">DNSX Resolution</p>
                    <p className="text-[10px] text-muted-foreground mb-1">Always resolve your passive list to confirm the domains actually exist and have A records.</p>
                    <CodeBlock code="cat subdomains/*.txt | dnsx -resp -a -cname -o resolved.txt" />
                </div>
                <div>
                    <p className="text-xs font-semibold mb-1">Permutations (Altdns)</p>
                    <p className="text-[10px] text-muted-foreground mb-1">Generate variations (dev-target, target-prod) using a wordlist.</p>
                    <CodeBlock code="gotator -sub subdomains/*.txt -perm permutations.txt -depth 1 -numbers 10 -mindup -adv -md" />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Findings & Anomalies</h4>
             <p className="text-xs text-muted-foreground mb-2">Note down any star (*) wildcards or specific environments (dev, stg).</p>
            <Textarea 
              placeholder="e.g. *.dev.target.com is a wildcard..." 
              className="h-[180px] font-mono text-xs resize-none"
              value={notes}
              onChange={(e) => onUpdateNotes(e.target.value)}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
