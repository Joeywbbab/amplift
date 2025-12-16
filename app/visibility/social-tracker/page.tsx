"use client"

import { useState, useMemo, Fragment } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ForwardModal } from "@/components/forward-modal"
import {
  Heart,
  MoreHorizontal,
  Filter,
  Share2,
  Clock,
  TrendingUp,
  TrendingDown,
  Cloud,
  CloudSun,
  Sun,
  ChevronDown,
  ListFilter,
  CheckCircle2,
  Forward,
  Bookmark,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { cn } from "@/lib/utils"

// Main featured article data
const featuredArticle = {
  id: 1,
  title: "Salesforce abandons AI agent pay-per-use pricing",
  publishedTime: "10 hours ago",
  summary: "Enterprises rejected unpredictable per-conversation charges, pushing the company back to seat-based licensing for cost certainty.",
  sources: 59,
  image: "/placeholder.jpg",
  author: "Tech Reporter",
}

// Article grid data
const articleGrid = [
  {
    id: 3,
    title: "Vanguard calls Bitcoin a 'toy' while opening platform to crypto ETFs",
    sources: 56,
    image: "/placeholder.jpg",
    time: "4h ago",
  },
  {
    id: 4,
    title: "Tech sector cuts 120,000 jobs in AI-driven restructuring",
    sources: 72,
    image: "/placeholder.jpg",
    time: "6h ago",
  },
  {
    id: 5,
    title: "Authors allege Meta distributed pirated books via BitTorrent",
    sources: 83,
    image: "/placeholder.jpg",
    time: "8h ago",
  },
]

// Additional articles for scrolling
const additionalArticles = [
  {
    id: 6,
    title: "Beam launches AI platform to turn videos into playable games",
    publishedTime: "Published 18 hours ago",
    summary: "The no-code platform uses Google's Veo 3.1 to help creators generate interactive mini-games and stories from text prompts without programming experience.",
    sources: 57,
    image: "/placeholder.jpg",
  },
  {
    id: 7,
    title: "OpenAI announces GPT-5 with enhanced reasoning capabilities",
    publishedTime: "Published 20 hours ago",
    summary: "The new model shows significant improvements in complex problem-solving and can handle multi-step reasoning tasks with higher accuracy.",
    sources: 84,
    image: "/placeholder.jpg",
  },
]

// Weather data
const weatherData = {
  current: { temp: "25°", condition: "Thunderstorm", icon: Cloud },
  location: "York Hill Estate, Singapore",
  high: "31°",
  low: "24°",
  forecast: [
    { day: "Sat", temp: "31°", icon: Sun },
    { day: "Sun", temp: "31°", icon: CloudSun },
    { day: "Mon", temp: "29°", icon: Cloud },
    { day: "Tue", temp: "29°", icon: Cloud },
    { day: "Wed", temp: "31°", icon: Sun },
  ],
}

// Market data
const marketData = [
  {
    symbol: "ESUSD",
    name: "S&P Futu...",
    price: "6,830.75",
    change: "-1.11%",
    changeValue: "-76.5",
    trend: "down",
  },
  {
    symbol: "NQUSD",
    name: "NASDAQ ...",
    price: "25,213.5",
    change: "-1.94%",
    changeValue: "-500",
    trend: "down",
  },
  {
    symbol: "BTCUSD",
    name: "Bitcoin",
    price: "$90,515.86",
    change: "+0.26%",
    changeValue: "+$237.86",
    trend: "up",
  },
  {
    symbol: "^VIX",
    name: "VIX",
    price: "15.74",
    change: "+5.99%",
    changeValue: "+0.89",
    trend: "up",
  },
]

// Website topics (selected)
const websiteTopics = [
  { id: 1, name: "Marketing Automation", selected: true },
]

// Industry recommended topics
const industryTopics = [
  { id: 2, name: "Email Marketing", selected: false },
  { id: 3, name: "Content Strategy", selected: false },
  { id: 4, name: "Lead Generation", selected: false },
  { id: 5, name: "Customer Engagement", selected: false },
  { id: 6, name: "Marketing Analytics", selected: false },
]

// All articles combined for reference
const allArticles = [
  featuredArticle,
  ...articleGrid,
  ...additionalArticles,
]

// Related people from X (trending event) - linked to articles
const relatedPeople = [
  { id: 1, name: "Sarah Chen", handle: "@sarahchen", avatar: "SC", verified: true, articleId: 1 },
  { id: 2, name: "Alex Martinez", handle: "@alexmartinez", avatar: "AM", verified: true, articleId: 3 },
  { id: 3, name: "Jordan Kim", handle: "@jordankim", avatar: "JK", verified: true, articleId: 4 },
  { id: 4, name: "Taylor Brown", handle: "@taylorbrown", avatar: "TB", verified: false, articleId: 5 },
  { id: 5, name: "Morgan Lee", handle: "@morganlee", avatar: "ML", verified: true, articleId: 6 },
]

// Topic clusters data (from overview page)
const topicClusters = [
  { name: "Marketing Automation", prompts: 12, visibility: "72%" },
  { name: "Email Marketing", prompts: 8, visibility: "65%" },
  { name: "Analytics & Reporting", prompts: 6, visibility: "58%" },
  { name: "Lead Generation", prompts: 5, visibility: "45%" },
  { name: "Customer Engagement", prompts: 4, visibility: "52%" },
]

// Discussions data
const discussionsData = [
  {
    id: 1,
    title: "What are the best marketing automation tools for small businesses?",
    topic: "Marketing Automation",
    description: "Small business owners are discussing affordable marketing automation solutions that integrate with their existing workflows.",
    subreddits: ["r/marketing", "r/smallbusiness", "r/entrepreneur"],
  },
  {
    id: 2,
    title: "How to choose between HubSpot and Salesforce for marketing?",
    topic: "CRM Comparison",
    description: "Community members are comparing HubSpot and Salesforce features, pricing, and implementation complexity.",
    subreddits: ["r/salesforce", "r/hubspot", "r/marketing"],
  },
  {
    id: 3,
    title: "Email marketing automation best practices in 2024",
    topic: "Email Marketing",
    description: "Discussion about modern email automation strategies, segmentation techniques, and deliverability improvements.",
    subreddits: ["r/emailmarketing", "r/digital_marketing", "r/marketing"],
  },
  {
    id: 4,
    title: "AI tools for content creation - recommendations needed",
    topic: "AI Content Tools",
    description: "Users sharing experiences with AI-powered content creation tools and their impact on marketing workflows.",
    subreddits: ["r/marketing", "r/artificial", "r/content_marketing"],
  },
]

export default function SocialTrackerPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"trends" | "discussions">("discussions")
  const [forwardingPost, setForwardingPost] = useState<{ id: number; title: string } | null>(null)

  const closeForwardModal = () => {
    setForwardingPost(null)
  }

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="social-tracker">
      <BreadcrumbHeader 
        items={["Home", "Visibility", "Social Tracker"]}
        action={
          <div className="flex items-center gap-2">
            <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
              <ListFilter className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors text-xs">
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </button>
          </div>
        }
      />
      <div className="flex-1 overflow-auto bg-background">
        <div className="max-w-7xl mx-auto px-8 py-6">
          {/* Header Navigation */}
          <div className="flex items-start justify-between mb-8">
            {/* Left: Title */}
            <div>
              <h1 className="heading-xl mb-4">Social Tracker</h1>
              {/* Center: Tabs - positioned below title */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("trends")}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeTab === "trends"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  style={{
                    borderWidth: "0px",
                    borderColor: "rgba(0, 0, 0, 0)",
                    borderStyle: "none",
                    borderImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 1) 100%) 1",
                    backgroundClip: "unset",
                    WebkitBackgroundClip: "unset",
                    color: "var(--color-black)",
                    boxSizing: "content-box",
                    boxShadow: "none",
                  }}
                >
                  Trends
                </button>
                 <button
                   onClick={() => setActiveTab("discussions")}
                   className={cn(
                     "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                     activeTab === "discussions"
                       ? "bg-muted text-foreground"
                       : "text-muted-foreground hover:text-foreground"
                   )}
                   style={{
                     borderWidth: "0px",
                     borderColor: "rgba(0, 0, 0, 0)",
                     borderStyle: "none",
                     borderImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 1) 100%) 1",
                     backgroundClip: "unset",
                     WebkitBackgroundClip: "unset",
                     color: "var(--color-black)",
                     boxSizing: "content-box",
                     boxShadow: "none",
                   }}
                 >
                   Discussions
                 </button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {activeTab === "discussions" ? (
                /* Discussions Content */
                <div className="space-y-4">
                  {discussionsData.map((discussion) => (
                    <Card
                      key={discussion.id}
                      className="p-6 cursor-pointer hover:shadow-md transition-all border-0 shadow-sm"
                      onClick={() => router.push(`/visibility/social-tracker/discussions/${discussion.id}`)}
                    >
                      <h3 className="heading-lg mb-3 text-foreground">{discussion.title}</h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {discussion.topic}
                        </Badge>
                      </div>

                      <p className="body-text-sm text-muted-foreground mb-4 leading-relaxed">
                        {discussion.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground font-medium">Subreddits:</span>
                        <div className="flex flex-wrap gap-2">
                          {discussion.subreddits.map((subreddit, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {subreddit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Fragment>
              {/* Featured Article Card */}
              <Card className="mb-8 overflow-hidden border-0 shadow-sm">
                <div className="flex">
                  {/* Left: Content */}
                  <div className="flex-1 p-8">
                    <h2 className="text-3xl font-bold mb-4 leading-tight text-foreground">{featuredArticle.title}</h2>
                    
                    {/* Published Time */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                      <Clock className="h-4 w-4" />
                      <span>Published {featuredArticle.publishedTime}</span>
                    </div>

                    {/* Summary */}
                    <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                      {featuredArticle.summary}
                    </p>

                    {/* Sources and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Overlapping avatars */}
                        <div className="flex items-center -space-x-2">
                          <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-medium border-2 border-background">
                            T
                          </div>
                          <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-medium border-2 border-background">
                            R
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{featuredArticle.sources} sources</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Image */}
                  <div className="w-[400px] shrink-0 relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="w-full h-full bg-gradient-to-br from-blue-700/50 to-transparent flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
                            <span className="text-white text-3xl font-bold">SR</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Article Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {articleGrid.map((article, idx) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-all border-0 shadow-sm"
                    onClick={() => router.push(`/visibility/social-tracker/${article.id}`)}
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      {idx === 0 ? (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <span className="text-white text-xl font-bold">V</span>
                            </div>
                          </div>
                        </div>
                      ) : idx === 1 ? (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-700">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <span className="text-white text-xl font-bold">T</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <span className="text-white text-xl font-bold">M</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-semibold mb-4 line-clamp-2 text-sm leading-snug text-foreground">{article.title}</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center -space-x-1.5">
                            <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-background"></div>
                            <div className="w-5 h-5 rounded-full bg-orange-500 border-2 border-background"></div>
                          </div>
                          <span className="text-xs text-muted-foreground">{article.sources} sources</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                            className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                }}
                                className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  console.log("Save article", article.id)
                                }}
                              >
                                <Bookmark className="h-4 w-4 mr-2" />
                                Save
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setForwardingPost({ id: article.id, title: article.title })
                                }}
                              >
                                <Forward className="h-4 w-4 mr-2" />
                                Send
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Additional Articles (BBC Style - Full Width) */}
              <div className="space-y-8">
                {additionalArticles.map((article) => {
                  const isBeam = article.id === 6
                  return (
                    <Card
                      key={article.id}
                      className="overflow-hidden border-0 shadow-sm cursor-pointer hover:shadow-md transition-all"
                      onClick={() => router.push(`/visibility/social-tracker/${article.id}`)}
                    >
                      <div className="flex gap-6">
                        {/* Content - Left for BEAM, Right for others */}
                        <div className={cn("flex-1 p-6", isBeam ? "order-1" : "order-1")}>
                          <h2 className="text-2xl font-bold mb-3 leading-tight text-foreground">{article.title}</h2>
                          
                          {/* Published Time */}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Clock className="h-4 w-4" />
                            <span>{article.publishedTime}</span>
                          </div>

                          {/* Summary */}
                          <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                            {article.summary}
                          </p>

                          {/* Sources and Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center -space-x-2">
                                <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-medium border-2 border-background">
                                  G
                                </div>
                                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-medium border-2 border-background">
                                  B
                                </div>
                              </div>
                              <span className="text-sm text-muted-foreground">{article.sources} sources</span>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                }}
                                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                              >
                                <Heart className="h-5 w-5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setForwardingPost({ id: article.id, title: article.title })
                                }}
                                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                              >
                                <MoreHorizontal className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Image - Right for BEAM, Left for others */}
                        <div className={cn("w-80 shrink-0 relative", isBeam ? "order-2" : "order-0")}>
                          {article.id === 6 ? (
                            // BEAM - X/Twitter style: Modern tech announcement card
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg overflow-hidden border border-slate-700">
                              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                {/* Top: Logo/Brand */}
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <span className="text-white text-xl font-bold">B</span>
                                  </div>
                                  <div>
                                    <div className="text-white font-bold text-lg">BEAM</div>
                                    <div className="text-slate-400 text-xs">AI Platform</div>
                                  </div>
                                </div>
                                
                                {/* Bottom: Feature highlight */}
                                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                                  <div className="text-white text-sm font-semibold mb-1">Video → Games</div>
                                  <div className="text-slate-400 text-xs">No-code AI platform</div>
                                </div>
                              </div>
                              {/* Decorative elements */}
                              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                              <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>
                            </div>
                          ) : (
                            // GPT-5 - X/Twitter style: Product announcement card
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-blue-900 to-indigo-950 rounded-lg overflow-hidden border border-indigo-800">
                              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                {/* Top: Brand */}
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                    <span className="text-white text-xl font-bold">GPT</span>
                                  </div>
                                  <div>
                                    <div className="text-white font-bold text-lg">OpenAI</div>
                                    <div className="text-indigo-300 text-xs">GPT-5</div>
                                  </div>
                                </div>
                                
                                {/* Middle: Feature badge */}
                                <div className="flex items-center gap-2">
                                  <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                    <span className="text-white text-xs font-semibold">Enhanced Reasoning</span>
                                  </div>
                                </div>
                                
                                {/* Bottom: Stats */}
                                <div className="flex items-center gap-4">
                                  <div>
                                    <div className="text-white text-lg font-bold">5</div>
                                    <div className="text-indigo-300 text-xs">Version</div>
                                  </div>
                                  <div className="h-8 w-px bg-indigo-700"></div>
                                  <div>
                                    <div className="text-white text-lg font-bold">+40%</div>
                                    <div className="text-indigo-300 text-xs">Accuracy</div>
                                  </div>
                                </div>
                              </div>
                              {/* Decorative glow */}
                              <div className="absolute top-1/2 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  )
                  })}
              </div>
              </Fragment>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="w-80 shrink-0 space-y-6">
              {/* Expand Your Topics */}
              <Card className="p-5 border-0 shadow-sm">
                <h3 className="font-semibold mb-4">Expand Your Topics</h3>
                
                {/* Current Topics (Selected) */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">Current</p>
                  <div className="flex flex-wrap gap-2">
                    {websiteTopics.map((topic) => (
                      <button
                        key={topic.id}
                        className="px-3 py-1.5 rounded-full text-sm transition-colors bg-primary text-primary-foreground"
                      >
                        {topic.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Expand Recommended Topics */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-medium">Expand</p>
                  <div className="flex flex-wrap gap-2">
                    {industryTopics.map((topic) => (
                      <button
                        key={topic.id}
                        className="px-3 py-1.5 rounded-full text-sm transition-colors bg-muted text-muted-foreground hover:bg-muted/80"
                      >
                        {topic.name}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Related People */}
              <Card className="p-5 border-0 shadow-sm">
                <h3 className="font-semibold mb-4">Related People</h3>
                <div className="space-y-1">
                  {relatedPeople.map((person) => {
                    const article = allArticles.find(a => a.id === person.articleId)
                    const articleTitle = article?.title || "No article"
                    
                    return (
                      <div
                        key={person.id}
                        className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                        style={{
                          borderWidth: "0px",
                          borderColor: "rgba(0, 0, 0, 0)",
                          borderStyle: "none",
                          borderImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 1) 100%) 1",
                          backgroundClip: "unset",
                          WebkitBackgroundClip: "unset",
                          color: "rgba(10, 10, 10, 1)",
                          boxSizing: "content-box",
                          boxShadow: "none",
                        }}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold shrink-0">
                          {person.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <div className="text-sm font-medium truncate">{person.name}</div>
                            {person.verified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground truncate mb-0.5">{person.handle}</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              if (article) {
                                router.push(`/visibility/social-tracker/${article.id}`)
                              }
                            }}
                            className="text-xs text-primary hover:underline text-left line-clamp-2"
                            title={articleTitle}
                          >
                            {articleTitle}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Forward Modal */}
      <ForwardModal
        isOpen={!!forwardingPost}
        onClose={closeForwardModal}
        onSend={(message) => {
          console.log("Forwarding article", forwardingPost?.id, "with message:", message)
          closeForwardModal()
        }}
        context={forwardingPost ? {
          type: "social",
          title: forwardingPost.title,
          description: "Article from Social Tracker",
        } : undefined}
      />
    </DashboardLayout>
  )
}
