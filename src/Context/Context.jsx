import React, { createContext, useState } from 'react'

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [showNavbar, setShowNavbar] = useState("")


    return (
        <UserContext.Provider value={{
            showNavbar,
            setShowNavbar
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext