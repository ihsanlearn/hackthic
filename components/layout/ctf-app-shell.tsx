import { CTFSidebar } from "@/components/layout/ctf-sidebar"
import { CTFTopNav } from "@/components/layout/ctf-top-nav"
import { createClient } from "@/utils/supabase/server"

export async function CTFAppShell({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
      <CTFSidebar />
      <div className="flex flex-col h-full overflow-hidden">
        <CTFTopNav user={user} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-6xl mx-auto w-full flex flex-col gap-4 lg:gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
