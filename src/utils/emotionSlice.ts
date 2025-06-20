import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {Emotion} from "@/utils/types.ts";

const emotionSlice=createSlice({
    name:'emotion',
    initialState:null as Emotion[]|null,
    reducers:{
        addEmotions:(_state,action:PayloadAction<Emotion[]>)=>{
            return action.payload
        }
    }
})
export default emotionSlice.reducer
export const {addEmotions}=emotionSlice.actions;