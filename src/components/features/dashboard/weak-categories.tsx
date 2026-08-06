import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { TOPICS } from "@/data/topic-list"
import { useTranslation } from "@/hooks/use-translation"
import { StatisticsState } from "@/types"

export default function WeakCategories({
  topics,
}: {
  topics: StatisticsState
}) {
  const { t, topicText } = useTranslation()
  const practiced = TOPICS.filter((tp) => topics[tp.id].totalQuestions > 0)
  const sorted = [...practiced].sort(
    (a, b) => topics[b.id].accuracy - topics[a.id].accuracy,
  )

  const weak = [...sorted].reverse().slice(0, 3)

  return (
    <ul className="space-y-3">
      {weak.length === 0 && (
        <li className="text-sm text-[var(--color-text-faint)]">
          {t("dashboard.notEnoughData")}
        </li>
      )}

      {weak.map((tp) => (
        <li key={tp.id} className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <DynamicIcon
              name={tp.icon}
              className="h-4 w-4 text-[var(--color-text-muted)]"
            />
            {topicText(tp.id).name}
          </span>

          <span className="font-[var(--font-mono)] text-[var(--color-danger)]">
            {topics[tp.id].accuracy}%
          </span>
        </li>
      ))}
    </ul>
  )
}
