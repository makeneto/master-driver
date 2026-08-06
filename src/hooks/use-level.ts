import { getLevelForXp, getNextLevel } from "@/constants/levels"

export default function useLevel({ xp }: { xp: number }) {
  const level = getLevelForXp(xp)
  const next = getNextLevel(xp)
  const progress = next
    ? Math.round(((xp - level.minXp) / (next.minXp - level.minXp)) * 100)
    : 100

  return { level, next, progress }
}
