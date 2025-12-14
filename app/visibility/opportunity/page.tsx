"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { Forward, X } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  FileText,
  Bookmark,
  Archive,
  Trash2,
  Menu,
  Users,
  MessageSquare,
  Quote,
  CheckCircle2,
  Loader2,
  ExternalLink,
  Bell,
  PenTool,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { OpportunityInsightCard } from "@/components/shared/opportunity-insight-card"
import { getOpportunityInsight } from "@/lib/utils/opportunity"
import { opportunityTableData } from "@/data/mock/opportunities"
import { opportunityAnalyses } from "@/data/mock/opportunity-details"
import type { Opportunity } from "@/lib/types"

// Source type for filtering
type SourceType = "prompt" | "citations" | "geo-checker" | "community"

// Extended opportunity with source type
interface OpportunityItem extends Omit<Opportunity, "status"> {
  sourceType: SourceType
}

// Transform opportunity data to include sourceType
const transformOpportunityData = (data: Opportunity[]): OpportunityItem[] => {
  return data.map(item => {
    let sourceType: SourceType = "prompt"

    if (item.category === "Community") {
      sourceType = "community"
    } else if (item.source === "geo checker" || item.subcategory === "insufficient content quality") {
      sourceType = "geo-checker"
    } else if (item.source === "citations" || item.subcategory === "declining citations" || item.subcategory === "losing: weak content") {
      sourceType = "citations"
    } else {
      sourceType = "prompt"
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { status, ...rest } = item
    return { ...rest, sourceType }
  })
}

const opportunityItems = transformOpportunityData(opportunityTableData)

// Saved posts from social tracker (same as overview page)
const savedPosts = [
  { 
    id: "saved-1", 
    title: "Vanguard calls Bitcoin a 'toy' while opening platform to crypto ETFs", 
    source: "TechCrunch", 
    time: "4h ago", 
    sources: 56,
    content: `Vanguard has made headlines by calling Bitcoin a 'toy' while simultaneously opening its platform to crypto ETFs. This contradictory move has sparked debate in the financial community.

The investment giant's CEO made the controversial statement during a recent earnings call, describing cryptocurrency as a speculative asset rather than a serious investment vehicle. However, just weeks later, the company announced it would begin offering crypto ETF products to its clients.

This apparent contradiction has left many investors confused about the firm's true stance on digital assets. Financial analysts are divided on whether this represents a strategic pivot or simply an acknowledgment of client demand.

Some see it as a pragmatic move to capture market share in the growing crypto investment space, while others view it as inconsistent messaging that could erode trust. The decision comes as major financial institutions increasingly embrace cryptocurrency products despite ongoing regulatory uncertainty.`
  },
  { 
    id: "saved-2", 
    title: "Tech sector cuts 120,000 jobs in AI-driven restructuring", 
    source: "Bloomberg", 
    time: "6h ago", 
    sources: 72,
    content: `The technology sector has announced massive layoffs affecting over 120,000 workers as companies restructure their operations around artificial intelligence capabilities.

Major tech giants including Meta, Google, and Amazon have cited the need to reallocate resources toward AI development as the primary driver behind these workforce reductions. The cuts span across various departments, from traditional software engineering to customer support roles.

Industry analysts suggest this represents a fundamental shift in how technology companies operate, with AI increasingly automating tasks that previously required human workers. However, critics argue that companies are using AI as a convenient excuse to cut costs while maintaining profit margins.

The layoffs have sparked concerns about the long-term employment prospects in the tech industry and raised questions about the societal impact of rapid AI adoption.`
  },
  { 
    id: "saved-3", 
    title: "Salesforce abandons AI agent pay-per-use pricing", 
    source: "The Verge", 
    time: "10h ago", 
    sources: 59,
    content: `Salesforce has reversed course on its controversial pay-per-use pricing model for AI agents, responding to significant pushback from enterprise customers.

The company had initially proposed charging customers based on the number of AI agent interactions, a model that many businesses found unpredictable and potentially expensive. Following weeks of criticism from major clients, Salesforce announced it would return to a more traditional subscription-based pricing structure.

This decision highlights the ongoing challenges companies face in monetizing AI products while maintaining customer satisfaction. The move is seen as a significant win for enterprise customers who had lobbied against the usage-based model.

Industry observers note that Salesforce's reversal may influence how other enterprise software companies approach AI pricing strategies in the future.`
  },
  { 
    id: "saved-4", 
    title: "OpenAI announces GPT-5 with enhanced reasoning capabilities", 
    source: "Reuters", 
    time: "12h ago", 
    sources: 84,
    content: `OpenAI has unveiled GPT-5, its most advanced language model to date, featuring significantly enhanced reasoning capabilities and improved performance across multiple benchmarks.

The new model demonstrates substantial improvements in mathematical reasoning, coding tasks, and complex problem-solving scenarios. OpenAI claims GPT-5 achieves human-level performance on several professional certification exams and surpasses previous models by a significant margin.

Key improvements include better handling of multi-step reasoning problems, reduced hallucination rates, and improved factual accuracy. The model also features enhanced safety measures designed to prevent misuse and harmful outputs.

Industry experts suggest GPT-5 represents a meaningful step toward more capable AI systems, though debates continue about the timeline for achieving artificial general intelligence.`
  },
  { 
    id: "saved-5", 
    title: "AI and chip industry ETFs surge as technology breakthroughs boost market sentiment", 
    source: "CNBC", 
    time: "14h ago", 
    sources: 45,
    content: `ETFs focused on artificial intelligence and semiconductor industries have experienced significant gains as recent technology breakthroughs boost investor sentiment.

The surge follows announcements from major AI companies about breakthrough developments in language models and chip architecture. NVIDIA-heavy ETFs led the gains, with some funds posting double-digit percentage increases over the past week.

Analysts attribute the rally to growing confidence that AI technology will continue driving economic growth across multiple sectors. The semiconductor industry, which provides the computational infrastructure for AI applications, has seen particularly strong interest from institutional investors.

However, some market observers caution that valuations may be stretched and advise investors to be mindful of potential volatility in the sector.`
  },
]

const opportunityFolders = [
  { id: "all", label: "All", icon: FileText, count: opportunityItems.length },
  { id: "prompt", label: "Prompts", icon: MessageSquare, count: opportunityItems.filter(i => i.sourceType === "prompt").length },
  { id: "citations", label: "Citations", icon: Quote, count: opportunityItems.filter(i => i.sourceType === "citations").length },
  { id: "geo-checker", label: "GEO Checker", icon: Search, count: opportunityItems.filter(i => i.sourceType === "geo-checker").length },
  { id: "community", label: "Community", icon: Users, count: opportunityItems.filter(i => i.sourceType === "community").length },
  { id: "saved", label: "Saved", icon: Bookmark, count: savedPosts.length },
  { id: "archived", label: "Archive", icon: Archive, count: 0 },
  { id: "trash", label: "Trash", icon: Trash2, count: 0 },
]

// Get source type label for display
const getSourceTypeLabel = (sourceType: SourceType) => {
  switch (sourceType) {
    case "prompt":
      return "Prompt"
    case "citations":
      return "Citations"
    case "geo-checker":
      return "GEO Checker"
    case "community":
      return "Community"
    default:
      return sourceType
  }
}

type SavedPost = typeof savedPosts[0]

function OpportunityPageContent() {
  const [selectedItem, setSelectedItem] = useState<OpportunityItem | null>(null)
  const [selectedSavedPost, setSelectedSavedPost] = useState<SavedPost | null>(null)
  const [selectedFolder, setSelectedFolder] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [sendStatus, setSendStatus] = useState<"loading" | "success">("loading")

  const filteredItems = useMemo(() => {
    return opportunityItems.filter((item) => {
      const matchesSearch = searchQuery === "" ||
        (item.prompt && item.prompt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.citationUrl && item.citationUrl.toLowerCase().includes(searchQuery.toLowerCase()))

      if (selectedFolder === "all") return matchesSearch
      if (selectedFolder === "prompt") return matchesSearch && item.sourceType === "prompt"
      if (selectedFolder === "citations") return matchesSearch && item.sourceType === "citations"
      if (selectedFolder === "geo-checker") return matchesSearch && item.sourceType === "geo-checker"
      if (selectedFolder === "community") return matchesSearch && item.sourceType === "community"

      return matchesSearch
    })
  }, [searchQuery, selectedFolder])

  // Default select first item
  useEffect(() => {
    if (selectedFolder === "saved") {
      // When saved folder is selected, auto-select first saved post
      if (savedPosts.length > 0 && !selectedSavedPost) {
        setSelectedSavedPost(savedPosts[0])
        setSelectedItem(null)
      }
    } else {
      // For other folders, auto-select first opportunity item
      if (filteredItems.length > 0 && !selectedItem) {
        setSelectedItem(filteredItems[0])
        setSelectedSavedPost(null)
      }
    }
  }, [filteredItems, selectedItem, selectedFolder, selectedSavedPost])

  const closeDetailPanel = () => {
    setSelectedItem(null)
  }

  const handleSend = () => {
    setSendStatus("loading")
    setShowSendModal(true)
    // Simulate loading then success
    setTimeout(() => {
      setSendStatus("success")
    }, 1500)
  }

  const analysis = selectedItem ? opportunityAnalyses[selectedItem.id] : null

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="opportunity">
      <BreadcrumbHeader items={["Home", "Visibility", "Opportunity", "Amplift"]} />

      <div className="flex h-full flex-col overflow-hidden">
        {/* Page Title */}
        <div className="px-6 pt-4 pb-2 shrink-0">
          <h1 className="heading-xl">Opportunity</h1>
        </div>

        {/* Top Header */}
        <div className="h-12 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a href="/visibility/opportunity/explore">
                Explore more
              </a>
            </Button>
            {(selectedItem || selectedSavedPost) && (
              <>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5 font-normal">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5 font-normal">
                  <Archive className="w-4 h-4" />
                  Archive
                </Button>
              </>
            )}
          </div>
          <div className="flex-1"></div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - GPT Style */}
          {!isSidebarCollapsed && (
            <div className="w-60 bg-muted/30 border-r border-border flex flex-col shrink-0 transition-all duration-300">
              <div className="flex-1 overflow-y-auto p-3">
                {/* Main Navigation Items */}
                <div className="space-y-0.5">
                  {opportunityFolders.slice(0, 5).map((folder) => {
                    const Icon = folder.icon
                    const isActive = selectedFolder === folder.id
                    return (
                      <button
                        key={folder.id}
                        onClick={() => setSelectedFolder(folder.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-foreground hover:bg-muted/50"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1 text-left">{folder.label}</span>
                        {folder.count > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {folder.count}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Manage Section */}
                <div className="mt-6">
                  <div className="px-3 mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Manage
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {opportunityFolders.slice(5).map((folder) => {
                      const Icon = folder.icon
                      const isActive = selectedFolder === folder.id
                      return (
                        <button
                          key={folder.id}
                          onClick={() => setSelectedFolder(folder.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                            isActive
                              ? "bg-muted text-foreground"
                              : "text-foreground hover:bg-muted/50"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="flex-1 text-left">{folder.label}</span>
                          {folder.count > 0 && (
                            <span className="text-xs text-muted-foreground">
                              {folder.count}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Tags Section */}
                <div className="mt-6">
                  <div className="px-3 mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Tags
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {[
                      { name: "competitor", color: "bg-red-500" },
                      { name: "content creation", color: "bg-purple-500" },
                      { name: "content refreshing", color: "bg-amber-500" },
                      { name: "social posts", color: "bg-blue-500" },
                    ].map((tag) => (
                      <button
                        key={tag.name}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <div className={cn("w-2 h-2 rounded-full", tag.color)} />
                        <span>{tag.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Split Panel: List and Detail */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Panel: Content List */}
              <div className={cn(
                "border-t border-r border-border overflow-y-auto transition-all scrollbar-hide",
                (selectedItem || selectedSavedPost) ? "w-[calc(50%-60px)]" : "flex-1"
              )}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-foreground">
                      {opportunityFolders.find(f => f.id === selectedFolder)?.label || "All"}
                    </h2>
                    <span className="text-xs text-muted-foreground">Updated on Dec 14</span>
                  </div>

                  <div className="space-y-1">
                    {selectedFolder === "saved" ? (
                      // Saved posts rendering
                      savedPosts.map((post) => (
                        <div
                          key={post.id}
                          onClick={() => {
                            setSelectedSavedPost(post)
                            setSelectedItem(null)
                          }}
                          className={cn(
                            "p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted",
                            selectedSavedPost?.id === post.id && "bg-muted border border-border"
                          )}
                        >
                          <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{post.source}</span>
                            <span>·</span>
                            <span>{post.time}</span>
                            <span>·</span>
                            <span>{post.sources} sources</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Regular opportunity items rendering
                      filteredItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedItem(item)
                            setSelectedSavedPost(null)
                          }}
                          className={cn(
                            "p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted",
                            selectedItem?.id === item.id && "bg-muted border border-border"
                          )}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
                              {getSourceTypeLabel(item.sourceType)}
                            </Badge>
                          </div>
                          <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
                            {item.prompt || item.citationUrl}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                            {item.subcategory}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            {item.volume && (
                              <span>{item.volume.toLowerCase()} vol</span>
                            )}
                            {item.visibility && (
                              <span>{item.visibility} visibility</span>
                            )}
                            {item.citationRate && (
                              <span>{item.citationRate} citation rate</span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Panel: Opportunity Detail */}
              {selectedItem && selectedFolder !== "saved" && (
                <div className="w-[calc(50%+60px)] border-t overflow-y-auto bg-card scrollbar-hide">
                  {/* Header with Action and Send buttons */}
                  <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Opportunity</h2>
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={handleSend}>
                        Send
                      </Button>
                    </div>
                  </div>

                  {/* Opportunity Insight Card */}
                  <div className="p-6">
                    <OpportunityInsightCard insight={getOpportunityInsight(selectedItem as unknown as Opportunity)} className="mb-6" />

                    {/* Opportunity Detail Section */}
                    <h3 className="text-lg font-semibold mb-4 mt-6">Opportunity Detail</h3>

                    <Card className="p-4 space-y-4 mb-6 border-0 shadow-none bg-muted/20">
                      {/* Main content */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          {selectedItem.category === "Community" ? "Citation URL" : "Prompt"}
                        </p>
                        <p className="text-sm font-medium">
                          {selectedItem.category === "Community"
                            ? selectedItem.citationUrl
                            : selectedItem.prompt}
                        </p>
                      </div>

                      {/* Grid of details */}
                      {selectedItem.category !== "Community" ? (
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Search Volume</p>
                            <p className="text-sm font-mono">{selectedItem.volume}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Visibility</p>
                            <p className="text-sm font-mono">{selectedItem.visibility}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Subreddit</p>
                            <p className="text-sm">{selectedItem.subreddit}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Citation Rate</p>
                            <p className="text-sm font-mono">{selectedItem.citationRate}</p>
                          </div>
                        </div>
                      )}

                      {/* Mentioned Brands */}
                      <div className="pt-4 border-t">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Mentioned Brands ({selectedItem.mentions})</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.brands.map((brand) => (
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
                      {analysis && (
                        <div className="pt-4 border-t space-y-4">
                          {/* Analysis Count */}
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">AI Answer Analysis</p>
                            <p className="text-sm text-muted-foreground">
                              Analyzed {analysis.analysisCount} AI responses across multiple engines.
                            </p>
                          </div>

                          {/* Visibility Gap Analysis */}
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Visibility Gap</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <span className="text-sm">My Brand Visibility</span>
                                <span className="text-sm font-mono text-muted-foreground">
                                  {analysis.myBrandVisibility}
                                </span>
                              </div>
                              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <span className="text-sm">Top Competitor Visibility</span>
                                <span className="text-sm font-mono text-primary">
                                  {analysis.topCompetitorVisibility}
                                </span>
                              </div>
                              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                                <p className="text-sm text-muted-foreground">
                                  Gap: {analysis.visibilityGap}. Competitors are being cited but your brand is missing from AI responses.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Competitor Citations */}
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                              Competitor Citations in This Prompt
                            </p>
                            <div className="space-y-2">
                              {analysis.competitorCitations.map((citation, idx) => (
                                <div key={idx} className="p-3 rounded-lg bg-muted/50">
                                  <div className="flex items-start justify-between mb-1">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <p className="text-sm font-medium">{citation.domain}</p>
                                        <Badge variant="outline" className="text-xs">{citation.brand}</Badge>
                                      </div>
                                      <p className="text-xs text-muted-foreground">
                                        {citation.pageUrl}
                                      </p>
                                    </div>
                                    <div className="text-right ml-4">
                                      <p className="text-sm font-mono text-primary">
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
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                              What We Can Learn from Competitors
                            </p>
                            <div className="space-y-3">
                              {analysis.competitorLearnings.map((learning, idx) => (
                                <div key={idx} className="p-3 rounded-lg bg-muted/30">
                                  <div className="mb-2">
                                    <p className="text-sm font-medium">{learning.domain}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {learning.pageUrl}
                                    </p>
                                  </div>
                                  <ul className="space-y-1.5 mt-2">
                                    {learning.learnings.map((item, itemIdx) => (
                                      <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
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
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                              Content Creation Recommendations
                            </p>
                            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
                              <div>
                                <p className="text-sm font-medium mb-2">Target Keywords:</p>
                                <div className="flex flex-wrap gap-2">
                                  {analysis.contentRecommendations.targetKeywords.map((keyword, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">Competitor Keywords:</p>
                                <div className="flex flex-wrap gap-2">
                                  {analysis.contentRecommendations.competitorKeywords.map((keyword, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">Recommended Content Strategy:</p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {analysis.contentRecommendations.strategy.map((item, idx) => (
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
                      {selectedItem.category === "Community" && selectedItem.prompts && (
                        <div className="pt-4 border-t">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Related Prompts</p>
                          <ul className="space-y-1.5">
                            {selectedItem.prompts.map((prompt, idx) => (
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
              )}

              {/* Right Panel: Saved Post Detail */}
              {selectedSavedPost && (
                <div className="w-[calc(50%+60px)] border-t overflow-y-auto bg-card scrollbar-hide">
                  {/* Header */}
                  <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Post Detail</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bookmark className="w-4 h-4 fill-current text-primary" />
                      </Button>
                      <Button size="sm">
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h1 className="text-2xl font-serif font-bold mb-4 leading-tight text-foreground">
                      {selectedSavedPost.title}
                    </h1>

                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6 pb-6 border-b">
                      <span>{selectedSavedPost.source}</span>
                      <span>·</span>
                      <span>{selectedSavedPost.time}</span>
                      <span>·</span>
                      <span>{selectedSavedPost.sources} sources</span>
                    </div>

                    {/* Article Body */}
                    <div className="prose prose-sm max-w-none">
                      <div className="text-base leading-relaxed text-foreground whitespace-pre-line">
                        {selectedSavedPost.content}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Send Modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSendModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-card border border-border rounded-xl w-[400px] p-6 shadow-2xl">
            {sendStatus === "loading" ? (
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Sending...</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we process your request
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Sent Successfully!</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <PenTool className="w-4 h-4" />
                  <span>Writing agent is creating content...</span>
                </div>
                
                <div className="w-full space-y-3">
                  <Link href="/content" className="block">
                    <Button className="w-full" onClick={() => setShowSendModal(false)}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Go to Content to view
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowSendModal(false)}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Wait for notification
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default function OpportunityPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OpportunityPageContent />
    </Suspense>
  )
}
