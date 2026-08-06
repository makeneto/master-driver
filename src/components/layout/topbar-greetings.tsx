import { useTranslation } from "@/hooks/use-translation"
import { useAppSelector } from "@/store/hooks"
import { useEffect, useState } from "react"

export default function TopbarGreetings() {
  const profile = useAppSelector((s) => s.profile)
  const { t } = useTranslation()
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
    <div className="hidden md:flex items-center gap-3">
      <p className="text-sm font-semibold tracking-tight">
        <span className="text-[var(--color-text-muted)]">{greeting},</span>{" "}
        {firstName}
        <span className="text-[var(--color-text-muted)]">.</span>
      </p>
    </div>
  )
}
