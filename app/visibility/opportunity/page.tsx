"use client"

import { useState, useMemo, useCallback, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Forward, X } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ForwardModal } from "@/components/forward-modal"
import { SectionHeader } from "@/components/shared/section-header"
import { OpportunityInsightCard } from "@/components/shared/opportunity-insight-card"
import { cn } from "@/lib/utils"
import { getOpportunityInsight } from "@/lib/utils/opportunity"
import { opportunityTableData } from "@/data/mock/opportunities"
import { opportunityAnalyses } from "@/data/mock/opportunity-details"
import type { Opportunity } from "@/lib/types"

function OpportunityPageContent() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>("All opportunities")
  const [competitorView, setCompetitorView] = useState<"all" | "competitor">("all")
  const [showForwardModal, setShowForwardModal] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)

  // Handle opportunity selection from URL query parameter
  useEffect(() => {
    const titleParam = searchParams.get("title")
    if (titleParam) {
      const decodedTitle = decodeURIComponent(titleParam)
      // Try to find opportunity by matching title keywords
      const opportunity = opportunityTableData.find(
        (item) => {
          const itemPrompt = item.prompt?.toLowerCase() || ""
          const itemUrl = item.citationUrl?.toLowerCase() || ""
          const searchTitle = decodedTitle.toLowerCase()
          
          // Check if title keywords match prompt or URL
          const titleWords = searchTitle.split(/\s+/).filter(w => w.length > 3)
          return titleWords.some(word => 
            itemPrompt.includes(word) || 
            itemUrl.includes(word) ||
            itemPrompt.includes(searchTitle) ||
            itemUrl.includes(searchTitle)
          )
        }
      )
      if (opportunity) {
        setSelectedOpportunity(opportunity)
        // Also set the appropriate category filter
        const categoryMap: Record<string, string> = {
          "creation": "Creation",
          "refresh": "Refresh",
          "community": "Community"
        }
        // Try to infer category from opportunity data
        if (opportunity.category) {
          setSelectedCategory(opportunity.category === "Refresh" ? "Refreshing" : opportunity.category)
        }
      }
    }
  }, [searchParams])

  const handleRowClick = useCallback((row: Opportunity) => {
    setSelectedOpportunity(row)
  }, [])

  const closeDetailPanel = useCallback(() => {
    setSelectedOpportunity(null)
  }, [])

  const handleForward = useCallback((rowId: number) => {
    setSelectedRowId(rowId)
    setShowForwardModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowForwardModal(false)
    setSelectedRowId(null)
  }, [])

  const filteredData = useMemo(
    () => {
      let data = opportunityTableData
      
      // Filter by competitor view
      if (competitorView === "competitor") {
        data = data.filter((item) => 
          item.subcategory === "losing: content gaps" ||
          item.subcategory === "losing: weak content" ||
          item.subcategory === "losing: discussions"
        )
      }
      
      if (selectedCategory === "All opportunities") {
        return data
      }
      // Map "Refreshing" to "Refresh" for filtering
      const categoryToFilter = selectedCategory === "Refreshing" ? "Refresh" : selectedCategory
      return data.filter((item) => item.category === categoryToFilter)
    },
    [selectedCategory, competitorView]
  )

  const isCommunityCategory = selectedCategory === "Community"
  const isRefreshCategory = selectedCategory === "Refreshing" || selectedCategory === "Refresh"
  const isAllOpportunities = selectedCategory === "All opportunities"

  // Calculate counts for each category
  const categoryCounts = useMemo(() => {
    return {
      "All opportunities": opportunityTableData.length,
      "Creation": opportunityTableData.filter(item => item.category === "Creation").length,
      "Refreshing": opportunityTableData.filter(item => item.category === "Refresh").length,
      "Community": opportunityTableData.filter(item => item.category === "Community").length,
    }
  }, [])

  const highVolumeData = useMemo(
    () =>
      filteredData.filter((item) => {
        const volumeNum = Number.parseFloat(item.volume?.replace("K", "") || "0")
        // Exclude zero-competition prompts from high volume section
        return volumeNum > 10 && item.subcategory !== "zero-competition prompts"
      }),
    [filteredData]
  )

  const mentionsData = useMemo(
    () =>
      filteredData.filter((item) => {
        const mentionsNum = Number.parseInt(item.mentions || "0")
        // Include zero-competition prompts in mentions section, or items with >= 5 mentions
        return item.subcategory === "zero-competition prompts" || mentionsNum >= 5
      }),
    [filteredData]
  )

  const geoCheckerData = useMemo(
    () => filteredData.filter((item) => item.source === "geo checker"),
    [filteredData]
  )

  const citationsData = useMemo(
    () => filteredData.filter((item) => item.source === "citations"),
    [filteredData]
  )

  // Combined data for "All opportunities" view - separate community and non-community
  const allOpportunitiesData = useMemo(
    () => {
      // Combine all data sources, removing duplicates by id
      const combined = [
        ...highVolumeData,
        ...mentionsData,
        ...geoCheckerData,
        ...citationsData,
      ]
      // Remove duplicates based on id
      const uniqueMap = new Map()
      combined.forEach(item => {
        if (!uniqueMap.has(item.id)) {
          uniqueMap.set(item.id, item)
        }
      })
      const allData = Array.from(uniqueMap.values())
      // Separate community and non-community data
      const nonCommunity = allData.filter(item => item.category !== "Community")
      const community = allData.filter(item => item.category === "Community")
      return { nonCommunity, community }
    },
    [highVolumeData, mentionsData, geoCheckerData, citationsData]
  )

  const renderTable = (data: typeof filteredData, showSource = false) => (
    <div>
      <div className="border-b border-border mb-4"></div>
      <div className="overflow-x-auto">
        <table className="w-full">
        <thead className="bg-muted/40 border-b">
          <tr>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {isCommunityCategory ? "Citation URL" : "Prompt"}
            </th>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</th>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {isCommunityCategory ? "Subreddit" : "Volume"}
            </th>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {isCommunityCategory ? "Citation Rate" : "Visibility"}
            </th>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">Mentions</th>
            {isCommunityCategory && (
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">Prompts</th>
            )}
            <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row)}
              className={cn(
                "border-b hover:bg-accent/30 transition-colors cursor-pointer",
                index % 2 === 0 ? "bg-background" : "bg-muted/20",
                selectedOpportunity?.id === row.id && "bg-primary/10 hover:bg-primary/15",
              )}
            >
              <td className="px-4 py-2.5 body-text-sm font-medium max-w-md">
                {isCommunityCategory ? (
                  <a
                    href={row.citationUrl?.startsWith('http') ? row.citationUrl : `https://${row.citationUrl}`}
                    className="text-primary hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {row.citationUrl}
                  </a>
                ) : (
                  row.prompt
                )}
              </td>
              <td className="px-4 py-2.5 text-caption-muted whitespace-nowrap">{row.subcategory}</td>
              <td className="px-4 py-2.5 text-caption-muted">
                {isCommunityCategory ? row.subreddit : row.volume}
              </td>
              <td className="px-4 py-2.5">
                <span className="font-mono body-text-sm text-left">{isCommunityCategory ? row.citationRate : row.visibility}</span>
              </td>
              <td className="px-4 py-2.5 body-text-sm">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="hover:text-primary hover:underline transition-colors">{row.mentions}</button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3" align="start">
                    <div className="space-y-2">
                      <p className="section-label">Mentioned Brands</p>
                      <div className="flex flex-wrap gap-2">
                        {row.brands.map((brand) => (
                          <div
                            key={brand}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent text-caption-muted font-medium"
                          >
                            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-caption-muted font-bold text-primary">
                              {brand.charAt(0)}
                            </div>
                            {brand}
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
              {isCommunityCategory && (
                <td className="px-4 py-2.5 body-text-sm">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button className="text-primary hover:underline transition-colors">
                        {row.promptCount} prompts
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 p-3" align="start">
                      <div className="space-y-2">
                        <p className="section-label">Related Prompts</p>
                        <ul className="space-y-1.5">
                          {row.prompts?.map((prompt, idx) => (
                            <li key={idx} className="text-caption-muted text-foreground px-2 py-1 rounded bg-accent/50">
                              {prompt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </td>
              )}
              <td className="px-4 py-2.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleForward(row.id)
                  }}
                  className="px-3 py-1.5 rounded-md body-text-sm flex items-center gap-1.5 whitespace-nowrap transition-colors bg-primary text-white hover:bg-primary/90"
                  title="Send to content"
                >
                  <span>Send to content</span>
                  <Forward className="w-4 h-4 shrink-0" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="opportunity">
      <BreadcrumbHeader items={["Home", "Visibility", "Opportunity", "Amplift"]} />

      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="heading-xl mb-5">Opportunity</h1>
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              {["All opportunities", "Creation", "Refreshing", "Community"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded body-text-sm font-medium transition-all cursor-pointer relative z-10",
                    selectedCategory === category
                      ? "bg-primary !text-white [&_span]:!text-white"
                      : "bg-card text-foreground hover:bg-accent border border-border",
                  )}
                >
                  {category}
                  {categoryCounts[category as keyof typeof categoryCounts] > 0 && (
                    <span className="ml-1.5 text-xs opacity-80">
                      ({categoryCounts[category as keyof typeof categoryCounts]})
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-muted/50 rounded-md p-0.5">
              <button
                onClick={() => setCompetitorView("all")}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-medium transition-all",
                  competitorView === "all"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                title="Show all"
              >
                All
              </button>
              <button
                onClick={() => setCompetitorView("competitor")}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-medium transition-all",
                  competitorView === "competitor"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                title="Show competitors"
              >
                Competitor
              </button>
            </div>
          </div>
        </div>

        {isAllOpportunities ? (
          <div className="space-y-8">
            {allOpportunitiesData.nonCommunity.length > 0 && (
              <div>
                <Card className="overflow-hidden bg-transparent border-0">{renderTable(allOpportunitiesData.nonCommunity)}</Card>
              </div>
            )}
            {allOpportunitiesData.community.length > 0 && (
              <div>
                <Card className="overflow-hidden bg-transparent border-0">{renderTable(allOpportunitiesData.community)}</Card>
              </div>
            )}
          </div>
        ) : selectedCategory === "Creation" ? (
          <div className="space-y-10">
            <div>
              <SectionHeader title="High Volume Prompts (> 10K)" tooltipKey="highVolume" />
              <Card className="overflow-hidden bg-transparent border-0">{renderTable(highVolumeData)}</Card>
            </div>
            <div>
              <SectionHeader title="Mentions" tooltipKey="mentions" />
              <Card className="overflow-hidden bg-transparent border-0">{renderTable(mentionsData)}</Card>
            </div>
          </div>
        ) : isRefreshCategory ? (
          <div className="space-y-6">
            <div>
              <SectionHeader title="GEO Checker" tooltipKey="geoChecker" />
              <Card className="overflow-hidden bg-transparent border-0">{renderTable(geoCheckerData)}</Card>
            </div>
            <div>
              <SectionHeader title="Citations" tooltipKey="citations" />
              <Card className="overflow-hidden bg-transparent border-0">{renderTable(citationsData)}</Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <SectionHeader title="Reddit GEO Citations" tooltipKey="redditGeo" />
              <Card className="overflow-hidden bg-transparent border-0">{renderTable(filteredData.filter(item => !item.subcategory?.includes("negative")))}</Card>
            </div>
            <div>
              <SectionHeader title="Negative Sentiment Tracking" tooltipKey="negativeSentiment" />
              <Card className="overflow-hidden bg-transparent border-0">{renderTable(filteredData.filter(item => item.subcategory?.includes("negative")))}</Card>
            </div>
          </div>
        )}
      </div>

      {/* Opportunity Detail Panel - Floating Overlay */}
      {selectedOpportunity && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeDetailPanel}
        >
          {/* Semi-transparent backdrop */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Detail Panel - 45% width, right side */}
          <div
            className="absolute right-0 top-0 h-full w-[45%] bg-card border-l shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Send and Close buttons */}
            <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
              <h2 className="heading-lg">Opportunity</h2>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => handleForward(selectedOpportunity.id)}
                >
                  <Forward className="w-4 h-4 mr-2" />
                  Send
                </Button>
                <button
                  onClick={closeDetailPanel}
                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Opportunity Insight Card */}
            <div className="p-6">
              <OpportunityInsightCard insight={getOpportunityInsight(selectedOpportunity)} className="mb-6" />

              {/* Opportunity Detail Section */}
              <h3 className="heading-lg mb-4 mt-6">Opportunity Detail</h3>

              <Card className="p-4 space-y-4 mb-6 border-0 shadow-none">
                {/* Main content */}
                <div>
                  <p className="section-label text-muted-foreground mb-1">
                    {selectedOpportunity.category === "Community" ? "Citation URL" : "Prompt"}
                  </p>
                  <p className="body-text-sm font-medium">
                    {selectedOpportunity.category === "Community"
                      ? selectedOpportunity.citationUrl
                      : selectedOpportunity.prompt}
                  </p>
                </div>

                {/* Grid of details - removed Category and Status */}
                {selectedOpportunity.category !== "Community" ? (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="section-label text-muted-foreground mb-1">Search Volume</p>
                      <p className="body-text-sm font-mono">{selectedOpportunity.volume}</p>
                    </div>
                    <div>
                      <p className="section-label text-muted-foreground mb-1">Visibility</p>
                      <p className="body-text-sm font-mono">{selectedOpportunity.visibility}</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="section-label text-muted-foreground mb-1">Subreddit</p>
                      <p className="body-text-sm">{selectedOpportunity.subreddit}</p>
                    </div>
                    <div>
                      <p className="section-label text-muted-foreground mb-1">Citation Rate</p>
                      <p className="body-text-sm font-mono">{selectedOpportunity.citationRate}</p>
                    </div>
                  </div>
                )}

                {/* Mentioned Brands */}
                <div className="pt-4 border-t">
                  <p className="section-label text-muted-foreground mb-2">Mentioned Brands ({selectedOpportunity.mentions})</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedOpportunity.brands.map((brand) => (
                      <div
                        key={brand}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent text-sm"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                          {brand.charAt(0)}
                        </div>
                        {brand}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Analysis Section */}
                {opportunityAnalyses[selectedOpportunity.id] && (
                  <div className="pt-4 border-t space-y-4">
                    {/* Analysis Count */}
                    <div>
                      <p className="section-label text-muted-foreground mb-2">AI Answer Analysis</p>
                      <p className="body-text-sm text-muted-foreground">
                        Analyzed {opportunityAnalyses[selectedOpportunity.id].analysisCount} AI responses across multiple engines.
                      </p>
                    </div>

                    {/* Visibility Gap Analysis */}
                    <div>
                      <p className="section-label text-muted-foreground mb-2">Visibility Gap</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border-0 shadow-none">
                          <span className="body-text-sm">My Brand Visibility</span>
                          <span className="body-text-sm font-mono text-muted-foreground">
                            {opportunityAnalyses[selectedOpportunity.id].myBrandVisibility}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border-0 shadow-none">
                          <span className="body-text-sm">Top Competitor Visibility</span>
                          <span className="body-text-sm font-mono text-primary">
                            {opportunityAnalyses[selectedOpportunity.id].topCompetitorVisibility}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <p className="body-text-sm text-muted-foreground">
                            Gap: {opportunityAnalyses[selectedOpportunity.id].visibilityGap}. Competitors are being cited but your brand is missing from AI responses.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Competitor Citations */}
                    <div>
                      <p className="section-label text-muted-foreground mb-2">
                        Competitor Citations in This Prompt
                      </p>
                      <div className="space-y-2">
                        {opportunityAnalyses[selectedOpportunity.id].competitorCitations.map((citation, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-muted/30 border-0 shadow-none">
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="body-text-sm font-medium">{citation.domain}</p>
                                  <Badge variant="outline" className="text-xs">{citation.brand}</Badge>
                                </div>
                                <p className="body-text-sm text-muted-foreground text-xs">
                                  {citation.pageUrl}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <p className="body-text-sm font-mono text-primary">
                                  {citation.citationRate}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {citation.engines}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Competitor Content Analysis */}
                    <div>
                      <p className="section-label text-muted-foreground mb-2">
                        What We Can Learn from Competitors
                      </p>
                      <div className="space-y-3">
                        {opportunityAnalyses[selectedOpportunity.id].competitorLearnings.map((learning, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-muted/20 border-0 shadow-none">
                            <div className="mb-2">
                              <p className="body-text-sm font-medium">{learning.domain}</p>
                              <p className="body-text-sm text-muted-foreground text-xs">
                                {learning.pageUrl}
                              </p>
                            </div>
                            <ul className="space-y-1.5 mt-2">
                              {learning.learnings.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-2 body-text-sm text-muted-foreground">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-2 pt-2 border-t border-border">
                              <p className="text-xs text-muted-foreground mb-1">Keywords:</p>
                              <div className="flex flex-wrap gap-1">
                                {learning.keywords.map((keyword, kwIdx) => (
                                  <Badge key={kwIdx} variant="outline" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Creation Recommendations */}
                    <div>
                      <p className="section-label text-muted-foreground mb-2">
                        Content Creation Recommendations
                      </p>
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
                        <div>
                          <p className="body-text-sm font-medium mb-2">Target Keywords:</p>
                          <div className="flex flex-wrap gap-2">
                            {opportunityAnalyses[selectedOpportunity.id].contentRecommendations.targetKeywords.map((keyword, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="body-text-sm font-medium mb-2">Competitor Keywords:</p>
                          <div className="flex flex-wrap gap-2">
                            {opportunityAnalyses[selectedOpportunity.id].contentRecommendations.competitorKeywords.map((keyword, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="body-text-sm font-medium mb-2">Recommended Content Strategy:</p>
                          <ul className="space-y-2 body-text-sm text-muted-foreground">
                            {opportunityAnalyses[selectedOpportunity.id].contentRecommendations.strategy.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Related prompts for Community */}
                {selectedOpportunity.category === "Community" && selectedOpportunity.prompts && (
                  <div className="pt-4 border-t">
                    <p className="section-label text-muted-foreground mb-2">Related Prompts</p>
                    <ul className="space-y-1.5">
                      {selectedOpportunity.prompts.map((prompt, idx) => (
                        <li key={idx} className="text-sm px-3 py-2 rounded bg-accent/50">
                          {prompt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>

            </div>
          </div>
        </div>
      )}

      {/* Forward Modal with AI Insights */}
      <ForwardModal
        isOpen={showForwardModal}
        onClose={closeModal}
        onSend={() => {
          closeModal()
        }}
        context={selectedRowId ? (() => {
          const opportunity = opportunityTableData.find(item => item.id === selectedRowId)
          return {
            type: "opportunity" as const,
            title: opportunity?.prompt || opportunity?.citationUrl,
            description: opportunity?.subcategory,
            prompt: opportunity?.prompt,
            category: opportunity?.category,
            subcategory: opportunity?.subcategory,
            volume: opportunity?.volume,
            visibility: opportunity?.visibility,
            mentions: opportunity?.mentions,
            brands: opportunity?.brands,
          }
        })() : undefined}
      />
    </DashboardLayout>
  )
}

export default function OpportunityPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <OpportunityPageContent />
    </Suspense>
  )
}
