// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import loadSlice from './slices/loadSlice';
import pathSlice from './slices/path';
import worldinfo from './slices/worldinfo';

export const store = configureStore({
  reducer: {
    path:pathSlice,
    load:loadSlice,
    worldinfo:worldinfo
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

