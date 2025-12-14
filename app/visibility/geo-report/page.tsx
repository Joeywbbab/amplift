"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ExternalLink, AlertTriangle, AlertCircle, Info, Sparkles, X, Send, FileCode, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

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
  const [showAIChat, setShowAIChat] = useState(false)
  const [chatInput, setChatInput] = useState("")

  // Count issues by category
  const technicalIssues = issues.filter(i => i.category === "Technical")
  const contentIssues = issues.filter(i => i.category === "Content")

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

      {/* Amplift AI Sidebar */}
      {showAIChat && (
        <div className="fixed top-0 right-0 h-full w-[380px] bg-card border-l border-border shadow-xl z-50 flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Amplift AI</span>
            </div>
            <button 
              onClick={() => setShowAIChat(false)}
              className="p-1.5 rounded-md hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* AI Message */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="bg-muted/50 rounded-lg p-3 text-sm">
                  <p className="mb-3">I&apos;ve analyzed your GEO Report and found <strong>{issues.length} issues</strong> that need attention:</p>
                  
                  {/* Technical Issues */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileCode className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">Technical Issues ({technicalIssues.length})</span>
                    </div>
                    <div className="pl-6 space-y-1.5 text-muted-foreground">
                      {technicalIssues.map((issue) => (
                        <div key={issue.id} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <div>
                            <span className="text-foreground">{issue.issue}</span>
                            <span className="text-xs ml-1">({issue.url})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pl-6">
                      <p className="text-xs text-muted-foreground">
                        💡 I&apos;ve prepared optimization files for these issues. 
                        <a href="#" className="text-primary hover:underline ml-1">Download fixes →</a>
                      </p>
                    </div>
                  </div>

                  {/* Content Issues */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span className="font-medium">Content Issues ({contentIssues.length})</span>
                    </div>
                    <div className="pl-6 space-y-1.5 text-muted-foreground">
                      {contentIssues.map((issue) => (
                        <div key={issue.id} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <div>
                            <span className="text-foreground">{issue.issue}</span>
                            <span className="text-xs ml-1">({issue.url})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Card */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mt-3">
                    <p className="text-sm mb-2">
                      ✅ I&apos;ve sent the <strong>{contentIssues.length} content issues</strong> to the Writing section for further optimization.
                    </p>
                    <Link 
                      href="/content" 
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
                    >
                      Go to Content to view
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t shrink-0">
            <div className="flex items-center gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Amplift AI..."
                className="flex-1"
              />
              <Button size="icon" className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Amplift AI Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => setShowAIChat(!showAIChat)}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all flex items-center justify-center relative"
          title="Amplift AI"
        >
          <Sparkles className="w-6 h-6" />
          {issues.length > 0 && !showAIChat && (
            <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1.5 rounded-full bg-destructive text-destructive-foreground text-xs font-semibold flex items-center justify-center">
              {issues.length}
            </span>
          )}
        </button>
      </div>
    </DashboardLayout>
  )
}
