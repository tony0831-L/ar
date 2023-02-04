import { createSlice , nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Collision } from "../interfaces/worldInterfaces";

export const CollisionsEditor = createSlice({
    name: "CollisionsEditor",
    initialState: {
        id:nanoid(),
        info: <Array<Collision>>[],
    },
    reducers: {
        setCollisioninfo: (state, action: PayloadAction<Collision[]>) => {
            state.info = action.payload
            console.log("setCollisioninfo")
        },
        setCollisionInfoByIndex: (state, action: PayloadAction<{obj:Collision,index:number}>) => {
            state.info[action.payload.index] = action.payload.obj
            state.id = nanoid()
        },
    },
});

export const { setCollisioninfo, setCollisionInfoByIndex } = CollisionsEditor.actions

export const selectAllCollisions = (state: any) => state['collisionsEditor'].info
export const selectCollisionId = (state: any) => state['collisionsEditor'].id

export default CollisionsEditor.reducer



