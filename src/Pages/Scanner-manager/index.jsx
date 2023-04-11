import React from 'react'
import { Container } from 'react-bootstrap'
import { SlideLeft } from '../../Page-transition/PageTransitions'
import QRScanner from './Components/QRScanner'

const ScannerManager = () => {
  return (
    <SlideLeft>
      <Container className='add-box-shadow p-3 bg-light rounded-4'>
        <h1>ScannerManager</h1>
        <QRScanner/>
      </Container>
    </SlideLeft>
  )
}

export default ScannerManager