"use client"

import { useState, useEffect } from "react"
import { useTarget } from "@/components/providers/target-provider"
import { getDomains, getEndpoints, createDomains, createEndpoints, deleteDomain, deleteEndpoint, Domain, Endpoint } from "@/app/targets/actions"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Plus, Globe, Link as LinkIcon, Loader2, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HackerLoader } from "@/components/ui/hacker-loader"

export default function TargetsPage() {
    const { activeTarget } = useTarget()
    const [domains, setDomains] = useState<Domain[]>([])
    const [endpoints, setEndpoints] = useState<Record<string, Endpoint[]>>({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (activeTarget) {
            fetchScope(activeTarget.id)
        } else {
            setDomains([])
            setEndpoints({})
        }
    }, [activeTarget])

    const fetchScope = async (targetId: string) => {
        setIsLoading(true)
        try {
            const fetchedDomains = await getDomains(targetId)
            setDomains(fetchedDomains)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddDomains = async (input: string) => {
        if (!activeTarget) return
        
        const names = input.split('\n').map(s => s.trim()).filter(Boolean)
        if (names.length === 0) return

        const newDomains = await createDomains(activeTarget.id, names)
        setDomains(prev => [...newDomains, ...prev])
    }

    const handleAddEndpoints = async (domainId: string, input: string) => {
        const paths = input.split('\n').map(s => s.trim()).filter(Boolean)
        if (paths.length === 0) return

        const newEndpoints = await createEndpoints(domainId, paths)
        setEndpoints(prev => ({
            ...prev,
            [domainId]: [...(prev[domainId] || []), ...newEndpoints]
        }))
    }

    const fetchDomainEndpoints = async (domainId: string) => {
        if (endpoints[domainId]) return 
        const fetched = await getEndpoints(domainId)
        setEndpoints(prev => ({
            ...prev,
            [domainId]: fetched
        }))
    }

    const handleDeleteDomain = async (e: React.MouseEvent, domainId: string) => {
        e.stopPropagation()
        if (!confirm('Are you sure you want to delete this domain?')) return
        
        await deleteDomain(domainId)
        setDomains(prev => prev.filter(d => d.id !== domainId))
        const { [domainId]: _, ...rest } = endpoints
        setEndpoints(rest)
    }

    const handleDeleteEndpoint = async (domainId: string, endpointId: string) => {
        if (!confirm('Are you sure you want to delete this endpoint?')) return

        await deleteEndpoint(endpointId)
        setEndpoints(prev => ({
            ...prev,
            [domainId]: prev[domainId].filter(e => e.id !== endpointId)
        }))
    }

    if (!activeTarget) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center rounded-lg border border-dashed text-muted-foreground">
                <div className="text-center">
                    <p className="text-lg font-medium">No Target Selected</p>
                    <p className="text-sm">Please select or create a target from the top navigation to manage scope.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{activeTarget.name} Scope</h1>
                    <p className="text-muted-foreground">Manage domains and endpoints for this target.</p>
                </div>
                <AddDomainDialog onAdd={handleAddDomains} />
            </div>

            {isLoading ? (
                 <div className="flex justify-center p-8"><HackerLoader text="FETCHING_DATA" /></div>
            ) : domains.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                    No domains added yet. Start by adding a domain.
                </div>
            ) : (
                <Accordion type="multiple" className="w-full space-y-4">
                    {domains.map(domain => (
                        <AccordionItem key={domain.id} value={domain.id} className="border rounded-lg px-4">
                            <AccordionTrigger onClick={() => fetchDomainEndpoints(domain.id)} className="group hover:no-underline">
                                <div className="flex items-center gap-3 w-full pr-4">
                                    <Globe className="h-4 w-4 text-primary" />
                                    <span>{domain.name}</span>
                                    <span className="text-xs text-muted-foreground ml-2 font-normal">
                                        {domain.in_scope ? 'In Scope' : 'Out of Scope'}
                                    </span>
                                    <div className="flex-1" />
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                        asChild
                                    >
                                        <span 
                                            role="button" 
                                            onClick={(e) => handleDeleteDomain(e, domain.id)}
                                            className="cursor-pointer"
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </span>
                                    </Button>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 pb-4">
                                <div className="space-y-4 ml-7">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium text-muted-foreground">Endpoints</h4>
                                        <AddEndpointDialog onAdd={(input) => handleAddEndpoints(domain.id, input)} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        {endpoints[domain.id]?.map(endpoint => (
                                            <div key={endpoint.id} className="group flex items-center gap-2 text-sm p-2 rounded bg-muted/50">
                                                <LinkIcon className="h-3 w-3 text-muted-foreground" />
                                                <span className="font-mono flex-1">{endpoint.path}</span>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleDeleteEndpoint(domain.id, endpoint.id)}
                                                >
                                                    <Trash2 className="h-3 w-3 text-destructive" />
                                                </Button>
                                            </div>
                                        ))}
                                        {endpoints[domain.id]?.length === 0 && (
                                            <div className="text-xs text-muted-foreground italic">No endpoints yet</div>
                                        )}
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </div>
    )
}

function AddDomainDialog({ onAdd }: { onAdd: (input: string) => Promise<void> }) {
    const [input, setInput] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await onAdd(input)
        setLoading(false)
        setOpen(false)
        setInput('')
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Domains</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Domains</DialogTitle>
                    <DialogDescription>
                        Enter one domain per line.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea 
                        placeholder="example.com&#10;api.example.com&#10;admin.example.com" 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        required 
                        className="h-32 font-mono text-sm"
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                             {loading ? <HackerLoader text="ADDING..." className="mr-2" /> : "Add Domains"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function AddEndpointDialog({ onAdd }: { onAdd: (input: string) => Promise<void> }) {
    const [input, setInput] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await onAdd(input)
        setLoading(false)
        setOpen(false)
        setInput('')
    }

    return (
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8"><Plus className="mr-2 h-3 w-3" /> Add Endpoints</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Endpoints</DialogTitle>
                    <DialogDescription>
                        Enter one path per line.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea 
                        placeholder="/admin/login&#10;/api/v1/users&#10;/config.json" 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        required 
                        className="h-32 font-mono text-sm"
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? <HackerLoader text="ADDING..." className="mr-2" /> : "Add Endpoints"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
