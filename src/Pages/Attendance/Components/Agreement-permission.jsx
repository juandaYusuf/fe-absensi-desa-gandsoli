import React, { Fragment, useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Collapse, Table, Spinner } from 'react-bootstrap'
import ProgresBarLoadingVisual from '../../../Global-components/Progres-bar-loading-visual'
import axios from 'axios'
import API_URL from '../../../API/API_URL'
import PermissionPDF from '../../../PDFFile/Permission-PDF'
import downloadPDF from './DownloadPDF'

const AgreementPermission = () => {

  const [selectedOptions, setSelectedOptions] = useState("today")
  const [isUserPermissionDatasLoading, setIsUserPermissionDatasLoading] = useState(true)
  const [userPermissionDatas, setuserPermissionDatas] = useState([])
  const [open, setOpen] = useState(false)
  const localData = JSON.parse(localStorage.getItem('obj'))
  const [agreementStatus, setAgreementStatus] = useState('')
  const [openDetailByItem, setOpenDetailByItem] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isPDFLoading, setIsPDFLoading] = useState(false)



  const agreement = ({ staff_id, permission_id, agreement }) => {
    setLoading(true)
    const approvedPermission = () => {
      const urlAgreement = API_URL(staff_id, localData.id).USER_PERMISSION.GET_SINGLE_DATA
      axios.get(urlAgreement).then(response => {
        const startDateOfPermission = new Date(response.data.start_date)
        const endDateOfPermission = new Date(response.data.end_date)
        const selisihHari = Math.floor((endDateOfPermission - startDateOfPermission) / (24 * 60 * 60 * 1000))
        let totalNotWorking = null
        if (response.data.end_date) {
          totalNotWorking = `selama ${selisihHari} hari, terhitung sejak ${response.data.start_date} sampai ${response.data.end_date}`
        } else {
          totalNotWorking = `selama 1 (satu) hari, pada tanggal ${response.data.start_date}`
        }
        const dataForPermissionPDF = {
          user_id: response.data.id,
          nama: `${response.data.first_name} ${response.data.last_name}`,
          jabatan: response.data.role,
          alamat: response.data.alamat,
          jumlah_hari: totalNotWorking,
          alasan: response.data.reason,
          kepdes_signature: response.data.head_village_signature,
          staf_signature: response.data.staff_signature,
          agreement: agreement,
          permission_id: permission_id
        }
        // mengimplementasikan callBackFN
        PermissionPDF(dataForPermissionPDF, (fn) => setAgreementStatus(fn))
        setLoading(false)
      })
    }

    const notApprovedPermission = () => {
      const urlNotApproving = API_URL().USER_PERMISSION.PERMISSION_APPROVING
      const dataNotApproving = {
        "user_id": staff_id,
        "permission_id": permission_id,
        "agreement": agreement,
        "docs": null,
      }
      axios.put(urlNotApproving, dataNotApproving).then(response => {
        setAgreementStatus(response.data.message)
        setLoading(false)
      })
    }

    if (agreement === "approved") {
      approvedPermission()
    } else if (agreement === "not approved") {
      notApprovedPermission()
    }

  }

  const openDetail = (i) => {
    setOpen(prev => !prev)
    setOpenDetailByItem(i)
  }

  const downloadPDFSubmission = (user_id, permission_id) => {
    setIsPDFLoading(true)
    const url = API_URL(user_id, permission_id).USER_PERMISSION.GET_DOCS
    axios.get(url).then(response => {
      downloadPDF(response.data.docs)
      setIsPDFLoading(false)
    })
  }


  useEffect(() => {
    setIsUserPermissionDatasLoading(true)
    const url = API_URL(selectedOptions).USER_PERMISSION.GET_PERMISSION_DATAS
    axios.get(url).then(response => {
      setIsUserPermissionDatasLoading(false)
      setuserPermissionDatas(response.data)
    })
  }, [selectedOptions, agreementStatus])

  return (
    <Card className='p-3 rounded-4 border-0 bg-transparent' style={{ minHeight: "400px" }}>
      {
        localData.role === "Kepala Desa"
        ?
        <h3 className='bi bi-arrow-up-left-circle'> Persetujuan izin</h3>
        :
        <h3 className='bi bi-arrow-up-left-circle'> Daftar izin staf</h3>
      }
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
          <div style={{ minWidth: "928px" }}>
            <Table borderless>
              <thead style={{ position: "sticky", top: "0px" }}>
                <tr>
                  <th style={{ backgroundColor: "#EFEFEF" }}>No</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Foto</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Nama</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Email</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Status</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Detail</th>
                </tr>
              </thead>
              <tbody>
                {
                  !!isUserPermissionDatasLoading
                    ?
                    <tr>
                      <td colSpan={6} className='py-4 text-center'>
                        <ProgresBarLoadingVisual />
                      </td>
                    </tr>
                    :
                    userPermissionDatas.map((result, i) => {
                      const startDateOfPermission = new Date(result.start_date)
                      const endDateOfPermission = new Date(result.end_date)
                      let selisihHari = Math.floor((endDateOfPermission - startDateOfPermission) / (24 * 60 * 60 * 1000))
                      if (!!result.end_date) {
                        selisihHari = Math.floor((endDateOfPermission - startDateOfPermission) / (24 * 60 * 60 * 1000))
                      } else {
                        selisihHari = 1
                      }
                      return (
                        <Fragment key={i}>
                          <tr>
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
                            <td className='align-middle'>
                              <Button className='rounded-4 add-item-shadow border border-secondary' variant='warning' style={{ width: "150px" }} onClick={() => { openDetail(i) }}>{!!open && i === openDetailByItem ? "Tutup detail" : "Tampilkan detail"}</Button>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={6} className='m-0 p-0'>
                              <Collapse in={!!open && i === openDetailByItem ? open : null}>
                                <div id="example-collapse-text">
                                  <div className='mx-4 my-4 bg-light rounded-4 py-2 border add-item-shadow d-flex align-items-center flex-column'>
                                    {
                                      result.agreement === 'waiting'
                                        ?
                                        <span className="text-warning fw-bold">Belum disetujui</span>
                                        :
                                        result.agreement === 'not approved'
                                          ?
                                          <span className="text-danger fw-bold">Tidak disetujui</span>
                                          :
                                          result.agreement === 'approved'
                                          &&
                                          <span className="text-success fw-bold">Disetujui</span>
                                    }
                                    <p className='fw-bold'>Permohonan izin yang diajukan pada tanggal {result.created_at} oleh :</p>
                                    {
                                      !!result.profile_picture
                                        ?
                                        (<img
                                          src={'data:image/jpeg;base64,' + result.profile_picture}
                                          className='rounded-circle border add-item-shadow'
                                          style={{ height: "90px", width: "90px", objectFit: "cover" }} />)
                                        :
                                        (<div className='border d-flex justify-content-center rounded-circle align-item-end add-item-shadow' style={{ height: "90px", width: "90px", backgroundColor: "#E9E9E9" }} >
                                          <span className='bi bi-person-fill m-0 p-0 text-secondary' style={{ fontSize: "4rem" }} />
                                        </div>)
                                    }
                                    <div>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <th>Nama</th>
                                            <td className='pe-1'>:</td>
                                            <td>{result.first_name} {result.last_name}</td>
                                          </tr>
                                          <tr>
                                            <th>Jabatan</th>
                                            <td className='pe-1'>:</td>
                                            <td>{result.role}</td>
                                          </tr>
                                          <tr>
                                            <th>No Telepon</th>
                                            <td className='pe-1'>:</td>
                                            <td>{result.no_telepon}</td>
                                          </tr>
                                          <tr>
                                            <th>Alamat</th>
                                            <td className='pe-1'>:</td>
                                            <td>{result.alamat}</td>
                                          </tr>
                                          <tr>
                                            <th>Email</th>
                                            <td className='pe-1'>:</td>
                                            <td>{result.email}</td>
                                          </tr>
                                          <tr>
                                            <th>Alasan</th>
                                            <td className='pe-1'>:</td>
                                            <td>{result.reason}</td>
                                          </tr>
                                          {
                                            !!result.end_date
                                              ?
                                              <>
                                                <tr>
                                                  <th>Dari tanggal</th>
                                                  <td className='pe-1'>:</td>
                                                  <td>{result.start_date}</td>
                                                </tr>
                                                <tr>
                                                  <th>Sampai tanggal </th>
                                                  <td>:</td>
                                                  <td>{result.end_date}</td>
                                                </tr>
                                                <tr>
                                                  <th>Durasi</th>
                                                  <td className='pe-1'>:</td>
                                                  <td>{selisihHari} hari</td>
                                                </tr>
                                              </>
                                              :
                                              <>
                                                <tr>
                                                  <th>Tanggal</th>
                                                  <td className='pe-1'>:</td>
                                                  <td>{result.start_date}</td>
                                                </tr>
                                                <tr>
                                                  <th>Durasi</th>
                                                  <td className='pe-1'>:</td>
                                                  <td>{selisihHari} hari</td>
                                                </tr>
                                              </>
                                          }
                                        </tbody>
                                      </table>
                                      {
                                        localData.role === "Kepala Desa"
                                        ?
                                        <div className='w-100 d-flex gap-2 my-4'>
                                        {
                                          result.agreement === "approved"
                                            ?
                                            <div className='w-100 d-flex justify-content-between align-items-center'>
                                              <h4 className='text-success fw-bold'>Telah disetujui</h4>
                                              <Button className='rounded-4 border-dark fw-bold add-item-shadow' variant='success' disabled={!!isPDFLoading ? true : false} onClick={() => downloadPDFSubmission(result.user_id, result.permission_id)}>
                                                <div style={{ width: "200px" }}>
                                                  {
                                                    !!isPDFLoading
                                                      ?
                                                      <>
                                                        <Spinner variant="dark" size="sm" />
                                                        <span className='ms-2 fw-bold'>Mengunduh...</span>
                                                      </>
                                                      :
                                                      <span className='fw-bold'>Unduh surat pengajuan</span>
                                                  }
                                                </div>
                                              </Button>
                                            </div>
                                            :
                                            result.agreement === "not approved"
                                              ?
                                              <h4 className='text-danger fw-bold'>Tidak disetujui</h4>
                                              :
                                              <>
                                                <Button
                                                  className='w-100 rounded-4 add-item-shadow'
                                                  variant='outline-danger'
                                                  disabled={loading}
                                                  onClick={() => agreement({ staff_id: result.user_id, agreement: "not approved", permission_id: result.permission_id })}>
                                                  {
                                                    !!loading
                                                      ?
                                                      "Loading"
                                                      :
                                                      "Tolak"
                                                  }
                                                </Button>
                                                <Button
                                                  className='w-100 rounded-4 add-item-shadow'
                                                  variant='success'
                                                  disabled={loading}
                                                  onClick={() => { agreement({ staff_id: result.user_id, agreement: "approved", permission_id: result.permission_id }) }} >
                                                  {
                                                    !!loading
                                                      ?
                                                      "Loading"
                                                      :
                                                      "Setujui"
                                                  }
                                                </Button>
                                              </>
                                        }
                                      </div>
                                      : null
                                      }
                                      
                                    </div>
                                  </div>
                                </div>
                              </Collapse>
                            </td>
                          </tr>
                        </Fragment>
                      )
                    }
                    )
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AgreementPermission
