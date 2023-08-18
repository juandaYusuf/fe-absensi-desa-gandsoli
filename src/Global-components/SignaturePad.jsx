import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';
import API_URL from '../API/API_URL';

const SignaturePad = (props) => {
  const signatureRef = useRef()
  const localData = JSON.parse(localStorage.getItem('obj'))
  const [isLoading, setIsLoading] = useState(false)

  const clearSignature = () => {
    signatureRef.current.clear()
  }

  const saveSignature = () => {
    setIsLoading(true)
    const signatureDataURL = signatureRef.current.toDataURL()
    const url = API_URL().USER.UPDATE_USER_SIGNATURE
    const data = {
      "id": localData.id,
      "signature": signatureDataURL
    }
    axios.put(url, data).then(response => {
      if (response.data) {
        props.is_updated()
        setIsLoading(false)
        console.log(response)
      }
    })
  }

  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='rounded-4 border add-item-shadow bg-white' style={{ width: 300 }}>
          <SignatureCanvas
            ref={signatureRef}
            penColor="black"
            canvasProps={{ width: 300, height: 300 }}
          />
        </div>
      </div>
      <div className="d-flex gap-3 justify-content-between mt-3  mx-2">
        <Button className='w-50 rounded-4 border border-dark add-item-shadow fw-bold' variant='warning' onClick={clearSignature}>Bersihkan</Button>
        <Button className='w-50 rounded-4 border border-dark add-item-shadow fw-bold' variant='success' disabled={isLoading} onClick={() => { saveSignature() }}>
          {
            isLoading === true
              ?
              <div className='d-flex justify-content-center align-items-center' style={{height: "20px"}}>
                <Spinner variant='light' size='sm' />
                <span className='ms-2'>Menyimpan...</span>
              </div>
              :
              "Simpan"
          }
        </Button>
      </div>
    </>
  )
}

export default SignaturePad;
