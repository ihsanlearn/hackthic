"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"

export function OneLiners() {
  const scripts = {
      subdomain: `subfinder -d target.com -all -silent | httpx -silent -sc -title -tech-detect`,
      urls: `waybackurls target.com | gau | sort -u | httpx -silent > urls.txt`,
      javascript: `subjs -i urls.txt | httpx -silent | nuclei -t nuclei-templates/http/exposures/ -silent`,
  }

  return (
    <div className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>Recon Chain</CardTitle>
                <CardDescription>Subdomain discovery to live host checking.</CardDescription>
            </CardHeader>
            <CardContent>
                <CodeBlock code={scripts.subdomain} />
            </CardContent>
        </Card>
            <Card>
            <CardHeader>
                <CardTitle>URL Gathering</CardTitle>
                <CardDescription>Collect all known URLs for a target.</CardDescription>
            </CardHeader>
            <CardContent>
                <CodeBlock code={scripts.urls} />
            </CardContent>
        </Card>
            <Card>
            <CardHeader>
                <CardTitle>JS Analysis</CardTitle>
                <CardDescription>Extract and scan JavaScript files.</CardDescription>
            </CardHeader>
            <CardContent>
                <CodeBlock code={scripts.javascript} />
            </CardContent>
        </Card>
    </div>
  )
}
