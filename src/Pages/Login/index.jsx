import React, { useEffect } from 'react'
import { ZoomInSlide } from '../../Page-transition/PageTransitions';
import LoginCard from './Components/LoginCard';



const Login = () => {

  useEffect(() => {
    localStorage.clear()
  }, [])


  return (
    <>
      <ZoomInSlide>
        <LoginCard />
      </ZoomInSlide>
    </>
  )
}

export default Login