"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ReconSetupProps {
  notes: string
  onUpdateNotes: (value: string) => void
}

export function ReconSetup({ notes, onUpdateNotes }: ReconSetupProps) {
  return (
    <AccordionItem value="setup" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">1</Badge>
          <span className="text-lg font-semibold text-foreground">Pre-Recon Setup</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          Prepare your environment to ensure efficiency and effective data management. A dedicated VPS or isolated local lab is recommended to avoid IP blacklisting on your home network.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Essential Toolkit Configuration</h4>
            <Tabs defaultValue="passive" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="passive">Passive</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="utils">Utils</TabsTrigger>
              </TabsList>
              
              <TabsContent value="passive" className="space-y-2 mt-2">
                <div className="text-xs space-y-2">
                    <p><strong className="text-primary">Amass:</strong> The heavyweight of passive recon. Requires API keys for best results (Shodan, Censys, VirusTotal).</p>
                    <p><strong className="text-primary">Subfinder:</strong> Faster than Amass, excellent for quick wins using modular sources.</p>
                    <p><strong className="text-primary">WaybackURLs / GAU:</strong> Fetch archived URLs from Wayback Machine, AlienVault, and Common Crawl.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="active" className="space-y-2 mt-2">
                 <div className="text-xs space-y-2">
                    <p><strong className="text-primary">Naabu:</strong> Written in Go, extremely fast port scanning. Good for large scopes.</p>
                    <p><strong className="text-primary">Katana:</strong> Modern web crawler. Can use headless browsing for JS-heavy sites.</p>
                    <p><strong className="text-primary">Nuclei:</strong> Template-based vulnerability scanner. Essential for automated checks.</p>
                 </div>
              </TabsContent>

              <TabsContent value="utils" className="space-y-2 mt-2">
                 <div className="text-xs space-y-2">
                    <p><strong className="text-primary">httpx:</strong> Multi-purpose HTTP toolkit. Probing, title grabbing, tech detection.</p>
                    <p><strong className="text-primary">anew:</strong> By TomNomNom. Append lines to a file only if they don't exist. Crucial for automation.</p>
                    <p><strong className="text-primary">mapcidr:</strong> Process CIDR ranges for targeted scanning.</p>
                 </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Workspace Notes</h4>
            <p className="text-xs text-muted-foreground mb-2">Track your VPS IP, specific configurations, or tool versions here.</p>
            <Textarea 
              placeholder="e.g. VPS IP: 192.168.x.x, All tools updated..." 
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
