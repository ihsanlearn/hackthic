"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createTarget } from "@/app/targets/actions"
import { useTarget } from "@/components/providers/target-provider"

interface CreateTargetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTargetModal({ open, onOpenChange }: CreateTargetModalProps) {
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { refreshTargets, setActiveTarget } = useTarget()
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
        setError("Target name is required")
        return
    }
    
    setIsLoading(true)
    setError("")
    
    try {
      const newTarget = await createTarget(name)
      await refreshTargets()
      setActiveTarget(newTarget)
      onOpenChange(false)
      setName("")
    } catch (error) {
        console.error(error)
        setError("Failed to create target. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Target</DialogTitle>
          <DialogDescription>
            Add a new target or project to your workspace.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                    id="name" 
                    placeholder="e.g. Instagram" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Target
              </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
