import { Sidebar } from "@/components/layout/sidebar"
import { TopNav } from "@/components/layout/top-nav"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col h-full overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-6xl mx-auto w-full flex flex-col gap-4 lg:gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
