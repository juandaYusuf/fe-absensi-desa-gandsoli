import React, { useState } from 'react'
import FormLoginKepDes from './FormLoginKepDes'
import QrCodeScannerKepDes from './QrCodeScannerKepDes'
import { Card, Alert, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LeftToRight, RightToLeft } from '../../../Page-transition/ComponentTransitions'


const LoginKepDesCard = () => {

    const navigateTo = useNavigate()
    // eslint-disable-next-line
    const [qrCodeValidation, setQrCodeValidation] = useState(false)

    return (
        <Card className='add-box-shadow rounded-4' style={{ margin: "10px", maxWidth: "400px", minWidth: "300px", border: "solid lightgrey 1px", borderTop: "solid lightgrey 2px", overflow: "hidden" }}>
            <Card.Body className=' p-0'>
                <Card.Title className='d-flex justify-content-center align-items-center flex-column m-0'>
                    <LeftToRight>
                        <span className="bi bi-person-workspace fw-bolder m-0 text-secondary" style={{ fontSize: "6rem" }}></span>
                    </LeftToRight>
                    <RightToLeft>
                        <span className='fw-bold m-0 text-secondary' style={{ fontSize: "2rem", zIndex: "999" }}>LOGIN KEPALA DESA</span>
                    </RightToLeft>
                </Card.Title>
                <Alert className='LoginKepDesCard-input-container-shadow overflow-hidden' variant="danger rounded-4 m-0 mt-3 border border-danger">
                    {
                        (qrCodeValidation === false)
                            ?
                            <QrCodeScannerKepDes />
                            :
                            <FormLoginKepDes />
                    }
                    <hr className='text-danger' />
                    <Button onClick={() => (!qrCodeValidation) ? setQrCodeValidation(true) : setQrCodeValidation(false)}>Test Validate</Button>
                    <Container className='d-flex justify-content-center align-items-center flex-column gap-2 p-0'>
                        <p className='text-secondary'>Kembali ke login staf pengelola absensi <span className='text-danger cursor-pointer' onClick={() => navigateTo(-1)}>disini</span></p>
                    </Container>
                </Alert>
            </Card.Body>
        </Card>
    )
}

export default LoginKepDesCard