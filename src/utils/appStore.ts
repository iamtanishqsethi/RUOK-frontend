import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/utils/slice/userSlice.ts";
import emotionSlice from "@/utils/slice/emotionSlice.ts";
import checkInSlice from "./slice/checkInSlice";
import tagsSlice from "@/utils/slice/tagsSlice.ts";
import configSlice from "@/utils/slice/configSlice.ts";

const appStore=configureStore({
    reducer:{
        user:userSlice,
        emotion:emotionSlice,
        checkIns:checkInSlice,
        tags:tagsSlice,
        config:configSlice
    }
})
export default appStore;