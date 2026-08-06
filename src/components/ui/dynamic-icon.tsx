import {
  Signpost,
  TrafficCone,
  ArrowLeftRight,
  SquareParking,
  Gauge as GaugeIcon,
  ShieldCheck,
  UserCheck,
  Lightbulb,
  CloudRain,
  FileCheck2,
  Sparkles,
  CheckCircle2,
  Layers,
  Flame,
  Trophy,
  Zap,
  Map,
  Crown,
  type LucideProps,
} from "lucide-react"

const ICONS = {
  Signpost,
  TrafficCone,
  ArrowLeftRight,
  SquareParking,
  Gauge: GaugeIcon,
  ShieldCheck,
  UserCheck,
  Lightbulb,
  CloudRain,
  FileCheck2,
  Sparkles,
  CheckCircle2,
  Layers,
  Flame,
  Trophy,
  Zap,
  Map,
  Crown,
} as const

export type IconName = keyof typeof ICONS

export function DynamicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = ICONS[name as IconName] ?? Sparkles
  return <Icon {...props} />
}
