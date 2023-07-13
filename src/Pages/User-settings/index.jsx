import React from 'react'
import ThemingCangerFunc from '../../Theme'
import { Button, Container, Tab, Tabs } from 'react-bootstrap'
import AttendanceRules from './Components/Attendance-rules'
import UserManagement from './Components/User-management'
import { SlideLeft } from '../../Page-transition/PageTransitions'
import PersonalLeave from './Components/Personal-leave'
import Permission from './Components/Permission'


const UserSettings = () => {
  return (
    <SlideLeft>
      <Container className={` ${ThemingCangerFunc().gradient} add-box-shadow p-3 rounded-4 overflow-hidden d-flex justify-content-center flex-column gap-4`} style={ThemingCangerFunc("white").style} >
        <div style={{ minHeight: "850px" }}>
          <Tabs
            defaultActiveKey="attendance_rules"
            className="mb-3 ">
            <Tab eventKey="attendance_rules" title="Aturan absen">
              <AttendanceRules />
            </Tab>
            <Tab eventKey="personal_leave" title="Ajukan cuti">
              <PersonalLeave />
            </Tab>
            <Tab eventKey="permission" title="Ajukan izin">
              <Permission />
            </Tab>
            <Tab eventKey="user_manager" title="User">
              <UserManagement />
            </Tab>
          </Tabs>
        </div>
      </Container>
    </SlideLeft>
  )
}

export default UserSettings
