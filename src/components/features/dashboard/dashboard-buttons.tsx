import Link from "next/link"
import { AlertTriangle, Crosshair } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

export default function DashboardButtons() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild variant="default">
        <Link
          href="/quiz?mode=review-wrong"
          className="flex items-center gap-2"
        >
          <AlertTriangle className="h-4 w-4" /> {t("dashboard.reviewWrong")}
        </Link>
      </Button>

      <Button asChild variant="default">
        <Link href="/quiz?mode=review-weak" className="flex items-center gap-2">
          <Crosshair className="h-4 w-4" /> {t("dashboard.trainWeak")}
        </Link>
      </Button>
    </div>
  )
}
