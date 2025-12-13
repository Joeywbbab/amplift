import { DashboardLayout } from "@/components/dashboard-layout"

export default function HomePage() {
  return (
    <DashboardLayout currentSection="home">
      <div className="p-8">
        <h1 className="heading-xl mb-4">Welcome to Amplift</h1>
        <div className="bg-card rounded-lg border p-6 max-w-2xl">
          <p className="body-muted mb-2">This section is under construction</p>
          <p className="body-muted">
            The Home dashboard will provide an overview of your AI visibility metrics and recent activity.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
