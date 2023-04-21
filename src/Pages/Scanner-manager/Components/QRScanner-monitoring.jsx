import React, { useEffect, useState, useContext } from 'react'
import QrScanner from 'qr-scanner'
import UserContext from '../../../Context/Context'

const QRScannerMonitoring = () => {


    const [data, setData] = useState("")
    const { turnOnCameraOnQRScannerPage } = useContext(UserContext)


    const startScanner = (act) => {
        const video = document.getElementById('qr-video')
        const qrScanner = new QrScanner(video, result => setData(result))
        if (act === "on") {
            qrScanner.start()
        }
        if (act === "destroy") {
            qrScanner.stop()
            qrScanner.destroy()
        }
    }

    useEffect(() => {
        startScanner("on")
    }, [])

    useEffect(() => {
        if (turnOnCameraOnQRScannerPage !== "turnOnCamera") {
            startScanner("destroy")
        }
        return () => {
            console.clear()
        }
    }, [turnOnCameraOnQRScannerPage])

    return (
        <>
            <div className='d-flex justify-content-center align-items-center w-100 flex-column'>
                <div className='scanner-container'>
                    <div className='qr-container add-item-shadow border border-2 border-secondary'>
                        <div className='border-video-scanner'>
                            <video id="qr-video" />
                        </div>
                    </div>
                </div>
                <h1 className='text-dark'> {data}</h1>
            </div>
        </>
    )
}

export default QRScannerMonitoring