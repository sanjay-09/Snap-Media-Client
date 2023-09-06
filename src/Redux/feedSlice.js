import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./appConfigSlice";
import { axiosClient } from "../utils/axiosClient";
import { likeandUnlink } from "./postSlice";

export const getFeedData=createAsyncThunk("feed/",async ()=>{
    try{
        
        const response=await axiosClient.get("/user/getFeedData");
        console.log(response.result);
        return response.result;
        

    }
    catch(err){
                   return Promise.reject(err);
    }
    
})

export const followAndUnfollow=createAsyncThunk("user/followAndUnfollow",async (body,_)=>{
    try{
        
        const response=await axiosClient.post("/user/followOrUnfollowUser",body);
        return response.result.user;


    }
    catch(err){
        console.log(err);   

    }
   
})


const feedSlice=createSlice({
    name:"feedSlice",
    initialState:{
        feedData:{}

    },
    extraReducers:(builder)=>{
        builder.addCase(getFeedData.fulfilled,(state,action)=>{
            state.feedData=action.payload; 
        })
        .addCase(likeandUnlink.fulfilled,(state,action)=>{
            const post=action.payload;
            
            const index=state.feedData?.posts?.findIndex(item=>item._id==post._id);
            console.log(index);
            if(index!=undefined&&index!=-1){
              state.feedData.posts[index]=post;
            }
        })
        .addCase(followAndUnfollow.fulfilled,(state,action)=>{
            const user=action.payload;
            const index=state.feedData.followings.findIndex(item=>item._id==user._id);
            if(index!=-1){
                state.feedData.followings.splice(index,1);
    
            }
            else{
                state.feedData.followings.push(user);
                
            }
        })
    }
})

export default feedSlice.reducer;