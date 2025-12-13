"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Code, RefreshCw, Target, Zap, CheckCircle2, Loader2 } from "lucide-react"

const analysisSteps = [
  { id: 1, label: "Scanning website structure", duration: 2000 },
  { id: 2, label: "Analyzing technical SEO", duration: 3000 },
  { id: 3, label: "Evaluating content quality", duration: 2500 },
  { id: 4, label: "Checking AI platform citations", duration: 3000 },
  { id: 5, label: "Calculating GEO score", duration: 2000 },
]

export default function GeoPerformancePage() {
  const router = useRouter()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setCurrentStep(0)
    setProgress(0)
  }

  useEffect(() => {
    if (!isAnalyzing) return

    let stepIndex = 0
    let currentProgress = 0
    const totalDuration = analysisSteps.reduce((sum, step) => sum + step.duration, 0)

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
  }, [isAnalyzing, router])

  if (isAnalyzing) {
    return (
      <DashboardLayout currentSection="visibility" currentSubSection="ai-performance">
        <BreadcrumbHeader
          items={["Home", "Visibility", "AI performance", "GEO Audit"]}
        />

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
              <h1 className="heading-xl mb-3">Analyzing Your Content</h1>
              <p className="body-muted">
                We're running a comprehensive audit of your website. This may take a few moments...
              </p>
            </div>

            <Card className="p-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Progress</span>
                  <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Analysis Steps */}
              <div className="space-y-4">
                {analysisSteps.map((step, index) => {
                  const isActive = index === currentStep
                  const isCompleted = index < currentStep
                  
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                        isActive
                          ? "bg-primary/5 border-primary/20"
                          : isCompleted
                          ? "bg-muted/50 border-border"
                          : "bg-background border-border opacity-50"
                      }`}
                    >
                      <div className="shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : isActive ? (
                          <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${
                            isActive
                              ? "text-foreground"
                              : isCompleted
                              ? "text-muted-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-muted-foreground text-center">
                  Analyzing your content across multiple AI platforms...
                </p>
              </div>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout currentSection="visibility" currentSubSection="ai-performance">
      <BreadcrumbHeader
        items={["Home", "Visibility", "AI performance", "GEO Audit"]}
        action={{ label: "Export" }}
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="heading-xl mb-3">GEO Audit</h1>
            <p className="body-muted">
              Run a comprehensive audit to measure your Generative Engine Optimization score
            </p>
          </div>

          <Card className="p-8 mb-6">
            <h2 className="heading-lg mb-4">What is GEO Score?</h2>
            <p className="body-muted leading-relaxed mb-4">
              GEO (Generative Engine Optimization) Score measures how effectively your content performs across AI
              platforms like ChatGPT, Perplexity, Claude, and Google AI. It evaluates multiple factors including
              technical SEO, content quality, and topic relevance.
            </p>
            <p className="body-muted leading-relaxed">
              A higher GEO score means your brand is more likely to be recommended and cited by AI systems when users
              ask relevant questions.
            </p>
          </Card>

          <Card className="p-8 mb-6">
            <h2 className="heading-lg mb-6">Audit Criteria</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg border">
                <Code className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <h3 className="body-text-sm font-semibold mb-1">Technical SEO</h3>
                  <p className="text-caption-muted">Meta tags, page speed, structured data, mobile optimization</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border">
                <FileText className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <h3 className="body-text-sm font-semibold mb-1">Content Quality</h3>
                  <p className="text-caption-muted">Depth, accuracy, readability, and usefulness of content</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border">
                <RefreshCw className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <h3 className="body-text-sm font-semibold mb-1">Content Freshness</h3>
                  <p className="text-caption-muted">Recency and update frequency of your content</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border">
                <Target className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <h3 className="body-text-sm font-semibold mb-1">Topic Relevance</h3>
                  <p className="text-caption-muted">Alignment with user queries and search intent</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border">
                <Zap className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <h3 className="body-text-sm font-semibold mb-1">Citation Authority</h3>
                  <p className="text-caption-muted">How often AI platforms reference your content</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-accent/30">
            <h2 className="heading-lg mb-2">Ready to Audit?</h2>
            <p className="body-muted mb-6">
              The audit takes approximately 24-48 hours as we analyze your content across multiple AI platforms and gather
              comprehensive performance data.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={startAnalysis}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Start GEO Audit
              </Button>
              <Button
                variant="outline"
                className="px-6 py-2 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
              >
                Learn More
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
