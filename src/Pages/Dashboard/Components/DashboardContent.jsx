import React, { useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { TopToBottom } from '../../../Page-transition/ComponentTransitions'
import DashboardHeader from './DashboardHeader'
import PresentStatistic from './PresentStatistic'
import TablePresentHistory from './TablePresentHistory'
import ThemingCangerFunc from '../../../Theme'


const DashboardContent = () => {

  const [stafName, setStafName] = useState("")
  

  return (
    <Container className='bg-transparent rounded-4 p-0'>
      <DashboardHeader />
      <div className='dashboard-content-container'>
        <div className='w-100'>
          <TopToBottom>
            <Card className={`${ThemingCangerFunc().gradient} add-item-shadow p-3 rounded-4 mt-3 d-flex justify-content-center w-100`} style={ThemingCangerFunc("DarkOrange").style}>
              <h3 className='fw-bold text-dark'>Absensi <span className='bi bi-caret-right-fill' />  {stafName}</h3>
            </Card>
          </TopToBottom>
          <br />
          <TablePresentHistory name={setStafName} />
        </div>
        <PresentStatistic />
      </div>
    </Container>
  )
}

export default DashboardContent