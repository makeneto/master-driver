import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { todayISO, isYesterday } from "@/lib/utils";

type State = {
  name: string;
  xp: number;
  totalAnswered: number;
  studySeconds: number;
  streakDays: number;
  lastStudyDate: string;
  studyDates: string[];
};

const initialState: State = {
  name: "",
  xp: 0,
  totalAnswered: 0,
  studySeconds: 0,
  streakDays: 0,
  lastStudyDate: "",
  studyDates: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addXp: (state, action: PayloadAction<number>) => {
      state.xp += action.payload;
    },
    incrementAnswered: (state) => {
      state.totalAnswered += 1;
    },
    addStudySeconds: (state, action: PayloadAction<number>) => {
      state.studySeconds += action.payload;
    },
    registerStudyDay: (state) => {
      const today = todayISO();
      if (state.lastStudyDate === today) return;
      if (isYesterday(state.lastStudyDate)) {
        state.streakDays += 1;
      } else {
        state.streakDays = 1;
      }
      state.lastStudyDate = today;
      if (!state.studyDates.includes(today)) {
        state.studyDates.push(today);
      }
    },
    resetProfile: () => initialState,
  },
});

export const {
  setName,
  addXp,
  incrementAnswered,
  addStudySeconds,
  registerStudyDay,
  resetProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
