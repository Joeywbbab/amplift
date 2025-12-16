"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronDown, AtSign, Paperclip, ArrowUp } from "lucide-react"

export default function ExploreOpportunityPage() {
  const [aiInput, setAiInput] = useState("")

  const handleCardClick = (prompt: string) => {
    setAiInput(prompt)
  }

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="opportunity">
      <BreadcrumbHeader items={["Home", "Visibility", "Opportunity", "Explore"]} />

      <div className="flex flex-col h-full">
        {/* Page Header */}
        <div className="px-8 pt-6 pb-4 shrink-0">
          <h1 className="heading-xl">Explore More Opportunities</h1>
          <p className="text-muted-foreground mt-1">Discover new opportunities with AI assistance</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto px-8">
          <div className="max-w-4xl mx-auto">
            {/* Three Cards in Center */}
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="grid grid-cols-3 gap-6 w-full">
                <Card 
                  className="p-6 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
                  onClick={() => handleCardClick("Help me analyze my competitors and find opportunities to differentiate")}
                >
                  <h3 className="font-semibold mb-2">Delve into your competitors</h3>
                  <p className="text-sm text-muted-foreground">Analyze competitor strategies and discover gaps you can exploit</p>
                </Card>

                <Card 
                  className="p-6 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
                  onClick={() => handleCardClick("Show me more topics related to my industry that I should be targeting")}
                >
                  <h3 className="font-semibold mb-2">More interested and related topics</h3>
                  <p className="text-sm text-muted-foreground">Explore trending topics and expand your content strategy</p>
                </Card>

                <Card 
                  className="p-6 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
                  onClick={() => handleCardClick("What marketing problems should I focus on solving this quarter?")}
                >
                  <h3 className="font-semibold mb-2">Marketing problems to fix</h3>
                  <p className="text-sm text-muted-foreground">Identify key marketing challenges and get actionable solutions</p>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Input Box */}
        <div className="sticky bottom-0 px-8 py-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white dark:bg-card rounded-2xl border-2 border-primary shadow-sm p-4">
              <Input
                placeholder="Ask Amplift AI about opportunities..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log("Send:", aiInput)
                  }
                }}
                className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base pl-0 pr-0 bg-transparent mb-2"
              />
              <div className="flex items-center justify-between">
                {/* Left: Skills Dropdown */}
                <button className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  <span>Skills</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {/* Right: Icons */}
                <div className="flex items-center gap-2">
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <AtSign className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}



