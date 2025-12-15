"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ForwardModal } from "@/components/forward-modal"
import {
  ArrowLeft,
  TrendingUp,
  Forward,
  Sparkles,
  ExternalLink,
  Heart,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock trends data
const trendsData: Record<string, {
  id: number
  topic: string
  category: string
  tweets: string
  summary: string
  topPosts: Array<{
    id: number
    author: string
    handle?: string
    content: string
    likes: string
    comments?: string
    time: string
    url: string
  }>
}> = {
  "1": {
    id: 1,
    topic: "#AI",
    category: "Technology",
    tweets: "1.2M",
    summary: "AI discussions are surging with focus on practical applications, ethical considerations, and integration into business workflows. Key themes include automation, machine learning adoption, and the future of work.",
    topPosts: [
      {
        id: 1,
        author: "AI Researcher",
        handle: "@airesearcher",
        content: "The latest breakthroughs in transformer architectures are changing how we think about AI scalability. Here's what you need to know...",
        likes: "12.3K",
        comments: "234",
        time: "2h ago",
        url: "https://twitter.com/airesearcher/status/1",
      },
      {
        id: 2,
        author: "Tech CEO",
        handle: "@techceo",
        content: "We've integrated AI into our product pipeline and seen 40% efficiency gains. The key is starting small and iterating.",
        likes: "8.9K",
        comments: "156",
        time: "4h ago",
        url: "https://twitter.com/techceo/status/2",
      },
      {
        id: 3,
        author: "ML Engineer",
        handle: "@mlengineer",
        content: "Just released an open-source tool for fine-tuning LLMs. Check it out if you're working on custom AI models.",
        likes: "5.2K",
        comments: "89",
        time: "6h ago",
        url: "https://twitter.com/mlengineer/status/3",
      },
    ],
  },
  "news-1": {
    id: 101,
    topic: "Vercel Announces Next.js 16",
    category: "Technology",
    tweets: "234K",
    summary: "Vercel's announcement of Next.js 16 with stable Turbopack has generated significant discussion in the developer community. Key points include improved build times, React 19 integration, and enhanced developer experience.",
    topPosts: [
      {
        id: 1,
        author: "Vercel",
        handle: "@vercel",
        content: "We're excited to announce Next.js 16 with stable Turbopack! Build times are now 60% faster. Check out the release notes.",
        likes: "15.2K",
        comments: "456",
        time: "2h ago",
        url: "https://twitter.com/vercel/status/news1",
      },
      {
        id: 2,
        author: "Tech News",
        handle: "@technews",
        content: "Breaking: Next.js 16 released with major performance improvements. This could change how we build web apps.",
        likes: "9.8K",
        comments: "234",
        time: "3h ago",
        url: "https://twitter.com/technews/status/news2",
      },
    ],
  },
}

export default function TrendDetailPage() {
  const params = useParams()
  const router = useRouter()
  const trendId = params.id as string
  const trend = trendsData[trendId]

  const [forwardingTrend, setForwardingTrend] = useState(false)

  if (!trend) {
    return (
      <DashboardLayout currentSection="visibility" currentSubSection="social-tracker">
        <BreadcrumbHeader items={["Home", "Visibility", "Social Tracker", "Trend"]} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="heading-lg mb-2">Trend not found</h2>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="social-tracker">
      <BreadcrumbHeader items={["Home", "Visibility", "Social Tracker", "Trend"]} />

      <div className="flex-1 overflow-auto p-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to feed
        </Button>

        {/* Two Column Layout */}
        <div className="flex gap-6">
          {/* Left Column - Trend Content & Posts */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Trend Header */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="heading-xl mb-1">{trend.topic}</h1>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{trend.category}</Badge>
                      <span className="body-text-sm text-muted-foreground">{trend.tweets} tweets</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setForwardingTrend(true)}
                >
                  <Forward className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </Card>

            {/* Top Posts */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="card-title">Top Posts</h2>
                <Badge variant="secondary">{trend.topPosts.length} posts</Badge>
              </div>
              <div className="space-y-4">
                {trend.topPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-lg border hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <span className="body-text-sm font-medium">{post.author}</span>
                          {post.handle && (
                            <span className="body-text-sm text-muted-foreground ml-2">{post.handle}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-caption-muted">{post.time}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setForwardingTrend(true)}
                          className="h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Forward className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="body-text-sm mb-3">{post.content}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-caption-muted">
                        <Heart className="h-3 w-3" />
                        <span>{post.likes}</span>
                      </div>
                      {post.comments && (
                        <div className="flex items-center gap-1 text-caption-muted">
                          <MessageSquare className="h-3 w-3" />
                          <span>{post.comments}</span>
                        </div>
                      )}
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-caption-muted hover:text-primary transition-colors ml-auto"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - AI Summary */}
          <div className="w-80 shrink-0">
            <Card className="p-4 bg-primary/5 border-primary/20 sticky top-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="card-title">AI Summary</h2>
              </div>
              <p className="body-muted leading-relaxed">{trend.summary}</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Amplift AI Floating Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-40"
        onClick={() => {
          console.log("Open Amplift AI")
        }}
        title="Amplift AI"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Forward Modal */}
      <ForwardModal
        isOpen={forwardingTrend}
        onClose={() => setForwardingTrend(false)}
        onSend={(message) => {
          console.log("Forwarding trend", trendId, "with message:", message)
          setForwardingTrend(false)
        }}
        context={{
          type: "social",
          title: trend.topic,
          description: trend.summary,
        }}
      />
    </DashboardLayout>
  )
}




