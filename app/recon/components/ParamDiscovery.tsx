"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ParamDiscovery() {
  return (
    <AccordionItem value="params" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">7</Badge>
          <span className="text-lg font-semibold text-foreground">Parameter Discovery & Fuzzing</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          Find hidden parameters that trigger backend logic (e.g. <code>debug=true</code>, <code>admin=1</code>). This is where IDOR, SQLi, and SSRF vulnerabilities often live.
        </p>

        <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Fuzzing Workflow</h4>
            <Tabs defaultValue="ffuf" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ffuf">Ffuf</TabsTrigger>
                <TabsTrigger value="paramspider">ParamSpider</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ffuf" className="space-y-3 mt-2">
                <div>
                    <p className="text-xs font-semibold mb-1">Standard GET Fuzzing</p>
                    <CodeBlock code="ffuf -u https://target.com/API/v1/user?FUZZ=1 -w params.txt -mc 200 -o params_found.txt" />
                     <p className="text-[10px] text-muted-foreground mt-1">
                        Use a high-quality wordlist like <code>Burp Suite Param Miner</code> list.
                    </p>
                </div>
                <div>
                     <p className="text-xs font-semibold mb-1">POST Body Fuzzing</p>
                    <CodeBlock code="ffuf -u https://target.com/login -X POST -d 'user=admin&FUZZ=password' -w passlist.txt" />
                </div>
              </TabsContent>

              <TabsContent value="paramspider" className="space-y-3 mt-2">
                <div>
                    <p className="text-xs font-semibold mb-1">Mining from Archives</p>
                    <CodeBlock code="python3 paramspider.py --domain target.com --output params.txt" />
                    <p className="text-[10px] text-muted-foreground mt-1">
                        This extracts parameters from the Wayback Machine, saving you from guessing.
                    </p>
                </div>
              </TabsContent>
            </Tabs>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
