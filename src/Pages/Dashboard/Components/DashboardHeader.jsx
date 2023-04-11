import React from 'react'
import { LeftToRight, TopToBottom, RightToLeft } from '../../../Page-transition/ComponentTransitions'
import pegawaiDesa from '../../../Assets/Logo/1.jpg'
const DashboardHeader = () => {
    return (
        <div className='d-flex justify-content-between'>
            <LeftToRight>
                <div>
                    <h2 className='fw-bold m-0 p-0'>Dashboard</h2>
                    <p className='text-secondary m-0 p-0'>06 April 2023</p>
                </div>
            </LeftToRight>
            <TopToBottom>
                <p className='text-secondary'>Dashboard - staf pengelola absensi</p>
            </TopToBottom>
            <RightToLeft>
                <img src={pegawaiDesa} style={{ height: "40px", width: "40px", borderRadius: "100%", border: "solid grey 2px" }} alt=" " />
            </RightToLeft>
        </div>
    )
}

export default DashboardHeader