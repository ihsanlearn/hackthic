"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Eye, Pencil } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { CodeBlock } from "@/components/ui/code-block"
import { cn } from "@/lib/utils"

// Import highlight.js styles (assuming global CSS handles basic token colors, or we rely on rehype-highlight default class structure which often needs a stylesheet)
// Since user didn't ask for a specific theme, we'll assume the environment has some highlighting support or it falls back to readable text.
// Actually, `rehype-highlight` adds classes like `hljs-keyword`. We should ensure we have a theme or minimal styles. 
// For now, relies on existing globals or implicit support, as I can't easily add a full CSS file without potentially disrupting.
// However, the CodeBlock component likely uses `prism` or similar? The user's prompt implies improving the markdown rendering specifically.

interface EditableTemplateProps {
  initialContent: string
  language?: string
}

export function EditableTemplate({ initialContent, language = "markdown" }: EditableTemplateProps) {
  const [content, setContent] = useState(initialContent)
  const [mode, setMode] = useState<"edit" | "preview">("edit")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between bg-muted/40 p-2 rounded-t-md border-b">
         <div className="flex gap-2">
            <Button 
                variant={mode === "edit" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setMode("edit")}
            >
                <Pencil className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button 
                variant={mode === "preview" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setMode("preview")}
            >
                <Eye className="h-4 w-4 mr-2" /> Preview
            </Button>
         </div>
         <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8">
            {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied" : "Copy Raw"}
         </Button>
      </div>

      <div className="border rounded-b-md min-h-[500px] bg-card relative overflow-hidden">
        {mode === "edit" ? (
            <Textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[500px] font-mono border-0 focus-visible:ring-0 resize-none p-4 bg-transparent text-sm leading-6"
                placeholder="Start writing your report..."
            />
        ) : (
             <div className="h-[500px] overflow-auto p-4">
                {language === "markdown" ? (
                    <div className={cn(
                        "prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap",
                        "prose-pre:bg-muted prose-pre:p-3 prose-pre:rounded-md",
                        "prose-code:font-mono prose-code:bg-muted/50 prose-code:px-1 prose-code:rounded-sm",
                        "prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg",
                        "prose-a:text-primary hover:prose-a:underline",
                        "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic"
                    )}>
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                ) : (
                     <CodeBlock code={content} language={language} />
                )}
            </div>
        )}
      </div>
    </div>
  )
}
