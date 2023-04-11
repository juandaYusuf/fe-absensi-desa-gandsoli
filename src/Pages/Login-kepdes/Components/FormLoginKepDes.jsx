import React from 'react'
import { Button, InputGroup, Form, Container } from 'react-bootstrap'
import { TopToBottom } from '../../../Page-transition/ComponentTransitions'


const FormLoginKepDes = () => {
    return (
        <TopToBottom>
            <h5> <i className="bi bi-info-circle"></i> Info...!</h5>
            <span>Validasi qrcode kepala desa berhasil silahkan login menggunakan akun kepala desa.</span>
            <hr className='text-danger'/>
            <h5> <i className="bi bi-box-arrow-in-right"></i> Login</h5>
            <InputGroup className="mb-3" bsPrefix="input-group">
                <InputGroup.Text id="basic-addon1" style={{ borderRadius: '15px 0px 0px 15px' }}> <i className="bi bi-postcard"></i> </InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon-username"
                    style={{ borderRadius: '0px 15px 15px 0px' }}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" style={{ borderRadius: '15px 0px 0px 15px' }} > <i className="bi bi-lock"></i> </InputGroup.Text>
                <Form.Control
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon-password"
                    type='password'
                    style={{ borderRadius: '0px 15px 15px 0px' }}
                />
            </InputGroup>
            <Container className='d-flex justify-content-center align-items-center flex-column gap-2 p-0'>
                <Button className="add-item-shadow bi bi-box-arrow-in-right" variant="info rounded-4" style={{ width: "55%" }}> Login kepala desa</Button>
            </Container>
        </TopToBottom>
    )
}

export default FormLoginKepDes