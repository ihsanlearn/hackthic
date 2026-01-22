"use server"

import { createClient } from "@/utils/supabase/server"

export interface Payload {
    name: string
    code: string
}

export interface PayloadSection {
    title: string
    payloads: Payload[]
}

export interface PayloadCategory {
    id: string
    name: string
    sections?: PayloadSection[]
    payloads?: Payload[]
}

export async function getPayloads(): Promise<PayloadCategory[]> {
    const supabase = await createClient()

    // Fetch Fetch categories (types), contexts, and payloads
    const { data: types, error: typesError } = await supabase
        .from('payload_types')
        .select(`
            id,
            name,
            payload_contexts (
                id,
                name,
                payloads (
                    purpose,
                    payload
                )
            ),
            payloads (
                id,
                purpose,
                payload,
                context_id
            )
        `)
        .order('name') // Order by name or create a sort order column if needed

    if (typesError || !types) {
        console.error("Error fetching payloads:", typesError)
        return []
    }

    const categories: PayloadCategory[] = types.map((type: any) => {
        // Direct payloads are those where context_id is null
        // Note: The join 'payloads' on payload_types will return ALL payloads for this type,
        // regardless of context_id, unless we filter.
        // But the nested 'payload_contexts' -> 'payloads' will return payloads for that context.
        
        // So 'type.payloads' contains everything. We need to filter for direct ones (context_id is null).
        const directPayloads = type.payloads
            ?.filter((p: any) => p.context_id === null)
            .map((p: any) => ({
                name: p.purpose,
                code: p.payload
            })) || []

        const sections = type.payload_contexts?.map((ctx: any) => ({
            title: ctx.name,
            payloads: ctx.payloads?.map((p: any) => ({
                name: p.purpose,
                code: p.payload
            })) || []
        })) || []

        const category: PayloadCategory = {
            id: type.name.toLowerCase(), // Use name as ID for tabs
            name: type.name, // Capitalize or use as is? 
            // The DB name might be 'xss', 'sqli'. We might want to format it for display if needed.
            // But for now, let's use the DB name.
        }

        if (sections.length > 0) {
            category.sections = sections
            category.payloads = [] 
        } else {
            category.payloads = directPayloads
        }

        return category
    })

    return categories
}

export async function getPayloadCategories(): Promise<{ id: string; name: string }[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('payload_types')
        .select('name')
        .order('name')

    if (error || !data) {
        console.error('Error fetching payload categories:', error)
        return []
    }

    return data.map(d => ({
        id: d.name.toLowerCase(),
        name: d.name
    }))
}
