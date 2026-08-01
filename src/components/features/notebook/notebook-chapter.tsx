"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import type { NotebookChapter as NotebookChapterType } from "@/i18n/notebook-content"
import { NotebookBlockRenderer, NotebookParagraph } from "./notebook-blocks"
import { DynamicIcon } from "@/components/ui/dynamic-icon"

export function NotebookChapter({
  chapter,
  chapterLabel,
  summaryLabel,
  defaultOpen = false,
}: {
  chapter: NotebookChapterType
  chapterLabel: string
  summaryLabel: string
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-[var(--color-overlay)]"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-teal)]/20 text-xl ring-1 ring-inset ring-[var(--color-hairline-strong)]">
          <DynamicIcon
            name={chapter.icon}
            className="h-5 w-5 text-[var(--color-gold-soft)]"
          />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-faint)]">
            {chapterLabel} {chapter.number}
          </p>
          <h2 className="font-semibold text-[var(--color-text)] tracking-tight sm:text-lg">
            {chapter.title}
          </h2>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[var(--color-text-faint)] transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="lane-divider mx-5" />
            <div className="p-5 pt-5 sm:p-8 sm:pt-6">
              {chapter.intro && <NotebookParagraph text={chapter.intro} />}
              {chapter.blocks.map((block, i) => (
                <NotebookBlockRenderer
                  key={i}
                  block={block}
                  summaryLabel={summaryLabel}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
