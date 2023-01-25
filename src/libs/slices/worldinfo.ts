import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { world } from "../worldInterfaces";

export const worldSlice = createSlice({
    name: "path",
    initialState: {
        info: <world>{},
    },
    reducers: {
        setWorld: (state, action: PayloadAction<world>) => {
            state.info = <world>action.payload
        }
    },
});

export const { setWorld } = worldSlice.actions

export default worldSlice.reducer



