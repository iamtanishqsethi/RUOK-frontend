import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/utils/userSlice.ts";
import emotionSlice from "@/utils/emotionSlice.ts";

const appStore=configureStore({
    reducer:{
        user:userSlice,
        emotion:emotionSlice,
    }
})
export default appStore;