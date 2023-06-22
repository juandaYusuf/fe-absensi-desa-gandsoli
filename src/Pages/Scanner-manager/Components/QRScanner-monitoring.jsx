import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { QrReader } from "react-qr-reader";


const QRScannerMonitoring = () => {


  const [data, setData] = useState("")
  const [startScan, setStartScan] = useState(false);


  return (
    <>
      <div className=' d-flex justify-content-center align-items-center w-100 flex-column'>
        <div className=' scanner-container'>
          <div className=' qr-container add-item-shadow border border-2 border-secondary'>
            <div className='w-100 d-flex justify-content-center'>
              <Container style={{scale: "1.5"}}>
                <Button className='w-100' onClick={() => { setStartScan(!startScan) }}>Tututp kamera</Button>
                {
                  startScan && (
                    <QrReader
                    constraints={{facingMode: 'environment'}}
                      delay={1000}
                      onResult={(result, error) => {
                        if (!!result) {
                          setData(result?.text);
                        }
                        if (!!error) {
                          console.log(error);
                        }
                      }}
                      style={{ width: '100%' }}
                    />)
                }
              </Container>
            </div>
          </div>
        </div>
        <h1 className='text-dark'> {data}</h1>
      </div>
    </>
  )
}

export default QRScannerMonitoring