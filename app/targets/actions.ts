"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { calculateDomainScore } from "@/lib/scoring"

export interface Target {
    id: string
    name: string
    created_at: string
}

export interface Domain {
    id: string
    target_id: string
    url: string
    title?: string
    status_code?: number
    webserver?: string
    technologies?: string[]
    ip?: string
    cname?: string[]
    cdn?: string
    priority_score: number
    in_scope: boolean
    endpoint_count?: number
}

export interface Endpoint {
    id: string
    domain_id: string
    path: string
    method?: string
    status_code?: number
    source?: string
    tag?: string
    has_query: boolean
    query_param_count: number
    is_api: boolean
    is_xhr: boolean
    is_form: boolean
    discovered_from?: string
    depth: number
    confidence?: string
    needs_manual: boolean
    created_at?: string
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
    const { data, error } = await supabase
        .from('domains')
        .select('*, endpoints(count)')
        .eq('target_id', targetId)
        .order('priority_score', { ascending: false })
    
    if (error) {
        console.error('Error fetching domains:', error)
        return []
    }
    
    // Transform result to lift count to top level
    return data.map((d: any) => ({
        ...d,
        endpoint_count: d.endpoints?.[0]?.count || 0,
        // Remove the endpoints array from the object to match Domain interface clean structure if needed, 
        // though strictly typescript might complain if we don't handle the type assertion carefully.
        // We'll trust the type assertion below.
    })) as Domain[]
}

export async function createDomain(targetId: string, url: string) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('domains').insert({ target_id: targetId, url }).select().single()
    
    if (error) {
        throw new Error(error.message)
    }
    
    revalidatePath('/targets')
    return data as Domain
}

export async function createDomains(targetId: string, urls: string[]) {
    const supabase = await createClient()
    const records = urls.map(url => ({ target_id: targetId, url }))
    
    const { data, error } = await supabase.from('domains').insert(records).select()
    
    if (error) {
        throw new Error(error.message)
    }
    
    revalidatePath('/targets')
    return data as Domain[]
}

export async function importHttpxResults(targetId: string, results: any[]) {
    const supabase = await createClient()
    
    const records = results.map(r => {
        const scoreData = calculateDomainScore(r);
        return {
            target_id: targetId,
            url: r.url || r.input, // fallback to input if url missing
            title: r.title,
            status_code: r.status_code,
            webserver: r.webserver,
            technologies: r.tech, // Map 'tech' from httpx to 'technologies' in db
            ip: r.host_ip || r.ip || r.host, // Try multiple fields for IP
            cname: r.cname,
            cdn: r.cdn_name || (r.cdn ? "Unknown CDN" : null), // Map cdn_name
            priority_score: scoreData.score,
            in_scope: true
        }
    })

    const { data, error } = await supabase.from('domains').insert(records).select()

    if (error) {
        console.error("Batch insert error:", error)
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

export async function importKatanaResults(targetId: string, results: any[]) {
    const supabase = await createClient()

    // 1. Fetch valid domains for this target to validate against
    const { data: domains } = await supabase
        .from('domains')
        .select('id, url')
        .eq('target_id', targetId);
    
    if (!domains || domains.length === 0) {
        return []; // No domains to import into
    }

    // Create lookup map: Origin -> DomainID
    // Normalize domain URLs (remove trailing slash) for matching
    const domainMap = new Map<string, string>();
    domains.forEach(d => {
        try {
            const origin = new URL(d.url).origin;
            domainMap.set(origin, d.id);
        } catch {
            // ignore invalid db urls
        }
    });

    // Processing Logic
    const processedMap = new Map<string, any>();

    results.forEach(r => {
        // 1. Extract raw data
        let rawUrl = r.request?.endpoint || r.endpoint;
        if (!rawUrl) return;

        // 2. Normalization
        if (rawUrl.includes('#')) rawUrl = rawUrl.split('#')[0];

        // 3. Extract Path & Validate Domain
        let urlObj: URL | null = null;
        try {
            urlObj = new URL(rawUrl);
        } catch {
            return; // Skip invalid URLs
        }

        // VALIDATION: Check if origin exists in our target scope
        const origin = urlObj.origin;
        const domainId = domainMap.get(origin);

        if (!domainId) {
            return; // Skip: Endpoint does not belong to any domain in scope
        }

        const path = urlObj.pathname;
        const method = (r.request?.method || 'GET').toUpperCase();
        
        // 4. Generate Unique Key (must include domainId now)
        const key = `${domainId}-${path}-${method}`;

        // 5. Signal Extraction
        const has_query = rawUrl.includes('?');
        const query_param_count = Array.from(urlObj.searchParams.keys()).length;

        const is_xhr = r.tag === 'script' || r.source === 'xhr';
        const is_form = r.tag === 'form';
        
        // API Detection Logic
        const is_api = path.startsWith('/api') || 
                       path.startsWith('/v1') || 
                       path.startsWith('/v2') || 
                       path.includes('/graphql') ||
                       r.source === 'xhr';

        // 6. Confidence & Manual Check Logic
        let confidence = 'low';
        let needs_manual = false;

        if (/* xhr + api */ is_xhr && is_api) {
            confidence = 'high';
            needs_manual = true;
        } else if (/* has_query */ has_query) {
            confidence = 'high';
            needs_manual = true;
        } else if (/* status 403 */ r.response?.status_code === 403) {
            confidence = 'medium';
            needs_manual = true;
        } else if (/* form */ is_form) {
            confidence = 'medium';
            needs_manual = true;
        } else if (/* robots or static */ r.source === 'robots' || r.tag === 'file') {
            confidence = 'low';
            needs_manual = false;
        }

        if (!processedMap.has(key)) {
             processedMap.set(key, {
                domain_id: domainId,
                path: path,
                method: method,
                status_code: r.response?.status_code,
                source: r.source,
                tag: r.tag,
                has_query: has_query,
                query_param_count: query_param_count,
                is_api: is_api,
                is_xhr: is_xhr,
                is_form: is_form,
                discovered_from: r.request?.source || r.source, 
                depth: r.depth || 0,
                confidence: confidence,
                needs_manual: needs_manual
            });
        }
    });

    const records = Array.from(processedMap.values());
    if (records.length === 0) return [];

    const { data, error } = await supabase
        .from('endpoints')
        .upsert(records, { onConflict: 'domain_id, path, method', ignoreDuplicates: true })
        .select()

    if (error) {
        console.error("Batch insert error:", error)
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
