import React, { useContext, useEffect, useState } from 'react'
import { Button, Collapse, Form, InputGroup, Spinner } from 'react-bootstrap'
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
  const [isFormShow, setIsFormShow] = useState(true)
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
    <div className='p-3 rounded-4'>
      <h3 className='bi bi-file-earmark-ruled'> Aturan absensi</h3>
      <div className="d-flex">
        <Button className={`p-1 me-2 add-item-shadow ${isFormShow ? 'bi bi-caret-left-fill': 'bi bi-caret-right-fill'}`} variant='dark' style={{height: "40px"}} onClick={() => setIsFormShow(prev => !prev)}/>
        <div className='d-flex flex-wrap gap-4'>
          <Collapse in={isFormShow} dimension="width">
            <div id="example-collapse-text" className='overflow-hidden'>
              <div className=' overflow-hidden' style={{ width: "400px" }}>
                <div>
                  <Form onSubmit={insertAttendanceRulsData} className='p-2' style={{ width: '400px' }}>
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
              </div>
            </div>
          </Collapse>
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
        </div>
      </div>
    </div >
  )
}

export default AttendanceRules
