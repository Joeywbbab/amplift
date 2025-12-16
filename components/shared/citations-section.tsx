import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Citations } from "@/lib/types"

interface CitationsSectionProps {
  citations: Citations
  className?: string
}

export function CitationsSection({ citations, className }: CitationsSectionProps) {
  return (
    <Card className={cn("p-5", className)}>
      <h3 className="heading-lg mb-4">Top Citations</h3>

      {/* Industry Preferences */}
      <div className="mb-4">
        <h4 className="body-text-sm font-semibold mb-3">Industry Preferences</h4>
        <div className="space-y-2">
          {citations.aiPreferences.map((citation, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <ExternalLink className="w-3 h-3 text-primary shrink-0" />
                <span className="body-text-sm text-primary truncate">{citation.url}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {citation.engines && (
                  <span className="text-caption-muted text-xs">{citation.engines}</span>
                )}
                <Badge variant="secondary" className="font-mono text-xs">
                  {citation.citationRate}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contributors */}
      <div>
        <h4 className="body-text-sm font-semibold mb-3">Contributors</h4>
        <div className="space-y-2">
          {citations.contributors.map((citation, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                <span className="body-text-sm truncate">{citation.url}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {citation.type && (
                  <Badge variant="outline" className="text-caption-muted text-xs">
                    {citation.type}
                  </Badge>
                )}
                <Badge variant="secondary" className="font-mono text-xs">
                  {citation.citationRate}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}





