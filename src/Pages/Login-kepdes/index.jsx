import React, { useEffect } from 'react'
import { ZoomInSlide } from '../../Page-transition/PageTransitions'
import LoginKepDesCard from './Components/LoginKepDesCard'

const LoginKepdes = () => {

    useEffect(() => {
        localStorage.clear()
    }, [])
    return (
        <ZoomInSlide >
            <LoginKepDesCard />
        </ZoomInSlide>
    )
}

export default LoginKepdes