import { getTools } from "./actions"
import { ToolsList } from "./components/ToolsList"

export default async function ToolsPage() {
  const categories = await getTools()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tools & Notes</h1>
          <p className="text-muted-foreground">Manage your tool arsenal and integration settings.</p>
        </div>
      </div>

      <ToolsList categories={categories} />
    </div>
  )
}
