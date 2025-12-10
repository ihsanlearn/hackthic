"use client"

import { ReportTemplates } from "./components/ReportTemplates"
import { ReportingTips } from "./components/ReportingTips"
import { CvssCalculator } from "./components/CvssCalculator"

export default function ReportingPage() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reporting Templates</h1>
        <p className="text-muted-foreground">Standardized templates for bug bounty and pentest reports.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <ReportTemplates />

        <div className="space-y-6">
            <ReportingTips />
            <CvssCalculator />
        </div>
      </div>
    </div>
  )
}
