import React from 'react'
import { Card } from 'react-bootstrap'
import { BottomToTop, RightToLeft } from '../../../Page-transition/ComponentTransitions'
import pegawaiDesa from '../../../Assets/Logo/1.jpg'
import ThemingCangerFunc from '../../../Theme'


const PresentStatistic = () => {
  return (
    <div className='present-container'>
      <RightToLeft>
        <div className='d-flex gap-2 h-100'>
          <Card className={`${ThemingCangerFunc().gradient} w-100 add-item-shadow  p-3 rounded-4 mt-3 d-flex justify-content-center align-items-center`} style={ThemingCangerFunc("LightGreen ").style}>
            <h1 className='fw-bold  m-0 p-0'>25</h1>
            <span className=' fw-bold h4'>Hadir</span>
          </Card>
          <Card className={`${ThemingCangerFunc().gradient} w-100 add-item-shadow  p-3 rounded-4 mt-3 d-flex justify-content-center align-items-center`} style={ThemingCangerFunc("Gold").style}>
            <h1 className='fw-bold  m-0 p-0'>25</h1>
            <span className=' fw-bold h4'>Izin</span>
          </Card>
        </div>
      </RightToLeft>
      <BottomToTop>
        <div className='alpha-container'>
          <Card className={`${ThemingCangerFunc().gradient} add-item-shadow w-100 h-100 p-3 rounded-4 mt-3 d-flex justify-content-center align-items-center`} style={ThemingCangerFunc("Tomato").style}>
            <h1 className='fw-bold  m-0 p-0'>25</h1>
            <span className=' fw-bold h4'>Alpha</span>
          </Card>
        </div>
      </BottomToTop>
      <BottomToTop>
        <Card className={`${ThemingCangerFunc().gradient} add-item-shadow hide-scrollbar overflow-scroll p-3 rounded-4 mt-3 d-flex align-items-center`} style={ThemingCangerFunc("light").style}>
          <h3 className='w-100'>Daftar staf</h3>
          <div style={{ width: "100%", height: "208px" }}>
            {
              [1, 2, 4, 5, 6, 7, 8, 9].map((result) => (
                <div className='cursor-pointer list-shadow w-100 my-1 p-2 rounded-4 d-flex align-items-center gap-2 border-2' style={{ borderTop: "solid 2px white", borderBottom: "solid 1px lightgrey", borderLeft: "solid 2px whitesmoke", borderRight: "solid 2px whitesmoke", backgroundColor: "LavenderBlush" }}>
                  <img src={pegawaiDesa} style={{ height: "40px", width: "40px", borderRadius: "100%" }} alt=" " />
                  <span className='w-100 fw-bold'>Sukarni ijah</span>
                  <p className='text-end w-100 fw-light m-0 p-0'>Jabatan</p>
                </div>
              )
              )
            }
            <br/>
          </div>
        </Card>
      </BottomToTop>

    </div>
  )
}

export default PresentStatistic