import { DashboardLayout } from "@/components/dashboard-layout"
import { BreadcrumbHeader } from "@/components/breadcrumb-header"

export default function ResultsPage() {
  return (
    <DashboardLayout currentSection="results">
      <BreadcrumbHeader items={["Home", "Results", "Amplift"]} />
      <div className="p-8">
        <h1 className="heading-xl mb-4">Results</h1>
        <div className="bg-card rounded-lg border p-6 max-w-2xl">
          <p className="body-muted mb-2">This section is under construction</p>
          <p className="body-muted">
            The Results section will display comprehensive analytics and performance reports.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
