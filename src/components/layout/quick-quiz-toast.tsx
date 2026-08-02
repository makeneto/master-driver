"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Zap } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

const STORAGE_KEY = "driving-master:quick-quiz-toast-shown"

export function QuickQuizToast() {
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    let alreadyShown = true
    try {
      alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1"
    } catch {}
    if (alreadyShown) return

    const timer = setTimeout(() => {
      toast(t("quickQuizToast.title"), {
        icon: <Zap className="h-4 w-4 text-[var(--color-gold)]" />,
        description: t("quickQuizToast.description"),
        duration: 8000,
        action: {
          label: t("quickQuizToast.action"),
          onClick: () => router.push("/quiz?mode=quick"),
        },
      })
      try {
        sessionStorage.setItem(STORAGE_KEY, "1")
      } catch {}
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  return null
}
