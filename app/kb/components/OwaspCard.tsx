"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { owaspTop10 } from "./kb-data"

export function OwaspCard() {
  return (
    <Card className="h-full border-white/5 bg-card/50">
    <CardHeader>
        <CardTitle className="flex items-center gap-2">
            OWASP Top 10
            <Badge variant="secondary" className="text-xs">2021</Badge>
        </CardTitle>
        <CardDescription>Standard awareness document for developers and web application security.</CardDescription>
    </CardHeader>
    <CardContent>
        <Accordion type="single" collapsible className="w-full">
            {owaspTop10.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border-white/5">
                    <AccordionTrigger className="hover:no-underline">
                        <span className="flex items-center text-left">
                            <span className="font-mono text-primary mr-3 text-xs opacity-70">{item.id}</span>
                            <span>{item.title}</span>
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.description}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </CardContent>
    </Card>
  )
}
