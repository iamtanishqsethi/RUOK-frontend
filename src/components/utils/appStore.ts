import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/components/utils/userSlice.ts";

const appStore=configureStore({
    reducer:{
        user:userSlice
    }
})
export default appStore;