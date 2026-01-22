
import { login } from '../auth/actions'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string, error: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-md p-8 space-y-4 rounded-xl border bg-card text-card-foreground shadow-sm">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="p-2 border rounded-md bg-background"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="p-2 border rounded-md bg-background"
              placeholder="••••••••"
            />
          </div>
          
          {searchParams?.error && (
             <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200 dark:bg-red-900/10 dark:border-red-900">
               {searchParams.error}
             </div>
          )}

          <button
            formAction={login}
            className="mt-2 p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
