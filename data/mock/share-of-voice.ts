import { ShareOfVoiceAnalysis } from "@/lib/types"

// Mock data for Share of Voice Analysis
export const shareOfVoiceAnalysis: ShareOfVoiceAnalysis = {
  visibilityBasedSOV: "61.41%",
  chartData: [
    { brand: "My Brand", value: 61.41, color: "hsl(var(--primary))" },
    { brand: "Competitor 1", value: 28.5, color: "hsl(var(--muted-foreground))" },
    { brand: "Competitor 2", value: 10.09, color: "hsl(var(--muted-foreground) / 0.7)" },
  ],
  insights: [
    {
      type: "positive",
      text: "Quality over Quantity: Your brand comprehensively leads in quality metrics such as visibility, citation rate, and sentiment score. Although the total number of citations is relatively low, the value per single citation is higher.",
    },
    {
      type: "positive",
      text: "SOV Dual Perspective: Based on visibility, your brand's Share of Voice (SOV) reaches 61.41%, indicating that your brand holds a leading position in AI responses.",
    },
  ],
}
