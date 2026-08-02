"use client"

import { useState } from "react"
import { Pencil, Check } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setName } from "@/store/slices/profileSlice"
import { formatMinutes } from "@/lib/utils"
import { TOPICS } from "@/constants/topics"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LevelRing } from "@/components/features/profile/level-ring"
import { useTranslation } from "@/hooks/use-translation"

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((s) => s.profile)
  const topics = useAppSelector((s) => s.statistics.topics)
  const [editing, setEditing] = useState(false)
  const { t, topicText } = useTranslation()
  const displayName = profile.name.trim() || t("profile.defaultName")
  const [draft, setDraft] = useState(profile.name)

  const totalAnswered = Object.values(topics).reduce(
    (sum, tp) => sum + tp.totalQuestions,
    0,
  )
  const totalCorrect = Object.values(topics).reduce(
    (sum, tp) => sum + tp.correct,
    0,
  )
  const overallAccuracy =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

  return (
    <div className="mx-auto sm:max-w-3xl px-6 pt-7 pb-10">
      <h1 className="mb-8 font-[var(--font-display)] text-2xl font-semibold tracking-tight">{t("profile.title")}</h1>

      <Card className="flex flex-col items-center gap-6 p-10">
        <LevelRing xp={profile.xp} />
        
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="rounded-lg border border-[var(--color-hairline-strong)] bg-[var(--color-overlay)] px-3 py-1.5 text-center text-sm outline-none focus:border-[var(--color-gold)]"
              />
              <Button
                size="icon"
                variant="secondary"
                onClick={() => {
                  dispatch(setName(draft.trim() || t("profile.defaultName")))
                  setEditing(false)
                }}
              >
                <Check className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <h1 className="font-[var(--font-display)] text-xl font-semibold">
                {displayName}
              </h1>
              <button
                onClick={() => setEditing(true)}
                className="text-[var(--color-text-faint)] hover:text-[var(--color-text)]"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </Card>

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

      <Card className="mt-6 p-6">
        <CardHeader className="p-0 pb-4 mb-4">
          <CardTitle>{t("profile.progressByCategory")}</CardTitle>
          <CardDescription>
            {t("profile.progressByCategoryDesc")}
          </CardDescription>
        </CardHeader>

        <div className="space-y-3">
          {TOPICS.map((tp) => (
            <div
              key={tp.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-[var(--color-text-muted)]">
                {topicText(tp.id).name}
              </span>
              <span className="font-[var(--font-mono)]">
                {topics[tp.id].accuracy}%
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4 text-center">
      <p className="font-[var(--font-mono)] text-lg font-semibold">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wide text-[var(--color-text-faint)]">
        {label}
      </p>
    </Card>
  )
}
