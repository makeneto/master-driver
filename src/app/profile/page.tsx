"use client"

import useProfile from "@/hooks/use-profile"
import UserCard from "@/components/features/profile/user-card"
import MiniStatsList from "@/components/features/profile/mini-stats-list"
import ProgressByCategory from "@/components/features/profile/progress-by-category"

export default function ProfilePage() {
  const { t } = useProfile()

  return (
    <div className="mx-auto sm:max-w-3xl px-6 pt-7 pb-10">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">
        {t("profile.title")}
      </h1>

      <UserCard />
      <MiniStatsList />
      <ProgressByCategory />
    </div>
  )
}
