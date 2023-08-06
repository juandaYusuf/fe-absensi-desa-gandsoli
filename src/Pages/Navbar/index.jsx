import React, { useState, useContext, useEffect } from 'react'
import { Button, Container, Dropdown, Spinner } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../Assets/Logo/logo.png'
import UserContext from '../../Context/Context'
import { useNavigate } from 'react-router-dom'
import ToastForNotif from '../../Global-components/Toast-for-notif'
import axios from 'axios'
import API_URL from '../../API/API_URL'




const NavigationsBar = ({ children }) => {

  let only24Hourse = new Date().getHours().toString().padStart(2, '0')
  let onlyMinutes = new Date().getMinutes()

  const [isNavbarCollapse, setIsNavbarCollapse] = useState(false)
  const { setTurnOnCameraOnQRScannerPage, contextShowToast, contextToastTXT, setContextShowToast } = useContext(UserContext)
  const [localData, setLocalData] = useState("")
  const [showTime, setShowTime] = useState(new Date().toLocaleTimeString())
  const [animationGreenDot, setAnimationGreenDot] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [combineTimes, setCombineTimes] = useState("")
  const [isTimeLoading, setIsTimeLoading] = useState(true)
  const obj = JSON.parse(localStorage.getItem('obj'))



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


  const logOut = () => {
    localStorage.clear()
    navigateTo('/')
  }

  const goToProfile = () => {
    navigateTo('/profile')
    localStorage.setItem('visit', JSON.stringify({ "id": obj.id }))
    setTurnOnCameraOnQRScannerPage("turnOffCamera")
  }

  useEffect(() => {
    // CLear LocalStorage from visit (card-list-of-user)
    if (currentUrl !== '/profile') {
      localStorage.removeItem('visit')
    }
  }, [currentUrl])


  useEffect(() => {
    if (!!obj) {
      setLocalData(obj.role)
    }
  }, [])


  useEffect(() => {
    // Get attendance data (mendapatkan waktu terlambat kerja)
    const url = API_URL().ATTENDANCE_RULES.SHOW_ALL_ATTENDANCE_RULES
    axios.get(url).then((response) => {
      response.data.map((result) => {
        if (!!result.usage) {
          let times = String(result.work_start_time)
          let minutes = String(result.late_deadline)
          setCombineTimes(times.substring(0, 2) + ":" + minutes + ":" + times.substring(3, 5))
        }
      })
    })
  }, [])


  useEffect(() => {
    const timerID = setInterval(() => {
      let localTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
      let dayName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
      let day = new Date().getDay()
      // NOTIFIKASI untuk kondisi dimana sudah melebihi estimasi terlmabat kerja, user akan di anggap tidak hadir
      if (!!combineTimes) {
        setIsTimeLoading(false)
      } else {
        setIsTimeLoading(true)
      }
      setShowTime(`${localTime} - ${dayName[day]}`)
    }, 1000)

    const animate = setInterval(() => {
      setAnimationGreenDot(prevState => !prevState)
    }, 500)

    return () => {
      clearInterval(timerID)
      clearInterval(animate)
    }
  }, [combineTimes])



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
              <div
                className='border border-danger scanning-shadow rounded-4 px-3 py-2 d-flex justify-content-center align-items-center'
                style={{ width: "210px" }}>
                {
                  !!isTimeLoading
                    ?
                    (<><Spinner variant='secondaty' size='sm' /> <span className='mx-2'>Memuat...</span></>)
                    :
                    animationGreenDot === false
                      ?
                      (<span className='mx-2 m-0 text-success bi bi-circle-fill' />)
                      :
                      (<span className='mx-2 m-0 text-secondary bi bi-circle' />)
                }
                {
                  isTimeLoading === false
                  &&
                  <b className='p-0 m-0 text-danger'>{showTime}</b>
                }
              </div>
              <div className='d-flex gap-4 align-items-center'>
                <div className='d-flex gap-3'>
                  {
                    localData === "KAUR Keuangan"
                    &&
                    <>
                      <Link to="/dashboard" className={`m-0 fw-bold bi bi-tv cursor-pointer text-dark text-decoration-none ${currentUrl === "/dashboard" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Dashboard</Link>
                      <Link to="/register" className={`m-0 fw-bold bi bi-person-add cursor-pointer text-dark text-decoration-none ${currentUrl === "/register" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOnCamera")}> Registrasi</Link>
                    </>
                  }
                  <Link to="/scanner-manager" className={`m-0 fw-bold bi bi-qr-code-scan cursor-pointer text-dark text-decoration-none ${currentUrl === "/scanner-manager" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOnCamera")}> QR Scanner</Link>
                  {
                    localData === "KAUR Keuangan"
                      ?
                      <>
                        {/* <Link to="/qr-generator" className={`m-0 fw-bold bi bi-qr-code cursor-pointer text-dark text-decoration-none ${currentUrl === "/qr-generator" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> QR Generator</Link> */}
                        <Link to="/absensi" className={`m-0 fw-bold bi bi-journal-medical cursor-pointer text-dark text-decoration-none ${currentUrl === "/absensi" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Absensi</Link>
                        <Link to="/setting" className={`m-0 fw-bold bi bi-gear cursor-pointer text-dark text-decoration-none ${currentUrl === "/setting" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Pengaturan</Link>
                      </>
                      :
                      <>
                        <div className={`m-0 fw-bold bi bi-person cursor-pointer text-dark text-decoration-none ${currentUrl === "/profile" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => goToProfile()}> Profile</div>
                        <Button className='rounded-4 mx-3' variant='outline-danger' onClick={() => logOut()}> Log Out</Button>
                      </>
                  }
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-end w-100 px-5' style={{ position: 'absolute' }}>
              <ToastForNotif
                onShowHandler={contextShowToast}
                onCloseHandler={() => setContextShowToast(false)}
                txtTitle={contextToastTXT.title}
                txtBody={contextToastTXT.body}
                themes={contextToastTXT.themes}
                times={contextToastTXT.times}
              />
            </div>
          </section>

          {/*! MOBILE MODE NAVBAR */}
          <section className='mobile-nav'>
            <div className='d-flex flex-column'>
              <div className='d-flex align-items-center gap-3'>
                <img src={logo} style={{ height: "40px" }} alt=" " />
                <h4 className='fw-bold m-0 w-100'>Desa Gandasoli</h4>
                <Button className='border' variant={(isNavbarCollapse === true) ? 'secondary' : 'transparent'} onClick={() => { navCollapse() }}> <span className='bi bi-list h2' /> </Button>
              </div>
              <div className='d-flex gap-4 align-items-center'>
                <div className={(isNavbarCollapse === true) ? "mobile-link w-100" : "mobile-link-collapse w-100"}>
                  {
                    localData === "KAUR Keuangan"
                    &&
                    <>
                      <Link to="/dashboard" className={`m-0 fw-bold bi bi-tv cursor-pointer text-dark text-decoration-none ${currentUrl === "/dashboard" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Dashboard</Link>
                      <Link to="/register" className={`m-0 fw-bold bi bi-person-add cursor-pointer text-dark text-decoration-none ${currentUrl === "/register" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOnCamera")}> Registrasi</Link>
                    </>
                  }
                  <Link to="/scanner-manager" className={`m-0 fw-bold bi bi-qr-code-scan cursor-pointer text-dark text-decoration-none ${currentUrl === "/scanner-manager" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOnCamera")}> QR Scanner</Link>
                  {
                    localData === "KAUR Keuangan"
                      ?
                      <>
                        {/* <Link to="/qr-generator" className={`m-0 fw-bold bi bi-qr-code cursor-pointer text-dark text-decoration-none ${currentUrl === "/qr-generator" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> QR Generator</Link> */}
                        <Link to="/absensi" className={`m-0 fw-bold bi bi-journal-medical cursor-pointer text-dark text-decoration-none ${currentUrl === "/absensi" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Absensi</Link>
                        <Link to="/setting" className={`m-0 fw-bold bi bi-gear cursor-pointer text-dark text-decoration-none ${currentUrl === "/setting" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => setTurnOnCameraOnQRScannerPage("turnOffCamera")}> Pengaturan</Link>
                      </>
                      :
                      <>
                        <div className={`m-0 fw-bold bi bi-person cursor-pointer text-dark text-decoration-none ${currentUrl === "/profile" ? "border-2 border-secondary border-bottom" : "border-2 border-bottom"}`} onClick={() => goToProfile()}> Profile</div>
                        <Button className='rounded-4 w-100' variant='outline-danger' onClick={() => logOut()}> Log Out</Button>
                      </>

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