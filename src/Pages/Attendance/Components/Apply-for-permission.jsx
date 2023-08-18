import React, { useEffect, useState } from 'react'
import { Alert, Button, ButtonGroup, Card, Form, Spinner, Table } from 'react-bootstrap'
import axios from 'axios'
import API_URL from '../../../API/API_URL'
import { ZoomInSlide, ZoomOut } from '../../../Page-transition/PageTransitions'
import ProgresBarLoadingVisual from '../../../Global-components/Progres-bar-loading-visual'
import downloadPDF from './DownloadPDF'



const ApplyForPermission = () => {

  const localData = JSON.parse(localStorage.getItem('obj'))
  const [permissionTotalDay, setPermissionTotalDay] = useState('one')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')
  const [alert, setAlert] = useState(null)
  const [listOfPermissions, setListOfPermissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const [isPDFLoading, setIsPDFLoading] = useState(false)
  const [loadingItem, setLoadingItem] = useState(0)
  const [isSignatureExist, setIsSignatureExist] = useState(false)
  const [isRequirementChecking, setIsRequirementChecking] = useState(true)


  const sendPermission = () => {
    setLoading(true)
    const url = API_URL().USER_PERMISSION.ADD_SUBMISSION_PERMISSION
    const data = {
      'user_id': localData.id,
      'reason': reason,
      'start_date': startDate,
      'end_date': endDate
    }
    axios.post(url, data).then(response => {
      if (response.data.message === "you are on permission") {
        setAlert(`Anda sedang izin pada tanggal tersebut`)
      } else if (response.data.message === "user is on paid leave") {
        setAlert("Anda masih dalam masa cuti")
      } else if (response.data.message === "user has been permission") {
        setAlert("Anda masih dalam masa izin")
      } else {
        setAlert("Pengajuan izin terkirim. Silahkan tunggu persetujuan...!")
      }
      setLoading(false)
      setStartDate('')
      setEndDate('')
      setReason('')
    })
    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  const downloadDocs = ( permission_id, item) => {
    setLoadingItem(item)
    setIsPDFLoading(true)
    const url = API_URL(localData.id, permission_id).USER_PERMISSION.GET_DOCS
    axios.get(url).then(response => {
      downloadPDF(response.data.docs)
      setIsPDFLoading(false)
    })
  }



  useEffect(() => {
    setStartDate('')
    setEndDate('')
    setReason('')
  }, [permissionTotalDay])

  useEffect(() => {
    const url = API_URL(localData.id).USER_PERMISSION.GET_SINGLE_DATA_LIST
    axios.get(url).then(response => {
      setListOfPermissions(response.data)
    })
  }, [alert, reload])

  useEffect(() => {
    const signatureChecker = () => {
      const url = API_URL(localData.id).USER.GET_SINGLE_USER
      axios.get(url).then((response) => {
        setIsRequirementChecking(false)
        if (!!response.data.signature) {
          setIsSignatureExist(true)
        } else {
          setIsSignatureExist(false)
        }
      })
    }
    signatureChecker()
  }, [])


  return (
    <>
      <Card className='p-3 rounded-4 border-0 bg-transparent' style={{ minHeight: "400px" }}>
        <h3 className='bi bi-arrow-up-left-circle'> Pengajuan izin</h3>
        {
          isRequirementChecking
            ?
            <div className='w-100'>
              <ProgresBarLoadingVisual theme={'secondary'} titleTxt={"Memeriksa kelengkapan profile..."} />
            </div>
            :
            !!isSignatureExist
              ?
              <>
                <div className='d-flex justify-content-center w-100'>
                  <div className='form-container'>
                    {
                      !!alert
                      &&
                      <ZoomOut>
                        <Alert className='border border-secondary add-item-shadow rounded-4' variant={alert === "Pengajuan izin terkirim. Silahkan tunggu persetujuan...!" ? "success" : "danger"}>
                          <div className='d-flex justify-content-between'>
                            <span className='h6 pt-2'>{alert}</span>
                            <span className='bi bi-x h4 m-0 p-0 pt-1 cursor-pointer' onClick={() => { setAlert(null) }} />
                          </div>
                        </Alert>
                      </ZoomOut>
                    }
                    <Form className='w-100'>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Durasi izin</Form.Label>
                        <Form.Select className='rounded-4' aria-label="Default select example" onChange={(e) => setPermissionTotalDay(e.target.value)}>
                          <option>Berapa hari izin</option>
                          <option value="one">Satu hari</option>
                          <option value="more">Lebih dari satu hari</option>
                        </Form.Select>
                      </Form.Group>
                      {
                        permissionTotalDay === 'one'
                          ?
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Tanggal izin</Form.Label>
                            <Form.Control className='rounded-4' type="date" value={startDate} placeholder="Masukan tanggal izin" onChange={(e) => setStartDate(e.target.value)} />
                          </Form.Group>
                          :
                          <>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Tanggal mulai izin</Form.Label>
                              <Form.Control className='rounded-4' value={startDate} type="date" placeholder="Masukan tanggal mulai izin" onChange={(e) => setStartDate(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Tanggal akhir izin</Form.Label>
                              <Form.Control className='rounded-4' value={endDate} type="date" placeholder="Masukan tanggal akhir izin" onChange={(e) => setEndDate(e.target.value)} />
                            </Form.Group>
                          </>
                      }
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Alasan</Form.Label>
                        <Form.Control className='rounded-4' type="text" value={reason} placeholder="Masukan alasan izin" onChange={(e) => setReason(e.target.value)} />
                      </Form.Group>
                    </Form>
                    <Button className='rounded-4 add-item-shadow-success w-100' disabled={loading === true || startDate === '' || reason === '' ? true : false} type="submit" variant='success' onClick={() => sendPermission()}>
                      <div className='d-flex align-items-center gap-2 w-100 justify-content-center'>
                        {
                          !!loading
                          &&
                          <Spinner className='m-0 p-0' variant="light" size="sm" />
                        }
                        <p className='my-1'>{!!loading ? "Mengirim pengajuan..." : "Kirim pengajuan"} <span className='bi bi-send-fill ms-2' /> </p>
                      </div>
                    </Button>
                  </div>
                </div>
                <div className='rounded-4 add-item-shadow overflow-hidden my-3' style={{ minHeight: "450px", backgroundColor: "rgba(157, 157, 157, 0.11)" }}>
                  <div className='h-100' style={{ overflowY: "auto" }}>
                    <div style={{ minWidth: "1108px" }}>
                      <Table borderless hover>
                        <thead style={{ position: "sticky", top: "0px" }}>
                          <tr>
                            <th style={{ backgroundColor: "#EFEFEF" }}>No</th>
                            <th style={{ backgroundColor: "#EFEFEF" }}>Alasan</th>
                            <th style={{ backgroundColor: "#EFEFEF" }}>Durasi izin</th>
                            <th style={{ backgroundColor: "#EFEFEF" }}>Dari</th>
                            <th style={{ backgroundColor: "#EFEFEF" }}>Sampai</th>
                            <th style={{ backgroundColor: "#EFEFEF" }}>Status</th>
                            <th style={{ backgroundColor: "#EFEFEF" }}>Surat</th>
                            <th style={{ backgroundColor: "#EFEFEF", width: "10px" }}><div className='rounded-circle bg-light add-item-shadow d-flex justify-content-center align-items-center cursor-pointer' style={{ width: "30px", height: "30px" }} onClick={() => setReload(prev => !prev)}><span className="bi bi-arrow-clockwise fs-3" /></div></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            listOfPermissions.map((result, i) => {
                              const startDateOfPermission = new Date(result.start_date)
                              const endDateOfPermission = new Date(result.end_date)
                              let selisihHari = Math.floor((endDateOfPermission - startDateOfPermission) / (24 * 60 * 60 * 1000))
                              if (!!result.end_date) {
                                selisihHari = Math.floor((endDateOfPermission - startDateOfPermission) / (24 * 60 * 60 * 1000))
                              } else {
                                selisihHari = 1
                              }
                              return (
                                <tr key={i}>
                                  <td className="align-middle">{i + 1}</td>
                                  <td className="align-middle">{result.reason}</td>
                                  <td className="align-middle">Izin {selisihHari} hari</td>
                                  <td className="align-middle">{result.start_date}</td>
                                  <td className="align-middle">{!!result.end_date ? result.end_date : "-"}</td>
                                  <td className="align-middle">{
                                    result.agreement === "waiting"
                                      ?
                                      <p className="p-0 m-0 fw-bold">Menunggu <span className="text-warning bi bi-exclamation-circle-fill m-0 p-0" /> </p>
                                      :
                                      result.agreement === "not approved"
                                        ?
                                        <p className="p-0 m-0 fw-bold">Ditolak <span className="text-danger bi bi-x-circle-fill m-0 p-0" /> </p>
                                        :
                                        result.agreement === "approved"
                                        &&
                                        <p className="p-0 m-0 fw-bold">Disetujui <span className="text-success bi bi-check-circle-fill m-0 p-0" /> </p>
                                  }</td>
                                  <td colSpan={2}>
                                    <Button className='d-flex justify-content-center align-items-center w-100 rounded-4 add-item-shadow border border-dark' variant={result.agreement !== "approved" ? 'secondary' : 'warning'} disabled={result.agreement !== "approved" || !!isPDFLoading ? true : false} onClick={() => downloadDocs(result.id,i)}>
                                      <div style={{ width: "130px" }}>
                                        {
                                          !!isPDFLoading && i === loadingItem
                                            ?
                                            <>
                                              <Spinner variant="dark" size="sm" />
                                              <span className='ms-2 fw-bold'>Memuat...</span>
                                            </>
                                            :
                                            result.agreement !== "approved"
                                              ?
                                              <span className='fw-bold'>Tidak ada surat</span>
                                              :
                                              <span className='fw-bold'>Unduh surat</span>
                                        }
                                      </div>
                                    </Button>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </>
              :
              <Alert className='border border-secondary add-item-shadow rounded-4' variant='danger'>
                <Alert.Heading className='f-bold bi bi-exclamation-triangle'> Peringatan</Alert.Heading>
                <hr />
                <p> <b>Halaman tidak dapat di akses...!</b> <br /> Anda tidak memiliki tanda tangan. Harap perbaharui profile anda kemudian isi tanda tangan pada kolom yang telah disediakan di halaman profile.</p>
                <p className='text-muted fw-bold'>Terimakasih...!</p>
              </Alert>
        }
      </Card>
    </>
  )
}

export default ApplyForPermission
