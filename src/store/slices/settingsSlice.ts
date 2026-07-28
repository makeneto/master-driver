import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Language } from "@/i18n/translations";

type State = {
  soundsEnabled: boolean;
  animationsEnabled: boolean;
  language: Language;
};

const initialState: State = {
  soundsEnabled: true,
  animationsEnabled: true,
  language: "pt",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSoundsEnabled: (state, action: PayloadAction<boolean>) => {
      state.soundsEnabled = action.payload;
    },
    setAnimationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.animationsEnabled = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    resetSettings: () => initialState,
  },
});

export const { setSoundsEnabled, setAnimationsEnabled, setLanguage, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
