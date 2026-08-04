import React from "react"

import { useTranslation } from "@/hooks/use-translation"
import { AccuracyBarChart } from "./accuracy-bar-chart"
import { PerformanceRadarChart } from "./performance-radar-chart"
import { StudyHeatmap } from "./study-heatmap"
import { TopicRankings } from "./topic-rankings"
import { useAppSelector } from "@/store/hooks"
import { formatMinutes } from "@/lib/utils"

export default function DashboardAnalyzes() {
  const { t } = useTranslation()
  const topics = useAppSelector((s) => s.statistics.topics)
  const profile = useAppSelector((s) => s.profile)

  return (
    <React.Fragment>
      <div className="mb-6 grid lg:grid-cols-[35%_auto] gap-4">
        <StudyHeatmap studyDates={profile.studyDates} />
        <AccuracyBarChart topics={topics} />
      </div>
      <div className="mb-6 grid lg:grid-cols-[35%_auto] gap-4">
        <TopicRankings topics={topics} />
        <PerformanceRadarChart topics={topics} />
      </div>
      <p className="mt-6 text-center text-xs text-[var(--color-text-faint)]">
        {t("dashboard.totalStudyTime", {
          time: formatMinutes(profile.studySeconds),
        })}
      </p>
    </React.Fragment>
  )
}
