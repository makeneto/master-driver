import { useTranslation } from "@/hooks/use-translation"
import QuizIntro from "./quiz-intro"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { TOPICS } from "@/data/topic-list"

export default function TopicPicker() {
  const { topicText } = useTranslation()

  return (
    <div className="mx-4 lg:mx-auto lg:max-w-4xl xl:max-w-[50%] pt-7 pb-10">
      <QuizIntro />

      <div className="grid grid-cols-1 gap-3 items-stretch sm:grid-cols-2">
        {TOPICS.map((topic) => {
          const { name, description } = topicText(topic.id)
          return (
            <Link key={topic.id} href={`/quiz?topic=${topic.id}`}>
              <Card className="glass-hover flex items-center gap-4 p-4 h-full transition-colors hover:border-[var(--color-hairline-strong)]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-teal)]/20 text-xl ring-1 ring-inset ring-[var(--color-hairline-strong)]">
                  <DynamicIcon
                    name={topic.icon}
                    className="h-5 w-5 text-[var(--color-gold-soft)]"
                  />
                </div>

                <CardHeader className="p-0">
                  <CardTitle className="text-sm">{name}</CardTitle>
                  <CardDescription className="line-clamp">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>

      <CardContent className="hidden" />
    </div>
  )
}
