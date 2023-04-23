import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import { Dashboard, Login, LoginKepdes, NavigationsBar, QRCodeGenerator, ScannerManager, RegistarsiAdmin } from '../Pages';
import ProtectedRoutes from './Protected-routers';

const RouterPageTransitions = () => {

    const location = useLocation()
    const [currentlocation, setCurrentlocation] = useState("/")

    useEffect(() => {
        setCurrentlocation(location.pathname)
        return () => {
            setCurrentlocation(location.pathname)
        }
    }, [location.pathname])

    // ProtectedRoutes
    return (
        <>
            {
                (currentlocation === "/" || currentlocation === "/LoginKepDes/")
                    ?
                    <AnimatePresence mode='wait'>
                        <Routes key={location.pathname} location={location}>
                            {/* //! Unprotected Routes */}
                            <Route path="/" element={<Login />} />
                            <Route path="/LoginKepDes" element={<LoginKepdes />} />
                            <Route path="/QRGenerator" element={<QRCodeGenerator />} />
                            {/* //! Protected Routes */}
                            <Route element={<ProtectedRoutes />}>
                                <Route path="/Dashboard" element={<Dashboard />} />
                                <Route path="/ScannerManager" element={<ScannerManager />} />
                            </Route>
                        </Routes>
                    </AnimatePresence>
                    :
                    <NavigationsBar>
                        <AnimatePresence mode='wait'>
                            <Routes key={location.pathname} location={location}>
                                {/* //! Unprotected Routes */}
                                <Route path="/" element={<Login />} />
                                <Route path="/LoginKepDes" element={<LoginKepdes />} />
                                <Route path="/QRGenerator" element={<QRCodeGenerator />} />
                                {/* //! Protected Routes */}
                                <Route element={<ProtectedRoutes />}>
                                    <Route path="/RegistarsiAdmin" element={<RegistarsiAdmin />} />
                                    <Route path="/Dashboard" element={<Dashboard />} />
                                    <Route path="/ScannerManager" element={<ScannerManager />} />
                                </Route>
                            </Routes>
                        </AnimatePresence>
                    </NavigationsBar>
            }
        </>
    )
}

export default RouterPageTransitions


// <Router>
// <Routes>

//   {/* //! Unprotected Routes 
// */}
//   <Route path='/' element={<GetStart />} />
//   <Route path='SignInUp' element={<SignInUp />} />

//   {/* //! Protected Routes
// */}
//   <Route element={<ProtectedRoutes />}>
//     <Route path='Home' element={<Home />} />
//     <Route path='Ticket' element={<Ticket />} />
//     <Route path='Profile' element={<Profile />} />
//     <Route path='Chat' element={<ChatPage />} />
//     <Route path='About' element={<About />} />
//   </Route>
// </Routes>
// </Router>