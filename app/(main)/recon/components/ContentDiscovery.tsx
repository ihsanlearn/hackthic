"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ContentDiscoveryProps {
  notes: string
  onUpdateNotes: (value: string) => void
}

export function ContentDiscovery({ notes, onUpdateNotes }: ContentDiscoveryProps) {
  return (
    <AccordionItem value="content-discovery" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">6</Badge>
          <span className="text-lg font-semibold text-foreground">URL Enumeration & Content Discovery</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          URLs are the roadmap of the application. Gather them from passive archives and active crawling to build a comprehensive list of endpoints.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Discovery Methods</h4>
            <Tabs defaultValue="crawl" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="crawl">Active Crawling</TabsTrigger>
                <TabsTrigger value="archive">Archive Mining</TabsTrigger>
              </TabsList>
              
              <TabsContent value="crawl" className="space-y-3 mt-2">
                <div>
                    <p className="text-xs font-semibold mb-1">Katana</p>
                    <CodeBlock code="katana -u https://target.com -d 5 -jc -o active_crawl.txt" />
                    <p className="text-[10px] text-muted-foreground mt-1">
                        <code>-d 5</code>: Deep recursion. <code>-jc</code>: JavaScript crawling (headless).
                    </p>
                </div>
              </TabsContent>

              <TabsContent value="archive" className="space-y-3 mt-2">
                <div>
                    <p className="text-xs font-semibold mb-1">Waybackurls & GAU</p>
                    <CodeBlock code="echo target.com | gau --blacklist png,jpg,gif,svg > archive_urls.txt" />
                </div>
                <div>
                    <p className="text-xs font-semibold mb-1">Consolidation</p>
                    <CodeBlock code="cat active_crawl.txt archive_urls.txt | sort -u > all_urls.txt" />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Interesting Endpoints</h4>
            <Textarea 
              placeholder="e.g. /api/v1/user/debug, /admin/login.php..." 
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
