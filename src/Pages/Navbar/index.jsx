import React, { useState, useContext, useEffect } from 'react'
import { Button, Container, Dropdown } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../Assets/Logo/logo.png'
import UserContext from '../../Context/Context'
import { useNavigate } from 'react-router-dom'



const NavigationsBar = ({ children }) => {

  const [isNavbarCollapse, setIsNavbarCollapse] = useState(false)
  const { setTurnOnCameraOnQRScannerPage } = useContext(UserContext)
  const [localData, setLocalData] = useState("")
  const navigateTo = useNavigate()
  const location = useLocation()
  const currentUrl = location.pathname


  const navCollapse = () => {
    if (!isNavbarCollapse) {
      setIsNavbarCollapse(true)
    } else {
      setIsNavbarCollapse(false)
    }
  }


  const registerOptions = (options) => {
    if (options === "kepdes") {
      navigateTo('/register-kepdes')
    }
    if (options === "admin") {
      navigateTo('/register-admin')
    }
    if (options === "staf") {
      navigateTo('/register-staf')
    }

  }


  useEffect(() => {
    // CLear LocalStorage from visit (card-list-of-user)
    if (currentUrl !== '/profile') {
      localStorage.removeItem('visit')
    }
  }, [currentUrl])


  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem('obj'))
    if (!!obj) {
      setLocalData(obj.role)
    }
  }, [])

  return (
    <div className='hide-scrollbar' style={{ width: "100%", padding: "10px", height: "100vh", overflow: "auto" }}>
      <div className='position-relative d-flex justify-content-center w-100'>
        <Container className={`add-box-shadow p-3 rounded-4 position-fixed`} style={{ transition: "1", zIndex: "9999", width: "94%", backdropFilter: "blur(15px)", backgroundColor: "#ffffffc0", borderTop: "solid 2px white", borderBottom: "solid 1px lightgrey", borderLeft: "solid 2px whitesmoke", borderRight: "solid 2px whitesmoke" }}>
          <section className='desk-nav'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center gap-3'>
                <img src={logo} style={{ height: "40px" }} alt=" " />
                <h4 className='fw-bold m-0'>Desa Gandasoli</h4>
              </div>

              <div className='border border-success scanning-shadow rounded-4 px-3 py-2'>
                <span className='mx-2 m-0 text-success bi bi-circle-fill' />
                {/* <span className='mx-2 m-0 text-secondary bi bi-circle' /> */}
                <b className='p-0 m-0 text-success'>Scanning .... </b>
              </div>

              <div className='d-flex gap-4 align-items-center'>
                <div className='d-flex gap-3'>
                  <Link to="/dashboard" className={`m-0 fw-bold bi bi-tv cursor-pointer text-dark text-decoration-none ${currentUrl === "/dashboard" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Dashboard</Link>
                  {
                    localData === "kepdes" || localData === "admin"
                      ? (<Dropdown>
                        <Dropdown.Toggle className={`cursor-pointer ${currentUrl === "/register-kepdes" || currentUrl === "/register-admin" || currentUrl === "/register-staf" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} id="dropdown-basic" as="b">
                          <span className='bi bi-person-add h5' /> Registrasi
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='add-box-shadow p-0 bg-transparent rounded-4 overflow-hidden'>
                          <div className='overlay-bg-custom-color p-2'>
                            {
                              localData === "kepdes" || localData === "admin"
                              &&
                              <>
                                <Dropdown.Item className='rounded-3' onClick={() => { registerOptions('kepdes') }}>
                                  <div className='d-flex flex-column'>
                                    <p className='bi bi-person-video3 m-0 p-0'> Kepala desa</p>
                                    <div style={{ fontSize: "12px", marginLeft: "21px", marginBottom: "0px", whiteSpace: "normal" }}>
                                      Halman ini khusus mengganti kepala desa, gunakan halaman ini jika kepala desa berpindah tangan
                                    </div>
                                  </div>
                                </Dropdown.Item>
                                <hr className='m-1 p-0' />
                                <Dropdown.Item className='rounded-3' onClick={() => { registerOptions('admin') }}>
                                  <div className='d-flex flex-column'>
                                    <p className='bi bi-clipboard-data m-0 p-0'> Pengelola absen</p>
                                    <div style={{ fontSize: "12px", marginLeft: "21px", marginBottom: "0px", whiteSpace: "normal" }}>
                                      Halaman ini khusus mendaftarkan pengelola absensi
                                    </div>
                                  </div>
                                </Dropdown.Item>
                                <hr className='m-1 p-0' />
                              </>
                            }
                            <Dropdown.Item className='rounded-3' onClick={() => { registerOptions('staf') }}>
                              <div className='d-flex flex-column'>
                                <p className='bi bi-person-check m-0 p-0'> Staf desa</p>
                                <div style={{ fontSize: "12px", marginLeft: "21px", marginBottom: "0px" }}>
                                  Halaman ini khusus mendaftarkan staf desa
                                </div>
                              </div>
                            </Dropdown.Item>
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                      )
                      :
                      null
                  }
                  {/* <Link to="/scanner-manager" className={`m-0 fw-bold bi bi-qr-code-scan cursor-pointer text-dark text-decoration-none ${currentUrl === "/scanner-manager" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOnCamera")}> QR Scanner</Link> */}
                  {/* <Link to="/qr-generator" className={`m-0 fw-bold bi bi-qr-code cursor-pointer text-dark text-decoration-none ${currentUrl === "/qr-generator" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> QR Generator</Link> */}
                  {
                    localData === "admin" || localData === "kepdes"
                      ?
                      <Link to="/setting" className={`m-0 fw-bold bi bi-gear cursor-pointer text-dark text-decoration-none ${currentUrl === "/setting" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Setting</Link>
                      :
                      null
                  }
                </div>
              </div>
            </div>
          </section>
          {/* MOBILE MODE NAVBAR */}
          <section className='mobile-nav'>
            <div className='d-flex flex-column'>
              <div className='d-flex align-items-center gap-3'>
                <img src={logo} style={{ height: "40px" }} alt=" " />
                <h4 className='fw-bold m-0 w-100'>Desa Gandasoli</h4>
                <Button className='border' variant={(isNavbarCollapse === true) ? 'secondary' : 'transparent'} onClick={() => { navCollapse() }}> <span className='bi bi-list h2' /> </Button>
              </div>
              <div className='d-flex gap-4 align-items-center'>
                <div className={(isNavbarCollapse === true) ? "mobile-link" : "mobile-link-collapse"}>
                  <Link to="/dashboard" className='m-0 fw-bold bi bi-tv cursor-pointer text-dark text-decoration-none' onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Dashboard</Link>
                  {
                    localData === "kepdes" && (
                      <Dropdown>
                        <Dropdown.Toggle className='cursor-pointer' id="dropdown-basic" as="b">
                          <span className='bi bi-person-add h5' /> Registrasi
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='add-box-shadow p-2 overlay-bg-custom-gradient-color p-0' style={{ width: "300px" }}>
                          <Dropdown.Item className='rounded-3'>
                            <div className='d-flex flex-column'>
                              <p className='bi bi-person-video3 m-0 p-0'> Kepala desa</p>
                              <div style={{ fontSize: "12px", marginLeft: "21px", marginBottom: "0px", whiteSpace: "normal" }}>
                                Halman ini khusus mengganti kepala desa, gunakan halaman ini jika kepala desa berpindah tangan
                              </div>
                            </div>
                          </Dropdown.Item>
                          <hr className='m-1 p-0' />
                          <Dropdown.Item className='rounded-3' onClick={() => { navigateTo('/register') }}>
                            <div className='d-flex flex-column'>
                              <p className='bi bi-clipboard-data m-0 p-0'> Pengelola absen</p>
                              <div style={{ fontSize: "12px", marginLeft: "21px", marginBottom: "0px", whiteSpace: "normal" }}>
                                Halaman ini khusus mendaftarkan pengelola absensi
                              </div>
                            </div>
                          </Dropdown.Item>
                          <hr className='m-1 p-0' />
                          <Dropdown.Item className='rounded-3'>
                            <div className='d-flex flex-column'>
                              <p className='bi bi-person-check m-0 p-0'> Staf desa</p>
                              <div style={{ fontSize: "12px", marginLeft: "21px", marginBottom: "0px" }}>
                                Halaman ini khusus mendaftarkan staf desa
                              </div>
                            </div>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )
                  }
                  {/* <Link to="/scanner-manager" className='m-0 fw-bold bi bi-qr-code-scan cursor-pointer text-dark text-decoration-none' onClick={() => setTurnOnCameraOnQRScannerPage("turnOnCamera")}> QR Scanner</Link> */}
                  {/* <Link to="/qr-generator" className='m-0 fw-bold bi bi-qr-code cursor-pointer text-dark text-decoration-none' onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> QR Generator</Link> */}
                  {
                    localData === "admin" || localData === "kepdes"
                      ?
                      <Link to="/setting" className='m-0 fw-bold bi bi-qr-code cursor-pointer text-dark text-decoration-none' onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Setting</Link>
                      :
                      null
                  }
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
      <div style={{ marginTop: "95px" }}>
        {children}
      </div>
    </div>
  )
}

export default NavigationsBar