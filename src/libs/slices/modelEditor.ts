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
        cleanModel: (state, action: PayloadAction<[]>) => {
            state.info = action.payload
            console.log("clean")
        },
        pushModel: (state) => {
            state.info.push(new Model({
                "type": "GLB",
                "url": "lego_people/8/scene.glb",
                "scale": 1.7,
                "position": [
                    2,
                    2,
                    0
                ],
                "rotation": [
                    0,
                    0,
                    0
                ],
                "name": "ccc1",
                "anime": "walk",
                "_id": "63d28ac451ce9ac6948cb4eg",
                "onClick":null,
                "onPointerOut":null,
                "onPointerOver":null
            }))
            state.id = nanoid()
        }
    },
});

export const { setModelinfo, cleanModel, pushModel } = modelEditorSlice.actions
export const selectAllModels = (state: any) => state['modelEditor'].info
export const selectModelId = (state: any) => state['modelEditor'].id
export default modelEditorSlice.reducer



