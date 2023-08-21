import { Button, Table } from 'react-bootstrap'
import React from 'react'
import AttendanceSheetPDF from '../../../PDFFile/Attendance-sheet-PDF'

const PresenceDocsManager = (props) => {
    const backToMenus = () => {
    props.back_button()
  }
  return (
    <>
      <div className='d-flex gap-3 border-top pt-4 align-items-center'>
        <Button className='add-item-shadow' onClick={() => { backToMenus() }} variant='dark'> <span className='bi bi-arrow-left' /> </Button>
        <h4 className='m-0 0-0'>Daftar Lembar absensi</h4>
      </div>
      <div className='rounded-4 add-item-shadow overflow-hidden my-3' style={{ minHeight: "450px", backgroundColor: "rgba(157, 157, 157, 0.11)" }}>
        <div className='h-100' style={{ overflowY: "auto" }}>
          <Table borderless>
            <thead style={{ position: "sticky", top: "0px" }}>
              <tr>
                <th style={{ backgroundColor: "#EFEFEF" }}>No</th>
                <th style={{ backgroundColor: "#EFEFEF" }}>Foto</th>
                <th style={{ backgroundColor: "#EFEFEF" }}>Nama</th>
                <th style={{ backgroundColor: "#EFEFEF" }}>Mulai cuti</th>
                <th style={{ backgroundColor: "#EFEFEF" }}>Akhir cuti</th>
                <th style={{ backgroundColor: "#EFEFEF" }}>Detail</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </Table>
          <button onClick={() => {AttendanceSheetPDF()}}>Test PDF</button>
        </div>
      </div>
    </>
  )
}

export default PresenceDocsManager

