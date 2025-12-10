"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"

export function NucleiTemplates() {
  const template = `id: exposed-git-config
info:
  name: Exposed .git/config
  severity: medium
requests:
  - method: GET
    path:
      - "{{BaseURL}}/.git/config"
    matchers:
      - type: word
        words:
          - "[core]"`

  return (
    <Card>
    <CardHeader>
        <CardTitle>Custom Template Example</CardTitle>
        <CardDescription>YAML template for detecting exposed git config.</CardDescription>
    </CardHeader>
    <CardContent>
        <CodeBlock code={template} language="yaml" />
    </CardContent>
    </Card>
  )
}
