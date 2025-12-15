import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SECTION_TOOLTIPS } from "@/lib/constants"

interface SectionHeaderProps {
  title: string
  tooltipKey?: keyof typeof SECTION_TOOLTIPS
  tooltipText?: string
}

export function SectionHeader({ title, tooltipKey, tooltipText }: SectionHeaderProps) {
  const tooltip = tooltipKey ? SECTION_TOOLTIPS[tooltipKey] : tooltipText

  return (
    <h3 className="section-label mb-3 px-1 flex items-center gap-2">
      {title}
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </h3>
  )
}




