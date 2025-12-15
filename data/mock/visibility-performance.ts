import { VisibilityPerformanceAnalysis } from "@/lib/types"

// Mock data for Visibility Performance Analysis
export const visibilityPerformanceAnalysis: VisibilityPerformanceAnalysis = {
  promptTopicPerformance: {
    good: [
      {
        promptOrTopic: "Blade Battery technology",
        visibility: "85%",
        status: "good",
        category: "Technical",
      },
      {
        promptOrTopic: "e-Platform 3.0 architecture",
        visibility: "78%",
        status: "good",
        category: "Technical",
      },
      {
        promptOrTopic: "Electric vehicle charging solutions",
        visibility: "72%",
        status: "good",
        category: "Product Features",
      },
      {
        promptOrTopic: "Battery safety standards",
        visibility: "68%",
        status: "good",
        category: "Technical",
      },
    ],
    poor: [
      {
        promptOrTopic: "EV pricing comparison",
        visibility: "12%",
        status: "poor",
        category: "Commercial",
      },
      {
        promptOrTopic: "Autonomous driving features",
        visibility: "8%",
        status: "poor",
        category: "Product Features",
      },
      {
        promptOrTopic: "EV market share analysis",
        visibility: "15%",
        status: "poor",
        category: "Market Analysis",
      },
      {
        promptOrTopic: "Customer service quality",
        visibility: "5%",
        status: "poor",
        category: "Service",
      },
    ],
    zeroVisibilityCount: 5,
    zeroVisibilityPercentage: "45.45%",
  },
  modelComparison: [
    {
      platform: "Perplexity",
      myBrandSOV: "36.45%",
      competitorSOV: "36.45%",
      gap: "0.00 pts",
      status: "PARITY",
    },
    {
      platform: "ChatGPT",
      myBrandSOV: "0.00%",
      competitorSOV: "100.00%",
      gap: "-100.00 pts",
      status: "CRITICAL GAP",
    },
    {
      platform: "Google AI Overview",
      myBrandSOV: "42.30%",
      competitorSOV: "38.10%",
      gap: "+4.20 pts",
      status: "LEADING",
    },
    {
      platform: "Overall (All Models)",
      myBrandSOV: "44.44%",
      competitorSOV: "55.56%",
      gap: "-11.12 pts",
      status: "LAGGING",
    },
  ],
  recommendations: [
    "Leverage technical strengths in Blade Battery and e-Platform 3.0 topics.",
    "Address zero-visibility prompts (45.45%). Prioritize content creation for these gaps.",
    "Develop ChatGPT-specific content optimization strategy.",
  ],
}


