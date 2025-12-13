"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Home,
  BarChart3,
  Eye,
  FileText,
  Users,
  Target,
  Sparkles,
  Share2,
  ChevronLeft,
  Search,
  Bell,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardLayoutProps {
  children: ReactNode
  currentSection: string
  currentSubSection?: string
  hideSecondarySidebar?: boolean
}

const primaryNav = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "results", label: "Results", icon: BarChart3, href: "/results" },
  { id: "visibility", label: "Visibility", icon: Eye, href: "/visibility/overview" },
  { id: "content", label: "Content", icon: FileText, href: "/content" },
  { id: "influencer", label: "Influencer marketing", icon: Users, href: "/influencer-marketing" },
]

const visibilitySubNav = [
  { id: "overview", label: "Space", icon: Globe, href: "/visibility/overview" },
  { id: "opportunity", label: "Opportunity", icon: Target, href: "/visibility/opportunity" },
  { id: "ai-performance", label: "AI performance", icon: Sparkles, href: "/visibility/ai-performance" },
  { id: "social-tracker", label: "Social tracker", icon: Share2, href: "/visibility/social-tracker" },
]

export function DashboardLayout({
  children,
  currentSection,
  currentSubSection,
  hideSecondarySidebar,
}: DashboardLayoutProps) {

  return (
    <div className="flex h-screen bg-background flex-col">
      {/* Top Navigation Bar */}
      <div className="h-12 bg-muted/30 flex items-center justify-between px-6 shrink-0">
        {/* Left: Logo/Brand */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold">A AS</span>
            <span className="text-xs text-muted-foreground">Amplift</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Search ⌘K" aria-label="Search (Command+K)">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 relative" aria-label="Notifications (3 unread)">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-[10px]">
              3
            </Badge>
          </Button>
          <div className="flex items-center gap-2 ml-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
              AS
            </div>
            <ChevronLeft className="h-3 w-3 text-muted-foreground rotate-90" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Primary Sidebar - Icon Bar */}
        <div className="bg-muted/30 border-r border-border flex flex-col w-16">
          {/* Main Navigation Icons (Left Edge) */}
          <div className="flex-1 flex overflow-hidden">
            {/* Icon Bar */}
            <div className="w-16 border-r border-t border-border flex flex-col items-center py-2 gap-1">
              {primaryNav.map((item) => {
                const Icon = item.icon
                const isActive = currentSection === item.id
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-colors relative",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    )}
                    title={item.label}
                  >
                    <Icon className="w-5 h-5" />
                    {item.id === "home" && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-[8px]">
                        1
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </div>

          </div>
        </div>

        {/* Secondary Sidebar for Visibility (Right Side) */}
        {currentSection === "visibility" && !hideSecondarySidebar && (
          <div className="w-[220px] bg-muted/30 border-r border-border flex flex-col ml-[5px]">
            <div className="px-3 py-2.5 border-b border-t border-x border-border">
              <h2 className="text-sm font-semibold text-foreground">Visibility</h2>
            </div>
            <nav className="flex-1 px-2 py-2 overflow-y-auto border-x border-border">
              {visibilitySubNav.map((item) => {
                const Icon = item.icon
                const isActive = currentSubSection === item.id
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded mb-0.5 text-sm transition-colors",
                      isActive
                        ? "bg-primary text-white font-medium"
                        : "text-foreground/70 hover:text-foreground hover:bg-card/50",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-background border border-border">
          {children}
        </div>
      </div>
    </div>
  )
}
