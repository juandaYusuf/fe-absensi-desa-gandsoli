import React, { useEffect, useState } from 'react'
import RegisterComponent from './Components/RegisterComponent'
import { SlideLeft } from '../../Page-transition/PageTransitions'

const RegistarsiAdmin = (props) => {

  const [title, setTitle] = useState("")

  useEffect(() => {
    if(props.regOptions === "kepdes"){
      setTitle("Registarsi Kepdes")
    }
    if(props.regOptions === "admin"){
      setTitle("Registarsi admin")
    }
    if(props.regOptions === "staf"){
      setTitle("Registarsi staf")
    }
    
  }, [title])
  

  return (
    <SlideLeft>
      <RegisterComponent regOptions={props.regOptions} title={title} />
    </SlideLeft>
  )
}

export default RegistarsiAdmin