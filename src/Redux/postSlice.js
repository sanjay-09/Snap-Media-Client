  import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
  import { axiosClient } from "../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import axios from "axios";





export const getUserProfile=createAsyncThunk("user/getUserProfile",async (body)=>{
    try{
      
      const response=await axiosClient.post("/user/getUserProfile",body);
      console.log(response.result);
      return response.result;

    }
    catch(err){
      return Promise.reject(err); 


    }
    
  })


export const  likeandUnlink=createAsyncThunk("post/likeaAndUnline",async (body)=>{
  try{
    
    const response=await axiosClient.post("/posts/like",body);
    console.log(response.result);
    return response.result.post;

  }
  catch(err){
    return Promise.reject(err);

  }
 
})
const postSlice=createSlice({
    name:"postSlice",
    initialState:{
      userProfile:{}
    },
    extraReducers:(builder)=>{
      builder.addCase(getUserProfile.fulfilled,(state,action)=>{
        state.userProfile=action.payload;
      })
     
    
    .addCase(likeandUnlink.fulfilled,(state,action)=>{

           const post=action.payload; 
           const index=state?.userProfile?.posts?.findIndex(item=>item._id==post._id);
           if(index!=undefined&&index!=-1){
      
             state.userProfile.posts[index]=post 
           }


    })
  }

  });
export default postSlice.reducer;
