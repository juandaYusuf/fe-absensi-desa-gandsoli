import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutesAdmin = () => {
  const obj = JSON.parse(localStorage.getItem('obj'))
  return !!obj
    ?
    !!obj.id
      ?
      (<Outlet />)
      :
      (<Navigate to="/" />)
    :
    (<Navigate to="/" />)

}
export default ProtectedRoutesAdmin