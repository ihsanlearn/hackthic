import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Target, Shield, Bug, Search, FileText, Bot, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
           <p className="text-muted-foreground">Operational overview and quick actions.</p>
        </div>
      </div>
      
      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Targets</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vulns Found</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+1 pending triage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workflows</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Recent: Subdomain Enum</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Workflow efficiency</p>
          </CardContent>
        </Card>
      </div>

       {/* Quick Actions Row */}
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/recon" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all">
                <Search className="h-6 w-6 text-primary" />
                <span className="font-semibold">Start Recon</span>
            </Button>
          </Link>
          <Link href="/notes" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all">
                <FileText className="h-6 w-6 text-primary" />
                <span className="font-semibold">Open Notes</span>
            </Button>
          </Link>
          <Link href="/payloads" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-semibold">Payload Library</span>
            </Button>
          </Link>
          <Link href="/reporting" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all">
                <FileText className="h-6 w-6 text-primary" />
                <span className="font-semibold">Templates</span>
            </Button>
          </Link>
       </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your bug hunting activities over the last 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
               {/* Activity Feed */}
               <div className="flex items-center">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Starting Nmap scan on target-alpha</p>
                    <p className="text-sm text-muted-foreground">2 minutes ago</p>
                  </div>
               </div>
               <div className="flex items-center">
                   <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Found exposed .git directory</p>
                    <p className="text-sm text-muted-foreground">1 hour ago</p>
                  </div>
               </div>
               <div className="flex items-center">
                   <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Completed recon workflow #23</p>
                    <p className="text-sm text-muted-foreground">3 hours ago</p>
                  </div>
               </div>
                <div className="flex items-center">
                   <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Updated "XSS on Login" note</p>
                    <p className="text-sm text-muted-foreground">5 hours ago</p>
                  </div>
               </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pinned Tools</CardTitle>
            <CardDescription>
              Quick access to favorite tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 border rounded-md hover:bg-muted cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                    <Hammer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Burp Suite Pro</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-green-500 text-xs">●</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 border rounded-md hover:bg-muted cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Recon-ng</span>
                </div>
                 <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-xs">●</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 border rounded-md hover:bg-muted cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                    <Bot className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Nuclei</span>
                </div>
                 <div className="flex items-center gap-2">
                    <span className="text-green-500 text-xs">●</span>
                </div>
              </div>
            </div>
             <Button variant="ghost" size="sm" className="w-full mt-4 text-muted-foreground" asChild>
                <Link href="/tools">View All Tools</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
