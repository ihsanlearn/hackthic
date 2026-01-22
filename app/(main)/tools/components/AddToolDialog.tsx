"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { createTool } from "../actions"
import { ToolCategory } from "../types"
import { toast } from "sonner" 

interface AddToolDialogProps {
  categories: ToolCategory[]
}

export function AddToolDialog({ categories }: AddToolDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    const result = await createTool(formData)
    setLoading(false)

    if (result.error) {
    //   toast.error(result.error)
      alert(result.error) // Fallback if no toast provider
    } else {
    //   toast.success("Tool added successfully")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Tool
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Tool</DialogTitle>
          <DialogDescription>
            Add a new tool to your arsenal. Use placeholders like <code>target.com</code> in commands.
          </DialogDescription>
        </DialogHeader>
        <form action={onSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" className="col-span-3" required placeholder="e.g. Nmap" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select name="category_id" required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
             <Select name="status" defaultValue="Ready">
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ready">Ready</SelectItem>
                <SelectItem value="Connected">Connected</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="version" className="text-right">
              Version
            </Label>
            <Input id="version" name="version" className="col-span-3" placeholder="v1.0.0" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="command" className="text-right">
              Command
            </Label>
            <div className="col-span-3">
                <Input id="command" name="command" placeholder="nmap -v -A target.com" />
                <p className="text-[0.8rem] text-muted-foreground mt-1">
                    Use <code>target.com</code>, <code>username</code>, etc. as dynamic placeholders.
                </p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" name="description" className="col-span-3" placeholder="Tool description..." />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Tool"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
