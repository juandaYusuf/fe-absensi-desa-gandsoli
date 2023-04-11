import React from 'react'
import { TopToBottom } from '../../../Page-transition/ComponentTransitions'


const QrCodeScanner = () => {
    return (
        <>
            <TopToBottom>
                <h5> <i className="bi bi-info-circle"></i> Info...!</h5>
                <div> Untuk Login sebagai kepala desa anda harus memiliki QRCode kepala desa. <br /><br />
                    <i className='text-secondary fw-light'> Silahkan scan qrcode kepala desa di bawah.</i>
                </div>
                <hr className='text-danger' />
                <h5 className='bi bi-qr-code-scan'> Scan QR Code </h5>
                <div className='qr-scanner-container'>
                    {/* 
                        //!AKAN DI ISI DENGAN QRCODE SCANNER
                    */}
                </div>
            </TopToBottom>
        </>
    )
}

export default QrCodeScanner