"use client"

import { useState, Fragment } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TrendingUp, TrendingDown, ChevronDown, ChevronRight, LayoutGrid, Calendar, Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { visibilityPerformanceAnalysis } from "@/data/mock/visibility-performance"
import { citationRateAnalysis } from "@/data/mock/citation-rate"
import { shareOfVoiceAnalysis } from "@/data/mock/share-of-voice"

const metrics = [
  {
    id: "visibility",
    label: "Visibility",
    value: "67%",
    trend: "+12%",
    up: true,
    content: {
      title: "Visibility Performance",
      description:
        "Your brand is appearing in 67% of relevant AI responses across major platforms. This represents a 12% increase from last month.",
      details: [
        { label: "ChatGPT", value: "72%" },
        { label: "Perplexity", value: "81%" },
        { label: "Google AI", value: "58%" },
        { label: "Claude", value: "63%" },
      ],
      insights: [
        "Peak visibility during business hours (9am-5pm EST)",
        "Strongest performance in B2B marketing queries",
        "Opportunity: Increase presence in pricing-related queries",
      ],
    },
  },
  {
    id: "usage",
    label: "Citation Rate",
    value: "1.2K",
    trend: "+8%",
    up: true,
    content: {
      title: "Citation Rate",
      description:
        "Your content has been cited 1,200 times this month across AI platforms, showing an 8% growth in engagement.",
      details: [
        { label: "Direct citations", value: "842" },
        { label: "Indirect mentions", value: "358" },
        { label: "Avg. per day", value: "40" },
        { label: "Peak day", value: "67" },
      ],
      insights: [
        "Blog posts generate 65% of all citations",
        "Case studies have highest citation quality",
        "Documentation pages show consistent usage",
      ],
    },
  },
  {
    id: "share-of-voice",
    label: "Share of voice",
    value: "23%",
    trend: "-3%",
    up: false,
    content: {
      title: "Share of Voice Analysis",
      description:
        "Your brand captures 23% of the conversation in your category. The 3% decrease is due to increased competitor activity.",
      details: [
        { label: "Your mentions", value: "1,243" },
        { label: "Category total", value: "5,404" },
        { label: "Top competitor", value: "28%" },
        { label: "Market avg.", value: "18%" },
      ],
      insights: [
        "Above market average but below category leader",
        "Competitors increased content output by 34%",
        "Opportunity: Focus on thought leadership content",
      ],
    },
  },
  {
    id: "geo-score",
    label: "GEO score",
    value: "78",
    trend: null,
    up: null,
    content: {
      title: "Generative Engine Optimization Score",
      description:
        "GEO measures how well your content is optimized for AI platforms.",
      intro: true,
    },
  },
]

const topics = [
  {
    id: 1,
    name: "Marketing automation tools",
    visibility: "72%",
    searchVolume: "45.2K",
    mentions: ["HubSpot", "Salesforce", "Marketo"],
    intent: "Transactional",
    similarity: 8.4,
    prompts: [
      {
        prompt: "What are the best marketing automation tools?",
        visibility: "78%",
        volume: "22.3K",
        mentions: ["HubSpot", "Marketo"],
        intent: "Transactional",
        similarity: 8.6,
      },
      {
        prompt: "How to choose marketing automation software?",
        visibility: "65%",
        volume: "15.1K",
        mentions: ["Salesforce", "HubSpot"],
        intent: "Informational",
        similarity: 8.2,
      },
      {
        prompt: "Marketing automation tools comparison",
        visibility: "71%",
        volume: "7.8K",
        mentions: ["Marketo", "Pardot"],
        intent: "Transactional",
        similarity: 8.4,
      },
    ],
  },
  {
    id: 2,
    name: "AI marketing platforms",
    visibility: "68%",
    searchVolume: "38.1K",
    mentions: ["OpenAI", "Google", "Adobe"],
    intent: "Informational",
    similarity: 7.9,
    prompts: [
      {
        prompt: "Best AI tools for marketing?",
        visibility: "70%",
        volume: "18.2K",
        mentions: ["OpenAI", "Jasper"],
        intent: "Transactional",
        similarity: 7.8,
      },
      {
        prompt: "How to use AI in marketing?",
        visibility: "66%",
        volume: "12.5K",
        mentions: ["Google", "Adobe"],
        intent: "Informational",
        similarity: 8.0,
      },
    ],
  },
  {
    id: 3,
    name: "Email automation software",
    visibility: "81%",
    searchVolume: "52.8K",
    mentions: ["Mailchimp", "SendGrid", "ActiveCampaign"],
    intent: "Transactional",
    similarity: 9.1,
    prompts: [
      {
        prompt: "Best email automation tools?",
        visibility: "84%",
        volume: "28.1K",
        mentions: ["Mailchimp", "Klaviyo"],
        intent: "Transactional",
        similarity: 9.2,
      },
      {
        prompt: "Email marketing automation guide",
        visibility: "78%",
        volume: "16.3K",
        mentions: ["SendGrid", "ActiveCampaign"],
        intent: "Informational",
        similarity: 8.9,
      },
    ],
  },
  {
    id: 4,
    name: "Marketing analytics tools",
    visibility: "64%",
    searchVolume: "31.5K",
    mentions: ["Google Analytics", "Mixpanel", "Amplitude"],
    intent: "Informational",
    similarity: 7.2,
    prompts: [
      {
        prompt: "Best marketing analytics platforms?",
        visibility: "68%",
        volume: "14.2K",
        mentions: ["Mixpanel", "Heap"],
        intent: "Transactional",
        similarity: 7.4,
      },
      {
        prompt: "How to track marketing performance?",
        visibility: "60%",
        volume: "11.8K",
        mentions: ["Google Analytics", "Amplitude"],
        intent: "Informational",
        similarity: 7.0,
      },
    ],
  },
]

const citations = [
  {
    domain: "Amplift",
    type: "own",
    category: "Industry preference",
    citationRate: "8.2%",
    mentionedBy: "ChatGPT, Perplexity",
    pages: [
      { url: "amplift.com/blog/marketing-automation-guide", citationRate: "12.3%" },
      { url: "amplift.com/blog/ai-tools-comparison", citationRate: "9.1%" },
      { url: "amplift.com/docs/getting-started", citationRate: "8.2%" },
    ],
  },
  {
    domain: "TechCrunch",
    type: "earned",
    category: "Industry preference",
    citationRate: "7.2%",
    mentionedBy: "ChatGPT, Perplexity",
    pages: [
      { url: "techcrunch.com/amplift-review-2024", citationRate: "8.5%" },
      { url: "techcrunch.com/marketing-tools-roundup", citationRate: "6.1%" },
    ],
  },
  {
    domain: "Medium",
    type: "earned",
    category: "Contributors",
    citationRate: "5.8%",
    mentionedBy: "Perplexity",
    pages: [
      { url: "medium.com/@amplift/automation-guide", citationRate: "7.2%" },
      { url: "medium.com/@marketing/amplift-case-study", citationRate: "4.8%" },
    ],
  },
  {
    domain: "G2",
    type: "earned",
    category: "Contributors",
    citationRate: "6.5%",
    mentionedBy: "ChatGPT",
    pages: [
      { url: "g2.com/products/amplift/reviews", citationRate: "7.8%" },
      { url: "g2.com/compare/amplift-vs-hubspot", citationRate: "5.2%" },
    ],
  },
  {
    domain: "LinkedIn",
    type: "social",
    category: "Contributors",
    citationRate: "3.2%",
    mentionedBy: "Perplexity",
    pages: [
      { url: "linkedin.com/company/amplift/posts", citationRate: "4.1%" },
      { url: "linkedin.com/pulse/amplift-marketing", citationRate: "2.3%" },
    ],
  },
  {
    domain: "Twitter/X",
    type: "social",
    category: "Contributors",
    citationRate: "2.8%",
    mentionedBy: "Perplexity",
    pages: [
      { url: "twitter.com/amplift/status/123456", citationRate: "3.2%" },
      { url: "twitter.com/amplift/status/789012", citationRate: "2.4%" },
    ],
  },
]

export default function AIPerformancePage() {
  const [activeTab, setActiveTab] = useState<"topics" | "citations">("topics")
  const [selectedMetric, setSelectedMetric] = useState(metrics[0])
  const [expandedTopics, setExpandedTopics] = useState<number[]>([])
  const [expandedDomains, setExpandedDomains] = useState<string[]>([])
  const [timeFilter, setTimeFilter] = useState<string>("week")
  const router = useRouter()

  const toggleTopicExpand = (topicId: number) => {
    setExpandedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const toggleDomainExpand = (domain: string) => {
    setExpandedDomains((prev) => (prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]))
  }

  // Export AI Performance Report as CSV
  const handleExport = () => {
    const csvRows = []
    
    // Header
    csvRows.push("AI Performance Report - Export")
    csvRows.push(`Generated: ${new Date().toLocaleDateString()}`)
    csvRows.push(`Time Filter: ${timeFilter === "all" ? "All Time" : timeFilter === "today" ? "Today" : timeFilter === "week" ? "1 Week" : "1 Month"}`)
    csvRows.push("")
    
    // Metrics Summary
    csvRows.push("METRICS SUMMARY")
    metrics.forEach(metric => {
      csvRows.push(`${metric.label},${metric.value},${metric.trend || "N/A"}`)
    })
    csvRows.push("")
    
    // Topics/Prompts
    csvRows.push("TOPICS/PROMPTS")
    csvRows.push("Topic/Prompt,Visibility,AI Volume,Mentions,Intent,Similarity")
    topics.forEach(topic => {
      csvRows.push(`"${topic.name}","${topic.visibility}","${topic.searchVolume}","${topic.mentions.join("; ")}","${topic.intent}","${topic.similarity}%"`)
      topic.prompts.forEach(prompt => {
        csvRows.push(`"  - ${prompt.prompt}","${prompt.visibility}","${prompt.volume}","${prompt.mentions.join("; ")}","${prompt.intent}","${prompt.similarity}%"`)
      })
    })
    csvRows.push("")
    
    // Citations
    csvRows.push("CITATIONS")
    csvRows.push("Domain,Type,Category,Citation Rate,Mentioned By")
    citations.forEach(citation => {
      csvRows.push(`"${citation.domain}","${citation.type}","${citation.category}","${citation.citationRate}","${citation.mentionedBy}"`)
      citation.pages.forEach(page => {
        csvRows.push(`"  - ${page.url}","","","${page.citationRate}",""`)
      })
    })
    
    // Create and download file
    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `ai-performance-report-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="ai-performance">
      <BreadcrumbHeader items={["Home", "Visibility", "AI performance", "Amplift"]} action={{ label: "Export", onClick: handleExport }} />

      <div className="flex-1 overflow-auto p-8">
        {/* AI Performance */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">AI performance</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  <Calendar className="w-3 h-3 mr-1.5" />
                  {timeFilter === "all" ? "All Time" : timeFilter === "today" ? "Today" : timeFilter === "week" ? "1 Week" : "1 Month"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTimeFilter("all")}>
                  All Time
                  {timeFilter === "all" && <Check className="ml-auto w-4 h-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeFilter("today")}>
                  Today
                  {timeFilter === "today" && <Check className="ml-auto w-4 h-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeFilter("week")}>
                  1 Week
                  {timeFilter === "week" && <Check className="ml-auto w-4 h-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeFilter("month")}>
                  1 Month
                  {timeFilter === "month" && <Check className="ml-auto w-4 h-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-[256px_1fr] gap-6">
            {/* Left: Vertical Metric Cards */}
            <div className="flex flex-col gap-3 h-full">
              {metrics.map((metric) => (
                <Card
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric)}
                  className={cn(
                    "p-4 cursor-pointer transition-all hover:shadow-md flex-1 flex items-center",
                    selectedMetric.id === metric.id ? "ring-2 ring-primary shadow-md" : "",
                  )}
                >
                  <div className="flex items-center justify-between gap-4 w-full">
                    <div className="text-sm text-muted-foreground min-w-[100px]">{metric.label}</div>
                    <div className="text-2xl font-bold">
                      {metric.value || <span className="text-base text-muted-foreground">To be tested</span>}
                    </div>
                    {metric.trend && (
                      <div
                        className={cn(
                          "flex items-center gap-1 text-xs font-medium min-w-[50px]",
                          metric.up ? "text-green-600" : "text-red-600",
                        )}
                      >
                        {metric.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {metric.trend}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Right: Dynamic Content Card - determines the row height */}
            <Card className="p-5 flex flex-col min-h-[360px]">
              <h3 className="heading-lg mb-2">{selectedMetric.content.title}</h3>
              {selectedMetric.id !== "visibility" && (
                <p className="body-muted mb-5 leading-relaxed">{selectedMetric.content.description}</p>
              )}

              {!selectedMetric.content.intro ? (
                selectedMetric.id === "visibility" ? (
                  <>
                    {/* Model Dimension Analysis Table */}
                    <div className="mb-4">
                      <h4 className="section-label mb-2">Model Dimension Analysis</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-muted/40 border-b">
                            <tr>
                              <th className="text-left px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase">Platform</th>
                              <th className="text-center px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase">My Brand</th>
                              <th className="text-center px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase">Competitor</th>
                              <th className="text-center px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase">Gap</th>
                              <th className="text-center px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {visibilityPerformanceAnalysis.modelComparison.map((row, idx) => {
                              const getStatusColor = (status: string) => {
                                if (status === "CRITICAL GAP" || status === "LAGGING") {
                                  return "bg-red-50 text-red-700 border-red-200"
                                }
                                if (status === "LEADING") {
                                  return "bg-green-50 text-green-700 border-green-200"
                                }
                                return "bg-muted/50 text-muted-foreground border-border"
                              }
                              return (
                                <tr key={idx} className={cn("border-b", idx % 2 === 0 ? "bg-background" : "bg-muted/20")}>
                                  <td className="px-2 py-1.5 text-xs font-medium">{row.platform}</td>
                                  <td className="px-2 py-1.5 text-center text-xs font-mono">{row.myBrandSOV}</td>
                                  <td className="px-2 py-1.5 text-center text-xs font-mono">{row.competitorSOV}</td>
                                  <td className="px-2 py-1.5 text-center text-xs font-mono">
                                    {parseFloat(row.gap) >= 0 ? (
                                      <span className="text-green-600">+{row.gap}</span>
                                    ) : (
                                      <span className="text-red-600">{row.gap}</span>
                                    )}
                                  </td>
                                  <td className="px-2 py-1.5 text-center">
                                    <Badge variant="outline" className={cn("text-xs px-1.5 py-0.5", getStatusColor(row.status))}>
                                      {row.status}
                                    </Badge>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Visibility Optimization Recommendations */}
                    <div className="pt-3 border-t mt-auto">
                      <h4 className="section-label mb-2">Optimization Opportunities</h4>
                      <ul className="space-y-1.5">
                        {visibilityPerformanceAnalysis.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : selectedMetric.id === "usage" ? (
                  <>
                    {/* Citation Table */}
                    <div className="mb-4">
                      <h4 className="section-label mb-2">Citation Sources</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-muted/40 border-b">
                            <tr>
                              <th className="text-left px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase">Type</th>
                              <th className="text-center px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase">Citation Rate</th>
                              <th className="text-left px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase">Top 3 Domain</th>
                            </tr>
                          </thead>
                          <tbody>
                            {citationRateAnalysis.citationTable.map((row, idx) => (
                              <tr key={idx} className={cn("border-b", idx % 2 === 0 ? "bg-background" : "bg-muted/20")}>
                                <td className="px-2 py-1.5">
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "text-xs capitalize",
                                      row.domainType.toLowerCase() === "own" 
                                        ? "bg-primary/10 text-primary border-primary/20" 
                                        : ""
                                    )}
                                  >
                                    {row.domainType}
                                  </Badge>
                                </td>
                                <td className="px-2 py-1.5 text-center text-xs">{row.citationCount}</td>
                                <td className="px-2 py-1.5">
                                  {row.top3Domains && row.top3Domains.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                      {row.top3Domains.map((domainItem, domainIdx) => (
                                        <span key={domainIdx} className="text-xs text-muted-foreground">
                                          {row.domainType.toLowerCase() === "own" && domainItem.pageUrl
                                            ? domainItem.pageUrl
                                            : domainItem.domain}
                                        </span>
                                      ))}
                                    </div>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">-</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="pt-3 border-t mt-auto">
                      <h4 className="section-label mb-2">Key Insights</h4>
                      <ul className="space-y-1.5">
                        <li className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          <span>
                            <span className="font-medium">Industry Preference:</span> {citationRateAnalysis.industryPreference.description}
                          </span>
                        </li>
                        <li className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          <span>
                            <span className="font-medium">Negative Mentions:</span> {citationRateAnalysis.negativeMentions.count} mentions found in {citationRateAnalysis.negativeMentions.sources.join(", ")}. {citationRateAnalysis.negativeMentions.description}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : selectedMetric.id === "share-of-voice" ? (
                  <>
                    {/* SOV Chart */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="section-label">Share of Voice</h4>
                        <span className="text-xs text-muted-foreground">Visibility-based: {shareOfVoiceAnalysis.visibilityBasedSOV}</span>
                      </div>
                      {/* Stacked Bar Chart */}
                      <div className="h-8 bg-muted rounded overflow-hidden flex border-0 shadow-none">
                        {shareOfVoiceAnalysis.chartData.map((item, idx) => {
                          const total = shareOfVoiceAnalysis.chartData.reduce((sum, d) => sum + d.value, 0)
                          const percentage = (item.value / total) * 100
                          const bgColor = idx === 0 
                            ? "rgb(59, 130, 246)" 
                            : idx === 1 
                            ? "rgb(96, 165, 250)" 
                            : "rgb(147, 197, 253)"
                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-center text-xs font-medium border-0 shadow-none"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: bgColor,
                                color: "rgb(255, 255, 255)",
                              }}
                            >
                              {percentage > 10 && `${item.value.toFixed(1)}%`}
                            </div>
                          )
                        })}
                      </div>
                      {/* Legend */}
                      <div className="flex items-center gap-4 mt-2 text-xs">
                        {shareOfVoiceAnalysis.chartData.map((item, idx) => {
                          const bgColor = idx === 0 
                            ? "rgb(59, 130, 246)" 
                            : idx === 1 
                            ? "rgb(96, 165, 250)" 
                            : "rgb(147, 197, 253)"
                          return (
                            <div key={idx} className="flex items-center gap-1.5">
                              <div
                                className="w-3 h-3 rounded"
                                style={{ backgroundColor: bgColor }}
                              />
                              <span className="text-muted-foreground">{item.brand}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="pt-3 border-t mt-auto">
                      <h4 className="section-label mb-2">Key Insights</h4>
                      <ul className="space-y-1.5">
                        {shareOfVoiceAnalysis.insights.map((insight, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{insight.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Platform Details */}
                    <div className="space-y-2.5 mb-5">
                      {selectedMetric.content.details?.map((detail, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="body-text-sm text-muted-foreground">{detail.label}:</span>
                          <span className="body-text-sm font-semibold font-mono">{detail.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Key Insights Section */}
                    <div className="pt-4 border-t mt-auto">
                      <h4 className="section-label mb-3">Key Insights</h4>
                      <ul className="space-y-2">
                        {selectedMetric.content.insights?.map((insight, index) => (
                          <li key={index} className="flex items-start gap-2 body-text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )
              ) : (
                <>
                  {/* GEO Scores Display - Three Scores */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {/* Overall GEO Score */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-semibold text-primary uppercase">GEO SCORE</h4>
                        <span className="text-xs text-muted-foreground">Overall</span>
                      </div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold">78</span>
                        <span className="text-xs text-muted-foreground">/100</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: "78%" }}
                        />
                      </div>
                    </div>

                    {/* Technical Readiness */}
                    <div>
                      <div className="mb-2">
                        <h4 className="text-xs font-semibold text-primary uppercase">TECHNICAL READINESS</h4>
                      </div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold">85</span>
                        <span className="text-xs text-muted-foreground">/100</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: "85%" }}
                        />
                      </div>
                    </div>

                    {/* Content Quality */}
                    <div>
                      <div className="mb-2">
                        <h4 className="text-xs font-semibold text-primary uppercase">CONTENT QUALITY</h4>
                      </div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold">72</span>
                        <span className="text-xs text-muted-foreground">/100</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: "72%" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Critical Issues */}
                  <div className="mt-auto">
                    <div 
                      className="flex items-center justify-between mb-3 cursor-pointer group"
                      onClick={() => router.push("/visibility/geo-report")}
                    >
                      <h4 className="text-sm font-semibold text-muted-foreground">Critical Issues</h4>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <div className="space-y-2">
                      {[
                        { id: 1, title: "Missing structured data markup", type: "technical" },
                        { id: 2, title: "Low content freshness score", type: "content" },
                        { id: 3, title: "Insufficient citation sources", type: "technical" },
                        { id: 4, title: "Content lacks E-E-A-T signals", type: "content" },
                        { id: 5, title: "Poor semantic HTML structure", type: "technical" },
                      ].slice(0, 3).map((issue) => (
                        <div
                          key={issue.id}
                          className="p-2 rounded border cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">{issue.title}</span>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs px-1.5 py-0",
                                issue.type === "technical"
                                  ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400"
                              )}
                            >
                              {issue.type === "technical" ? "Technical" : "Content"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6 border-b">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("topics")}
              className={cn(
                "px-4 py-2 text-base font-medium border-b-2 transition-colors",
                activeTab === "topics"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              Topics/Prompts
            </button>
            <button
              onClick={() => setActiveTab("citations")}
              className={cn(
                "px-4 py-2 text-base font-medium border-b-2 transition-colors",
                activeTab === "citations"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              Citations
            </button>
          </div>
          <Link
            href="/visibility/ai-performance/data"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-1"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            View all data
          </Link>
        </div>

        {activeTab === "topics" && (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/40 border-b">
                  <tr>
                    <th className="w-8 px-2"></th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Topic/Prompt
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Visibility
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      AI Volume
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Mentions
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Intent
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Similarity <span className="text-muted-foreground font-normal">[beta]</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topics.map((topic, index) => {
                    const isExpanded = expandedTopics.includes(topic.id)
                    return (
                      <Fragment key={topic.id}>
                        <tr
                          className={cn(
                            "border-b hover:bg-accent/50 transition-colors group",
                            index % 2 === 0 ? "bg-background" : "bg-muted/20",
                          )}
                        >
                          <td className="px-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleTopicExpand(topic.id)
                              }}
                              className="p-1 hover:bg-muted rounded transition-colors"
                            >
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              )}
                            </button>
                          </td>
                          <td
                            onClick={() => router.push(`/visibility/ai-performance/${topic.id}`)}
                            className="px-4 py-3 text-sm font-medium cursor-pointer hover:text-primary"
                          >
                            {topic.name}
                          </td>
                          <td className="px-4 py-3 text-xs">{topic.visibility}</td>
                          <td className="px-4 py-3 text-xs">{topic.searchVolume}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {topic.mentions.slice(0, 2).join(", ")}
                          </td>
                          <td className="px-4 py-3 text-sm">{topic.intent}</td>
                          <td className="px-4 py-3">
                            <Badge variant="secondary" className="font-mono text-xs">
                              {topic.similarity}%
                            </Badge>
                          </td>
                        </tr>
                        {/* Expanded prompts */}
                        {isExpanded &&
                          topic.prompts.map((prompt, pIndex) => (
                            <tr key={`${topic.id}-prompt-${pIndex}`} className="bg-muted/30 border-b">
                              <td className="px-2"></td>
                              <td className="px-4 py-2 text-sm text-muted-foreground pl-8">{prompt.prompt}</td>
                              <td className="px-4 py-2 text-sm text-muted-foreground">{prompt.visibility}</td>
                              <td className="px-4 py-2 text-sm text-muted-foreground">{prompt.volume}</td>
                              <td className="px-4 py-2 text-sm text-muted-foreground">{prompt.mentions.join(", ")}</td>
                              <td className="px-4 py-2 text-sm text-muted-foreground">{prompt.intent}</td>
                              <td className="px-4 py-2">
                                <Badge variant="outline" className="font-mono text-xs">
                                  {prompt.similarity}%
                                </Badge>
                              </td>
                            </tr>
                          ))}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Citations Tab */}
        {activeTab === "citations" && (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/40 border-b">
                  <tr>
                    {/* Expand column */}
                    <th className="w-8 px-2"></th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Domain
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Type
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Citation Rate
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Mentioned by
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {citations.map((citation, index) => {
                    const isExpanded = expandedDomains.includes(citation.domain)
                    const getTypeColor = (type: string) => {
                      switch (type) {
                        case "earned":
                          return "bg-green-100 text-green-700 border-green-200"
                        case "own":
                          return "bg-blue-100 text-blue-700 border-blue-200"
                        case "social":
                          return "bg-purple-100 text-purple-700 border-purple-200"
                        default:
                          return ""
                      }
                    }
                    return (
                      <Fragment key={citation.domain}>
                        <tr
                          className={cn(
                            "border-b hover:bg-accent/50 transition-colors",
                            index % 2 === 0 ? "bg-background" : "bg-muted/20",
                          )}
                        >
                          {/* Expand button */}
                          <td className="px-2">
                            <button
                              onClick={() => toggleDomainExpand(citation.domain)}
                              className="p-1 hover:bg-muted rounded transition-colors"
                            >
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              )}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">{citation.domain}</td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="outline"
                              className={cn("text-xs capitalize", getTypeColor(citation.type))}
                            >
                              {citation.type}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={citation.category === "Industry preference" ? "default" : "secondary"}
                              className={citation.category === "Industry preference" ? "bg-primary" : ""}
                            >
                              {citation.category}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-xs font-mono">{citation.citationRate}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{citation.mentionedBy}</td>
                        </tr>
                        {isExpanded &&
                          citation.pages.map((page, pIndex) => (
                            <tr key={`${citation.domain}-page-${pIndex}`} className="bg-muted/30 border-b">
                              <td className="px-2"></td>
                              <td className="px-4 py-2 text-sm text-primary pl-8">
                                <a href="#" className="hover:underline">
                                  {page.url}
                                </a>
                              </td>
                              <td className="px-4 py-2"></td>
                              <td className="px-4 py-2"></td>
                              <td className="px-4 py-2 text-xs font-mono text-muted-foreground">{page.citationRate}</td>
                              <td className="px-4 py-2"></td>
                            </tr>
                          ))}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
