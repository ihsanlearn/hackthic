"use server"

import { createClient } from "@/utils/supabase/server"

export interface DashboardStats {
    targetsCount: number
    assetsCount: number
    statusDistribution: { status: string, count: number, fill: string }[]
    topTechnologies: { name: string, count: number }[]
    recentTargets: { id: string, name: string, created_at: string }[]
    highValueCount: number
    apiCount: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const supabase = await createClient()

    // 1. Get Targets Count & Recent
    const { data: targets, error: targetsError } = await supabase
        .from('targets')
        .select('id, name, created_at')
        .order('created_at', { ascending: false })
    
    if (targetsError) throw new Error(targetsError.message)

    // 2. Get All Domains (Assets) for aggregation
    // note: for small-medium scale this is fine. For large scale, use RPC or count() queries.
    const { data: domains, error: domainsError } = await supabase
        .from('domains')
        .select('status_code, technologies')
    
    // 3. Get High Value & API Endpoint Counts
    // We can use a single query to fetch relevant flags or two count queries.
    // For efficiency let's do two count queries or one select with filter.
    // Since we need aggregate counts, let's just fetch all endpoints columns that matter (status flags) 
    // or use supabase .count() with filters.
    
    const { count: highValueCount, error: hvError } = await supabase
        .from('endpoints')
        .select('*', { count: 'exact', head: true })
        .eq('needs_manual', true)

    const { count: apiCount, error: apiError } = await supabase
        .from('endpoints')
        .select('*', { count: 'exact', head: true })
        .eq('is_api', true)
        
    if (hvError) console.error("Error fetching high value count:", hvError)
    if (apiError) console.error("Error fetching api count:", apiError)

    // Agregations
    const assetsCount = domains.length

    // Status Distribution
    const statusCounts = { '2xx': 0, '3xx': 0, '4xx': 0, '5xx': 0, 'Other': 0 }
    domains.forEach(d => {
        const code = d.status_code
        if (!code) return
        if (code >= 200 && code < 300) statusCounts['2xx']++
        else if (code >= 300 && code < 400) statusCounts['3xx']++
        else if (code >= 400 && code < 500) statusCounts['4xx']++
        else if (code >= 500 && code < 600) statusCounts['5xx']++
        else statusCounts['Other']++
    })

    const statusDistribution = [
        { status: '2xx', count: statusCounts['2xx'], fill: '#22c55e' }, // green-500
        { status: '3xx', count: statusCounts['3xx'], fill: '#fdba74' }, // orange-300
        { status: '4xx', count: statusCounts['4xx'], fill: '#ef4444' }, // red-500
        { status: '5xx', count: statusCounts['5xx'], fill: '#a855f7' }, // purple-500
    ].filter(s => s.count > 0)

    // Top Technologies
    const techMap: Record<string, number> = {}
    domains.forEach(d => {
        if (Array.isArray(d.technologies)) {
            d.technologies.forEach((t: string) => {
                techMap[t] = (techMap[t] || 0) + 1
            })
        }
    })

    const topTechnologies = Object.entries(techMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }))

    return {
        targetsCount: targets.length,
        assetsCount,
        statusDistribution,
        topTechnologies,
        topTechnologies,
        recentTargets: targets.slice(0, 5),
        highValueCount: highValueCount || 0,
        apiCount: apiCount || 0
    }
}
