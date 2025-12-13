"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Search,
  Plus,
  FileText,
  Folder,
  Star,
  Archive,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  Sparkles,
  Clock,
  User,
  Calendar,
  Tag,
  Menu,
  ChevronLeft,
  Radio,
  Mountain,
  Reply,
  ReplyAll,
  Forward,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Icon types: "chat" (orange), "geo" (yellow), "social" (blue)
type IconType = "chat" | "geo" | "social"

// Mock content data
const contentItems = [
  {
    id: 1,
    title: "Marketing Automation Guide: Complete Overview",
    author: "John at Taskade",
    preview: "Learn how to integrate marketing automation with sales tools for better ROI...",
    date: "Dec 13",
    category: "Blog Post",
    status: "Published",
    iconType: "chat" as IconType,
    hasAI: true,
  },
  {
    id: 2,
    title: "Email Marketing Best Practices for 2024",
    author: "The Economist",
    preview: "Discover the latest trends and strategies in email marketing...",
    date: "Dec 12",
    category: "Article",
    status: "Draft",
    iconType: "geo" as IconType,
    hasAI: false,
  },
  {
    id: 3,
    title: "Content Strategy Framework: A Step-by-Step Guide",
    author: "Perplexity Research",
    preview: "Build a comprehensive content strategy that drives results...",
    date: "Dec 11",
    category: "Guide",
    status: "Published",
    iconType: "social" as IconType,
    hasAI: true,
  },
  {
    id: 4,
    title: "Social Media Content Calendar Template",
    author: "Facebook Friend Suggestions",
    preview: "Download our free template to organize your social media content...",
    date: "Dec 10",
    category: "Template",
    status: "Published",
    iconType: "chat" as IconType,
    hasAI: false,
  },
  {
    id: 5,
    title: "SEO Content Optimization Checklist",
    author: "Ant at Supabase",
    preview: "Ensure your content is optimized for search engines with this checklist...",
    date: "Dec 9",
    category: "Checklist",
    status: "Draft",
    iconType: "geo" as IconType,
    hasAI: true,
  },
  {
    id: 6,
    title: "How to Create Engaging Video Content",
    author: "MainFunc PTE. LTD.",
    preview: "Tips and tricks for creating video content that captures attention...",
    date: "Dec 8",
    category: "Video",
    status: "Published",
    iconType: "social" as IconType,
    hasAI: false,
  },
  {
    id: 7,
    title: "Content Performance Analytics Dashboard",
    author: "support",
    preview: "Track and analyze your content performance with our analytics tools...",
    date: "Dec 7",
    category: "Analytics",
    status: "Published",
    iconType: "chat" as IconType,
    hasAI: true,
  },
]

// Get icon component and styles based on iconType
const getIconConfig = (iconType: IconType) => {
  switch (iconType) {
    case "chat":
      return {
        Icon: Radio,
        bgColor: "bg-gradient-to-br from-orange-100 to-orange-50",
        iconColor: "text-orange-500",
        borderColor: "border-orange-200",
      }
    case "geo":
      return {
        Icon: Search,
        bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-50",
        iconColor: "text-yellow-500",
        borderColor: "border-yellow-200",
      }
    case "social":
      return {
        Icon: Mountain,
        bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
        iconColor: "text-blue-600",
        borderColor: "border-blue-300",
      }
    default:
      return {
        Icon: Radio,
        bgColor: "bg-gradient-to-br from-orange-100 to-orange-50",
        iconColor: "text-orange-500",
        borderColor: "border-orange-200",
      }
  }
}

const contentFolders = [
  { id: "inbox", label: "Inbox", icon: FileText, count: 124 },
  { id: "drafts", label: "Drafts", icon: FileText, count: 8 },
  { id: "published", label: "Published", icon: FileText, count: 89 },
  { id: "starred", label: "Starred", icon: Star, count: 12 },
  { id: "archived", label: "Archived", icon: Archive, count: 15 },
  { id: "trash", label: "Trash", icon: Trash2, count: 3 },
]

export default function ContentPage() {
  const [selectedItem, setSelectedItem] = useState<typeof contentItems[0] | null>(null)
  const [selectedFolder, setSelectedFolder] = useState("inbox")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const filteredItems = contentItems.filter((item) => {
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (selectedFolder === "inbox") return matchesSearch
    if (selectedFolder === "drafts") return matchesSearch && item.status === "Draft"
    if (selectedFolder === "published") return matchesSearch && item.status === "Published"
    if (selectedFolder === "starred") return matchesSearch // TODO: Add starred logic
    if (selectedFolder === "archived") return matchesSearch // TODO: Add archived logic
    if (selectedFolder === "trash") return matchesSearch // TODO: Add trash logic
    
    return matchesSearch
  })

  return (
    <DashboardLayout currentSection="content" hideSecondarySidebar>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Top Header */}
        <div className="h-12 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <Button className="bg-primary text-primary-foreground rounded-full flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Content
            </Button>
          </div>
          <div className="flex items-center gap-4 flex-1 max-w-md justify-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
          </div>
          {/* Archive and Trash - only show when item is selected */}
          {selectedItem && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Archive className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
          {!selectedItem && <div className="w-[88px]"></div>}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - All content hidden when collapsed */}
          {!isSidebarCollapsed && (
            <div className="w-60 bg-muted/30 border-r border-border flex flex-col shrink-0 transition-all duration-300">
              {/* Scheduled Agent */}
              <div className="p-4 border-b border-border">
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Scheduled agent
                    </span>
                  </div>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>Create post automation</span>
                  </button>
                </div>
              </div>

              {/* Content Folders */}
              <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                  {contentFolders.map((folder) => {
                    const Icon = folder.icon
                    const isActive = selectedFolder === folder.id
                    return (
                      <button
                        key={folder.id}
                        onClick={() => setSelectedFolder(folder.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{folder.label}</span>
                        </div>
                        {folder.count > 0 && (
                          <span className={cn(
                            "text-xs",
                            isActive ? "text-sidebar-accent-foreground/70" : "text-muted-foreground"
                          )}>
                            {folder.count}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Categories Section */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="px-3 mb-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Categories
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {[
                      { name: "Blog Post", iconColor: "text-blue-600" },
                      { name: "Article", iconColor: "text-blue-600" },
                      { name: "Guide", iconColor: "text-blue-600" },
                      { name: "Social Post", iconColor: "text-sky-400" },
                    ].map((category) => (
                      <button
                        key={category.name}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <Tag className={cn("w-4 h-4", category.iconColor)} />
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
          {/* Split Panel: List and Detail */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Panel: Content List */}
            <div className="w-[calc(50%-60px)] border-t border-r border-border overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-foreground">
                    {contentFolders.find(f => f.id === selectedFolder)?.label || "Inbox"}
                  </h2>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-1">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={cn(
                        "p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted",
                        selectedItem?.id === item.id && "bg-muted border border-border"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        {(() => {
                          const config = getIconConfig(item.iconType)
                          const IconComponent = config.Icon
                          return (
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative border",
                              config.bgColor,
                              config.borderColor
                            )}>
                              <IconComponent className={cn("w-5 h-5", config.iconColor)} />
                              {item.hasAI && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                              )}
                            </div>
                          )
                        })()}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-foreground truncate">
                              {item.author}
                            </span>
                            {item.hasAI && (
                              <Sparkles className="w-3 h-3 text-primary shrink-0" />
                            )}
                          </div>
                          <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {item.preview}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {item.date}
                            </span>
                            <span>{item.category}</span>
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-xs",
                              item.status === "Published" 
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            )}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel: Content Detail */}
            <div className="w-[calc(50%+60px)] border-t overflow-y-auto bg-muted/20">
              {selectedItem ? (
                <div className="p-8">
                  <div className="max-w-3xl">
                    {/* Header - Email Style */}
                    <div className="mb-6">
                      {/* Title Row with Actions */}
                      <div className="flex items-start justify-between mb-6">
                        <h1 className="text-2xl font-bold text-foreground leading-tight pr-4">
                          {selectedItem.title}
                        </h1>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Star className="w-4 h-4" />
                          </Button>
                          <div className="w-px h-4 bg-border mx-1" />
                          <Button size="sm" className="h-8 gap-1.5 text-xs">
                            <Reply className="w-3.5 h-3.5" />
                            Edit with Amplift
                          </Button>
                        </div>
                      </div>

                      {/* Sender Info Row */}
                      <div className="flex items-center gap-2 pb-6 border-b border-border">
                        {(() => {
                          const config = getIconConfig(selectedItem.iconType)
                          const IconComponent = config.Icon
                          return (
                            <div className={cn(
                              "w-6 h-6 rounded-md flex items-center justify-center shrink-0 border",
                              config.bgColor,
                              config.borderColor
                            )}>
                              <IconComponent className={cn("w-3 h-3", config.iconColor)} />
                            </div>
                          )
                        })()}
                        <div className="flex-1 min-w-0 flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Social Tracker</span>
                          <span className="text-sm text-muted-foreground">·</span>
                          <span className="text-sm text-muted-foreground">{selectedItem.date}, 2025</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Body */}
                    <Card className="p-6 mb-6">
                      <p className="body-text text-foreground leading-relaxed mb-4">
                        {selectedItem.preview}
                      </p>
                      <p className="body-text text-muted-foreground leading-relaxed">
                        This is a detailed view of the content item. Here you would see the full content,
                        including the complete article, blog post, or other content type. The content can
                        include rich text formatting, images, and other media elements.
                      </p>
                    </Card>

                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="heading-lg mb-2">Select a content item</h3>
                    <p className="text-muted-foreground max-w-md">
                      Choose a content item from the list to view its details, or click the settings icon to manage your content.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
