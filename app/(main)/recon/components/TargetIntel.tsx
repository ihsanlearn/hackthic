"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TargetIntel() {
  return (
    <AccordionItem value="target-intel" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">2</Badge>
          <span className="text-lg font-semibold text-foreground">Target Intelligence & Asset Mapping</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          Defining your scope is 50% of the battle. Use Open Source Intelligence (OSINT) to map the organization's footprint, including IP ranges, acquisitions, and related domains.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Intelligence Sources</h4>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li className="p-2 border rounded bg-muted/20">
                <strong className="text-primary block mb-1">ASN & Network Ranges</strong>
                Identify the Autonomous System Numbers (ASN) owned by the target to find all IP ranges.
              </li>
              <li className="p-2 border rounded bg-muted/20">
                <strong className="text-primary block mb-1">Acquisitions</strong>
                Check Crunchbase or Wikipedia for subsidiaries. Often less secure than the main brand.
              </li>
              <li className="p-2 border rounded bg-muted/20">
                <strong className="text-primary block mb-1">Certificate Transparency</strong>
                Use <code>crt.sh</code> to find subdomains that have had SSL certificates issued. Good for finding historical assets.
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Command Lab</h4>
            <Tabs defaultValue="asn" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="asn">ASN & IP</TabsTrigger>
                <TabsTrigger value="certs">Certs</TabsTrigger>
                <TabsTrigger value="dorks">Dorks</TabsTrigger>
              </TabsList>

              <TabsContent value="asn">
                <div className="space-y-2 mt-2">
                    <p className="text-xs text-muted-foreground">Query Whois for organization name and extract ranges.</p>
                    <CodeBlock code="# Search by Org Name
whois -h whois.radb.net -- '-i origin AS12345'

# Extract IPv4 CIDRs
whois -h whois.radb.net -- '-i origin AS12345' | grep -Eo '([0-9.]+){4}/[0-9]+' | tee ranges.txt" />
                </div>
              </TabsContent>

              <TabsContent value="certs">
                 <div className="space-y-2 mt-2">
                    <p className="text-xs text-muted-foreground">Query crt.sh via CLI.</p>
                    <CodeBlock code="curl -s 'https://crt.sh/?q=%.target.com&output=json' | jq -r '.[].name_value' | sort -u > crt-domains.txt" />
                 </div>
              </TabsContent>

              <TabsContent value="dorks">
                 <div className="space-y-2 mt-2">
                    <p className="text-xs text-muted-foreground">Google Hacking Database (GHDB) basics.</p>
                    <CodeBlock code="site:target.com ext:pdf
site:target.com inurl:admin
site:target.com intitle:'index of'" />
                 </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
