"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export interface Target {
    id: string
    name: string
    created_at: string
}

export interface Domain {
    id: string
    target_id: string
    name: string
    priority_score: number
    in_scope: boolean
}

export interface Endpoint {
    id: string
    domain_id: string
    path: string
}

export async function getTargets() {
    const supabase = await createClient()
    const { data, error } = await supabase.from('targets').select('*').order('created_at', { ascending: false })
    
    if (error) {
        console.error('Error fetching targets:', error)
        return []
    }
    return data as Target[]
}

export async function createTarget(name: string) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('targets').insert({ name }).select().single()
    
    if (error) {
        throw new Error(error.message)
    }
    
    revalidatePath('/')
    return data as Target
}

export async function getDomains(targetId: string) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('domains').select('*').eq('target_id', targetId).order('priority_score', { ascending: false })
    
    if (error) {
        console.error('Error fetching domains:', error)
        return []
    }
    return data as Domain[]
}

export async function createDomain(targetId: string, name: string) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('domains').insert({ target_id: targetId, name }).select().single()
    
    if (error) {
        throw new Error(error.message)
    }
    
    revalidatePath('/targets')
    return data as Domain
}

export async function createDomains(targetId: string, names: string[]) {
    const supabase = await createClient()
    const records = names.map(name => ({ target_id: targetId, name }))
    
    const { data, error } = await supabase.from('domains').insert(records).select()
    
    if (error) {
        throw new Error(error.message)
    }
    
    revalidatePath('/targets')
    return data as Domain[]
}

export async function getEndpoints(domainId: string) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('endpoints').select('*').eq('domain_id', domainId)
    
    if (error) {
        console.error('Error fetching endpoints:', error)
        return []
    }
    return data as Endpoint[]
}

export async function createEndpoint(domainId: string, path: string) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('endpoints').insert({ domain_id: domainId, path }).select().single()
    
    if (error) {
        throw new Error(error.message)
    }
    
    revalidatePath('/targets')
    return data as Endpoint
}

export async function createEndpoints(domainId: string, paths: string[]) {
    const supabase = await createClient()
    const records = paths.map(path => ({ domain_id: domainId, path }))
    
    const { data, error } = await supabase.from('endpoints').insert(records).select()
    
    if (error) {
        throw new Error(error.message)
    }
    
    revalidatePath('/targets')
    return data as Endpoint[]
}

export async function deleteDomain(domainId: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('domains').delete().eq('id', domainId)
    
    if (error) {
        throw new Error(error.message)
    }
    
    revalidatePath('/targets')
}

export async function deleteEndpoint(endpointId: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('endpoints').delete().eq('id', endpointId)
    
    if (error) {
        throw new Error(error.message)
    }
    
    revalidatePath('/targets')
}
