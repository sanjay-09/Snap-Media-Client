import React, { useEffect } from 'react'
import { axiosClient } from '../../utils/axiosClient'




import { Outlet } from 'react-router-dom'
import Navigation from '../../components/navbar/Navigation'
import { useDispatch } from 'react-redux'
import {getMyInfo} from "../../Redux/appConfigSlice"

function Home() {
    
  const dispatch=useDispatch();
  useEffect(()=>{
    console.log(process.env.REACT_APP_SERVER_BASE_URL);
    dispatch(getMyInfo());

  },[dispatch])
  
  return (
  <>
  <Navigation/>
  <Outlet/>
  
  </>
  )
}

export default Home
