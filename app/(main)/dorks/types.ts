export type DorkEngine = 'google' | 'github' | 'shodan' | 'fofa' | 'censys' | 'hunter' | 'zoomeye' | 'binaryedge' | 'duckduckgo' | 'bing'

export interface DorkItem {
    name: string
    query: string
}

export interface DorkEngineConfig {
    name: string
    base_url: string
}

export interface DorkCategory {
    category: string
    items: DorkItem[]
}
