import { Card } from "@/components/ui/card"

export default function MiniStat({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Card className="p-4 text-center">
      <p className="font-[var(--font-mono)] text-lg font-semibold">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wide text-[var(--color-text-faint)]">
        {label}
      </p>
    </Card>
  )
}
