import { X } from "lucide-react"

import { Button } from "../ui/button"

export default function HideMobileSidebar({
  onClose,
}: {
  onClose: () => void
}) {
  return (
    <Button
      type="button"
      onClick={onClose}
      aria-label="Close menu"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-overlay)] text-[var(--color-text-muted)] transition-colors hover:bg-transparent"
    >
      <X className="h-4 w-4" />
    </Button>
  )
}
