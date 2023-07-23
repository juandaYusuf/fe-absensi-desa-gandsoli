import React, { useContext, useRef, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import UserContext from '../../../Context/Context'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import TableDetailPresence from './Table-detail-presence'
import Logo from '../../../Assets/Logo/logo.png'

const PDFFile = () => {
  const { setcontextShowPDF, contextPDFDatas } = useContext(UserContext)
  const pdfRef = useRef()

  const downloadPDF = () => {
    const input = pdfRef.current

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL(Logo)
      const pdf = new jsPDF('p', 'mm', 'a4', true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 10
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save('Rekapitulasi')
    })
  }



  return (
    <div className='p-3 d-flex flex-column' style={{ minHeight: "100vh" }}>
      <div className='mb-4'>
        <Button
          className='rounded-4 bi bi-arrow-left-short add-item-shadow'
          variant='secondary'
          onClick={() => setcontextShowPDF(false)}>
          Kembali
        </Button>
        <div className='d-flex justify-content-end mb-3'>
          <Button className='rounded-4 add-item-shadow bi bi-cloud-arrow-down' variant='danger' onClick={() => downloadPDF()}> Download</Button>
        </div>
        <div className='border py-5 rounded-4'>
          <div
            className='bg-white px-5 mx-4'
            ref={pdfRef}>
            <div className='d-flex border-bottom border-4 border-dark pb-3'>
              <img src={Logo} style={{ width: "90px", height: "90", objectFit: "contain" }} />
              <div className='d-flex flex-column align-items-center w-100'>
                <h3 className='text-center fw-bold'>PEMERINTAH KABUPATEN PURWAKARTA <br /> KECAMATAN PLERED <br /> KANTOR KEPALA DESA GANDASOLI </h3>
                <i>Jl. Raya Gandasoli No 91 Plered - Purwakarta</i>
                <i>Email : gandasoli21@gmail.com</i>
              </div>
              <div style={{ width: "90px", height: "90", objectFit: "contain" }} />
            </div>
            <div className='w-100 border-top border-dark pt-5' style={{ marginTop: "0.5px" }}>
              <h4 className='text-center fw-bold border-bottom pb-2'>Rekam kehadiran</h4>
              <table className='w-100 mb-5'>
                <tr>
                  <th > <div style={{ width: "150px" }}>Nama Lengkap</div></th>
                  <th className='ps-3'> :</th>
                  <td className='ps-1 w-100'>
                    <div className='border-bottom border-dark'>
                      {contextPDFDatas.nama}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th> <div style={{ width: "150px" }}>Bagian</div></th>
                  <th className='ps-3'> :</th>
                  <td className='ps-1'>
                    <div className='border-bottom border-dark'>
                      {contextPDFDatas.role}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th> <div style={{ width: "150px" }}>Alamat</div></th>
                  <th className='ps-3'> :</th>
                  <td className='ps-1'>
                    <div className='border-bottom border-dark'>
                      {contextPDFDatas.alamat}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th> <div style={{ width: "150px" }}>Email</div></th>
                  <th className='ps-3'> :</th>
                  <td className='ps-1'>
                    <div className='d-flex'>
                      <div className='border-bottom border-dark pe-5'>
                        {contextPDFDatas.email}
                      </div>
                      <div className='w-100 d-flex' style={{ width: "150px" }}>
                        <p className='fw-bold m-0 p-0'>No Telepon :</p>
                        <div className='border-bottom border-dark w-50'>
                          <p className=' m-0 p-0'> {contextPDFDatas.no_telepon}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Tahun</th>
                  <th className='ps-3'> :</th>
                  <td className='ps-1'>
                    <div className='border-bottom border-dark'>
                      {contextPDFDatas.tahun}
                    </div>
                  </td>
                </tr>
              </table>
              <div className='border'>
                <TableDetailPresence year={contextPDFDatas.tahun} user_id={contextPDFDatas.user_id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PDFFile
