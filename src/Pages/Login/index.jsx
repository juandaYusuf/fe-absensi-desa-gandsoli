import React from 'react'
import { ZoomInSlide } from '../../Page-transition/PageTransitions';
import LoginCard from './Components/LoginCard';



const Login = () => {
    return (
        <>
            <ZoomInSlide>
                <LoginCard />
            </ZoomInSlide>
        </>
    )
}

export default Login