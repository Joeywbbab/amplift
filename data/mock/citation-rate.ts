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
      citationCount: 4,
    },
    {
      domainType: "Earned",
      domain: "Earned Citations",
      citationCount: 15,
    },
    {
      domainType: "Social",
      domain: "Social Citations",
      citationCount: 10,
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


