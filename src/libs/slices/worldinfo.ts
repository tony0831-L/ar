import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { World } from "../worldInterfaces";

export const worldSlice = createSlice({
    name: "path",
    initialState: {
        info: <World>{},
    },
    reducers: {
        setWorldInfo: (state, action: PayloadAction<World>) => {
            state.info = <World>action.payload
        }
    },
});

export const { setWorldInfo } = worldSlice.actions
export default worldSlice.reducer



