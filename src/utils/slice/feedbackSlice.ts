import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {CheckIn} from "@/utils/types.ts";

interface FeedBackProps {
    latestCheckIn: CheckIn | null;
    sliderValue: number[];
    toolName:string
}

const feedbackSlice = createSlice({
    name:'feedback',
    initialState:null as FeedBackProps[]|null,
    reducers:{
        addFeedback:(_state,action:PayloadAction<FeedBackProps[]>)=>{
            return  action.payload;
        }
    }
})
export const {addFeedback}=feedbackSlice.actions;
export default feedbackSlice.reducer;