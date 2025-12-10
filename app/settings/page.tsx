"use client"

import { AppearanceSettings } from "./components/AppearanceSettings"
import { DataSettings } from "./components/DataSettings"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage application preferences and data.</p>
      </div>

      <AppearanceSettings />
      <DataSettings />
    </div>
  )
}
