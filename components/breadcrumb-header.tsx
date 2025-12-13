"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BreadcrumbHeaderProps {
  items: string[]
  action?: React.ReactNode | {
    label: string
    onClick?: () => void
  }
}

export function BreadcrumbHeader({ items, action }: BreadcrumbHeaderProps) {
  return (
    <div className="bg-transparent px-4 py-1 flex items-center justify-between border-b border-border breadcrumb-header">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={index === items.length - 1 ? "text-foreground font-medium" : ""}>{item}</span>
            {index < items.length - 1 && <ChevronRight className="w-3 h-3" />}
          </div>
        ))}
      </div>
      {action && (
        typeof action === 'object' && 'label' in action ? (
          <Button variant="outline" size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        ) : (
          action
        )
      )}
    </div>
  )
}
