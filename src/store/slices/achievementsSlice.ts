import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Achievement, AchievementId } from "@/types"
import { ACHIEVEMENT_DEFS } from "@/data/achievements-list"
import { todayISO } from "@/lib/utils"

type State = {
  items: Record<AchievementId, Achievement>
}

function initialItems(): Record<AchievementId, Achievement> {
  return ACHIEVEMENT_DEFS.reduce(
    (acc, def) => {
      acc[def.id] = { ...def, unlocked: false, unlockedAt: null }
      return acc
    },
    {} as Record<AchievementId, Achievement>,
  )
}

const initialState: State = { items: initialItems() }

const achievementsSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {
    unlockAchievement: (state, action: PayloadAction<AchievementId>) => {
      const item = state.items[action.payload]
      if (item && !item.unlocked) {
        item.unlocked = true
        item.unlockedAt = todayISO()
      }
    },
    resetAchievements: () => ({ items: initialItems() }),
  },
})

export const { unlockAchievement, resetAchievements } =
  achievementsSlice.actions
export default achievementsSlice.reducer
