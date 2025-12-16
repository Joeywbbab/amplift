import { Card } from "@/components/ui/card"
import { ArrowRight, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import type { OpportunityInsight } from "@/lib/utils/opportunity"

interface OpportunityInsightCardProps {
  insight: OpportunityInsight
  className?: string
}

export function OpportunityInsightCard({ insight, className }: OpportunityInsightCardProps) {
  const InsightIcon = insight.icon

  return (
    <Card className={cn("p-5 border border-primary shadow-none", className)}>
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="heading-lg text-primary">{insight.title}</h3>
            <div className="p-2 rounded-xl bg-primary/10 text-primary flex-shrink-0">
              <InsightIcon className="w-4 h-4" />
            </div>
          </div>
          <p className="body-muted mb-4">{insight.description}</p>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sm font-medium">Recommended Action:</span>
                <p className="text-sm text-muted-foreground">{insight.action}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sm font-medium">Content Type:</span>
                <p className="text-sm text-muted-foreground">{insight.contentType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}





