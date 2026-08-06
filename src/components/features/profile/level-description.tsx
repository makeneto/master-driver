import { useTranslation } from "@/hooks/use-translation"
import { ProfileXPProps } from "./profile-xp"

export default function LevelDescription({
  progress,
  level,
  next,
  xp,
}: ProfileXPProps) {
  const { levelName, t } = useTranslation()

  return (
    <div className="text-center">
      <p className="text-lg font-semibold" style={{ color: level.color }}>
        {levelName(level.id)}
      </p>
      {next ? (
        <p className="text-xs text-[var(--color-text-faint)]">
          {t("profile.xpToNext", {
            xp: next.minXp - xp,
            level: levelName(next.id),
          })}
        </p>
      ) : (
        <p className="text-xs text-[var(--color-text-faint)]">
          {t("profile.maxLevel")}
        </p>
      )}
    </div>
  )
}
