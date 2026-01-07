"use client"

import { useState, useEffect } from "react"
import { useTarget } from "@/components/providers/target-provider"
import { getDomains, getEndpoints, createDomains, createEndpoints, deleteDomain, deleteEndpoint, Domain, Endpoint } from "@/app/targets/actions"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Plus, Globe, Link as LinkIcon, Loader2, Trash2, Server, Globe2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HackerLoader } from "@/components/ui/hacker-loader"
import { Badge } from "@/components/ui/badge"
import { HttpxUpload } from "@/app/recon/components/HttpxUpload"
import { KatanaUpload } from "@/app/recon/components/KatanaUpload"

export default function TargetsPage() {
    const { activeTarget } = useTarget()
    const [domains, setDomains] = useState<Domain[]>([])
    const [endpoints, setEndpoints] = useState<Record<string, Endpoint[]>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [statusFilter, setStatusFilter] = useState("ALL")

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
        
        const urls = input.split('\n').map(s => s.trim()).filter(Boolean)
        if (urls.length === 0) return

        const newDomains = await createDomains(activeTarget.id, urls)
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

    const handleUploadComplete = () => {
        if (activeTarget) {
            fetchScope(activeTarget.id)
        }
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

    const filteredDomains = domains.filter(d => {
        if (statusFilter === "ALL") return true
        if (!d.status_code) return statusFilter === "OTHER"
        if (statusFilter === "2xx") return d.status_code >= 200 && d.status_code < 300
        if (statusFilter === "3xx") return d.status_code >= 300 && d.status_code < 400
        if (statusFilter === "4xx") return d.status_code >= 400 && d.status_code < 500
        if (statusFilter === "5xx") return d.status_code >= 500 && d.status_code < 600
        return true
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{activeTarget.name} Scope</h1>
                    <p className="text-muted-foreground">Manage domains and endpoints for this target.</p>
                </div>
                <div className="flex items-center gap-2">
                    <HttpxUpload targetId={activeTarget.id} onUploadComplete={handleUploadComplete} />
                    <KatanaUpload targetId={activeTarget.id} onUploadComplete={handleUploadComplete} />
                    <AddDomainDialog onAdd={handleAddDomains} />
                </div>
            </div>

            {/* Status Filter Bar */}
            <div className="flex items-center gap-2 pb-2">
                <Button 
                    variant={statusFilter === "ALL" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setStatusFilter("ALL")}
                    className="h-7 text-xs"
                >
                    All
                </Button>
                <Button 
                    variant={statusFilter === "2xx" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setStatusFilter("2xx")}
                    className={`h-7 text-xs ${statusFilter !== "2xx" && "text-green-500 border-green-500/20 hover:bg-green-500/10"}`}
                >
                    2xx
                </Button>
                <Button 
                    variant={statusFilter === "3xx" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setStatusFilter("3xx")}
                    className={`h-7 text-xs ${statusFilter !== "3xx" && "text-orange-500 border-orange-500/20 hover:bg-orange-500/10"}`}
                >
                    3xx
                </Button>
                <Button 
                    variant={statusFilter === "4xx" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setStatusFilter("4xx")}
                    className={`h-7 text-xs ${statusFilter !== "4xx" && "text-red-500 border-red-500/20 hover:bg-red-500/10"}`}
                >
                    4xx
                </Button>
                <Button 
                    variant={statusFilter === "5xx" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setStatusFilter("5xx")}
                    className={`h-7 text-xs ${statusFilter !== "5xx" && "text-purple-500 border-purple-500/20 hover:bg-purple-500/10"}`}
                >
                    5xx
                </Button>
            </div>

            {isLoading ? (
                 <div className="flex justify-center p-8"><HackerLoader text="FETCHING_DATA" /></div>
            ) : domains.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                    No domains added yet. Start by adding a domain or importing httpx results.
                </div>
            ) : (
                <Accordion type="multiple" className="w-full space-y-4">
                    {filteredDomains.map(domain => (
                        <AccordionItem key={domain.id} value={domain.id} className="border rounded-lg px-4">
                            <AccordionTrigger onClick={() => fetchDomainEndpoints(domain.id)} className="group hover:no-underline">
                                <div className="flex items-center gap-3 w-full pr-4">
                                    <div className="flex flex-col items-center justify-center space-y-1 min-w-[30px]">
                                        <Globe className="h-4 w-4 text-primary" />
                                        
                                        {/* Priority Score Badge */}
                                        <span className={`text-[10px] font-mono font-bold px-1.5 rounded border ${
                                            (domain.priority_score || 0) >= 80 ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                            (domain.priority_score || 0) >= 60 ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                            (domain.priority_score || 0) >= 40 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                            (domain.priority_score || 0) >= 20 ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                            'bg-muted/50 text-muted-foreground border-transparent'
                                        }`} title={`Priority Score: ${domain.priority_score || 0}`}>
                                            {domain.priority_score || 0}
                                        </span>

                                        {domain.status_code && (
                                            <span className={`text-[10px] font-mono px-1 rounded ${
                                                domain.status_code >= 200 && domain.status_code < 300 ? 'bg-green-500/20 text-green-500' :
                                                domain.status_code >= 300 && domain.status_code < 400 ? 'bg-orange-500/20 text-orange-300' :
                                                'bg-red-500/20 text-red-500'
                                            }`}>
                                                {domain.status_code}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-col text-left">
                                        <span className="font-medium">{domain.url}</span>
                                        {domain.title && <span className="text-xs text-muted-foreground truncate max-w-[300px]">{domain.title}</span>}
                                    </div>

                                    {/* Tech Stack Badges */}
                                    <div className="flex items-center gap-2 ml-4 overflow-hidden mask-fade-right">
                                        {domain.webserver && <Badge variant="secondary" className="text-xs h-6 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 capitalize">{domain.webserver}</Badge>}
                                        {domain.cdn && <Badge variant="outline" className="text-xs h-6 border-orange-500/30 text-orange-500 capitalize">{domain.cdn}</Badge>}
                                        {domain.technologies?.slice(0, 3).map(tech => (
                                            <Badge key={tech} variant="outline" className="text-xs h-6">{tech}</Badge>
                                        ))}
                                    </div>
                                    
                                    {/* Endpoint Count Badge */}
                                    {domain.endpoint_count !== undefined && domain.endpoint_count !== null && domain.endpoint_count > 0 && (
                                        <div className="ml-3">
                                            <Badge variant="secondary" className="text-xs h-6 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 font-mono font-medium border border-purple-500/20">
                                                {domain.endpoint_count || 0} eps
                                            </Badge>
                                        </div>
                                    )}

                                    <div className="flex-1" />
                                    
                                    {domain.ip && <span className="text-xs font-mono text-muted-foreground mr-4 hidden md:inline-block">{domain.ip}</span>}

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
                                    
                                    {/* Rich Details Section */}
                                    {(domain.cname || domain.technologies) && (
                                        <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-muted-foreground bg-muted/20 p-3 rounded">
                                            {domain.cname && domain.cname.length > 0 && (
                                                <div>
                                                    <span className="font-semibold block mb-1">CNAME Records:</span>
                                                    <div className="font-mono">
                                                        {domain.cname.join(', ')}
                                                    </div>
                                                </div>
                                            )}
                                            {domain.technologies && domain.technologies.length > 0 && (
                                                 <div>
                                                    <span className="font-semibold block mb-1">All Technologies:</span>
                                                    <div>
                                                        {domain.technologies.join(', ')}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between border-b pb-2 mb-2">
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                                Endpoints 
                                                <Badge variant="secondary" className="text-[10px] h-5 px-1.5">{endpoints[domain.id]?.length || 0}</Badge>
                                            </h4>
                                            
                                            {/* Quick Filters / Stats - Optional enhancement */}
                                            {endpoints[domain.id]?.some(e => e.needs_manual) && (
                                                <Badge variant="destructive" className="text-[9px] h-5 animate-pulse bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/30">
                                                    Manual Check Required
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <AddEndpointDialog onAdd={(input) => handleAddEndpoints(domain.id, input)} />
                                        </div>
                                    </div>
                                    
                                    <div className="grid gap-1.5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                        {endpoints[domain.id]?.map(endpoint => (
                                            <div 
                                                key={endpoint.id} 
                                                className={`group flex items-center justify-between p-2 rounded text-sm border transition-all ${
                                                    endpoint.needs_manual ? 'bg-orange-500/5 border-orange-500/20 hover:bg-orange-500/10' : 
                                                    endpoint.is_api ? 'bg-blue-500/5 border-blue-500/10 hover:bg-blue-500/10' :
                                                    'bg-muted/30 border-transparent hover:bg-muted/50 hover:border-border'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2 overflow-hidden w-full">
                                                    
                                                    {/* Method Badge */}
                                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border min-w-[38px] text-center ${
                                                        (endpoint.method === 'GET' || !endpoint.method) ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                        endpoint.method === 'POST' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        endpoint.method === 'PUT' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                                        endpoint.method === 'DELETE' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                        'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                                    }`}>
                                                        {endpoint.method || 'GET'}
                                                    </span>

                                                    {/* Path */}
                                                    <span className="font-mono truncate text-xs flex-1 text-foreground/90" title={endpoint.path}>{endpoint.path}</span>
                                                    
                                                    {/* Rich Signals */}
                                                    <div className="flex items-center gap-1.5 opacity-90">
                                                        {endpoint.status_code && (
                                                            <span className={`text-[10px] font-mono ${
                                                                endpoint.status_code >= 200 && endpoint.status_code < 300 ? 'text-green-500' :
                                                                endpoint.status_code >= 300 && endpoint.status_code < 400 ? 'text-orange-500' :
                                                                'text-red-500'
                                                            }`}>
                                                                {endpoint.status_code}
                                                            </span>
                                                        )}

                                                        {/* Flags */}
                                                        {endpoint.is_xhr && <span title="Source: XHR / Script" className="text-[9px] font-bold text-purple-500 bg-purple-500/10 border border-purple-500/20 px-1 rounded">XHR</span>}
                                                        {endpoint.is_api && <span title="API Endpoint" className="text-[9px] font-bold text-cyan-500 bg-cyan-500/10 border border-cyan-500/20 px-1 rounded">API</span>}
                                                        {endpoint.is_form && <span title="Contains Form" className="text-[9px] font-bold text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-1 rounded">FORM</span>}
                                                        
                                                        {/* Query Params */}
                                                        {endpoint.has_query && (
                                                            <div title={`${endpoint.query_param_count} Parameters`} className="flex items-center gap-0.5 text-[9px] bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 px-1 rounded font-mono">
                                                                <span>?</span>
                                                                {endpoint.query_param_count > 0 && <span className="font-bold">{endpoint.query_param_count}</span>}
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>

                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                                    onClick={() => handleDeleteEndpoint(domain.id, endpoint.id)}
                                                >
                                                    <Trash2 className="h-3 w-3 text-destructive" />
                                                </Button>
                                            </div>
                                        ))}
                                        {endpoints[domain.id]?.length === 0 && (
                                            <div className="text-xs text-muted-foreground italic text-center py-6 border border-dashed rounded bg-muted/20">
                                                No endpoints yet. Import from Katana to see rich data.
                                            </div>
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
                        Enter one domain/URL per line.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea 
                        placeholder="https://example.com&#10;sub.example.com" 
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
