import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Spinner, Table } from 'react-bootstrap'
import API_URL from '../../../API/API_URL'
import downloadPDF from '../../Attendance/Components/DownloadPDF'
import ProgresBarLoadingVisual from '../../../Global-components/Progres-bar-loading-visual'

const ApplyPermissionDocs = (props) => {

  const [userPermissionDatas, setuserPermissionDatas] = useState([])
  const [isPersonalLeaveDataLoading, setIsPersonalLeaveDataLoading] = useState(true)
  const [isPDFLoading, setIsPDFLoading] = useState(false)
  const [loadingItem, setLoadingItem] = useState(0)

  const backToMenus = () => {
    props.back_button()
  }


  const downloadDocs = (staff_id, permission_id, item) => {
    setLoadingItem(item)
    setIsPDFLoading(true)
    const url = API_URL(staff_id, permission_id).USER_PERMISSION.GET_DOCS
    axios.get(url).then(response => {
      downloadPDF(response.data.docs)
      setIsPDFLoading(false)
    })
  }




  useEffect(() => {
    const url = API_URL('all').USER_PERMISSION.GET_PERMISSION_DATAS
    axios.get(url).then(response => {
      setuserPermissionDatas(response.data)
      setIsPersonalLeaveDataLoading(false)
    })
  }, [])

  return (
    <>
      <div className='d-flex gap-3 border-top pt-4 align-items-center'>
        <Button className='add-item-shadow' onClick={() => { backToMenus() }} variant='dark'> <span className='bi bi-arrow-left' /> </Button>
        <h4 className='m-0 0-0'>Daftar surat pengajuan izin</h4>
      </div>
      <div className='rounded-4 add-item-shadow overflow-hidden my-3' style={{ minHeight: "450px", backgroundColor: "rgba(157, 157, 157, 0.11)" }}>
        <div className='h-100' style={{ overflowY: "auto" }}>
          <Table borderless hover>
            <thead style={{ position: "sticky", top: "0px" }}>
              <tr>
                <th style={{ backgroundColor: "#EFEFEF" }}>No</th>
                <th style={{ backgroundColor: "#EFEFEF" }}>Foto</th>
                <th style={{ backgroundColor: "#EFEFEF" }}>Nama</th>
                <th style={{ backgroundColor: "#EFEFEF" }}>Durasi</th>
                <th style={{ backgroundColor: "#EFEFEF" }}>Status</th>
                <th style={{ backgroundColor: "#EFEFEF" }}>Mulai izin</th>
                <th style={{ backgroundColor: "#EFEFEF" }}>Akhir izin</th>
                <th className='text-center' style={{ backgroundColor: "#EFEFEF" }}>Surat</th>
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
                      <td className='align-middle'>{result.first_name} {result.last_name} </td>
                      <td className='align-middle'>Izin selama {selisihHari} hari</td>
                      <td className='align-middle'>{
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
                      <td className='align-middle'>{result.start_date}</td>
                      <td className='align-middle'>{!!result.end_date ? result.end_date : "-"}</td>
                      <td className='align-middle text-center'>
                        <Button className='rounded-4 border border-dark add-item-shadow fw-bold' variant={result.agreement !== "approved" ? 'secondary' : 'warning'} disabled={result.agreement === 'approved' ? false : true} onClick={() => downloadDocs(result.user_id, result.permission_id, i)}>
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
    </>
  )
}

export default ApplyPermissionDocs
