import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AIAnswer } from "@/lib/types"

interface AIAnswerSectionProps {
  aiAnswer: AIAnswer
  className?: string
  maxSimilaritySources?: number
  showVariance?: boolean
}

export function AIAnswerSection({ aiAnswer, className, maxSimilaritySources, showVariance = true }: AIAnswerSectionProps) {
  const similaritySources = maxSimilaritySources
    ? aiAnswer.similarity.sources.slice(0, maxSimilaritySources)
    : aiAnswer.similarity.sources

  return (
    <div className={cn(className)}>

      {/* Similarity Section */}
      <div className={showVariance ? "mb-4" : ""}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-green-500 rounded" />
          <h4 className="font-semibold text-sm">Similarity</h4>
        </div>
        <p className="body-muted text-sm mb-3">{aiAnswer.similarity.content}</p>
        <div className="space-y-1.5">
          {similaritySources.map((source, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/40 text-caption-muted"
              style={{
                borderWidth: "0px",
                borderColor: "rgba(0, 0, 0, 0)",
                borderStyle: "none",
                borderImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 1) 100%) 1",
                backgroundClip: "unset",
                WebkitBackgroundClip: "unset",
                color: "rgba(10, 10, 10, 1)",
                boxSizing: "content-box",
                boxShadow: "none",
              }}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <ExternalLink className="w-3 h-3 text-primary shrink-0" />
                <span className="truncate text-xs">{source.name || source.text}</span>
              </div>
              <Badge variant="secondary" className="text-caption-muted shrink-0 text-xs">
                {source.position}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {showVariance && (
        <>
          <div className="border-t my-4" />

          {/* Variance Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-amber-500 rounded" />
              <h4 className="font-semibold text-sm">Variance</h4>
            </div>
            <p className="body-muted text-sm mb-3">{aiAnswer.variance.content}</p>
            <div className="space-y-1.5">
              {aiAnswer.variance.sources.map((source, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 p-2 rounded-lg bg-red-50 dark:bg-red-950/20 text-caption-muted"
                  style={{
                    borderWidth: "0px",
                    borderColor: "rgba(0, 0, 0, 0)",
                    borderStyle: "none",
                    borderImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 1) 100%) 1",
                    backgroundClip: "unset",
                    WebkitBackgroundClip: "unset",
                    color: "rgba(10, 10, 10, 1)",
                    boxSizing: "content-box",
                    boxShadow: "none",
                  }}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                    <span className="truncate text-xs">{source.source || source.text}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-caption-muted shrink-0 text-xs border-red-200 text-red-600"
                  >
                    {source.position}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

