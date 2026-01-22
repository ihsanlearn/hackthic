import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Swords, BookOpen, Hammer, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTFPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Operator Dashboard</h1>
        <p className="text-muted-foreground">Manage your CTF operations, notes, and toolkits.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Operation</CardTitle>
            <Swords className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Idle</div>
            <p className="text-xs text-muted-foreground">No active CTF match</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Writeups</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Documented solutions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toolbox</CardTitle>
            <Hammer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Custom scripts ready</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Practice Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
         <Card className="col-span-4">
            <CardHeader>
               <CardTitle>Recent Writeups</CardTitle>
               <CardDescription>Your latest documented learnings.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                  No recent writeups.
               </div>
               <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">Create New Writeup</Button>
               </div>
            </CardContent>
         </Card>
         <Card className="col-span-3">
            <CardHeader>
               <CardTitle>Quick Actions</CardTitle>
               <CardDescription>Common toolkit tasks.</CardDescription>
            </CardHeader>
             <CardContent className="flex flex-col gap-2">
                <Button className="w-full justify-start" variant="secondary">
                   <Swords className="mr-2 h-4 w-4" /> Start New Match
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                   <Hammer className="mr-2 h-4 w-4" /> Open CyberChef
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                   <BookOpen className="mr-2 h-4 w-4" /> View Cheat Sheets
                </Button>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
