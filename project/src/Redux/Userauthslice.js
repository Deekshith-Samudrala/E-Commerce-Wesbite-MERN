import { createSlice } from '@reduxjs/toolkit';

const Userauthslice = createSlice({
    name : "userauth",
    initialState : "",
    reducers : {
        login(state,action){
            return action.payload;
        },
        logout(state,action){
            return "";
        }
    }
})

export default Userauthslice.reducer;
export let {login,logout} = Userauthslice.actions;