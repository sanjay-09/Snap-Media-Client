import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../utils/LocalStorageManager'
import { Navigate, Outlet} from 'react-router-dom';

function RequireUser() {
    const user=getItem(KEY_ACCESS_TOKEN);

  return (
    <div>
     {user?<Outlet/>:<Navigate to="/login"/>}
    </div>
  )
}

export default RequireUser
