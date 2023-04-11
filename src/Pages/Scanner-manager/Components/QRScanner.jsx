import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';

import { QrReader } from 'react-qr-reader';

const QRScanner = () => {

    const [displayingCamera, setdisplayingCamera] = useState(false)



    const [data, setData] = useState("")
    const waitingCameraResponse = () => {
        setTimeout(() => {
            setdisplayingCamera(true)

        }, 4000);

    }

    useEffect(() => {
        waitingCameraResponse()
    }, [])


    return (
        <>
            <div className='d-flex justify-content-center align-items-center w-100 flex-column'>
                <div className='scanner-container'>
                    {(displayingCamera === true) ?
                        <div className='qr-container add-item-shadow'>
                            <div>
                                <QrReader
                                    onResult={(result, error) => {
                                        if (!!result) {
                                            setData(result?.text);
                                        }

                                        if (!!error) {
                                            console.info(error);
                                        }
                                    }}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                        :
                        <div className='loading-qr-container add-item-shadow'>
                            <div>
                                <Spinner animation="border" variant="info"/>
                                <span className='text-light fw-bold'> Camera Loading...</span>
                            </div>
                        </div>
                    }
                </div>
                <h1 className='text-danger'>{data}</h1>
            </div>
        </>
    )
}

export default QRScanner