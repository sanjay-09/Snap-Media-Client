import React from 'react'
import Avatar from '../Avatar/Avatar'
import "./Post.scss"
import backgroundImg from "../../Assests/bg.jpg"
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { likeandUnlink } from '../../Redux/postSlice'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../Redux/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'

function Post({post}) {

  const dispatch=useDispatch();
  const navigate=useNavigate(); 

 async function handlePostLiked(){
  dispatch(showToast({
    type:TOAST_SUCCESS,
    message:'like or unlike'

  })
  )
  dispatch(likeandUnlink({
    postId:post._id
  }));


  }


  return (
    <div>
      <div className="Post">
        <div className="heading" onClick={()=>navigate(`/profile/${post.owner._id}`)}>
            <Avatar src={post?.owner?.avatar?.url}/>
            <h4>{post?.owner?.name}</h4>
        </div>
        <div className="content">
            <img src={post?.image?.url} alt="Not loaded" />
        </div>
        <div className="footer">
        <div className="likes" onClick={handlePostLiked}>
          {post?.isLiked ? <AiFillHeart style={{color:'red'}}className='icon' /> :  <AiOutlineHeart className='icon'/>}
             
             <h4>{ `${post?.likesCount} Likes`}</h4>
         </div>
         <p className='caption'>{post?.caption}</p>
         <h6 className='.time-ago'>{post?.timeAgo} </h6>
        </div>

         

      </div>
    </div>
  )
}

export default Post
