"use client"

import React, { Activity, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Menu } from "lucide-react"

import { MobileSidebarDrawer } from "./mobile-sidebar-drawer"
import { Button } from "../ui/button"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        <Activity mode={open ? "visible" : "hidden"}>
          <MobileSidebarDrawer onClose={() => setOpen(false)} />
        </Activity>
      </AnimatePresence>
    </React.Fragment>
  )
}
