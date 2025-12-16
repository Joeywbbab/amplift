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
  MessageSquare,
  Forward,
  Sparkles,
  ExternalLink,
  Heart,
  Users,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock discussions data with comprehensive analysis format
const discussionsData: Record<string, {
  id: number
  title: string
  topic: string
  description: string
  subreddits: string[]
  analysisDate: string
  dataCollectionPeriod: string
  totalPostsAnalyzed: number
  subredditsCovered: number
  executiveSummary: string
  keyInsights: string[]
  popularTools: Array<{
    name: string
    mentions: number
    sentiment: "very_positive" | "positive" | "neutral" | "negative" | "very_negative"
    keyFeatures: string[]
    communityQuotes: string[]
  }>
  userSentiment: {
    overall: string
    positive: string[]
    negative: string[]
    communityVoices: Array<{
      sentiment: "positive" | "negative" | "neutral" | "very_positive"
      quote: string
      context: string
    }>
  }
  useCases: {
    primary: string[]
    industries: Array<{ name: string; subreddits: string[] }>
    creative: string[]
  }
  technicalChallenges: {
    limitations: string[]
    qualityIssues: string[]
    technicalBarriers: string[]
    workarounds: string[]
  }
  pricing: {
    freeVsPaid: string
    valuePerception: string
    concerns: string[]
    barriers: string[]
  }
  comparisons: {
    themes: string[]
    favorites: Array<{ category: string; tool: string; reason: string }>
    headToHead: string[]
  }
  futureTrends: {
    predictions: string[]
    emergingFeatures: string[]
    expectations: string[]
    concerns: string[]
  }
  dataSources: {
    subreddits: Array<{ name: string; mentions: number }>
  }
  topPosts: Array<{
    id: number
    author: string
    handle?: string
    content: string
    upvotes: string
    comments?: string
    time: string
    url: string
    subreddit: string
  }>
  summary: string
}> = {
  "1": {
    id: 1,
    title: "AI Video Generation on Reddit: Comprehensive Analysis",
    topic: "AI Video Tools",
    description: "Comprehensive analysis of AI video generation tools based on Reddit discussions, covering popular tools, user sentiment, use cases, and future trends.",
    subreddits: ["r/StableDiffusion", "r/singularity", "r/generativeAI", "r/AIAssisted"],
    analysisDate: "December 13, 2025",
    dataCollectionPeriod: "Past Week & Past Month",
    totalPostsAnalyzed: 161,
    subredditsCovered: 18,
    executiveSummary: "Across 161 recent Reddit posts, Runway (especially Gen‑4.5), Sora, Veo 3/3.1, Kling 2.6/O1, Pika Labs, and Wan 2.2 are the core benchmarks people compare. Runway Gen‑4.5 and Sora are framed as top-tier quality; Veo and Kling as strong commercial peers; Wan 2.2 as the leading open-source option; and tools like InVideo, Canva, OpusClip, Synthesia, HeyGen, and Viggle as workflow-specific complements (social clips, avatars, presentations, etc.).",
    keyInsights: [
      "Runway Gen‑4.5 and OpenAI's Sora currently anchor the community's mental 'quality bar' for AI video, with Veo and Kling close behind; most other tools are evaluated relative to these leaders.",
      "Despite hype, the practical bottlenecks for everyday creators are clip length, cost per generation, and the difficulty of building coherent multi-scene stories with consistent characters.",
      "Open-source models like Wan 2.2 and Wan‑Move are strategically important: they give power users a way around credit systems and policy restrictions, at the cost of higher technical complexity.",
      "User sentiment is not simply 'pro' or 'anti' AI video; it's bifurcated between excitement about cinematic quality and anxiety about deepfakes, misleading 'free' marketing, and platforms not fitting real-world workflows (especially for social media managers).",
    ],
    popularTools: [
      {
        name: "Runway (Gen‑3 / Gen‑4.5)",
        mentions: 18,
        sentiment: "very_positive",
        keyFeatures: [
          "State-of-the-art text-to-video quality",
          "New Gen‑4.5 model topping public benchmarks over Veo 3 and Sora 2 Pro",
          "Cinematic look, advanced controls, better motion control",
          "Native / synchronized audio support",
          "Used for filmmaking, marketing, and creative shorts",
        ],
        communityQuotes: [
          "Runway just dropped Gen 4.5, their newest video model, and made it available to every user across all plans with no restrictions.",
          "Runway rolls out new AI video model that beats Google, OpenAI in key benchmark",
          "Runway has introduced Gen-4.5, a major leap in AI video generation with cinematic quality, advanced controls, and the highest score (1,247) on the ...",
        ],
      },
      {
        name: "OpenAI Sora / Sora 2",
        mentions: 12,
        sentiment: "very_positive",
        keyFeatures: [
          "Perceived gold standard for realism and physics",
          "Strong image-to-video for turning photos into scenes",
          "High-end but limited-access model",
          "Now being commercialized via Disney / media partnerships",
        ],
        communityQuotes: [
          "Sora (by OpenAI) What it does: The gold standard for generating high-fidelity, realistic video clips from text. Cool stuff: Unmatched physics simulation, ...",
          "Sora has been the best AI I've found for that so far. You can look up Sora for All as a way of getting an invite code and signing up for it.",
        ],
      },
      {
        name: "Google Veo (Veo 3 / 3.1)",
        mentions: 9,
        sentiment: "positive",
        keyFeatures: [
          "High-quality cinematic text-to-video",
          "Strong physics and motion; often benchmarked vs Runway and Sora",
          "Veo 3.1 commonly recommended as top closed-source option",
          "Audio generation (Veo 3 mentioned in context of video+audio)",
        ],
        communityQuotes: [
          "As far as open-source, you'll want to get ComfyUI and use Wan 2.2. with a first-frame last-frame workflow. For closed-source, you're gonna want Veo 3.1, in ...",
        ],
      },
    ],
    userSentiment: {
      overall: "cautiously_optimistic",
      positive: [
        "Huge leap in visual quality: multiple posts describe recent models (Sora 2, Runway Gen‑4.5, Kling 2.6) as 'insanely good' or 'cinematic'.",
        "New capabilities like synchronized audio are exciting: 'Four major video AI models shipped synchronized audio in 72 hours.'",
        "Open-source options (Wan 2.2, Wan‑Move) are appreciated for cost control and freedom from platform policies.",
      ],
      negative: [
        "Pricing confusion and hidden limits (credits, paywalls, strict clip durations).",
        "Difficulty making longer, multi-scene, narrative videos with consistent characters and timelines.",
        "Results still often look uncanny or 'fake', especially faces, motion, and physics in cheaper models.",
      ],
      communityVoices: [
        {
          sentiment: "negative",
          quote: "Most professional tools give you about 4-5 seconds of video per generation. To make 6 minutes (360 seconds), you need ~72 successful clips. In reality, AI ...",
          context: "User trying to make a 6-minute YouTube video and realizing how many paid generations are needed.",
        },
        {
          sentiment: "neutral",
          quote: "Video generation is very resource intensive, nobody's going to give away that much compute for free, there's no incentive. Running Wan 2.2 locally is currently ...",
          context: "Explaining why 'completely free' text-to-video tools are unrealistic and recommending local Wan 2.2 instead.",
        },
        {
          sentiment: "negative",
          quote: "Why almost every ai video generator is never free but always advertize or say that they are free?",
          context: "Frustration with misleading 'free' marketing that hides credit caps or watermarks.",
        },
      ],
    },
    useCases: {
      primary: [
        "Short-form social content (TikTok, Instagram Reels, YouTube Shorts) – clips, memes, UGC-style ads.",
        "Faceless YouTube and passive income channels – auto-generated explainer, listicle, or story videos.",
        "Marketing and paid ads – especially TikTok/IG ad creatives and UGC-like product videos.",
        "Filmmaking and storytelling – AI short films, animated series concepts, cinematic visual experiments.",
      ],
      industries: [
        { name: "Digital marketing and performance ads", subreddits: ["r/DigitalMarketing", "r/AskMarketing", "r/b2bmarketing"] },
        { name: "Solo creators, YouTubers, content creators", subreddits: ["r/ContentCreators", "r/passive_income", "r/AIAssisted"] },
        { name: "Film and video production", subreddits: ["r/Filmmakers", "r/VideoEditors"] },
        { name: "SaaS and startups building AI video tools", subreddits: ["r/startup", "r/SaaS", "r/aiprojects", "r/ProductivityApps"] },
      ],
      creative: [
        "AI-powered animated series and short films: 'I'm working on an AI-powered animated series with Midjourney i2v — and I think this transition turned out pretty smooth'.",
        "Faceless YouTube automation: 'I Made a Full Faceless YouTube Video in 10 Minutes (FREE ...)' with lists of '15 Best AI Video Generator' and '5 AI Tools to Create Faceless YouTube Videos in 2025.'",
        "Music videos for AI songs (Suno): 'What music video generator are you all using? I have heard of OneMoreShot.ai but is it any good?'",
      ],
    },
    technicalChallenges: {
      limitations: [
        "Clip duration is short (often 4–5 seconds), forcing users to stitch many clips for longer videos.",
        "Multi-scene storytelling with consistent characters is hard; tools are optimized for single clips, not timelines.",
        "Local deployment requires significant compute and know-how (GPU specs, ComfyUI, diffusers).",
      ],
      qualityIssues: [
        "Uncanny or 'fake' look in faces and motion: users call results 'hit-or-miss' and ask 'Why does AI video generation look so fake sometimes?'",
        "Character consistency between shots is weak, making narrative content and recurring characters difficult.",
      ],
      technicalBarriers: [
        "Running open-source models like Wan 2.2 locally demands GPUs and configuration (ComfyUI, diffusers).",
        "Desktop seekers face limited options: 'Any good desktop AI video tools? Getting tired of browser- ... I've been using Freepik and Artlist for AI video generation and they're fine, but everything being web-based is getting annoying.'",
      ],
      workarounds: [
        "Stitching many short clips together in a video editor for longer content (e.g., ~72 clips for a 6-min video).",
        "Running Wan 2.2 and related models locally via ComfyUI or diffusers to avoid credit limits and censorship.",
        "Combining multiple models inside one platform (e.g., Sora 2 + Veo 3.1 + Nano Banana; Kling + Wan in Pykaso AI) to leverage each model's strengths.",
      ],
    },
    pricing: {
      freeVsPaid: "There is a clear tension between the desire for free experimentation and the reality of video compute costs. Several threads debunk the idea of truly free, unlimited, high-quality video gen: 'Video generation is very resource intensive, nobody's going to give away that much compute for free, there's no incentive.' Practical advice leans toward either (1) using limited freemium tiers of tools like InVideo, Canva, VEED, Adobe Firefly, HeyOZ, Viggle, A2E.ai, or (2) investing in local setups (Wan 2.2) to eliminate per-clip charges. A notable outlier is Grok's 'free and no limit' video generation, which users praise but also question for long-term sustainability.",
      valuePerception: "Value is perceived highest where tools either (a) deliver top-tier quality/controls (Runway Gen‑4.5, Sora, Veo), or (b) bundle many capabilities at a fair price (SocialSight AI, Moonlite Labs, Agent Opus, all‑in‑one SaaS tools). SocialSight AI is literally described as 'the best value' and Runway Gen‑4.5 is applauded for making the flagship model available 'to every user across all plans'. In contrast, tools that aggressively upsell after a tiny free allowance generate frustration.",
      concerns: [
        "Freemium tools heavily restrict length, quality, or number of generations (often '1 free video' per tool).",
        "Users resent tools marketed as 'free' that quickly hit paywalls: 'Why almost every ai video generator is never free but always advertize or say that they are free?'",
      ],
      barriers: [
        "Access-gated models like Sora (invite codes, platform partnerships) limit who can use the best quality models.",
        "Compute access: users without strong GPUs can't realistically run open-source video models locally.",
      ],
    },
    comparisons: {
      themes: [
        "Quality vs speed vs cost: Sora/Runway/Veo/Kling vs cheaper/freemium tools.",
        "Closed-source SaaS vs open-source local (Wan 2.2, Wan-Move).",
        "Beginner-friendly script-to-video tools (InVideo, Canva, Agent Opus) vs pro workflows (Runway, Veo, Sora).",
      ],
      favorites: [
        { category: "Best Quality", tool: "Sora", reason: "Ultimate fidelity and physics ('gold standard'), with Runway Gen‑4.5 currently leading public benchmarks over Veo 3 and Sora 2 Pro." },
        { category: "Best Value", tool: "SocialSight AI", reason: "Explicitly rated '4.9/5.0' and called 'the best value and access to multiple models for both video and image generation.'" },
      ],
      headToHead: [
        "'AI video generators for social media - Runway vs Pika vs Synthesia for marketing content' compares cinematic flexibility (Runway), creative clips (Pika), and avatar-based explainers (Synthesia).",
        "B2B marketing advice: 'Runway is great for generating nicer-looking shots, InVideo is good if you want something simple that turns a script into a video fast, and Canva's AI video ...' – trade-off between quality vs simplicity.",
      ],
    },
    futureTrends: {
      predictions: [
        "AI-generated video will deeply transform platforms like YouTube: 'YouTube is going to turn into on demand video generation. I think we'll see AI content creators within the next 2 years and full AI customized video feeds ...'",
        "AI will enable fully AI-driven content creators and personalized feeds, reducing the barrier to video production to just prompts or preferences.",
      ],
      emergingFeatures: [
        "Native synchronized audio shipping across multiple models: 'Four major video AI models shipped synchronized audio in 72 hours. Kling 2.6 launched December 3. Runway Gen-4.5 dropped December 1. ByteDance Vidi2 ...'",
        "Multimodal prompting – text + multiple reference images + reference video, as in 'Kling O1 ... Generate videos using a combination of inputs: text prompts, up to seven reference images/elements, and even a reference video.'",
      ],
      expectations: [
        "Creators expect tools to handle multi-scene stories with consistent characters and an editor-like timeline inside the AI tool itself.",
        "Social media managers want AI video that 'gets' social – templates, hooks, resizing, scheduling – not just cinematic one-off clips.",
      ],
      concerns: [
        "Deepfakes and misuse: 'This dude using AI video generator to trick the normies' and worries that 'Soon schools and parents are going to have to deal with kids who can point their smartphone camera to their classmates and get a realistic video of them ...'",
        "Centralization of powerful models behind big tech and IP holders (OpenAI/Disney, Meta, ByteDance, Google) might limit open experimentation and increase dependency.",
      ],
    },
      dataSources: {
        subreddits: [
          { name: "r/StableDiffusion", mentions: 6 },
          { name: "r/singularity", mentions: 3 },
          { name: "r/ProductivityApps", mentions: 2 },
          { name: "r/PromptEngineering", mentions: 2 },
          { name: "r/generativeAI", mentions: 2 },
          { name: "r/AIToolTesting", mentions: 2 },
          { name: "r/AIAssisted", mentions: 2 },
        ],
      },
    summary: "This comprehensive analysis examines AI video generation tools based on 161 Reddit posts across 18 subreddits. Runway Gen‑4.5 and Sora are positioned as quality leaders, with Veo, Kling, and Pika as strong alternatives. Key themes include the tension between free experimentation and compute costs, the need for multi-scene storytelling capabilities, and the emergence of specialized workflow tools. User sentiment is cautiously optimistic, balancing excitement about quality improvements with concerns about pricing, limitations, and ethical implications.",
    topPosts: [
      {
        id: 1,
        author: "VideoCreator",
        handle: "u/VideoCreator",
        content: "Runway Gen-4.5 is absolutely incredible. The cinematic quality and motion control are a huge step up from previous versions. Made a short film with it last week and the results were stunning.",
        upvotes: "1.2K",
        comments: "234",
        time: "2h ago",
        url: "https://reddit.com/r/StableDiffusion/comments/1",
        subreddit: "r/StableDiffusion",
      },
      {
        id: 2,
        author: "AIFilmmaker",
        handle: "u/AIFilmmaker",
        content: "The biggest issue I have with all these tools is the 4-5 second clip limit. To make a 6-minute video, you need like 72 clips. That's expensive and time-consuming to stitch together.",
        upvotes: "856",
        comments: "189",
        time: "4h ago",
        url: "https://reddit.com/r/singularity/comments/2",
        subreddit: "r/singularity",
      },
      {
        id: 3,
        author: "TechEnthusiast",
        handle: "u/TechEnthusiast",
        content: "Wan 2.2 running locally is a game-changer. No credit limits, no censorship, and the quality is surprisingly good for open-source. Requires some setup but worth it if you have the GPU.",
        upvotes: "623",
        comments: "142",
        time: "6h ago",
        url: "https://reddit.com/r/generativeAI/comments/3",
        subreddit: "r/generativeAI",
      },
    ],
  },
}

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "very_positive":
      return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400"
    case "positive":
      return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
    case "neutral":
      return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400"
    case "negative":
      return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400"
    case "very_negative":
      return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case "very_positive":
    case "positive":
      return <TrendingUp className="w-3 h-3" />
    case "negative":
    case "very_negative":
      return <TrendingDown className="w-3 h-3" />
    default:
      return <AlertCircle className="w-3 h-3" />
  }
}

export default function DiscussionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const discussionId = params.id as string
  const discussion = discussionsData[discussionId]

  const [forwardingDiscussion, setForwardingDiscussion] = useState(false)

  if (!discussion) {
    return (
      <DashboardLayout currentSection="visibility" currentSubSection="social-tracker">
        <BreadcrumbHeader items={["Home", "Visibility", "Social Tracker", "Discussion"]} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="heading-lg mb-2">Discussion not found</h2>
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
      <BreadcrumbHeader items={["Home", "Visibility", "Social Tracker", "Discussion"]} />

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
          {/* Left Column - Discussion Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Discussion Header */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="heading-xl mb-4">{discussion.title}</h1>
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    {discussion.subreddits.map((subreddit, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {subreddit}
                      </Badge>
                    ))}
                    <span className="text-xs text-muted-foreground">+{discussion.subredditsCovered - discussion.subreddits.length} more</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{discussion.totalPostsAnalyzed} posts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>Published {discussion.analysisDate}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setForwardingDiscussion(true)}
                >
                  <Forward className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </Card>

            {/* Main Analysis Content */}
            <Card className="p-6">
              <h2 className="heading-lg mb-4">Key Insights</h2>
              <div className="space-y-4 mb-6">
                {discussion.keyInsights.map((insight, idx) => (
                  <p key={idx} className="body-text-sm text-muted-foreground leading-relaxed">
                    {insight}
                  </p>
                ))}
              </div>

              <h2 className="heading-lg mb-4 mt-8">Popular AI Video Tools</h2>
              <div className="space-y-4">
                {discussion.popularTools.slice(0, 3).map((tool, idx) => (
                  <div key={idx} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="heading-md">{tool.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {tool.mentions} mentions
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn("text-xs flex items-center gap-1", getSentimentColor(tool.sentiment))}
                      >
                        {getSentimentIcon(tool.sentiment)}
                        {tool.sentiment.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="body-text-sm text-muted-foreground">
                      {tool.keyFeatures[0]}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Main Analysis Content */}
            <Card className="p-6">
              <div className="space-y-6">
                {discussion.keyInsights.map((insight, idx) => (
                  <p key={idx} className="body-text-sm text-muted-foreground leading-relaxed">
                    {insight}
                  </p>
                ))}
              </div>
            </Card>


            {/* Top Posts */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="card-title">Top Posts</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{discussion.topPosts.length} posts</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setForwardingDiscussion(true)}
                  >
                    <Forward className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {discussion.topPosts.map((post) => (
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
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {post.subreddit}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-caption-muted">{post.time}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setForwardingDiscussion(true)}
                          className="h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Forward className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="body-text-sm mb-3">{post.content}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-caption-muted">
                        <Users className="h-3 w-3" />
                        <span>{post.upvotes}</span>
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

          {/* Right Column - Sidebar */}
          <div className="w-80 shrink-0 space-y-6">
            {/* AI Summary */}
            <Card className="p-4 bg-primary/5 border-primary/20 sticky top-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="card-title">AI Summary</h2>
              </div>
              <p className="body-muted leading-relaxed">{discussion.summary}</p>
            </Card>

            {/* User Sentiment Analysis */}
            <Card className="p-4 sticky top-[calc(100vh-600px)]">
              <h2 className="heading-md mb-3">User Sentiment Analysis</h2>
              <div className="mb-4">
                <span className="body-text-sm text-muted-foreground">Overall Sentiment: </span>
                <Badge variant="secondary" className="ml-2">
                  {discussion.userSentiment.overall.replace("_", " ")}
                </Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <h3 className="body-text-sm font-semibold mb-2 text-green-600">Positive</h3>
                  <p className="body-text-sm text-muted-foreground">
                    {discussion.userSentiment.positive[0]}
                  </p>
                </div>
                <div>
                  <h3 className="body-text-sm font-semibold mb-2 text-red-600">Negative</h3>
                  <p className="body-text-sm text-muted-foreground">
                    {discussion.userSentiment.negative[0]}
                  </p>
                </div>
              </div>
            </Card>

            {/* Discover More */}
            <Card className="p-4 sticky top-[calc(100vh-300px)]">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="card-title">Discover more</h2>
              </div>
              <div className="space-y-4">
                {discussion.popularTools.slice(0, 2).map((tool, idx) => {
                  const colors = [
                    "bg-blue-500/20 text-blue-600 dark:text-blue-400",
                    "bg-purple-500/20 text-purple-600 dark:text-purple-400",
                  ]
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => {
                        // Navigate to tool detail or discussion
                        console.log("Navigate to", tool.name)
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full ${colors[idx]} flex items-center justify-center shrink-0`}>
                          <span className="text-sm font-semibold text-foreground">{tool.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="body-text-sm font-semibold mb-1">{tool.name}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {tool.keyFeatures[0]}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            {idx === 0 ? "1 day ago" : "2 days ago"}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
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
        isOpen={forwardingDiscussion}
        onClose={() => setForwardingDiscussion(false)}
        onSend={(message) => {
          console.log("Forwarding discussion", discussionId, "with message:", message)
          setForwardingDiscussion(false)
        }}
        context={{
          type: "social",
          title: discussion.title,
          description: discussion.description,
        }}
      />
    </DashboardLayout>
  )
}

