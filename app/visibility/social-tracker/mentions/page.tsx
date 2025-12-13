"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ForwardModal } from "@/components/forward-modal"
import {
  ArrowLeft,
  AtSign,
  Sparkles,
  Forward,
  Bookmark,
  ChevronRight,
  MessageSquare,
  Heart,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Brand mentions data (expanded)
const brandMentions = [
  {
    id: 101,
    platform: "reddit" as const,
    author: "marketing_pro",
    content: "Just tried @amplift for our SEO strategy - the AI recommendations are spot on! We've seen a 30% improvement in our AI visibility scores within the first month.",
    subreddit: "r/marketing",
    time: "1h ago",
    engagement: "45 upvotes",
    url: "https://reddit.com/r/marketing/comments/example1",
  },
  {
    id: 102,
    platform: "twitter" as const,
    author: "TechStartupCEO",
    handle: "@techstartupceo",
    content: "Impressed with @amplift's visibility tracking. Finally understand where we rank in AI results. Game changer for our content strategy!",
    time: "3h ago",
    engagement: "234 likes",
    url: "https://twitter.com/techstartupceo/status/example2",
  },
  {
    id: 103,
    platform: "reddit" as const,
    author: "seo_specialist",
    content: "Has anyone used @amplift? Thinking of switching from our current tool. Looking for real user experiences.",
    subreddit: "r/SEO",
    time: "5h ago",
    engagement: "23 upvotes",
    url: "https://reddit.com/r/SEO/comments/example3",
  },
  {
    id: 104,
    platform: "twitter" as const,
    author: "ContentMarketer",
    handle: "@contentpro",
    content: "The @amplift dashboard is incredibly intuitive. Finally a tool that shows how AI engines are citing our content. Highly recommend!",
    time: "6h ago",
    engagement: "156 likes",
    url: "https://twitter.com/contentpro/status/example4",
  },
  {
    id: 105,
    platform: "reddit" as const,
    author: "digital_agency_owner",
    content: "@amplift has become an essential part of our client reporting. The AI visibility metrics are unique in the market.",
    subreddit: "r/digitalmarketing",
    time: "8h ago",
    engagement: "67 upvotes",
    url: "https://reddit.com/r/digitalmarketing/comments/example5",
  },
  {
    id: 106,
    platform: "twitter" as const,
    author: "GrowthHacker",
    handle: "@growthhacker",
    content: "Just discovered @amplift through a colleague. The opportunity detection feature is brilliant - found 3 content gaps we never knew existed.",
    time: "10h ago",
    engagement: "89 likes",
    url: "https://twitter.com/growthhacker/status/example6",
  },
  {
    id: 107,
    platform: "reddit" as const,
    author: "saas_founder",
    content: "We've been using @amplift for 6 months now. AMA about how it's changed our content strategy and improved our AI citations.",
    subreddit: "r/SaaS",
    time: "12h ago",
    engagement: "112 upvotes",
    url: "https://reddit.com/r/SaaS/comments/example7",
  },
]

export default function MentionsPage() {
  const router = useRouter()
  const [bookmarked, setBookmarked] = useState<number[]>([])
  const [forwardingMention, setForwardingMention] = useState<typeof brandMentions[0] | null>(null)

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setBookmarked((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const navigateToPost = (mentionId: number) => {
    router.push(`/visibility/social-tracker/${mentionId}`)
  }

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="social-tracker">
      <BreadcrumbHeader items={["Home", "Visibility", "Social Tracker", "Mentions"]} />

      <div className="flex-1 overflow-auto p-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Social Tracker
        </Button>

        <div className="max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <AtSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="heading-xl mb-1">Mentions @amplift</h1>
              <p className="body-muted">Track all mentions of your brand across social platforms</p>
            </div>
            <Badge variant="secondary" className="ml-auto">{brandMentions.length} mentions</Badge>
          </div>

          {/* AI Summary */}
          <Card className="p-5 mb-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="card-title">AI Summary</h2>
            </div>
            <p className="body-muted leading-relaxed">
              Your brand is receiving positive sentiment across platforms. Key themes include:
              <strong> AI visibility tracking</strong>, <strong>content strategy improvements</strong>, and
              <strong> intuitive dashboard experience</strong>. Reddit discussions show strong engagement
              with questions about switching from other tools. Consider creating comparison content.
            </p>
          </Card>

          {/* Mentions List */}
          <div className="space-y-4">
            {brandMentions.map((mention) => (
              <Card
                key={mention.id}
                className="p-5 cursor-pointer hover:bg-accent/30 transition-colors"
                onClick={() => navigateToPost(mention.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium shrink-0">
                    {mention.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="body-text-sm font-medium">{mention.author}</span>
                      {mention.platform === "reddit" && (
                        <>
                          <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                            <span className="text-[6px] text-white font-bold">r/</span>
                          </div>
                          <span className="text-caption-muted">{mention.subreddit}</span>
                        </>
                      )}
                      {mention.platform === "twitter" && (
                        <>
                          <span className="font-bold text-sm">𝕏</span>
                          <span className="text-caption-muted">{mention.handle}</span>
                        </>
                      )}
                      <span className="text-caption-muted">· {mention.time}</span>
                    </div>
                    <p className="body-text-sm mb-3">{mention.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-caption-muted">
                          {mention.platform === "reddit" ? (
                            <MessageSquare className="h-4 w-4" />
                          ) : (
                            <Heart className="h-4 w-4" />
                          )}
                          <span>{mention.engagement}</span>
                        </div>
                        <a
                          href={mention.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-caption-muted hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>View</span>
                        </a>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => toggleBookmark(mention.id, e)}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                        >
                          <Bookmark className={cn("h-5 w-5", bookmarked.includes(mention.id) && "fill-current text-primary")} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setForwardingMention(mention)
                          }}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                        >
                          <Forward className="h-5 w-5" />
                        </button>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
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
        isOpen={!!forwardingMention}
        onClose={() => setForwardingMention(null)}
        onSend={(message) => {
          console.log("Forwarding mention", forwardingMention?.id, "with message:", message)
          setForwardingMention(null)
        }}
        context={forwardingMention ? {
          type: "social",
          title: forwardingMention.content.slice(0, 100) + "...",
          description: forwardingMention.author,
        } : undefined}
      />
    </DashboardLayout>
  )
}
