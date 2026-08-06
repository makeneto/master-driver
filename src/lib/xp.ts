export const XP_RULES = {
  CORRECT_ANSWER: 10,
  STREAK_5: 25,
  STREAK_10: 50,
  CATEGORY_COMPLETE: 100,
} as const

/** Calcula o XP ganho por uma resposta correta, considerando bónus de sequência. */
export function calculateAnswerXp(currentStreak: number): number {
  let xp = XP_RULES.CORRECT_ANSWER
  if (currentStreak > 0 && currentStreak % 10 === 0) {
    xp += XP_RULES.STREAK_10
  } else if (currentStreak > 0 && currentStreak % 5 === 0) {
    xp += XP_RULES.STREAK_5
  }
  return xp
}
