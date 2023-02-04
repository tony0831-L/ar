import { createSlice , nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Model } from "../interfaces/worldInterfaces";

export const modelEditorSlice = createSlice({
    name: "modelEditorSlice",
    initialState: {
        id:nanoid(),
        info: <Array<Model>>[],
    },
    reducers: {
        setModelinfo: (state, action: PayloadAction<Model[]>) => {
            state.info = action.payload
            console.log("setModelinfo")
        },
        setModelInfoByIndex: (state, action: PayloadAction<{obj:Model,index:number}>) => {
            state.info[action.payload.index] = action.payload.obj
            state.id = nanoid()
        },
    },
});

export const { setModelinfo, setModelInfoByIndex } = modelEditorSlice.actions
export const selectAllModels = (state: any) => state['modelEditor'].info
export const selectModelId = (state: any) => state['modelEditor'].id
export default modelEditorSlice.reducer



