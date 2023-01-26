import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Light } from "../worldInterfaces";

export const lightEditorSlice = createSlice({
    name: "LightEditor",
    initialState: {
        info: <Array<Light>>[],
    },
    reducers: {
        setLightInfo: (state, action: PayloadAction<Light[]>) => {
            state.info = action.payload
            console.log("setLightInfo")
        },
        clean: (state, action: PayloadAction<[]>)=>{
            state.info = action.payload
            console.log("clean")
        }
    },
});

export const { setLightInfo , clean } = lightEditorSlice.actions
export default lightEditorSlice.reducer



