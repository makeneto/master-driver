import { LEVELS } from "@/data/levels-list"
import type { LevelMeta } from "@/types"

export function getLevelForXp(xp: number): LevelMeta {
  const sorted = [...LEVELS].sort((a, b) => b.minXp - a.minXp)
  return sorted.find((l) => xp >= l.minXp) ?? LEVELS[0]
}

export function getNextLevel(xp: number): LevelMeta | null {
  const current = getLevelForXp(xp)
  const idx = LEVELS.findIndex((l) => l.id === current.id)
  return LEVELS[idx + 1] ?? null
}
