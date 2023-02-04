import { createSlice , nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Light } from "../interfaces/worldInterfaces";

export const lightEditorSlice = createSlice({
    name: "LightEditor",
    initialState: {
        id:nanoid(),
        info: <Array<Light>>[],
    },
    reducers: {
        setLightInfo: (state, action: PayloadAction<Light[]>) => {
            state.info = action.payload
            console.log("setLightInfo")
        },
        setLightInfoByIndex: (state, action: PayloadAction<{obj:Light,index:number}>) => {
            state.info[action.payload.index] = action.payload.obj
            state.id = nanoid()
        },
    },
});

export const { setLightInfo,setLightInfoByIndex } = lightEditorSlice.actions

export const selectAllLights = (state:any) => state['lightEditor'].info
export const selectLightId = (state:any) => state['lightEditor'].id

export default lightEditorSlice.reducer



