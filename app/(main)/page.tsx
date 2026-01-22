"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Search, FileText, Bot, Globe, Server, Webhook, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getDashboardStats, DashboardStats } from "@/app/(main)/dashboard-actions"
import { HackerLoader } from "@/components/ui/hacker-loader"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
     return <div className="h-[50vh] flex items-center justify-center"><HackerLoader text="INITIALIZING_DASHBOARD" /></div>
  }

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
            <CardTitle className="text-sm font-medium">Total Targets</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.targetsCount || 0}</div>
            <p className="text-xs text-muted-foreground">Active scopes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.assetsCount || 0}</div>
            <p className="text-xs text-muted-foreground">Discovered Subdomains/URLs</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Value Signals</CardTitle>
            <Radio className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.highValueCount || 0}</div>
            <p className="text-xs text-muted-foreground">Requires Manual Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Surface</CardTitle>
            <Webhook className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.apiCount || 0}</div>
            <p className="text-xs text-muted-foreground">Discovered Endpoints</p>
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
          <Link href="/targets" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all">
                <Target className="h-6 w-6 text-primary" />
                <span className="font-semibold">Manage Targets</span>
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
        
        {/* Status Code Distribution Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Asset Status Overview</CardTitle>
            <CardDescription>
              Distribution of HTTP status codes across all targets.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {stats?.statusDistribution && stats.statusDistribution.length > 0 ? (
                <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.statusDistribution}>
                            <XAxis 
                                dataKey="status" 
                                stroke="#888888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                            />
                            <YAxis 
                                stroke="#888888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(value) => `${value}`} 
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a' }}
                                cursor={{fill: '#27272a', opacity: 0.4}}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {stats.statusDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="h-[240px] flex items-center justify-center text-muted-foreground border border-dashed rounded-lg">
                    No asset data available.
                </div>
            )}
          </CardContent>
        </Card>
        
        {/* Top Technologies List */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Technologies</CardTitle>
            <CardDescription>
              Most common tech stacks detected.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
               {stats?.topTechnologies && stats.topTechnologies.length > 0 ? (
                   stats.topTechnologies.map((tech, index) => (
                       <div key={tech.name} className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-muted-foreground w-4">{index + 1}</span>
                                <div className="flex items-center gap-2">
                                    <Server className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">{tech.name}</span>
                                </div>
                            </div>
                            <Badge variant="secondary">{tech.count}</Badge>
                       </div>
                   ))
               ) : (
                   <div className="text-sm text-muted-foreground p-4 text-center">
                       No technology data found.
                   </div>
               )}
            </div>
             <Button variant="ghost" size="sm" className="w-full mt-4 text-muted-foreground" asChild>
                <Link href="/targets">View All Assets</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
