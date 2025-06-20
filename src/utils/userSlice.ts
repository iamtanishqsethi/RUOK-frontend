import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {User} from "@/utils/types.ts";

const userSlice=createSlice({
    name:'user',
    initialState:null as User|null,
    reducers:{
        addUser:(_state,action:PayloadAction)=>{
            return action.payload;
        },
        removeUser:()=>{
            return null
        }
    }
})
export const {addUser,removeUser} = userSlice.actions;
export default userSlice.reducer;