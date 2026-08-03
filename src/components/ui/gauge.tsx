"use client"

import { cn } from "@/lib/utils"

type GaugeProps = {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  className?: string
  children?: React.ReactNode
}

export function Gauge({
  value,
  size = 72,
  strokeWidth = 6,
  color = "var(--color-gold)",
  trackColor = "var(--color-gauge-track)",
  className,
  children,
}: GaugeProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, value))
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
