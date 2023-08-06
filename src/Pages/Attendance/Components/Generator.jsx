import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Alert, Button, Form, InputGroup, Spinner, Table } from 'react-bootstrap'
import { BottomToTop, LeftToRight, RightToLeft, TopToBottom } from '../../../Page-transition/ComponentTransitions'
// import UserGeoLocated from './GeoLocated'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TableScannedIn from './Table-scanned-in'
import TableScannedOut from './Table-scanned-out'
import ProgresBarLoadingVisual from '../../../Global-components/Progres-bar-loading-visual'
import ModalQRCode from './ModalQRCode'
import CryptoJS from 'crypto-js'
import API_URL from '../../../API/API_URL'


const Generator = () => {
  const [qrCodeGenerated, setQrCodeGenerated] = useState("")
  const [countTimeOut, setCountTimeOut] = useState(10)
  const [displayQRCode, setDisplayQRCode] = useState(false)
  const [isLoadingQRCode, setIsLoadingQRCode] = useState(false)
  const [qrcodeStatus, setQrcodeStatus] = useState("")
  const [qrcodeDate, setqrcodeDate] = useState("")
  const navigateTo = useNavigate()
  const [refreshTable, setrefreshTable] = useState(false)
  const [tableOptions, setTableOptions] = useState("masuk")
  const [oldDataCleaner, setIsCleanerLoading] = useState(true)
  const [qrCodeModalShow, setQrCodeModalShow] = useState(false)
  const [modalOptions, setModalOptions] = useState('')
  const today = new Date()
  const hours = String(today.getHours()).padStart(2, '0')
  // console.log(parseInt(hours)-1)


  // let latitude = null
  // let longitude = null
  // let userCoordinate = UserGeoLocated()

  // if (!!userCoordinate) {
  //   if (userCoordinate.coordinate !== "please enable locations service" || userCoordinate.coordinate === "please enable locations service") {
  //     latitude = userCoordinate.coordinate.latitude
  //     longitude = userCoordinate.coordinate.longitude
  //   }
  // }

  // function generateRandomString(length) {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let randomString = '';

  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     randomString += characters.charAt(randomIndex);
  //   }

  //   return randomString;
  // }

  const visitStafProfileByAdmin = (userID) => {
    localStorage.setItem('visit', JSON.stringify({ "id": userID }))
    navigateTo('/profile')
  }

  const getQrCodeData = async (data_option) => {
    const url = API_URL(data_option).QRCODE.SHOW_QRCODE_DATA_FOR_TODAY
    const response = await axios.get(url)
    return response.data
  }


  const whichAttendanceRuleIsActivate = async () => {
    const url = API_URL().ATTENDANCE_RULES.SHOW_ALL_ATTENDANCE_RULES
    const timesUp = await axios.get(url)
    const result = timesUp.data.filter(items => items.usage === true).map(resl => {
      return resl.work_times_up
    })
    return result[0]
  }






  const generateQRCode = async (data_option) => {
    setIsLoadingQRCode(true)
    setQrcodeStatus(data_option)
    setqrcodeDate(await getQrCodeData(data_option))
    const data = JSON.stringify(await getQrCodeData(data_option))
    // Encrypt datanya
    const secretKey = data_option;
    const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
    // get waktu akhir kerja untuk dari attendace rule untuk validasi membuka qrcode sejam sebelum waktu berakhir kerja 
    const openQrCodeAt = await whichAttendanceRuleIsActivate()
    const intOpenQrCodeAt = parseInt(openQrCodeAt.split(':')[0])


    try {
      if (data_option === 'in') {
        setModalOptions('in')
        const QRCOdeResponse = await QRCode.toDataURL(`i${encrypted}`)
        setQrCodeGenerated(QRCOdeResponse)
      } else if (data_option === 'out') {
        const QRCOdeResponse = await QRCode.toDataURL(`o${encrypted}`)
        // setQrCodeGenerated(intOpenQrCodeAt)
        const currentHourse = parseInt(hours)
        if (currentHourse >= intOpenQrCodeAt - 1) {
          const QRCOdeResponse = await QRCode.toDataURL(`o${encrypted}`)
          setQrCodeGenerated(QRCOdeResponse)
          setModalOptions('out')
        } else {
          setQrCodeGenerated("")
        }
      }
      setDisplayQRCode(true)
      setIsLoadingQRCode(false)
    } catch (err) {
      // console.log(err)
    }
  }

  useEffect(() => {
    const timer = countTimeOut > 0 && setInterval(() => setCountTimeOut(countTimeOut - 1), 1000)
    return () => clearInterval(timer);
  }, [countTimeOut])


  useEffect(() => {
    const url = API_URL().SCANNED_DETAIL.CLEARING_OLD_DATAS
    axios.delete(url).then((response) => {
      if (response.data.message === "no old data to clean" || response.data.message === "setup done") {
        setIsCleanerLoading(false)
      }
    }).catch((err) => {
      setIsCleanerLoading(false)
    })
  }, [])




  return (
    <>
      <div className='d-flex justify-content-center overflow-hidden p-3'>
        <div className='d-flex flex-column gap-3' style={{ maxWidth: "400px", display: "flex", justifyContent: "center" }}>
          <TopToBottom>
            <div className='d-flex justify-content-center gap-2'>
              <Button className='add-item-shadow-success rounded-4' variant={qrcodeStatus === "in" ? 'success' : 'outline-success'} id="button-addon2" onClick={() => { generateQRCode("in") }}>
                <span className="fw-bold bi bi-qr-code"> QRCODE jam masuk</span>
              </Button>
              <Button className='add-item-shadow-warning rounded-4' variant={qrcodeStatus === "out" ? 'warning' : 'outline-warning'} id="button-addon2" onClick={() => { generateQRCode("out") }}>
                <span className="fw-bold bi bi-qr-code"> QRCODE jam keluar</span>
              </Button>
            </div>
          </TopToBottom>

          {
            qrcodeStatus === "in"
              ?
              (<LeftToRight>
                <Alert className='rounded-4 border border-success' variant='success'>
                  <Alert.Heading>QRCODE</Alert.Heading>
                  QRCODE untuk jam masuk kerja
                  <span className='bi bi-arrow-right mx-1'> {qrcodeDate.created_at}</span>
                </Alert>
              </LeftToRight>)
              :
              qrcodeStatus === "out"
              &&
              (<RightToLeft>
                <Alert className='rounded-4 border border-warning' variant='warning'>
                  <Alert.Heading>QRCODE</Alert.Heading>
                  QRCODE untuk jam keluar kerja
                  <span className='bi bi-arrow-right mx-1'> {qrcodeDate.created_at}</span>
                </Alert>
              </RightToLeft>)
          }
        </div>
      </div>

      <div className='w-100 d-flex justify-content-center overflow-hidden flex-column align-items-center gap-4 p-3'>
        <BottomToTop>
          <>
            {
              !displayQRCode
                ?
                (<div className='add-item-shadow rounded-4 h5 fw-bold m-0 p-0' style={{ height: "300px", width: "300px", border: "solid 2px lightgrey", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} alt=" " >
                  {
                    isLoadingQRCode === true
                      ?
                      <><p className='text-muted h5 fw-bold'>Memuat data...</p>
                        <Spinner size='md' variant='secondary' /></>
                      :
                      <><span className="text-muted h1 bi bi-qr-code" />
                        <p className='text-center text-muted'>Klik tombol diatas untuk menampilkan QRCode </p></>
                  }
                </div>)
                :
                !!isLoadingQRCode
                  ?
                  (<div className='add-item-shadow rounded-4 h5 fw-bold m-0 p-0' style={{ height: "300px", width: "300px", border: "solid 2px lightgrey", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} alt=" " >
                    <p className='text-muted'>Memuat data...</p>
                    <Spinner size='md' variant='secondary' />
                  </div>)
                  :
                  qrCodeGenerated !== ""
                    ?
                    (<img
                      src={qrCodeGenerated}
                      className='add-item-shadow rounded-4 cursor-pointer'
                      style={{ height: "300px", width: "300px", border: "solid 2px lightgrey" }}
                      onClick={() => setQrCodeModalShow(true)}
                      alt=" " />)
                    :
                    (<div
                      className='p-2 bg- add-item-shadow rounded-4 cursor-pointer d-flex justify-content-center align-items-center'
                      style={{ height: "300px", width: "300px", border: "solid 2px lightgrey", backgroundColor: "Cornsilk" }}>
                      <p className='text-muted fw-bold text-center'>Qr Code keluar hanya dapat dibuka 1 jam sebelum jam keluar.</p>
                    </div>)
            }
          </>
          {
            // (!!latitude || !!longitude) &&
            // <a href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}>Lihat pada Gooogle Maps</a>
          }
        </BottomToTop>
        <div className='overflow-hidden w-100 border rounded-4 p-3 mt-4 add-item-shadow'>
          <div className='d-flex'>
            <h3 className='text-center m-0 w-100'>Daftar staf</h3>
          </div>
          <p className='text-center text-muted'>Daftar staf yang telah melakukan scan hari ini pada tanggal {qrcodeDate.created_at}  </p>
          <div className='d-flex gap-3 justify-content-center overflow-hidden mb-4'>
            <TopToBottom>
              <Button className='add-item-shadow-success rounded-4' variant={tableOptions === "masuk" ? 'success' : 'outline-success'} onClick={() => { setTableOptions("masuk") }}>Tabel scan masuk</Button>
            </TopToBottom>

            <TopToBottom>
              <Button className='add-item-shadow-warning rounded-4' variant={tableOptions === "keluar" ? 'warning' : 'outline-warning'} onClick={() => { setTableOptions("keluar") }}>Tabel scan keluar</Button>
            </TopToBottom>
          </div>
          {
            tableOptions === "masuk"
              ?
              <LeftToRight>
                <Alert className='border border-success rounded-4 m-0 my-2 p-1 fw-bold d-flex align-items-center' variant='success'>
                  <i className='cursor-pointer mx-4 p-0' />
                  <p className='bi bi-qr-code-scan text-center w-100 m-0 p-0' style={{ fontSize: "1.1rem" }}> Daftar staf scan masuk</p>
                  <i className='bi bi-arrow-repeat cursor-pointer mx-3 p-0' onClick={() => setrefreshTable(prev => !prev)} style={{ fontSize: "1.5rem" }} />
                </Alert>
              </LeftToRight>
              :
              <RightToLeft>
                <Alert className='border border-warning rounded-4 m-0 my-2 p-1 fw-bold d-flex align-items-center' variant='warning'>
                  <i className='cursor-pointer mx-4 p-0' />
                  <p className='bi bi-qr-code-scan text-center w-100 m-0 p-0' style={{ fontSize: "1.1rem" }}> Daftar staf scan keluar</p>
                  <i className='bi bi-arrow-repeat cursor-pointer mx-3 p-0' onClick={() => setrefreshTable(prev => !prev)} style={{ fontSize: "1.5rem" }} />
                </Alert>
              </RightToLeft>
          }
          {
            tableOptions === "masuk"
              ?
              <RightToLeft>
                <div className='rounded-4 overflow-hidden m-0 px-2 py-3 border border-success' style={{ backgroundColor: "#E8F4EE" }}>
                  {
                    !!oldDataCleaner
                      ?
                      (<ProgresBarLoadingVisual theme='info' progresValue={100} titleTxt={"Membersihkan data lama..."} />)
                      :
                      (<TableScannedIn refresh_table={refreshTable} />)
                  }
                </div>
              </RightToLeft>
              :
              <LeftToRight>
                <div className='rounded-4 overflow-hidden m-0 px-2 py-3 border border-warning' style={{ backgroundColor: "#FFF6D9" }}>
                  {
                    !!oldDataCleaner
                      ?
                      (<ProgresBarLoadingVisual theme='info' progresValue={100} titleTxt={"Membersihkan data lama..."} />)
                      :
                      (<TableScannedOut refresh_table={refreshTable} />)
                  }
                </div>
              </LeftToRight>
          }
        </div>
      </div>
      <ModalQRCode
        show={qrCodeModalShow}
        qrcode={qrCodeGenerated}
        options={modalOptions}
        onHide={() => setQrCodeModalShow(false)} />
    </>

  )
}
export default Generator

