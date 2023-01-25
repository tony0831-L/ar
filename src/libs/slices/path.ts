import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export const pathSlice = createSlice({
  name: "path",
  initialState: {
    path:String
  },
  reducers: {
    setPath:(state, action:PayloadAction<string>)=>{
        console.log(action.payload)
    }
  },
});

export const { setPath } = pathSlice.actions

export default pathSlice.reducer