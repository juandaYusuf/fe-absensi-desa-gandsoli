import React, { useContext, useState } from 'react'
import { Button, InputGroup, Form, Container, Spinner } from 'react-bootstrap'
import { TopToBottom } from '../../../Page-transition/ComponentTransitions'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../../Context/Context'
import axios from 'axios'
import API_URL from '../../../API/API_URL'


const FormLoginKepDes = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigateTo = useNavigate()
    const { setShowNavbar } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isServerErr, setIsServerErr] = useState(false)

    const login = () => {
        const url = API_URL().USER.LOGIN_STAF
        const user_data = {
            "email": email,
            "password": password
        }
        setIsLoading(true)
        axios.post(url, user_data)
            .then((response) => {
                if (!!response.data.id) {
                    navigateTo("/Dashboard")
                    setShowNavbar("/Dashboard")
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                console.log(err)
                setIsServerErr(true)
            })
    }

    return (
        <TopToBottom>
            <h5> <i className="bi bi-info-circle"></i> Info...!</h5>
            <span>Validasi qrcode kepala desa berhasil silahkan login menggunakan akun kepala desa.</span>
            <hr className='text-danger' />
            <h5> <i className="bi bi-box-arrow-in-right"></i> Login</h5>
            <InputGroup className="mb-3" bsPrefix="input-group">
                <InputGroup.Text id="basic-addon1" style={{ borderRadius: '15px 0px 0px 15px' }}> <i className="bi bi-postcard"></i> </InputGroup.Text>
                <Form.Control
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon-username"
                    style={{ borderRadius: '0px 15px 15px 0px' }}
                    onChange={(e) => { setEmail(e.target.value) }} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" style={{ borderRadius: '15px 0px 0px 15px' }} > <i className="bi bi-lock"></i> </InputGroup.Text>
                <Form.Control
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon-password"
                    type='password'
                    style={{ borderRadius: '0px 15px 15px 0px' }}
                    onChange={(e) => { setPassword(e.target.value) }} />
            </InputGroup>
            <Container className='d-flex justify-content-center align-items-center flex-column gap-2 p-0'>
                {
                    (!isLoading)
                        ?
                        <Button className="add-item-shadow bi bi-box-arrow-in-right" variant="info rounded-4" style={{ width: "50%" }} onClick={() => { login() }}>
                            <span> Login staf</span>
                        </Button>
                        :
                        <>
                            <Button className="add-item-shadow rounded-4" variant={(isServerErr === true) ? "warning" : "info"} style={{ width: "50%" }} disabled>
                                {
                                    (isServerErr === true)
                                        ?
                                        <span>Tidak dapat login</span>
                                        :
                                        <>
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                            <span> Loading...</span>
                                        </>
                                }
                            </Button>
                        </>
                }
                {
                    (isServerErr === false) &&
                    <p className='text-secondary'>Login sebagai kepala desa silahkan klik <span className='text-info cursor-pointer' onClick={() => navigateTo('/LoginKepDes/')}>disini</span></p>
                }
            </Container>
        </TopToBottom>
    )
}

export default FormLoginKepDes