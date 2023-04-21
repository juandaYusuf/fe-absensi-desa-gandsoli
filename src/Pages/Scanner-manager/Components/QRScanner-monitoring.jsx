import React, { useState } from 'react'

// import UserContext from '../../../Context/Context'
import { Button, Container } from 'react-bootstrap'
import { QrReader } from "react-qr-reader";


const QRScannerMonitoring = () => {


    const [data, setData] = useState("")
    const [startScan, setStartScan] = useState(false);


    // const scanner = (act) => {
    //     const video = document.getElementById('qr-video')
    //     let qrScanner = new QrScanner(video, result => setData(result))
    //     if(act === "on"){
    //         qrScanner.start()
    //         setIsScanning(true)
    //     }
    //     if(act === "off"){
    //         qrScanner.stop()
    //         qrScanner.destroy()
    //         qrScanner = null
    //         setIsScanning(false)
    //     }
    // }

    // useEffect(() => {
    //     scanner("on")
    // }, [])

    // useEffect(() => {
    //     if (turnOnCameraOnQRScannerPage !== "turnOnCamera") {
    //         startScanner("destroy")
    //     }
    //     return () => {
    //         console.clear()
    //     }
    // }, [turnOnCameraOnQRScannerPage])

    return (
        <>
            <div className=' d-flex justify-content-center align-items-center w-100 flex-column'>
                <div className=' scanner-container'>
                    <div className=' qr-container add-item-shadow border border-2 border-secondary'>
                        <div className='w-100 d-flex justify-content-center'>
                            <Container className='' style={{ width: '400px' }}>
                                <Button className='w-100'  onClick={() => { setStartScan(!startScan) }}>Tututp kamera</Button>
                                {
                                    // (isScanning === true)&&
                                    // <video id="qr-video" />
                                    startScan && (
                                        <>
                                            <QrReader
                                                delay={1000}
                                                onResult={(result, error) => {
                                                    if (!!result) {
                                                        setData(result?.text);
                                                    }
                                                    if (!!error) {
                                                        console.log(error);
                                                    }
                                                }}
                                                style={{ width: '100%', scale: "1.5" }}
                                            />
                                        </>
                                    )
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