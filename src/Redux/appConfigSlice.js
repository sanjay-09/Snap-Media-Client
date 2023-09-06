import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../utils/axiosClient";
import axios from "axios";
export const getMyInfo=createAsyncThunk("/user/getMyInfo",async ()=>{
    try{
        
    
        const response=await axiosClient.get("/user/getMyInfo");
        return response.result;

    }
    catch(err){
        console.log(err.message);
 
    }
  
})
export const updateMyProfile=createAsyncThunk("user/updateMyProfile",async (body,_)=>{
    try{
        
    
        const response=await axiosClient.put("/user/",body);
        return response.result;

    }
    catch(err){
        console.log(err.message);
 
    }
   


})
const appConfigSlice=createSlice({
    name:'appConfigSlice',
    initialState:{
        isLoading:false,
        myProfile:null,
        toastData:{}
    },
    reducers:{
        setLoading:(state,action)=>{
            state.isLoading=action.payload;
        },
        showToast:(state,action)=>{
            state.toastData=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getMyInfo.fulfilled,(state,action)=>{
            state.myProfile=action.payload.user;
             
        })
        .addCase(updateMyProfile.fulfilled,(state,action)=>{
            state.myProfile=action.payload.user;
        })
    }
})
export default appConfigSlice.reducer;
export const {setLoading,showToast}=appConfigSlice.actions;