"use server"

import { createClient } from "@/utils/supabase/server"
import { ToolCategory } from "./types"

export async function getTools(): Promise<ToolCategory[]> {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from('tool_categories')
    .select(`
      id,
      name,
      tools (
        id,
        name,
        description,
        status,
        version,
        command,
        category_id,
        created_at
      )
    `)

  if (error) {
    console.error('Error fetching tools:', error)
    return []
  }

  // The 'tools' property will be an array of Tool objects.
  // We need to ensure the type assertion is correct.
  return (categories as any[]).map(cat => ({
    id: cat.id,
    name: cat.name,
    tools: Array.isArray(cat.tools) ? cat.tools : []
  }))
}

export async function createTool(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const command = formData.get("command") as string
  const category_id = formData.get("category_id") as string
  const status = formData.get("status") as string
  const version = formData.get("version") as string

  if (!name || !category_id) {
     return { error: "Name and Category are required" }
  }

  const { error } = await supabase
    .from('tools')
    .insert({
      name,
      description,
      command,
      category_id,
      status,
      version
    })

  if (error) {
    console.error("Error creating tool:", error)
    return { error: error.message }
  }

  // Use revalidatePath to refresh the data
  const { revalidatePath } = await import("next/cache")
  revalidatePath('/tools')
  
  return { success: true }
}
