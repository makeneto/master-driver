import { AnimatePresence, motion } from "framer-motion"
import { PanelLeftOpen } from "lucide-react"

interface SidebarOpenButtonProps {
  toggle: () => void
}

export default function SidebarOpenButton({ toggle }: SidebarOpenButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label="Abrir menu lateral"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.2 }}
      className="glass fixed left-0 top-22 z-40 hidden sm:flex h-11 w-8 items-center justify-center rounded-r-full border border-l-0 border-[var(--color-hairline-strong)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
    >
      <PanelLeftOpen className="h-4 w-4" />
    </motion.button>
  )
}
