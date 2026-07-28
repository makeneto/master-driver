import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TopicId } from "@/types";

export type QuizMode = "practice" | "exam" | "review-wrong" | "review-weak";

type ExamResult = {
  total: number;
  correct: number;
  wrong: number;
  percentage: number;
  failedTopics: TopicId[];
  wrongQuestionIds: number[];
  seconds: number;
};

type State = {
  active: boolean;
  mode: QuizMode | null;
  topic: TopicId | null;
  questionIds: number[];
  currentIndex: number;
  showAnswer: boolean;
  sessionCorrect: number;
  sessionWrong: number;
  startedAt: number | null;
  examResult: ExamResult | null;
};

const initialState: State = {
  active: false,
  mode: null,
  topic: null,
  questionIds: [],
  currentIndex: 0,
  showAnswer: false,
  sessionCorrect: 0,
  sessionWrong: 0,
  startedAt: null,
  examResult: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startSession: (
      state,
      action: PayloadAction<{ mode: QuizMode; topic: TopicId | null; questionIds: number[] }>
    ) => {
      state.active = true;
      state.mode = action.payload.mode;
      state.topic = action.payload.topic;
      state.questionIds = action.payload.questionIds;
      state.currentIndex = 0;
      state.showAnswer = false;
      state.sessionCorrect = 0;
      state.sessionWrong = 0;
      state.startedAt = Date.now();
      state.examResult = null;
    },
    revealAnswer: (state) => {
      state.showAnswer = true;
    },
    submitEvaluation: (state, action: PayloadAction<{ correct: boolean }>) => {
      if (action.payload.correct) state.sessionCorrect += 1;
      else state.sessionWrong += 1;
    },
    nextQuestion: (state) => {
      state.currentIndex += 1;
      state.showAnswer = false;
    },
    finishExam: (state, action: PayloadAction<ExamResult>) => {
      state.examResult = action.payload;
      state.active = false;
    },
    endSession: () => initialState,
  },
});

export const {
  startSession,
  revealAnswer,
  submitEvaluation,
  nextQuestion,
  finishExam,
  endSession,
} = quizSlice.actions;
export default quizSlice.reducer;
