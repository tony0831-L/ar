import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export const loadSlice = createSlice({
  name: "load",
  initialState: {
    loaded:false
  },
  reducers: {
    changeLoad:(state, action:PayloadAction<boolean>)=>{
        state.loaded = action.payload
    }
  },
});

export const { changeLoad } = loadSlice.actions
export const selectLoadState = (state: any) => state['load'].loaded
export default loadSlice.reducer