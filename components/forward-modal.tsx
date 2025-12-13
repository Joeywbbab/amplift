"use client"

import { useState } from "react"
import { X, Sparkles, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ForwardModalProps {
  isOpen: boolean
  onClose: () => void
  onSend: (message: string) => void
  context?: {
    type: "opportunity" | "prompt" | "social" | "citation"
    title?: string
    description?: string
    prompt?: string
    category?: string
    subcategory?: string
    volume?: string
    visibility?: string
    mentions?: string
    brands?: string[]
  }
}

// Generate AI message based on context type
const getAIMessage = (context?: ForwardModalProps["context"]) => {
  if (!context) {
    return {
      promptInfo: "",
      competitorAnalysis: "",
      topicsKeywords: ""
    }
  }

  switch (context.type) {
    case "opportunity":
      const promptInfo = `Prompt基本情况：
• Prompt: ${context.prompt || context.title || "N/A"}
• Category: ${context.category || "N/A"}
• Subcategory: ${context.subcategory || "N/A"}
• Volume: ${context.volume || "N/A"}
• Visibility: ${context.visibility || "N/A"}
• Mentions: ${context.mentions || "N/A"}`

      const competitorAnalysis = `Competitor分析：
${context.brands && context.brands.length > 0 
  ? `提到的竞争对手：${context.brands.join(", ")}\n\n这些竞争对手在相关查询中频繁出现，建议在内容中明确区分我们的优势，突出独特价值主张。`
  : "暂无竞争对手信息"}`

      const topicsKeywords = `建议的Topic和Keywords：
• 主要Topic: ${context.prompt || context.title || "N/A"}
• 相关Keywords: ${context.subcategory || "N/A"}, ${context.brands?.join(", ") || ""}
• 建议内容方向: 针对用户意图创建数据驱动的内容，强调与竞争对手的差异化，使用权威性语言优化AI引用。`

      return {
        promptInfo,
        competitorAnalysis,
        topicsKeywords
      }
    case "prompt":
      return {
        promptInfo: `Prompt基本情况：\n${context.title || "N/A"}`,
        competitorAnalysis: "该prompt正在被AI模型回答。建议创建匹配查询意图的全面内容。",
        topicsKeywords: "建议优化内容结构，使用清晰的标题结构以便AI解析。"
      }
    case "social":
      return {
        promptInfo: `Social Mention：\n${context.title || "N/A"}`,
        competitorAnalysis: "建议以有帮助、非促销的方式回应，直接解决问题。",
        topicsKeywords: "监控后续参与机会。"
      }
    case "citation":
      return {
        promptInfo: `Citation Source：\n${context.title || "N/A"}`,
        competitorAnalysis: "确保内容保持最新，针对相关查询进行优化。",
        topicsKeywords: "考虑扩展到相关主题的覆盖范围。"
      }
    default:
      return {
        promptInfo: "已准备此项目供内容团队使用。",
        competitorAnalysis: "",
        topicsKeywords: ""
      }
  }
}

export function ForwardModal({ isOpen, onClose, onSend, context }: ForwardModalProps) {
  const [message, setMessage] = useState("")

  const aiMessage = getAIMessage(context)
  const isOpportunity = context?.type === "opportunity"

  const handleSend = () => {
    onSend(message)
    setMessage("")
    onClose()
  }

  const handleClose = () => {
    onClose()
    setMessage("")
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-card w-fit max-w-[8000px] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b flex items-center justify-between gap-3">
          <h2 className="heading-lg">Send to Writer</h2>
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleSend}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
            <button
              onClick={handleClose}
              className="p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat-like Content */}
        <div className="p-5 space-y-3">
          {/* Forwarding Item Info */}
          {context?.title && (
            <div className="p-3 rounded-lg bg-muted/50 border -mt-2">
              <p className="text-xs text-muted-foreground mb-1">Forwarding:</p>
              <p className="text-sm font-medium">{context.title}</p>
              {context.description && (
                <p className="text-xs text-muted-foreground mt-1">{context.description}</p>
              )}
            </div>
          )}

          {/* Amplift AI Message Bubble */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">Amplift</p>
              <div className="p-3 rounded-lg bg-muted/50 text-sm leading-relaxed space-y-4">
                {isOpportunity && typeof aiMessage === 'object' ? (
                  <>
                    <div className="whitespace-pre-line font-medium text-foreground">{aiMessage.promptInfo}</div>
                    <div className="whitespace-pre-line font-medium text-foreground">{aiMessage.competitorAnalysis}</div>
                    <div className="whitespace-pre-line font-medium text-foreground">{aiMessage.topicsKeywords}</div>
                  </>
                ) : (
                  <div className="whitespace-pre-line">
                    {typeof aiMessage === 'object' 
                      ? `${aiMessage.promptInfo}\n\n${aiMessage.competitorAnalysis}\n\n${aiMessage.topicsKeywords}`
                      : aiMessage
                    }
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User Input */}
          <div className="flex items-center gap-2 pt-2">
            <Input
              placeholder="Add a message (optional)..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
