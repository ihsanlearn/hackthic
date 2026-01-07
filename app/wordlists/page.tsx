import { getWordlists } from "./actions"
import { WordlistList } from "./components/WordlistList"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wordlists | Tool Center",
  description: "Library of security wordlists for fuzzing and discovery.",
}

export default async function WordlistsPage() {
  const categories = await getWordlists()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wordlists Library</h1>
          <p className="text-muted-foreground">Curated collection of SecLists and common dictionaries.</p>
        </div>
      </div>

      <WordlistList categories={categories} />
    </div>
  )
}
