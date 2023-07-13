import { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/Context'

const ThemingCangerFunc = (bgColor) => {

  const {themeChanger} = useContext(UserContext)
  const [borderStyle, setBorderStyle] = useState({border: "0px"})
  const [customBGGradient, setCustomBGGradient] = useState("")


  useEffect(() => {
    if (themeChanger === "gradasi") {
      setBorderStyle ({
        borderTop: "solid 2px white",
        borderBottom: "solid 1px lightgrey",
        borderLeft: "solid 2px whitesmoke",
        borderRight: "solid 2px whitesmoke",
        
      })
      setCustomBGGradient("bg-custom-gradient-color")
    }else {
      setBorderStyle({
        border: "0px",
        backgroundColor: bgColor})
      setCustomBGGradient("")
    }
  }, [themeChanger])

  return {
    style: borderStyle,
    gradient: customBGGradient
  }
}

export default ThemingCangerFunc
