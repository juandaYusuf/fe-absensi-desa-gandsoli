import React, { useContext, useState } from 'react'
import { Card, Container, Form, InputGroup, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'
import { TopToBottom } from '../../../Page-transition/ComponentTransitions'
import DashboardHeader from './DashboardHeader'
import PresentStatistic from './PresentStatistic'
import TablePresentHistory from './TablePresentHistory'
import ThemingCangerFunc from '../../../Theme'
import AttendanceTable from '../../../Global-components/AttendanceTable'
import UserContext from '../../../Context/Context'




const DashboardContent = () => {

  const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  const date = new Date()
  const currentMonth = date.getMonth()
  const currentYear = new Date().getFullYear()
  const yearOptions = []
  const [indexOfMonth, setIndexOfMonth] = useState(currentMonth)
  const [valueOfYear, setValueOfYear] = useState(currentYear)
  const { contextUserFullNameOfTable } = useContext(UserContext)

  const yearOptionValue = () => {
    for (let year = currentYear; year <= currentYear + 10; year++) {
      yearOptions.push(
        <option key={year} value={year}>
          {year}
        </option>
      )
    }
    return yearOptions
  }


  const popoverFormDate = (
    <Popover className='m-0 p-0 add-box-shadow bg-transparent rounded-4'>
      <Popover.Body className=' rounded-4 overlay-bg-custom-color'>
        Tabel dibawah menunjukan data berdasarkan bulan dan tahun yang dipilih
      </Popover.Body>
    </Popover>
  )

  const popoverTableMenus = (
    <Popover className='m-0 p-0 add-box-shadow bg-transparent rounded-4'>
      <Popover.Body className=' rounded-4 overlay-bg-custom-color'>
        <div>
          <p className='p-0 m-0'>Maksimalkan tabel</p>
        </div>
      </Popover.Body>
    </Popover>
  )

  return (
    <Container className='bg-transparent rounded-4 p-0'>
      <DashboardHeader />
      <div className='dashboard-content-container'>
        <div className='w-100'>
          <TopToBottom>
            <Card className={`${ThemingCangerFunc().gradient} add-item-shadow p-3 rounded-4 mt-3 d-flex justify-content-center w-100`} style={ThemingCangerFunc("DarkOrange").style}>
              <h3 className='fw-bold text-dark text-capitalize'>Absensi <span className='bi bi-caret-right-fill' /> {month[indexOfMonth]} - {valueOfYear}  <span className='bi bi-caret-right-fill' /> {contextUserFullNameOfTable} </h3>
            </Card>
          </TopToBottom>
          <br />
          <Card className={`${ThemingCangerFunc().gradient} add-item-shadow rounded-4 p-0 height-tabel-container overflow-hidden`} style={ThemingCangerFunc("white").style}>
            <h3 className='m-3 mb-2'>Riwayat Absensi</h3>

            <div className='mx-3 mb-2 d-flex justify-content-between'>
              <div>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 550, hide: 0 }}
                  overlay={popoverFormDate}
                >
                  {/* <Button variant="success">Hover me to see</Button> */}
                  <InputGroup className='overflow-hidden p-1' style={{ width: "300px", paddingRight: "4px"}}>
                    <InputGroup.Text style={{ borderRadius: '15px 0px 0px 15px', backgroundColor: "DarkSlateGrey", color: "white" }}><span className='bi bi-calendar-month h5 m-0 p-0' /> </InputGroup.Text>
                    <Form.Select aria-label="Default select example" onChange={((e) => { setIndexOfMonth(e.target.value) })} style={{backgroundColor: "cornsilk"}}>
                      <option value={currentMonth}>bulan</option>
                      {
                        month.map((result, i) => {
                          return (<option key={i} value={i} >{result}</option>)
                        })
                      }
                    </Form.Select>
                    <Form.Select style={{ borderRadius: '0px 15px 15px 0px', backgroundColor: "cornsilk"}} aria-label="Default select example" onChange={((e) => { setValueOfYear(e.target.value) })}>
                      <option value={currentYear}>Tahun</option>
                      {yearOptionValue()}
                    </Form.Select>
                  </InputGroup>
                </OverlayTrigger>
              </div>
              <div className='d-flex gap-2 px-4 mb-2 align-items-center border rounded-4' style={{ backgroundColor: "Cornsilk", height: "43px" }}>
                <span className='bi bi-x-circle-fill text-danger h6 p-0 m-0' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} />
                <p className='text-danger h5 p-0 m-0 fw-bold'>Alfa</p>
                <p className='text-muted h5 p-0 m-0 fw-bold'>|</p>
                <span className='bi bi-arrow-up-left-circle-fill text-warning h6  p-0 m-0' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} />
                <p className='text-warning h5 p-0 m-0 fw-bold'>Izin</p>
                <p className='text-muted h5 p-0 m-0 fw-bold'>|</p>
                <span className='bi bi-check-circle-fill text-success h6 p-0 m-0' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} />
                <p className='text-success h5 p-0 m-0 fw-bold'>Hadir</p>
              </div>
            </div>
            <div className='d-flex mx-3 justify-content-center border' style={{ borderBottom: "solid 1px lightgrey", width: "inherith", backgroundColor: "DarkSlateGrey", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
              <h2 className='bi bi-calendar2-week text-light text-uppercase my-1 w-100 text-center'> {month[indexOfMonth]} - {valueOfYear}</h2>
              <div style={{ height: "50px" }}>
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 1000, hide: 0 }}
                  rootClose={true}
                  overlay={popoverTableMenus}>
                  <span className='bi bi-arrows-fullscreen h6 cursor-pointer d-flex align-items-center justify-content-center w-100 h-100 m-0 text-right text-light' style={{ paddingRight: "20px" }} />
                </OverlayTrigger>
              </div>
            </div>

            <div className='hide-scrollbar mx-3' style={{ width: "850px" }}>
              <AttendanceTable year={valueOfYear} month={indexOfMonth} />
            </div>
          </Card>
        </div>
        <PresentStatistic month={month[indexOfMonth]} year={valueOfYear}/>
      </div>
    </Container>
  )
}

export default DashboardContent