import { Card } from "@/components/ui/card"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import { Lock } from "lucide-react"

interface AchievementsCardProps {
  achievement: any
  title: string
  description: string
}

export default function AchievementsCard({
  achievement,
  title,
  description,
}: AchievementsCardProps) {
  const { t } = useTranslation()

  return (
    <Card
      className={cn(
        "flex items-center gap-4 p-5 transition-colors",
        achievement.unlocked ? "border-[var(--color-gold)]/30" : "opacity-60",
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
          achievement.unlocked
            ? "bg-gradient-to-br from-[var(--color-gold)]/25 to-[var(--color-teal)]/25"
            : "bg-[var(--color-overlay)]",
        )}
      >
        {achievement.unlocked ? (
          <DynamicIcon
            name={achievement.icon}
            className="h-6 w-6 text-[var(--color-gold-soft)]"
          />
        ) : (
          <Lock className="h-5 w-5 text-[var(--color-text-faint)]" />
        )}
      </div>

      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-[var(--color-text-muted)]">{description}</p>
        {achievement.unlocked && achievement.unlockedAt && (
          <p className="mt-1 text-[10px] text-[var(--color-text-faint)]">
            {t("achievements.unlockedOn", { date: achievement.unlockedAt })}
          </p>
        )}
      </div>
    </Card>
  )
}
