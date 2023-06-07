import React, { createContext, useState } from 'react'


const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [showNavbar, setShowNavbar] = useState("")
  const [turnOnCameraOnQRScannerPage, setTurnOnCameraOnQRScannerPage] = useState("")
  const [themeChanger, setThemeChanger] = useState("normal")
  const [contextIsImageUploaded, setContextIsImageUploaded] = useState(false)
  const [contextPresenceCounterIsLoading, setContextPresenceCounterIsLoading] = useState(false)
  const [contextUserFullNameOfTable, setContextUserFullNameOfTable] = useState("")
  const [contextPresenceCounter, setContextPresenceCounter] = useState({})


  return (
    <UserContext.Provider value={{
      showNavbar,
      setShowNavbar,

      turnOnCameraOnQRScannerPage,
      setTurnOnCameraOnQRScannerPage,

      themeChanger,
      setThemeChanger,

      contextIsImageUploaded,
      setContextIsImageUploaded,

      contextPresenceCounterIsLoading,
      setContextPresenceCounterIsLoading,

      contextUserFullNameOfTable,
      setContextUserFullNameOfTable,

      contextPresenceCounter,
      setContextPresenceCounter,

    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext