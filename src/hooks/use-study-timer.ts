"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/store/hooks"
import { addStudySeconds } from "@/store/slices/profileSlice"

export function useStudyTimer(active: boolean) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      dispatch(addStudySeconds(10))
    }, 10_000)
    return () => clearInterval(interval)
  }, [active, dispatch])
}
