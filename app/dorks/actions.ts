"use server"

import { createClient } from "@/utils/supabase/server"
import { DorkEngine, DorkCategory } from "./types"

export interface DatabaseDork {
    dork: string
    purpose: string
    dork_contexts: {
        name: string
    }[] | { name: string } | null
    dork_engines: {
        name: string
    }[] | { name: string } | null
}

export async function getDorks(): Promise<Record<DorkEngine, DorkCategory[]>> {
    const supabase = await createClient()

    const { data: dorks, error } = await supabase
        .from('dorks')
        .select(`
            dork,
            purpose,
            dork_contexts (
                name
            ),
            dork_engines (
                name
            )
        `)
        .returns<any[]>() // Generic typing to avoid complex join types for now

    if (error) {
        console.error('Error fetching dorks:', error)
        return {} as Record<DorkEngine, DorkCategory[]>
    }

    if (!dorks) {
        return {} as Record<DorkEngine, DorkCategory[]>
    }

    // Transform flat DB result to nested structure
    const result: Partial<Record<DorkEngine, DorkCategory[]>> = {}

    dorks.forEach((row: any) => {
        // Handle array or object return from joins (Supabase client can vary based on relation type)
        // Based on schema, these are Many-to-One from dorks perspective, so likely object or single-element array if not 'single()'.
        // But selects usually return array for foreign keys unless configured.
        // Actually for Many-to-One, it usually returns an object if the FK is separate, 
        // but here dork_engines is returned as an object/array.
        // Let's handle both safely.
        
        const engineNameRaw = Array.isArray(row.dork_engines) ? row.dork_engines[0]?.name : row.dork_engines?.name
        const contextNameRaw = Array.isArray(row.dork_contexts) ? row.dork_contexts[0]?.name : row.dork_contexts?.name

        if (!engineNameRaw || !contextNameRaw) return

        const engine = engineNameRaw.toLowerCase() as DorkEngine
        const categoryName = contextNameRaw

        if (!result[engine]) {
            result[engine] = []
        }

        // Find existing category
        let category = result[engine]?.find(c => c.category === categoryName)
        
        if (!category) {
            category = {
                category: categoryName,
                items: []
            }
            result[engine]?.push(category)
        }

        category.items.push({
            name: row.purpose,
            query: row.dork
        })
    })

    return result as Record<DorkEngine, DorkCategory[]>
}

export async function getDorkEngines(): Promise<{ name: string; base_url: string }[]> {
    const supabase = await createClient()
    
    const { data, error } = await supabase
        .from('dork_engines')
        .select('name, base_url')
        
    if (error || !data) {
        console.error('Error fetching engines:', error)
        return []
    }
    
    return data.map(d => ({
        name: d.name,
        base_url: d.base_url
    }))
}
