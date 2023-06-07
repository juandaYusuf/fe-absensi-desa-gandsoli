import React, { useContext, useEffect, useState } from 'react'
import { LeftToRight, RightToLeft, BottomToTop } from '../../../Page-transition/ComponentTransitions'
import { Button, Collapse, OverlayTrigger, Placeholder, Popover, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { SlideLeft } from '../../../Page-transition/PageTransitions'
import { useNavigate } from 'react-router-dom'
import API_URL from '../../../API/API_URL'
import axios from 'axios'
import UserContext from '../../../Context/Context'
import ThemingCangerFunc from '../../../Theme'

const DashboardHeader = () => {

  const [imageData, setImageData] = useState(null)
  const [userDatas, setUserDatas] = useState({})
  const [dateNow, setDateNow] = useState("")
  const [openCollapse, setOpenCollapse] = useState(false)
  const navigateTo = useNavigate()
  const { setThemeChanger } = useContext(UserContext)


  const src = 'data:image/jpeg;base64,' + imageData
  let getLocalData = JSON.parse(localStorage.getItem('obj'))

  const logOut = () => {
    localStorage.clear()
    navigateTo('/')
  }


  const visitStafProfileByAdmin = (userID) => {
    localStorage.setItem('visit', JSON.stringify({ "id":  userID}))
    navigateTo('/profile')
  }



  useEffect(() => {
    const getUserProfilePicture = () => {
      axios.get(API_URL(getLocalData.id).USER.GET_SINGLE_PROFILE_PICTURE).then((result) => {
        setImageData(result.data.picture)
      })
    }

    const getUserDetail = () => {
      axios.get(API_URL(getLocalData.id).USER.GET_SINGLE_USER).then((result) => {
        setUserDatas({
          "id": result.data.id,
          "first_name": result.data.first_name,
          "last_name": result.data.last_name,
          "alamat": result.data.alamat,
          "no_telepon": result.data.no_telepon,
          "email": result.data.email,
          "j_kelamin": result.data.j_kelamin,
          "role": result.data.role,
          "profile_picture": result.data.profile_picture
        })
      })
    }

    const getDateForNow = (separator = '-') => {
      let dateForNow = new Date()
      let date = dateForNow.getDate()
      let year = dateForNow.getFullYear()
      let monthName = dateForNow.toLocaleString('default', { month: 'long' })
      setDateNow(`${date}${separator}${monthName}${separator}${year}`)
    }

    getDateForNow()
    getUserDetail()
    getUserProfilePicture()
  }, [])

  const popover = (
    <Popover id="popover-basic" className='add-box-shadow bg-transparent rounded-4 '>
      <div className='overflow-hidden overlay-bg-custom-color rounded-4 '>
        <SlideLeft>
          <Popover.Body className='d-flex flex-column p-2' style={{ width: "150px" }}>
            <div className='text-dark text-decoration-none bi bi-person link-hover cursor-pointer' onClick={() => {visitStafProfileByAdmin(getLocalData.id)}}> Profile</div>
            <Link className='text-dark text-decoration-none bi bi-palette link-hover' onMouseEnter={() => { setOpenCollapse(true) }} onMouseLeave={() => { setOpenCollapse(false) }}> Tema
              <Collapse in={openCollapse}>
                <div id="example-collapse-text" className='mt-1'>
                  <p className='bi bi-caret-right m-0 p-1 rounded-2 sub-menu-hover' onClick={() => { setThemeChanger("normal") }}> Normal</p>
                  <p className='bi bi-caret-right m-0 p-1 rounded-2 sub-menu-hover' onClick={() => { setThemeChanger("gradasi") }}> Gradasi</p>
                </div>
              </Collapse>
            </Link>
          </Popover.Body>
          <hr className='mx-2 my-0 p-0' />
        </SlideLeft>
        <BottomToTop>
          <Popover.Body className='d-flex flex-column p-2'>
            <span className='text-dark text-decoration-none p-0 m-0 d-flex justify-content-center' onClick={() => { logOut() }}> <Button variant='outline-danger bi bi-box-arrow-in-left m-2 ' > Logout</Button></span>
          </Popover.Body>
        </BottomToTop>
      </div>
    </Popover>
  )


  return (
    <div className={` ${ThemingCangerFunc().gradient} add-item-shadow rounded-4 p-3 d-flex justify-content-between`} style={ThemingCangerFunc("white").style} >
      <LeftToRight>
        <div>
          <h2 className='fw-bold m-0 p-0'>Dashboard</h2>
          <p className='text-secondary m-0 p-0'>{dateNow}</p>
        </div>
      </LeftToRight>
      <div className='dh-name-container'>
        {
          !!userDatas.id
            ?
            <h6 className='text-secondary mt-0 text-uppercase'>{`${userDatas.first_name} ${userDatas.last_name} (${userDatas.role})`}</h6>
            :
            <div style={{ width: "200px" }}>
              <Placeholder as="h6" animation="glow">
                <Placeholder xs={10} />
              </Placeholder>
            </div>
        }
      </div>
      <RightToLeft>
        <OverlayTrigger trigger="click" placement="auto-start" overlay={popover} rootClose={true} >
          <div className='bg-light d-flex justify-content-center align-items-center' style={{ height: "40px", width: "40px", borderRadius: "100%", border: "solid grey 2px", cursor: "pointer", overflow: "hidden" }}>
            {
              imageData !== "no picture" && imageData !== null
                ?
                (<img src={src} style={{ height: "100%", width: "100%", objectFit: "cover" }} alt=" " />)
                :
                imageData === "no picture"
                  ?
                  (<span className='bi bi-person-fill h3 m-0 p-0 text-secondary' />)
                  :
                  (<Spinner size="md" animation="border" variant="secondary" />)
            }
          </div>
        </OverlayTrigger>
      </RightToLeft>
    </div >
  )
}

export default DashboardHeader