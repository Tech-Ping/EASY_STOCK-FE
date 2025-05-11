// src/store/tutorialSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TutorialState {
  isTutorial: boolean;
  currentStep: number;
  completedLevel: number;
  dynamicBox: {
    top: number;
    left: number;
    width: number;
    height: number;
  } | null;
}

const initialState: TutorialState = {
  isTutorial: false,
  currentStep: 1,
  completedLevel: 0,
  dynamicBox: null,
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
    setCompletedLevel: (state, action: PayloadAction<number>) => {
      state.completedLevel = action.payload;
    },
     nextStep: (state) => {
      state.currentStep += 1;
    },
    setTutorialBox: (
      state,
      action: PayloadAction<{ top: number; left: number; width: number; height: number }>
    ) => {
      state.dynamicBox = action.payload;
    },
  },
})

export const { startTutorial, setStep, endTutorial, setCompletedLevel, nextStep, setTutorialBox } = tutorialSlice.actions;
export default tutorialSlice.reducer;
