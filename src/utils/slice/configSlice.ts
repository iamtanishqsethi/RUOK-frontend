import {createSlice} from "@reduxjs/toolkit";

const configSlice = createSlice({
    name:'config',
    initialState: {
        isBlocked:false
    },
    reducers: {
        setIsBlocked: (state, action) => {
            state.isBlocked = action.payload;
        }
    }
})
export const {setIsBlocked} = configSlice.actions;
export default configSlice.reducer;