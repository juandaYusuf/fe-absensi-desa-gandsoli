import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import API_URL from '../../../API/API_URL'
import { useNavigate } from 'react-router-dom'
import { BottomToTop, TopToBottom } from '../../../Page-transition/ComponentTransitions'
import ProgresBarLoadingVisual from '../../../Global-components/Progres-bar-loading-visual'

const VerifyCodeFormModal = (props) => {

  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)
  const ref5 = useRef(null)
  const ref6 = useRef(null)

  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [input3, setInput3] = useState('')
  const [input4, setInput4] = useState('')
  const [input5, setInput5] = useState('')
  const [input6, setInput6] = useState('')
  const navigateTo = useNavigate()
  const [isCodeInvalid, setIsCodeInvalid] = useState(false)
  const [codeIsValid, setCodeIsValid] = useState('')
  const [loading, setLoading] = useState(false)


  const localData = JSON.parse(localStorage.getItem('obj'))




  useEffect(() => {
    if (input1 !== '' && !isNaN(input1) && input1.length >= 1) {
      ref2.current.focus()
    }
    if (input2 !== '' && !isNaN(input2) && input1.length >= 1) {
      ref3.current.focus()
    }
    if (input3 !== '' && !isNaN(input3) && input1.length >= 1) {
      ref4.current.focus()
    }
    if (input4 !== '' && !isNaN(input4) && input1.length >= 1) {
      ref5.current.focus()
    }
    if (input5 !== '' && !isNaN(input5) && input1.length >= 1) {
      ref6.current.focus()
    }
    if (input6 !== '' && !isNaN(input6) && input1.length >= 1) {
      // setLoading(true)
      const url = API_URL().USER_VERIFICATIONS.VERIFY_CODE
      const data = {
        "user_id": props.user_id,
        "code": `${input1}${input2}${input3}${input4}${input5}${input6}`
      }
      axios.post(url, data).then(response => {
        if (response.data.message === "verified") {
          setLoading(false)
          if (localData.role === "Kaur Keuangan") {
            setTimeout(() => {
              navigateTo("/dashboard")
            }, 2000);
            setCodeIsValid('Verifikasi kode berhasil, login..')
          } else {
            setTimeout(() => {
              navigateTo("/profile")
            }, 2000);
            setCodeIsValid('Verifikasi kode berhasil, login..')
          }
        } else if (response.data.message === "invalid") {
          setLoading(false)
          setIsCodeInvalid(true)
          setInput1('')
          setInput2('')
          setInput3('')
          setInput4('')
          setInput5('')
          setInput6('')
        }
      })
    }

  }, [input1, input2, input3, input4, input5, input6])




  return (
    <Modal
      {...props}
      size="md"
      backdrop={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: "9999", backgroundColor: "rgba(0, 0, 0, 0.1)", backdropFilter: "blur(20px)" }}
      contentClassName='rounded-4 bg-transparent overflow-hidden'
    >
      <Modal.Header closeButton style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <span className='bi bi-123 me-2 h3' />
          Verifikasi kode
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='overflow-hidden' style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)", borderTop: "solid 1px grey", borderBottom: "solid 1px grey" }}>
        {
          isCodeInvalid === true
            ?
            <TopToBottom>
              <Alert className='border border-danger rounded-4 add-item-shadow' variant='danger'>
                <Alert.Heading>Kode tidak valid</Alert.Heading>
                <p>Kode tidak dapat di proses. Periksa kembali kode verifikasi anda...</p>
                <Button className='w-100 rounded-4 border border-dark add-item-shadow' onClick={() => setIsCodeInvalid(false)} variant='danger'>Ok</Button>
              </Alert>
            </TopToBottom>
            :
            <BottomToTop>
              <p className='text-dark'>Silahkan masukan kode verfikasi. Periksa pada email yang telah didaftarkan</p>
              <div className='d-flex gap-2 justify-content-center'>
                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  size='lg'
                  inputMode='numeric'
                  className='border add-item-shadow'
                  value={(!isNaN(input1)) ? input1 : ""}
                  onChange={(e) => { setInput1(e.target.value) }}
                  style={{ width: "50px", backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                />
                <Form.Control
                  ref={ref2}
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  size='lg'
                  inputMode='numeric'
                  className='border add-item-shadow'
                  value={(!isNaN(input2)) ? input2 : ""}
                  onChange={(e) => { setInput2(e.target.value) }}
                  style={{ width: "50px", backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                />
                <Form.Control
                  ref={ref3}
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  size='lg'
                  inputMode='numeric'
                  className='border add-item-shadow'
                  value={(!isNaN(input3)) ? input3 : ""}
                  onChange={(e) => { setInput3(e.target.value) }}
                  style={{ width: "50px", backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                />
                <Form.Control
                  ref={ref4}
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  size='lg'
                  inputMode='numeric'
                  className='border add-item-shadow'
                  value={(!isNaN(input4)) ? input4 : ""}
                  onChange={(e) => { setInput4(e.target.value) }}
                  style={{ width: "50px", backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                />
                <Form.Control
                  ref={ref5}
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  size='lg'
                  inputMode='numeric'
                  className='border add-item-shadow'
                  value={(!isNaN(input5)) ? input5 : ""}
                  onChange={(e) => { setInput5(e.target.value) }}
                  style={{ width: "50px", backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                />
                <Form.Control
                  ref={ref6}
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  size='lg'
                  inputMode='numeric'
                  className='border add-item-shadow'
                  value={(!isNaN(input6)) ? input6 : ""}
                  onChange={(e) => { setInput6(e.target.value) }}
                  style={{ width: "50px", backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                />
              </div>
              <p className='fw-bold text-success mt-2'>{codeIsValid}</p>
            </BottomToTop>
        }
      </Modal.Body>
      <Modal.Footer style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>

      </Modal.Footer>
    </Modal>
  )
}

export default VerifyCodeFormModal
