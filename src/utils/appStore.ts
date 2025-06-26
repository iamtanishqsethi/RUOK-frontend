import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/utils/slice/userSlice.ts";
import emotionSlice from "@/utils/slice/emotionSlice.ts";
import checkInSlice from "./slice/checkInSlice";

const appStore=configureStore({
    reducer:{
        user:userSlice,
        emotion:emotionSlice,
        checkIns:checkInSlice
    }
})
export default appStore;