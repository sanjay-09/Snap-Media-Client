import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import Post from '../Posts/Post'
import userImg from "../../Assests/user.png"
import { Link, useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../CreatePost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../Redux/postSlice'
import { followAndUnfollow, getFeedData } from '../../Redux/feedSlice';

function Profile() {
  console.log("Profile");
  const navigate=useNavigate();
  const params=useParams(); 
  const dispatch=useDispatch();
  const userProfile=useSelector(state=>state.postSlice.userProfile);
  const myProfile=useSelector(state=>state.appConfigReducer.myProfile)
  const [isMyProfile,setIsMyProfile]=useState();
  const feedData=useSelector((state=>state.feedSlice.feedData));
  const [isFollowing,setIsFollowing]=useState();
useEffect(()=>{
  console.log("hello");
  dispatch(getUserProfile({
    userId:params.userId
  }));

    setIsMyProfile(params.userId===myProfile?._id);
    setIsFollowing(feedData?.followings?.find(item=>item._id===params.userId)) 
  

},[myProfile,params.userId,feedData])
function handleUserFollow(){
  dispatch(followAndUnfollow({
      userIdToFollow:params.userId
    }))
  
  
}
   
  return (
      <div className="Profiler">
        <div className="container">
          <div className="left-part">
          {isMyProfile && <CreatePost/>}
            
          
          {userProfile?.posts?.map(post=><Post key={post?._id} post={post}/>)}

          </div>
          <div className="right-part">
            <div className="profile-card">  
               <img className="userImage" src={userProfile?.avatar?.url} alt="" />
               <h3 className='user-name'>{userProfile?.name}</h3>
               <div className="follower-info">
                <h4>{`${userProfile?.followers?.length} Followers`}</h4>
                <h4>{`${userProfile?.followings?.length} Following`}</h4>
               </div>
              {!isMyProfile &&  <h5 onClick={handleUserFollow} className={isFollowing?'hover-link follow-link':'btn-primary'}>{isFollowing?'Unfollow':'follow'}</h5>}
              {isMyProfile && <button className='update-profile btn-secondary'><Link to="/updateProfile">Update Profile</Link></button>} 
               
            </div>
          </div>
        </div>
      </div>
  )
  }

export default Profile
