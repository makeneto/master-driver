"use client"

import AchievementsIntro from "@/components/features/achievements/achievements-intro"
import AchievementsList from "@/components/features/achievements/achievements-list"

export default function AchievementsPage() {
  return (
    <div className="mx-auto sm:max-w-4xl py-12 px-6 pt-7 pb-10">
      <AchievementsIntro />
      <AchievementsList />
    </div>
  )
}
