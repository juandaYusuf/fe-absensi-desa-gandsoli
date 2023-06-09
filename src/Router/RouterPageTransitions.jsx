import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import { Dashboard, Login, NavigationsBar, QRCodeGenerator, ScannerManager, RegistarsiAdmin, Profile, UserSettings } from '../Pages';
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

  return (
    <>
      {
        currentlocation === "/" || currentlocation === "/LoginKepDes/"
          ?
          (<AnimatePresence mode='wait'>
            <Routes key={location.pathname} location={location}>
              {/* //! Unprotected Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/scanner-manager" element={<ScannerManager />} />
              <Route path="/qr-generator" element={<QRCodeGenerator />} />
              {/* //! Protected Routes */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/register" element={<RegistarsiAdmin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/setting" element={<UserSettings />} />
              </Route>
            </Routes>
          </AnimatePresence>)
          :
          (<NavigationsBar>
            <AnimatePresence mode='wait'>
              <Routes key={location.pathname} location={location}>
                {/* //! Unprotected Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/scanner-manager" element={<ScannerManager />} />
                <Route path="/qr-generator" element={<QRCodeGenerator />} />
                {/* //! Protected Routes */}
                <Route element={<ProtectedRoutes />}>
                  <Route path="/register" element={<RegistarsiAdmin/>} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/setting" element={<UserSettings />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </NavigationsBar>)
      }
    </>
  )
}

export default RouterPageTransitions