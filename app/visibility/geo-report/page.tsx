"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ExternalLink, AlertTriangle, AlertCircle, Info } from "lucide-react"

// Mock data for GEO Report
const geoScores = {
  aeoScore: 78,
  technicalReadiness: 85,
  contentQuality: 72,
}

const issues = [
  {
    id: 1,
    issue: "Missing meta description",
    category: "Technical",
    url: "/blog/marketing-automation-guide",
    details: "Page is missing a meta description tag",
    detected: "Dec 10, 2025",
    severity: "critical",
  },
  {
    id: 2,
    issue: "Slow page load time",
    category: "Technical",
    url: "/features/email-campaigns",
    details: "Page load time exceeds 3 seconds",
    detected: "Dec 10, 2025",
    severity: "critical",
  },
  {
    id: 3,
    issue: "Thin content",
    category: "Content",
    url: "/blog/marketing-automation-guide",
    details: "Content is below recommended word count (< 1000 words)",
    detected: "Dec 10, 2025",
    severity: "warning",
  },
  {
    id: 4,
    issue: "Missing H2 structure",
    category: "Content",
    url: "/blog/marketing-automation-guide",
    details: "Page lacks proper heading hierarchy",
    detected: "Dec 10, 2025",
    severity: "warning",
  },
  {
    id: 5,
    issue: "Image optimization needed",
    category: "Technical",
    url: "/about",
    details: "Images are not optimized for web (missing alt tags, large file sizes)",
    detected: "Dec 10, 2025",
    severity: "info",
  },
  {
    id: 6,
    issue: "Low keyword density",
    category: "Content",
    url: "/pricing",
    details: "Primary keywords appear less than 1% of content",
    detected: "Dec 9, 2025",
    severity: "warning",
  },
  {
    id: 7,
    issue: "Missing internal links",
    category: "Content",
    url: "/features/analytics",
    details: "Page has fewer than 3 internal links",
    detected: "Dec 9, 2025",
    severity: "info",
  },
]

export default function GeoReportPage() {
  const [filterCategory, setFilterCategory] = useState<"all" | "Technical" | "Content">("all")
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const filteredIssues = filterCategory === "all"
    ? issues
    : issues.filter(issue => issue.category === filterCategory)

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="w-4 h-4 text-foreground" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-foreground" />
      default:
        return <Info className="w-4 h-4 text-primary" />
    }
  }

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="overview">
      <BreadcrumbHeader
        items={["Home", "Visibility", "Overview", "GEO Report"]}
        action={{ label: "Export" }}
      />

      <div className="flex-1 overflow-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="heading-xl">GEO Report</h1>
            <p className="body-muted mt-1">Last audited: Dec 10, 2025</p>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* AEO Score */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="section-label text-muted-foreground">AEO Score</span>
              <span className="text-caption-muted">Overall</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold font-mono">{geoScores.aeoScore}</span>
              <span className="text-lg text-muted-foreground mb-1">/100</span>
            </div>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${geoScores.aeoScore}%` }}
              />
            </div>
          </Card>

          {/* Technical Readiness */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="section-label text-muted-foreground">Technical Readiness</span>
              <span className="text-caption-muted">3 issues</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold font-mono text-foreground">{geoScores.technicalReadiness}</span>
              <span className="text-lg text-muted-foreground mb-1">/100</span>
            </div>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${geoScores.technicalReadiness}%` }}
              />
            </div>
          </Card>

          {/* Content Quality */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="section-label text-muted-foreground">Content Quality</span>
              <span className="text-caption-muted">4 issues</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold font-mono text-foreground">{geoScores.contentQuality}</span>
              <span className="text-lg text-muted-foreground mb-1">/100</span>
            </div>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${geoScores.contentQuality}%` }}
              />
            </div>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex items-center justify-start mb-4">
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
            >
              <span className="body-text-sm">
                {filterCategory === "all" ? "All Categories" : filterCategory}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-card border rounded-lg shadow-lg z-10">
                <button
                  onClick={() => { setFilterCategory("all"); setShowFilterDropdown(false) }}
                  className={`w-full text-left px-4 py-2 body-text-sm hover:bg-muted transition-colors rounded-t-lg ${filterCategory === "all" ? "bg-muted" : ""}`}
                >
                  All
                </button>
                <button
                  onClick={() => { setFilterCategory("Technical"); setShowFilterDropdown(false) }}
                  className={`w-full text-left px-4 py-2 body-text-sm hover:bg-muted transition-colors ${filterCategory === "Technical" ? "bg-muted" : ""}`}
                >
                  Technical
                </button>
                <button
                  onClick={() => { setFilterCategory("Content"); setShowFilterDropdown(false) }}
                  className={`w-full text-left px-4 py-2 body-text-sm hover:bg-muted transition-colors rounded-b-lg ${filterCategory === "Content" ? "bg-muted" : ""}`}
                >
                  Content
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Issues Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/40 border-b">
                <tr>
                  <th className="text-left px-4 py-3 section-label-md">Critical Issue</th>
                  <th className="text-center px-4 py-3 section-label-md">Category</th>
                  <th className="text-left px-4 py-3 section-label-md">URL</th>
                  <th className="text-left px-4 py-3 section-label-md">Details</th>
                  <th className="text-center px-4 py-3 section-label-md">Detected</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues.map((issue, index) => (
                  <tr
                    key={issue.id}
                    className={`border-b hover:bg-accent/50 transition-colors ${
                      index % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(issue.severity)}
                        <span className="body-text-sm font-medium">{issue.issue}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded border bg-muted text-foreground border-border">
                        {issue.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={issue.url}
                        className="body-text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        {issue.url}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span className="body-text-sm text-muted-foreground">{issue.details}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-caption-muted">{issue.detected}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Summary footer */}
        <div className="mt-4 flex items-center justify-between text-caption-muted">
          <span>Showing {filteredIssues.length} of {issues.length} issues</span>
          <span>12 pages audited</span>
        </div>
      </div>
    </DashboardLayout>
  )
}
