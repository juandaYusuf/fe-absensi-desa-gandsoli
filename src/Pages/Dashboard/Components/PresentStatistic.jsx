import React, { useContext } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import { BottomToTop, LeftToRight, RightToLeft, TopToBottom } from '../../../Page-transition/ComponentTransitions'
import ThemingCangerFunc from '../../../Theme'
import CardListOfUser from './Card-list-of-user'
import UserContext from '../../../Context/Context'




const PresentStatistic = ({ month, year }) => {

  const { contextPresenceCounter, contextPresenceCounterIsLoading } = useContext(UserContext)

  return (
    <div className='present-container'>
      <RightToLeft>
        <div className='d-flex gap-2 h-100'>
          <Card className={`${ThemingCangerFunc().gradient} overflow-hidden w-100 add-item-shadow  p-2 rounded-4 mt-3 d-flex justify-content-center align-items-center`} style={ThemingCangerFunc("LightGreen").style}>
            <div className='d-flex justify-content-center flex-column align-items-center' style={{ height: "100px" }}>
              {
                Object.keys(contextPresenceCounter).length === 0
                  ?
                  (<BottomToTop>
                    <div className='w-100 h-100 my-3'>
                      <p className='bi bi-check-circle-fill w-100 text-center text-success h6 p-0 m-0' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} />
                      <p className=' w-100 text-center' style={{ fontSize: ".8rem" }}>Pilih nama pada tabel untuk menampilkan <b>kehadiran</b></p>
                    </div>
                  </BottomToTop>)
                  :
                  (<>
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "52px" }}>
                      <TopToBottom>
                        <h1 className='fw-bold  m-0 p-0'>{contextPresenceCounter.total_hadir}</h1>
                      </TopToBottom>
                    </div>
                    <BottomToTop>
                      <p className=' fw-bold h4 m-0 p-0 text-center'>Hadir</p>
                      <p style={{ fontSize: "0.8rem" }}>{month} - {year}</p>
                    </BottomToTop>
                  </>)
              }
            </div>
          </Card>
          <Card className={`${ThemingCangerFunc().gradient} overflow-hidden w-100 add-item-shadow  p-2 rounded-4 mt-3 d-flex justify-content-center align-items-center`} style={ThemingCangerFunc("#FFFF66").style}>
            <div className='d-flex justify-content-center flex-column align-items-center' style={{ height: "100px" }}>
              {
                Object.keys(contextPresenceCounter).length === 0
                  ?
                  (<BottomToTop>
                    <div className='w-100 h-100'>
                      <p className='bi bi-arrow-up-left-circle-fill w-100 text-center text-warning h6  p-0 m-0' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} />
                      <p className=' w-100 text-center' style={{ fontSize: ".8rem" }}>Pilih nama pada tabel untuk menampilkan <b>izin</b></p>
                    </div>
                  </BottomToTop>
                  )
                  :
                  (<>
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "52px" }}>
                      <TopToBottom>
                        <h1 className='fw-bold  m-0 p-0'>{contextPresenceCounter.total_izin}</h1>
                      </TopToBottom>
                    </div>
                    <BottomToTop>
                      <p className=' fw-bold h4 m-0 p-0 text-center'>Izin</p>
                      <p style={{ fontSize: "0.8rem" }}>{month} - {year}</p>
                    </BottomToTop>
                  </>)
              }
            </div>
          </Card>
        </div>
      </RightToLeft>
      <BottomToTop>
        <div className='alpha-container'>
          <Card className={`${ThemingCangerFunc().gradient} overflow-hidden add-item-shadow w-100 h-100 p-3 rounded-4 mt-3 d-flex justify-content-center align-items-center`} style={ThemingCangerFunc("#ff8a75").style}>
            <div className='d-flex justify-content-center flex-column align-items-center' style={{ height: "100px" }}>
              {
                Object.keys(contextPresenceCounter).length === 0
                  ?
                  (<BottomToTop>
                    <div className='w-100 h-100 my-3'>
                      <p className='bi bi-x-circle-fill w-100 text-center text-danger h6 p-0 m-0' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} />
                      <p className=' w-100 text-center'>Pilih nama pada tabel untuk menampilkan <b>Alfa</b></p>
                    </div>
                  </BottomToTop>)
                  :
                  (<>
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "52px" }}>
                      <TopToBottom>
                        <h1 className='fw-bold  m-0 p-0'>{contextPresenceCounter.total_alfa}</h1>
                      </TopToBottom>
                    </div>
                    <BottomToTop>
                      <p className=' fw-bold h4 m-0 p-0 text-center'>Alfa</p>
                      <p style={{ fontSize: "0.8rem" }}>{month} - {year}</p>
                    </BottomToTop>
                  </>)
              }
            </div>
          </Card>
        </div>
      </BottomToTop>
      <BottomToTop>
        <CardListOfUser />
      </BottomToTop>

    </div>
  )
}

export default PresentStatistic