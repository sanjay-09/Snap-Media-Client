import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../utils/LocalStorageManager'
import { Navigate, Outlet } from 'react-router-dom';

function IfNotLoggedIn() {
    const user=getItem(KEY_ACCESS_TOKEN);
  return (
    <div>
     {user?<Navigate to="/"/>:<Outlet/>}
    </div>
  )
}

export default IfNotLoggedIn
