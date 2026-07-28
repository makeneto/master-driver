"use client";

import { Gauge } from "@/components/ui/gauge";
import { getLevelForXp, getNextLevel } from "@/constants/levels";
import { useTranslation } from "@/hooks/use-translation";

export function LevelRing({ xp }: { xp: number }) {
  const { levelName, t } = useTranslation();
  const level = getLevelForXp(xp);
  const next = getNextLevel(xp);
  const progress = next ? Math.round(((xp - level.minXp) / (next.minXp - level.minXp)) * 100) : 100;

  return (
    <div className="flex flex-col items-center gap-3">
      <Gauge value={progress} size={140} strokeWidth={10} color={level.color}>
        <div className="flex flex-col items-center">
          <span className="font-[var(--font-mono)] text-2xl font-semibold">{xp}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-faint)]">XP</span>
        </div>
      </Gauge>
      <div className="text-center">
        <p className="font-[var(--font-display)] text-lg font-semibold" style={{ color: level.color }}>
          {levelName(level.id)}
        </p>
        {next ? (
          <p className="text-xs text-[var(--color-text-faint)]">
            {t("profile.xpToNext", { xp: next.minXp - xp, level: levelName(next.id) })}
          </p>
        ) : (
          <p className="text-xs text-[var(--color-text-faint)]">{t("profile.maxLevel")}</p>
        )}
      </div>
    </div>
  );
}
