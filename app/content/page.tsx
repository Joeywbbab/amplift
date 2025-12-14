"use client"

import { useState } from "react"
import { Forward, X } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  FileText,
  Bookmark,
  Archive,
  Trash2,
  MoreHorizontal,
  Sparkles,
  Menu,
  RefreshCw,
  Users,
  Send,
  CheckCircle2,
  Scissors,
  Palette,
  Type,
  Image,
  Wand2,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { OpportunityInsightCard } from "@/components/shared/opportunity-insight-card"
import { getOpportunityInsight } from "@/lib/utils/opportunity"
import type { Opportunity } from "@/lib/types"

// Content source type for filtering
type ContentSourceType = "prompt" | "citations" | "geo-checker" | "community"

// Extended content item with source type
interface ContentItem extends Omit<Opportunity, "status"> {
  sourceType: ContentSourceType
}

// Use the same data structure as opportunity
const contentItems: ContentItem[] = [
  // Prompt category
  {
    id: 1,
    prompt: "What are the best marketing automation tools for small businesses?",
    category: "Creation",
    subcategory: "popular prompt gaps",
    sourceType: "prompt",
    volume: "12.5K",
    visibility: "12%",
    mentions: "4",
    brands: ["HubSpot", "Mailchimp", "ActiveCampaign", "Marketo"],
  },
  {
    id: 2,
    prompt: "How to improve AI visibility for B2B SaaS products?",
    category: "Creation",
    subcategory: "zero-competition prompts",
    sourceType: "prompt",
    volume: "8.2K",
    visibility: "45%",
    mentions: "3",
    brands: ["Drift", "Intercom", "Zendesk"],
  },
  {
    id: 3,
    prompt: "Best practices for content marketing automation",
    category: "Creation",
    subcategory: "losing: content gaps",
    sourceType: "prompt",
    volume: "7.4K",
    visibility: "0%",
    mentions: "6",
    brands: ["CoSchedule", "HubSpot", "Buffer", "Hootsuite", "Sprout Social", "Later"],
  },
  {
    id: 4,
    prompt: "How to integrate marketing automation with sales tools",
    category: "Creation",
    subcategory: "zero-competition prompts",
    sourceType: "prompt",
    volume: "15.3K",
    visibility: "18%",
    mentions: "2",
    brands: ["Zapier", "HubSpot"],
  },
  // GEO Checker category
  {
    id: 5,
    prompt: "Marketing automation vs CRM differences",
    category: "Refresh",
    subcategory: "insufficient content quality",
    sourceType: "geo-checker",
    volume: "9.7K",
    visibility: "15%",
    mentions: "6",
    brands: ["Salesforce", "HubSpot", "Zoho", "Pipedrive", "Monday.com", "Copper"],
  },
  // Citations category
  {
    id: 6,
    prompt: "What is the ROI of marketing automation software?",
    category: "Refresh",
    subcategory: "losing: weak content",
    sourceType: "citations",
    volume: "6.8K",
    visibility: "8%",
    mentions: "7",
    brands: ["HubSpot", "Pardot", "Marketo", "ActiveCampaign", "Eloqua", "Mailchimp", "Salesforce"],
  },
  {
    id: 7,
    prompt: "Email deliverability best practices for automation",
    category: "Refresh",
    subcategory: "declining citations",
    sourceType: "citations",
    volume: "4.3K",
    visibility: "32%",
    mentions: "5",
    brands: ["SendGrid", "Mailchimp", "Postmark", "SparkPost", "Amazon SES"],
  },
  // Community category
  {
    id: 8,
    citationUrl: "reddit.com/r/marketing/comments/abc123",
    category: "Community",
    subcategory: "high cited threads",
    sourceType: "community",
    subreddit: "r/marketing",
    citationRate: "12%",
    mentions: "15",
    brands: ["HubSpot", "Mailchimp", "ActiveCampaign", "Marketo", "Pardot"],
    prompts: ["Best marketing automation tools", "Email marketing automation", "Marketing automation for startups"],
    promptCount: 3,
  },
  {
    id: 9,
    citationUrl: "reddit.com/r/smallbusiness/comments/def456",
    category: "Community",
    subcategory: "negative mentions",
    sourceType: "community",
    subreddit: "r/smallbusiness",
    citationRate: "8%",
    mentions: "7",
    brands: ["Mailchimp", "Constant Contact", "AWeber"],
    prompts: ["Affordable email marketing", "Small business marketing tools"],
    promptCount: 2,
  },
]

// Mock analysis data (same structure as opportunity-details.ts)
const contentAnalyses: Record<number, {
  analysisCount: number
  myBrandVisibility: string
  topCompetitorVisibility: string
  visibilityGap: string
  competitorCitations: Array<{
    domain: string
    pageUrl: string
    citationRate: string
    engines: string
    brand: string
  }>
  competitorLearnings: Array<{
    domain: string
    pageUrl: string
    learnings: string[]
    keywords: string[]
  }>
  contentRecommendations: {
    targetKeywords: string[]
    competitorKeywords: string[]
    strategy: string[]
  }
}> = {
  1: {
    analysisCount: 12,
    myBrandVisibility: "0%",
    topCompetitorVisibility: "15.2%",
    visibilityGap: "15.2%",
    competitorCitations: [
      { domain: "hubspot.com", pageUrl: "hubspot.com/marketing-automation-guide", citationRate: "15.2%", engines: "ChatGPT, Perplexity", brand: "HubSpot" },
      { domain: "mailchimp.com", pageUrl: "mailchimp.com/resources/automation", citationRate: "11.8%", engines: "ChatGPT, Perplexity", brand: "Mailchimp" },
      { domain: "activecampaign.com", pageUrl: "activecampaign.com/features/automation", citationRate: "9.3%", engines: "Perplexity", brand: "ActiveCampaign" },
    ],
    competitorLearnings: [
      {
        domain: "hubspot.com",
        pageUrl: "hubspot.com/marketing-automation-guide",
        learnings: [
          "Comprehensive feature comparison tables with clear pros/cons",
          "Real customer case studies with specific ROI metrics",
          "Step-by-step implementation guides with screenshots",
          "Integration ecosystem documentation covering 1000+ tools",
        ],
        keywords: ["marketing automation", "workflow", "lead nurturing", "email campaigns", "CRM integration"],
      },
      {
        domain: "mailchimp.com",
        pageUrl: "mailchimp.com/resources/automation",
        learnings: [
          "Beginner-friendly language with visual workflow builders",
          "Pricing transparency with clear tier comparisons",
          "Template library with pre-built automation sequences",
          "Mobile app functionality for on-the-go management",
        ],
        keywords: ["email marketing", "automation templates", "audience segmentation", "A/B testing", "analytics"],
      },
      {
        domain: "activecampaign.com",
        pageUrl: "activecampaign.com/features/automation",
        learnings: [
          "Advanced conditional logic and branching workflows",
          "Behavioral tracking and trigger-based automation",
          "Multi-channel campaign orchestration (email, SMS, social)",
          "Predictive sending and AI-powered optimization",
        ],
        keywords: ["advanced automation", "behavioral triggers", "multi-channel", "predictive analytics", "AI optimization"],
      },
    ],
    contentRecommendations: {
      targetKeywords: ["marketing automation", "small business", "tools", "features", "pricing"],
      competitorKeywords: ["workflow automation", "lead nurturing", "email campaigns", "CRM integration", "audience segmentation", "behavioral triggers", "multi-channel", "predictive analytics"],
      strategy: [
        "Create comprehensive guide: 'Complete Guide to Marketing Automation for Small Businesses' covering all key features, pricing models, and implementation steps",
        "Include detailed comparison section with HubSpot, Mailchimp, and ActiveCampaign highlighting unique value propositions",
        "Focus on keywords from competitor pages: workflow automation, lead nurturing, email campaigns, CRM integration, audience segmentation, behavioral triggers",
        "Use data-driven approach with ROI metrics, case studies, and real-world implementation examples",
        "Structure content with clear sections: Getting Started, Feature Comparison, Pricing Guide, Implementation Steps, Best Practices",
      ],
    },
  },
  2: {
    analysisCount: 8,
    myBrandVisibility: "12.1%",
    topCompetitorVisibility: "18.5%",
    visibilityGap: "6.4%",
    competitorCitations: [
      { domain: "drift.com", pageUrl: "drift.com/ai-visibility", citationRate: "18.5%", engines: "ChatGPT, Perplexity", brand: "Drift" },
      { domain: "intercom.com", pageUrl: "intercom.com/blog/ai-strategy", citationRate: "14.2%", engines: "ChatGPT", brand: "Intercom" },
    ],
    competitorLearnings: [
      {
        domain: "drift.com",
        pageUrl: "drift.com/ai-visibility",
        learnings: [
          "Clear topic authority structure",
          "B2B-focused content strategy",
          "Technical SEO optimization",
        ],
        keywords: ["B2B SaaS", "AI visibility", "topic authority", "content strategy"],
      },
    ],
    contentRecommendations: {
      targetKeywords: ["AI visibility", "B2B SaaS", "content optimization"],
      competitorKeywords: ["topic authority", "technical SEO", "content structure"],
      strategy: [
        "Focus on structured content with clear topic authority",
        "Include B2B-specific examples and case studies",
      ],
    },
  },
  5: {
    analysisCount: 15,
    myBrandVisibility: "5%",
    topCompetitorVisibility: "14.5%",
    visibilityGap: "9.5%",
    competitorCitations: [
      { domain: "salesforce.com", pageUrl: "salesforce.com/crm-vs-automation", citationRate: "14.5%", engines: "ChatGPT, Perplexity", brand: "Salesforce" },
      { domain: "hubspot.com", pageUrl: "hubspot.com/crm-marketing-automation", citationRate: "10.3%", engines: "ChatGPT", brand: "HubSpot" },
    ],
    competitorLearnings: [
      {
        domain: "salesforce.com",
        pageUrl: "salesforce.com/crm-vs-automation",
        learnings: [
          "Clear distinction between CRM and marketing automation with use case examples",
          "Enterprise-focused content with scalability considerations",
          "Integration architecture diagrams and API documentation",
        ],
        keywords: ["CRM", "marketing automation", "enterprise", "scalability", "integration"],
      },
    ],
    contentRecommendations: {
      targetKeywords: ["CRM vs marketing automation", "comparison", "differences"],
      competitorKeywords: ["integration", "enterprise", "scalability", "use cases"],
      strategy: [
        "Update with clearer distinctions",
        "Add visual comparison diagrams",
        "Include integration examples",
      ],
    },
  },
}

// Posts ready to be published (trends & topics style)
const toPostItems = [
  { 
    id: "post-1", 
    title: "AI Marketing Automation: Complete Guide for 2024", 
    source: "Trend", 
    time: "Draft · 2h ago",
    topic: "Marketing Automation",
    status: "draft"
  },
  { 
    id: "post-2", 
    title: "How B2B Companies Are Leveraging ChatGPT for Lead Gen", 
    source: "Topic", 
    time: "Ready · 1d ago",
    topic: "AI & B2B",
    status: "ready"
  },
  { 
    id: "post-3", 
    title: "The Rise of Zero-Click Searches: What Marketers Need to Know", 
    source: "Trend", 
    time: "Draft · 3d ago",
    topic: "SEO Trends",
    status: "draft"
  },
  { 
    id: "post-4", 
    title: "Email Marketing vs Marketing Automation: A Comparison", 
    source: "Topic", 
    time: "Ready · 5d ago",
    topic: "Email Marketing",
    status: "ready"
  },
  { 
    id: "post-5", 
    title: "Why Your Marketing Stack Needs AI Integration", 
    source: "Trend", 
    time: "Draft · 1w ago",
    topic: "MarTech",
    status: "draft"
  },
]

// Published posts
const publishedItems = [
  { 
    id: "pub-1", 
    title: "10 Ways to Improve Your Marketing ROI", 
    source: "Blog", 
    time: "Published · Dec 10",
    topic: "Marketing Strategy",
    status: "published"
  },
  { 
    id: "pub-2", 
    title: "Marketing Automation Best Practices", 
    source: "Guide", 
    time: "Published · Dec 8",
    topic: "Marketing Automation",
    status: "published"
  },
  { 
    id: "pub-3", 
    title: "How to Choose the Right CRM for Your Business", 
    source: "Article", 
    time: "Published · Dec 5",
    topic: "CRM",
    status: "published"
  },
]

type PostItem = typeof toPostItems[0]

// Main content folders
const contentFolders = [
  { id: "to-post", label: "To Post", icon: Send, count: toPostItems.length },
  { id: "published", label: "Published", icon: CheckCircle2, count: publishedItems.length },
]

// Tools for content creation
const contentTools = [
  { id: "snippet", label: "Snippet", icon: Scissors },
  { id: "stylize", label: "Stylize", icon: Palette },
  { id: "rewrite", label: "Rewrite", icon: Type },
  { id: "image-gen", label: "Image Gen", icon: Image },
  { id: "ai-enhance", label: "AI Enhance", icon: Wand2 },
]

// Automation options
const automationOptions = [
  { id: "scheduled", label: "Scheduled", icon: Zap, count: 3 },
  { id: "recurring", label: "Recurring", icon: RefreshCw, count: 2 },
]


// Get source type label for display
const getSourceTypeLabel = (sourceType: ContentSourceType) => {
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

export default function ContentPage() {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(toPostItems[0])
  const [selectedFolder, setSelectedFolder] = useState("to-post")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const filteredItems = contentItems.filter((item) => {
    const matchesSearch = searchQuery === "" ||
      (item.prompt && item.prompt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.citationUrl && item.citationUrl.toLowerCase().includes(searchQuery.toLowerCase()))

    // For now, show all items regardless of folder selection
    // In real app, this would filter by post status, platform, etc.
    return matchesSearch
  })

  // Get current post items based on folder
  const currentPostItems = selectedFolder === "to-post" ? toPostItems : 
                           selectedFolder === "published" ? publishedItems : []

  const closeDetailPanel = () => {
    setSelectedItem(null)
    setSelectedPost(null)
  }

  return (
    <DashboardLayout currentSection="content" hideSecondarySidebar>
      <div className="flex h-full flex-col overflow-hidden">
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
            <Button className="bg-primary text-primary-foreground rounded-full flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </div>
          <div className="flex items-center gap-4 flex-1 max-w-md justify-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
          </div>
          {selectedItem && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Archive className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
          {!selectedItem && <div className="w-[88px]"></div>}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - GPT Style */}
          {!isSidebarCollapsed && (
            <div className="w-60 bg-muted/30 border-r border-border flex flex-col shrink-0 transition-all duration-300">
              <div className="flex-1 overflow-y-auto p-3">
                {/* Main Content Folders */}
                <div className="space-y-0.5">
                  {contentFolders.map((folder) => {
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

                {/* Tools Section */}
                <div className="mt-6">
                  <div className="px-3 mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Tools
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {contentTools.map((tool) => {
                      const Icon = tool.icon
                      const isActive = selectedFolder === tool.id
                      return (
                        <button
                          key={tool.id}
                          onClick={() => setSelectedFolder(tool.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                            isActive
                              ? "bg-muted text-foreground"
                              : "text-foreground hover:bg-muted/50"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{tool.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Automation Section */}
                <div className="mt-6">
                  <div className="px-3 mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Automation
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {automationOptions.map((option) => {
                      const Icon = option.icon
                      const isActive = selectedFolder === option.id
                      return (
                        <button
                          key={option.id}
                          onClick={() => setSelectedFolder(option.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                            isActive
                              ? "bg-muted text-foreground"
                              : "text-foreground hover:bg-muted/50"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="flex-1 text-left">{option.label}</span>
                          {option.count > 0 && (
                            <span className="text-xs text-muted-foreground">
                              {option.count}
                            </span>
                          )}
                        </button>
                      )
                    })}
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
                (selectedItem || selectedPost) ? "w-[calc(50%-60px)]" : "flex-1"
              )}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-foreground">
                      {contentFolders.find(f => f.id === selectedFolder)?.label || 
                       contentTools.find(f => f.id === selectedFolder)?.label ||
                       automationOptions.find(f => f.id === selectedFolder)?.label ||
                       "To Post"}
                    </h2>
                    <span className="text-xs text-muted-foreground">Updated on Dec 14</span>
                  </div>

                  <div className="space-y-1">
                    {(selectedFolder === "to-post" || selectedFolder === "published") ? (
                      // Trends & Topics style rendering for posts
                      currentPostItems.map((post) => (
                        <div
                          key={post.id}
                          onClick={() => {
                            setSelectedPost(post)
                            setSelectedItem(null)
                          }}
                          className={cn(
                            "p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted",
                            selectedPost?.id === post.id && "bg-muted border border-border"
                          )}
                        >
                          <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className={cn(
                              "px-1.5 py-0.5 rounded text-[10px] font-medium",
                              post.source === "Trend" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" :
                              post.source === "Topic" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
                              "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            )}>
                              {post.source}
                            </span>
                            <span>·</span>
                            <span>{post.time}</span>
                          </div>
                          <div className="mt-1.5">
                            <span className="text-xs text-muted-foreground">{post.topic}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Original style for tools/automation
                      filteredItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedItem(item)
                            setSelectedPost(null)
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

              {/* Right Panel: Content Detail - Opportunity Style */}
              {selectedItem && (
                <div className="w-[calc(50%+60px)] border-t overflow-y-auto bg-card scrollbar-hide">
                  {/* Header with Send and Close buttons */}
                  <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Opportunity</h2>
                    <div className="flex items-center gap-2">
                      <Button size="sm">
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
                      {contentAnalyses[selectedItem.id] && (
                        <div className="pt-4 border-t space-y-4">
                          {/* Analysis Count */}
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">AI Answer Analysis</p>
                            <p className="text-sm text-muted-foreground">
                              Analyzed {contentAnalyses[selectedItem.id].analysisCount} AI responses across multiple engines.
                            </p>
                          </div>

                          {/* Visibility Gap Analysis */}
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Visibility Gap</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <span className="text-sm">My Brand Visibility</span>
                                <span className="text-sm font-mono text-muted-foreground">
                                  {contentAnalyses[selectedItem.id].myBrandVisibility}
                                </span>
                              </div>
                              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <span className="text-sm">Top Competitor Visibility</span>
                                <span className="text-sm font-mono text-primary">
                                  {contentAnalyses[selectedItem.id].topCompetitorVisibility}
                                </span>
                              </div>
                              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                                <p className="text-sm text-muted-foreground">
                                  Gap: {contentAnalyses[selectedItem.id].visibilityGap}. Competitors are being cited but your brand is missing from AI responses.
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
                              {contentAnalyses[selectedItem.id].competitorCitations.map((citation, idx) => (
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
                              {contentAnalyses[selectedItem.id].competitorLearnings.map((learning, idx) => (
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
                                  {contentAnalyses[selectedItem.id].contentRecommendations.targetKeywords.map((keyword, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">Competitor Keywords:</p>
                                <div className="flex flex-wrap gap-2">
                                  {contentAnalyses[selectedItem.id].contentRecommendations.competitorKeywords.map((keyword, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">Recommended Content Strategy:</p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {contentAnalyses[selectedItem.id].contentRecommendations.strategy.map((item, idx) => (
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

              {/* Right Panel: Post Detail */}
              {selectedPost && !selectedItem && (
                <div className="w-[calc(50%+60px)] border-t overflow-y-auto bg-card scrollbar-hide">
                  {/* Header */}
                  <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Post Details</h2>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        Publish
                      </Button>
                      <button
                        onClick={closeDetailPanel}
                        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          selectedPost.source === "Trend" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" :
                          selectedPost.source === "Topic" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
                          "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        )}>
                          {selectedPost.source}
                        </span>
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          selectedPost.status === "ready" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
                          selectedPost.status === "draft" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" :
                          "bg-gray-100 text-gray-700"
                        )}>
                          {selectedPost.status === "ready" ? "Ready" : selectedPost.status === "draft" ? "Draft" : "Published"}
                        </span>
                      </div>
                      <h1 className="text-xl font-semibold mb-2">{selectedPost.title}</h1>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{selectedPost.time}</span>
                        <span>·</span>
                        <span>{selectedPost.topic}</span>
                      </div>
                    </div>

                    <Card className="p-4 space-y-4 border-0 shadow-none bg-muted/20">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Content Preview</p>
                        <div className="prose prose-sm max-w-none text-foreground">
                          <p>
                            This is a preview of your post content. The full article explores {selectedPost.topic.toLowerCase()} 
                            in detail, covering best practices, industry trends, and actionable insights for your audience.
                          </p>
                          <p className="text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Topic Tags</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{selectedPost.topic}</Badge>
                          <Badge variant="outline">Marketing</Badge>
                          <Badge variant="outline">AI</Badge>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Suggested Actions</p>
                        <div className="space-y-2">
                          <button className="w-full text-left p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors text-sm">
                            ✨ Enhance with AI
                          </button>
                          <button className="w-full text-left p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors text-sm">
                            📝 Add more content
                          </button>
                          <button className="w-full text-left p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors text-sm">
                            🖼️ Generate featured image
                          </button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
