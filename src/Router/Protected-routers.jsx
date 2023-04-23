import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutesAdmin = () => {
    const obj = JSON.parse(localStorage.getItem('obj'))
    return (
        (!!obj)
            ?
            <Outlet />
            :
            <Navigate to="/" />
    )
}
export default ProtectedRoutesAdmin