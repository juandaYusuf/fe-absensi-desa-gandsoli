import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Alert, Button, Form, InputGroup } from 'react-bootstrap'
import { BottomToTop, TopToBottom } from '../../../Page-transition/ComponentTransitions'



const Generator = () => {

    const [onChangeHandler, setOnChangeHandler] = useState("")
    const [qrCodeGenerated, setQrCodeGenerated] = useState("")
    const [countTimeOut, setCountTimeOut] = useState(10)
    const [displayQRCode, setDisplayQRCode] = useState(false)

    const generateQRCode = async () => {
        if (onChangeHandler !== "") {
            setDisplayQRCode(true)
            try {
                const QRCOdeResponse = await QRCode.toDataURL(onChangeHandler)
                setQrCodeGenerated(QRCOdeResponse)

                setTimeout(() => {
                    setOnChangeHandler("")
                    setDisplayQRCode(false)
                }, 10000)
                setCountTimeOut(10)
            } catch (err) {
                console.log(err)
            }
        } else {
            setDisplayQRCode(false)
        }
    }

    useEffect(() => {
        const timer = countTimeOut > 0 && setInterval(() => setCountTimeOut(countTimeOut - 1), 1000)
        return () => clearInterval(timer);
    }, [countTimeOut])


    return (
        <>
            <div className='d-flex justify-content-center overflow-hidden p-3'>
                <div style={{ maxWidth: "400px", display: "flex", justifyContent: "center" }}>
                    <TopToBottom>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={(e) => { setOnChangeHandler(e.target.value) }}
                                value={onChangeHandler}
                            />
                            <Button variant="warning" id="button-addon2" onClick={() => { generateQRCode() }}>
                                Button
                            </Button>
                        </InputGroup>
                    </TopToBottom>
                </div>
            </div>
            <div className='w-100 d-flex justify-content-center overflow-hidden p-3'>
                <BottomToTop>
                    {
                        (!displayQRCode)
                            ?
                            <div className='add-item-shadow rounded-4 h5 fw-bold m-0 p-0' style={{ height: "300px", width: "300px", border: "solid 2px lightgrey", display: "flex", justifyContent: "center", alignItems: "center" }} alt=" " >QRCODE Generating . . . </div>
                            :
                            <>
                                <Alert variant='warning'>
                                    <h5 className='fw-bold bi bi-stopwatch'> Expiring...</h5>
                                    <hr/>
                                    <p>QRCODE hanya berlaku 10 detik </p>
                                    <h1 className='fw-bold w-100 text-center text-danger'> {countTimeOut}</h1>
                                </Alert>
                                <img src={qrCodeGenerated} className='add-item-shadow rounded-4' style={{ height: "300px", width: "300px", border: "solid 2px lightgrey" }} alt=" " />
                            </>
                    }
                </BottomToTop>
            </div>
        </>

    )
}
export default Generator