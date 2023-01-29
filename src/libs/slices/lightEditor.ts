import { createSlice , nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Light } from "../worldInterfaces";

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
        cleanLight: (state, action: PayloadAction<[]>)=>{
            state.info = action.payload
            console.log("clean")
        },
        lightOff:(state)=>{
            state.id = nanoid()
            state.info.forEach(light=>{
                light.intensity = 0
                // temp.push(light)
            })
            // state.info = []
            // state.info = temp
        }
    },
});

export const { setLightInfo , cleanLight , lightOff } = lightEditorSlice.actions

export const selectAllLights = (state:any) => state['lightEditor'].info
export const selectLightId = (state:any) => state['lightEditor'].id

export default lightEditorSlice.reducer



