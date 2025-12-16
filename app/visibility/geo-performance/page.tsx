"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { Progress } from "@/components/ui/progress"
import { FileText, Code, RefreshCw, Target, Zap } from "lucide-react"

// Custom cursor/pencil icon with sparkles
const WorkflowIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Main cursor/pencil shape */}
    <path d="M25 85 L25 55 L55 25" />
    <path d="M55 25 L75 45" />
    <path d="M25 85 L45 65" />
    
    {/* Top triangle indicator */}
    <path d="M45 15 L55 25 L40 30 Z" fill="none" />
    
    {/* Sparkle lines on the right */}
    <path d="M65 20 L72 13" className="animate-pulse" />
    <path d="M75 35 L90 35" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
    <path d="M75 50 L85 60" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
    <path d="M65 60 L70 65" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
  </svg>
)
import { cn } from "@/lib/utils"

const analysisSteps = [
  { id: 1, label: "Scanning website structure", duration: 2000 },
  { id: 2, label: "Analyzing technical SEO", duration: 3000 },
  { id: 3, label: "Evaluating content quality", duration: 2500 },
  { id: 4, label: "Checking AI platform citations", duration: 3000 },
  { id: 5, label: "Calculating GEO score", duration: 2000 },
]

const infoTexts = [
  {
    id: "geo-score",
    label: "GEO Score",
    text: "Measures how effectively your content performs across AI platforms.",
  },
  {
    id: "technical-seo",
    label: "Technical SEO",
    text: "Meta tags, page speed, and structured data are evaluated for AI optimization.",
  },
  {
    id: "content-quality",
    label: "Content Quality",
    text: "Depth, accuracy, and readability determine how valuable your content is.",
  },
  {
    id: "content-freshness",
    label: "Content Freshness",
    text: "Fresh, regularly updated content is more likely to be cited by AI.",
  },
  {
    id: "topic-relevance",
    label: "Topic Relevance",
    text: "Alignment with search intent ensures your content appears in AI responses.",
  },
  {
    id: "citation-authority",
    label: "Citation Authority",
    text: "More citations from AI platforms mean higher visibility and authority.",
  },
]

export default function GeoPerformancePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  // Auto-start analysis on page load
  useEffect(() => {
    let stepIndex = 0
    let currentProgress = 0

    const processStep = () => {
      if (stepIndex >= analysisSteps.length) {
        // Analysis complete, redirect to geo-report
        setTimeout(() => {
          router.push("/visibility/geo-report")
        }, 500)
        return
      }

      const step = analysisSteps[stepIndex]
      setCurrentStep(stepIndex)
      
      const stepProgress = 100 / analysisSteps.length
      const interval = 50
      const increment = (stepProgress / (step.duration / interval))

      const progressInterval = setInterval(() => {
        currentProgress += increment
        if (currentProgress >= (stepIndex + 1) * stepProgress) {
          currentProgress = (stepIndex + 1) * stepProgress
        }
        setProgress(Math.min(currentProgress, 100))
      }, interval)

      setTimeout(() => {
        clearInterval(progressInterval)
        stepIndex++
        processStep()
      }, step.duration)
    }

    processStep()
  }, [router])

  // Auto-rotate info texts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % infoTexts.length)
    }, 4000) // Switch every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="ai-performance">
      <BreadcrumbHeader
        items={["Home", "Visibility", "AI performance", "GEO Audit"]}
      />

      <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          {/* Animated Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center">
              <WorkflowIcon className="w-24 h-24 text-primary" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 px-8">
            <Progress value={progress} className="h-1.5" />
            {currentStep < analysisSteps.length && (
              <p className="text-xs text-muted-foreground mt-2">
                {analysisSteps[currentStep].label}
              </p>
            )}
          </div>

          {/* Auto-rotating Info Text */}
          <div className="min-h-[48px] flex items-center justify-center">
            <p className="text-xs text-muted-foreground leading-relaxed transition-opacity duration-300">
              <span className="font-medium">{infoTexts[currentTextIndex].label}:</span>{" "}
              {infoTexts[currentTextIndex].text}
            </p>
          </div>

          {/* Text Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {infoTexts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTextIndex(index)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  index === currentTextIndex
                    ? "bg-primary w-4"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to info ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
