import React, { useContext, useEffect, useState } from 'react'
import ThemingCangerFunc from '../../Theme'
import { Button, Collapse, Container, OverlayTrigger, Placeholder, Popover, ProgressBar } from 'react-bootstrap'
import { BottomToTop, LeftToRight, RightToLeft } from '../../Page-transition/ComponentTransitions'
import FormEditProfile from './Components/Form-edit-profile'
import axios from 'axios'
import API_URL from '../../API/API_URL'
import { SlideLeft } from '../../Page-transition/PageTransitions'
import { Link, useLocation } from 'react-router-dom'
import ModalPopUp from '../../Global-components/ModalPopUp'
import bg1 from '../../Assets/Background/1.jpg'
import bg2 from '../../Assets/Background/2.jpg'
import bg3 from '../../Assets/Background/3.jpg'
import UserContext from '../../Context/Context'
import Presenting from './Components/Presenting'
import UserDetailPresence from './Components/User-detail-presence'
import CardAttendanceRules from '../../Global-components/Card-attendance-rules'
import PDFFile from './Components/PDFFile'


const Profile = () => {

  const { contextIsImageUploaded } = useContext(UserContext)

  const [userDetail, setUserDetail] = useState({})
  const [imageData, setImageData] = useState(null)
  const src = 'data:image/jpeg;base64,' + imageData
  const currentUserlocalData = JSON.parse(localStorage.getItem('obj'))
  const [seenAsAVisitor, setSeenAsAVisitor] = useState(JSON.parse(localStorage.getItem('visit')))
  // let seenAsAVisitor = JSON.parse(localStorage.getItem('visit'))
  const [openCollapseTheme, setOpenCollapseTheme] = useState(false)
  const [openCollapseProfileOptions, setOpenCollapseProfileOptions] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [whichIsCallingModal, setWhichIsCallingModal] = useState("")
  const [tabPosition, setTabPosition] = useState("profile")
  const [changeBgHeader, setChangeBgHeader] = useState(bg1)
  const [showPopOver, setShowPopOver] = useState(false)
  const [attendanceRulesDatas, setAttendanceRulesDatas] = useState([])
  const { contextShowPDF } = useContext(UserContext)



  const showModalDelete = () => {
    setModalShow(true)
    setWhichIsCallingModal("delete picture")
  }

  const showModalUpdateProfile = () => {
    setModalShow(true)
    setWhichIsCallingModal("update picture")
  }

  useEffect(() => {
    const getProfilePicture = () => {
      let url = null
      if (seenAsAVisitor.id === currentUserlocalData.id) {
        url = API_URL(currentUserlocalData.id).USER.GET_SINGLE_PROFILE_PICTURE
      } else {
        url = API_URL(seenAsAVisitor.id).USER.GET_SINGLE_PROFILE_PICTURE
      }

      axios.get(url).then((response) => {
        setImageData(response.data.picture)
      })
    }

    if (seenAsAVisitor === null) return
    getProfilePicture()

  }, [contextIsImageUploaded])

  useEffect(() => {
    if (seenAsAVisitor === null) {
      setSeenAsAVisitor(currentUserlocalData)
    }
  }, [seenAsAVisitor])

  useEffect(() => {
    const showAllAttendanceRulesDatas = () => {
      const url = API_URL().ATTENDANCE_RULES.SHOW_ALL_ATTENDANCE_RULES
      axios.get(url).then((response) => {
        setAttendanceRulesDatas(response.data)
      })
    }

    showAllAttendanceRulesDatas()
  }, [])



  const popover = (
    <Popover id="popover-basic" className='add-box-shadow bg-transparent rounded-4 ' style={{ width: "200px" }}>
      <div className='overflow-hidden overlay-bg-custom-color rounded-4 '>
        <Popover.Body className='d-flex flex-column p-2'>
          <SlideLeft>
            <Popover.Body className='d-flex flex-column p-1'>
              <Link className='bi bi-pencil text-dark text-decoration-none link-hover' onMouseEnter={() => { setOpenCollapseProfileOptions(true) }} onMouseLeave={() => { setOpenCollapseProfileOptions(false) }}> Edit photo profile
                <Collapse in={openCollapseProfileOptions}>
                  <div id="example-collapse-text" className='mt-1'>
                    <div className='d-flex flex-column' style={{ width: "200px" }} onClick={() => { setShowPopOver(false) }}>
                      <p className='bi bi-cloud-upload rounded-3 p-2 my-0 mx-3 sub-menu-hover' onClick={() => showModalUpdateProfile()} style={{ width: "70%" }}> Update foto</p>
                      <p className='bi bi-trash rounded-3 p-2 my-0 mx-3 text-danger sub-menu-hover' onClick={() => showModalDelete()} style={{ width: "70%" }}> Hapus foto</p>
                    </div>
                  </div>
                </Collapse>
              </Link>
              <Link className='text-dark text-decoration-none bi bi-palette link-hover' onMouseEnter={() => { setOpenCollapseTheme(true) }} onMouseLeave={() => { setOpenCollapseTheme(false) }}> Ubah background
                <Collapse in={openCollapseTheme}>
                  <div id="example-collapse-text" className='mt-1'>
                    <div className='d-flex gap-2' style={{ width: "200px" }} onClick={() => { setShowPopOver(false) }}>
                      <img className='rounded-4' src={bg1} style={{ objectFit: "cover", width: "50px", height: "50px", backgroundColor: "white" }} onClick={() => { setChangeBgHeader(bg1) }} alt="" />
                      <img className='rounded-4' src={bg2} style={{ objectFit: "cover", width: "50px", height: "50px", backgroundColor: "white" }} onClick={() => { setChangeBgHeader(bg2) }} alt="" />
                      <img className='rounded-4' src={bg3} style={{ objectFit: "cover", width: "50px", height: "50px", backgroundColor: "white" }} onClick={() => { setChangeBgHeader(bg3) }} alt="" />
                    </div>
                  </div>
                </Collapse>
              </Link>
            </Popover.Body>
          </SlideLeft>
        </Popover.Body>
      </div>
    </Popover>
  )


  return (
    <BottomToTop>
      <Container className={` ${ThemingCangerFunc().gradient} add-item-shadow rounded-4 p-0 overflow-hidden d-flex flex-column`} style={ThemingCangerFunc("white").style} >
        {
          !!contextShowPDF
            ?
            (<PDFFile />)
            :
            <>
              <div className='profile-header'>
                <div style={{ height: "68%", width: "100%" }}>
                  <img className='w-100 h-100' src={changeBgHeader} style={{ objectFit: "cover" }} />
                  <div className='profile-picture-container'>
                    {
                      imageData !== "no picture" && imageData !== null
                        ?
                        (<img className='rounded-circle' src={src} style={{ objectFit: "cover", width: "200px", height: "200px", border: "solid 10px white", backgroundColor: "white" }} />)
                        :
                        imageData === "no picture"
                          ?
                          (<div className='rounded-circle d-flex' src={src} style={{ objectFit: "cover", width: "200px", height: "200px", border: "solid 10px white", backgroundColor: "grey" }} >
                            <div className='m-auto p-2 w-100 d-flex justify-content-center'>
                              <span className='bi bi-person-fill m-0 p-0 text-light' style={{ fontSize: "7rem" }} />
                            </div>
                          </div>)
                          :
                          (<div className='rounded-circle d-flex' src={src} style={{ objectFit: "cover", width: "200px", height: "200px", border: "solid 10px white", backgroundColor: "grey" }} >
                            <div className='m-auto p-2 w-100'>
                              <p className='text-light p-0 m-0'>Memuat gambar...</p>
                              <ProgressBar variant='info' animated now={100} />
                            </div>
                          </div>)
                    }
                    <div className='d-flex justify-content-center flex-column'>
                      {
                        !!userDetail.first_name
                          ?
                          (<>
                            <p className='p-0 m-0 fw-bold h4'>{`${userDetail.first_name} ${userDetail.last_name}`}</p>
                            <p className='p-0 m-0 text-muted'>{userDetail.email}</p>
                          </>)
                          :
                          (<div style={{ width: "200px" }}>
                            <Placeholder animation="glow">
                              <Placeholder xs={12} size='lg' />
                              <Placeholder xs={10} size="sm" />
                            </Placeholder>
                          </div>)
                      }
                    </div>
                  </div>
                  <div className='w-100 d-flex justify-content-end p-4 px-5'>
                    {
                      seenAsAVisitor.id === currentUserlocalData.id
                      &&
                      <OverlayTrigger trigger="click" placement="auto-start" overlay={popover} rootCloseEvent="click" show={showPopOver} >
                        <div className='m-2' onClick={() => { setShowPopOver(!showPopOver) }}>
                          <span className='bi bi-gear-fill position-relative cursor-pointer h4 text-dark' style={{ zIndex: "2" }} />
                          {
                            !!showPopOver
                            &&
                            <div className='position-absolute' style={{ width: "100vw", height: "150vh", left: "0px", top: "0px", zIndex: "1" }} onClick={() => { setShowPopOver(false) }} />
                          }
                        </div>
                      </OverlayTrigger>
                    }
                  </div>
                </div>
              </div>
              {
                seenAsAVisitor.id === currentUserlocalData.id
                  ?
                  <Container className='d-flex flex-column p-2 mt-5 overflow-hidden' style={{ zIndex: "2" }} onClick={() => { setShowPopOver(false) }}>
                    <div className='d-flex gap-2 mb-3 d-flex justify-content-center'>
                      <div className='d-flex gap-2' style={{ width: "700px" }}>
                        <Button className='w-100 rounded-4 add-item-shadow' variant={`${tabPosition === "profile" ? "secondary" : "outline-secondary"} `} onClick={() => { setTabPosition("profile") }}> <span className='bi bi-person-lines-fill h5 fw-bolder'> Profile</span> </Button>
                        <Button className='w-100 rounded-4 add-item-shadow' variant={`${tabPosition === "kehadiran" ? "secondary" : "outline-secondary"} `} onClick={() => { setTabPosition("kehadiran") }}> <span className='bi bi-postcard-fill h5 fw-bolder'> Kehadiran</span></Button>
                        <Button className='w-100 rounded-4 add-item-shadow' variant={`${tabPosition === "info" ? "secondary" : "outline-secondary"} `} onClick={() => { setTabPosition("info") }}> <span className='bi bi-info-circle-fill h5 fw-bolder'> Info</span></Button>
                      </div>
                    </div>
                    {
                      tabPosition === "profile"
                        ?
                        (<LeftToRight>
                          <div className='w-100 d-flex justify-content-center'>
                            <FormEditProfile user_detail={setUserDetail} />
                          </div>
                        </LeftToRight>)
                        :
                        tabPosition === "kehadiran"
                          ?
                          (<BottomToTop>
                            <UserDetailPresence current_user="my-self" />
                          </BottomToTop>)
                          :
                          tabPosition === "info"
                          &&
                          (<RightToLeft>
                            <Container className='d-flex gap-2 flex-wrap justify-content-center' style={{ width: "700px" }}>
                              <h3 className='w-100 text-start mt-3'>Aturan absensi</h3>
                              {
                                attendanceRulesDatas.filter((items) => items.usage === true).map((result) => {
                                  return (
                                    <CardAttendanceRules
                                      key={result.id}
                                      show_action={false}
                                      draft_id={result.id}
                                      title={result.title}
                                      work_start_time={result.work_start_time}
                                      work_times_up={result.work_times_up}
                                      late_deadline={result.late_deadline}
                                      description={result.description}
                                      usage={result.usage}
                                      created_at={result.created_at} />)
                                })
                              }
                              {attendanceRulesDatas.length <= 0
                                &&
                                (<div
                                  className='w-100 d-flex align-items-center border-bottom border-2 flex-column text-muted mb-4 pb-5'>
                                  <span className="bi bi-journal-x h1 m-0 p-0" />
                                  Tidak ada item ! Sistem menjalankan aturan default
                                  <table className='mt-2'>
                                    <tbody>
                                      <tr>
                                        <td className='bi bi-clock-fill fw-bold'> Jam masuk</td>
                                        <td className='px-2'> :</td>
                                        <td> 7:00:00</td>
                                      </tr>
                                      <tr>
                                        <td className='bi bi-clock fw-bold'> Jam keluar</td>
                                        <td className='px-2'> :</td>
                                        <td> 15:00:00</td>
                                      </tr>
                                      <tr>
                                        <td className='bi bi-clock-history fw-bold'> Keterlambatan</td>
                                        <td className='px-2'> :</td>
                                        <td> 30 menit</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>)
                              }
                            </Container>
                          </RightToLeft>)
                    }
                  </Container>
                  :
                  <Container className='d-flex justify-content-center align-items-center flex-column overflow-hidden' style={{ zIndex: "2" }} onClick={() => { setShowPopOver(false) }}>
                    <UserDetailPresence user_detail={setUserDetail} current_user="visitor" />
                  </Container>
              }
            </>
        }
      </Container>
      <ModalPopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        options={whichIsCallingModal}
      />
    </BottomToTop>

  )
}

export default Profile
