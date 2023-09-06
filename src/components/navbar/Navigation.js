import React,{useRef, useState} from 'react'
import "./Navigation.scss"
import Avatar from '../Avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import {AiOutlineLogout} from "react-icons/ai"
import LoadingBar from 'react-top-loading-bar'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../Redux/appConfigSlice'
import { axiosClient } from '../../utils/axiosClient'
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/LocalStorageManager'



function Navigation() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const myProfile=useSelector(state=>state.appConfigReducer.myProfile)


  async function LogOutClick(){
    try{
      dispatch(setLoading(true));
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
      dispatch(setLoading(false));


    }
    catch(err){

    }
   
      
      

    
   
   }

  

  return (
  
      <div className="Navbar">
        
        <div className="container">
          <h2 className="banner hover-link" onClick={()=>{navigate("/")}}>Snapp Media</h2>
          <div className="right-side">
            <div className="profile hover-link" onClick={()=>{navigate(`/profile/${myProfile?._id }`)}}>
              <Avatar src={myProfile?.avatar.url}/>
            </div>
            <div className="logout hover-link" onClick={LogOutClick}>
              <AiOutlineLogout/>
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default Navigation
