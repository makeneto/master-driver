"use client"

import { BookMarked } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { notebookChapters, notebookUi } from "@/i18n/notebook-content"
import { NotebookChapter } from "@/components/features/notebook/notebook-chapter"
import type { Language } from "@/i18n/translations"

export default function NotebookPage() {
  const language = useAppSelector((s) => s.settings.language) as Language
  const chapters = notebookChapters[language] ?? notebookChapters.pt
  const ui = notebookUi[language] ?? notebookUi.pt

  return (
    <div className="mx-auto sm:max-w-4xl py-12 px-6 pt-7 pb-10">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-teal)]/20 ring-1 ring-inset ring-[var(--color-hairline-strong)]">
          <BookMarked className="h-5 w-5 text-[var(--color-gold-soft)]" />
        </div>
        <div>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight">
            {ui.pageTitle}
          </h1>
          <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
            {ui.pageSubtitle}
          </p>
        </div>
      </div>

      <div className="lane-divider mb-8" />

      <div className="space-y-4">
        {chapters.map((chapter, i) => (
          <NotebookChapter
            key={chapter.number}
            chapter={chapter}
            chapterLabel={ui.chapterLabel}
            summaryLabel={ui.summaryLabel}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </div>
  )
}
