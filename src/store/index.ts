// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import tutorialReducer from './tutorialSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tutorial: tutorialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
