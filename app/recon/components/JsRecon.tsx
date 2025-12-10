"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"

export function JsRecon() {
  return (
    <AccordionItem value="js-recon" className="border rounded-lg px-4 bg-card">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">9</Badge>
          <span className="text-lg font-semibold text-foreground">JS Recon & Secrets</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          JavaScript files are a goldmine. They often leak API keys, hidden endpoints, and developer comments that reveal backend logic.
        </p>

        <div className="space-y-4">
           <h4 className="text-sm font-medium text-foreground">Analysis Techniques</h4>
           <div className="grid gap-4 md:grid-cols-2">
               <div>
                   <p className="text-xs font-semibold mb-1">Extract Endpoints (LinkFinder)</p>
                   <CodeBlock code="python3 linkfinder.py -i https://target.com/main.js -o cli" />
               </div>
               <div>
                   <p className="text-xs font-semibold mb-1">Find Secrets (TruffleHog)</p>
                   <CodeBlock code="trufflehog filesystem ./js_files/ --no-update" />
               </div>
           </div>
           <div>
               <p className="text-xs font-semibold mb-1">Source Map Reconstruction</p>
               <p className="text-xs text-muted-foreground mb-1">If <code>.js.map</code> files are present, you can reconstruct the original TypeScript/Vue/React source code.</p>
               <CodeBlock code="sourcemapper -url https://target.com/main.js.map -output ./src" />
           </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
