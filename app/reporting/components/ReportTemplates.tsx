"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { reportTemplates } from "./reporting-templates"
import { EditableTemplate } from "./EditableTemplate"

export function ReportTemplates() {
  return (
    <Tabs defaultValue="bounty" className="w-full">
        <TabsList>
        <TabsTrigger value="bounty">Bug Bounty</TabsTrigger>
        <TabsTrigger value="pentest">Pentest Finding</TabsTrigger>
        <TabsTrigger value="poc">PoC Sample</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bounty" className="mt-4">
            <Card>
            <CardHeader>
                <CardTitle>HackerOne / Bugcrowd Template</CardTitle>
                <CardDescription>Standard format for platform submissions.</CardDescription>
            </CardHeader>
            <CardContent>
                <EditableTemplate initialContent={reportTemplates.h1} language="markdown" />
            </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="pentest" className="mt-4">
            <Card>
            <CardHeader>
                <CardTitle>Professional Pentest Finding</CardTitle>
                <CardDescription>Format for client deliverables.</CardDescription>
            </CardHeader>
            <CardContent>
                <EditableTemplate initialContent={reportTemplates.pentest} language="markdown" />
            </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="poc" className="mt-4">
            <Card>
            <CardHeader>
                <CardTitle>HTTP Request PoC</CardTitle>
                <CardDescription>Clean request format.</CardDescription>
            </CardHeader>
            <CardContent>
                <EditableTemplate initialContent={reportTemplates.poc} language="http" />
            </CardContent>
            </Card>
        </TabsContent>
    </Tabs>
  )
}
