"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ExternalLink,
  ArrowUpDown,
  Search,
  Sparkles,
  Check,
  Target,
  Filter,
  X,
  Plus,
  Send,
  ChevronRight,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { answerHistoryData } from "@/data/mock/answer-history"

// Current focus topics (would come from context/store in real app)
const currentFocusTopics = ["Marketing automation tools"]

// Completed opportunity prompts (would come from context/store in real app)
const completedOpportunityPrompts = [
  "What are the best marketing automation tools?",
  "Best AI tools for marketing?",
]

// AI suggestions for the popover
const aiSuggestions = [
  { id: 1, type: "add", message: "Add 3 new prompts for 'Email marketing'" },
  { id: 2, type: "move", message: "Move 'Marketing analytics' prompts to inactive" },
]

// All prompts data with status field
const allPrompts = [
  {
    id: 1,
    topic: "Marketing automation tools",
    prompt: "What are the best marketing automation tools?",
    visibility: "78%",
    volume: "22.3K",
    mentions: ["HubSpot", "Marketo"],
    intent: "Transactional",
    similarity: 8.6,
    status: "active",
    isTest: false,
    aiAnswersCount: 12,
  },
  {
    id: 2,
    topic: "Marketing automation tools",
    prompt: "How to choose marketing automation software?",
    visibility: "65%",
    volume: "15.1K",
    mentions: ["Salesforce", "HubSpot"],
    intent: "Informational",
    similarity: 8.2,
    status: "active",
    isTest: true,
    aiAnswersCount: 8,
  },
  {
    id: 3,
    topic: "Marketing automation tools",
    prompt: "Marketing automation tools comparison",
    visibility: "71%",
    volume: "7.8K",
    mentions: ["Marketo", "Pardot"],
    intent: "Transactional",
    similarity: 8.4,
    status: "active",
    isTest: false,
    aiAnswersCount: 15,
  },
  {
    id: 4,
    topic: "AI marketing platforms",
    prompt: "Best AI tools for marketing?",
    visibility: "70%",
    volume: "18.2K",
    mentions: ["OpenAI", "Jasper"],
    intent: "Transactional",
    similarity: 7.8,
    status: "active",
    isTest: false,
    aiAnswersCount: 10,
  },
  {
    id: 5,
    topic: "AI marketing platforms",
    prompt: "AI content generation for marketing",
    visibility: "66%",
    volume: "12.4K",
    mentions: ["Adobe", "Canva"],
    intent: "Informational",
    similarity: 8.0,
    status: "active",
    isTest: false,
    aiAnswersCount: 6,
  },
  {
    id: 6,
    topic: "Marketing analytics",
    prompt: "Best marketing analytics tools",
    visibility: "63%",
    volume: "14.2K",
    mentions: ["Mixpanel", "Heap"],
    intent: "Transactional",
    similarity: 7.4,
    status: "inactive",
    isTest: false,
    aiAnswersCount: 9,
  },
  {
    id: 7,
    topic: "Marketing analytics",
    prompt: "How to track marketing performance?",
    visibility: "60%",
    volume: "11.8K",
    mentions: ["Google Analytics", "Amplitude"],
    intent: "Informational",
    similarity: 7.0,
    status: "inactive",
    isTest: true,
    aiAnswersCount: 5,
  },
  {
    id: 8,
    topic: "Email marketing",
    prompt: "Best email marketing platforms 2024",
    visibility: "74%",
    volume: "28.5K",
    mentions: ["Mailchimp", "SendGrid"],
    intent: "Transactional",
    similarity: 8.1,
    status: "active",
    isTest: false,
    aiAnswersCount: 18,
  },
  {
    id: 9,
    topic: "Email marketing",
    prompt: "Email automation best practices",
    visibility: "68%",
    volume: "9.3K",
    mentions: ["HubSpot", "ActiveCampaign"],
    intent: "Informational",
    similarity: 7.5,
    status: "inactive",
    isTest: false,
    aiAnswersCount: 7,
  },
  {
    id: 10,
    topic: "Lead generation",
    prompt: "B2B lead generation tools",
    visibility: "62%",
    volume: "16.7K",
    mentions: ["LinkedIn", "ZoomInfo"],
    intent: "Transactional",
    similarity: 7.2,
    status: "active",
    isTest: false,
    aiAnswersCount: 11,
  },
  {
    id: 11,
    topic: "Marketing automation tools",
    prompt: "Marketing automation tools comparison guide",
    visibility: "69%",
    volume: "11.2K",
    mentions: ["HubSpot", "Salesforce", "Marketo"],
    intent: "Comparative",
    similarity: 8.3,
    status: "active",
    isTest: false,
    aiAnswersCount: 14,
  },
  {
    id: 12,
    topic: "Email marketing",
    prompt: "Email delivery and transactional email services",
    visibility: "58%",
    volume: "9.8K",
    mentions: ["SendGrid", "Postmark"],
    intent: "Transactional",
    similarity: 7.6,
    status: "active",
    isTest: false,
    aiAnswersCount: 4,
  },
]

// All citations data with date format for lastCited
const allCitations = [
  {
    id: 1,
    url: "amplift.com/blog/marketing-automation-guide",
    domain: "Amplift",
    type: "own",
    category: "Industry preference",
    citationRate: "12.3%",
    mentionedBy: ["ChatGPT", "Perplexity"],
    lastCited: "Dec 10, 2024",
  },
  {
    id: 2,
    url: "amplift.com/blog/ai-tools-comparison",
    domain: "Amplift",
    type: "own",
    category: "Industry preference",
    citationRate: "9.1%",
    mentionedBy: ["ChatGPT"],
    lastCited: "Dec 9, 2024",
  },
  {
    id: 3,
    url: "amplift.com/blog/email-marketing-tips",
    domain: "Amplift",
    type: "own",
    category: "Industry preference",
    citationRate: "6.8%",
    mentionedBy: ["Perplexity"],
    lastCited: "Dec 8, 2024",
  },
  {
    id: 4,
    url: "amplift.com/docs/getting-started",
    domain: "Amplift",
    type: "own",
    category: "Industry preference",
    citationRate: "8.2%",
    mentionedBy: ["ChatGPT"],
    lastCited: "Dec 10, 2024",
  },
  {
    id: 5,
    url: "amplift.com/docs/api-reference",
    domain: "Amplift",
    type: "own",
    category: "Contributors",
    citationRate: "5.4%",
    mentionedBy: ["ChatGPT"],
    lastCited: "Dec 7, 2024",
  },
  {
    id: 6,
    url: "amplift.com/case-studies/enterprise-success",
    domain: "Amplift",
    type: "own",
    category: "Industry preference",
    citationRate: "9.5%",
    mentionedBy: ["Perplexity"],
    lastCited: "Dec 9, 2024",
  },
  {
    id: 7,
    url: "techcrunch.com/amplift-review-2024",
    domain: "TechCrunch",
    type: "earned",
    category: "Industry preference",
    citationRate: "7.2%",
    mentionedBy: ["ChatGPT", "Perplexity"],
    lastCited: "Dec 11, 2024",
  },
  {
    id: 8,
    url: "g2.com/products/amplift/reviews",
    domain: "G2",
    type: "earned",
    category: "Contributors",
    citationRate: "6.8%",
    mentionedBy: ["ChatGPT"],
    lastCited: "Dec 6, 2024",
  },
  {
    id: 9,
    url: "forbes.com/marketing-tools-2024",
    domain: "Forbes",
    type: "earned",
    category: "Industry preference",
    citationRate: "5.9%",
    mentionedBy: ["Perplexity"],
    lastCited: "Dec 5, 2024",
  },
  {
    id: 10,
    url: "medium.com/@amplift/automation-guide",
    domain: "Medium",
    type: "earned",
    category: "Contributors",
    citationRate: "5.2%",
    mentionedBy: ["Perplexity"],
    lastCited: "Dec 4, 2024",
  },
  {
    id: 11,
    url: "linkedin.com/company/amplift/posts",
    domain: "LinkedIn",
    type: "social",
    category: "Contributors",
    citationRate: "4.1%",
    mentionedBy: ["ChatGPT"],
    lastCited: "Dec 3, 2024",
  },
  {
    id: 12,
    url: "twitter.com/amplift/status/123456",
    domain: "Twitter/X",
    type: "social",
    category: "Contributors",
    citationRate: "3.2%",
    mentionedBy: ["Perplexity"],
    lastCited: "Dec 1, 2024",
  },
]

// Get unique values for filters
const uniqueTopics = [...new Set(allPrompts.map((p) => p.topic))]
const uniquePrompts = [...new Set(allPrompts.map((p) => p.prompt))]
// Ensure all intent types are included even if not in data
const allIntentTypes = ["Commercial", "Informational", "Comparative", "Transactional"]
const uniqueIntents = [...new Set([...allPrompts.map((p) => p.intent), ...allIntentTypes])]
const uniqueTypes = [...new Set(allCitations.map((c) => c.type))]
const uniqueCategories = [...new Set(allCitations.map((c) => c.category))]

export default function DataPage() {
  const [activeTab, setActiveTab] = useState<"prompts" | "citations">("prompts")
  const [promptStatusTab, setPromptStatusTab] = useState<"active" | "inactive">("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPrompts, setSelectedPrompts] = useState<number[]>([])
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [showAnswerHistory, setShowAnswerHistory] = useState(false)
  const [selectedPromptForHistory, setSelectedPromptForHistory] = useState<number | null>(null)
  const [answerHistoryEngineFilter, setAnswerHistoryEngineFilter] = useState<string | null>(null)
  const [answerHistoryTimeFilter, setAnswerHistoryTimeFilter] = useState<string>("all")
  const [expandedAnswerIds, setExpandedAnswerIds] = useState<Set<number>>(new Set())

  // Reset search when switching tabs
  useEffect(() => {
    setSearchQuery("")
    setSearchExpanded(false)
  }, [activeTab])

  // Column filters
  const [topicFilter, setTopicFilter] = useState<string | null>(null)
  const [promptFilter, setPromptFilter] = useState<string | null>(null)
  const [intentFilter, setIntentFilter] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // AI Panel state
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [showAiPopover, setShowAiPopover] = useState(false)
  const [aiInput, setAiInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Hi! I can help you manage your prompts and citations. What would you like to do?",
    },
  ])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const togglePromptSelection = (id: number) => {
    setSelectedPrompts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const toggleAllPrompts = (promptIds: number[]) => {
    const allSelected = promptIds.every((id) => selectedPrompts.includes(id))
    if (allSelected) {
      setSelectedPrompts((prev) => prev.filter((id) => !promptIds.includes(id)))
    } else {
      setSelectedPrompts((prev) => [...new Set([...prev, ...promptIds])])
    }
  }

  const handleSendMessage = (customMessage?: string) => {
    const message = customMessage || aiInput
    if (!message.trim()) return
    setMessages([...messages, { role: "user", content: message }])
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I've analyzed your request about "${message}". Based on your current prompt performance, I recommend reviewing the inactive prompts and considering reactivation for high-volume topics.`,
        },
      ])
    }, 1000)
    setAiInput("")
  }

  const openAiWithSuggestion = (suggestion: string) => {
    setShowAiPopover(false)
    setAiPanelOpen(true)
    setTimeout(() => {
      handleSendMessage(suggestion)
    }, 100)
  }

  // Filter prompts
  const filteredPrompts = allPrompts.filter((p) => {
    if (p.status !== promptStatusTab) return false

    const query = searchQuery.toLowerCase()
    if (query) {
      const matchesSearch =
        p.prompt.toLowerCase().includes(query) ||
        p.topic.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    if (topicFilter && p.topic !== topicFilter) return false
    if (promptFilter && p.prompt !== promptFilter) return false
    if (intentFilter && p.intent !== intentFilter) return false

    return true
  })

  // Filter citations
  const filteredCitations = allCitations.filter((c) => {
    const query = searchQuery.toLowerCase()
    if (query) {
      const matchesSearch =
        c.url.toLowerCase().includes(query) ||
        c.domain.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    if (typeFilter && c.type !== typeFilter) return false
    if (categoryFilter && c.category !== categoryFilter) return false

    return true
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "earned":
        return "bg-green-100 text-green-700 border-green-200"
      case "own":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "social":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const activePromptsCount = allPrompts.filter((p) => p.status === "active").length
  const inactivePromptsCount = allPrompts.filter((p) => p.status === "inactive").length

  const isCurrentFocus = (topic: string) => currentFocusTopics.includes(topic)
  const hasAiSuggestion = (prompt: string) => completedOpportunityPrompts.includes(prompt)

  const filteredPromptIds = filteredPrompts.map((p) => p.id)
  const allFilteredSelected = filteredPromptIds.length > 0 && filteredPromptIds.every((id) => selectedPrompts.includes(id))

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="ai-performance">
      <BreadcrumbHeader
        items={["Home", "Visibility", "AI performance", "All Data"]}
      />

      <div className="flex h-full">
        {/* Main Content Area */}
        <div className={`flex-1 overflow-auto p-8 transition-all duration-300 bg-transparent`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="heading-xl">Prompts & Citations</h1>
              <p className="body-muted mt-1">
                All tracked prompts and citation sources
              </p>
            </div>
          </div>

          {/* Main Tabs */}
          <div className="flex items-center justify-between mb-6 border-b">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab("prompts")}
                className={cn(
                  "pb-3 body-text-sm font-medium transition-colors relative",
                  activeTab === "prompts"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Prompts
                <span className="ml-2 px-2 py-0.5 text-xs bg-muted rounded-full">
                  {allPrompts.length}
                </span>
                {activeTab === "prompts" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("citations")}
                className={cn(
                  "pb-3 body-text-sm font-medium transition-colors relative",
                  activeTab === "citations"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Citations
                <span className="ml-2 px-2 py-0.5 text-xs bg-muted rounded-full">
                  {allCitations.length}
                </span>
                {activeTab === "citations" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-2 mb-3">
              {searchExpanded ? (
                <div className="relative w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder=""
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => {
                      if (!searchQuery) {
                        setSearchExpanded(false)
                      }
                    }}
                    autoFocus
                    className="pl-9 h-9 w-full"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchExpanded(true)}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                >
                  <Search className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
              {activeTab === "prompts" && (
                <Button
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    console.log("Add new prompt")
                  }}
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add new prompt
                </Button>
              )}
            </div>
          </div>

          {/* Prompts Section */}
          {activeTab === "prompts" && (
            <Card className="bg-transparent border-0">
              {/* Card Header with tabs */}
              <div className="px-4 py-2 border-b">
                <div className="flex items-center justify-between">
                  {/* Active/Inactive Tabs inside card */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPromptStatusTab("active")}
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                        promptStatusTab === "active"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Active
                      <span className="ml-1.5 text-caption-muted opacity-70">({activePromptsCount})</span>
                    </button>
                    <button
                      onClick={() => setPromptStatusTab("inactive")}
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                        promptStatusTab === "inactive"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Inactive
                      <span className="ml-1.5 text-caption-muted opacity-70">({inactivePromptsCount})</span>
                    </button>
                  </div>

                  {/* Bulk actions */}
                  {selectedPrompts.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="body-text-sm text-muted-foreground">
                        {selectedPrompts.length} selected
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          console.log("Move to inactive:", selectedPrompts)
                          setSelectedPrompts([])
                        }}
                      >
                        {promptStatusTab === "active" ? "Move to Inactive" : "Move to Active"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="w-12 px-4 py-3">
                        <Checkbox
                          checked={allFilteredSelected}
                          onCheckedChange={() => toggleAllPrompts(filteredPromptIds)}
                        />
                      </th>
                      <th className="px-4 py-2.5 text-left section-label-md">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-foreground">
                            Prompt
                            {promptFilter ? (
                              <Badge variant="secondary" className="ml-1 text-caption-muted px-1">
                                1
                              </Badge>
                            ) : (
                              <Filter className="w-3 h-3 opacity-50" />
                            )}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="max-h-[300px] overflow-y-auto">
                            <DropdownMenuItem
                              onClick={() => setPromptFilter(null)}
                              className={cn(!promptFilter && "bg-accent")}
                            >
                              All prompts
                              {!promptFilter && <Check className="ml-auto w-4 h-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {uniquePrompts.map((prompt) => (
                              <DropdownMenuItem
                                key={prompt}
                                onClick={() => setPromptFilter(prompt)}
                                className={cn(promptFilter === prompt && "bg-accent", "max-w-[300px]")}
                              >
                                <span className="truncate">{prompt}</span>
                                {promptFilter === prompt && <Check className="ml-auto w-4 h-4 shrink-0" />}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </th>
                      <th className="px-4 py-2.5 text-left section-label-md">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-foreground">
                            Topic
                            {topicFilter ? (
                              <Badge variant="secondary" className="ml-1 text-caption-muted px-1">
                                1
                              </Badge>
                            ) : (
                              <Filter className="w-3 h-3 opacity-50" />
                            )}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem
                              onClick={() => setTopicFilter(null)}
                              className={cn(!topicFilter && "bg-accent")}
                            >
                              All topics
                              {!topicFilter && <Check className="ml-auto w-4 h-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {uniqueTopics.map((topic) => (
                              <DropdownMenuItem
                                key={topic}
                                onClick={() => setTopicFilter(topic)}
                                className={cn(topicFilter === topic && "bg-accent")}
                              >
                                <span className="flex items-center gap-2">
                                  {topic}
                                  {isCurrentFocus(topic) && (
                                    <Target className="w-3 h-3 text-primary" />
                                  )}
                                </span>
                                {topicFilter === topic && <Check className="ml-auto w-4 h-4" />}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer hover:text-foreground"
                        onClick={() => handleSort("visibility")}
                      >
                        <div className="flex items-center gap-1">
                          Visibility
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer hover:text-foreground"
                        onClick={() => handleSort("volume")}
                      >
                        <div className="flex items-center gap-1">
                          Volume
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-4 py-2.5 text-left section-label-md">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-foreground">
                            Intent
                            {intentFilter ? (
                              <Badge variant="secondary" className="ml-1 text-caption-muted px-1">
                                1
                              </Badge>
                            ) : (
                              <Filter className="w-3 h-3 opacity-50" />
                            )}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem
                              onClick={() => setIntentFilter(null)}
                              className={cn(!intentFilter && "bg-accent")}
                            >
                              All intents
                              {!intentFilter && <Check className="ml-auto w-4 h-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {uniqueIntents.map((intent) => (
                              <DropdownMenuItem
                                key={intent}
                                onClick={() => setIntentFilter(intent)}
                                className={cn(intentFilter === intent && "bg-accent")}
                              >
                                {intent}
                                {intentFilter === intent && <Check className="ml-auto w-4 h-4" />}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </th>
                      <th className="px-4 py-2.5 text-left section-label-md">
                        Competitors
                      </th>
                      <th className="px-4 py-2.5 text-left section-label-md">
                        Similarity
                      </th>
                      <th className="px-4 py-2.5 text-left section-label-md">
                        AI Answers
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrompts.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-8 text-center body-muted">
                          No prompts found
                        </td>
                      </tr>
                    ) : (
                      filteredPrompts.map((prompt, index) => (
                        <tr
                          key={prompt.id}
                          className={cn(
                            "border-b hover:bg-accent/50 transition-colors",
                            index % 2 === 0 ? "bg-background" : "bg-muted/20",
                            selectedPrompts.includes(prompt.id) && "bg-primary/5"
                          )}
                        >
                          <td className="px-4 py-3">
                            <Checkbox
                              checked={selectedPrompts.includes(prompt.id)}
                              onCheckedChange={() => togglePromptSelection(prompt.id)}
                            />
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-2">
                              <span className="body-text-sm font-medium">{prompt.prompt}</span>
                              {hasAiSuggestion(prompt.prompt) && (
                                <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-caption-muted gap-0.5">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  AI suggestion
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="body-text-sm text-muted-foreground">{prompt.topic}</span>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="text-xs font-mono font-semibold text-green-600 text-right">
                              {prompt.visibility}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="text-xs font-mono text-muted-foreground text-right">
                              {prompt.volume}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <Badge variant="outline" className="text-caption-muted">
                              {prompt.intent}
                            </Badge>
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex flex-wrap gap-1">
                              {prompt.mentions.map((mention, i) => (
                                <span
                                  key={i}
                                  className="text-caption-muted px-1.5 py-0.5 bg-muted rounded"
                                >
                                  {mention}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-2.5">
                            <Badge variant="outline" className="font-mono text-xs">
                              {prompt.similarity}%
                            </Badge>
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-mono text-muted-foreground">
                                {prompt.aiAnswersCount || 0}
                              </span>
                              <button
                                onClick={() => {
                                  setSelectedPromptForHistory(prompt.id)
                                  setShowAnswerHistory(true)
                                }}
                                className="p-1 hover:bg-muted rounded transition-colors"
                              >
                                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Citations Section */}
          {activeTab === "citations" && (
            <Card>
              {/* Card Header */}
              <div className="px-4 py-2 border-b">
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-2.5 text-left section-label-md">
                        URL
                      </th>
                      <th className="px-4 py-2.5 text-left section-label-md">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-foreground">
                            Type
                            {typeFilter ? (
                              <Badge variant="secondary" className="ml-1 text-caption-muted px-1">
                                1
                              </Badge>
                            ) : (
                              <Filter className="w-3 h-3 opacity-50" />
                            )}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem
                              onClick={() => setTypeFilter(null)}
                              className={cn(!typeFilter && "bg-accent")}
                            >
                              All types
                              {!typeFilter && <Check className="ml-auto w-4 h-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {uniqueTypes.map((type) => (
                              <DropdownMenuItem
                                key={type}
                                onClick={() => setTypeFilter(type)}
                                className={cn(typeFilter === type && "bg-accent")}
                              >
                                <span className="capitalize">{type}</span>
                                {typeFilter === type && <Check className="ml-auto w-4 h-4" />}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </th>
                      <th className="px-4 py-2.5 text-left section-label-md">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-foreground">
                            Category
                            {categoryFilter ? (
                              <Badge variant="secondary" className="ml-1 text-caption-muted px-1">
                                1
                              </Badge>
                            ) : (
                              <Filter className="w-3 h-3 opacity-50" />
                            )}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem
                              onClick={() => setCategoryFilter(null)}
                              className={cn(!categoryFilter && "bg-accent")}
                            >
                              All categories
                              {!categoryFilter && <Check className="ml-auto w-4 h-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {uniqueCategories.map((cat) => (
                              <DropdownMenuItem
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={cn(categoryFilter === cat && "bg-accent")}
                              >
                                {cat}
                                {categoryFilter === cat && <Check className="ml-auto w-4 h-4" />}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer hover:text-foreground"
                        onClick={() => handleSort("citationRate")}
                      >
                        <div className="flex items-center gap-1">
                          Citation Rate
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-4 py-2.5 text-left section-label-md">
                        Mentioned By
                      </th>
                      <th className="px-4 py-2.5 text-left section-label-md">
                        Last Cited
                      </th>
                      <th className="px-4 py-2.5 text-left section-label-md">
                        Link
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCitations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center body-muted">
                          No citations found
                        </td>
                      </tr>
                    ) : (
                      filteredCitations.map((citation, index) => (
                        <tr
                          key={citation.id}
                          className={cn(
                            "border-b hover:bg-accent/50 transition-colors",
                            index % 2 === 0 ? "bg-background" : "bg-muted/20"
                          )}
                        >
                          <td className="px-4 py-2.5">
                            <div>
                              <span className="body-text-sm font-medium">{citation.url}</span>
                              <p className="text-caption-muted">{citation.domain}</p>
                            </div>
                          </td>
                          <td className="px-4 py-2.5">
                            <Badge
                              variant="outline"
                              className={cn("text-caption-muted capitalize", getTypeColor(citation.type))}
                            >
                              {citation.type}
                            </Badge>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="body-text-sm text-muted-foreground">
                              {citation.category}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="text-xs font-mono font-semibold text-green-600 text-right">
                              {citation.citationRate}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex flex-wrap gap-1">
                              {citation.mentionedBy.map((ai, i) => (
                                <span
                                  key={i}
                                  className="text-caption-muted px-1.5 py-0.5 bg-muted rounded"
                                >
                                  {ai}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="text-xs font-mono text-muted-foreground">
                              {citation.lastCited}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <a
                              href={`https://${citation.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
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
                {["Suggest new prompts", "Review inactive", "Optimize citations"].map((action) => (
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

      {/* Amplift AI Floating Button with Popover */}
      {!aiPanelOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Popover */}
          {showAiPopover && (
            <div className="absolute bottom-16 right-0 w-72 bg-card border rounded-lg shadow-xl p-3 mb-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="body-text-sm font-semibold">AI Suggestions</span>
                </div>
                <button
                  onClick={() => setShowAiPopover(false)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {aiSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => openAiWithSuggestion(suggestion.message)}
                    className="w-full text-left p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <span className={cn(
                        "mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0",
                        suggestion.type === "add" ? "bg-green-500" : "bg-amber-500"
                      )} />
                      <span className="text-caption-muted text-foreground">{suggestion.message}</span>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setShowAiPopover(false)
                  setAiPanelOpen(true)
                }}
                className="w-full mt-3 text-caption-muted text-primary hover:underline text-center"
              >
                Open AI assistant
              </button>
            </div>
          )}

          {/* Button */}
          <button
            onClick={() => setShowAiPopover(!showAiPopover)}
            className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            title="Amplift AI"
          >
            <Sparkles className="w-6 h-6" />
            {/* Notification bubble */}
            {aiSuggestions.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {aiSuggestions.length}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Answers Sheet */}
      <Sheet open={showAnswerHistory} onOpenChange={setShowAnswerHistory}>
        <SheetContent side="right" className="w-full sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>
              {selectedPromptForHistory ? allPrompts.find((p) => p.id === selectedPromptForHistory)?.prompt : "Answers"}
            </SheetTitle>
          </SheetHeader>
          
          {/* Filters */}
          <div className="mt-6 flex items-center gap-3 px-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  <Filter className="w-3 h-3 mr-1.5" />
                  {answerHistoryEngineFilter || "All Models"}
                  {answerHistoryEngineFilter && (
                    <X className="w-3 h-3 ml-1.5" onClick={(e) => {
                      e.stopPropagation()
                      setAnswerHistoryEngineFilter(null)
                    }} />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setAnswerHistoryEngineFilter(null)}>
                  All Models
                  {!answerHistoryEngineFilter && <Check className="ml-auto w-4 h-4" />}
                </DropdownMenuItem>
                {selectedPromptForHistory && answerHistoryData[selectedPromptForHistory] && (
                  Array.from(new Set(answerHistoryData[selectedPromptForHistory].map(item => item.engine))).map((engine) => (
                    <DropdownMenuItem
                      key={engine}
                      onClick={() => setAnswerHistoryEngineFilter(engine)}
                    >
                      {engine}
                      {answerHistoryEngineFilter === engine && <Check className="ml-auto w-4 h-4" />}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  <Calendar className="w-3 h-3 mr-1.5" />
                  {answerHistoryTimeFilter === "all" ? "All Time" : answerHistoryTimeFilter === "today" ? "Today" : answerHistoryTimeFilter === "week" ? "This Week" : "This Month"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setAnswerHistoryTimeFilter("all")}>
                  All Time
                  {answerHistoryTimeFilter === "all" && <Check className="ml-auto w-4 h-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAnswerHistoryTimeFilter("today")}>
                  Today
                  {answerHistoryTimeFilter === "today" && <Check className="ml-auto w-4 h-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAnswerHistoryTimeFilter("week")}>
                  This Week
                  {answerHistoryTimeFilter === "week" && <Check className="ml-auto w-4 h-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAnswerHistoryTimeFilter("month")}>
                  This Month
                  {answerHistoryTimeFilter === "month" && <Check className="ml-auto w-4 h-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 space-y-4 px-4">
            {selectedPromptForHistory && answerHistoryData[selectedPromptForHistory] ? (() => {
              let filtered = answerHistoryData[selectedPromptForHistory]
              
              // Filter by engine
              if (answerHistoryEngineFilter) {
                filtered = filtered.filter(item => item.engine === answerHistoryEngineFilter)
              }
              
              // Filter by time
              if (answerHistoryTimeFilter !== "all") {
                const now = new Date()
                filtered = filtered.filter(item => {
                  const itemDate = new Date(item.timestamp)
                  if (answerHistoryTimeFilter === "today") {
                    return itemDate.toDateString() === now.toDateString()
                  } else if (answerHistoryTimeFilter === "week") {
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                    return itemDate >= weekAgo
                  } else if (answerHistoryTimeFilter === "month") {
                    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
                    return itemDate >= monthAgo
                  }
                  return true
                })
              }
              
              return filtered.length > 0 ? (
                filtered.map((item) => {
                  const isExpanded = expandedAnswerIds.has(item.id)
                  
                  return (
                    <Card 
                      key={item.id} 
                      className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => {
                        setExpandedAnswerIds(prev => {
                          const newSet = new Set(prev)
                          if (newSet.has(item.id)) {
                            newSet.delete(item.id)
                          } else {
                            newSet.add(item.id)
                          }
                          return newSet
                        })
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {item.engine}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{item.timestamp}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpandedAnswerIds(prev => {
                              const newSet = new Set(prev)
                              if (newSet.has(item.id)) {
                                newSet.delete(item.id)
                              } else {
                                newSet.add(item.id)
                              }
                              return newSet
                            })
                          }}
                          className="p-1 hover:bg-muted rounded transition-colors flex-shrink-0"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                      <p className={cn(
                        "body-text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap",
                        !isExpanded && "line-clamp-3"
                      )}>
                        {item.answer}
                      </p>
                    </Card>
                  )
                })
              ) : (
                <div className="text-center py-8">
                  <p className="body-muted">No answers found</p>
                </div>
              )
            })() : (
              <div className="text-center py-8">
                <p className="body-muted">No answer history available</p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  )
}
