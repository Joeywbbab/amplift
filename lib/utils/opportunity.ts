import { Opportunity, OpportunityType } from "@/lib/types"
import { TYPE_BADGE_STYLES, TYPE_LABELS } from "@/lib/constants"
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, type LucideIcon } from "lucide-react"

export interface OpportunityInsight {
  icon: LucideIcon
  title: string
  description: string
  action: string
  contentType: string
}

/**
 * Generate opportunity insight based on opportunity subcategory
 */
export function getOpportunityInsight(item: Opportunity): OpportunityInsight {
  const subcategory = item.subcategory || ""
  const category = item.category

  if (category === "Creation") {
    if (subcategory.includes("zero-competition")) {
      return {
        icon: Sparkles,
        title: "First Mover Advantage",
        description: "No competitors are ranking for this prompt. Creating authoritative content now will establish your brand as the go-to source.",
        action: "Create comprehensive content that directly addresses this query with unique insights.",
        contentType: "In-depth guide or comparison article",
      }
    }
    if (subcategory.includes("popular prompt gaps")) {
      return {
        icon: TrendingUp,
        title: "High Traffic Opportunity",
        description: "This prompt has significant search volume but you're not appearing in AI responses. There's substantial traffic to capture.",
        action: "Create targeted content optimized for this specific query.",
        contentType: "SEO-optimized landing page or blog post",
      }
    }
    if (subcategory.includes("content gaps")) {
      return {
        icon: AlertTriangle,
        title: "Content Gap Detected",
        description: "Competitors are being cited but you're missing from AI responses. Your current content isn't meeting the prompt's intent.",
        action: "Analyze competitor content and create a superior resource.",
        contentType: "Comprehensive comparison or review content",
      }
    }
  }

  if (category === "Refresh") {
    if (subcategory.includes("insufficient content quality")) {
      return {
        icon: AlertTriangle,
        title: "Quality Improvement Needed",
        description: "GEO analysis flagged your content as not meeting quality standards for AI citations.",
        action: "Refresh content with updated data, better structure, and clearer value proposition.",
        contentType: "Updated article with fresh statistics and examples",
      }
    }
    if (subcategory.includes("declining citations")) {
      return {
        icon: TrendingUp,
        title: "Citation Rate Dropping",
        description: "Your content was previously cited but is losing ground. Likely due to outdated information or newer competitor content.",
        action: "Update with recent data, add new sections, and refresh publication date.",
        contentType: "Refreshed content with 2024/2025 updates",
      }
    }
    if (subcategory.includes("weak content")) {
      return {
        icon: AlertTriangle,
        title: "Content Underperforming",
        description: "Your existing content isn't competitive enough to earn citations in AI responses.",
        action: "Rewrite with more depth, better examples, and clearer structure.",
        contentType: "Enhanced long-form content",
      }
    }
  }

  if (category === "Community") {
    if (subcategory.includes("negative")) {
      return {
        icon: AlertTriangle,
        title: "Reputation Risk",
        description: "Negative discussions about your brand are being cited by AI. This could impact brand perception.",
        action: "Address concerns authentically and create positive content to balance the narrative.",
        contentType: "Response strategy and positive case studies",
      }
    }
    return {
      icon: Sparkles,
      title: "Community Engagement Opportunity",
      description: "This Reddit thread is being cited by AI models. Contributing valuable insights here can improve your visibility.",
      action: "Engage authentically with helpful, non-promotional responses.",
      contentType: "Community contribution and thought leadership",
    }
  }

  return {
    icon: Lightbulb,
    title: "Opportunity Identified",
    description: "This prompt represents an opportunity to improve your AI visibility.",
    action: "Create or optimize content targeting this specific query.",
    contentType: "Targeted content piece",
  }
}

/**
 * Get type label for opportunity type
 */
export function getTypeLabel(type: OpportunityType): string {
  return TYPE_LABELS[type]
}

/**
 * Get badge style for opportunity type
 */
export function getTypeBadgeStyle(type: OpportunityType): string {
  return TYPE_BADGE_STYLES[type]
}





