"use client"

import NotebookIntro from "@/components/features/notebook/notebook-intro"
import NotebookAccordion from "@/components/features/notebook/notebook-accordion"

export default function NotebookPage() {
  return (
    <div className="mx-auto sm:max-w-4xl py-12 px-6 pt-7 pb-10">
      <NotebookIntro />
      <div className="lane-divider mb-8" />
      <NotebookAccordion />
    </div>
  )
}
