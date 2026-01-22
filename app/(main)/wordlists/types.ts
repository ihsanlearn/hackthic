export interface Wordlist {
  id: string
  name: string
  path: string
  description: string | null
  line_count: number | null
  size: string | null
  category_id: string
  created_at: string
}

export interface WordlistCategory {
  id: string
  name: string
  description: string | null
  wordlists: Wordlist[]
}
