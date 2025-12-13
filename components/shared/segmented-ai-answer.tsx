"use client"

import { useState, type JSX } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SegmentedAnswerParagraph } from "@/lib/types"

interface SegmentedAIAnswerProps {
  paragraphs: SegmentedAnswerParagraph[]
  className?: string
}

export function SegmentedAIAnswer({ paragraphs, className }: SegmentedAIAnswerProps) {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null)

  const getModelColor = (model: string) => {
    if (model === "Similarity") {
      return "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-300 dark:border-green-800"
    }
    // All models use blue color
    return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-800"
  }

  const getModelIcon = (model: string) => {
    if (model === "Similarity") {
      return "✓"
    }
    return model.charAt(0)
  }

  const getModelLabel = (paragraph: SegmentedAnswerParagraph) => {
    if (paragraph.model === "Similarity" && paragraph.models && paragraph.models.length > 0) {
      return paragraph.models.join(", ")
    }
    return paragraph.model
  }

  // Function to insert citation badges into text
  const renderTextWithCitations = (paragraph: SegmentedAnswerParagraph, paragraphIndex: number) => {
    const { content, citations } = paragraph
    const parts: (string | JSX.Element)[] = []
    let lastIndex = 0
    let matchIndex = 0

    // Find citation markers in text (e.g., [citation:1])
    const citationRegex = /\[citation:(\d+)\]/g
    let match

    while ((match = citationRegex.exec(content)) !== null) {
      // Add text before citation
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index))
      }

      // Add citation badge
      const citationId = match[1]
      const citation = citations.find((c) => c.id === citationId)
      const currentMatchIndex = matchIndex++

      if (citation) {
        const uniqueKey = `${paragraphIndex}-${paragraph.model}-${citationId}-${currentMatchIndex}`
        const isOpen = openPopoverId === uniqueKey
        const additionalCount = citations.length - 1

        parts.push(
          <Popover
            key={uniqueKey}
            open={isOpen}
            onOpenChange={(open) => setOpenPopoverId(open ? uniqueKey : null)}
          >
            <PopoverTrigger asChild>
              <Badge
                variant="outline"
                className={cn(
                  "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium cursor-pointer hover:bg-accent transition-colors ml-1",
                  "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                )}
              >
                {citation.domain}
                {additionalCount > 0 && (
                  <span className="text-[9px]">+{additionalCount}</span>
                )}
              </Badge>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="p-3 border-b">
                <div className="text-xs font-medium text-muted-foreground">Sources · {citations.length}</div>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {citations.map((cite, idx) => (
                  <a
                    key={idx}
                    href={cite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 hover:bg-accent/50 transition-colors border-b last:border-0"
                  >
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium shrink-0">
                      {cite.domain.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate mb-0.5">{cite.title}</div>
                      <div className="text-[10px] text-muted-foreground">{cite.domain}</div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0 mt-1" />
                  </a>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )
      }

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex))
    }

    // If no citations found, just return the content
    if (parts.length === 0) {
      return content
    }

    return parts
  }

  return (
    <Card className={cn("p-5", className)}>
      <h3 className="heading-lg mb-4">AI Answer Analysis</h3>

      <div className="space-y-6">
        {paragraphs.map((paragraph, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={cn("text-xs font-medium", getModelColor(paragraph.model))}>
                <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px] mr-1.5">
                  {getModelIcon(paragraph.model)}
                </span>
                {getModelLabel(paragraph)}
              </Badge>
            </div>
            <p className="body-muted text-sm leading-relaxed">
              {renderTextWithCitations(paragraph, index)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
