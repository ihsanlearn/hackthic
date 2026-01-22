"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OneLiners } from "./components/OneLiners"
import { NucleiTemplates } from "./components/NucleiTemplates"
import { BashScripts } from "./components/BashScripts"

export default function AutomationPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Scripts & Automations</h1>
        <p className="text-muted-foreground">Library of useful one-liners and automation templates.</p>
      </div>

      <Tabs defaultValue="oneliners" className="w-full">
         <TabsList>
            <TabsTrigger value="oneliners">One-Liners</TabsTrigger>
            <TabsTrigger value="nuclei">Nuclei Templates</TabsTrigger>
            <TabsTrigger value="bash">Bash Scripts</TabsTrigger>
          </TabsList>

          <TabsContent value="oneliners" className="mt-4">
            <OneLiners />
          </TabsContent>

          <TabsContent value="nuclei" className="mt-4">
             <NucleiTemplates />
          </TabsContent>
          
           <TabsContent value="bash" className="mt-4">
              <BashScripts />
           </TabsContent>
      </Tabs>
    </div>
  )
}
