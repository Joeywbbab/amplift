"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from "recharts"
import {
  Sparkles,
  Target,
  ExternalLink,
  Eye,
  X,
  Plus,
  Send,
  Info,
  Users,
  Layers,
  CheckCircle2,
  Newspaper,
  ArrowLeft,
  History,
  Link2,
  TrendingUp,
  TrendingDown,
  Search,
  FileText,
  ArrowRight,
  Pencil,
  Bookmark,
} from "lucide-react"

// AI Performance Metrics
const aiPerformanceMetrics = [
  { id: "visibility", label: "Visibility", value: "67%", trend: "+12%", up: true, numericValue: 67 },
  { id: "usage", label: "Citation Rate", value: "1.2K", trend: "+8%", up: true, numericValue: 1200 },
  { id: "share-of-voice", label: "Share of voice", value: "23%", trend: "-3%", up: false, numericValue: 23 },
  { id: "geo-score", label: "GEO score", value: "72", trend: "+5%", up: true, numericValue: 72 },
]

// Prompts sorted by search volume for Prompt Management
const promptsByVolume = [
  { id: 1, name: "Best marketing automation tools", volume: "12.5K", visibility: "72%", hasSuggestion: true },
  { id: 2, name: "AI marketing platforms comparison", volume: "9.8K", visibility: "68%", hasSuggestion: false },
  { id: 3, name: "Email automation software reviews", volume: "8.2K", visibility: "81%", hasSuggestion: true },
  { id: 4, name: "Marketing analytics tools 2024", volume: "7.5K", visibility: "64%", hasSuggestion: false },
  { id: 5, name: "Customer data platform guide", volume: "6.1K", visibility: "45%", hasSuggestion: true },
]

// AI Recommendations
const aiRecommendations = [
  { id: 1, prompt: "AI content generation tools", reason: "Trending +156% this week", type: "trending" },
  { id: 2, prompt: "Marketing workflow automation", reason: "High competitor activity", type: "competitor" },
  { id: 3, prompt: "Customer data platforms", reason: "Related to your focus", type: "related" },
]

// Mock data
const opportunities = [
  { id: 1, prompt: "Best marketing automation tools 2024", category: "Creation", status: "finish" },
  { id: 2, prompt: "Marketing ROI calculation methods", category: "Refresh", status: "finish" },
  { id: 3, prompt: "Email marketing best practices", category: "Creation", status: "in_progress" },
  { id: 4, prompt: "Social media marketing strategy", category: "Refresh", status: "in_progress" },
]

// Mention-based opportunities
const mentionOpportunities = {
  zeroCompetition: [
    { id: 1, prompt: "AI-powered customer segmentation tools", volume: "8.2K" },
    { id: 2, prompt: "Marketing attribution modeling software", volume: "5.1K" },
  ],
  losingGaps: [
    { id: 1, prompt: "Email deliverability optimization", yourRank: 8, topCompetitor: "HubSpot" },
    { id: 2, prompt: "Campaign ROI tracking", yourRank: 6, topCompetitor: "Salesforce" },
  ],
  geoChecker: [
    { id: 1, page: "/blog/marketing-automation-guide", issue: "Weak content", visibility: "45", geoScore: null },
    { id: 2, page: "/features/email-campaigns", issue: "Technical SEO", visibility: "62", geoScore: "58" },
  ],
}

// Latest news
const latestNews = [
  { id: 1, title: "Google announces new AI search features", source: "TechCrunch", time: "2h ago" },
  { id: 2, title: "OpenAI launches GPT-5 preview", source: "The Verge", time: "4h ago" },
  { id: 3, title: "Marketing automation market grows 23%", source: "Forbes", time: "6h ago" },
]

// Reddit trending
const redditTrends = [
  { id: 1, subreddit: "r/marketing", topic: "Best tools for B2B lead gen?", upvotes: "2.3K", comments: 456 },
  { id: 2, subreddit: "r/SaaS", topic: "How we grew to $1M ARR", upvotes: "1.8K", comments: 312 },
  { id: 3, subreddit: "r/Entrepreneur", topic: "AI tools changing marketing", upvotes: "1.5K", comments: 234 },
]

// Saved posts from social tracker
const savedPosts = [
  { id: 1, title: "Vanguard calls Bitcoin a 'toy' while opening platform to crypto ETFs", source: "TechCrunch", time: "4h ago", sources: 56 },
  { id: 2, title: "Tech sector cuts 120,000 jobs in AI-driven restructuring", source: "Bloomberg", time: "6h ago", sources: 72 },
  { id: 3, title: "Salesforce abandons AI agent pay-per-use pricing", source: "The Verge", time: "10h ago", sources: 59 },
]

// Trends from social tracker
const trends = [
  { id: 1, title: "AI and chip industry ETFs surge as technology breakthroughs boost market sentiment", time: "2h ago" },
  { id: 2, title: "Vanguard calls Bitcoin a 'toy' while opening platform to crypto ETFs", time: "4h ago" },
  { id: 3, title: "Tech sector cuts 120,000 jobs in AI-driven restructuring", time: "6h ago" },
  { id: 4, title: "Salesforce abandons AI agent pay-per-use pricing", time: "10h ago" },
  { id: 5, title: "OpenAI announces GPT-5 with enhanced reasoning capabilities", time: "12h ago" },
]

// Topics from social tracker
const topics = [
  { id: 1, title: "Best marketing automation tools for small businesses", topic: "Marketing Automation" },
  { id: 2, title: "Email deliverability optimization strategies", topic: "Email Marketing" },
  { id: 3, title: "How to track campaign ROI effectively", topic: "Analytics & Reporting" },
  { id: 4, title: "Lead generation tactics for B2B companies", topic: "Lead Generation" },
  { id: 5, title: "Customer engagement best practices", topic: "Customer Engagement" },
]

const prompts = [
  { id: 1, name: "Marketing automation tools", visibility: "72%", status: "active", suggestion: null },
  { id: 2, name: "AI marketing platforms", visibility: "68%", status: "active", suggestion: null },
  { id: 3, name: "Email automation software", visibility: "81%", status: "active", suggestion: null },
  {
    id: 4,
    name: "Legacy CRM comparison",
    visibility: "12%",
    status: "active",
    suggestion: "Consider deactivating - low visibility",
  },
  { id: 5, name: "Fax marketing tools", visibility: "3%", status: "inactive", suggestion: null },
  { id: 6, name: "Marketing analytics tools", visibility: "64%", status: "active", suggestion: null },
]

const suggestedNewPrompts = [
  { name: "AI content generation tools", reason: "Trending +156% this week" },
  { name: "Marketing workflow automation", reason: "High competitor activity" },
  { name: "Customer data platforms", reason: "Related to your focus" },
]

const xTrends = [
  { tag: "#AIMarketing", tweets: "12.3K posts", change: "+89%" },
  { tag: "#MarTech", tweets: "8.7K posts", change: "+45%" },
  { tag: "#B2BSaaS", tweets: "6.2K posts", change: "+32%" },
  { tag: "#ContentAI", tweets: "5.1K posts", change: "+67%" },
  { tag: "#GrowthHacking", tweets: "4.8K posts", change: "+28%" },
  { tag: "#EmailMarketing", tweets: "3.9K posts", change: "+19%" },
]

// X People to follow
const xPeopleToFollow = [
  { id: 1, name: "Rand Fishkin", handle: "@randfish", avatar: "RF" },
  { id: 2, name: "Neil Patel", handle: "@neilpatel", avatar: "NP" },
  { id: 3, name: "Ann Handley", handle: "@annhandley", avatar: "AH" },
  { id: 4, name: "Gary Vee", handle: "@garyvee", avatar: "GV" },
  { id: 5, name: "Seth Godin", handle: "@thisissethsblog", avatar: "SG" },
]

// Topics for Make it yours
const availableTopics = [
  { id: 1, name: "AI Marketing", selected: true },
  { id: 2, name: "SaaS Growth", selected: true },
  { id: 3, name: "Content Strategy", selected: false },
  { id: 4, name: "SEO Trends", selected: false },
  { id: 5, name: "MarTech", selected: true },
  { id: 6, name: "B2B Marketing", selected: false },
]

const topicClusters = [
  { name: "Marketing Automation", prompts: 12, visibility: "72%" },
  { name: "Email Marketing", prompts: 8, visibility: "65%" },
  { name: "Analytics & Reporting", prompts: 6, visibility: "58%" },
  { name: "Lead Generation", prompts: 5, visibility: "45%" },
  { name: "Customer Engagement", prompts: 4, visibility: "52%" },
]

const competitors = [
  { name: "HubSpot", domain: "hubspot.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Marketo", domain: "marketo.com" },
]

const aiMessages = [
  {
    role: "assistant",
    content:
      "Hello! I'm Amplift AI. I can help you analyze your visibility data, find opportunities, and optimize your prompts. What would you like to explore?",
  },
]

export default function OverviewPage() {
  const router = useRouter()
  const [currentFocus, setCurrentFocus] = useState("Marketing Automation")
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [aiInput, setAiInput] = useState("")
  const [messages, setMessages] = useState(aiMessages)
  const [hoveredMetric, setHoveredMetric] = useState<typeof aiPerformanceMetrics[0] | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const [showBrandModal, setShowBrandModal] = useState(false)
  const [customFocusInput, setCustomFocusInput] = useState("")
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(false)
  const [showAiRecommendations, setShowAiRecommendations] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState<number[]>([1, 2, 5])
  const [followedPeople, setFollowedPeople] = useState<number[]>([1, 2])
  const [peopleSearchInput, setPeopleSearchInput] = useState("")

  // State for tabs
  const [brandModalTab, setBrandModalTab] = useState<"settings" | "competitors" | "geo-history" | "gsc" | "saved">("settings")
  const [selectedGeoReport, setSelectedGeoReport] = useState<number | null>(null)

  // GEO History audit data
  const geoHistoryData = [
    {
      id: 1,
      date: "Dec 10, 2025",
      pages: 12,
      avgScore: "72",
      status: "completed",
      details: [
        { page: "/blog/marketing-automation-guide", type: "Content Quality", score: 68, issues: ["Thin content", "Missing H2 structure"] },
        { page: "/features/email-campaigns", type: "Technical SEO", score: 58, issues: ["Missing meta description", "Slow page load"] },
        { page: "/pricing", type: "Content Quality", score: 82, issues: ["Good structure"] },
        { page: "/about", type: "Technical SEO", score: 75, issues: ["Image optimization needed"] },
      ]
    },
    {
      id: 2,
      date: "Dec 3, 2025",
      pages: 12,
      avgScore: "68",
      status: "completed",
      details: [
        { page: "/blog/marketing-automation-guide", type: "Content Quality", score: 62, issues: ["Thin content", "Missing H2 structure"] },
        { page: "/features/email-campaigns", type: "Technical SEO", score: 55, issues: ["Missing meta description"] },
      ]
    },
    {
      id: 3,
      date: "Nov 26, 2025",
      pages: 10,
      avgScore: "65",
      status: "completed",
      details: [
        { page: "/blog/marketing-automation-guide", type: "Content Quality", score: 58, issues: ["Needs more depth"] },
      ]
    },
    {
      id: 4,
      date: "Nov 19, 2025",
      pages: 10,
      avgScore: "61",
      status: "completed",
      details: [
        { page: "/features/email-campaigns", type: "Technical SEO", score: 52, issues: ["Multiple issues"] },
      ]
    },
  ]

  const handleSendMessage = (customMessage?: string) => {
    const message = customMessage || aiInput
    if (!message.trim()) return
    setMessages([...messages, { role: "user", content: message }])
    const timeoutId = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I've analyzed your query about "${message}". Based on current trends and your visibility data, I recommend focusing on high-volume prompts in the Marketing Automation category.`,
        },
      ])
    }, 1000)
    setAiInput("")
    return () => clearTimeout(timeoutId)
  }

  // Open AI panel with context about a completed item
  const openAiWithContext = (item: { prompt: string; category: string }) => {
    setAiPanelOpen(true)
    const contextMessage = `Help me optimize the prompt "${item.prompt}" - this was completed as a ${item.category} task. What adjustments would you recommend?`
    setTimeout(() => {
      handleSendMessage(contextMessage)
    }, 100)
  }

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="overview">
      <BreadcrumbHeader items={["Visibility", "Space"]} />
      <div className="flex h-full">
        {/* Main Content Area */}
        <div className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${aiPanelOpen ? "mr-0" : ""}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="heading-xl">Space</h1>
          </div>
          <p className="text-caption-muted font-mono">Last updated: 12:05</p>
        </div>

        {/* Row 1: Amplift Card and AI Suggestions */}
        <div className="grid grid-cols-[1fr_1fr] gap-6 mb-6">
          {/* Left: Amplift Card */}
          <Card className="rounded-xl">
            <CardContent className="p-5">
              <div className="flex items-start gap-8">
                {/* Left: Brand Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-8">
                    {/* Brand and Industry Section */}
                    <div className="space-y-4 flex-1">
                      {/* Brand Section */}
                      <div>
                        <h3 className="heading-lg mb-4">Brand card</h3>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-lg font-bold text-primary">A</span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground">Amplift</div>
                            <div className="text-xs text-muted-foreground">amplift.io</div>
                          </div>
                        </div>
                      </div>

                      {/* Industry Section */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">Industry</label>
                        <div className="text-sm text-foreground">SaaS / B2B</div>
                      </div>

                      {/* Direct Competitors Section */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">Direct Competitors</label>
                        <div className="flex flex-wrap gap-2">
                          {competitors.map((competitor) => (
                            <div
                              key={competitor.name}
                              className="px-3 py-1.5 rounded-full bg-muted text-sm text-foreground"
                            >
                              {competitor.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Donut Chart - Right side of Brand/Industry/Direct Competitors */}
                    <div className="w-[180px] h-[180px] shrink-0 relative">
                      {/* Edit Button - Top Right */}
                      <button
                        className="absolute top-0 right-0 z-10 p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        title="Edit"
                        onClick={() => setShowBrandModal(true)}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <div className="relative w-full h-full mt-[20px]">
                          <ChartContainer
                            config={{
                              visibility: { label: "Visibility", color: "rgb(59, 130, 246)" },
                              usage: { label: "Citation Rate", color: "rgb(96, 165, 250)" },
                              "share-of-voice": { label: "Share of voice", color: "rgb(147, 197, 253)" },
                              "geo-score": { label: "GEO score", color: "rgb(191, 219, 254)" },
                            }}
                            className="w-full h-full"
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <ChartTooltip
                                  content={() => null}
                                  cursor={false}
                                />
                                <Pie
                                  data={aiPerformanceMetrics.map((metric) => ({
                                    ...metric,
                                    value: 25, // Each segment is 25% (1/4 of the circle)
                                  }))}
                                  dataKey="value"
                                  nameKey="label"
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={50}
                                  outerRadius={80}
                                  startAngle={90}
                                  endAngle={-270}
                                  stroke="none"
                                  activeIndex={activeIndex}
                                  onMouseEnter={(_, index) => {
                                    setActiveIndex(index)
                                    setHoveredMetric(aiPerformanceMetrics[index])
                                  }}
                                  onMouseLeave={() => {
                                    setActiveIndex(null)
                                    setHoveredMetric(null)
                                  }}
                                  label={({ label, cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                                    // Hide label when hovering this segment
                                    if (activeIndex === index) return null
                                    
                                    const RADIAN = Math.PI / 180
                                    // Move text more inward (closer to innerRadius)
                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.15
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN)
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN)
                                    
                                    // Split label into words for wrapping
                                    const words = label.split(' ')
                                    const maxCharsPerLine = 8
                                    const lines: string[] = []
                                    let currentLine = ''
                                    
                                    words.forEach((word) => {
                                      if ((currentLine + word).length <= maxCharsPerLine) {
                                        currentLine = currentLine ? `${currentLine} ${word}` : word
                                      } else {
                                        if (currentLine) lines.push(currentLine)
                                        currentLine = word
                                      }
                                    })
                                    if (currentLine) lines.push(currentLine)
                                    
                                    const lineHeight = 12
                                    const totalHeight = (lines.length - 1) * lineHeight
                                    const startY = y - totalHeight / 2
                                    
                                    return (
                                      <text
                                        x={x}
                                        y={startY}
                                        fill="rgb(10, 10, 10)"
                                        textAnchor={x > cx ? 'start' : 'end'}
                                        dominantBaseline="hanging"
                                        fontSize="9"
                                        fontWeight="500"
                                        className="pointer-events-none"
                                      >
                                        {lines.map((line, index) => (
                                          <tspan
                                            key={index}
                                            x={x}
                                            dy={index === 0 ? 0 : lineHeight}
                                            textAnchor={x > cx ? 'start' : 'end'}
                                          >
                                            {line}
                                          </tspan>
                                        ))}
                                      </text>
                                    )
                                  }}
                                  labelLine={false}
                                >
                                  {aiPerformanceMetrics.map((metric, index) => {
                                    const blueColors = [
                                      "rgb(59, 130, 246)",   // blue-500
                                      "rgb(96, 165, 250)",   // blue-400
                                      "rgb(147, 197, 253)",  // blue-300
                                      "rgb(191, 219, 254)",  // blue-200
                                    ]
                                    return (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={blueColors[index]}
                                        className="cursor-pointer transition-opacity hover:opacity-80"
                                      />
                                    )
                                  })}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                          {/* Center Text - Only show on hover */}
                          {hoveredMetric && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                              <div className="text-center">
                                <div className="text-2xl font-bold font-mono">
                                  {hoveredMetric.value}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {hoveredMetric.label}
                                </div>
                                {hoveredMetric.trend && (
                                  <div className={`flex items-center justify-center gap-1 text-xs font-mono mt-1 ${hoveredMetric.up ? "text-green-600" : "text-red-500"}`}>
                                    {hoveredMetric.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {hoveredMetric.trend}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  {/* Separator */}
                  <div className="border-t border-border pt-4 mt-4">
                    {/* Topics Section */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-3 block">Topics</label>
                      <div className="flex flex-wrap gap-2 items-center">
                        {topicClusters.slice(0, 4).map((topic) => (
                          <div
                            key={topic.name}
                            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer bg-muted text-foreground border border-border hover:bg-muted/80"
                            onClick={() => setCurrentFocus(topic.name)}
                          >
                            {topic.name}
                          </div>
                        ))}
                        <button
                          onClick={() => setAiPanelOpen(true)}
                          className="w-8 h-8 rounded-full bg-muted text-foreground border border-border hover:bg-muted/80 flex items-center justify-center transition-colors"
                          title="Add topic"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right: AI Suggestions Card */}
          <Card className="rounded-xl">
            <CardContent className="p-5">
              <h3 className="heading-lg mb-4">AI Suggestions</h3>
            <Button 
              className="bg-primary text-primary-foreground rounded-lg mb-4"
              onClick={() => router.push("/visibility/geo-performance")}
            >
              Start a geo checker
            </Button>
              
              {/* Opportunities Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground">Opportunities</h4>
                  <Link
                    href="/visibility/opportunity"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    View all
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>
                      You can create content about{" "}
                      <Link
                        href="/visibility/opportunity?prompt=How to integrate marketing automation with sales tools"
                        className="font-semibold text-foreground hover:text-primary inline-flex items-center gap-1"
                      >
                        "How to integrate marketing automation with sales tools"
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>
                      You can post this:{" "}
                      <Link
                        href="/visibility/social-tracker"
                        className="font-semibold text-foreground hover:text-primary inline-flex items-center gap-1"
                      >
                        Community example: Reddit discussion on marketing automation tools
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border mb-6"></div>

              {/* Prompt Management Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground">Prompt Management</h4>
                  <Link
                    href="/visibility/ai-performance/data"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    View all
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>
                      You can move this prompt into active:{" "}
                      <Link
                        href="/visibility/ai-performance/data"
                        className="font-semibold text-foreground hover:text-primary inline-flex items-center gap-1"
                      >
                        "Best marketing automation tools for small businesses"
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>
                      You can add new prompt:{" "}
                      <Link
                        href="/visibility/ai-performance/data"
                        className="font-semibold text-foreground hover:text-primary inline-flex items-center gap-1"
                      >
                        "Marketing automation ROI calculator"
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Help Section */}
              <div className="border-t border-border pt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setAiPanelOpen(true)}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  Need any further help from Amplift AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trending & News Section */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4">
            {/* Trends Card */}
            <Card className="rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <X className="w-4 h-4" />
                  <span className="heading-lg">Trends</span>
                </div>
                <div className="space-y-3">
                  {trends.map((trend) => (
                    <Link
                      key={trend.id}
                      href={`/visibility/social-tracker/${trend.id}`}
                      className="group block cursor-pointer"
                    >
                      <p className="body-text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                        {trend.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-caption-muted">{trend.time}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Topics Card */}
            <Card className="rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">r/</span>
                  </div>
                  <span className="heading-lg">Topics</span>
                </div>
                <div className="space-y-3">
                  {topics.map((item) => (
                    <Link
                      key={item.id}
                      href={`/visibility/social-tracker/${item.id}`}
                      className="group block cursor-pointer"
                    >
                      <p className="body-text-sm font-medium group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {item.title}
                      </p>
                      <span className="text-caption-muted">{item.topic}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Third Card - Saved Posts */}
            <Card className="rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Bookmark className="w-4 h-4" />
                  <span className="heading-lg">Saved</span>
                </div>
                <div className="space-y-3">
                  {savedPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/visibility/social-tracker/${post.id}`}
                      className="group block cursor-pointer"
                    >
                      <p className="body-text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-caption-muted">{post.source}</span>
                        <span className="text-caption-muted">·</span>
                        <span className="text-caption-muted">{post.time}</span>
                        <span className="text-caption-muted">·</span>
                        <span className="text-caption-muted">{post.sources} sources</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


        {/* Brand Info Modal - Left tabs + Right content layout */}
        {showBrandModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowBrandModal(false)}
          >
            <div
              className="bg-card w-[800px] h-[600px] rounded-xl shadow-2xl overflow-hidden flex"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left sidebar - Tabs */}
              <div className="w-[200px] bg-muted/30 border-r flex flex-col">
                <div className="p-4 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">A</span>
                    </div>
                    <span className="card-title">Amplift</span>
                  </div>
                </div>
                <nav className="flex-1 p-2">
                  <button
                    onClick={() => setBrandModalTab("settings")}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md body-text-sm transition-colors ${
                      brandModalTab === "settings"
                        ? "bg-card text-foreground font-medium shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    <Info className="w-4 h-4" />
                    Info
                  </button>
                  <button
                    onClick={() => setBrandModalTab("competitors")}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md body-text-sm transition-colors ${
                      brandModalTab === "competitors"
                        ? "bg-card text-foreground font-medium shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    Competitors
                  </button>
                  <button
                    onClick={() => setBrandModalTab("geo-history")}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md body-text-sm transition-colors ${
                      brandModalTab === "geo-history"
                        ? "bg-card text-foreground font-medium shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    <History className="w-4 h-4" />
                    GEO History
                  </button>
                  <button
                    onClick={() => setBrandModalTab("gsc")}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md body-text-sm transition-colors ${
                      brandModalTab === "gsc"
                        ? "bg-card text-foreground font-medium shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    <Link2 className="w-4 h-4" />
                    Search Console
                  </button>
                </nav>
              </div>

              {/* Right content area */}
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="heading-lg">
                    {brandModalTab === "settings" && "Info"}
                    {brandModalTab === "competitors" && "Direct Competitors"}
                    {brandModalTab === "geo-history" && "GEO Checker History"}
                    {brandModalTab === "gsc" && "Google Search Console"}
                  </h2>
                  <button
                    onClick={() => setShowBrandModal(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                  {/* Info Tab */}
                  {brandModalTab === "settings" && (
                    <div className="space-y-6">
                      <div>
                        <label className="body-text-sm font-medium text-muted-foreground">Brand</label>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <span className="text-xl font-bold text-primary">A</span>
                          </div>
                          <div>
                            <p className="text-lg font-bold">Amplift</p>
                            <p className="body-muted">amplift.io</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="body-text-sm font-medium text-muted-foreground">Industry</label>
                        <p className="mt-2 body-text-sm">SaaS / B2B</p>
                      </div>
                      <div className="pt-4 border-t">
                        <label className="body-text-sm font-medium text-muted-foreground">Linked Topics</label>
                        <div className="mt-3 space-y-3">
                          {topicClusters.map((cluster, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                                currentFocus === cluster.name
                                  ? "bg-primary/10 border-2 border-primary"
                                  : "bg-muted/50 hover:bg-muted border-2 border-transparent"
                              }`}
                              onClick={() => setCurrentFocus(cluster.name)}
                            >
                              <div>
                                <p className="body-text-sm font-medium">{cluster.name}</p>
                                <p className="body-muted">{cluster.prompts} prompts tracked</p>
                              </div>
                              <div className="text-right">
                                <p className="heading-lg font-mono font-semibold">{cluster.visibility}</p>
                                {currentFocus === cluster.name && (
                                  <span className="text-caption-muted text-primary font-medium">Current Focus</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Competitors Tab */}
                  {brandModalTab === "competitors" && (
                    <div className="space-y-3">
                      <p className="body-muted mb-4">
                        Track your competitors to compare visibility and share of voice.
                      </p>
                      {competitors.map((comp, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center body-text-sm font-bold">
                              {comp.name[0]}
                            </div>
                            <div>
                              <p className="body-text-sm font-medium">{comp.name}</p>
                              <p className="body-muted">{comp.domain}</p>
                            </div>
                          </div>
                          <button className="body-text-sm text-destructive hover:underline">Remove</button>
                        </div>
                      ))}
                      <button className="w-full p-4 border border-dashed rounded-lg body-text-sm text-muted-foreground hover:bg-muted/50 flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> Add Competitor
                      </button>
                    </div>
                  )}


                  {/* GEO Checker History Tab */}
                  {brandModalTab === "geo-history" && (
                    <div className="space-y-4">
                      {selectedGeoReport === null ? (
                        <>
                          <p className="body-muted">
                            View your past GEO checker audits and track content improvements over time.
                          </p>
                          <div className="space-y-3">
                            {geoHistoryData.map((audit) => (
                              <div
                                key={audit.id}
                                onClick={() => setSelectedGeoReport(audit.id)}
                                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted cursor-pointer"
                              >
                                <div>
                                  <p className="body-text-sm font-medium">{audit.date}</p>
                                  <p className="body-muted">{audit.pages} pages audited</p>
                                </div>
                                <div className="text-right">
                                  <p className="heading-lg font-mono font-semibold text-green-600">{audit.avgScore}</p>
                                  <p className="text-caption-muted">Avg. GEO Score</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button variant="outline" className="w-full">
                            Run New Audit
                          </Button>
                        </>
                      ) : (
                        <>
                          {/* Detail View */}
                          {(() => {
                            const report = geoHistoryData.find(r => r.id === selectedGeoReport)
                            if (!report) return null
                            return (
                              <div className="space-y-4">
                                <button
                                  onClick={() => setSelectedGeoReport(null)}
                                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  <ArrowLeft className="w-4 h-4" />
                                  <span className="body-text-sm">Back to history</span>
                                </button>

                                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                                  <div>
                                    <p className="card-title">{report.date}</p>
                                    <p className="body-muted">{report.pages} pages audited</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="heading-lg font-mono font-semibold text-green-600">{report.avgScore}</p>
                                    <p className="text-caption-muted">Avg. GEO Score</p>
                                  </div>
                                </div>

                                {/* Pages by type */}
                                <div className="space-y-3">
                                  <h4 className="body-text-sm font-semibold">Page Analysis</h4>
                                  {report.details.map((detail, idx) => (
                                    <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="body-text-sm font-medium">{detail.page}</span>
                                        <div className="flex items-center gap-2">
                                          <span className={`text-caption-muted px-2 py-0.5 rounded ${
                                            detail.type === "Technical SEO"
                                              ? "bg-amber-100 text-amber-700"
                                              : "bg-blue-100 text-blue-700"
                                          }`}>
                                            {detail.type}
                                          </span>
                                          <span className={`font-mono font-semibold ${
                                            detail.score >= 70 ? "text-green-600" : detail.score >= 50 ? "text-amber-600" : "text-red-600"
                                          }`}>
                                            {detail.score}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex flex-wrap gap-1.5">
                                        {detail.issues.map((issue, i) => (
                                          <span key={i} className="text-caption-muted px-2 py-0.5 bg-muted rounded">
                                            {issue}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          })()}
                        </>
                      )}
                    </div>
                  )}

                  {/* Google Search Console Tab */}
                  {brandModalTab === "gsc" && (
                    <div className="space-y-6">
                      <p className="body-muted">
                        Connect your Google Search Console to import keywords and track search performance.
                      </p>

                      <div className="p-4 rounded-lg border-2 border-dashed border-muted">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" fill="currentColor"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="body-text-sm font-medium">Google Search Console</p>
                            <p className="text-caption-muted">Not connected</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Connect
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="body-text-sm font-semibold">What you'll get:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            Import your top performing keywords
                          </li>
                          <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            Track search impressions and clicks
                          </li>
                          <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            Discover new keyword opportunities
                          </li>
                          <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            Sync page performance data
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Amplift AI Floating Button - only show when sidebar is closed */}
        {!aiPanelOpen && (
          <button
            onClick={() => setAiPanelOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50"
          >
            <Sparkles className="w-6 h-6" />
          </button>
        )}
        </div>

        {/* Amplift AI Right Sidebar */}
        <div
          className={`h-full border-l bg-card flex flex-col transition-all duration-300 ${
            aiPanelOpen ? "w-96" : "w-0 overflow-hidden"
          }`}
        >
          {aiPanelOpen && (
            <>
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between bg-muted/30 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="card-title">Amplift AI</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 hover:bg-muted rounded" title="New Chat">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-muted rounded" onClick={() => setAiPanelOpen(false)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] p-3 rounded-lg body-text-sm ${
                        msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="px-3 py-2 border-t flex flex-wrap gap-1.5 flex-shrink-0">
                {["Find opportunities", "Analyze trends", "Suggest prompts"].map((action) => (
                  <button
                    key={action}
                    className="px-2.5 py-1 text-caption-muted bg-muted rounded-full whitespace-nowrap hover:bg-muted/80"
                    onClick={() => setAiInput(action)}
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask Amplift AI..."
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 body-text-sm"
                  />
                  <Button size="icon" onClick={() => handleSendMessage()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}



