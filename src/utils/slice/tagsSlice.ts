import { createSlice } from "@reduxjs/toolkit";
import type {Tag} from "@/utils/types.ts";

const tagsSlice=createSlice({
    name: "tags",
    initialState: {
        activityTags:null as Tag[]|null,
        placeTags:null as Tag[]|null,
        peopleTags:null as Tag[]|null,
    },
    reducers:{
        addActivityTag:(state, action)=>{
            state.activityTags = action.payload
        },
        addPlaceTag:(state, action)=>{
            state.placeTags = action.payload
        },
        addPeopleTag:(state, action)=>{
            state.peopleTags = action.payload
        }
    }
})

export const {addActivityTag, addPlaceTag, addPeopleTag} = tagsSlice.actions;
export default tagsSlice.reducer;