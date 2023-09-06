import React from 'react'
import userImg from "../../Assests/user.png"
import "./Avatar.scss"
import { useSelector } from 'react-redux'

function Avatar({src}) {
  

  return (
      <div className="Avatar">
        <img src={src?src:userImg} alt="User Avatar" />
      </div>
  )
}

export default Avatar
