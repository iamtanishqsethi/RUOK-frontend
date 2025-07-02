import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {CheckIn} from "@/utils/types.ts";

const checkInSlice = createSlice({
    name:'checkIns',
    initialState:{
        allCheckIns:null as CheckIn[]|null,
        weeklyCheckIns:null as CheckIn[]|null,
        dayCheckIns:null as CheckIn[]|null,
    } ,
    reducers:{
        addCheckIns:(state,action:PayloadAction<CheckIn[]>)=>{
            state.allCheckIns= action.payload;
        },
        addDayCheckIns:(state,action:PayloadAction<CheckIn[]>)=>{
            state.dayCheckIns=action.payload;
        },
        addWeeklyCheckIns:(state,action:PayloadAction<CheckIn[]>)=>{
            state.weeklyCheckIns=action.payload;
        }
    }
})
export const {addCheckIns,addDayCheckIns,addWeeklyCheckIns}=checkInSlice.actions;
export default checkInSlice.reducer;