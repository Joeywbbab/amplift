import { AIAnswer, Citations, OpportunityAnalysis } from "@/lib/types"

// Mock AI Answer data for opportunities
export const opportunityAIAnswers: Record<number, AIAnswer> = {
  1: {
    similarity: {
      content: "AI engines consistently recommend HubSpot and Mailchimp as top choices for small business marketing automation.",
      sources: [
        { name: "hubspot.com/marketing-automation", engine: "ChatGPT, Perplexity", position: "Position #1" },
        { name: "mailchimp.com/features", engine: "Claude, Perplexity", position: "Position #2" },
      ],
    },
    variance: {
      content: "ChatGPT emphasizes ease of use while Perplexity focuses on pricing and ROI metrics.",
      sources: [
        { text: "Pricing can be prohibitive for very small teams", source: "reddit.com/r/smallbusiness", position: "Paragraph 3" },
      ],
    },
  },
  2: {
    similarity: {
      content: "All engines agree that structured content and clear topic authority are essential for B2B SaaS AI visibility.",
      sources: [
        { name: "amplift.com/ai-visibility-guide", engine: "All engines", position: "Position #1" },
      ],
    },
    variance: {
      content: "Different emphasis on technical SEO vs content quality approaches.",
      sources: [
        { text: "Technical implementation varies by platform", source: "community.amplift.com", position: "Paragraph 2" },
      ],
    },
  },
  5: {
    similarity: {
      content: "Consistent distinction: CRM manages relationships, marketing automation manages campaigns and nurturing.",
      sources: [
        { name: "salesforce.com/crm-vs-automation", engine: "ChatGPT, Claude", position: "Position #1" },
        { name: "hubspot.com/comparison-guide", engine: "Perplexity", position: "Position #2" },
      ],
    },
    variance: {
      content: "Some engines emphasize integration benefits while others focus on standalone use cases.",
      sources: [
        { text: "Integration complexity often underestimated", source: "reddit.com/r/marketing", position: "Paragraph 4" },
      ],
    },
  },
}

// Mock citations data for opportunities
export const opportunityCitations: Record<number, Citations> = {
  1: {
    aiPreferences: [
      { url: "hubspot.com/marketing-automation-guide", citationRate: "15.2%", engines: "ChatGPT, Perplexity, Claude" },
      { url: "mailchimp.com/resources/automation", citationRate: "11.8%", engines: "ChatGPT, Perplexity" },
    ],
    contributors: [
      { url: "g2.com/categories/marketing-automation", citationRate: "8.4%", type: "Review Site" },
      { url: "reddit.com/r/smallbusiness", citationRate: "5.1%", type: "Community" },
    ],
  },
  2: {
    aiPreferences: [
      { url: "amplift.com/ai-visibility-guide", citationRate: "12.1%", engines: "ChatGPT, Claude" },
    ],
    contributors: [
      { url: "producthunt.com/discussions", citationRate: "6.2%", type: "Community" },
    ],
  },
  5: {
    aiPreferences: [
      { url: "salesforce.com/crm-automation", citationRate: "14.5%", engines: "ChatGPT, Perplexity, Claude" },
      { url: "hubspot.com/crm-marketing-automation", citationRate: "10.3%", engines: "ChatGPT, Claude" },
    ],
    contributors: [
      { url: "capterra.com/compare", citationRate: "7.8%", type: "Review Site" },
      { url: "trustradius.com/marketing-automation", citationRate: "4.9%", type: "Review Site" },
    ],
  },
}

// Mock opportunity analysis data
export const opportunityAnalyses: Record<number, OpportunityAnalysis> = {
  1: {
    analysisCount: 12,
    myBrandVisibility: "0%",
    topCompetitorVisibility: "15.2%",
    visibilityGap: "15.2%",
    competitorCitations: [
      {
        domain: "hubspot.com",
        pageUrl: "hubspot.com/marketing-automation-guide",
        citationRate: "15.2%",
        engines: "ChatGPT, Perplexity, Claude",
        brand: "HubSpot",
      },
      {
        domain: "mailchimp.com",
        pageUrl: "mailchimp.com/resources/automation",
        citationRate: "11.8%",
        engines: "ChatGPT, Perplexity",
        brand: "Mailchimp",
      },
      {
        domain: "activecampaign.com",
        pageUrl: "activecampaign.com/features/automation",
        citationRate: "9.3%",
        engines: "Claude, Perplexity",
        brand: "ActiveCampaign",
      },
    ],
    competitorLearnings: [
      {
        domain: "hubspot.com",
        pageUrl: "hubspot.com/marketing-automation-guide",
        learnings: [
          "Comprehensive feature comparison tables with clear pros/cons",
          "Real customer case studies with specific ROI metrics",
          "Step-by-step implementation guides with screenshots",
          "Integration ecosystem documentation covering 1000+ tools",
        ],
        keywords: ["marketing automation", "workflow", "lead nurturing", "email campaigns", "CRM integration"],
      },
      {
        domain: "mailchimp.com",
        pageUrl: "mailchimp.com/resources/automation",
        learnings: [
          "Beginner-friendly language with visual workflow builders",
          "Pricing transparency with clear tier comparisons",
          "Template library with pre-built automation sequences",
          "Mobile app functionality for on-the-go management",
        ],
        keywords: ["email marketing", "automation templates", "audience segmentation", "A/B testing", "analytics"],
      },
      {
        domain: "activecampaign.com",
        pageUrl: "activecampaign.com/features/automation",
        learnings: [
          "Advanced conditional logic and branching workflows",
          "Behavioral tracking and trigger-based automation",
          "Multi-channel campaign orchestration (email, SMS, social)",
          "Predictive sending and AI-powered optimization",
        ],
        keywords: ["advanced automation", "behavioral triggers", "multi-channel", "predictive analytics", "AI optimization"],
      },
    ],
    contentRecommendations: {
      targetKeywords: ["marketing automation", "small business", "tools", "features", "pricing"],
      competitorKeywords: [
        "workflow automation",
        "lead nurturing",
        "email campaigns",
        "CRM integration",
        "audience segmentation",
        "behavioral triggers",
        "multi-channel",
        "predictive analytics",
      ],
      strategy: [
        "Create comprehensive guide: 'Complete Guide to Marketing Automation for Small Businesses' covering all key features, pricing models, and implementation steps",
        "Include detailed comparison section with HubSpot, Mailchimp, and ActiveCampaign highlighting unique value propositions",
        "Focus on keywords from competitor pages: workflow automation, lead nurturing, email campaigns, CRM integration, audience segmentation, behavioral triggers",
        "Use data-driven approach with ROI metrics, case studies, and real-world implementation examples",
        "Structure content with clear sections: Getting Started, Feature Comparison, Pricing Guide, Implementation Steps, Best Practices",
        "Include visual elements: comparison tables, workflow diagrams, and feature screenshots",
        "Optimize for long-tail keywords: 'best marketing automation tools for small business', 'how to set up marketing automation', 'marketing automation vs email marketing'",
      ],
    },
  },
  2: {
    analysisCount: 8,
    myBrandVisibility: "12.1%",
    topCompetitorVisibility: "18.5%",
    visibilityGap: "6.4%",
    competitorCitations: [
      {
        domain: "salesforce.com",
        pageUrl: "salesforce.com/crm-vs-automation",
        citationRate: "18.5%",
        engines: "ChatGPT, Perplexity, Claude",
        brand: "Salesforce",
      },
      {
        domain: "hubspot.com",
        pageUrl: "hubspot.com/comparison-guide",
        citationRate: "14.2%",
        engines: "ChatGPT, Claude",
        brand: "HubSpot",
      },
    ],
    competitorLearnings: [
      {
        domain: "salesforce.com",
        pageUrl: "salesforce.com/crm-vs-automation",
        learnings: [
          "Clear distinction between CRM and marketing automation with use case examples",
          "Enterprise-focused content with scalability considerations",
          "Integration architecture diagrams and API documentation",
          "Industry-specific automation templates (B2B, B2C, SaaS)",
        ],
        keywords: ["CRM", "marketing automation", "enterprise", "scalability", "integration", "API", "B2B", "SaaS"],
      },
      {
        domain: "hubspot.com",
        pageUrl: "hubspot.com/comparison-guide",
        learnings: [
          "Side-by-side feature comparison with interactive filters",
          "ROI calculator tools for cost-benefit analysis",
          "Migration guides for switching from competitors",
          "Community-driven content with user testimonials",
        ],
        keywords: ["comparison", "features", "ROI", "migration", "testimonials", "community"],
      },
    ],
    contentRecommendations: {
      targetKeywords: ["CRM", "marketing automation", "difference", "comparison", "B2B"],
      competitorKeywords: [
        "enterprise",
        "scalability",
        "integration",
        "API",
        "ROI calculator",
        "migration",
        "industry-specific",
        "use cases",
      ],
      strategy: [
        "Create definitive guide: 'CRM vs Marketing Automation: Complete Guide for B2B Companies' with clear distinctions and use cases",
        "Include interactive comparison tools and ROI calculators similar to HubSpot's approach",
        "Focus on enterprise keywords: scalability, integration, API, industry-specific templates",
        "Provide migration guides and implementation roadmaps for companies switching platforms",
        "Structure with decision frameworks: 'When to use CRM', 'When to use Marketing Automation', 'When to use both'",
        "Include industry-specific examples: B2B SaaS, e-commerce, professional services",
        "Optimize for comparison queries: 'CRM vs marketing automation', 'best CRM for marketing automation', 'integrated CRM and marketing platform'",
      ],
    },
  },
  5: {
    analysisCount: 15,
    myBrandVisibility: "0%",
    topCompetitorVisibility: "14.5%",
    visibilityGap: "14.5%",
    competitorCitations: [
      {
        domain: "salesforce.com",
        pageUrl: "salesforce.com/crm-automation",
        citationRate: "14.5%",
        engines: "ChatGPT, Perplexity, Claude",
        brand: "Salesforce",
      },
      {
        domain: "hubspot.com",
        pageUrl: "hubspot.com/crm-marketing-automation",
        citationRate: "10.3%",
        engines: "ChatGPT, Claude",
        brand: "HubSpot",
      },
      {
        domain: "marketo.com",
        pageUrl: "marketo.com/automation-platform",
        citationRate: "8.7%",
        engines: "Perplexity, Claude",
        brand: "Marketo",
      },
    ],
    competitorLearnings: [
      {
        domain: "salesforce.com",
        pageUrl: "salesforce.com/crm-automation",
        learnings: [
          "Unified platform messaging with seamless CRM-marketing integration",
          "Advanced reporting and analytics with custom dashboards",
          "AI-powered lead scoring and opportunity insights",
          "Enterprise security and compliance documentation (SOC 2, GDPR)",
        ],
        keywords: ["unified platform", "CRM integration", "lead scoring", "analytics", "enterprise security", "compliance"],
      },
      {
        domain: "hubspot.com",
        pageUrl: "hubspot.com/crm-marketing-automation",
        learnings: [
          "Free tier strategy to attract small businesses",
          "Educational content hub with certifications and training",
          "User-friendly interface with drag-and-drop builders",
          "Strong community support with active user forums",
        ],
        keywords: ["free tier", "educational content", "certifications", "user-friendly", "community", "drag-and-drop"],
      },
      {
        domain: "marketo.com",
        pageUrl: "marketo.com/automation-platform",
        learnings: [
          "B2B-focused content with account-based marketing emphasis",
          "Advanced attribution modeling and revenue reporting",
          "Partner ecosystem with certified integrations",
          "Thought leadership content with industry reports and webinars",
        ],
        keywords: ["B2B", "account-based marketing", "attribution", "revenue reporting", "partner ecosystem", "thought leadership"],
      },
    ],
    contentRecommendations: {
      targetKeywords: ["CRM automation", "marketing automation", "platform", "integration", "B2B"],
      competitorKeywords: [
        "unified platform",
        "lead scoring",
        "analytics",
        "enterprise security",
        "free tier",
        "educational content",
        "account-based marketing",
        "attribution",
        "revenue reporting",
      ],
      strategy: [
        "Create comprehensive platform guide: 'Complete CRM and Marketing Automation Platform Guide' covering integration benefits, use cases, and implementation",
        "Develop comparison content: 'Salesforce vs HubSpot vs Marketo: Which Platform is Right for Your Business?' with detailed feature matrices",
        "Focus on unified platform keywords: CRM integration, lead scoring, analytics, enterprise security, account-based marketing",
        "Include educational resources: implementation guides, best practices, ROI calculators, and certification programs",
        "Structure with buyer personas: 'For Small Businesses', 'For Mid-Market', 'For Enterprise' with tailored recommendations",
        "Create interactive tools: platform comparison calculator, integration readiness assessment, migration planning templates",
        "Optimize for platform queries: 'best CRM marketing automation platform', 'integrated CRM and marketing tools', 'enterprise marketing automation platform'",
      ],
    },
  },
}
