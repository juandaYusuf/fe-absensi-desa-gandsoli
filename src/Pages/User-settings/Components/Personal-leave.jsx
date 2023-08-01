import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Alert, Button, Card, Collapse, Form, Spinner, Table } from 'react-bootstrap'
import API_URL from '../../../API/API_URL'
import { BottomToTop, RightToLeft, TopToBottom } from '../../../Page-transition/ComponentTransitions'
import ProgresBarLoadingVisual from '../../../Global-components/Progres-bar-loading-visual'
import { ZoomOut } from '../../../Page-transition/PageTransitions'

const PersonalLeave = () => {
  const [validated, setValidated] = useState(false)
  const [userData, setuserData] = useState([])
  const [selectOptionValues, setselectOptionValues] = useState("default")
  const [isSubmissionPosted, setIsSubmissionPosted] = useState(false)
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false)
  const [submissionsPostedData, setsubmissionsPostedData] = useState({ "is_on_leave": false, "is_on_permission": true, "name": "", "start_date": "", "end_date": "" })
  const [personalLeaveDatas, setPersonalLeaveDatas] = useState([])
  const [isPersonalLeaveIsLoading, setIsPersonalLeaveIsLoading] = useState(true)
  const [refreshTablePersonalLeave, setrefreshTablePersonalLeave] = useState(false)
  const [isFormShow, setIsFormShow] = useState(true)


  const postSubmission = (user_id, start_date, end_date, descriptions) => {
    setIsSubmissionLoading(true)
    const url = API_URL().PERSONAL_LEAVE.ADD_SUBMISSION
    const data = {
      "user_id": user_id,
      "start_date": start_date,
      "end_date": end_date,
      "descriptions": descriptions
    }
    axios.post(url, data).then((response) => {
      if (response.data.message === "user is on permission") {
        setsubmissionsPostedData({
          "is_on_leave": false,
          "is_on_permission": true,
          "name": response.data.full_name,
          "start_date": response.data.start_date,
          "end_date": ""
        })
        setIsSubmissionPosted(true)
        setIsSubmissionLoading(false)
      } else if (response.data.message === "user is on paid leave") {
        setsubmissionsPostedData({
          "is_on_leave": true,
          "is_on_permission": false,
          "name": response.data.full_name,
          "start_date": response.data.start_date,
          "end_date": response.data.end_date,
        })
        setIsSubmissionPosted(true)
        setIsSubmissionLoading(false)
      } else {
        setsubmissionsPostedData({
          "is_on_leave": false,
          "is_on_permission": false,
          "name": `${response.data.first_name} ${response.data.last_name}`,
          "start_date": response.data.start_date,
          "end_date": response.data.end_date,
        })
        setIsSubmissionPosted(true)
        setIsSubmissionLoading(false)
        setrefreshTablePersonalLeave(prev => !prev)
      }
    })
  }


  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false || e.target.user_name.value === "default") {
      e.preventDefault()
      e.stopPropagation()
    } else {
      e.preventDefault()
      if (e.target.user_name.value !== "default") {
        postSubmission(
          e.target.user_name.value,
          e.target.start_date.value,
          e.target.end_date.value,
          e.target.description.value)
        e.target.reset()
      }
    }
    setValidated(true)
  }



  const tableBodyComponent = () => {
    return personalLeaveDatas.map((result, i) => {
      return (<tr key={i}>
        <td >{i + 1}</td>
        <td>
          {
            !!result.profile_picture
              ?
              (<img
                src={'data:image/jpeg;base64,' + result.profile_picture}
                className='rounded-circle border'
                style={{ height: "40px", width: "40px", objectFit: "cover" }} />)
              :
              (<div className='border d-flex justify-content-center rounded-circle align-item-end' style={{ height: "40px", width: "40px", backgroundColor: "#E9E9E9" }} >
                <span className='bi bi-person-fill m-0 p-0 text-secondary' style={{ fontSize: "1.6rem" }} />
              </div>)
          }
        </td>
        <td>{result.first_name} {result.last_name}</td>
        <td>{result.email}</td>
        <td>{result.no_telepon}</td>
        <td className='m-0 py-2 p-0'>
          <div className='d-flex align-items-center'>
            <div className='w-50 text-center d-flex align-items-center px-2 fw-bold' style={{ backgroundColor: "rgba(39, 245, 56, 0.15)" }}>{result.start_date}</div>
            <div className='w-50 text-center d-flex align-items-center px-2 fw-bold' style={{ backgroundColor: "rgba(241, 105, 0, 0.15)" }}>{result.end_date}</div>
          </div>
        </td>
        <td>{result.descriptions}</td>
      </tr>)
    })
  }



  useEffect(() => {

    const getMultiUserDatas = () => {
      const url = API_URL().USER.GET_MULTI_USER
      axios.get(url).then((response) => {
        setuserData(response.data)
      })
    }

    getMultiUserDatas()
  }, [])

  useEffect(() => {

    const getPersonalLeaveDatas = () => {
      setIsPersonalLeaveIsLoading(true)
      const url = API_URL().PERSONAL_LEAVE.GET_PERSONAL_LEAVE_DATAS
      axios.get(url).then((response) => {
        if (response.data) {
          setPersonalLeaveDatas(response.data)
          setIsPersonalLeaveIsLoading(false)
        }
      })
    }

    getPersonalLeaveDatas()
  }, [refreshTablePersonalLeave])


  return (
    <Card className='p-3 me-4 border-0 bg-transparent' style={{ minHeight: "400px" }}>
      <h3 className='bi bi-door-open'> Pengajuan cuti</h3>
      <div className='d-flex'>
        <div className='d-flex'>
          <Button className={`p-1 add-item-shadow ${isFormShow ? 'bi bi-caret-left-fill' : 'bi bi-caret-right-fill'}`} variant='dark' style={{ height: "40px" }} onClick={() => setIsFormShow(prev => !prev)} />
          <Collapse in={isFormShow} dimension="width">
            <div id="example-collapse-text" className='overflow-hidden'>
              <div className='p-3'>
                {
                  isSubmissionPosted === false
                    ?
                    <>
                      <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ width: "350px" }}>
                        <Form.Group md="4" controlId="user_name">
                          <Form.Label> <span className='bi bi-person' /> Pengaju</Form.Label>
                          <Form.Select className={`add-item-shadow rounded-4 ${selectOptionValues === "default" && 'text-muted'}`} onChange={(e) => setselectOptionValues(e.target.value)} defaultValue="default" isInvalid={selectOptionValues === "default" ? true : false}>
                            <option value='default' > Nama pengaju cuti</option>
                            {
                              userData.map((result, i) => {
                                return (
                                  <Fragment key={i}>
                                    <option value={result.id}>{result.first_name} {result.last_name}</option>
                                  </Fragment>
                                )
                              })
                            }
                          </Form.Select>
                          {
                            selectOptionValues === "default"
                            &&
                            <Form.Text className='text-danger'>Nama pengaju tidak boleh kosong</Form.Text>
                          }
                        </Form.Group>
                        <Form.Group md="4" controlId="start_date" className='mt-3'>
                          <Form.Label> <span className='bi bi-calendar2-check' /> Mulai cuti</Form.Label>
                          <Form.Control
                            className='rounded-4 add-item-shadow'
                            required
                            type="date"
                            placeholder="Mulai cuti"
                          />
                        </Form.Group>
                        <Form.Group md="4" controlId="end_date" className='mt-3'>
                          <Form.Label> <span className='bi bi-calendar2-x' /> Akhir cuti</Form.Label>
                          <Form.Control
                            className='rounded-4 add-item-shadow'
                            required
                            type="date"
                            placeholder="Akhir cuti"
                          />
                        </Form.Group>
                        <Form.Group md="4" controlId="description" className='mt-3'>
                          <Form.Label> <span className='bi bi-journal-text' /> Deskripsi</Form.Label>
                          <Form.Control
                            className='rounded-4 add-item-shadow'
                            required
                            type="text"
                            placeholder="Tujuan atau alasan cuti"
                          />
                          <Button className='rounded-4 mt-4 add-item-shadow-success w-100' type="submit" disabled={isSubmissionLoading} variant='success'> {isSubmissionLoading === true ? <><Spinner size="sm" /> Menyimpan data...</> : <span className="bi bi-door-closed">Simpan pengajuan cuti</span>} </Button>
                        </Form.Group>
                      </Form>
                    </>
                    :
                    <TopToBottom>
                      <Alert className='rounded-4 border mt-4' variant={`${submissionsPostedData.is_on_permission === true ? 'danger' : submissionsPostedData.is_on_leave === true ? 'warning' : 'success'}`} style={{width: "380px"}}>
                        <Alert.Heading>{submissionsPostedData.is_on_permission === true || submissionsPostedData.is_on_leave === true ? "Tidak dapat diproses" : "Berhasil"}</Alert.Heading>
                        {
                          submissionsPostedData.is_on_permission === true
                            ?
                            (<p> <b>"{submissionsPostedData.name}"</b> sedang izin pada tanggal tersebut <b className='bi bi-arrow-right'> "{submissionsPostedData.start_date}"</b>, silahkan lakukan pengajuan cuti dengan tanggal berikutnya</p>)
                            :
                            submissionsPostedData.is_on_leave === true
                              ?
                              (<p> <b>"{submissionsPostedData.name}"</b> Masih dalam masa cuti ! Tanggal berakhir cuti <b className='bi bi-arrow-right'> "{submissionsPostedData.end_date}"</b>, silahkan lakukan pengajuan cuti setelah masa cuti berakhir</p>)
                              :
                              (<>
                                <p className='p-0 m-0'>Pengajuan cuti untuk :</p>
                                <Table className='m-0 p-0' style={{ color: "#0F5132" }}>
                                  <tr>
                                    <th>Nama</th>
                                    <th>:</th>
                                    <td>{submissionsPostedData.name}</td>
                                  </tr>
                                  <tr>
                                    <th>Mulai cuti</th>
                                    <th>:</th>
                                    <td>{submissionsPostedData.start_date}</td>
                                  </tr>
                                  <tr>
                                    <th>Akhir cuti</th>
                                    <th>:</th>
                                    <td>{submissionsPostedData.end_date}</td>
                                  </tr>
                                </Table>
                                <p className='p-0 m-0'>Telah berhasil disimpan</p>
                              </>)
                        }
                        <Button className='w-100 rounded-4 mt-2 border' variant={`${submissionsPostedData.is_on_permission === true ? 'danger' : submissionsPostedData.is_on_leave === true ? 'warning' : 'success'}`} onClick={() => setIsSubmissionPosted(false)} > Kembali ke form </Button>
                      </Alert>
                    </TopToBottom>
                }
              </div>
            </div>
          </Collapse>
        </div>

        <div className='w-100 px-3'>
          <p className='w-100 text-center text-muted'>Daftar staf desa yang sedang dalam masa cuti</p>
          <RightToLeft>
            <div className='rounded-4 mb-3' style={{ minHeight: "450px", backgroundColor: "rgba(157, 157, 157, 0.11)", overflow: "hidden" }}>
              <Table borderless hover={personalLeaveDatas.length > 0 ? true : false}>
                <thead className='fw-bold' style={{ position: "sticky", top: "0px" }}>
                  <tr>
                    <td className='text-center align-middle' style={{ backgroundColor: "#EFEFEF" }}>No</td>
                    <td className='align-middle' style={{ backgroundColor: "#EFEFEF" }}>Foto</td>
                    <td className='align-middle' style={{ backgroundColor: "#EFEFEF" }}>Nama</td>
                    <td className='align-middle' style={{ backgroundColor: "#EFEFEF" }}>Email</td>
                    <td className='align-middle' style={{ backgroundColor: "#EFEFEF" }}>Telepon</td>
                    <td className='m-0 p-0 bg-danger'>
                      <div>
                        <div className='text-center p-2' style={{ backgroundColor: "#D0E6F4" }}>Tanggal cuti </div>
                        <div className='d-flex'>
                          <div className='p-2 w-50 text-center' style={{ backgroundColor: "#D6F4D8" }}>Dari</div>
                          <div className='p-2 w-50 text-center' style={{ backgroundColor: "#F4E0D0" }}>Sampai</div>
                        </div>
                      </div>
                    </td>
                    <td className='align-middle' style={{ backgroundColor: "#EFEFEF" }}>Deskripsi</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    !!isPersonalLeaveIsLoading
                      ?
                      <tr>
                        <td colSpan={7} className='py-4'>
                          <ProgresBarLoadingVisual />
                        </td>
                      </tr>
                      :
                      personalLeaveDatas.length > 0
                        ?
                        tableBodyComponent()
                        :
                        <tr >
                          <td colSpan={7} className='py-4'>
                            <ZoomOut>
                              <>
                                <div className="w-100 h1 text-secondary text-center" > <span className='bi bi-folder-fill fw-bold' style={{ textShadow: " 0px 7px 15px grey" }} /> </div>
                                <p className='text-muted fw-bold text-center'>Tidak ada staf yang cuti</p>
                              </>
                            </ZoomOut>
                          </td>
                        </tr>
                  }
                </tbody>
              </Table>
            </div>
          </RightToLeft>
        </div>

      </div >
    </Card >
  )
}

export default PersonalLeave
