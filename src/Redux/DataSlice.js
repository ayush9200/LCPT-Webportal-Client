import { createSlice } from "@reduxjs/toolkit"




export const dataSlice = createSlice({
    name: "data",
    initialState: {
        data: null
    }, reducers: {
        setData: (state, action) => {
            console.log(action.payload)
            state.data = action.payload;
        }
    }

})

export const { setData } = dataSlice.actions;
export const selectData = (state) => state.data.data;

export default dataSlice.reducer;

