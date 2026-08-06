import { useTranslation } from "@/hooks/use-translation"
import { useAppSelector } from "@/store/hooks"

export default function AchievementsIntro() {
  const { t } = useTranslation()
  const achievements = useAppSelector((s) => s.achievements.items)
  const list = Object.values(achievements)
  const unlockedCount = list.filter((a) => a.unlocked).length

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("achievements.title")}
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        {t("achievements.unlockedCount", {
          unlocked: unlockedCount,
          total: list.length,
        })}
      </p>
    </div>
  )
}
