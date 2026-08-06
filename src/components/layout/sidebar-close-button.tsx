import { PanelLeftClose } from "lucide-react"
import { Button } from "../ui/button"

export default function SidebarCloseButton({ toggle }: { toggle: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label="Fechar menu lateral"
    >
      <PanelLeftClose className="h-4 w-4" />
    </Button>
  )
}
