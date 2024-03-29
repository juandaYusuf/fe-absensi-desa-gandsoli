import React, { createContext, useState } from 'react'


const UserContext = createContext()

export const UserContextProvider = (props) => {
  // const [showNavbar, setShowNavbar] = useState("")
  const [turnOnCameraOnQRScannerPage, setTurnOnCameraOnQRScannerPage] = useState("")
  const [themeChanger, setThemeChanger] = useState("normal")
  const [contextIsImageUploaded, setContextIsImageUploaded] = useState(false)
  const [contextPresenceCounterIsLoading, setContextPresenceCounterIsLoading] = useState(false)
  const [contextUserFullNameOfTable, setContextUserFullNameOfTable] = useState("")
  const [contextPresenceCounter, setContextPresenceCounter] = useState({})
  const [contextRefreshDraftList, setContextRefreshDraftList] = useState(false)
  const [contextShowToast, setContextShowToast] = useState(false)
  const [contextToastTXT, setcontextToastTXT] = useState({ title: "", body: "", themes: "", times: "", })
  const [contextShowPDF, setcontextShowPDF] = useState(false)
  const [contextPDFDatas, setcontextPDFDatas] = useState({ tahun: "", nama: "", role: "", alamat: "", email: "", no_telepon: "" })


  return (
    <UserContext.Provider value={{
      // showNavbar,
      // setShowNavbar,

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

      contextRefreshDraftList,
      setContextRefreshDraftList,

      contextShowToast,
      setContextShowToast,

      contextToastTXT,
      setcontextToastTXT,

      contextShowPDF,
      setcontextShowPDF,

      contextPDFDatas,
      setcontextPDFDatas

    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext