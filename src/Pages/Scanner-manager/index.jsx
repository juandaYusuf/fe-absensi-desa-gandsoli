import React from 'react'
import { Container } from 'react-bootstrap'
import { SlideLeft } from '../../Page-transition/PageTransitions'
import QRScannerMonitoring from './Components/QRScanner-monitoring'

const ScannerManager = () => {
  return (
    <SlideLeft>
      <Container className='add-box-shadow p-3 bg-light rounded-4'>
        <h1>ScannerManager</h1>
        <QRScannerMonitoring/>
      </Container>
    </SlideLeft>
  )
}

export default ScannerManager