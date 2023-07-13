import React from 'react'
import Generator from './Components/Generator'
import { Container } from 'react-bootstrap'
import { SlideLeft } from '../../Page-transition/PageTransitions'
import ThemingCangerFunc from '../../Theme'


const QRCodeGenerator = () => {
  return (
    <SlideLeft>
      <Container className={` ${ThemingCangerFunc().gradient} add-box-shadow p-3 rounded-4`} style={ThemingCangerFunc("white").style} >
        <Generator />
      </Container>
    </SlideLeft>
  )
}

export default QRCodeGenerator

