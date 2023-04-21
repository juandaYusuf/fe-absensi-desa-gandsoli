import React, { useContext, useState } from 'react'
import { Card, Button, InputGroup, Form, Alert, Container, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { BottomToTop, LeftToRight, TopToBottom, RightToLeft } from '../../../Page-transition/ComponentTransitions'
import UserContext from '../../../Context/Context'
import axios from 'axios'
import API_URL from '../../../API/API_URL'


const LoginCard = () => {

    const navigateTo = useNavigate()
    const { setShowNavbar } = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
                    localStorage.setItem('obj', JSON.stringify(response.data))
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
        <Card className='add-box-shadow rounded-4 my-4' style={{ margin: "10px", maxWidth: "400px", minWidth: "300px", border: "solid lightgrey 1px", borderTop: "solid lightgrey 2px", overflow: "hidden" }}>
            <Card.Body className=' p-0'>
                <Card.Title className='d-flex justify-content-center align-items-center flex-column m-0'>
                    <LeftToRight>
                        <span className="bi bi-person-video3 fw-bolder m-0 text-secondary" style={{ fontSize: "6rem" }}></span>
                    </LeftToRight>
                    <RightToLeft>
                        <span className='fw-bold m-0 text-secondary mx-4' style={{ fontSize: "2rem", zIndex: "999" }}>LOGIN STAF ABSENSI</span>
                    </RightToLeft>
                </Card.Title>
                <Alert variant="info rounded-4 m-0 mt-3 border border-info LoginStaf-input-container-shadow overflow-hidden">
                    <TopToBottom>
                        {
                            (isServerErr === true)
                                ?
                                <Alert variant='danger border-danger w-100'>
                                    <h4 className='fw-bold bi bi-database-x'> Error</h4>
                                    <hr className='text-danger' />
                                    <p>Terjadi kesalahan pada server! <span className='bi bi-emoji-frown' /> </p>
                                </Alert>
                                :
                                <>
                                    <h5> <i className="bi bi-info-circle"></i> Info...!</h5>
                                    Login hanya dapat diakses oleh staf pengelola absen atau kepala desa. staf hanya bisa login ketika telah didaftarkan oleh kepala desa sebagai staf pengelola absen. <br /><br /> Untuk membuat staf pengelola admin baru hanya dapat dilakukan oleh kepala desa. Untuk login sebagai kepala desa silahkan ikuti instruksi dibawah ! <br /> <br />
                                    <i className='text-secondary fw-light'>Anda berada dihalaman login untuk staf pengelola absensi</i>
                                    <hr className='text-primary' />
                                </>
                        }
                    </TopToBottom>
                    <BottomToTop>
                        <>
                            <h5 className='bi bi-box-arrow-in-right'> Login</h5>
                            <InputGroup className="mb-3" bsPrefix="input-group">
                                <InputGroup.Text id="basic-addon1" style={{ borderRadius: '15px 0px 0px 15px' }}> <i className="bi bi-postcard"></i> </InputGroup.Text>
                                <Form.Control
                                    placeholder="Email"
                                    aria-label="Email"
                                    aria-describedby="basic-addon-email"
                                    type='email'
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
                                        <Button className="add-item-shadow bi bi-box-arrow-in-right" variant="warning rounded-4" style={{ width: "50%" }} onClick={() => { login() }}>
                                            <span> Login staf</span>
                                        </Button>
                                        :
                                        <>
                                            <Button className="add-item-shadow rounded-4" variant={(isServerErr === true) ? "danger" : "warning"} style={{ width: "50%" }} disabled>
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
                        </>
                    </BottomToTop>
                </Alert>
            </Card.Body>
        </Card>
    )
}

export default LoginCard