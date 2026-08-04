import { TOPICS } from "@/constants/topics"
import { useTranslation } from "@/hooks/use-translation"
import { formatDate } from "@/lib/utils"
import { useAppSelector } from "@/store/hooks"

export default function DashboardIntro() {
  const { t } = useTranslation()
  const topics = useAppSelector((s) => s.statistics.topics)

  const lastSession = TOPICS.map((tp) => topics[tp.id].lastPlayed)
    .filter(Boolean)
    .sort()
    .at(-1)

  return (
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
  )
}
