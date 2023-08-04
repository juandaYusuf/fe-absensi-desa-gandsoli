import React, { useEffect, useState } from 'react'
import { Card, Button, InputGroup, Form, Alert, Container, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import logo from '../../../Assets/Logo/logo.png'
import { BottomToTop, TopToBottom, RightToLeft } from '../../../Page-transition/ComponentTransitions'
import axios from 'axios'
import API_URL from '../../../API/API_URL'
import bcrypt from 'bcryptjs'
import qpuReport from 'gl-info'
import VerifyCodeFormModal from './VerifyCodeFormModal'


const LoginCard = () => {

  const navigateTo = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isServerErr, setIsServerErr] = useState(false)
  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const [isDeviceValidated, setIsDeviceValidated] = useState('no-activity')
  const [modalShow, setModalShow] = React.useState(false)
  const [userIdUnverifiedAccount, setUserIdUnverifiedAccount] = useState(0)
  const [isVerificationSuccesse, setIsVerificationSuccesse] = useState(false)
  const reloadPage = () => window.location.reload()
  const salt = bcrypt.genSaltSync(10)



  // ++++++++ Get UserAgent ++++++++
  const userDevice = () => {
    const glReport = qpuReport()
    const userAgentData = navigator.userAgent
    const userAgentWithoutBrowserVersion = userAgentData.replace(/\d+(\.\d+)+$/, '')
    const userDeviceDatas = `${glReport.vendor}${glReport.version}${glReport.extensions}${userAgentWithoutBrowserVersion}${glReport.unMaskedVendor}${glReport.unMaskedRenderer}${glReport.renderer}`
    return userDeviceDatas
  }


  const login = () => {
    const userDeviceData = userDevice()

    const encPass = bcrypt.hashSync(password, salt)
    const url = API_URL().USER.LOGIN_STAF
    const user_data = {
      "email": email,
      "encpass": encPass,
      "user_device": userDeviceData.replace('/\s/g', "")
    }
    setIsLoading(true)
    axios.post(url, user_data).then((response) => {
      if (response.data.message === "device not vaidated") {
        setIsDeviceValidated('not-validated')
        setIsLoginFailed(true)
      } else {
        const dataForLocalStirage = {
          "id": response.data.id,
          "role": response.data.role
        }
        bcrypt.compare(password, response.data.encpass, (err, res) => {
          if (res === true) {
            if (!!response.data.id) {
              if (response.data.role === "KAUR Keuangan") {
                if (response.data.log === "unverified") {
                  setUserIdUnverifiedAccount(response.data.id)
                  localStorage.setItem('obj', JSON.stringify(dataForLocalStirage))
                  setModalShow(true)
                  setIsLoading(false)
                } else {
                  localStorage.setItem('obj', JSON.stringify(dataForLocalStirage))
                  navigateTo("/dashboard")
                  setIsLoading(false)
                }
              } else {
                if (response.data.log === "unverified") {
                  setUserIdUnverifiedAccount(response.data.id)
                  localStorage.setItem('obj', JSON.stringify(dataForLocalStirage))
                  localStorage.setItem('visit', JSON.stringify({ "id": response.data.id }))
                  setModalShow(true)
                  setIsLoading(false)
                } else {
                  localStorage.setItem('obj', JSON.stringify(dataForLocalStirage))
                  localStorage.setItem('visit', JSON.stringify({ "id": response.data.id }))
                  navigateTo("/profile")
                  setIsLoading(false)
                }
              }
            }
          } else {
            setIsLoginFailed(true)
            setIsLoading(false)
          }
        })
      }
    }).catch((err) => {
      if (!err.response) {
        console.log(err)
        setIsServerErr(true)
      } else if (err.response.status === 404) {
        setIsLoginFailed(true)
        setIsLoading(false)
      }
    })
  }


  useEffect(() => {
    if (isVerificationSuccesse === true) {
      login()
    }
  }, [isVerificationSuccesse])



  return (
    <>
      <div className='position-relative px-2' style={{ height: "100vh" }}>
        <div className='position-absolute d-flex justify-content-center pt-1' style={{ zIndex: "2", width: "96.5%" }}>
          <img src={logo} style={{ width: "150px", height: "150px", objectFit: "contain", filter: "drop-shadow(0 3mm 1mm rgb(0, 0, 0, 0.40))", marginBottom: "15px" }} />
        </div>
        <div className='h-100' style={{ paddingTop: "50px" }}>
          <Card className='add-box-shadow rounded-4 login-card-layout' style={{ backdropFilter: "blur(15px)", backgroundColor: "rgba(255, 255, 255, 0.54", backgroundImage: 'url("https://www.transparenttextures.com/patterns/egg-shell.png")' }} >
            <Card.Body className=' p-0'>
              <Card.Title className='d-flex justify-content-center align-items-center flex-column m-0'>
                <RightToLeft>
                  <div style={{ zIndex: "999", paddingTop: "100px" }} >
                    <h2 className='fw-bold text-dark m-0' style={{ fontSize: "3rem" }}>LOGIN</h2>
                  </div>
                </RightToLeft>
              </Card.Title>
              <Alert variant="info rounded-4 h-100 text-dark my-0 border overflow-hidden login-alert" style={{ backgroundColor: "rgba(255, 255, 255, 0.50)", backgroundImage: 'url("https://www.transparenttextures.com/patterns/egg-shell.png")' }} >
                <TopToBottom>
                  {
                    isServerErr === true
                      ?
                      (<Alert variant='danger border-danger w-100'>
                        <h4 className='fw-bold bi bi-database-x'> Error</h4>
                        <hr className='text-danger' />
                        <p>Terjadi kesalahan pada server! <span className='bi bi-emoji-frown' /> </p>
                      </Alert>)
                      :
                      isLoginFailed === true
                        ?
                        (<>
                          <TopToBottom>
                            {
                              isDeviceValidated === "not-validated"
                                ?
                                <Alert className='rounded-4' variant='danger border-danger w-100' style={{ marginBottom: "56px" }}>
                                  <h4 className='bi bi-phone-flip'> Perangkat tidak valid..! </h4>
                                  <hr className='text-danger' />
                                  <p>Mencoba login di perangkat lain terdetksi...!</p>
                                </Alert>
                                :
                                <Alert className='rounded-4' variant='danger border-danger w-100' style={{ marginBottom: "56px" }}>
                                  <h4 className='bi bi-x-circle'> Login gagal </h4>
                                  <hr className='text-danger' />
                                  <p>Silahkan periksa kembali email dan password anda</p>
                                </Alert>
                            }
                          </TopToBottom>
                          <hr />
                        </>)
                        :
                        (<>
                          <h5> <i className="bi bi-info-circle"></i> Info...!</h5>
                          Sistem Informasi Absensi Gandasoli <b>"SIAGA"</b> merupakan sistem informasi management berbasis web <b>"Web Based Application"</b> yang dibangun untuk mengelola absensi staf Desa Gandasoli. <br /><br /> Untuk melakukan registrasi staf desa, dapat dilakukan oleh admin, kemudian masuk ke menu registrasi<br />
                          <hr />
                        </>)
                  }
                </TopToBottom>
                <BottomToTop>
                  <>
                    <h5 className='bi bi-box-arrow-in-right'> Login</h5>
                    <InputGroup className="mb-3" bsPrefix="input-group">
                      <InputGroup.Text className='add-item-shadow' id="basic-addon1" style={{ borderRadius: '15px 0px 0px 15px' }}> <i className="bi bi-postcard"></i> </InputGroup.Text>
                      <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon-email"
                        type='email'
                        className='add-item-shadow'
                        style={{ borderRadius: '0px 15px 15px 0px' }}
                        onKeyDown={(e) => { e.key === "Enter" && (login()) }}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className='add-item-shadow' id="basic-addon1" style={{ borderRadius: '15px 0px 0px 15px' }} > <i className="bi bi-lock"></i> </InputGroup.Text>
                      <Form.Control
                        placeholder="Password"
                        aria-label="Password"
                        className='add-item-shadow'
                        aria-describedby="basic-addon-password"
                        type='password'
                        style={{ borderRadius: '0px 15px 15px 0px' }}
                        onKeyDown={(e) => { e.key === "Enter" && (login()) }}
                        onChange={(e) => { setPassword(e.target.value) }} />
                    </InputGroup>
                    <Container className='d-flex justify-content-center align-items-center flex-column gap-2 p-0'>
                      {
                        !isLoading
                          ?
                          (<Button className="add-item-shadow bi bi-box-arrow-in-right" variant="warning rounded-4" style={{ width: "50%" }} onClick={() => { login() }}>
                            <span> Login</span>
                          </Button>)
                          :
                          (<Button className="add-item-shadow rounded-4" variant={(isServerErr === true) ? "danger" : "warning"} style={{ width: "50%" }} disabled={!isServerErr} onClick={() => reloadPage()}>
                            {
                              isServerErr === true
                                ?
                                (<span>Muan ulang</span>)
                                :
                                isLoginFailed === true
                                  ?
                                  (<span> Login</span>)
                                  :
                                  (<>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    <span> Loading...</span>
                                  </>)
                            }
                          </Button>)
                      }
                    </Container>
                  </>
                </BottomToTop>
              </Alert>
            </Card.Body>
          </Card>
        </div>
      </div>
      <VerifyCodeFormModal
        user_id={userIdUnverifiedAccount}
        show={modalShow}
        onHide={() => setModalShow(false)} />
    </>
  )
}

export default LoginCard