"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { WorkflowsTable } from "./components/WorkflowsTable"

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflows</h1>
          <p className="text-muted-foreground">Manage and monitor your automated recon and scanning workflows.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Workflow
        </Button>
      </div>

      <WorkflowsTable />
    </div>
  )
}
