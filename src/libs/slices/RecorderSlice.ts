import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import Recorder from 'js-audio-recorder';
import {encode} from 'base64-arraybuffer'

export const RecorderSlice = createSlice({
  name: "load",
  initialState: {
    recorder:{},
    buffer:{}
  },
  reducers: {
    init:(state)=>{
      if (state.recorder instanceof Recorder) {
        return
      }
      state.recorder = new Recorder({sampleRate: 48000})
    },
    start:(state)=>{
      if (state.recorder instanceof Recorder) {
        state.recorder.start()
      }
    },
    stop:(state,action: PayloadAction<Function>)=>{
      if (state.recorder instanceof Recorder) {
        state.recorder.stop()
        state.recorder.getWAVBlob().arrayBuffer().then((buffer:ArrayBuffer)=>{
          action.payload(buffer)
        })
      }
    },
  },
});

export const { init , start , stop } = RecorderSlice.actions
export const selectRecorder = (state: any) => state['recorderSlice'].recorder
export const selectRecorderbuffer = (state: any) => state['recorderSlice'].buffer
export default RecorderSlice.reducer