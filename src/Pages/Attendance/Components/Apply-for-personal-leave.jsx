import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Form, Spinner, Table } from 'react-bootstrap'
import API_URL from '../../../API/API_URL'
import axios from 'axios'
import PersonalLeavePDF from '../../../PDFFile/Personal-leave-PDF'
import AgreementPersonalLeavePDF from '../../../PDFFile/Agreement-personal-leave-PDF'
import ProgresBarLoadingVisual from '../../../Global-components/Progres-bar-loading-visual'
import downloadPDF from './DownloadPDF'

const ApplyForPersonalLeave = () => {

  const localData = JSON.parse(localStorage.getItem('obj'))
  const [personalLeaveCat, setPersonalLeaveCat] = useState("none")
  const [userDetail, setUserDetail] = useState({})
  const [startDate, setStartDate] = useState('')
  const [alertBody, setAlertBody] = useState(null)
  const [isRequirementChecking, setIsRequirementChecking] = useState(true)
  const [isSignatureExist, setIsSignatureExist] = useState(false)
  const [submissionsPostedData, setsubmissionsPostedData] = useState({ "is_on_leave": false, "is_on_permission": true, "name": "", "start_date": "", "end_date": "" })
  const [isSubmissionPosted, setIsSubmissionPosted] = useState(false)
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false)
  const [refreshTablePersonalLeave, setrefreshTablePersonalLeave] = useState(false)
  const [reloadAlertSetTimeOut, setReloadAlertSetTimeOut] = useState(false)
  const [personalLeaveHistory, setPersonalLeaveHistory] = useState([])
  const [reload, setReload] = useState(false)
  const [loadingItem, setLoadingItem] = useState(0)
  const [isDownloadApprovmentLoading, setIsDownloadApprovmentLoading] = useState(false)
  const [isPDFLoading, setIsPDFLoading] = useState(false)


  const calculateDate = (dateForCalculate, typeOptions) => {
    const currentDate = new Date(dateForCalculate)
    let totalDay = 0


    if (typeOptions === "type1") {
      totalDay = 90
    } else if (typeOptions === "type2" || typeOptions === "type3" || typeOptions === "type5") {
      totalDay = 2
    } else if (typeOptions === "type4") {
      totalDay = 3
    }

    currentDate.setDate(currentDate.getDate() + totalDay)
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')
    const calculatedDate = `${year}-${month}-${day}`
    return calculatedDate
  }


  const postSubmission = () => {
    const calculateDates = calculateDate(startDate, personalLeaveCat)
    setIsSubmissionLoading(true)

    const url = API_URL().PERSONAL_LEAVE.ADD_SUBMISSION
    let descriptionsFromSelectLeaveCat = ''
    if (personalLeaveCat === "type1") {
      descriptionsFromSelectLeaveCat = 'Hamil dan melahirkan'
    } else if (personalLeaveCat === "type2") {
      descriptionsFromSelectLeaveCat = "Isteri melahirkan"
    } else if (personalLeaveCat === "type3") {
      descriptionsFromSelectLeaveCat = "Keluarga meninggal"
    } else if (personalLeaveCat === "type4") {
      descriptionsFromSelectLeaveCat = "Menikah"
    } else if (personalLeaveCat === "type5") {
      descriptionsFromSelectLeaveCat = "Isteri keguguran"
    }

    const sendToServer = (pdfUrlData) => {

      const data = {
        "user_id": localData.id,
        "start_date": startDate,
        "end_date": calculateDates,
        "apply_docs": pdfUrlData,
        "descriptions": descriptionsFromSelectLeaveCat
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
          setReloadAlertSetTimeOut(prev => !prev)
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
          setReloadAlertSetTimeOut(prev => !prev)
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
          setReloadAlertSetTimeOut(prev => !prev)
          setrefreshTablePersonalLeave(prev => !prev)
        }
      })
    }

    const pdfData = {
      staf_name: `${userDetail.first_name} ${userDetail.last_name}`,
      role: userDetail.role,
      email: userDetail.email,
      alamat: userDetail.alamat,
      reason: descriptionsFromSelectLeaveCat,
      signature: userDetail.signature_data,
    }
    PersonalLeavePDF(pdfData, (base64) => sendToServer(base64))
  }


  const downloadDocs = (personal_leave_id, item) => {
    setLoadingItem(item)
    setIsPDFLoading(true)
    const url = API_URL(localData.id, personal_leave_id).PERSONAL_LEAVE.GET_PERSONAL_LEAVE_APPLY_DOC
    axios.get(url).then(response => {
      downloadPDF(response.data.docs)
      setIsPDFLoading(false)
    })
  }

  const downloadApprovedDoc = (staf_id, personal_leave_id, item) => {
    setLoadingItem(item)
    setIsDownloadApprovmentLoading(true)
    const url = API_URL(staf_id, personal_leave_id).PERSONAL_LEAVE.GET_PERSONAL_LEAVE_DOC
    axios.get(url).then(response => {
      downloadPDF(response.data.agreement_docs)
      setIsDownloadApprovmentLoading(false)
    })
  }


  useEffect(() => {
    if (personalLeaveCat === 'type1') {
      setAlertBody({
        pasal: 'Pasal 82 ayat (1) UU Ketenagakerjaan :',
        body: "Pekerja/buruh perempuan berhak memperoleh istirahat selama 1,5 (satu setengah) bulan sebelum saatnya melahirkan anak dan 1,5 (satu setengah) bulan sesudah melahirkan menurut perhitungan dokter kandungan atau bidan."
      })
    } else if (personalLeaveCat === 'none') {
      setAlertBody(null)
    } else {
      setAlertBody({
        pasal: 'Pasal 93 ayat (2) dan (4) UU Ketenagakerjaan :',
        body: "Menikah: 3 hari | Istri melahirkan atau keguguran: 2 hari | Keluarga meninggal dunia: 2 hari"
      })
    }
    setStartDate('')
  }, [personalLeaveCat])


  useEffect(() => {
    const getUserDetail = () => {
      const url = API_URL(localData.id).USER.GET_SINGLE_USER
      axios.get(url).then((response) => {
        setUserDetail({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          alamat: response.data.alamat,
          no_telepon: response.data.no_telepon,
          jk: response.data.j_kelamin,
          pp: response.data.profile_picture,
          signature: response.data.signature,
          role: response.data.role,
          signature_data: response.data.signature_data
        })
        setIsRequirementChecking(false)
        if (!!response.data.signature) {
          setIsSignatureExist(true)
        } else {
          setIsSignatureExist(false)
        }
      })
    }

    getUserDetail()

  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsSubmissionPosted(false)
    }, 10000)
  }, [reloadAlertSetTimeOut])

  useEffect(() => {
    const url = API_URL(localData.id).PERSONAL_LEAVE.GET_PERSONAL_LEAVE_DATAS
    axios.get(url).then((response) => {
      setPersonalLeaveHistory(response.data)
      setPersonalLeaveCat('none')
      setStartDate('')
    })
  }, [reload, refreshTablePersonalLeave])




  return (
    <Card className='p-3 border-0 bg-transparent' style={{ minHeight: "400px" }}>
      <h3 className='bi bi-door-open'> Pengajuan cuti</h3>
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
                    !!isSubmissionPosted
                    &&
                    <Alert className='rounded-4 border-secondary add-item-shadow' variant={!!submissionsPostedData.is_on_permission || !!submissionsPostedData.is_on_leave ? 'danger' : 'success'}>
                      <Alert.Heading className={`${!!submissionsPostedData.is_on_permission || !!submissionsPostedData.is_on_leave ? 'bi bi-exclamation-triangle' : 'bi bi-check2-circle'}`}> {!!submissionsPostedData.is_on_permission || !!submissionsPostedData.is_on_leave ? 'Peringatan' : 'Berhasil'}</Alert.Heading>
                      <hr />
                      {
                        !!submissionsPostedData.is_on_permission
                          ?
                          <p>Anda masih dalam masa izin atau sedang izin. Lihat pada tabel yang tertera pada halaman pengajuan izin...</p>
                          :
                          !!submissionsPostedData.is_on_leave
                            ?
                            <p>Anda masih dalam masa cuti atau sedang cuti. Lihat pada tabel di bawah</p>
                            :
                            <p>Pengajuan berhasil dikirim, anda mengambil cuti pada tanggal <b>{submissionsPostedData.start_date}</b>. Silahkan tunggu persetujuan...!</p>
                      }
                    </Alert>
                  }
                  <Form className='w-100'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Jenis cuti</Form.Label>
                      <Form.Select className='rounded-4' aria-label="Default select example" onChange={(e) => setPersonalLeaveCat(e.target.value)}>
                        <option value="none">Pilih jenis cuti</option>
                        {
                          userDetail.jk === "pria"
                            ?
                            <>
                              <option value="type2">Isteri melahirkan</option>
                              <option value="type5">Isteri keguguran</option>
                            </>
                            :
                            <option value="type1">Hamil dan melahirkan</option>
                        }
                        <option value="type3">Keluarga meninggal</option>
                        <option value="type4">Menikah</option>
                        {/* <option value="type5">Lainnya</option> */}
                      </Form.Select>
                    </Form.Group>
                    {
                      alertBody !== null
                        ?
                        <Alert className='rounded-4 border border-secondary add-item-shadow' variant='info'>
                          <Alert.Heading className='bi bi-info-circle'> Pemberitahuan</Alert.Heading>
                          <hr />
                          <p className='fw-bold'>{alertBody.pasal}</p>
                          <p><i>"{alertBody.body}"</i></p>
                        </Alert>
                        :
                        <Alert className='rounded-4 border border-secondary add-item-shadow' variant='warning'>
                          <Alert.Heading className='bi bi-info-circle'> Pemberitahuan</Alert.Heading>
                          <hr />
                          <p>Silahkan pilih jenis cuti</p>
                        </Alert>
                    }
                    {
                      !!alertBody
                        ?
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Ambil cuti pada tanggal</Form.Label>
                          <Form.Control className='rounded-4' value={startDate} type="date" placeholder="Masukan tanggal mulai izin" onChange={(e) => setStartDate(e.target.value)} />
                        </Form.Group>
                        : null
                      // <>
                      //   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      //     <Form.Label>Tanggal mulai cuti</Form.Label>
                      //     <Form.Control className='rounded-4' value={startDate} type="date" placeholder="Masukan tanggal mulai izin" onChange={(e) => setStartDate(e.target.value)} />
                      //   </Form.Group>
                      //   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      //     <Form.Label>Tanggal akhir cuti</Form.Label>
                      //     <Form.Control className='rounded-4' value={endDate} type="date" placeholder="Masukan tanggal mulai izin" onChange={(e) => setStartDate(e.target.value)} />
                      //   </Form.Group>
                      //   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      //     <Form.Label>Alasan</Form.Label>
                      //     <Form.Control className='rounded-4' type="text" value={reason} placeholder="Masukan alasan izin" onChange={(e) => setReason(e.target.value)} />
                      //   </Form.Group>
                      // </>
                    }
                  </Form>
                  <Button className='rounded-4 add-item-shadow-success w-100' disabled={isSubmissionLoading === true || startDate === '' || personalLeaveCat === 'none' ? true : false} type="submit" variant='success' onClick={() => postSubmission()}>
                    <div className='d-flex align-items-center gap-2 w-100 justify-content-center'>
                      {
                        !!isSubmissionLoading
                        &&
                        <Spinner className='m-0 p-0' variant="light" size="sm" />
                      }
                      <p className='my-1'>{!!isSubmissionLoading ? "Mengirim pengajuan..." : "Kirim pengajuan"} <span className='bi bi-send-fill ms-2' /> </p>
                    </div>
                  </Button>
                </div>
              </div>

              <div className='rounded-4 add-item-shadow overflow-hidden mt-4' style={{ minHeight: "450px", backgroundColor: "rgba(157, 157, 157, 0.11)" }}>
                <div className='h-100' style={{ overflowY: "auto" }}>
                  <div style={{ minWidth: "1200px" }}>
                    <Table borderless>
                      <thead style={{ position: "sticky", top: "0px" }}>
                        <tr>
                          <th style={{ backgroundColor: "#EFEFEF" }}>No</th>
                          <th style={{ backgroundColor: "#EFEFEF" }}>Jenis cuti</th>
                          <th style={{ backgroundColor: "#EFEFEF" }}>Durasi</th>
                          <th style={{ backgroundColor: "#EFEFEF" }}>Dari</th>
                          <th style={{ backgroundColor: "#EFEFEF" }}>Sampai</th>
                          <th style={{ backgroundColor: "#EFEFEF" }}>Status</th>
                          <th style={{ backgroundColor: "#EFEFEF" }}>Surat</th>
                          <th style={{ backgroundColor: "#EFEFEF", width: "10px" }}><div className='rounded-circle bg-light add-item-shadow d-flex justify-content-center align-items-center cursor-pointer' style={{ width: "30px", height: "30px" }} onClick={() => setReload(prev => !prev)}><span className="bi bi-arrow-clockwise fs-3" /></div></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          personalLeaveHistory.map((result, i) => {
                            const startDateOfPermission = new Date(result.start_date)
                            const endDateOfPermission = new Date(result.end_date)
                            let selisihHari = Math.floor((endDateOfPermission - startDateOfPermission) / (24 * 60 * 60 * 1000))
                            return (
                              <tr>
                                <td>{i + 1}</td>
                                <td>{result.descriptions}</td>
                                <td>Cuti selama {selisihHari} hari</td>
                                <td>{result.start_date}</td>
                                <td>{result.end_date}</td>
                                <td>{result.agreement === "waiting"
                                  ?
                                  <p className="p-0 m-0 fw-bold">Menunggu <span className="text-warning bi bi-exclamation-circle-fill m-0 p-0" /> </p>
                                  :
                                  result.agreement === "not approved"
                                    ?
                                    <p className="p-0 m-0 fw-bold">Ditolak <span className="text-danger bi bi-x-circle-fill m-0 p-0" /> </p>
                                    :
                                    result.agreement === "approved"
                                    &&
                                    <p className="p-0 m-0 fw-bold">Disetujui <span className="text-success bi bi-check-circle-fill m-0 p-0" /> </p>}</td>
                                <td colSpan={2}>
                                  <div className='d-flex gap-2'>
                                    <Button className='d-flex justify-content-center align-items-center w-50 fw-bold rounded-4 add-item-shadow border border-dark' variant="info" onClick={() => downloadDocs(result.id, i)}>
                                      <div style={{ width: "150px" }}>
                                        {
                                          !!isPDFLoading && i === loadingItem
                                            ?
                                            <>
                                              <Spinner variant="dark" size="sm" />
                                              <span className='ms-2 fw-bold'>Mengunduh...</span>
                                            </>
                                            :
                                            <span className='fw-bold'>Unduh pengajuan</span>
                                        }
                                      </div>
                                    </Button>
                                    <Button className='d-flex justify-content-center align-items-center w-50 fw-bold rounded-4 add-item-shadow border border-dark' variant={`${result.agreement !== 'approved' ? "secondary" : "warning"}`} disabled={result.agreement !== 'approved' ? true : false} onClick={downloadApprovedDoc(localData.id, result.id, i)}>
                                      <div>
                                        {
                                          !!isDownloadApprovmentLoading && i === loadingItem
                                            ?
                                            <>
                                              <Spinner variant="light" size="sm" />
                                              <span className='ms-2 fw-bold'>Mengunduh...</span>
                                            </>
                                            :
                                            <span className='fw-bold'>Unduh persetujuan</span>
                                        }
                                      </div>
                                    </Button>
                                  </div>
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
  )
}

export default ApplyForPersonalLeave
