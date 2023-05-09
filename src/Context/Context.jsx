import React, { createContext, useState } from 'react'


const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [showNavbar, setShowNavbar] = useState("")
  const [turnOnCameraOnQRScannerPage, setTurnOnCameraOnQRScannerPage] = useState("")
  const [themeChanger, setThemeChanger] = useState("normal");

  return (
    <UserContext.Provider value={{
      showNavbar,
      setShowNavbar,
      turnOnCameraOnQRScannerPage,
      setTurnOnCameraOnQRScannerPage,
      themeChanger,
      setThemeChanger
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext