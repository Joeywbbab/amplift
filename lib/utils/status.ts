import { OpportunityStatus } from "@/lib/types"
import { STATUS_COLORS } from "@/lib/constants"

/**
 * Get badge variant for opportunity status
 */
export function getStatusVariant(status: OpportunityStatus): "default" | "secondary" | "outline" {
  switch (status) {
    case "New":
      return "default"
    case "In Progress":
      return "secondary"
    case "Finish":
      return "outline"
    default:
      return "outline"
  }
}

/**
 * Get badge className for opportunity status
 */
export function getStatusBadgeClassName(status: OpportunityStatus): string {
  return STATUS_COLORS[status] || ""
}





