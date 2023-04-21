import React, { useState, useContext, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../Assets/Logo/logo.png'
import { ZoomOut } from '../../Page-transition/PageTransitions'
import UserContext from '../../Context/Context'

const NavigationsBar = ({ children }) => {

    const [isNavbarCollapse, setIsNavbarCollapse] = useState(false)
    const { setTurnOnCameraOnQRScannerPage } = useContext(UserContext)
    const [localData, setLocalData] = useState("")


    const navCollapse = () => {
        if (!isNavbarCollapse) {
            setIsNavbarCollapse(true)
        } else {
            setIsNavbarCollapse(false)
        }
    }

    useEffect(() => {
        const obj = JSON.parse(localStorage.getItem('obj'))
        if (!!obj) {
            setLocalData(obj.role)
        }
    }, [])

    return (
        <div className='h-100 w-100 p-3'>
            <ZoomOut>
                <Container className={`add-box-shadow p-3 bg-light rounded-4 overflow-hidden mb-4`} style={{ transition: "1" }}>
                    <section className='desk-nav'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex align-items-center gap-3'>
                                <img src={logo} style={{ height: "40px" }} alt=" " />
                                <h4 className='fw-bold m-0'>Desa Gandasoli</h4>
                            </div>
                            <div className='d-flex gap-4 align-items-center'>
                                <div className='d-flex gap-3'>
                                    <Link to="/Dashboard" className='m-0 fw-bold bi bi-tv cursor-pointer text-dark text-decoration-none' onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Dashboard</Link>
                                    {
                                        (localData === "kepdes") && <Link to="/RegistarsiAdmin" className='m-0 fw-bold bi bi-person-add text-dark text-decoration-none' onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Registrasi admin</Link>
                                    }
                                    <Link to="/ScannerManager" className='m-0 fw-bold bi bi-qr-code-scan cursor-pointer text-dark text-decoration-none' onClick={() => setTurnOnCameraOnQRScannerPage("turnOnCamera")}> QR Scanner</Link>
                                    <Link to="/QRGenerator" className='m-0 fw-bold bi bi-qr-code cursor-pointer text-dark text-decoration-none' onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> QR Generator</Link>
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
                                    <Link to="/Dashboard" className='m-0 fw-bold bi bi-tv cursor-pointer text-dark text-decoration-none' onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Dashboard</Link>
                                    {
                                        (localData === "kepdes") && <Link to="/RegistarsiAdmin" className='m-0 fw-bold bi bi-person-add text-dark text-decoration-none' onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Registrasi admin</Link>
                                    }
                                    <Link to="/ScannerManager" className='m-0 fw-bold bi bi-qr-code-scan cursor-pointer text-dark text-decoration-none' onClick={() => setTurnOnCameraOnQRScannerPage("turnOnCamera")}> QR Scanner</Link>
                                    <Link to="/QRGenerator" className='m-0 fw-bold bi bi-qr-code cursor-pointer text-dark text-decoration-none' onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> QR Generator</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </Container>
            </ZoomOut>
            {children}
        </div>
    )
}

export default NavigationsBar