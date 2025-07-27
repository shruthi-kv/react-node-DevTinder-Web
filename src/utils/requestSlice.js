
import {createSlice} from '@reduxjs/toolkit'

const requestSlice = createSlice({
    name:"request",
    initialState : null,
    reducers:{
        addrequest : (state, action) => {
            return action.payload
        }
    }
})

export const {addrequest} = requestSlice.actions;
export default requestSlice.reducer;