import { TableFilters, TableSort } from "@/lib/types"

/**
 * Filter data based on provided filters
 */
export function applyTableFilters<T extends Record<string, any>>(
  data: T[],
  filters: TableFilters
): T[] {
  return data.filter((item) => {
    if (filters.topic && item.topic !== filters.topic) return false
    if (filters.prompt && item.prompt !== filters.prompt) return false
    if (filters.intent && item.intent !== filters.intent) return false
    if (filters.type && item.type !== filters.type) return false
    if (filters.category && item.category !== filters.category) return false
    if (filters.status && item.status !== filters.status) return false
    return true
  })
}

/**
 * Sort data based on sort configuration
 */
export function applyTableSort<T extends Record<string, any>>(
  data: T[],
  sort: TableSort
): T[] {
  if (!sort.field) return data

  return [...data].sort((a, b) => {
    const aValue = a[sort.field!]
    const bValue = b[sort.field!]

    // Handle numeric values
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sort.direction === "asc" ? aValue - bValue : bValue - aValue
    }

    // Handle string values
    const aStr = String(aValue || "").toLowerCase()
    const bStr = String(bValue || "").toLowerCase()

    if (sort.direction === "asc") {
      return aStr.localeCompare(bStr)
    } else {
      return bStr.localeCompare(aStr)
    }
  })
}

/**
 * Get unique values from a data array for a specific field
 */
export function getUniqueValues<T extends Record<string, any>>(
  data: T[],
  field: keyof T
): string[] {
  return [...new Set(data.map((item) => String(item[field] || "")).filter(Boolean))]
}




