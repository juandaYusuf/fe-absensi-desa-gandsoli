import React, { createContext, useState } from 'react'


const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [showNavbar, setShowNavbar] = useState("")
  const [turnOnCameraOnQRScannerPage, setTurnOnCameraOnQRScannerPage] = useState("")


  return (
    <UserContext.Provider value={{
      showNavbar,
      setShowNavbar,
      turnOnCameraOnQRScannerPage,
      setTurnOnCameraOnQRScannerPage
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext