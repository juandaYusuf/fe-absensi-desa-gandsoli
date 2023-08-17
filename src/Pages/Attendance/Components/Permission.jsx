// !=============================== WARNING ===============================
// !DEPRECTED PAGE

import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Alert, Button, ButtonGroup, Card, Collapse, Form, Table, Spinner } from 'react-bootstrap'
import API_URL from '../../../API/API_URL'
import { BottomToTop, TopToBottom } from '../../../Page-transition/ComponentTransitions'
import ProgresBarLoadingVisual from '../../../Global-components/Progres-bar-loading-visual'
import { ZoomOut } from '../../../Page-transition/PageTransitions'

const Permission = () => {

  const [validated, setValidated] = useState(false)
  const [userPermissionDatas, setUserPermissionDatas] = useState([])
  const [selectOptionValues, setselectOptionValues] = useState("")
  const [selectedOptions, setSelectedOptions] = useState("today")
  const [isUserPermissionDatasLoading, setIsUserPermissionDatasLoading] = useState(true)
  const [userData, setuserData] = useState([])
  const [isFormShow, setIsFormShow] = useState(true)
  const [isSubmissionFormLoading, setIsSubmissionFormLoading] = useState(false)
  const [isPermissioDatasPosted, setIsPermissioDatasPosted] = useState({
    "is_permission_success": false,
    "is_on_permission_today": false,
    "is_on_personal_leave": false,
    "full_name": "",
    "created_at": ""
  })



  const backToForm = () => {
    setIsPermissioDatasPosted({
      "is_permission_success": false,
      "is_on_permission_today": false,
      "is_on_personal_leave": false,
      "full_name": "",
      "created_at": ""
    })
  }


  const postPermissionDatas = ({ user_id, reason, created_at }) => {
    const url = API_URL().USER_PERMISSION.ADD_SUBMISSION_PERMISSION
    const data = {
      "user_id": user_id,
      "reason": reason,
      "created_at": created_at
    }
    axios.post(url, data).then((response) => {
      setIsPermissioDatasPosted({
        "is_permission_success": true,
        "is_on_permission_today": false,
        "is_on_personal_leave": false,
        "full_name": `${response.data.first_name} ${response.data.last_name}`,
        "created_at": response.data.created_at
      })
      setIsSubmissionFormLoading(false)
    }).catch((err) => {
      if (err.response.status === 409) {
        if (err.response.data.detail.message === "user has been permission") {
          setIsPermissioDatasPosted({
            "is_on_permission_today": true,
            "is_on_personal_leave": false,
            "full_name": err.response.data.detail.full_name,
            "created_at": err.response.data.detail.created_at
          })
          setIsSubmissionFormLoading(false)
        }

        if (err.response.data.detail.message === "user is on paid leave") {
          setIsPermissioDatasPosted({
            "is_on_permission_today": false,
            "is_on_personal_leave": true,
            "full_name": err.response.data.detail.full_name,
            "created_at": err.response.data.detail.end_date
          })
          setIsSubmissionFormLoading(false)
        }
      }
    })
  }

  const handleSubmit = (e) => {
    setIsSubmissionFormLoading(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      setIsSubmissionFormLoading(false)
      if (selectOptionValues === "default") {
        setselectOptionValues("default")
      } else {
        setselectOptionValues("")
      }
      setValidated(true)
      e.preventDefault()
      e.stopPropagation()
    } else {
      postPermissionDatas({
        user_id: selectOptionValues,
        reason: e.target.reason.value,
        created_at: e.target.date_submission.value
      })
      e.target.reset()
      setValidated(false)
      setselectOptionValues("")
      e.preventDefault()
    }
  }




  useEffect(() => {
    setIsUserPermissionDatasLoading(true)
    const url = API_URL(selectedOptions).USER_PERMISSION.GET_PERMISSION_DATAS
    axios.get(url).then((response) => {
      setUserPermissionDatas(response.data)
      setIsUserPermissionDatasLoading(false)
    })

  }, [selectedOptions, isPermissioDatasPosted.is_permission_success])



  useEffect(() => {

    const getMultiUserDatas = () => {
      const url = API_URL().USER.GET_MULTI_USER
      axios.get(url).then((response) => {
        setuserData(response.data)
      })
    }

    getMultiUserDatas()
  }, [])

  return (
    <Card className='p-3 me-4 rounded-4 border-0 bg-transparent' style={{ minHeight: "400px" }}>
      <h3 className='bi bi-arrow-up-left-circle'> Pengajuan izin</h3>
      <div className='d-flex'>
        <div className='d-flex'>
          <Button className={`p-1 add-item-shadow ${isFormShow ? 'bi bi-caret-left-fill' : 'bi bi-caret-right-fill'}`} variant='dark' style={{ height: "40px" }} onClick={() => setIsFormShow(prev => !prev)} />
          <Collapse in={isFormShow} dimension="width">
            <div id="example-collapse-text" className='overflow-hidden'>
              <div className='p-3 overflow-hidden' style={{ width: "400px", height: "500px" }}>
                {
                  isPermissioDatasPosted.is_on_permission_today === false && isPermissioDatasPosted.is_on_personal_leave === false
                    ?
                    isPermissioDatasPosted.is_permission_success === true
                      ?
                      <TopToBottom>
                        <Alert className='rounded-4 border add-item-shadow' variant='success' style={{ marginTop: "34px" }}>
                          <Alert.Heading> Pengajuan izin berhasil</Alert.Heading>
                          <p>Pengajuan izin pada tangal <b>"{isPermissioDatasPosted.created_at}"</b> untuk <b>"{isPermissioDatasPosted.full_name}"</b> berhasil.</p>
                          <Button className='add-item-shadow w-100 rounded-4' variant='success' onClick={() => backToForm()}>Kembali ke form</Button>
                        </Alert>
                      </TopToBottom>
                      :
                      <BottomToTop>
                        <Form.Group md="4" controlId="user_name">
                          <Form.Label> <span className='bi bi-person' /> Pengaju</Form.Label>
                          <Form.Select
                            className={`add-item-shadow rounded-4 ${selectOptionValues === "default" && 'text-muted'}`}
                            onChange={(e) => setselectOptionValues(e.target.value)}
                            defaultValue="default"
                            value={selectOptionValues}
                            isInvalid={selectOptionValues === "default" ? true : false}>
                            <option value='default' > Nama pengaju izin</option>
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
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                          <Form.Group md="4" controlId="date_submission" className='mt-3'>
                            <Form.Label> <span className='bi bi-calendar2-check' /> Tanggal izin</Form.Label>
                            <Form.Control
                              className='rounded-4 add-item-shadow'
                              required
                              type="date"
                            />
                          </Form.Group>
                          <Form.Group md="4" controlId="reason" className='mt-3'>
                            <Form.Label> <span className='bi bi-journal-text' /> Deskripsi</Form.Label>
                            <Form.Control
                              className='rounded-4 add-item-shadow'
                              required
                              type="text"
                              placeholder="Tujuan atau alasan izin"
                            />
                            <Button className='rounded-4 mt-4 add-item-shadow-success w-100' type="submit" variant='success' disabled={isSubmissionFormLoading}>
                              {
                                !!isSubmissionFormLoading
                                  ?
                                  (<><Spinner size='sm' /> <span>Menyimpan pengajuan izin</span></>)
                                  :
                                  (<span className='bi bi-arrow-up-left-circle mx-2' > Simpan pengajuan izin</span>)
                              }
                            </Button>
                          </Form.Group>
                        </Form>
                      </BottomToTop>
                    :
                    <TopToBottom>
                      <Alert className='rounded-4 border add-item-shadow' variant={isPermissioDatasPosted.is_permission_success === true ? 'success' : 'danger'} style={{ marginTop: "34px" }}>
                        <Alert.Heading> {isPermissioDatasPosted.is_permission_success === true ? "Pengajuan izin berhasil" : "Tidak dapat di proses"}</Alert.Heading>
                        {
                          isPermissioDatasPosted.is_on_permission_today === true
                          &&
                          <p> <b>"{isPermissioDatasPosted.full_name}"</b> telah tercatat sebagai izin pada tanggal yang sama <b className='bi bi-arrow-right'> {isPermissioDatasPosted.created_at}</b> </p>
                        }

                        {
                          isPermissioDatasPosted.is_on_personal_leave === true
                          &&
                          <p> <b>"{isPermissioDatasPosted.full_name}"</b> tidak dapat izin karena masih dalam jangka waktu cuti, tanggal akhir cuti <b className='bi bi-arrow-right'> {isPermissioDatasPosted.created_at}</b>. Harap jangan melakukan pengajuan izin jika staf desa sedang dalam masa cuti. </p>
                        }
                        <Button className='add-item-shadow w-100 rounded-4' variant='danger' onClick={() => backToForm()}>Kembali ke form</Button>
                      </Alert>
                    </TopToBottom>
                }
              </div>
            </div>
          </Collapse>
        </div>

        <div className='w-100 px-3'>
          <div className='overflow-hidden'>
            {
              selectedOptions === "today"
                ?
                <TopToBottom>
                  <p className='w-100 text-center text-muted m-0'> Daftar staf desa yang sedang izin pada <b>hari ini</b></p>
                </TopToBottom>
                :
                <BottomToTop>
                  <p className='w-100 text-center text-muted m-0'> Daftar staf desa yang sedang izin <b>seluruhnya</b> </p>
                </BottomToTop>
            }
          </div>
          <ButtonGroup className='w-100 mt-4 p-0 add-item-shadow rounded-4'>
            <Button
              className='add-item-shadow-success p-1'
              variant={selectedOptions === "today" ? "success" : "outline-success"}
              onClick={() => setSelectedOptions("today")}
              style={{ borderRadius: '15px 0px 0px 15px' }}>
              Hari ini
            </Button>
            <Button
              className='add-item-shadow-success p-1'
              variant={selectedOptions === "all" ? "success" : "outline-success"}
              onClick={() => setSelectedOptions("all")}
              style={{ borderRadius: '0px 15px 15px 0px' }}>
              Semua
            </Button>
          </ButtonGroup>
          <div className='rounded-4 add-item-shadow overflow-hidden my-3' style={{ minHeight: "450px", backgroundColor: "rgba(157, 157, 157, 0.11)" }}>
            <div className='h-100' style={{ overflowY: "auto" }}>
              <Table borderless hover={userPermissionDatas.length > 0 ? true : false}>
                <thead style={{ position: "sticky", top: "0px" }}>
                  <tr>
                    <th className='text-center align-middle' style={{ backgroundColor: "#EFEFEF" }}>No</th>
                    <th style={{ backgroundColor: "#EFEFEF" }}>Foto</th>
                    <th style={{ backgroundColor: "#EFEFEF" }}>Nama</th>
                    <th style={{ backgroundColor: "#EFEFEF" }}>Email</th>
                    <th style={{ backgroundColor: "#EFEFEF" }}>Telepon</th>
                    <th style={{ backgroundColor: "#EFEFEF" }}>Tanggal izin</th>
                    <th style={{ backgroundColor: "#EFEFEF" }}>Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    !!isUserPermissionDatasLoading
                      ?
                      <tr>
                        <td colSpan={7} className='py-4 text-center'>
                          <ProgresBarLoadingVisual />
                        </td>
                      </tr>
                      :
                      userPermissionDatas.length > 0
                        ?
                        userPermissionDatas.map((result, i) => {
                          return (
                            <tr key={i++}>
                              <td className='text-center align-middle'>{i + 1}</td>
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
                              <td className='align-middle'>{result.first_name} {result.last_name}</td>
                              <td className='align-middle'>{result.email}</td>
                              <td className='align-middle'>{result.no_telepon}</td>
                              <td className='align-middle'>{result.created_at}</td>
                              <td className='align-middle'>{result.reason}</td>
                            </tr>)
                        })
                        :
                        <tr >
                          <td colSpan={7} className='py-4'>
                            <ZoomOut>
                              <>
                                <div className="w-100 h1 text-secondary text-center" > <span className='bi bi-folder-fill fw-bold' style={{ textShadow: " 0px 7px 15px grey" }} /> </div>
                                <p className='text-muted fw-bold text-center'>Tidak ada staf yang izin</p>
                              </>
                            </ZoomOut>
                          </td>
                        </tr>
                  }

                </tbody>
              </Table>
            </div>
          </div>
        </div>

      </div >
    </Card >
  )
}

export default Permission


// !=======================================================================