import React, { useEffect } from 'react'
import { ZoomInSlide } from '../../Page-transition/PageTransitions';
import LoginCard from './Components/LoginCard';



const Login = () => {

  useEffect(() => {
    localStorage.clear()
  }, [])


  return (
    <>
      <div className='login-container'>
        <ZoomInSlide>
          <LoginCard />
        </ZoomInSlide>
      </div>
    </>
  )
}

export default Login