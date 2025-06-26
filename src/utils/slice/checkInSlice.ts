import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {CheckIn} from "@/utils/types.ts";

const checkInSlice = createSlice({
    name:'checkIns',
    initialState:null as  CheckIn[]|null,
    reducers:{
        addCheckIns:(_state,action:PayloadAction)=>{
            return action.payload;
        }
    }
})
export const {addCheckIns}=checkInSlice.actions;
export default checkInSlice.reducer;