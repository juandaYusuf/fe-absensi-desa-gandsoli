import React, { useEffect } from 'react'
import { TopToBottom } from '../../../Page-transition/ComponentTransitions'
import QrScanner from 'qr-scanner'

const QrCodeScanner = (props) => {

    const startScanner = (act) => {
        const video = document.getElementById('qr-video')
        let qrScanner = new QrScanner(video, result => props.kepdes_qr_result(result))
        qrScanner.start()
        if (act === "on") {
            qrScanner.start()
        }
        if (act === "off") {
            qrScanner.stop()
        }
        if (act === "destroy") {
            qrScanner.stop()
            qrScanner.destroy()
            qrScanner = null
        }
    }

    useEffect(() => {
        startScanner()

        // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
        if (!!props.kepdes_qr_result) {
            startScanner("destroy")
        }
        return () => {
            console.clear()
        }
        // eslint-disable-next-line
    }, [props.kepdes_qr_result])

    return (
        <>
            <TopToBottom>
                <h5> <span className="bi bi-info-circle" /> Info...!</h5>
                <div> Untuk Login sebagai kepala desa anda harus memiliki QRCode kepala desa. <br /><br />
                    <i className='text-secondary fw-light'> Silahkan scan qrcode kepala desa di bawah.</i>
                </div>
                <hr className='text-danger' />
                <h5 className='bi bi-qr-code-scan'> Scan QR Code </h5>
                <div className='qr-scanner-container'>
                    <div className='border-video-scanner'>
                        <video id="qr-video" />
                    </div>
                </div>
            </TopToBottom>
        </>
    )
}

export default QrCodeScanner