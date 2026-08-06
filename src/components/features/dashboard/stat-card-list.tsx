import { CheckCircle2, Clock, ListChecks, Target } from "lucide-react"

import { StatCard } from "./stat-card"
import { useAppSelector } from "@/store/hooks"
import { useTranslation } from "@/hooks/use-translation"
import useStatsCard from "@/hooks/use-stats-card"
import { TOPICS } from "@/data/topic-list"

export default function StatCardList() {
  const { t } = useTranslation()
  const profile = useAppSelector((s) => s.profile)
  const { totalAnswered, overallAccuracy, completedCategories } = useStatsCard()

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label={t("dashboard.accuracyOverall")}
        value={overallAccuracy}
        suffix="%"
        accent="gold"
        icon={<Target className="h-5 w-5" />}
      />
      <StatCard
        label={t("dashboard.questionsAnswered")}
        value={totalAnswered}
        accent="teal"
        icon={<ListChecks className="h-5 w-5" />}
      />
      <StatCard
        label={t("dashboard.studyTimeMin")}
        value={Math.floor(profile.studySeconds / 60)}
        accent="teal"
        icon={<Clock className="h-5 w-5" />}
      />
      <StatCard
        label={t("dashboard.categoriesCompleted")}
        value={completedCategories}
        suffix={`/${TOPICS.length}`}
        accent="gold"
        icon={<CheckCircle2 className="h-5 w-5" />}
      />
    </div>
  )
}
