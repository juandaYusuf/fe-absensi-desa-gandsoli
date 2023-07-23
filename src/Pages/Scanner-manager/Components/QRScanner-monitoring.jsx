import React, { useEffect, useState } from 'react'
import { Alert, Button, Container } from 'react-bootstrap'
import { QrReader } from "react-qr-reader"
import API_URL from '../../../API/API_URL'
import axios from 'axios'
import verified from '../../../Assets/Gif/verified.gif'
import warning from '../../../Assets/Gif/warning.gif'
import { LeftToRight, RightToLeft } from '../../../Page-transition/ComponentTransitions'
import { ZoomInSlide } from '../../../Page-transition/PageTransitions'




const QRScannerMonitoring = () => {


  const [qrCodeData, setQrCodeData] = useState("")
  const [qrCodeDataJSONFormat, setQrCodeDataJSONFormat] = useState(null)
  const [startScan, setStartScan] = useState(false)
  const [isdataValidated, setIsDataValidated] = useState({
    "status": "",
    "whichis": ""
  })
  const localData = JSON.parse(localStorage.getItem('obj'))



  const attendanceIn = ({ userID, status }) => {
    const url = API_URL().PRESENCE.USER_SCANNING_IN
    const datas = {
      "user_id": userID,
      "status": status
    }

    axios.post(url, datas).then((response) => {
      if (response.data.message === "thanks for scanned in") {
        setStartScan(false)
        setIsDataValidated({
          "status": "validated",
          "whichis": "in"
        })
      }
      if (response.data.message === "you have scanned today") {
        setIsDataValidated("you have scanned today")
        setIsDataValidated({
          "status": "you have scanned today",
          "whichis": "in"
        })
      }
    })
  }




  const attendanceOut = ({ userID, status }) => {
    const url = API_URL().PRESENCE.USER_SCANNING_OUT
    const datas = {
      "user_id": userID,
      "status": status
    }

    axios.post(url, datas).then((response) => {
      if (response.data.message === "thanks for scanned out") {
        setStartScan(false)
        setIsDataValidated("validated")
        setIsDataValidated({
          "status": "validated",
          "whichis": "out"
        })
      }
      if (response.data.message === "you have scanned today") {
        setIsDataValidated({
          "status": "you have scanned today",
          "whichis": "out"
        })
      }
    })
  }




  const scanningIn = () => {
    const url = API_URL().QR_SCANNER.QRCODE_SCANNING_IN_DATA
    const datasForServer = {
      "id": qrCodeDataJSONFormat.id,
      "tmstmp": qrCodeDataJSONFormat.tmstmp,
      "status": qrCodeDataJSONFormat.status
    }
    axios.post(url, datasForServer).then((response) => {
      if (response.data.message === "data has been validated") {
        attendanceIn({ userID: localData.id, status: qrCodeDataJSONFormat.status })
      } else if (response.data.message === "data couldn't be validated") {
        setStartScan(false)
        setIsDataValidated({
          "status": "not-validated",
          "whichis": ""
        })
      }
    })
  }




  const scanningOut = () => {
    const url = API_URL().QR_SCANNER.QRCODE_SCANNING_OUT_DATA
    const datasForServer = {
      "id": qrCodeDataJSONFormat.id,
      "tmstmp": qrCodeDataJSONFormat.tmstmp,
      "status": qrCodeDataJSONFormat.status
    }
    axios.post(url, datasForServer).then((response) => {
      if (response.data.message === "data has been validated") {
        attendanceOut({ userID: localData.id, status: qrCodeDataJSONFormat.status })
      } else if (response.data.message === "data couldn't be validated") {
        setStartScan(false)
        setIsDataValidated({
          "status": "not-validated",
          "whichis": ""
        })
      }
    })
  }




  const goToCamera = () => {
    // setStartScan(false)
    // setIsDataValidated("")
    window.location.reload(true)
  }




  useEffect(() => {
    if (qrCodeData === "") return
    try {
      setQrCodeDataJSONFormat(JSON.parse(qrCodeData))
    } catch (err) {
      setIsDataValidated({
        "status": "not-validated",
        "whichis": ""
      })
      setStartScan(false)

    }
  }, [qrCodeData])



  useEffect(() => {

    if (qrCodeData === "" || qrCodeDataJSONFormat === null) return
    if (qrCodeDataJSONFormat.status === "in") {
      scanningIn()
    }
    if (qrCodeDataJSONFormat.status === "out") {
      scanningOut()
    }

  }, [qrCodeDataJSONFormat])


  return (
    <>
      <div className=' d-flex justify-content-center align-items-center w-100 flex-column p-2'>
        {
          isdataValidated.status === ""
          &&
          <div>
            {
              isdataValidated.status !== "not-validated" || isdataValidated.status !== "validated"
                &&
                startScan === false
                ?
                <Button className='bi bi-camera-video add-item-shadow-success mb-3 rounded-4 fw-bold border-dark' variant="success" onClick={() => { setStartScan(!startScan) }}> Buka kamera</Button>
                :
                <Button className='bi bi-camera-video-off add-item-shadow-warning mb-3 rounded-4 fw-bold border-dark' variant="warning" onClick={() => { setStartScan(!startScan) }}> Tutup kamera</Button>
            }
          </div>
        }

        {
          isdataValidated.status === ""
            ?
            <LeftToRight>
              <div className=' scanner-container'>
                <div className=' qr-container add-item-shadow border border-2 border-secondary'>
                  <div className='w-100 d-flex justify-content-center'>
                    <div style={{ scale: "1.5", minWidth: "330px", minHeight: "330px"}}>
                      {
                        startScan
                        &&
                        (<QrReader
                          constraints={{ facingMode: 'environment' }}
                          delay={1000}
                          onResult={(result, error) => {
                            if (!!result) {
                              setQrCodeData(result?.text)
                            }
                            if (!!error) {
                              console.log("Tidak ada objek")
                            }
                          }}
                          style={{ width: '100%'}}
                        />)
                      }
                    </div>
                  </div>
                </div>
              </div>
            </LeftToRight>
            :
            isdataValidated.status === "validated"
              ?
              <RightToLeft>
                <div className='border border-info d-flex flex-column align-items-center verified-shadow rounded-4 pt-1' style={{ width: "300px" }} >
                  <img className='rounded-circle mx-3' src={verified} style={{ height: "150px", width: "150px" }} />
                  <Alert className='rounded-4 d-flex add-item-shadow flex-column justify-content-between border border-dark mx-2 my-2 h-100' variant='info'>
                    <div>
                      <h6 className='fw-bold text-center'>Terima kasih telah melakukan absen {isdataValidated.whichis === "in" ? "masuk" : "keluar"} </h6>
                      <hr />
                      <p className='text-muted ' style={{ textJustify: "auto", textAlign: "justify" }}>Halo, <b>Nama lengkap</b>. Anda melakukan absen pada tanggal <b>date</b>, jam <b>time</b>, dan berhasil dinyatakan hadir. Silahkan cek email untuk informasi kehadiran hari ini.</p>
                    </div>
                    <Button className='w-100 rounded-4 add-item-shadow border border-dark text-dark fw-bold bi bi-check-circle' variant='info' onClick={() => { goToCamera() }}> Ok</Button>
                  </Alert>
                </div>
              </RightToLeft>
              :
              isdataValidated.status === "not-validated"
                ?
                <ZoomInSlide>
                  <div className='border border-info d-flex flex-column align-items-center verified-shadow rounded-4 pt-1' style={{ width: "300px" }} >
                    <img className='' src={warning} style={{ height: "150px", width: "150px" }} />
                    <Alert className='rounded-4 d-flex add-item-shadow flex-column justify-content-between border border-dark mx-2 my-2 h-100' variant='danger'>
                      <div>
                        <h6 className='fw-bold text-center'>Data Qr Code tidak dapat divalidasi</h6>
                        <hr />
                        <p className='text-muted ' style={{ textJustify: "auto", textAlign: "justify" }}>Periksa kembali QR Code yang anda scan! Pastikan anda melakukan scan pada QRCOde sah yang di-<b><i className='text-decoration-underline'>Generate</i></b> oleh "http://localhost:3000"</p>
                        <Button className='w-100 rounded-4 add-item-shadow border border-dark text-dark fw-bold bi bi-check-circle' variant='danger' onClick={() => { goToCamera() }}> Ok</Button>
                      </div>
                    </Alert>
                  </div>
                </ZoomInSlide>
                :
                isdataValidated.status === "you have scanned today"
                &&
                <ZoomInSlide>
                  <div className='border border-info d-flex flex-column align-items-center verified-shadow rounded-4 pt-1' style={{ width: "300px" }} >
                    <img className='' src={warning} style={{ height: "150px", width: "150px" }} />
                    <Alert className='rounded-4 d-flex add-item-shadow flex-column justify-content-between border border-dark mx-2 my-2 h-100' variant='warning'>
                      <div>
                        <h6 className='fw-bold text-center'>Anda sudah melakukan scan absen {isdataValidated.whichis === "in" ? "masuk" : "keluar"} </h6>
                        <hr />
                        <p className='text-muted ' style={{ textJustify: "auto", textAlign: "justify" }}>Terimakasih anda telah melakukan scan absen {isdataValidated.whichis === "in" ? "masuk" : "keluar"} pada hari ini. Selamat bekerja.</p>
                        <Button className='w-100 rounded-4 add-item-shadow border border-dark text-dark fw-bold bi bi-check-circle' variant='warning' onClick={() => { goToCamera() }}> Ok</Button>
                      </div>
                    </Alert>
                  </div>
                </ZoomInSlide>
        }
      </div>
    </>
  )
}

export default QRScannerMonitoring