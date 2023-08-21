import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, Collapse, Spinner, Table } from 'react-bootstrap'
import API_URL from '../../../API/API_URL'
import downloadPDF from './DownloadPDF'
import AgreementPersonalLeavePDF from '../../../PDFFile/Agreement-personal-leave-PDF'
import ProgresBarLoadingVisual from '../../../Global-components/Progres-bar-loading-visual'

const AgreementPersonalLeave = () => {

  const localData = JSON.parse(localStorage.getItem('obj'))
  const [personalLeaveDatas, setPersonalLeaveDatas] = useState([])
  const [openDetailByItem, setOpenDetailByItem] = useState(0)
  const [open, setOpen] = useState(false)
  const [loadingItem, setLoadingItem] = useState(0)
  const [isDownloadApplyDocLoading, setIsDownloadApplyDocLoading] = useState(false)
  const [userDetail, setUserDetail] = useState({})
  const [isApprovingLoading, setIsApprovingLoading] = useState(false)
  const [isNotApprovingLoading, setIsNotApprovingLoading] = useState(false)
  const [refreshTable, setRefreshTable] = useState(false)
  const [isDownloadApprovmentLoading, setIsDownloadApprovmentLoading] = useState(false)
  const [isPersonalLeaveDataLoading, setIsPersonalLeaveDataLoading] = useState(true)




  const openDetail = (i) => {
    setOpen(prev => !prev)
    setOpenDetailByItem(i)
  }

  const downloadApplyDoc = (staf_id, personal_leave_id, item) => {
    setLoadingItem(item)
    setIsDownloadApplyDocLoading(true)
    const url = API_URL(staf_id, personal_leave_id).PERSONAL_LEAVE.GET_PERSONAL_LEAVE_APPLY_DOC
    axios.get(url).then(response => {
      downloadPDF(response.data.docs)
      setIsDownloadApplyDocLoading(false)
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


  const personalLeaveNotApproving = (staf_id, personal_leave_id, agreement) => {
    setIsNotApprovingLoading(true)
    const url = API_URL().PERSONAL_LEAVE.PERSONAL_LEAVE_APPROVING
    const data = {
      "user_id": staf_id,
      "personal_leave_id": personal_leave_id,
      "agreement": agreement,
      "agreement_docs": null,
    }
    axios.put(url, data).then(response => {
      if (response.data) {
        setRefreshTable(prev => !prev)
        setIsNotApprovingLoading(false)
      }
    })

  }

  const personalLeaveApproving = ({ staf_id, personal_leave_id, agreement, start_date, email, end_date, descriptions, created_at, alamat, first_name, last_name, role, is_approving }) => {

    setIsApprovingLoading(true)

    const agreementPersonalLeavePDFData = {
      personal_leave_type: descriptions,
      user_name: `${first_name} ${last_name}`,
      user_role: role,
      email: email,
      alamat: alamat,
      start_date: start_date,
      end_date: end_date,
      created_at: created_at,
      hv_name: `${userDetail.first_name} ${userDetail.last_name} `,
      hv_signature: userDetail.signature_data,
      staf_id: staf_id,
      personal_leave_id: personal_leave_id,
      agreement: agreement,
      is_approving: is_approving
    }

    AgreementPersonalLeavePDF(agreementPersonalLeavePDFData, (response) => {
      if (response) {
        setIsApprovingLoading(false)
        setRefreshTable(prev => !prev)
      }
    })
    // console.log(data)

  }

  // user_id
  // personal_leave_id
  // agreement
  // agreement_docs



  useEffect(() => {
    const url = API_URL().PERSONAL_LEAVE.GET_ALL_PERSONAL_LEAVE_DATAS
    axios.get(url).then(response => {
      setPersonalLeaveDatas(response.data)
      setIsPersonalLeaveDataLoading(false)
    })
  }, [refreshTable])

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
          signature_data: response.data.signature_data
        })
      })
    }
    getUserDetail()

  }, [])


  return (
    <Card className='p-3 rounded-4 border-0 bg-transparent' style={{ minHeight: "400px" }}>
      {
        localData.role === "Kepala Desa"
        ?
        <h3 className='bi bi-arrow-up-left-circle'> Persetujuan cuti</h3>
        :
        <h3 className='bi bi-arrow-up-left-circle'> Daftar cuti staf</h3>
        

      }
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
                  <th style={{ backgroundColor: "#EFEFEF" }}>Deskripsi</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Detail</th>
                </tr>
              </thead>
              <tbody>
                {
                  !!isPersonalLeaveDataLoading
                  &&
                  <tr>
                    <td colSpan={7}>
                      <ProgresBarLoadingVisual theme={"secondary"} titleTxt={"Memuat data pengajuan..."} />
                    </td>
                  </tr>
                }
                {
                  personalLeaveDatas.map((result, i) => {
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
                          <td className='align-middle'>{i + 1}</td>
                          <td className='align-middle'>
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
                          <td className='align-middle'>{result.email} </td>
                          <td className="align-middle">{
                            result.agreement === "waiting"
                              ?
                              <p className="p-0 m-0 fw-bold">Belum disetujui <span className="text-warning bi bi-exclamation-circle-fill m-0 p-0" /> </p>
                              :
                              result.agreement === "not approved"
                                ?
                                <p className="p-0 m-0 fw-bold">Tidak disetujui <span className="text-danger bi bi-x-circle-fill m-0 p-0" /> </p>
                                :
                                result.agreement === "approved"
                                &&
                                <p className="p-0 m-0 fw-bold">Disetujui <span className="text-success bi bi-check-circle-fill m-0 p-0" /> </p>
                          }</td>
                          <td className='align-middle'>{result.descriptions}</td>
                          <td className='align-middle'>
                            <Button className='rounded-4 add-item-shadow border border-secondary' variant='warning' style={{ width: "150px" }} onClick={() => { openDetail(i) }}>{!!open && i === openDetailByItem ? "Tutup detail" : "Tampilkan detail"}</Button>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={7} className='m-0 p-0'>
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
                                          <th>Jenis cuti</th>
                                          <td className='pe-1'>:</td>
                                          <td>{result.descriptions}</td>
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
                                        result.agreement === "waiting"
                                          ?
                                          <>
                                            <Button
                                              className='rounded-4 border border-dark add-item-shadow w-50 fw-bold'
                                              variant='success'
                                              disabled={isApprovingLoading}
                                              onClick={() => personalLeaveApproving({ staf_id: result.staf_id, personal_leave_id: result.personal_leave_id, agreement: result.agreement, alamat: result.alamat, start_date: result.start_date, email: result.email, end_date: result.end_date, descriptions: result.descriptions, created_at: result.created_at, first_name: result.first_name, last_name: result.last_name, role: result.role, is_approving: "approved" })}>
                                              <div>
                                                {
                                                  !!isApprovingLoading && i === loadingItem
                                                    ?
                                                    <>
                                                      <Spinner variant="dark" size="sm" />
                                                      <span className='ms-2 fw-bold'>Menyetujui...</span>
                                                    </>
                                                    :
                                                    <span className='fw-bold'>Setujui</span>
                                                }
                                              </div>
                                            </Button>
                                            <Button className='rounded-4 border border-dark add-item-shadow w-50 fw-bold' variant='danger' onClick={() => personalLeaveNotApproving(result.staf_id, result.personal_leave_id, "not approved")}>
                                              <div>
                                                {
                                                  !!isNotApprovingLoading && i === loadingItem
                                                    ?
                                                    <>
                                                      <Spinner variant="dark" size="sm" />
                                                      <span className='ms-2 fw-bold'>Menolak persetujuan...</span>
                                                    </>
                                                    :
                                                    <span className='fw-bold'>Tolak</span>
                                                }
                                              </div>
                                            </Button>
                                          </>
                                          :
                                          result.agreement === "not approved"
                                            ?
                                            <h5 className='text-danger fw-bold w-100 mt-1'> Pengajuan cuti telah ditolak</h5>
                                            :
                                            <>
                                              <h5 className='text-success fw-bold w-50 mt-1'> Telah disetujui</h5>
                                              <Button className='rounded-4 border border-dark add-item-shadow w-50 fw-bold' variant='success' onClick={() => downloadApprovedDoc(result.staf_id, result.personal_leave_id, i)}>
                                                <div>
                                                  {
                                                    !!isDownloadApprovmentLoading && i === loadingItem
                                                      ?
                                                      <>
                                                        <Spinner variant="light" size="sm" />
                                                        <span className='ms-2 fw-bold'>Mengunduh...</span>
                                                      </>
                                                      :
                                                      <span className='fw-bold'>Unduh surat persetujuan</span>
                                                  }
                                                </div>
                                              </Button>
                                            </>
                                      }
                                      <Button className='rounded-4 border border-dark add-item-shadow w-50 fw-bold' variant='warning' onClick={() => downloadApplyDoc(result.staf_id, result.personal_leave_id, i)}>
                                        <div>
                                          {
                                            !!isDownloadApplyDocLoading && i === loadingItem
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
                                    :null
                                    }
                                  </div>
                                </div>
                              </div>
                            </Collapse>
                          </td>
                        </tr>
                      </Fragment>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AgreementPersonalLeave
