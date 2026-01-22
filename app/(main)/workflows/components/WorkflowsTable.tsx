"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { workflows } from "./workflows-data"

export function WorkflowsTable() {
  return (
    <div className="rounded-md border bg-card">
    <Table>
        <TableHeader>
        <TableRow>
            <TableHead>Workflow Name</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Run</TableHead>
            <TableHead className="text-right">Actions</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {workflows.map((wf) => (
            <TableRow key={wf.id}>
            <TableCell className="font-medium">{wf.name}</TableCell>
            <TableCell>{wf.target}</TableCell>
            <TableCell>
                <Badge 
                variant={
                    wf.status === "Running" ? "default" : 
                    wf.status === "Completed" ? "secondary" : 
                    wf.status === "Failed" ? "destructive" : "outline"
                }
                >
                {wf.status}
                </Badge>
            </TableCell>
            <TableCell>{wf.lastRun}</TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                    <Play className="h-4 w-4" />
                    <span className="sr-only">Run</span>
                    </Button>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Logs</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    </div>
  )
}
