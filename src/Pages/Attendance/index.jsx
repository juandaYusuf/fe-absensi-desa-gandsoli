import React, { useContext, useEffect, useState } from 'react'
import ThemingCangerFunc from '../../Theme'
import { Card, Container } from 'react-bootstrap'
import UserManagement from './Components/User-management'
import PersonalLeave from './Components/Personal-leave'
import Permission from './Components/Permission'
import AttendanceRules from './Components/Attendance-rules'
import Generator from './Components/Generator'




const Attendance = () => {

  const [menuIsActivate, setMenuIsActivate] = useState("rule")



  return (
    <Container className={` ${ThemingCangerFunc().gradient} add-item-shadow rounded-4 p-0 overflow-hidden d-flex flex-column`} style={ThemingCangerFunc("white").style} >
      <div style={{ minHeight: "100vh" }}>
        <div className='p-4 d-flex justify-content-center gap-3'>
          <Card
            className={`${menuIsActivate === 'rule' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
            style={{ width: '18rem' }}
            onClick={() => { setMenuIsActivate('rule') }}>
            <Card.Body className='d-flex justify-content-center'>
              <Card.Title className='bi bi-file-ruled'> Aturan absensi</Card.Title>
            </Card.Body>
          </Card>

          <Card
            className={`${menuIsActivate === 'leave' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
            style={{ width: '18rem' }}
            onClick={() => { setMenuIsActivate('leave') }}>
            <Card.Body className='d-flex justify-content-center'>
              <Card.Title className='bi bi-door-open'> Pengajuan cuti</Card.Title>
            </Card.Body>
          </Card>

          <Card
            className={`${menuIsActivate === 'permission' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
            style={{ width: '18rem' }}
            onClick={() => { setMenuIsActivate('permission') }}>
            <Card.Body className='d-flex justify-content-center'>
              <Card.Title className='bi bi-arrow-up-left'> Pengajuan izin</Card.Title>
            </Card.Body>
          </Card>

          <Card
            className={`${menuIsActivate === 'user' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
            style={{ width: '18rem' }}
            onClick={() => { setMenuIsActivate('user') }}>
            <Card.Body className='d-flex justify-content-center'>
              <Card.Title className='bi bi-person-fill-gear'> Pengguna</Card.Title>
            </Card.Body>
          </Card>

          <Card
            className={`${menuIsActivate === 'generator' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
            style={{ width: '18rem' }}
            onClick={() => { setMenuIsActivate('generator') }}>
            <Card.Body className='d-flex justify-content-center'>
              <Card.Title className='bi bi-person-fill-gear'> Qr Generator</Card.Title>
            </Card.Body>
          </Card>
        </div>
        {
          menuIsActivate === "rule"
            ?
            <AttendanceRules />
            :
            menuIsActivate === "leave"
              ?
              <PersonalLeave />
              :
              menuIsActivate === "permission"
                ?
                <Permission />
                :
                menuIsActivate === "user"
                  ?
                  <UserManagement />
                  :
                  menuIsActivate === "generator"
                  &&
                  <Generator />
        }
      </div>

    </Container>
  )
}

export default Attendance
