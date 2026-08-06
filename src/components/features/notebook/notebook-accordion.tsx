import { notebookChapters, notebookUi } from "@/i18n/notebook-content"
import { NotebookChapter } from "./notebook-chapter"
import { Language } from "@/i18n/translations"
import { useAppSelector } from "@/store/hooks"

export default function NotebookAccordion() {
  const language = useAppSelector((s) => s.settings.language) as Language
  const chapters = notebookChapters[language] ?? notebookChapters.pt
  const ui = notebookUi[language] ?? notebookUi.pt

  return (
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
  )
}
