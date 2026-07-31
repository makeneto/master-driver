"use client"

import { useTranslation } from "@/hooks/use-translation"
import { useAppSelector } from "@/store/hooks"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ThemeToggle } from "../ui/theme-toggle"
import { LanguageSelect } from "../ui/language-select"
import { Button } from "../ui/button"
import { PanelLeft } from "lucide-react"

export default function Topbar() {
  const { t } = useTranslation()
  const profile = useAppSelector((s) => s.profile)
  const firstName = profile.name.split(" ")[0]

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
    <header className="w-full bg-[var(--color-base)] z-10 sticky top-0 flex items-center justify-between gap-1 border-b border-[var(--color-hairline)] px-4 sm:px-6 py-3.5 sm:py-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">
          <PanelLeft />
        </Button>

        <p className="hidden sm:block text-sm font-[var(--font-display)] font-semibold tracking-tight">
          <span className="text-[var(--color-text-muted)]">{greeting},</span>{" "}
          {firstName}
          <span className="text-[var(--color-text-muted)]">.</span>
        </p>
      </div>

      <div className="flex flex-row-reverse sm:flex-row  items-center gap-3">
        <ThemeToggle />
        <LanguageSelect className="w-full" />
      </div>
    </header>
  )
}
