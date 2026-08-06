import useProfile from "@/hooks/use-profile"

interface ProgressRowProps {
  topics: any
  id: string
}

export default function ProgressRow({ id, topics }: ProgressRowProps) {
  const { topicText } = useProfile()

  return (
    <div key={id} className="flex items-center justify-between text-sm">
      <span className="text-[var(--color-text-muted)]">
        {topicText(id).name}
      </span>
      <span className="font-[var(--font-mono)]">{topics[id].accuracy}%</span>
    </div>
  )
}
