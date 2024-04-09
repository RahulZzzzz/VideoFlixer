import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = JSON.parse(localStorage.getItem('token'))
const status = localStorage.getItem('status')

const initialState = {
    status: status?true:false ,
    userData: token?token:null
} 

const url = import.meta.env.VITE_URL

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login : (state,action)=>{
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout : async(state)=>{
            localStorage.removeItem('token');
            localStorage.removeItem('status');
            
            state.status = false;
            state.userData = null;
            axios.post(`${url}/users/logout`,{},{withCredentials:true})
                .then((res)=>{
                    console.log(res);
                    window.location.reload()
                })
                .catch(()=>{console.log('Error while logout');window.location.reload();})

        }
    }
})


export const {login,logout} = authSlice.actions;

export default authSlice.reducer;