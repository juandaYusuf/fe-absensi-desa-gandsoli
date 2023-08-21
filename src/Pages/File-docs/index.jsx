import React, { useState } from 'react'
import { Button, Card, Container, Form, InputGroup, Spinner } from 'react-bootstrap'
import ThemingCangerFunc from '../../Theme'
import { SlideLeft } from '../../Page-transition/PageTransitions'
import PorbiddenAccess from '../../Global-components/Porbidden-access'
import Doc1 from '../../Assets/card-image/1.png'
import Doc2 from '../../Assets/card-image/2.png'
import Doc3 from '../../Assets/card-image/3.png'
import { LeftToRight, RightToLeft } from '../../Page-transition/ComponentTransitions'
import ApplyPermissionDocs from './Components/Apply-permission-docs'
import PresenceDocsManager from './Components/Presence-docs-manager'
import ApplyAndAgreementPersonalLeaveDocs from './Components/Apply-personal-leave-docs'
import AttendanceSheetPDF from '../../PDFFile/Attendance-sheet-PDF'


const DocFiles = () => {

  const localData = JSON.parse(localStorage.getItem('obj'))
  const startYear = new Date().getFullYear()
  const [menuSelect, setmenuSelect] = useState(0)
  const [yearSelected, setYearSelected] = useState(startYear)
  const [monthSelected, setMonthSelected] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  let years = []

  const endYear = startYear - 10; // Contohnya, menampilkan 10 tahun ke belakang
  for (let year = startYear; year >= endYear; year--) {
    years.push(year)
  }

  const months = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' }
  ];

  const monthOptions = months.map(month => (
    <option key={month.value} value={month.value}>
      {month.label}
    </option>
  ));



  return (
    localData.role === 'master'
      ?
      <SlideLeft>
        <Container className={` ${ThemingCangerFunc().gradient} add-item-shadow rounded-4 p-4 overflow-hidden d-flex flex-column`} style={ThemingCangerFunc("white").style} >
          <div style={{ minHeight: "100vh" }}>
            <h3 className='bi bi-filetype-pdf mb-4'>Berkas</h3>
            {
              menuSelect === 0 || menuSelect === 2
                ?
                <RightToLeft>
                  <div className='d-flex gap-3 justify-content-center flex-wrap'>
                    <Card className='rounded-4 overflow-hidden card-bg-gradient add-item-shadow' style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={Doc2} />
                      <Card.Body>
                        <Card.Title className='fw-bold'>Berkas pengajuan izin</Card.Title>
                        <RightToLeft>
                          <Card.Text>
                            Menu ini berisi berkas - berkas surat pengajuan izin dari seluruh staf yang pernah melakukan izin.
                          </Card.Text>
                        </RightToLeft>
                      </Card.Body>
                      <div className='p-3'>
                        <Button className='fw-bold add-item-shadow rounded-4 w-100 border border-secondary border-2 add-item-shadoe' variant="info" onClick={() => setmenuSelect(1)}>Lihat berkas</Button>
                      </div>
                    </Card>

                    <Card className='rounded-4 overflow-hidden card-bg-gradient add-item-shadow' style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={Doc1} />
                      <Card.Body>
                        <Card.Title className='fw-bold'>Berkas laporan absensi bulanan</Card.Title>
                        {
                          menuSelect === 2
                            ?
                            <LeftToRight>
                              <div className='d-flex flex-column'>
                                <div className='d-flex justify-content-between'>
                                  <span>Pilih tahun dan bulan</span>
                                  <span className='bi bi-arrow-right cursor-pointer' onClick={() => setmenuSelect(0)} />
                                </div>
                                <Form.Select className='rounded-4 mb-2' aria-label="Default select example" onChange={(e) => setYearSelected(e.target.value)}>
                                  {
                                    years.map((result, i) => {
                                      return (
                                        <option key={i} value={result}>{result}</option>

                                      )
                                    })
                                  }
                                </Form.Select>
                                <Form.Select className='rounded-4' aria-label="Default select example" onChange={(e) => setMonthSelected(e.target.value)}>
                                  {months.map(month => (
                                    <option key={month.value} value={month.value}>
                                      {month.label}
                                    </option>
                                  ))}
                                </Form.Select>
                              </div>
                            </LeftToRight>
                            :
                            <RightToLeft>
                              <Card.Text>
                                Menu ini berisi berkas - berkas laporan lembar absensi harian yang telah disusun dalam setiap bulannya.
                              </Card.Text>
                            </RightToLeft>
                        }
                      </Card.Body>
                      <div className='p-3'>
                        <Button
                          className='fw-bold add-item-shadow rounded-4 w-100 border border-secondary border-2 add-item-shadoe'
                          variant="warning"
                          disabled={isDownloading}
                          onClick={() => {
                            if (menuSelect === 2) {
                              setIsDownloading(true)
                              AttendanceSheetPDF(parseInt(monthSelected), parseInt(yearSelected), (cb) => setIsDownloading(cb))
                            } else {
                              setmenuSelect(2)
                            }
                          }}>
                          {
                            isDownloading === true
                              ?
                              <div className='w-100 '>
                                <Spinner size='sm' variant='dark' /> Menyiapkan berkas...
                              </div>
                              :
                              menuSelect === 2
                                ?
                                "Unduh"
                                :
                                "Pilih tahun dan bulan"
                          }
                        </Button>
                      </div>
                    </Card>

                    <Card className='rounded-4 overflow-hidden card-bg-gradient add-item-shadow' style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={Doc3} />
                      <Card.Body>
                        <Card.Title className='fw-bold'>Berkas pengajuan dan persetujuan cuti</Card.Title>
                        <RightToLeft>
                          <Card.Text>
                            Menu ini berisi berkas - berkas surat pengajuan beserta persetujuan cuti dari seluruh staf yang pernah melakukan cuti.
                          </Card.Text>
                        </RightToLeft>
                      </Card.Body>
                      <div className='p-3'>
                        <Button className='fw-bold add-item-shadow rounded-4 w-100 border border-secondary border-2 add-item-shadoe' variant="info" onClick={() => setmenuSelect(3)}>Lihat berkas</Button>
                      </div>
                    </Card>
                  </div>
                </RightToLeft>
                :
                null
            }
            <div>
              {
                menuSelect === 1
                &&
                <LeftToRight>
                  <ApplyPermissionDocs back_button={() => setmenuSelect(0)} />
                </LeftToRight>
              }
              {
                menuSelect === 3
                &&
                <LeftToRight>
                  <ApplyAndAgreementPersonalLeaveDocs back_button={() => setmenuSelect(0)} />
                </LeftToRight>
              }
            </div>
          </div>
        </Container>
      </SlideLeft>
      :
      <PorbiddenAccess />
  )
}

export default DocFiles
