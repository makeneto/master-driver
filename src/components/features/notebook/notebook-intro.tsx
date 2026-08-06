import { notebookUi } from "@/i18n/notebook-content"
import { Language } from "@/i18n/translations"
import { useAppSelector } from "@/store/hooks"
import { BookMarked } from "lucide-react"

export default function NotebookIntro() {
  const language = useAppSelector((s) => s.settings.language) as Language
  const ui = notebookUi[language] ?? notebookUi.pt

  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-teal)]/20 ring-1 ring-inset ring-[var(--color-hairline-strong)]">
        <BookMarked className="h-5 w-5 text-[var(--color-gold-soft)]" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {ui.pageTitle}
        </h1>
        <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
          {ui.pageSubtitle}
        </p>
      </div>
    </div>
  )
}
