import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useProfile from "@/hooks/use-profile"
import ProgressRow from "./progress-row"
import { TOPICS } from "@/data/topic-list"

export default function ProgressByCategory() {
  const { t, topics } = useProfile()

  return (
    <Card className="mt-6 p-6">
      <CardHeader className="p-0 pb-4 mb-4">
        <CardTitle>{t("profile.progressByCategory")}</CardTitle>
        <CardDescription>{t("profile.progressByCategoryDesc")}</CardDescription>
      </CardHeader>

      <div className="space-y-3">
        {TOPICS.map((tp) => (
          <ProgressRow key={tp.id} id={tp.id} topics={topics} />
        ))}
      </div>
    </Card>
  )
}
