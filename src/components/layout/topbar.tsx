"use client"

import { ThemeToggle } from "../ui/theme-toggle"
import { LanguageSelect } from "../ui/language-select"
import { MobileSidebar } from "./mobile-sidebar"
import { TopicSearch } from "./topic-search"
import TopbarGreetings from "./topbar-greetings"

export default function Topbar() {
  return (
    <header className="w-full bg-[var(--color-base)] z-10 sticky top-0 border-b border-[var(--color-gray-muted)] px-4 sm:px-6 py-3.5 sm:py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <MobileSidebar />
          <TopbarGreetings />
        </div>

        <div className="flex items-center gap-3 sm:flex-row">
          <TopicSearch className="min-w-[250px] max-w-[210px]" />
          <LanguageSelect className="w-full sm:w-auto" />

          <div className="flex items-center gap-2 ml-1.5">
            <div className="h-6 w-px bg-[var(--color-hairline-strong)]" />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
