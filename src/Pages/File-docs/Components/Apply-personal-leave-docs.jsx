import React, { useEffect, useState } from 'react'
import { Button, Spinner, Table } from 'react-bootstrap'
import API_URL from '../../../API/API_URL'
import axios from 'axios'
import downloadPDF from '../../Attendance/Components/DownloadPDF'
import ProgresBarLoadingVisual from '../../../Global-components/Progres-bar-loading-visual'

const ApplyAndAgreementPersonalLeaveDocs = (props) => {

  const [isPersonalLeaveDataLoading, setIsPersonalLeaveDataLoading] = useState(true)
  const [personalLeaveDatas, setPersonalLeaveDatas] = useState([])
  const [loadingItem, setLoadingItem] = useState(0)
  const [isPDFLoading, setIsPDFLoading] = useState(false)
  const [isDownloadApprovmentLoading, setIsDownloadApprovmentLoading] = useState(false)


  const backToMenus = () => {
    props.back_button()
  }

  const downloadDocs = (staff_id, personal_leave_id, item) => {
    setLoadingItem(item)
    setIsPDFLoading(true)
    const url = API_URL(staff_id, personal_leave_id).PERSONAL_LEAVE.GET_PERSONAL_LEAVE_APPLY_DOC
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
    const url = API_URL().PERSONAL_LEAVE.GET_ALL_PERSONAL_LEAVE_DATAS
    axios.get(url).then(response => {
      setPersonalLeaveDatas(response.data)
      setIsPersonalLeaveDataLoading(false)
    })
  }, [])

  return (
    <>
      <div className='d-flex gap-3 border-top pt-4 align-items-center'>
        <Button className='add-item-shadow' onClick={() => { backToMenus() }} variant='dark'> <span className='bi bi-arrow-left' /> </Button>
        <h4 className='m-0 0-0'>Daftar surat pengajuan dan persetujuan cuti</h4>
      </div>
      <div className='rounded-4 add-item-shadow overflow-hidden my-3' style={{ minHeight: "450px", backgroundColor: "rgba(157, 157, 157, 0.11)" }}>
        <div className='h-100' style={{ overflowY: "auto" }}>
          <div style={{ minWidth: "928px" }}>
            <Table borderless>
              <thead style={{ position: "sticky", top: "0px" }}>
                <tr>
                  <th style={{ backgroundColor: "#EFEFEF" }}>No</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Foto</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Nama</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Durasi</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Mulai cuti</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Akhir cuti</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Deskripsi</th>
                  <th style={{ backgroundColor: "#EFEFEF" }}>Surat</th>
                </tr>
              </thead>
              <tbody>
                {
                  !!isPersonalLeaveDataLoading
                  &&
                  <tr>
                    <td colSpan={8}>
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
                      <tr key={i}>
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
                        <td className='align-middle'>Cuti selama {selisihHari} hari</td>
                        <td className='align-middle'>{result.start_date}</td>
                        <td className='align-middle'>{result.end_date}</td>
                        <td className='align-middle'>{result.descriptions}</td>
                        <td className='align-middle'>
                          <div className='d-flex gap-2'>
                            <Button className='d-flex justify-content-center align-items-center w-50 fw-bold rounded-4 add-item-shadow border border-dark' variant="info" onClick={() => downloadDocs(result.staf_id, result.personal_leave_id, i)}>
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
                            <Button className='d-flex justify-content-center align-items-center w-50 fw-bold rounded-4 add-item-shadow border border-dark' variant={`${result.agreement !== 'approved' ? "secondary" : "warning"}`} disabled={result.agreement !== 'approved' ? true : false} onClick={() => downloadApprovedDoc(result.staf_id, result.personal_leave_id, i)}>
                              <div>
                                {
                                  !!isDownloadApprovmentLoading && i === loadingItem
                                    ?
                                    <>
                                      <Spinner variant="dark" size="sm" />
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
  )
}

export default ApplyAndAgreementPersonalLeaveDocs
