import { DorkList } from "./components/DorkList"
import { getDorks, getDorkEngines } from "./actions"

export default async function DorksPage() {
  const dorksData = await getDorks()
  const engines = await getDorkEngines()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Intelligence Dorks</h1>
        <p className="text-muted-foreground">Advanced query capabilities across multiple intelligence platforms (Google, Shodan, GitHub, etc).</p>
      </div>

      <DorkList data={dorksData} engines={engines} />
    </div>
  )
}
