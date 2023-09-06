import React, { useState } from 'react'
import Avatar from '../Avatar/Avatar'
import {BsCardImage} from "react-icons/bs"
import backgroundImg from "../../Assests/bg.jpg"
import "./CreatePost.scss"
import {useDispatch, useSelector} from "react-redux"
import { axiosClient } from '../../utils/axiosClient'
import { getMyInfo, setLoading } from '../../Redux/appConfigSlice'
import { getUserProfile } from '../../Redux/postSlice'

function CreatePost() {
  const dispatch=useDispatch();
  const [postImg,setPostImg]=useState('');
  const [caption,setCaption]=useState('');
  const myProfile=useSelector(state=>state.appConfigReducer.myProfile);
   



  function handleImageChange(e){
    const file=e.target.files[0];
    const fileReader=new FileReader();
    fileReader.readAsDataURL(file);  //base64 ke andr uncode karna hai 
    fileReader.onload=()=>{
      if(fileReader.readyState===fileReader.DONE){
        setPostImg(fileReader.result)
      }
    }

  }
  const handlePostSubmit=async ()=>{
    try{
      
      const result= await axiosClient.post("/posts/createPost",{
        caption,
        postImg
      })
      dispatch(getUserProfile({  
        userId:myProfile._id
       } ))
      

    } 
    catch(err){
      console.log(err);
    }
    finally{
      
      setCaption('');
      setPostImg('');

    }

  }
  return (
    <div className="CreatePost">
        <div className="left-part">
            <Avatar/>
        </div>
        <div className="right-part">
            <input type="text" className='captionInput' placeholder='whats on your mind' onChange={(e)=>{setCaption(e.target.value)}}/>
            {postImg &&
            
            <div className="img-container">
                <img className='post-img' src={postImg} alt="h" />
            </div>
}
            <div className="bottom-part">
              <div className="input-post-img"> 
              <label htmlFor="inputImg" className='labelImg'>
              <BsCardImage/>
                  </label>
                  <input className="inputImg" type="file" accept='image/*' id="inputImg" onChange={handleImageChange} />
                  
                  </div>
                  <button className='post-btn btn-primary' onClick={handlePostSubmit}>Post</button>

                 
              </div> 
            </div>
        </div>
  
  )
}

export default CreatePost
