import React, { useDebugValue, useEffect } from 'react'
import "./feed.scss"
import Post from '../Posts/Post'
import Follower from '../Follower/Follower'
import CreatePost from '../CreatePost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../Redux/feedSlice'

function Feed() {
  console.log("feed Comp");
  const dispatch=useDispatch();
  const feedData=useSelector((state=>state.feedSlice.feedData ))
  useEffect(
  
    ()=>{
    
      dispatch(getFeedData());
      

       
    },[dispatch]
  )

  return (
    <div className="Feed">
      <div className="container"> 
        <div className="left-part">
          <CreatePost/>
          {feedData?.posts?.map(post=><Post key={post?._id} post={post}/>)}

        </div>
        <div className="right-part">
          <div className="following">
            <h3 className='Title'>You are following</h3>
          
            {feedData?.followings?.map(item=><Follower key={item?._id} user={item} />)}

          </div>
          <div className="suggestions">
          <h3 className='Title'>Suggestions</h3>
          {feedData?.suggestions?.map(item=><Follower key={item._id} user ={item}/>)}

        

          </div>
        </div>

      </div>
    </div>
  )
}

export default Feed
