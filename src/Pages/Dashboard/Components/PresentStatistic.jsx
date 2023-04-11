import React from 'react'
import { Card } from 'react-bootstrap'
import { BottomToTop, RightToLeft } from '../../../Page-transition/ComponentTransitions'

const PresentStatistic = () => {
    return (
        <div className='present-container'>
            <RightToLeft>
                <div className='d-flex gap-2 h-100'>
                    <Card className='add-item-shadow  p-3 rounded-4 mt-3 d-flex justify-content-center align-items-center' style={{ backgroundColor: "green", width: "100%", border: "solid 2px lightgrey" }}>
                        <h1 className='fw-bold text-light m-0 p-0'>25</h1>
                        <span className='text-light fw-bold h4'>Hadir</span>
                    </Card>
                    <Card className='add-item-shadow p-3 rounded-4 mt-3 d-flex justify-content-center align-items-center' style={{ backgroundColor: "orange", width: "100%", border: "solid 2px lightgrey" }}>
                        <h1 className='fw-bold text-light m-0 p-0'>25</h1>
                        <span className='text-light fw-bold h4'>Izin</span>
                    </Card>
                </div>
            </RightToLeft>
            <BottomToTop>
                <div className='alpha-container'>
                    <Card className='add-item-shadow p-3 rounded-4 mt-3 d-flex justify-content-center align-items-center' style={{ backgroundColor: "red", width: "100%", height: "100%", border: "solid 2px lightgrey" }}>
                        <h1 className='fw-bold text-light m-0 p-0'>25</h1>
                        <span className='text-light fw-bold h4'>Alpha</span>
                    </Card>
                </div>
            </BottomToTop>
        </div>
    )
}

export default PresentStatistic