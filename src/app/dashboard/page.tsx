"use client"

import Link from "next/link"
import {
  Target,
  ListChecks,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Crosshair,
} from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { TOPICS } from "@/constants/topics"
import { getQuestionsByTopic } from "@/data/questions"
import { formatDate, formatMinutes } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"
import { StatCard } from "@/components/features/dashboard/stat-card"
import { AccuracyBarChart } from "@/components/features/dashboard/accuracy-bar-chart"
import { PerformanceRadarChart } from "@/components/features/dashboard/performance-radar-chart"
import { StudyHeatmap } from "@/components/features/dashboard/study-heatmap"
import { TopicRankings } from "@/components/features/dashboard/topic-rankings"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const topics = useAppSelector((s) => s.statistics.topics)
  const profile = useAppSelector((s) => s.profile)
  const { t } = useTranslation()

  const totalCorrect = Object.values(topics).reduce(
    (sum, tp) => sum + tp.correct,
    0,
  )
  const totalAnswered = Object.values(topics).reduce(
    (sum, tp) => sum + tp.totalQuestions,
    0,
  )
  const overallAccuracy =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0
  const completedCategories = TOPICS.filter(
    (tp) =>
      topics[tp.id].totalQuestions >= getQuestionsByTopic(tp.id).length &&
      topics[tp.id].totalQuestions > 0,
  ).length
  const lastSession = TOPICS.map((tp) => topics[tp.id].lastPlayed)
    .filter(Boolean)
    .sort()
    .at(-1)

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight">
            {t("dashboard.title")}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {lastSession
              ? t("dashboard.lastSession", { date: formatDate(lastSession) })
              : t("dashboard.neverStudied")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link
              href="/quiz?mode=review-wrong"
              className="flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4" /> {t("dashboard.reviewWrong")}
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link
              href="/quiz?mode=review-weak"
              className="flex items-center gap-2"
            >
              <Crosshair className="h-4 w-4" /> {t("dashboard.trainWeak")}
            </Link>
          </Button>
        </div>
      </div>

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
          value={profile.totalAnswered}
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
    </div>
  )
}
