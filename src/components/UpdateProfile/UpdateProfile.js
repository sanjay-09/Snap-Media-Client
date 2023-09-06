import React, { useEffect, useState } from 'react'

import "./UpdateProfile.scss"

import { useDispatch, useSelector } from 'react-redux'
import { setLoading, updateMyProfile } from '../../Redux/appConfigSlice';

function UpdateProfile() {
  const dispatch=useDispatch();
  const myProfile=useSelector(state=>state.appConfigReducer.myProfile);
  const [name,setName]=useState('');
  const [bio,setBio]=useState('');
  const[image,setImage]=useState('');
  const [userImage,setUserImage]=useState('');
  useEffect(
    ()=>{
      setName(myProfile?.name|| '');
      setBio(myProfile?.bio || '');
      setImage(myProfile?.avatar.url||'');
    
    },[myProfile]
  ) 
  function handleImageChange(e){
    const file=e.target.files[0];
    const fileReader=new FileReader();
    fileReader.readAsDataURL(file);  //base64 ke andr uncode karna hai 
    fileReader.onload=()=>{
      if(fileReader.readyState===fileReader.DONE){
        setImage(fileReader.result)
      }
    }
     
  }
  function handleSubmit(e){  
    e.preventDefault();
    dispatch(updateMyProfile({
      name,
      bio,
      userImg:image
      


    }))
    
    }


  
   

  return (
    <div className="updateProfile">
        <div className="container">
            <div className="left-part">
                <div className="input-user-img">
                <label htmlFor="userImg" className='labelImg'>
                  <img src={image} alt="" />
                  </label>
                  <input className="inputImg" type="file" accept='image/*' id="userImg" onChange={handleImageChange} />
              
                </div> 

             

            </div>

            <div className="right-part">
                <form action="">
                    <input value={name} type="text"   onChange={(e)=>{setName(e.target.value)}} />
                    <input value={bio} type="text"  onChange={(e)=>{setBio(e.target.value)}} placeholder='Update Your Bio'/>

                    <input className='btn-primary' type="submit" value="Submit" onClick={handleSubmit}/>
                </form>
                <button className='delete-account btn-primary'>Delete Account</button>
            </div>

        </div>
    </div>
  )
  }

export default UpdateProfile
