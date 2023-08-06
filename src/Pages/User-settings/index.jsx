import React from 'react'
import ThemingCangerFunc from '../../Theme'
import { Container, } from 'react-bootstrap'
import { SlideLeft } from '../../Page-transition/PageTransitions'



const UserSettings = () => {
  return (
    <SlideLeft>
      <Container className={` ${ThemingCangerFunc().gradient} add-box-shadow p-3 rounded-4 overflow-hidden d-flex justify-content-center flex-column gap-4`} style={ThemingCangerFunc("white").style} >
        <div style={{ minHeight: "850px" }}>
          <h1>Pengaturan</h1>
        </div>
      </Container>
    </SlideLeft>
  )
}

export default UserSettings
