import { PayloadLibrary } from "./components/PayloadLibrary"
import { getPayloads } from "./actions"

export default async function PayloadsPage() {
  const payloads = await getPayloads()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payload Library</h1>
        <p className="text-muted-foreground">Comprehensive collection of attack payloads and polyglots.</p>
      </div>

      <PayloadLibrary initialData={payloads} />
    </div>
  )
}
