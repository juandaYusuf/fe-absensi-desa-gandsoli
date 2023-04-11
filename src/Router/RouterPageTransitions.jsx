import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import { Dashboard, Login, LoginKepdes, NavigationsBar, QRCodeGenerator, ScannerManager } from '../Pages';

const RouterPageTransitions = () => {

    const location = useLocation()
    const [currentlocation, setCurrentlocation] = useState("/")

    useEffect(() => {
        setCurrentlocation(location.pathname)

        return () => {
            setCurrentlocation(location.pathname)
        }
    }, [location.pathname])


    return (
        <>
            {
                (currentlocation === "/" || currentlocation === "/LoginKepDes/")
                    ?
                    <AnimatePresence mode='wait'>
                        <Routes key={location.pathname} location={location}>
                            <Route path="/" element={<Login />} />
                            <Route path="/LoginKepDes" element={<LoginKepdes />} />
                        </Routes>
                    </AnimatePresence>
                    :
                    <NavigationsBar>
                        <AnimatePresence mode='wait'>
                            <Routes key={location.pathname} location={location}>
                                <Route path="/" element={<Login />} />
                                <Route path="/LoginKepDes" element={<LoginKepdes />} />
                                <Route path="/Dashboard" element={<Dashboard />} />
                                <Route path="/ScannerManager" element={<ScannerManager />} />
                                <Route path="/QRGenerator" element={<QRCodeGenerator />} />
                            </Routes>
                        </AnimatePresence>
                    </NavigationsBar>
            }
        </>
    )
}

export default RouterPageTransitions