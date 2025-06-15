// src/store/tutorialSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TutorialLevel = 'ZERO' | 'ONE' | 'TWO';

interface TutorialState {
  isTutorial: boolean;
  currentTutorialLevel: TutorialLevel | null;
  currentStep: number;
  completedLevels: TutorialLevel[];
  dynamicBox: {
    top: number;
    left: number;
    width: number;
    height: number;
  } | null;
}

const initialState: TutorialState = {
  isTutorial: false,
  currentTutorialLevel: null,
  currentStep: 1,
  completedLevels: [],
  dynamicBox: null,
};

export const tutorialSlice = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {
    startTutorial: (state, action: PayloadAction<TutorialLevel>) => {
      state.isTutorial = true;
      state.currentTutorialLevel = action.payload;
      state.currentStep = 1;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
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
    endTutorial: (state) => {
      if (
        state.currentTutorialLevel &&
        !state.completedLevels.includes(state.currentTutorialLevel)
      ) {
        state.completedLevels.push(state.currentTutorialLevel);
      }
      state.isTutorial = false;
      state.currentStep = 1;
      state.dynamicBox = null;
      state.currentTutorialLevel = null;
    },
    resetTutorials: (state) => {
      state.isTutorial = false;
      state.currentStep = 1;
      state.dynamicBox = null;
      state.completedLevels = [];
      state.currentTutorialLevel = null;
    },
  },
});

export const {
  startTutorial,
  setStep,
  nextStep,
  setTutorialBox,
  endTutorial,
  resetTutorials,
} = tutorialSlice.actions;

export default tutorialSlice.reducer;