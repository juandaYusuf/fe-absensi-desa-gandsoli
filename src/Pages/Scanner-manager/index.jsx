import React from 'react'
import { Container } from 'react-bootstrap'
import { SlideLeft } from '../../Page-transition/PageTransitions'
import QRScannerMonitoring from './Components/QRScanner-monitoring'
import ThemingCangerFunc from '../../Theme'


const ScannerManager = () => {
  return (
    <SlideLeft>
      <Container className={` ${ThemingCangerFunc().gradient} add-box-shadow p-3 rounded-4`} style={ThemingCangerFunc("white").style} >
        <h1>ScannerManager</h1>
        <QRScannerMonitoring/>
      </Container>
    </SlideLeft>
  )
}

export default ScannerManager