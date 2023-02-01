import { configureStore  } from '@reduxjs/toolkit';
import loadSlice from '../slices/loadSlice';
import worldinfo from '../slices/worldinfo';
import lightEditor from '../slices/lightEditor';
import modelEditor from '../slices/modelEditor';
import RecorderSlice from '../slices/RecorderSlice';

export const store = configureStore({
  reducer: {
    load:loadSlice,
    worldinfo:worldinfo,
    lightEditor:lightEditor,
    modelEditor:modelEditor,
    recorderSlice:RecorderSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

