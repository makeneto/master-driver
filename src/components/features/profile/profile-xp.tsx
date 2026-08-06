import { Gauge } from "@/components/ui/gauge"

export interface ProfileXPProps {
  progress: number
  level: any
  next?: any
  xp: number
}

export default function ProfileXp({ progress, level, xp }: ProfileXPProps) {
  return (
    <Gauge value={progress} size={140} strokeWidth={10} color={level.color}>
      <div className="flex flex-col items-center">
        <span className="font-[var(--font-mono)] text-2xl font-semibold">
          {xp}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-faint)]">
          XP
        </span>
      </div>
    </Gauge>
  )
}
