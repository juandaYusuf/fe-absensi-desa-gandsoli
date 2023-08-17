import React, { useContext, useEffect, useState } from 'react'
import ThemingCangerFunc from '../../Theme'
import { Card, Container } from 'react-bootstrap'
import UserManagement from './Components/User-management'
import PersonalLeave from './Components/Personal-leave'
import Permission from './Components/Permission'
import AttendanceRules from './Components/Attendance-rules'
import Generator from './Components/Generator'
import SickUser from './Components/SickUser'
import ApplyForPermission from './Components/Apply-for-permission'
import AgreementPermission from './Components/Agreement-permission'
import ApplyForPersonalLeave from './Components/Apply-for-personal-leave'




const Attendance = () => {

  const localData = JSON.parse(localStorage.getItem('obj'))
  const [menuIsActivate, setMenuIsActivate] = useState("")


  useEffect(() => {
    if (localData.role === 'Kepala Desa'){
      setMenuIsActivate('agreement-permission')
    }else if (localData.role === 'master'){
      setMenuIsActivate('rule')
    }else{
      setMenuIsActivate('leave')
    }
  }, [])
  


  return (
    <Container className={` ${ThemingCangerFunc().gradient} add-item-shadow rounded-4 p-0 overflow-hidden d-flex flex-column`} style={ThemingCangerFunc("white").style} >
      <div style={{ minHeight: "100vh" }}>
        <div className='p-4 d-flex justify-content-center gap-3'>
          {
            localData.role !== 'master'
              ?
              localData.role === 'Kepala Desa'
                ?
                <>
                  <Card
                    className={`${menuIsActivate === 'agreement-permission' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
                    style={{ width: '18rem' }}
                    onClick={() => { setMenuIsActivate('agreement-permission') }}>
                    <Card.Body className='d-flex justify-content-center'>
                      <Card.Title className='bi bi-prescription2 fs-6 fw-bold'> Persetujuan izin</Card.Title>
                    </Card.Body>
                  </Card>
                  <Card
                    className={`${menuIsActivate === 'agreement-leave' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
                    style={{ width: '18rem' }}
                    onClick={() => { setMenuIsActivate('agreement-leave') }}>
                    <Card.Body className='d-flex justify-content-center'>
                      <Card.Title className='bi bi-prescription2 fs-6 fw-bold'> Persetujuan cuti</Card.Title>
                    </Card.Body>
                  </Card>
                </>
                :
                <>
                  <Card
                    className={`${menuIsActivate === 'leave' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
                    style={{ width: '18rem' }}
                    onClick={() => { setMenuIsActivate('leave') }}>
                    <Card.Body className='d-flex justify-content-center '>
                      <Card.Title className='bi bi-door-open fs-6 fw-bold'> Pengajuan cuti</Card.Title>
                    </Card.Body>
                  </Card>
                  <Card
                    className={`${menuIsActivate === 'permission' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
                    style={{ width: '18rem' }}
                    onClick={() => { setMenuIsActivate('permission') }}>
                    <Card.Body className='d-flex justify-content-center '>
                      <Card.Title className='bi bi-arrow-up-left fs-6 fw-bold'> Pengajuan izin</Card.Title>
                    </Card.Body>
                  </Card>
                </>
              :
              <>
                <Card
                  className={`${menuIsActivate === 'rule' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
                  style={{ width: '18rem' }}
                  onClick={() => { setMenuIsActivate('rule') }}>
                  <Card.Body className='d-flex justify-content-center'>
                    <Card.Title className='bi bi-file-ruled fs-6 fw-bold'> Aturan absensi</Card.Title>
                  </Card.Body>
                </Card>

                <Card
                  className={`${menuIsActivate === 'user' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
                  style={{ width: '18rem' }}
                  onClick={() => { setMenuIsActivate('user') }}>
                  <Card.Body className='d-flex justify-content-center '>
                    <Card.Title className='bi bi-person-fill-gear fs-6 fw-bold'> Pengguna</Card.Title>
                  </Card.Body>
                </Card>

                <Card
                  className={`${menuIsActivate === 'generator' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
                  style={{ width: '18rem' }}
                  onClick={() => { setMenuIsActivate('generator') }}>
                  <Card.Body className='d-flex justify-content-center '>
                    <Card.Title className='bi bi-person-fill-gear fs-6 fw-bold'> Qr Generator</Card.Title>
                  </Card.Body>
                </Card>

                <Card
                  className={`${menuIsActivate === 'sick' && 'default-card-menu-gradient'}  add-item-shadow rounded-4 cursor-pointer card-menu-gradient`}
                  style={{ width: '18rem' }}
                  onClick={() => { setMenuIsActivate('sick') }}>
                  <Card.Body className='d-flex justify-content-center'>
                    <Card.Title className='bi bi-prescription2 fs-6 fw-bold'> Perizinan sakit</Card.Title>
                  </Card.Body>
                </Card>
              </>
          }


        </div>
        {
          menuIsActivate === "rule"
            ?
            <AttendanceRules />
            :
            menuIsActivate === "leave"
              ?
              <ApplyForPersonalLeave />
              :
              menuIsActivate === "permission"
                ?
                <ApplyForPermission />
                :
                menuIsActivate === "user"
                  ?
                  <UserManagement />
                  :
                  menuIsActivate === "generator"
                    ?
                    <Generator />
                    :
                    menuIsActivate === "sick"
                    ?
                    <SickUser />
                    :
                    menuIsActivate === "agreement-permission"
                    &&
                    <AgreementPermission/>
        }
      </div>

    </Container>
  )
}

export default Attendance
