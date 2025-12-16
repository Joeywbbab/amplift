// Mock data for AI Answer History
export interface AnswerHistoryItem {
  id: number
  timestamp: string
  engine: string
  answer: string
  similarity: number
}

export const answerHistoryData: Record<number, AnswerHistoryItem[]> = {
  1: [
    {
      id: 1,
      timestamp: "2024-12-15 10:30 AM",
      engine: "ChatGPT",
      answer: "The best marketing automation tools for small businesses include HubSpot, Mailchimp, and ActiveCampaign. These platforms offer comprehensive features for email marketing, lead nurturing, and campaign management.",
      similarity: 8.6,
    },
    {
      id: 2,
      timestamp: "2024-12-15 09:15 AM",
      engine: "Perplexity",
      answer: "Top marketing automation tools: HubSpot (all-in-one CRM), Mailchimp (email-focused), Marketo (enterprise), and Pardot (B2B). Small businesses often prefer HubSpot or Mailchimp for their ease of use.",
      similarity: 8.4,
    },
    {
      id: 3,
      timestamp: "2024-12-14 03:45 PM",
      engine: "Claude",
      answer: "For small businesses, I recommend HubSpot (free tier available), Mailchimp (affordable pricing), and ActiveCampaign (advanced automation). Consider your team size and budget when choosing.",
      similarity: 8.2,
    },
  ],
  3: [
    {
      id: 1,
      timestamp: "2024-12-15 11:20 AM",
      engine: "ChatGPT",
      answer: "When comparing marketing automation tools, consider HubSpot vs Marketo vs Pardot. HubSpot offers better value for SMBs, while Marketo excels in enterprise features.",
      similarity: 8.4,
    },
    {
      id: 2,
      timestamp: "2024-12-15 08:10 AM",
      engine: "Perplexity",
      answer: "Marketing automation comparison: HubSpot leads in CRM integration, Mailchimp in email marketing, and Marketo in advanced workflows. Choose based on your primary use case.",
      similarity: 8.3,
    },
  ],
}



