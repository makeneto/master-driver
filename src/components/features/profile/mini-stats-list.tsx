import useProfile from "@/hooks/use-profile"
import MiniStat from "./mini-stat"
import { formatMinutes } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"

export default function MiniStatsList() {
  const { profile, t, overallAccuracy } = useProfile()

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <MiniStat
        label={t("profile.streakDays")}
        value={`${profile.streakDays}`}
      />
      <MiniStat
        label={t("profile.totalAnswers")}
        value={`${profile.totalAnswered}`}
      />
      <MiniStat
        label={t("profile.studyTime")}
        value={formatMinutes(profile.studySeconds)}
      />
      <MiniStat
        label={t("profile.accuracyOverall")}
        value={`${overallAccuracy}%`}
      />
    </div>
  )
}
