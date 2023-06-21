import React from 'react'
import ThemingCangerFunc from '../../Theme'
import { Button, Container } from 'react-bootstrap'
import AttendanceRules from './Components/Attendance-rules'
import WorkingHours from './Components/Working-hours'
import { SlideLeft } from '../../Page-transition/PageTransitions'


const UserSettings = () => {
  return (
    <SlideLeft>
      <Container className={` ${ThemingCangerFunc().gradient} add-box-shadow p-3 rounded-4 overflow-hidden d-flex justify-content-center flex-column gap-4`} style={ThemingCangerFunc("white").style} >
        <AttendanceRules />
        <WorkingHours />
      </Container>
    </SlideLeft>
  )
}

export default UserSettings
