"use client"

import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Menu } from "lucide-react"

import { MobileSidebarDrawer } from "./mobile-sidebar-drawer"
import { Button } from "../ui/button"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        className="glass-hover flex sm:hidden h-11 w-11 items-center justify-center rounded-full text-[var(--color-text)]"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {open && <MobileSidebarDrawer onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </React.Fragment>
  )
}
