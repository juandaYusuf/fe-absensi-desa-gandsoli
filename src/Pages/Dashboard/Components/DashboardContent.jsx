import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { TopToBottom } from '../../../Page-transition/ComponentTransitions'
import DashboardHeader from './DashboardHeader'
import PresentStatistic from './PresentStatistic'
import TablePresentHistory from './TablePresentHistory'

const DashboardContent = () => {
    return (
        <Container className='add-box-shadow p-3 bg-light rounded-4 overflow-hidden'>
            <DashboardHeader />
            <div className='dashboard-content-container'>
                <div className='w-100'>
                    <TopToBottom>
                        <Card className='add-item-shadow p-3 rounded-4 mt-3 d-flex justify-content-center w-100' style={{ backgroundColor: "darkorange", border: "solid 2px lightgrey" }}>
                            <h2 className='fw-bold text-light'>Absensi Staf Desa</h2>
                        </Card>
                    </TopToBottom>
                    <hr />
                    <TablePresentHistory />
                </div>
                <PresentStatistic />
            </div>
        </Container>
    )
}

export default DashboardContent