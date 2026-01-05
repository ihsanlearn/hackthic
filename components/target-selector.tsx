"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle, Target as TargetIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTarget } from "@/components/providers/target-provider"
import { CreateTargetModal } from "./modals/create-target-modal"

export function TargetSelector() {
  const [open, setOpen] = React.useState(false)
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const { activeTarget, setActiveTarget, targets } = useTarget()

  return (
    <>
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            >
            {activeTarget ? (
                <span className="flex items-center gap-2 truncate">
                    <TargetIcon className="h-4 w-4 text-primary" />
                    {activeTarget.name}
                </span>
            ) : (
                <span className="text-muted-foreground">Select target...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
            <CommandInput placeholder="Search target..." />
            <CommandList>
                <CommandEmpty>No target found.</CommandEmpty>
                <CommandGroup heading="Targets">
                {targets.map((target) => (
                    <CommandItem
                    key={target.id}
                    value={target.name}
                    onSelect={() => {
                        setActiveTarget(target)
                        setOpen(false)
                    }}
                    >
                    <Check
                        className={cn(
                        "mr-2 h-4 w-4",
                        activeTarget?.id === target.id ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {target.name}
                    </CommandItem>
                ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                    <CommandItem
                        onSelect={() => {
                            setOpen(false)
                            setShowCreateModal(true)
                        }}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Target
                    </CommandItem>
                </CommandGroup>
            </CommandList>
            </Command>
        </PopoverContent>
        </Popover>

        <CreateTargetModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </>
  )
}
