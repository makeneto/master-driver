export type TopicId =
  | "prioridade"
  | "sinalizacao"
  | "ultrapassagem"
  | "paragem-estacionamento"
  | "velocidade"
  | "seguranca"
  | "comportamento"
  | "luzes"
  | "situacoes-especiais"
  | "alcool-documentacao";

export type Question = {
  id: number;
  topic: TopicId;
  question: string;
  answer: string;
};

export type TopicMeta = {
  id: TopicId;
  name: string;
  icon: string; // lucide icon name, resolved in TopicIcon
  description: string;
};

export type TopicStats = {
  totalQuestions: number;
  correct: number;
  wrong: number;
  accuracy: number;
  lastPlayed: string;
  streak: number;
};

export type StatisticsState = Record<TopicId, TopicStats>;

export type QuestionRecord = {
  questionId: number;
  seen: number;
  correct: number;
  wrong: number;
  weight: number;
  lastResult: "correct" | "wrong" | null;
};

export type AchievementId =
  | "first-answer"
  | "first-ten-correct"
  | "hundred-answers"
  | "seven-day-streak"
  | "perfect-category"
  | "streak-twenty"
  | "all-categories"
  | "thousand-answers";

export type Achievement = {
  id: AchievementId;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt: string | null;
};

export type LevelId =
  | "iniciante"
  | "condutor"
  | "condutor-seguro"
  | "especialista"
  | "instrutor"
  | "mestre-da-estrada"
  | "lenda";

export type LevelMeta = {
  id: LevelId;
  name: string;
  minXp: number;
  color: string;
  gradient: string;
};
