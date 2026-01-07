"use server"

import { createClient } from "@/utils/supabase/server"
import { WordlistCategory } from "./types"

export async function getWordlists(): Promise<WordlistCategory[]> {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from('wordlist_categories')
    .select(`
      id,
      name,
      description,
      wordlists (
        id,
        name,
        path,
        description,
        line_count,
        size,
        category_id,
        created_at
      )
    `)

  if (error) {
    console.error('Error fetching wordlists:', error)
    return []
  }

  return (categories as any[]).map(cat => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    wordlists: Array.isArray(cat.wordlists) ? cat.wordlists : []
  }))
}
