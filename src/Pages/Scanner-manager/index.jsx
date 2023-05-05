import React from 'react'
import { Container } from 'react-bootstrap'
import { SlideLeft } from '../../Page-transition/PageTransitions'
import QRScannerMonitoring from './Components/QRScanner-monitoring'

const ScannerManager = () => {
  return (
    <SlideLeft>
      <Container className='bg-custom-gradient-color add-box-shadow p-3 rounded-4' style={{borderTop: "solid 2px white", borderBottom: "solid 1px lightgrey", borderLeft: "solid 2px whitesmoke", borderRight: "solid 2px whitesmoke"}}>
        <h1>ScannerManager</h1>
        <QRScannerMonitoring/>
      </Container>
    </SlideLeft>
  )
}

export default ScannerManager