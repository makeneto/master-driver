"use client"

import { useTranslation } from "@/hooks/use-translation"
import { useAppSelector } from "@/store/hooks"
import { useEffect, useState } from "react"
import { ThemeToggle } from "../ui/theme-toggle"
import { LanguageSelect } from "../ui/language-select"
import { MobileSidebar } from "./mobile-sidebar"
import { TopicSearch } from "./topic-search"

export default function Topbar() {
  const { t } = useTranslation()
  const profile = useAppSelector((s) => s.profile)
  const firstName = profile.name.split(" ")[0] || t("profile.defaultName")

  const now = new Date()
  const hour = now.getHours()
  const [greeting, setGreeting] = useState<string>("")

  useEffect(() => {
    if (hour < 12) {
      setGreeting(t("greeting.morning"))
    } else if (hour < 18) {
      setGreeting(t("greeting.afternoon"))
    } else {
      setGreeting(t("greeting.evening"))
    }
  }, [t, hour])

  return (
    <header className="w-full bg-[var(--color-base)] z-10 sticky top-0 border-b border-[var(--color-gray-muted)] px-4 sm:px-6 py-3.5 sm:py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="block sm:hidden">
            <MobileSidebar />
          </div>

          <div className="hidden md:flex items-center gap-3">
            <p className="text-sm font-[var(--font-display)] font-semibold tracking-tight">
              <span className="text-[var(--color-text-muted)]">
                {greeting},
              </span>{" "}
              {firstName}
              <span className="text-[var(--color-text-muted)]">.</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:flex-row">
          <TopicSearch className="min-w-[250px] max-w-[520px]" />
          <ThemeToggle />
          <LanguageSelect className="w-full sm:w-auto" />
        </div>
      </div>
    </header>
  )
}
