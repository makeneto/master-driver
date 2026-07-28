import type { AchievementId, StatisticsState } from "@/types";
import { TOPICS } from "@/constants/topics";
import { getQuestionsByTopic } from "@/data/questions";

type CheckInput = {
  totalAnswered: number;
  streakDays: number;
  topics: StatisticsState;
  unlocked: Record<AchievementId, boolean>;
  currentTopicStreak: number;
};

export function evaluateAchievements(input: CheckInput): AchievementId[] {
  const toUnlock: AchievementId[] = [];
  const { totalAnswered, streakDays, topics, unlocked, currentTopicStreak } = input;

  const add = (id: AchievementId) => {
    if (!unlocked[id]) toUnlock.push(id);
  };

  if (totalAnswered >= 1) add("first-answer");

  const totalCorrect = Object.values(topics).reduce((sum, t) => sum + t.correct, 0);
  if (totalCorrect >= 10) add("first-ten-correct");
  if (totalAnswered >= 100) add("hundred-answers");
  if (totalAnswered >= 1000) add("thousand-answers");
  if (streakDays >= 7) add("seven-day-streak");
  if (currentTopicStreak >= 20) add("streak-twenty");

  const hasPerfectCategory = TOPICS.some((t) => {
    const s = topics[t.id];
    const total = getQuestionsByTopic(t.id).length;
    return s.totalQuestions >= total && s.wrong === 0 && s.totalQuestions > 0;
  });
  if (hasPerfectCategory) add("perfect-category");

  const allPracticed = TOPICS.every((t) => topics[t.id].totalQuestions > 0);
  if (allPracticed) add("all-categories");

  return toUnlock;
}
