// src/store/tutorialSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TutorialState {
  isTutorial: boolean;
  currentStep: number;
}

const initialState: TutorialState = {
  isTutorial: false,
  currentStep: 0,
};

export const tutorialSlice = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {
    startTutorial: (state, action: PayloadAction<number>) => {
      state.isTutorial = true;
      state.currentStep = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    endTutorial: (state) => {
      state.isTutorial = false;
      state.currentStep = 1;
    },
  },
});

export const { startTutorial, setStep, endTutorial } = tutorialSlice.actions;
export default tutorialSlice.reducer;
