import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"

export default function InfluencerMarketingPage() {
  return (
    <DashboardLayout currentSection="influencer">
      <BreadcrumbHeader items={["Home", "Influencer marketing", "Amplift"]} />
      <div className="p-8">
        <h1 className="heading-xl mb-4">Influencer Marketing</h1>
        <div className="bg-card rounded-lg border p-6 max-w-2xl">
          <p className="body-muted mb-2">This section is under construction</p>
          <p className="body-muted">
            The Influencer Marketing section will help you discover and collaborate with influencers.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
