"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MoreHorizontal,
  Bookmark,
  Share2,
  Clock,
  Link2,
  Copy,
  Search,
  Grid3x3,
  Mic,
  Paperclip,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Lightbulb,
  Shuffle,
  Cpu,
  GitBranch,
  AtSign,
  ChevronDown,
  ArrowUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock post data
const postsData: Record<string, {
  id: number
  title: string
  content: string
  publishedTime: string
  sources: number
  sourceTags: Array<{ text: string; count: number; domain: string }>
  relatedSources: Array<{ id: number; icon: string; title: string; domain: string }>
  keyUpdates: Array<string>
  relatedArticles: Array<{ id: number; image: string; title: string; description: string; date: string }>
}> = {
  "1": {
    id: 1,
    title: "AI and chip industry ETFs surge as technology breakthroughs boost market sentiment",
    content: `On December 12, ETFs focusing on artificial intelligence and the chip industry chain in Hong Kong stocks and A-share markets surged significantly, indicating continued market optimism about the prospects of the AI industry. Multiple related ETFs and individual stocks performed strongly, reflecting investors' growing confidence in this sector.

Boosted by news such as OpenAI's release of the GPT-5.2 model and breakthroughs in domestic AI chip technology, the Hong Kong Stock Information Technology ETF (159131) fluctuated higher throughout the day, closing up 2.07% with increased volume, with a single-day trading volume of 82.28 million yuan, recovering both the 5-day and 10-day moving averages in one go. The ETF was established on November 5, 2025, and is the first ETF in the entire market focusing on the "Hong Kong stock chip" industry chain. Its underlying index consists of "70% hardware + 30% software," with Semiconductor Manufacturing International Corporation weighted at 20.48%, Xiaomi Corporation-W weighted at 9.53%, and Hua Hong Semiconductor weighted at 5.80%.

In the A-share market, the Chip ETF Tianhong (159310) closed up 1.80%, with a trading volume of 10.9684 million yuan, while the CSI Chip Industry Index it tracks rose 1.8%. Individual stocks performed even more impressively, with Yandong Microelectronics up over 17%, Skyverse Technology up over 10%, and TYSiC, Piotech, and VeriSilicon among the top gainers. Hong Kong stock chip industry chain fluctuated higher in the afternoon, with Forbo Group up over 6%, TYSiC up over 5%, and SenseTime-W, Meitu, and Hongteng Precision up over 4%.

The catalyst for the market rise mainly comes from recent major AI technology advancements. OpenAI officially released the GPT-5.2 series models on December 11, which is the company's most advanced artificial intelligence model to date, comprehensively optimized for professional work scenarios and setting industry records across multiple benchmark tests. This move has boosted sentiment in the AI sector.

What is even more noteworthy is the technological breakthrough in the domestic AI chip field. DeepSeek-V3.1's special design using UE8M0 FP8 parameter precision for next-generation domestic chips will accelerate the large-scale deployment of domestic AI chips in the future inference-dominated market. Additionally, TileLang, a programming language launched by Peking University specifically designed for AI operator development, is expected to help domestic AI chips establish a mature software ecosystem and significantly lower the development threshold for domestic chip operators.

Brokerage institutions are generally optimistic about the development prospects of the AI and chip industry chain. Western Securities analysis suggests that with computing power as the foundation, model advancement, and promising applications, specific attention can be paid to AI chips, DeepSeek-V3.1 design, and domestic computing power directions. Pacific Securities states that as AI technology deeply penetrates and scenarios continue to expand, AI technology is accelerating the empowerment of electronic terminal equipment upgrades, driving breakthroughs in new display technologies, and the domestic electronic technology industry chain will gain structural growth opportunities.

Regarding the broader market, Hong Kong's Hang Seng Index rose 446.28 points on the 12th, up 1.75%, closing at 25,976.79 points; the Hang Seng Tech Index rose 103.46 points, closing at 5,638.05 points, up 1.87%. Hong Kong technology stocks collectively strengthened, with SenseTime-W and Horizon Robotics rising over 4%, while Xiaomi Corporation-W, Li Auto-W, ZTE Corporation and others rose over 2%.

China Galaxy Securities previously pointed out that "artificial intelligence" has been emphasized in important meetings for two consecutive years, confirming its strategic position as a leading and disruptive technology, as well as China's current main direction for the integration of technology and industry.`,
    publishedTime: "22 hours ago",
    sources: 8,
    sourceTags: [
      { text: "moomoo", count: 1, domain: "moomoo.com" },
      { text: "reuters", count: 1, domain: "reuters.com" },
      { text: "fxbaogao", count: 1, domain: "fxbaogao.com" },
      { text: "aastocks", count: 1, domain: "aastocks.com" },
    ],
    relatedSources: [
      { id: 1, icon: "M", title: "moomoo.com: AI Technology Breakthrough Boosts Market Sentiment", domain: "moomoo.com" },
      { id: 2, icon: "R", title: "reuters.com: Institutions are optimistic about the industrial chain prospects", domain: "reuters.com" },
      { id: 3, icon: "F", title: "fxbaogao.com: ETF performance analysis", domain: "fxbaogao.com" },
      { id: 4, icon: "A", title: "aastocks.com: Market sentiment and stock performance", domain: "aastocks.com" },
      { id: 5, icon: "+", title: "+4 sources", domain: "" },
    ],
    keyUpdates: [
      "AI Technology Breakthrough Boosts Market Sentiment",
      "Institutions Optimistic About Industrial Chain Prospects",
    ],
    relatedArticles: [
      {
        id: 1,
        image: "/placeholder-person.jpg",
        title: "OpenAI launches GPT-5.2 amid growing competition",
        description: "OpenAI released GPT-5.2 on Thursday, its latest language model with enhanced reasoning capabilities.",
        date: "2 days ago",
      },
      {
        id: 2,
        image: "/placeholder-phone.jpg",
        title: "Tencent releases Hunyuan 2.0 AI model",
        description: "Tencent on December 5 released Hunyuan 2.0, its advanced AI model targeting enterprise applications.",
        date: "3 days ago",
      },
      {
        id: 3,
        image: "/placeholder-person2.jpg",
        title: "Google launches Gemini 3 Deep Think mode",
        description: "Google on December 4 launched Gemini 3 Deep Think, a new reasoning mode for its AI assistant.",
        date: "4 days ago",
      },
      {
        id: 4,
        image: "/placeholder-aws.jpg",
        title: "Amazon unveils AI tools to speed up development",
        description: "Amazon Web Services announced Tuesday at re:Invent new AI development tools for faster deployment.",
        date: "5 days ago",
      },
    ],
  },
  "3": {
    id: 3,
    title: "Vanguard calls Bitcoin a 'toy' while opening platform to crypto ETFs",
    content: `Vanguard has made headlines by calling Bitcoin a 'toy' while simultaneously opening its platform to crypto ETFs. This contradictory move has sparked debate in the financial community. The investment giant's CEO made the controversial statement during a recent earnings call, describing cryptocurrency as a speculative asset rather than a serious investment vehicle. However, just weeks later, the company announced it would begin offering crypto ETF products to its clients. This apparent contradiction has left many investors confused about the firm's true stance on digital assets. Financial analysts are divided on whether this represents a strategic pivot or simply an acknowledgment of client demand. Some see it as a pragmatic move to capture market share in the growing crypto investment space, while others view it as inconsistent messaging that could erode trust. The decision comes as major financial institutions increasingly embrace cryptocurrency products despite ongoing regulatory uncertainty.`,
    publishedTime: "4 hours ago",
    sources: 56,
    sourceTags: [
      { text: "vanguard", count: 2, domain: "vanguard.com" },
      { text: "reuters", count: 2, domain: "reuters.com" },
    ],
    relatedSources: [
      { id: 1, icon: "V", title: "Vanguard: Our stance on cryptocurrency investments", domain: "vanguard.com" },
      { id: 2, icon: "R", title: "Reuters: Vanguard's crypto ETF decision", domain: "reuters.com" },
      { id: 3, icon: "C", title: "+54 sources", domain: "" },
    ],
    keyUpdates: [
      "Market Impact Analysis",
      "Investor Reactions",
    ],
    relatedArticles: [
      {
        id: 1,
        image: "/placeholder-bitcoin.jpg",
        title: "Bitcoin reaches new all-time high",
        description: "Bitcoin surged past $90,000 as institutional adoption continues to grow.",
        date: "1 day ago",
      },
      {
        id: 2,
        image: "/placeholder-etf.jpg",
        title: "SEC approves new crypto ETF applications",
        description: "The SEC has approved several new cryptocurrency ETF applications from major financial institutions.",
        date: "2 days ago",
      },
    ],
  },
  "4": {
    id: 4,
    title: "Tech sector cuts 120,000 jobs in AI-driven restructuring",
    content: `The technology sector has announced 120,000 job cuts as companies restructure to focus on AI capabilities. This represents the largest wave of tech layoffs in recent years. Major tech companies including Google, Microsoft, and Amazon have all announced significant workforce reductions as they pivot resources toward AI development and automation. The layoffs span multiple departments, with marketing, sales, and customer support roles being particularly affected. Industry experts attribute this trend to companies seeking to reduce costs while investing heavily in AI infrastructure and talent. The restructuring reflects a fundamental shift in how tech companies operate, with automation replacing many traditional roles. Workers in affected positions are facing a challenging job market as demand shifts toward AI-related skills. Labor unions and worker advocacy groups have raised concerns about the pace and scale of these layoffs, calling for better support and retraining programs for displaced workers.`,
    publishedTime: "6 hours ago",
    sources: 72,
    sourceTags: [
      { text: "techcrunch", count: 4, domain: "techcrunch.com" },
      { text: "bloomberg", count: 2, domain: "bloomberg.com" },
    ],
    relatedSources: [
      { id: 1, icon: "T", title: "TechCrunch: Tech layoffs reach record high", domain: "techcrunch.com" },
      { id: 2, icon: "B", title: "Bloomberg: AI restructuring impacts tech jobs", domain: "bloomberg.com" },
      { id: 3, icon: "W", title: "+70 sources", domain: "" },
    ],
    keyUpdates: [
      "Industry Analysis",
      "Worker Impact Assessment",
    ],
    relatedArticles: [
      {
        id: 1,
        image: "/placeholder-layoffs.jpg",
        title: "AI automation displaces traditional roles",
        description: "Companies are increasingly using AI to automate tasks previously done by human workers.",
        date: "1 week ago",
      },
    ],
  },
}

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params.id as string

  const post = postsData[postId] || postsData["1"]
  const [bookmarked, setBookmarked] = useState(false)

  // Render content with inline source tags
  const renderContentWithTags = (content: string, tags: typeof post.sourceTags) => {
    const parts: React.ReactNode[] = []
    let processedContent = content
    let keyCounter = 0

    // Process each tag
    tags.forEach((tag) => {
      const regex = new RegExp(`\\b${tag.text}\\b`, 'gi')
      const matches = [...processedContent.matchAll(regex)]
      
      if (matches.length > 0) {
        // Replace first occurrence with badge
        const firstMatch = matches[0]
        const beforeMatch = processedContent.substring(0, firstMatch.index)
        const afterMatch = processedContent.substring((firstMatch.index || 0) + firstMatch[0].length)
        
        if (beforeMatch) {
          parts.push(beforeMatch)
        }
        
        parts.push(
          <Badge
            key={`tag-${keyCounter++}`}
            variant="secondary"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs font-medium cursor-pointer hover:bg-gray-200 transition-colors border-0 mx-1"
          >
            {tag.text}
            <span className="text-gray-500">+{tag.count}</span>
          </Badge>
        )
        
        processedContent = afterMatch
      }
    })
    
    if (processedContent) {
      parts.push(processedContent)
    }
    
    return parts.length > 0 ? parts : content
  }

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="social-tracker">
      <div className="flex flex-col h-full">
        {/* Top Header Bar */}
        <div
          className="flex items-center justify-between px-4 py-1 border-b border-border bg-background"
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
          <button
            onClick={() => router.push("/visibility/social-tracker")}
            className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
          >
            Social Tracker
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Bookmark className={cn("h-5 w-5", bookmarked && "fill-current text-primary")} />
            </button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex gap-8">
              {/* Left Column - Main Article Content */}
              <div
                className="flex-1 min-w-0 relative"
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
                {/* Article Title */}
                <h1 className="text-4xl font-serif font-bold mb-6 leading-tight text-foreground">
                  {post.title}
                </h1>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none mb-8">
                  <div className="text-base leading-relaxed text-foreground">
                    {renderContentWithTags(post.content, post.sourceTags)}
                  </div>
                </div>

                {/* Metadata Row */}
                <div
                  className="flex items-center justify-between mb-6 pb-6"
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
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
                      R
                    </div>
                    <span className="text-sm text-muted-foreground">{post.sources} sources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Published {post.publishedTime}</span>
                  </div>
                </div>

                {/* Additional Content Section */}
                <div className="mb-8 space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">
                      <span className="font-medium text-foreground">moomoo.com</span>
                    </p>
                    <h3 className="text-base font-semibold text-foreground mb-2">AI Technology Breakthrough Boosts Market Sentiment</h3>
                    <p className="text-sm leading-relaxed mb-4">
                      The catalyst for the market rise mainly comes from recent major AI technology advancements. OpenAI officially released the GPT-5.2 series models on December 11, which is the company's most advanced artificial intelligence model to date, comprehensively optimized for professional work scenarios and setting industry records across multiple benchmark tests. This move has boosted sentiment in the AI sector.
                    </p>
                    <p className="text-sm leading-relaxed mb-4">
                      What is even more noteworthy is the technological breakthrough in the domestic AI chip field. DeepSeek-V3.1's special design using UE8M0 FP8 parameter precision for next-generation domestic chips will accelerate the large-scale deployment of domestic AI chips in the future inference-dominated market. Additionally, TileLang, a programming language launched by Peking University specifically designed for AI operator development, is expected to help domestic AI chips establish a mature software ecosystem and significantly lower the development threshold for domestic chip operators.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                      <span>reuters.com</span>
                      <span className="text-muted-foreground/50">•</span>
                      <span>8 sources</span>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground pt-4 border-t border-border">
                    <h3 className="text-base font-semibold text-foreground mb-2">Institutions are optimistic about the industrial chain prospects</h3>
                    <p className="text-sm leading-relaxed mb-4">
                      Brokerage institutions are generally optimistic about the development prospects of the AI and chip industry chain. Western Securities analysis suggests that with computing power as the foundation, model advancement, and promising applications, specific attention can be paid to AI chips, DeepSeek-V3.1 design, and domestic computing power directions. Pacific Securities states that as AI technology deeply penetrates and scenarios continue to expand, AI technology is accelerating the empowerment of electronic terminal equipment upgrades, driving breakthroughs in new display technologies, and the domestic electronic technology industry chain will gain structural growth opportunities.
                    </p>
                    <p className="text-sm leading-relaxed mb-4">
                      Regarding the broader market, Hong Kong's Hang Seng Index rose 446.28 points on the 12th, up 1.75%, closing at 25,976.79 points; the Hang Seng Tech Index rose 103.46 points, closing at 5,638.05 points, up 1.87%. Hong Kong technology stocks collectively strengthened, with SenseTime-W and Horizon Robotics rising over 4%, while Xiaomi Corporation-W, Li Auto-W, ZTE Corporation and others rose over 2%.
                    </p>
                    <p className="text-sm leading-relaxed mb-4">
                      China Galaxy Securities previously pointed out that "artificial intelligence" has been emphasized in important meetings for two consecutive years, confirming its strategic position as a leading and disruptive technology, as well as China's current main direction for the integration of technology and industry.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                      <span>fxbaogao.com</span>
                      <span className="text-muted-foreground/50">•</span>
                      <span>aastocks.com</span>
                      <span className="text-muted-foreground/50">•</span>
                      <span>8 sources</span>
                    </div>
                  </div>
                </div>


                {/* Related Sources Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-foreground" />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {post.relatedSources.map((source) => (
                      <Card
                        key={source.id}
                        className="min-w-[200px] p-3 cursor-pointer hover:shadow-md transition-all border-0 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                            {source.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium line-clamp-2">{source.title}</p>
                            {source.domain && (
                              <p className="text-[10px] text-muted-foreground mt-0.5">{source.domain}</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>


                {/* Fixed Bottom Ask Follow-up Input - Inside Article Content Area */}
                <div className="sticky bottom-0 mt-8 pt-4 bg-background z-10">
                  <div className="relative bg-white rounded-2xl border-2 border-primary shadow-sm p-4">
                    <Input
                      placeholder="add a follow-up"
                      className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base pl-0 pr-0 bg-transparent mb-2"
                    />
                    <div
                      className="flex items-center justify-between"
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
                      {/* Left: Skills Dropdown */}
                      <button className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
                        <span>Skills</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {/* Right: Icons */}
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                          <AtSign className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                          <Paperclip className="h-4 w-4" />
                        </button>
                        <button className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
                          <ArrowUp className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Key Updates Sidebar */}
              <div className="w-64 shrink-0">
                <div className="sticky top-8">
                  <div className="border-l border-border pl-6">
                    <h3 className="text-sm font-semibold mb-4">{post.keyUpdates[0]}</h3>
                    <div className="space-y-3">
                      {post.keyUpdates.slice(1).map((update, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground">
                          {update}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Discover More Section */}
                  <div
                    className="mt-8"
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
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h2 className="text-lg font-semibold">Discover more</h2>
                    </div>
                    <div className="space-y-2">
                      {post.relatedArticles.map((article) => (
                        <Card
                          key={article.id}
                          className="cursor-pointer hover:shadow-lg transition-all border-0 shadow-sm overflow-hidden"
                          onClick={() => router.push(`/visibility/social-tracker/${article.id}`)}
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
                          <div className="flex gap-2 p-2">
                            {/* Left: Image */}
                            <div className="w-14 h-14 shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  {article.title.charAt(0)}
                                </span>
                              </div>
                            </div>
                            {/* Right: Text Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xs font-bold mb-0.5 line-clamp-2 leading-snug">{article.title}</h3>
                              <p className="text-[10px] text-muted-foreground line-clamp-2 mb-0.5">{article.description}</p>
                              <p className="text-[10px] text-muted-foreground">{article.date}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
