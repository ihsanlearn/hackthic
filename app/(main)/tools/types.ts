export interface Tool {
  id: string
  name: string
  description: string | null
  status: string | null
  version: string | null
  command: string | null
  category_id: string
  created_at: string
}

export interface ToolCategory {
  id: string
  name: string
  tools: Tool[]
}
