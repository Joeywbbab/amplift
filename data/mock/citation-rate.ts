import { CitationRateAnalysis } from "@/lib/types"

// Mock data for Citation Rate Analysis
export const citationRateAnalysis: CitationRateAnalysis = {
  earnOwnCount: 4,
  socialCount: 10,
  totalCount: 1200,
  citationTable: [
    {
      domainType: "Own",
      domain: "Own Citations",
      citationCount: "0.33%",
      top3Domains: [
        { domain: "amplift.com", pageUrl: "https://amplift.com/blog/automation-guide" },
        { domain: "amplift.com", pageUrl: "https://amplift.com/docs/features" },
        { domain: "amplift.com", pageUrl: "https://amplift.com/comparison/tools" },
      ],
    },
    {
      domainType: "Earned",
      domain: "Earned Citations",
      citationCount: "1.25%",
      top3Domains: [
        { domain: "techcrunch.com" },
        { domain: "venturebeat.com" },
        { domain: "theverge.com" },
      ],
    },
    {
      domainType: "Social",
      domain: "Social Citations",
      citationCount: "0.83%",
      top3Domains: [
        { domain: "twitter.com" },
        { domain: "linkedin.com" },
        { domain: "reddit.com" },
      ],
    },
  ],
  industryPreference: {
    domain: "energysage.com, cleantechnica.com",
    description: "Energy information platforms like EnergySage and CleanTechnica are key industry preference sources, indicating strong visibility in energy sector discussions.",
  },
  negativeMentions: {
    count: 8,
    sources: ["reddit.com", "teslamotorsclub.com", "twitter.com"],
    description: "Negative mentions primarily appear in community forums (Reddit, Tesla Motors Club) and social media (Twitter), focusing on pricing concerns and service quality issues.",
  },
}



