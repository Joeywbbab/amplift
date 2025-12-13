"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, ChevronRight, X, Forward } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { AIAnswerSection } from "@/components/shared/ai-answer-section"
import { CitationsSection } from "@/components/shared/citations-section"
import { SegmentedAIAnswer, type SegmentedAnswerParagraph } from "@/components/shared/segmented-ai-answer"
import { OpportunityInsightCard } from "@/components/shared/opportunity-insight-card"
import { TopicDetail, Opportunity } from "@/lib/types"
import { getTypeLabel, getTypeBadgeStyle, getOpportunityInsight } from "@/lib/utils/opportunity"
import { opportunityTableData } from "@/data/mock/opportunities"
import { opportunityAnalyses } from "@/data/mock/opportunity-details"

// Mock data for topic detail
const topicData: Record<string, TopicDetail> = {
  "1": {
    name: "Marketing automation tools",
    visibility: "72%",
    searchVolume: "45.2K",
    mentions: ["HubSpot", "Salesforce", "Marketo", "ActiveCampaign"],
    intent: "Transactional",
    similarity: 8.4,
    prompts: [
      {
        id: 1,
        prompt: "What are the best marketing automation tools?",
        visibility: "78%",
        volume: "22.3K",
        intent: "Commercial",
        similarity: 8.6,
        mentions: ["HubSpot", "Marketo", "Salesforce"],
        summary: {
          gpt: "Recommends HubSpot and Marketo for enterprise, with focus on integration capabilities.",
          perplexity: "Provides detailed pricing comparisons and ROI analysis for each tool.",
          claude: "Balanced overview emphasizing ease of use and customer support quality.",
          common: "All engines agree HubSpot leads the market for mid-size businesses.",
        },
        segmentedAnswer: [
          {
            model: "Similarity",
            models: ["ChatGPT", "Perplexity", "Claude"],
            content: "All three AI engines consistently recommend HubSpot, Salesforce Marketing Cloud, and Marketo Engage as the top three marketing automation platforms [citation:1]. They unanimously agree that HubSpot is the best overall solution for mid-market companies, highlighting its comprehensive CRM integration, ease of use, and all-in-one platform approach [citation:2]. All engines emphasize that HubSpot's free tier and intuitive interface make it accessible for businesses of all sizes, while Salesforce and Marketo are better suited for enterprise organizations with more complex requirements [citation:3]. The engines also agree that the choice between these platforms should be based on company size, with HubSpot being ideal for SMBs, Marketo for B2B enterprises, and Salesforce for large organizations requiring deep CRM integration [citation:1].",
            citations: [
              {
                id: "1",
                domain: "amplift.com",
                title: "Complete Guide to Marketing Automation Tools 2024",
                url: "https://amplift.com/blog/automation-guide",
              },
              {
                id: "2",
                domain: "hubspot.com",
                title: "HubSpot Marketing Hub - All-in-One Marketing Platform",
                url: "https://hubspot.com/products/marketing",
              },
              {
                id: "3",
                domain: "g2.com",
                title: "Marketing Automation Software Reviews and Comparisons",
                url: "https://g2.com/categories/marketing-automation",
              },
            ],
          },
          {
            model: "ChatGPT",
            content: "The best marketing automation tools include HubSpot, Salesforce Marketing Cloud, and Marketo Engage. HubSpot stands out for its all-in-one CRM platform that seamlessly integrates marketing, sales, and service tools, making it ideal for mid-market companies [citation:1]. Salesforce Marketing Cloud excels in enterprise-level email marketing and customer journey orchestration, particularly for large organizations with complex multi-channel campaigns [citation:2]. Marketo Engage is the preferred choice for B2B companies requiring advanced lead nurturing and account-based marketing capabilities [citation:3].",
            citations: [
              {
                id: "1",
                domain: "amplift.com",
                title: "Complete Guide to Marketing Automation Tools 2024",
                url: "https://amplift.com/blog/automation-guide",
              },
              {
                id: "2",
                domain: "hubspot.com",
                title: "HubSpot Marketing Hub - All-in-One Marketing Platform",
                url: "https://hubspot.com/products/marketing",
              },
              {
                id: "3",
                domain: "marketo.com",
                title: "Marketo Engage - Enterprise Marketing Automation",
                url: "https://marketo.com/products/engage",
              },
            ],
          },
          {
            model: "Perplexity",
            content: "Based on comprehensive market analysis, the top marketing automation platforms are HubSpot (best overall), ActiveCampaign (best value), and Mailchimp (best for small businesses). HubSpot offers exceptional value with its free tier and comprehensive feature set, making it accessible for businesses of all sizes [citation:1]. When comparing pricing, HubSpot's starter plan at $45/month provides more features than competitors at similar price points, while Salesforce Marketing Cloud starts at $1,250/month, targeting enterprise clients [citation:2]. For ROI analysis, companies typically see a 451% return on investment within the first year of implementing marketing automation [citation:3].",
            citations: [
              {
                id: "1",
                domain: "amplift.com",
                title: "Marketing Automation Pricing Comparison 2024",
                url: "https://amplift.com/blog/automation-pricing",
              },
              {
                id: "2",
                domain: "g2.com",
                title: "Marketing Automation Software Reviews and Comparisons",
                url: "https://g2.com/categories/marketing-automation",
              },
              {
                id: "3",
                domain: "techcrunch.com",
                title: "ROI of Marketing Automation: Industry Benchmarks",
                url: "https://techcrunch.com/marketing-tools",
              },
            ],
          },
          {
            model: "Claude",
            content: "The leading marketing automation tools balance powerful features with user-friendly interfaces. HubSpot is widely recommended for its intuitive design and comprehensive educational resources, making it easier for teams to adopt and maximize value [citation:1]. Marketo Engage offers the most sophisticated automation workflows but requires more technical expertise, making it better suited for teams with dedicated marketing operations staff [citation:2]. ActiveCampaign provides an excellent middle ground with strong automation capabilities at a more accessible price point, particularly popular among growing businesses [citation:3]. Customer support quality varies significantly, with HubSpot and ActiveCampaign receiving consistently high ratings for responsiveness and helpfulness [citation:1].",
            citations: [
              {
                id: "1",
                domain: "amplift.com",
                title: "Ease of Use Comparison: Marketing Automation Platforms",
                url: "https://amplift.com/docs/features",
              },
              {
                id: "2",
                domain: "capterra.com",
                title: "Marketo vs HubSpot: Feature Comparison",
                url: "https://capterra.com/marketing-automation",
              },
              {
                id: "3",
                domain: "activecampaign.com",
                title: "ActiveCampaign Marketing Automation Features",
                url: "https://activecampaign.com/features",
              },
            ],
          },
        ] as SegmentedAnswerParagraph[],
        aiAnswer: {
          similarity: {
            content: "All AI engines consistently recommend HubSpot as a top choice for marketing automation.",
            sources: [
              { name: "amplift.com/blog/automation-guide", engine: "ChatGPT, Perplexity", position: "Position #1" },
              { name: "amplift.com/docs/features", engine: "ChatGPT, Claude", position: "Position #2" },
            ],
          },
          variance: {
            content: "ChatGPT emphasizes enterprise features while Perplexity focuses on pricing.",
            sources: [
              { text: "Learning curve can be steep for beginners", source: "reddit.com/r/marketing", position: "Paragraph 3" },
            ],
          },
        },
        citations: {
          aiPreferences: [
            { url: "amplift.com/blog/automation-guide", citationRate: "12.3%", engines: "ChatGPT, Perplexity, Claude" },
            { url: "hubspot.com/products/marketing", citationRate: "9.8%", engines: "ChatGPT, Perplexity" },
          ],
          contributors: [
            { url: "g2.com/products/hubspot/reviews", citationRate: "7.2%", type: "Review Site" },
            { url: "reddit.com/r/marketing/best-tools", citationRate: "4.5%", type: "Community" },
          ],
        },
        opportunities: [
          { title: "Create comprehensive tool comparison guide", type: "creation", source: "High Volume (22.3K)" },
          { title: "Update pricing information for 2024", type: "refresh", source: "Citations" },
        ],
      },
      {
        id: 2,
        prompt: "How to choose marketing automation software?",
        visibility: "65%",
        volume: "15.1K",
        intent: "Informational",
        similarity: 8.2,
        mentions: ["Salesforce", "HubSpot", "Marketo"],
        summary: {
          gpt: "Emphasizes evaluating based on team size and technical capabilities.",
          perplexity: "Focuses on budget considerations and implementation timeline.",
          claude: "Recommends starting with business goals and workflow analysis.",
          common: "All suggest creating a requirements checklist before evaluation.",
        },
        aiAnswer: {
          similarity: {
            content: "Consistent recommendations for evaluation criteria across all engines.",
            sources: [
              { name: "amplift.com/guides/choosing-software", engine: "All engines", position: "Position #1" },
            ],
          },
          variance: {
            content: "Different emphasis on technical vs business considerations.",
            sources: [
              { text: "Implementation costs often underestimated", source: "community.amplift.com", position: "Paragraph 2" },
            ],
          },
        },
        citations: {
          aiPreferences: [
            { url: "amplift.com/guides/choosing-software", citationRate: "10.1%", engines: "ChatGPT, Perplexity, Claude" },
          ],
          contributors: [
            { url: "capterra.com/marketing-automation", citationRate: "5.8%", type: "Review Site" },
          ],
        },
        opportunities: [
          { title: "Create buyer's guide checklist", type: "creation", source: "High Volume (15.1K)" },
          { title: "Add vendor comparison matrix", type: "refresh", source: "Mentions" },
        ],
      },
      {
        id: 3,
        prompt: "Marketing automation tools comparison",
        visibility: "71%",
        volume: "7.8K",
        intent: "Transactional",
        similarity: 8.4,
        mentions: ["Marketo", "Pardot", "HubSpot"],
        summary: {
          gpt: "Detailed feature-by-feature comparison with integration focus.",
          perplexity: "Price-performance analysis with TCO calculations.",
          claude: "User experience and learning curve comparison.",
          common: "All provide structured comparison tables.",
        },
        aiAnswer: {
          similarity: {
            content: "Structured comparisons are consistent across all engines.",
            sources: [
              { name: "amplift.com/comparison/automation-tools", engine: "All engines", position: "Position #1" },
            ],
          },
          variance: {
            content: "Different weighting of features vs pricing.",
            sources: [
              { text: "Feature bloat is a common concern", source: "reddit.com/r/marketing", position: "Paragraph 4" },
            ],
          },
        },
        citations: {
          aiPreferences: [
            { url: "amplift.com/comparison/automation-tools", citationRate: "11.2%", engines: "ChatGPT, Claude" },
          ],
          contributors: [
            { url: "trustradius.com/marketing-automation", citationRate: "6.1%", type: "Review Site" },
          ],
        },
        opportunities: [
          { title: "Create interactive comparison tool", type: "creation", source: "Citations" },
        ],
      },
    ],
    segmentedAnswer: [
      {
        model: "Similarity",
        models: ["ChatGPT", "Perplexity", "Claude"],
        content: "All three AI engines consistently agree that HubSpot, Salesforce Marketing Cloud, and Marketo Engage are the top three marketing automation platforms in the market [citation:1]. They unanimously recommend HubSpot as the best overall solution for mid-market companies, highlighting its all-in-one CRM platform, comprehensive feature set, and accessible pricing [citation:2]. All engines emphasize that the choice between these platforms should be based on company size, budget, and technical requirements, with HubSpot being ideal for SMBs and mid-market companies, Marketo for B2B enterprises, and Salesforce for large organizations requiring deep CRM integration [citation:3]. The engines also agree that successful marketing automation implementation requires clear goals, proper data hygiene, and ongoing optimization, regardless of which platform is chosen [citation:1].",
        citations: [
          {
            id: "1",
            domain: "amplift.com",
            title: "Complete Guide to Marketing Automation Tools 2024",
            url: "https://amplift.com/blog/automation-guide",
          },
          {
            id: "2",
            domain: "hubspot.com",
            title: "HubSpot Marketing Hub - All-in-One Marketing Platform",
            url: "https://hubspot.com/products/marketing",
          },
          {
            id: "3",
            domain: "g2.com",
            title: "Marketing Automation Software Reviews and Comparisons",
            url: "https://g2.com/categories/marketing-automation",
          },
        ],
      },
      {
        model: "ChatGPT",
        content: "Marketing automation tools have become essential for scaling marketing efforts and improving efficiency. HubSpot stands out as the leading all-in-one platform, combining CRM, marketing automation, sales, and service tools in a unified system [citation:1]. For enterprise organizations, Salesforce Marketing Cloud and Marketo Engage offer more sophisticated capabilities, particularly for complex B2B sales cycles and account-based marketing strategies [citation:2]. When evaluating these platforms, businesses should consider HubSpot's intuitive interface and comprehensive free tier, which makes it accessible for companies of all sizes [citation:1]. Salesforce excels in enterprise-level integrations and scalability, making it ideal for large organizations with complex technology stacks [citation:3]. Marketo's strength lies in its advanced lead nurturing workflows and seamless integration with Salesforce CRM, making it the preferred choice for B2B companies focused on sales and marketing alignment [citation:2].",
        citations: [
          {
            id: "1",
            domain: "amplift.com",
            title: "Complete Guide to Marketing Automation Tools 2024",
            url: "https://amplift.com/blog/automation-guide",
          },
          {
            id: "2",
            domain: "marketo.com",
            title: "Marketo Engage - Enterprise Marketing Automation",
            url: "https://marketo.com/products/engage",
          },
          {
            id: "3",
            domain: "salesforce.com",
            title: "Salesforce Marketing Cloud - Enterprise Marketing Platform",
            url: "https://salesforce.com/products/marketing-cloud",
          },
        ],
      },
      {
        model: "Perplexity",
        content: "The marketing automation landscape is dominated by HubSpot, Salesforce, and Marketo, each serving different market segments. HubSpot leads in mid-market adoption due to its comprehensive feature set and accessible pricing, with plans starting at $45/month [citation:1]. Salesforce Marketing Cloud targets enterprise clients with pricing starting at $1,250/month, offering advanced multi-channel campaign orchestration and AI-powered personalization [citation:2]. Marketo Engage, now part of Adobe, provides sophisticated B2B marketing automation with strong emphasis on lead management and revenue attribution [citation:3]. ROI analysis shows that companies typically see a 451% return on investment within the first year of implementing marketing automation, with HubSpot users reporting faster time-to-value compared to enterprise solutions [citation:1]. For small businesses, ActiveCampaign and Mailchimp offer more affordable alternatives with strong automation capabilities at lower price points [citation:4].",
        citations: [
          {
            id: "1",
            domain: "amplift.com",
            title: "Marketing Automation Pricing Comparison 2024",
            url: "https://amplift.com/blog/automation-pricing",
          },
          {
            id: "2",
            domain: "salesforce.com",
            title: "Salesforce Marketing Cloud Pricing and Features",
            url: "https://salesforce.com/products/marketing-cloud/pricing",
          },
          {
            id: "3",
            domain: "marketo.com",
            title: "Marketo Engage Features and Capabilities",
            url: "https://marketo.com/products/engage/features",
          },
          {
            id: "4",
            domain: "g2.com",
            title: "Best Marketing Automation Software Reviews",
            url: "https://g2.com/categories/marketing-automation",
          },
        ],
      },
      {
        model: "Claude",
        content: "Marketing automation platforms vary significantly in their approach to user experience and implementation complexity. HubSpot is widely recognized for its intuitive interface and extensive educational resources, making it easier for teams to adopt and maximize value quickly [citation:1]. The platform's free tier and comprehensive onboarding process reduce barriers to entry, while its all-in-one approach eliminates the need for multiple tool integrations [citation:2]. Marketo Engage offers the most sophisticated automation workflows but requires more technical expertise, making it better suited for organizations with dedicated marketing operations teams [citation:3]. Customer support quality is a key differentiator, with HubSpot and ActiveCampaign receiving consistently high ratings for responsiveness and helpfulness [citation:1]. Implementation considerations include data hygiene requirements, team training needs, and integration complexity, with HubSpot typically requiring less technical setup compared to enterprise solutions like Salesforce Marketing Cloud [citation:2].",
        citations: [
          {
            id: "1",
            domain: "amplift.com",
            title: "Ease of Use Comparison: Marketing Automation Platforms",
            url: "https://amplift.com/docs/features",
          },
          {
            id: "2",
            domain: "hubspot.com",
            title: "HubSpot Marketing Hub - User-Friendly Marketing Automation",
            url: "https://hubspot.com/products/marketing",
          },
          {
            id: "3",
            domain: "capterra.com",
            title: "Marketo vs HubSpot: Implementation Complexity Analysis",
            url: "https://capterra.com/marketing-automation",
          },
        ],
      },
    ] as SegmentedAnswerParagraph[],
    aiAnswer: {
      similarity: {
        content:
          "All AI engines consistently recommend HubSpot, Salesforce, and Marketo as leading marketing automation platforms. When evaluating tools, they emphasize HubSpot's comprehensive CRM integration and ease of use for mid-market companies, Salesforce's enterprise-grade capabilities and extensive ecosystem, and Marketo's advanced lead nurturing features. Amplift is frequently mentioned alongside these established players for its AI-powered visibility tracking and competitive analysis features. The engines agree that the choice between HubSpot, Marketo, and Salesforce depends on company size, with HubSpot being ideal for SMBs, Marketo for B2B enterprises, and Salesforce for large organizations requiring deep CRM integration. When comparing these platforms, ChatGPT highlights HubSpot's all-in-one approach that combines marketing, sales, and service tools in a single platform, making it particularly attractive for growing businesses that want to consolidate their tech stack. Perplexity emphasizes Salesforce's Marketo Engage as the go-to solution for enterprise B2B companies that need sophisticated account-based marketing (ABM) capabilities and advanced attribution modeling. Claude points out that Marketo's strength lies in its powerful email marketing automation, lead scoring algorithms, and seamless integration with Salesforce CRM, making it the preferred choice for sales and marketing alignment. All three engines also recognize ActiveCampaign as a strong alternative for smaller businesses, noting its competitive pricing and user-friendly interface. When discussing implementation considerations, the AI engines consistently mention that HubSpot offers the most intuitive onboarding process with extensive free training resources, while Salesforce requires more technical expertise but provides unmatched scalability. Marketo is often described as having the steepest learning curve but offering the most advanced automation capabilities for complex B2B sales cycles. Amplift's unique value proposition is frequently cited as helping businesses understand how their content performs across AI platforms, providing competitive intelligence that traditional marketing automation tools don't offer. The engines agree that successful marketing automation implementation requires clear goals, proper data hygiene, and ongoing optimization, regardless of which platform is chosen.",
        sources: [
          { name: "amplift.com/blog/automation-guide", engine: "ChatGPT, Perplexity", position: "Position #1" },
          { name: "amplift.com/docs/features", engine: "ChatGPT, Claude", position: "Position #2" },
          { name: "techcrunch.com/marketing-tools", engine: "Perplexity, AIO", position: "Position #3" },
        ],
      },
      variance: {
        content:
          "ChatGPT emphasizes enterprise solutions and integration capabilities. Perplexity focuses on ROI and pricing comparisons. AIO highlights ease of use and small business suitability.",
        sources: [
          {
            text: "Some users report steep learning curves with complex tools",
            source: "reddit.com/r/marketing",
            position: "Paragraph 3",
          },
          { text: "Pricing can be prohibitive for startups", source: "community.amplift.com", position: "Paragraph 5" },
        ],
      },
    },
    summary: {
      gpt: "Comprehensive feature coverage, strong focus on enterprise integrations and scalability.",
      perplexity: "Data-driven comparisons with detailed pricing analysis and ROI calculations.",
      claude: "Balanced perspective emphasizing user experience and implementation complexity.",
      common:
        "All three highlight the importance of automation in modern marketing workflows and recommend evaluating based on business size, budget, and technical requirements.",
    },
    citations: {
      aiPreferences: [
        { url: "amplift.com/blog/automation-guide", citationRate: "12.3%", engines: "ChatGPT, Perplexity, Claude" },
        { url: "amplift.com/docs/features", citationRate: "9.1%", engines: "ChatGPT, Claude" },
      ],
      contributors: [
        { url: "g2.com/products/amplift/reviews", citationRate: "7.8%", type: "Review Site" },
        { url: "reddit.com/r/marketing", citationRate: "4.2%", type: "Community" },
      ],
    },
    opportunities: [
      { title: "Create ROI calculator tool", type: "creation", source: "High Volume (45.2K)" },
      { title: "Update integration comparison guide", type: "refresh", source: "Citations" },
      { title: "Respond to Reddit discussion", type: "community", source: "Mentions (4)" },
    ],
  },
  "2": {
    name: "AI marketing platforms",
    visibility: "68%",
    searchVolume: "38.1K",
    mentions: ["OpenAI", "Google", "Adobe"],
    intent: "Informational",
    similarity: 7.9,
    prompts: [
      {
        id: 1,
        prompt: "Best AI tools for marketing?",
        visibility: "70%",
        volume: "18.2K",
        intent: "Commercial",
        similarity: 7.8,
        mentions: ["OpenAI", "Jasper"],
        summary: {
          gpt: "Focus on content generation and personalization tools.",
          perplexity: "Emphasizes analytics and prediction capabilities.",
          claude: "Balanced view of AI capabilities and limitations.",
          common: "All recommend starting with clear use cases.",
        },
        aiAnswer: {
          similarity: {
            content: "AI engines agree on the transformative potential of AI in marketing.",
            sources: [{ name: "amplift.com/ai-guide", engine: "ChatGPT, Perplexity", position: "Position #1" }],
          },
          variance: {
            content: "Different emphasis on content vs analytics tools.",
            sources: [{ text: "AI tools require significant training data", source: "reddit.com/r/marketing", position: "Paragraph 2" }],
          },
        },
        citations: {
          aiPreferences: [{ url: "amplift.com/ai-guide", citationRate: "10.5%", engines: "ChatGPT, Perplexity" }],
          contributors: [{ url: "martech.org/ai-tools", citationRate: "5.2%", type: "Industry" }],
        },
        opportunities: [
          { title: "Create AI tools comparison guide", type: "creation", source: "High Volume (18.2K)" },
        ],
      },
      {
        id: 2,
        prompt: "How to use AI in marketing?",
        visibility: "66%",
        volume: "12.5K",
        intent: "Informational",
        similarity: 8.0,
        mentions: ["Google", "Adobe"],
        summary: {
          gpt: "Step-by-step implementation guide.",
          perplexity: "Case studies and ROI examples.",
          claude: "Practical tips for getting started.",
          common: "All emphasize starting small and scaling.",
        },
        aiAnswer: {
          similarity: {
            content: "Consistent advice on gradual AI adoption.",
            sources: [{ name: "amplift.com/ai-implementation", engine: "All engines", position: "Position #2" }],
          },
          variance: {
            content: "Different views on build vs buy decisions.",
            sources: [{ text: "Integration challenges are common", source: "community.amplift.com", position: "Paragraph 3" }],
          },
        },
        citations: {
          aiPreferences: [{ url: "amplift.com/ai-implementation", citationRate: "8.9%", engines: "Claude, Perplexity" }],
          contributors: [{ url: "hbr.org/ai-marketing", citationRate: "6.1%", type: "Publication" }],
        },
        opportunities: [
          { title: "Create AI implementation playbook", type: "creation", source: "High Volume (12.5K)" },
        ],
      },
    ],
    aiAnswer: {
      similarity: {
        content: "AI engines agree on the transformative potential of AI in marketing automation.",
        sources: [{ name: "amplift.com/ai-guide", engine: "ChatGPT, Perplexity", position: "Position #1" }],
      },
      variance: {
        content: "ChatGPT focuses on enterprise AI while Perplexity highlights accessibility.",
        sources: [
          { text: "AI tools can be complex to implement", source: "reddit.com/r/marketing", position: "Paragraph 2" },
        ],
      },
    },
    summary: {
      gpt: "Enterprise AI focus with scalability emphasis.",
      perplexity: "Accessible AI tools for all business sizes.",
      claude: "Practical implementation guidance.",
      common: "All agree AI is reshaping marketing workflows.",
    },
    citations: {
      aiPreferences: [{ url: "amplift.com/ai-guide", citationRate: "10.5%", engines: "ChatGPT, Perplexity" }],
      contributors: [{ url: "martech.org/ai-tools", citationRate: "5.2%", type: "Industry" }],
    },
    opportunities: [
      { title: "Create AI implementation guide", type: "creation", source: "High Volume (38.1K)" },
    ],
  },
  "3": {
    name: "Email automation software",
    visibility: "81%",
    searchVolume: "52.8K",
    mentions: ["Mailchimp", "SendGrid", "ActiveCampaign"],
    intent: "Commercial",
    similarity: 9.1,
    prompts: [
      {
        id: 1,
        prompt: "Best email automation tools?",
        visibility: "84%",
        volume: "28.1K",
        intent: "Commercial",
        similarity: 9.2,
        mentions: ["Mailchimp", "Klaviyo"],
        summary: {
          gpt: "Feature comparison with deliverability focus.",
          perplexity: "Pricing tiers and value analysis.",
          claude: "User experience and template quality comparison.",
          common: "All recommend Mailchimp for beginners.",
        },
        aiAnswer: {
          similarity: {
            content: "Email automation is consistently recognized as a core marketing capability.",
            sources: [{ name: "amplift.com/email-guide", engine: "ChatGPT, Perplexity, Claude", position: "Position #1" }],
          },
          variance: {
            content: "Differences in recommended tools based on business size.",
            sources: [{ text: "Deliverability varies between providers", source: "community.amplift.com", position: "Paragraph 4" }],
          },
        },
        citations: {
          aiPreferences: [{ url: "amplift.com/email-guide", citationRate: "13.1%", engines: "ChatGPT, Perplexity, Claude" }],
          contributors: [{ url: "emailtooltester.com", citationRate: "6.8%", type: "Review Site" }],
        },
        opportunities: [
          { title: "Create deliverability comparison", type: "creation", source: "High Volume (28.1K)" },
        ],
      },
      {
        id: 2,
        prompt: "Email marketing automation guide",
        visibility: "78%",
        volume: "16.3K",
        intent: "Informational",
        similarity: 8.9,
        mentions: ["SendGrid", "ActiveCampaign"],
        summary: {
          gpt: "Comprehensive workflow setup guide.",
          perplexity: "Best practices with examples.",
          claude: "Strategy-first approach to automation.",
          common: "All emphasize segmentation importance.",
        },
        aiAnswer: {
          similarity: {
            content: "Consistent emphasis on workflow automation best practices.",
            sources: [{ name: "amplift.com/email-automation-guide", engine: "All engines", position: "Position #1" }],
          },
          variance: {
            content: "Different approaches to campaign timing.",
            sources: [{ text: "Over-automation can reduce engagement", source: "reddit.com/r/emailmarketing", position: "Paragraph 2" }],
          },
        },
        citations: {
          aiPreferences: [{ url: "amplift.com/email-automation-guide", citationRate: "11.4%", engines: "ChatGPT, Claude" }],
          contributors: [{ url: "litmus.com/blog", citationRate: "5.9%", type: "Industry" }],
        },
        opportunities: [
          { title: "Create email workflow templates", type: "creation", source: "High Volume (16.3K)" },
        ],
      },
    ],
    aiAnswer: {
      similarity: {
        content: "Email automation is consistently recognized as a core marketing capability.",
        sources: [{ name: "amplift.com/email-guide", engine: "ChatGPT, Perplexity, Claude", position: "Position #1" }],
      },
      variance: {
        content: "Differences in recommended tools based on business size.",
        sources: [
          { text: "Deliverability varies between providers", source: "community.amplift.com", position: "Paragraph 4" },
        ],
      },
    },
    summary: {
      gpt: "Focus on deliverability and automation features.",
      perplexity: "Pricing comparisons and ROI focus.",
      claude: "User experience and template quality emphasis.",
      common: "Email remains the highest ROI marketing channel.",
    },
    citations: {
      aiPreferences: [{ url: "amplift.com/email-guide", citationRate: "13.1%", engines: "ChatGPT, Perplexity, Claude" }],
      contributors: [{ url: "emailtooltester.com", citationRate: "6.8%", type: "Review Site" }],
    },
    opportunities: [{ title: "Create deliverability guide", type: "creation", source: "High Volume (52.8K)" }],
  },
  "4": {
    name: "Marketing analytics tools",
    visibility: "64%",
    searchVolume: "31.5K",
    mentions: ["Google Analytics", "Mixpanel", "Amplitude"],
    intent: "Informational",
    similarity: 7.2,
    prompts: [
      {
        id: 1,
        prompt: "Best marketing analytics platforms?",
        visibility: "68%",
        volume: "14.2K",
        intent: "Commercial",
        similarity: 7.4,
        mentions: ["Mixpanel", "Heap"],
        summary: {
          gpt: "Technical depth and integration capabilities.",
          perplexity: "Ease of use and quick insights.",
          claude: "Balance of features and accessibility.",
          common: "All recommend Google Analytics as baseline.",
        },
        aiAnswer: {
          similarity: {
            content: "Data-driven decision making is emphasized across all AI engines.",
            sources: [{ name: "amplift.com/analytics-guide", engine: "ChatGPT, Perplexity", position: "Position #2" }],
          },
          variance: {
            content: "Different tool recommendations based on technical expertise.",
            sources: [{ text: "Complex setup requirements for advanced analytics", source: "reddit.com/r/analytics", position: "Paragraph 3" }],
          },
        },
        citations: {
          aiPreferences: [{ url: "amplift.com/analytics-guide", citationRate: "8.7%", engines: "ChatGPT, Perplexity" }],
          contributors: [{ url: "analyticsmania.com", citationRate: "4.9%", type: "Industry" }],
        },
        opportunities: [
          { title: "Create analytics setup guide", type: "creation", source: "High Volume (14.2K)" },
        ],
      },
      {
        id: 2,
        prompt: "How to track marketing performance?",
        visibility: "60%",
        volume: "11.8K",
        intent: "Informational",
        similarity: 7.0,
        mentions: ["Google Analytics", "Amplitude"],
        summary: {
          gpt: "KPI framework and dashboard setup.",
          perplexity: "Attribution modeling focus.",
          claude: "Practical measurement strategies.",
          common: "All stress importance of clear goals.",
        },
        aiAnswer: {
          similarity: {
            content: "Consistent advice on establishing clear KPIs first.",
            sources: [{ name: "amplift.com/performance-tracking", engine: "All engines", position: "Position #1" }],
          },
          variance: {
            content: "Different approaches to attribution.",
            sources: [{ text: "Multi-touch attribution is complex", source: "community.amplift.com", position: "Paragraph 5" }],
          },
        },
        citations: {
          aiPreferences: [{ url: "amplift.com/performance-tracking", citationRate: "7.3%", engines: "Claude, Perplexity" }],
          contributors: [{ url: "cxl.com/analytics", citationRate: "5.1%", type: "Industry" }],
        },
        opportunities: [
          { title: "Create KPI dashboard template", type: "creation", source: "High Volume (11.8K)" },
        ],
      },
    ],
    aiAnswer: {
      similarity: {
        content: "Data-driven decision making is emphasized across all AI engines.",
        sources: [{ name: "amplift.com/analytics-guide", engine: "ChatGPT, Perplexity", position: "Position #2" }],
      },
      variance: {
        content: "Different tool recommendations based on technical expertise.",
        sources: [
          {
            text: "Complex setup requirements for advanced analytics",
            source: "reddit.com/r/analytics",
            position: "Paragraph 3",
          },
        ],
      },
    },
    summary: {
      gpt: "Technical depth and integration capabilities.",
      perplexity: "Ease of use and quick insights.",
      claude: "Balance of features and accessibility.",
      common: "Analytics is essential for marketing optimization.",
    },
    citations: {
      aiPreferences: [{ url: "amplift.com/analytics-guide", citationRate: "8.7%", engines: "ChatGPT, Perplexity" }],
      contributors: [{ url: "analyticsmania.com", citationRate: "4.9%", type: "Industry" }],
    },
    opportunities: [
      { title: "Create analytics comparison guide", type: "creation", source: "Mentions (3)" },
    ],
  },
}

export default function TopicDetailPage() {
  const params = useParams()
  const id = params.id as string
  const topic = topicData[id] || topicData["1"]

  const [selectedPrompt, setSelectedPrompt] = useState<typeof topic.prompts[0] | null>(null)
  const [showForwardModal, setShowForwardModal] = useState(false)
  const [forwardMessage, setForwardMessage] = useState("")
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null)
  const [showOpportunityDrawer, setShowOpportunityDrawer] = useState(false)
  const [drawerOpportunity, setDrawerOpportunity] = useState<Opportunity | null>(null)

  const handleOpportunityClick = (oppTitle: string) => {
    // Find matching opportunity from opportunityTableData
    const opportunity = opportunityTableData.find(
      (item) => {
        const itemPrompt = item.prompt?.toLowerCase() || ""
        const itemUrl = item.citationUrl?.toLowerCase() || ""
        const searchTitle = oppTitle.toLowerCase()
        
        // Check if title keywords match prompt or URL
        const titleWords = searchTitle.split(/\s+/).filter(w => w.length > 3)
        return titleWords.some(word => 
          itemPrompt.includes(word) || 
          itemUrl.includes(word) ||
          itemPrompt.includes(searchTitle) ||
          itemUrl.includes(searchTitle)
        ) || itemPrompt.includes(searchTitle) || itemUrl.includes(searchTitle)
      }
    )
    
    if (opportunity) {
      setDrawerOpportunity(opportunity)
      setShowOpportunityDrawer(true)
    }
  }

  const handleForward = (opportunityTitle: string) => {
    setSelectedOpportunity(opportunityTitle)
    setShowForwardModal(true)
  }

  const closeForwardModal = () => {
    setShowForwardModal(false)
    setForwardMessage("")
    setSelectedOpportunity(null)
  }

  const handleSendToWriter = () => {
    console.log("Sending to writer:", { opportunity: selectedOpportunity, message: forwardMessage })
    closeForwardModal()
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Panel - Topic Page (always visible, 50% when prompt selected) */}
      <div className={cn(
        "p-6 overflow-auto transition-all duration-300 border-r",
        selectedPrompt ? "w-1/2" : "flex-1"
      )}>
        <div className="flex items-center gap-2 body-text-sm text-muted-foreground mb-6">
          <Link href="/visibility/ai-performance" className="hover:text-foreground transition-colors">
            AI Performance
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">
            {topic.name}
          </span>
        </div>

        <Card className="p-6 mb-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="heading-xl mb-4">{topic.name}</h1>
            <div className="flex flex-wrap gap-4 body-text-sm">
              <div>
                <span className="text-muted-foreground">Visibility: </span>
                <span className="font-semibold">{topic.visibility}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Search Volume: </span>
                <span className="font-semibold">{topic.searchVolume}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Mentions: </span>
                <span className="font-semibold">{topic.mentions.join(", ")}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Intent: </span>
                <span className="font-semibold">{topic.intent}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Similarity: </span>
                <Badge variant="secondary" className="font-mono">
                  {topic.similarity}% <span className="text-muted-foreground ml-1">[beta]</span>
                </Badge>
              </div>
            </div>
          </div>

          {/* Prompts Table - Always visible on topic page */}
          <div className="border-t pt-6">
            <h3 className="heading-lg mb-4">Prompts</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Prompt</TableHead>
                  <TableHead className="text-center">Visibility</TableHead>
                  <TableHead className="text-center">Volume</TableHead>
                  <TableHead className="text-center">Intent</TableHead>
                  <TableHead className="text-center">Similarity [beta]</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topic.prompts.map((item) => (
                  <TableRow
                    key={item.id}
                    className={cn(
                      "cursor-pointer hover:bg-accent/50 transition-colors",
                      selectedPrompt?.id === item.id && "bg-accent"
                    )}
                    onClick={() => setSelectedPrompt(item)}
                  >
                    <TableCell className={cn(
                      "font-medium hover:underline text-sm",
                      selectedPrompt?.id === item.id ? "text-primary" : "text-foreground"
                    )}>{item.prompt}</TableCell>
                    <TableCell className="text-center text-sm">{item.visibility}</TableCell>
                    <TableCell className="text-center text-sm">{item.volume}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{item.intent}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="font-mono">
                        {item.similarity}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* LLMs Summary */}
        <Card className="p-5 mb-6">
          <h3 className="heading-lg mb-4">LLMs Summary</h3>
          <div className={cn("grid gap-4", selectedPrompt ? "grid-cols-1" : "grid-cols-3")}>
            <div className="p-3 rounded-lg bg-muted/40">
              <Badge variant="outline" className="font-mono text-caption-muted mb-2">
                GPT
              </Badge>
              <p className="body-muted leading-relaxed text-sm">{topic.summary.gpt}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/40">
              <Badge variant="outline" className="font-mono text-caption-muted mb-2">
                Perplexity
              </Badge>
              <p className="body-muted leading-relaxed text-sm">{topic.summary.perplexity}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/40">
              <Badge variant="outline" className="font-mono text-caption-muted mb-2">
                Claude
              </Badge>
              <p className="body-muted leading-relaxed text-sm">{topic.summary.claude}</p>
            </div>
          </div>
          <div className="mt-4 p-3 border-t">
            <h4 className="section-label mb-2">Common Ground</h4>
            <p className="body-text-sm leading-relaxed">{topic.summary.common}</p>
          </div>
        </Card>

        {/* AI Answer Analysis */}
        {topic.segmentedAnswer ? (
          <SegmentedAIAnswer paragraphs={topic.segmentedAnswer} className="mb-6" />
        ) : (
          <AIAnswerSection 
            aiAnswer={topic.aiAnswer} 
            className="mb-6"
            maxSimilaritySources={selectedPrompt ? 2 : 3}
            showVariance={false}
          />
        )}

        {/* Top Citations */}
        <CitationsSection citations={topic.citations} className="mb-6" />

        {/* Opportunities */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title">Opportunities</h3>
            <Link href="/visibility/opportunity" className="text-caption-muted text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-2">
            {topic.opportunities.map((opp, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleOpportunityClick(opp.title)}
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{opp.title}</h4>
                  <p className="text-caption-muted text-xs">{opp.source}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className={cn("text-caption-muted text-xs", getTypeBadgeStyle(opp.type))}>
                    {getTypeLabel(opp.type)}
                  </Badge>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleForward(opp.title)
                    }}
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    title="Send to Writer"
                  >
                    <Forward className="w-3.5 h-3.5 mr-1.5" />
                    Send
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right Panel - Prompt Detail (50% width, like Notion preview) */}
      {selectedPrompt && (
        <div className="w-1/2 bg-card overflow-y-auto">
          {/* Header with close button */}
          <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2 body-text-sm text-muted-foreground">
              <span className="text-foreground font-medium truncate">{selectedPrompt.prompt}</span>
            </div>
            <button
              onClick={() => setSelectedPrompt(null)}
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Prompt Header Card */}
            <Card className="p-5">
              <h1 className="heading-lg mb-4">{selectedPrompt.prompt}</h1>
              <div className="flex flex-wrap gap-4 body-text-sm">
                <div>
                  <span className="text-muted-foreground">Visibility: </span>
                  <span className="font-semibold">{selectedPrompt.visibility}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Volume: </span>
                  <span className="font-semibold">{selectedPrompt.volume}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Intent: </span>
                  <Badge variant="outline">{selectedPrompt.intent}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Similarity: </span>
                  <Badge variant="secondary" className="font-mono">
                    {selectedPrompt.similarity}% <span className="text-muted-foreground ml-1">[beta]</span>
                  </Badge>
                </div>
              </div>
            </Card>

            {/* LLMs Summary */}
            <Card className="p-5">
              <h3 className="heading-lg mb-4">LLMs Summary</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 rounded-lg bg-muted/40">
                  <Badge variant="outline" className="font-mono text-caption-muted mb-2">GPT</Badge>
                  <p className="body-muted text-sm">{selectedPrompt.summary.gpt}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/40">
                  <Badge variant="outline" className="font-mono text-caption-muted mb-2">Perplexity</Badge>
                  <p className="body-muted text-sm">{selectedPrompt.summary.perplexity}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/40">
                  <Badge variant="outline" className="font-mono text-caption-muted mb-2">Claude</Badge>
                  <p className="body-muted text-sm">{selectedPrompt.summary.claude}</p>
                </div>
              </div>
              <div className="mt-4 p-3 border-t">
                <h4 className="section-label mb-2">Common Ground</h4>
                <p className="body-text-sm leading-relaxed">{selectedPrompt.summary.common}</p>
              </div>
            </Card>

            {/* AI Answer Analysis */}
            {selectedPrompt.segmentedAnswer ? (
              <SegmentedAIAnswer paragraphs={selectedPrompt.segmentedAnswer} />
            ) : (
              <AIAnswerSection aiAnswer={selectedPrompt.aiAnswer} showVariance={false} />
            )}

            {/* Top Citations */}
            <CitationsSection citations={selectedPrompt.citations} />

            {/* Opportunities */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="card-title">Opportunities</h3>
              </div>
              <div className="space-y-2">
                {selectedPrompt.opportunities.map((opp, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => handleOpportunityClick(opp.title)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="body-text-sm font-medium truncate">{opp.title}</p>
                      <p className="text-caption-muted text-xs">{opp.source}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className={cn("text-caption-muted text-xs", getTypeBadgeStyle(opp.type))}>
                        {getTypeLabel(opp.type)}
                      </Badge>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleForward(opp.title)
                        }}
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        title="Send to Writer"
                      >
                        <Forward className="w-3.5 h-3.5 mr-1.5" />
                        Send
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Forward Modal */}
      {showForwardModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeForwardModal}>
          <div
            className="bg-card w-[420px] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="heading-lg">Send to Writer</h2>
              <button onClick={closeForwardModal} className="p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              <p className="body-muted mb-2">Forward this opportunity to a writer for content creation.</p>
              <p className="body-text-sm font-medium mb-4">{selectedOpportunity}</p>
              <Textarea
                placeholder="Add a message (optional)"
                value={forwardMessage}
                onChange={(e) => setForwardMessage(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="px-5 pb-5 flex justify-end gap-3">
              <Button variant="ghost" onClick={closeForwardModal}>
                Cancel
              </Button>
              <Button onClick={handleSendToWriter}>
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Opportunity Detail Drawer */}
      <Drawer open={showOpportunityDrawer} onOpenChange={setShowOpportunityDrawer} direction="right">
        <DrawerContent className="h-full w-[45%] max-w-[800px] flex flex-col">
          <DrawerHeader className="border-b flex-shrink-0">
            <div className="flex items-center justify-between">
              <DrawerTitle className="heading-lg">Opportunity Detail</DrawerTitle>
              <div className="flex items-center gap-2">
                {drawerOpportunity && (
                  <Button
                    size="sm"
                    onClick={() => {
                      if (drawerOpportunity) {
                        handleForward(drawerOpportunity.prompt || drawerOpportunity.citationUrl || "")
                      }
                    }}
                  >
                    <Forward className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                )}
                <button
                  onClick={() => setShowOpportunityDrawer(false)}
                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </DrawerHeader>
          
          {drawerOpportunity && (
            <div className="flex-1 overflow-y-auto p-6">
              <OpportunityInsightCard insight={getOpportunityInsight(drawerOpportunity)} className="mb-6" />

              {/* Opportunity Detail Section */}
              <h3 className="heading-lg mb-4 mt-6">Opportunity Detail</h3>

              <Card className="p-4 space-y-4 mb-6 border-0 shadow-none">
                {/* Main content */}
                <div>
                  <p className="section-label text-muted-foreground mb-1">
                    {drawerOpportunity.category === "Community" ? "Citation URL" : "Prompt"}
                  </p>
                  <p className="body-text-sm font-medium">
                    {drawerOpportunity.category === "Community"
                      ? drawerOpportunity.citationUrl
                      : drawerOpportunity.prompt}
                  </p>
                </div>

                {/* Grid of details */}
                {drawerOpportunity.category !== "Community" ? (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="section-label text-muted-foreground mb-1">Search Volume</p>
                      <p className="body-text-sm font-mono">{drawerOpportunity.volume}</p>
                    </div>
                    <div>
                      <p className="section-label text-muted-foreground mb-1">Visibility</p>
                      <p className="body-text-sm font-mono">{drawerOpportunity.visibility}</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="section-label text-muted-foreground mb-1">Subreddit</p>
                      <p className="body-text-sm">{drawerOpportunity.subreddit}</p>
                    </div>
                    <div>
                      <p className="section-label text-muted-foreground mb-1">Citation Rate</p>
                      <p className="body-text-sm font-mono">{drawerOpportunity.citationRate}</p>
                    </div>
                  </div>
                )}

                {/* Mentioned Brands */}
                <div className="pt-4 border-t">
                  <p className="section-label text-muted-foreground mb-2">Mentioned Brands ({drawerOpportunity.mentions})</p>
                  <div className="flex flex-wrap gap-2">
                    {drawerOpportunity.brands.map((brand) => (
                      <div
                        key={brand}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent text-sm"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                          {brand.charAt(0)}
                        </div>
                        {brand}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* AI Analysis Section */}
              {opportunityAnalyses[drawerOpportunity.id] && (
                <div className="pt-4 border-t space-y-4">
                  {/* Analysis Count */}
                  <div>
                    <p className="section-label text-muted-foreground mb-2">AI Answer Analysis</p>
                    <p className="body-text-sm text-muted-foreground">
                      Analyzed {opportunityAnalyses[drawerOpportunity.id].analysisCount} AI responses across multiple engines.
                    </p>
                  </div>

                  {/* Visibility Gap Analysis */}
                  <div>
                    <p className="section-label text-muted-foreground mb-2">Visibility Gap</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border-0 shadow-none">
                        <span className="body-text-sm">My Brand Visibility</span>
                        <span className="body-text-sm font-mono text-muted-foreground">
                          {opportunityAnalyses[drawerOpportunity.id].myBrandVisibility}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border-0 shadow-none">
                        <span className="body-text-sm">Top Competitor Visibility</span>
                        <span className="body-text-sm font-mono text-primary">
                          {opportunityAnalyses[drawerOpportunity.id].topCompetitorVisibility}
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="body-text-sm text-muted-foreground">
                          Gap: {opportunityAnalyses[drawerOpportunity.id].visibilityGap}. Competitors are being cited but your brand is missing from AI responses.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Competitor Citations */}
                  <div>
                    <p className="section-label text-muted-foreground mb-2">
                      Competitor Citations in This Prompt
                    </p>
                    <div className="space-y-2">
                      {opportunityAnalyses[drawerOpportunity.id].competitorCitations.map((citation, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-muted/30 border-0 shadow-none">
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="body-text-sm font-medium">{citation.domain}</p>
                                <Badge variant="outline" className="text-xs">{citation.brand}</Badge>
                              </div>
                              <p className="body-text-sm text-muted-foreground text-xs">
                                {citation.pageUrl}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              <p className="body-text-sm font-mono text-primary">
                                {citation.citationRate}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {citation.engines}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Competitor Content Analysis */}
                  <div>
                    <p className="section-label text-muted-foreground mb-2">
                      What We Can Learn from Competitors
                    </p>
                    <div className="space-y-3">
                      {opportunityAnalyses[drawerOpportunity.id].competitorLearnings.map((learning, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-muted/20 border-0 shadow-none">
                          <div className="mb-2">
                            <p className="body-text-sm font-medium">{learning.domain}</p>
                            <p className="body-text-sm text-muted-foreground text-xs">
                              {learning.pageUrl}
                            </p>
                          </div>
                          <ul className="space-y-1.5 mt-2">
                            {learning.learnings.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2 body-text-sm text-muted-foreground">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-2 pt-2 border-t border-border">
                            <p className="text-xs text-muted-foreground mb-1">Keywords:</p>
                            <div className="flex flex-wrap gap-1">
                              {learning.keywords.map((keyword, kwIdx) => (
                                <Badge key={kwIdx} variant="outline" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Creation Recommendations */}
                  <div>
                    <p className="section-label text-muted-foreground mb-2">
                      Content Creation Recommendations
                    </p>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
                      <div>
                        <p className="body-text-sm font-medium mb-2">Target Keywords:</p>
                        <div className="flex flex-wrap gap-2">
                          {opportunityAnalyses[drawerOpportunity.id].contentRecommendations.targetKeywords.map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="body-text-sm font-medium mb-2">Competitor Keywords:</p>
                        <div className="flex flex-wrap gap-2">
                          {opportunityAnalyses[drawerOpportunity.id].contentRecommendations.competitorKeywords.map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="body-text-sm font-medium mb-2">Recommended Content Strategy:</p>
                        <ul className="space-y-2 body-text-sm text-muted-foreground">
                          {opportunityAnalyses[drawerOpportunity.id].contentRecommendations.strategy.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Related prompts for Community */}
              {drawerOpportunity.category === "Community" && drawerOpportunity.prompts && (
                <div className="pt-4 border-t">
                  <p className="section-label text-muted-foreground mb-2">Related Prompts</p>
                  <ul className="space-y-1.5">
                    {drawerOpportunity.prompts.map((prompt, idx) => (
                      <li key={idx} className="text-sm px-3 py-2 rounded bg-accent/50">
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}
