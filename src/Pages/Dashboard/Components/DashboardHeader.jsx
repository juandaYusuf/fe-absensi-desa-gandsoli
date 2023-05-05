import React from 'react'
import { LeftToRight, RightToLeft, BottomToTop } from '../../../Page-transition/ComponentTransitions'
import pegawaiDesa from '../../../Assets/Logo/1.jpg'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { SlideLeft } from '../../../Page-transition/PageTransitions'
import { useNavigate } from 'react-router-dom'

const DashboardHeader = () => {

  const navigateTo = useNavigate()
  const logOut = () => {
    localStorage.clear()
    navigateTo('/')
  }


  const popover = (
    <Popover id="popover-basic" className='add-box-shadow' style={{ borderTop: "solid 2px white", borderBottom: "solid 1px lightgrey", borderLeft: "solid 2px whitesmoke", borderRight: "solid 2px whitesmoke" }}>
      <div className='overflow-hidden'>
        <Popover.Header as="h2" className='fw-bold '>Profile Menu</Popover.Header>
        <SlideLeft>
          <Popover.Body className='d-flex flex-column p-2'>
            <Link className='text-dark text-decoration-none bi bi-person link-hover'> Profile</Link>
            <Link className='text-dark text-decoration-none bi bi-gear link-hover'> Setting</Link>
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
  );

  return (
    <div className='add-item-shadow bg-custom-gradient-color rounded-4 p-3 d-flex justify-content-between' style={{ borderTop: "solid 2px white", borderBottom: "solid 1px lightgrey", borderLeft: "solid 2px whitesmoke", borderRight: "solid 2px whitesmoke" }} >
      <LeftToRight>
        <div>
          <h2 className='fw-bold m-0 p-0'>Dashboard</h2>
          <p className='text-secondary m-0 p-0'>06 April 2023</p>
        </div>
      </LeftToRight>
      <h6 className='text-secondary mt-2'>{"Maman abdurahman (admin)"}</h6>
      <RightToLeft>
        <OverlayTrigger trigger="click" placement="auto-start" overlay={popover} rootClose={true} >
          <img src={pegawaiDesa} style={{ height: "40px", width: "40px", borderRadius: "100%", border: "solid grey 2px", cursor: "pointer" }} alt=" " />
        </OverlayTrigger>
      </RightToLeft>
    </div >
  )
}

export default DashboardHeader