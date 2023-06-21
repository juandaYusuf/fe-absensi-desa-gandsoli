import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Collapse, Container, Form, InputGroup, Spinner, Table } from 'react-bootstrap'
import CardAttendanceRules from '../../../Global-components/Card-attendance-rules'
import axios from 'axios'
import API_URL from '../../../API/API_URL'
import UserContext from '../../../Context/Context'



const AttendanceRules = () => {

  const [attendanceRulesDatas, setAttendanceRulesDatas] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { contextRefreshDraftList } = useContext(UserContext)
  const [lengthOfTitleChar, setLengthOfTitleChar] = useState(0)
  const [alert, setAlert] = useState(false)
  const [showAlerIfItemNoOneEnable, setshowAlerIfItemNoOneEnable] = useState(false)
  const [showTableInItemNoOneEnableAlert, setshowTableInItemNoOneEnableAlert] = useState(false)
  // const hasTrueValue = data.some(item => item.usage === true);


  const insertAttendanceRulsData = (e) => {
    setIsLoading(true)
    e.preventDefault()
    const url = API_URL().ATTENDANCE_RULES.ADD_ALL_ATTENDANCE_RULES
    const datas = {
      "title": e.target.title.value,
      "work_start_time": e.target.work_start_time.value,
      "work_times_up": e.target.work_times_up.value,
      "late_deadline": e.target.late_deadline.value,
      "description": e.target.description.value
    }

    if (e.target.work_start_time.value.length <= 0
      || e.target.work_times_up.value <= 0
      || e.target.late_deadline.value <= 0
      || e.target.description.value <= 0
      || lengthOfTitleChar > 15) {
      setAlert(true)
      setIsLoading(false)
    } else {
      setAlert(false)
      axios.post(url, datas).then((response) => {
        e.target.reset()
        setLengthOfTitleChar(0)
        setIsLoading(false)
      })
    }

  }



  useEffect(() => {
    const showAllAttendanceRulesDatas = () => {
      const url = API_URL().ATTENDANCE_RULES.SHOW_ALL_ATTENDANCE_RULES
      axios.get(url).then((response) => {
        setAttendanceRulesDatas(response.data)
      })
    }

    showAllAttendanceRulesDatas()
  }, [isLoading, contextRefreshDraftList])

  useEffect(() => {
    setshowAlerIfItemNoOneEnable(attendanceRulesDatas.some(item => item.usage === true))
  }, [attendanceRulesDatas])



  return (
    <div className='border add-item-shadow p-3 rounded-4'>


      <div className="d-flex gap-2">
        <div className='p-2 w-50 overflow-hidden'>

          <Form onSubmit={insertAttendanceRulsData}>
            <h3>Aturan absensi</h3>

            <Form.Group
              className="mb-3 add-item"
              controlId="title">
              <Form.Label
                className='bi bi-clipboard2-minus'> Judul aturan
              </Form.Label>
              <InputGroup className='add-item-shadow rounded-4'>
                <Form.Control
                  aria-describedby="basic-addon2"
                  placeholder="Masukan judul aturan"
                  type="text"
                  style={{ borderRadius: '15px 0px 0px 15px' }}
                  onChange={(e) => { setLengthOfTitleChar(e.target.value.length) }}
                />
                <InputGroup.Text
                  style={{ borderRadius: '0px 15px 15px 0px' }}
                  className='text-muted'>
                  <span className={`${lengthOfTitleChar > 15 && "text-danger"}`}>
                    {lengthOfTitleChar}/15
                  </span>
                </InputGroup.Text>
              </InputGroup>
              {
                lengthOfTitleChar > 15
                &&
                <Form.Text className='m-0 p-0 text-danger'>Judul tidak boleh lebih dari 15 karakter ! </Form.Text>
              }
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="work_start_time">
              <Form.Label
                className='bi bi-clock-fill'> Jam masuk
              </Form.Label>
              <Form.Control
                className='rounded-4 add-item-shadow'
                type="time" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="work_times_up">
              <Form.Label
                className='bi bi-clock'> Jam keluar
              </Form.Label>
              <Form.Control
                className='rounded-4 add-item-shadow'
                type="time" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="late_deadline">
              <Form.Label
                className='bi bi-clock-history'> Batas terlambat
              </Form.Label>
              <Form.Select
                className='add-item-shadow rounded-4'
                aria-label="Default select example">
                <option>Pilih batas keterlambatan</option>
                <option value="10">10 menit</option>
                <option value="20">20 menit</option>
                <option value="30">30 menit</option>
                <option value="40">40 menit</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              controlId="description">
              <Form.Label
                className='bi bi-journal-text'> Deskripsi
              </Form.Label>
              <Form.Control
                className='add-item-shadow rounded-4'
                type="text"
                placeholder="Deskripsi" />
            </Form.Group>
            {
              !!alert
              &&
              <Form.Text className='text-danger'>Tidak boleh ada form yang kosong</Form.Text>
            }
            <Button
              className='w-100 rounded-4 add-item-shadow-success mt-3'
              type='submit'
              disabled={!!isLoading ? true : false}
              variant="success">
              <span className='bi bi-clipboard-plus mx-1' />
              {
                !!isLoading
                &&
                (<Spinner className='mx-2' variant='light' size='sm' />)
              }
              Tambahkan item aturan
            </Button>
          </Form>

        </div>
        <Container
          className='d-flex flex-wrap w-100 gap-2'
          style={{ height: "540px", overflowY: "auto" }}>
          {
            attendanceRulesDatas.length > 0
            &&
            <Collapse in={!showAlerIfItemNoOneEnable}>
              <div className='w-100'>
                <Alert
                  className=' w-100 rounded-4 p-2 d-flex align-items-center  flex-column'
                  variant='warning'
                  style={{ margin: "0px 0px 0px 7px" }}>
                  <Alert.Heading className='bi bi-info-circle '> Info</Alert.Heading>
                  <div className='m-0 p-0'>
                    <span>Tidak ada aturan yang di aktifkan, Sistem menjalankan aturan default</span>
                    <span className={`${!!showTableInItemNoOneEnableAlert ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} mx-2 cursor-pointer text-secondary`} onClick={() => { setshowTableInItemNoOneEnableAlert(!showTableInItemNoOneEnableAlert) }} />
                  </div>
                  <Collapse in={showTableInItemNoOneEnableAlert}>
                    <div>
                      <table className=''>
                        <tbody>
                          <tr>
                            <td className='bi bi-clock-fill fw-bold'> Jam masuk</td>
                            <td className='px-2'> :</td>
                            <td> 7:00:00</td>
                          </tr>
                          <tr>
                            <td className='bi bi-clock fw-bold'> Jam keluar</td>
                            <td className='px-2'> :</td>
                            <td> 15:00:00</td>
                          </tr>
                          <tr>
                            <td className='bi bi-clock-history fw-bold'> Keterlambatan</td>
                            <td className='px-2'> :</td>
                            <td> 30 menit</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Collapse>
                </Alert>
              </div>
            </Collapse>
          }
          {
            attendanceRulesDatas.map((result) => {
              return (
                <CardAttendanceRules
                  key={result.id}
                  show_action={true}
                  draft_id={result.id}
                  title={result.title}
                  work_start_time={result.work_start_time}
                  work_times_up={result.work_times_up}
                  late_deadline={result.late_deadline}
                  description={result.description}
                  usage={result.usage}
                  created_at={result.created_at} />)
            })
          }
          {attendanceRulesDatas.length <= 0
            &&
            <div
              className='w-100 rounded-4 d-flex align-items-center justify-content-center flex-column text-muted'
              style={{ marginLeft: "17px" }}>
              <span className="bi bi-journal-x h1 m-0 p-0" />
              Tidak ada item ! Sistem menjalankan aturan default
              <table className='mt-2'>
                <tbody>
                  <tr>
                    <td className='bi bi-clock-fill fw-bold'> Jam masuk</td>
                    <td className='px-2'> :</td>
                    <td> 7:00:00</td>
                  </tr>
                  <tr>
                    <td className='bi bi-clock fw-bold'> Jam keluar</td>
                    <td className='px-2'> :</td>
                    <td> 15:00:00</td>
                  </tr>
                  <tr>
                    <td className='bi bi-clock-history fw-bold'> Keterlambatan</td>
                    <td className='px-2'> :</td>
                    <td> 30 menit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </Container>

      </div>
    </div >
  )
}

export default AttendanceRules
