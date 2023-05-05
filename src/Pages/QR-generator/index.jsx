import React from 'react'
import Generator from './Components/Generator'
import { Container } from 'react-bootstrap'
import { SlideLeft } from '../../Page-transition/PageTransitions'

const QRCodeGenerator = () => {
  return (
    <SlideLeft>
      <Container className='bg-custom-gradient-color add-box-shadow p-3 rounded-4' style={{ borderTop: "solid 2px white", borderBottom: "solid 1px lightgrey", borderLeft: "solid 2px whitesmoke", borderRight: "solid 2px whitesmoke" }}>
        <Generator />
      </Container>
    </SlideLeft>
  )
}

export default QRCodeGenerator

