import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function TopicDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout currentSection="visibility" currentSubSection="ai-performance" hideSecondarySidebar>
      {children}
    </DashboardLayout>
  )
}
