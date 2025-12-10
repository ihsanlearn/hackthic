"use client"

import { recon, scanning, fuzzing, exploitation, osint, proxy } from "./tools-data"
import { ToolCard } from "./ToolCard"

export function ToolsList() {
  return (
    <div className="space-y-6">
      <hr />
      <div>
        <h1 className="text-2xl font-bold mb-4">Reconnaissance</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recon.map((recon) => (
              <ToolCard key={recon.name} tool={recon} />
          ))}
        </div>
      </div>

      <hr />
      <div>
        <h1 className="text-2xl font-bold mb-4">Scanning</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scanning.map((scanning) => (
            <ToolCard key={scanning.name} tool={scanning} />
        ))}
        </div>
      </div>

      <hr />
      <div>
        <h1 className="text-2xl font-bold mb-4">Fuzzing</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {fuzzing.map((fuzzing) => (
            <ToolCard key={fuzzing.name} tool={fuzzing} />
        ))}
      </div>
      </div>

      <hr />
      <div>
        <h1 className="text-2xl font-bold mb-4">Exploitation</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exploitation.map((exploitation) => (
            <ToolCard key={exploitation.name} tool={exploitation} />
        ))}
        </div>
      </div>

      <hr />
      <div>
        <h1 className="text-2xl font-bold mb-4">OSINT</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {osint.map((osint) => (
            <ToolCard key={osint.name} tool={osint} />
        ))}
        </div>
      </div>

      <hr />
      <div>
        <h1 className="text-2xl font-bold mb-4">Proxy</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {proxy.map((proxy) => (
            <ToolCard key={proxy.name} tool={proxy} />
        ))}
        </div>
      </div>
    </div>
  )
}
