"use client"

import { Gauge } from "@/components/ui/gauge"
import useLevel from "@/hooks/use-level"
import ProfileXp from "./profile-xp"
import LevelDescription from "./level-description"

export function LevelRing({ xp }: { xp: number }) {
  const { level, next, progress } = useLevel({ xp })

  return (
    <div className="flex flex-col items-center gap-3">
      <ProfileXp progress={progress} level={level} xp={xp} />
      <LevelDescription progress={progress} level={level} next={next} xp={xp} />
    </div>
  )
}
