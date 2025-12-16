// Common types used across the application

// Opportunity types
export type OpportunityCategory = "Creation" | "Refresh" | "Community"
export type OpportunityStatus = "New" | "In Progress" | "Finish"
export type OpportunityType = "creation" | "refresh" | "community"

export interface Opportunity {
  id: number
  prompt?: string
  citationUrl?: string
  category: OpportunityCategory
  subcategory: string
  source?: string
  volume?: string
  visibility?: string
  mentions?: string
  citationRate?: string
  brands: string[]
  status: OpportunityStatus
  subreddit?: string
  prompts?: string[]
  promptCount?: number
}

// AI Answer types
export interface AISource {
  name?: string
  text?: string
  source?: string
  engine: string
  position: string
}

export interface AIAnswer {
  similarity: {
    content: string
    sources: AISource[]
  }
  variance: {
    content: string
    sources: AISource[]
  }
}

// Citation types
export interface Citation {
  url: string
  citationRate: string
  engines?: string
  type?: string
}

export interface Citations {
  aiPreferences: Citation[]
  contributors: Citation[]
}

// Opportunity Analysis types
export interface CompetitorCitation {
  domain: string
  pageUrl: string
  citationRate: string
  engines: string
  brand: string
}

export interface CompetitorLearning {
  domain: string
  pageUrl: string
  learnings: string[]
  keywords: string[]
}

export interface ContentRecommendation {
  targetKeywords: string[]
  competitorKeywords: string[]
  strategy: string[]
}

export interface OpportunityAnalysis {
  analysisCount: number // 分析了几次答案
  myBrandVisibility: string
  topCompetitorVisibility: string
  visibilityGap: string
  competitorCitations: CompetitorCitation[] // 在这个 prompt 下提到竞品的 citations
  competitorLearnings: CompetitorLearning[] // 竞品内容可借鉴的地方
  contentRecommendations: ContentRecommendation // content creation 建议
}

// Visibility Performance Analysis types
export interface PromptTopicPerformance {
  promptOrTopic: string
  visibility: string
  status: "good" | "poor" | "zero"
  category: string
}

export interface ModelVisibilityComparison {
  platform: string
  myBrandSOV: string // Share of Voice
  competitorSOV: string
  gap: string // in percentage points
  status: "PARITY" | "LAGGING" | "CRITICAL GAP" | "LEADING"
}

export interface VisibilityPerformanceAnalysis {
  // 1. Brand visibility 基本情况
  promptTopicPerformance: {
    good: PromptTopicPerformance[] // 表现好的 prompts/topics
    poor: PromptTopicPerformance[] // 表现差的 prompts/topics
    zeroVisibilityCount: number // 零可见度的 prompt 数量
    zeroVisibilityPercentage: string // 零可见度的百分比
  }
  // 2. 模型维度分析
  modelComparison: ModelVisibilityComparison[]
  // 优化建议
  recommendations: string[]
}

// Citation Rate types
export interface TopDomain {
  domain: string
  pageUrl?: string // Only for Own type
}

export interface CitationDomain {
  domainType: string // 域名类型，如 "第三方社区", "能源信息平台", "竞品网站", "官方网站"
  domain: string // 域名
  citationCount: string | number // 引用次数（可以是数字或百分比字符串）
  top3Domains?: TopDomain[] // Top 3 domains, if Own type then pageUrl, otherwise domain
}

export interface CitationRateAnalysis {
  // 统计数据
  earnOwnCount: number // Earn own citations 数量
  socialCount: number // Social citations 数量
  totalCount: number // 总引用次数
  // 表格数据
  citationTable: CitationDomain[]
  // Insights
  industryPreference: {
    domain: string
    description: string
  }
  negativeMentions: {
    count: number
    sources: string[]
    description: string
  }
}

// Share of Voice types
export interface SOVInsight {
  type: "positive" | "challenge" // positive = green star, challenge = orange diamond
  text: string
}

export interface ShareOfVoiceAnalysis {
  visibilityBasedSOV: string // 基于可见度的 SOV
  chartData: {
    brand: string
    value: number
    color: string
  }[]
  insights: SOVInsight[]
}

// Prompt types
export interface Prompt {
  id: number
  topic: string
  prompt: string
  visibility: string
  volume: string
  mentions: string[]
  intent: string
  similarity: number
  status: "active" | "inactive"
  isTest?: boolean
}

// Topic types
export interface Topic {
  id: number
  name: string
  visibility: string
  searchVolume: string
  mentions: string[]
  intents: string[]
  similarity: number
  prompts: PromptSummary[]
}

export interface PromptSummary {
  prompt: string
  visibility: string
  volume: string
  mentions: string[]
  intent: string
  similarity: number
}

export interface TopicDetail extends Topic {
  prompts: PromptDetail[]
  segmentedAnswer?: SegmentedAnswerParagraph[]
  aiAnswer: AIAnswer
  summary: {
    gpt: string
    perplexity: string
    claude: string
    common: string
  }
  citations: Citations
  opportunities: OpportunityItem[]
}

export interface SegmentedAnswerParagraph {
  model: "ChatGPT" | "Perplexity" | "Claude" | "Gemini" | "Similarity"
  models?: ("ChatGPT" | "Perplexity" | "Claude" | "Gemini")[] // For similarity paragraphs showing multiple models
  content: string
  citations: Array<{
    id: string
    domain: string
    title: string
    url: string
  }>
}

export interface PromptDetail {
  id: number
  prompt: string
  visibility: string
  volume: string
  intent: string
  similarity: number
  mentions: string[]
  summary: {
    gpt: string
    perplexity: string
    claude: string
    common: string
  }
  segmentedAnswer?: SegmentedAnswerParagraph[]
  aiAnswer: AIAnswer
  citations: Citations
  opportunities: OpportunityItem[]
}

export interface OpportunityItem {
  title: string
  type: OpportunityType
  source: string
}

// Social media types
export type SocialPlatform = "reddit" | "twitter" | "x"
export type SocialPostType = "reddit" | "twitter"

export interface SocialPost {
  id: number
  type: SocialPostType
  platform: string
  title?: string
  description?: string
  content?: string
  subreddit?: string
  username?: string
  handle?: string
  author: string
  time: string
  engagement: string
  engagementType: string
  fullContent?: string
  url?: string
}

export interface Comment {
  id: number
  author: string
  content: string
  time: string
  likes: number
  isOP?: boolean
}

// GEO types
export interface GeoHistory {
  id: number
  date: string
  pages: number
  avgScore: string
  status: "completed" | "pending"
  details: GeoPageDetail[]
}

export interface GeoPageDetail {
  page: string
  type: "Content Quality" | "Technical SEO"
  score: number
  issues: string[]
}

// Forward modal types
export interface ForwardContext {
  type: "opportunity" | "prompt" | "social" | "citation"
  title?: string
  description?: string
}

// Table filter types
export interface TableFilters {
  topic?: string | null
  prompt?: string | null
  intent?: string | null
  type?: string | null
  category?: string | null
  status?: string | null
}

export interface TableSort {
  field: string | null
  direction: "asc" | "desc"
}





