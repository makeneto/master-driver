"use client"
import React from "react"

import { useTranslation } from "@/hooks/use-translation"

export default function DonatePage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-6xl px-6 pt-7 pb-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("donate.title")}
      </h1>
    </div>
  )
}
