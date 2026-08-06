import { useAppDispatch, useAppSelector } from "@/store/hooks"
import React, { useState } from "react"
import { useTranslation } from "./use-translation"

export default function useProfile() {
  const { t, topicText } = useTranslation()

  const profile = useAppSelector((s) => s.profile)
  const displayName = profile.name
  const username = displayName.trim() || t("profile.defaultName")
  const [draft, setDraft] = useState(displayName)

  const dispatch = useAppDispatch()
  const topics = useAppSelector((s) => s.statistics.topics)
  const [editing, setEditing] = useState(false)

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

  return {
    dispatch,
    profile,
    topics,
    editing,
    setEditing,
    t,
    topicText,
    username,
    draft,
    setDraft,
    overallAccuracy,
  }
}
