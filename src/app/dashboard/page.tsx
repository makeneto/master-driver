"use client"
import StatCardList from "@/components/features/dashboard/stat-card-list"
import DashboardButtons from "@/components/features/dashboard/dashboard-buttons"
import DashboardIntro from "@/components/features/dashboard/dashboard-intro"
import DashboardAnalyzes from "@/components/features/dashboard/dashboard-analyzes"

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-7 pb-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <DashboardIntro />
        <DashboardButtons />
      </div>

      <StatCardList />
      <DashboardAnalyzes />
    </div>
  )
}
