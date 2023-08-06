import React from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'

const ModalQRCode = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: "9999", backgroundColor: "rgba(0, 0, 0, 0.1)", backdropFilter: "blur(20px)" }}
    >

      <Modal.Body className='rounded-4 px-3 border-0 p-0 d-flex flex-column justify-content-center align-items-center' closeButton style={{ height: "700px" }}>
        <Alert className='w-100 fw-bold add-item-shadow d-flex justify-content-between align-items-center' variant={props.options === "in" ? "success" : "warning"}>
          <div>
            <span className={`h4 p-0 m-0 ${props.options === "in" ? "bi bi-box-arrow-in-right" : "bi bi-box-arrow-in-left"}`}></span>
            <span className='fw-bold h5'> {props.options === "in" ? "QR Code Masuk" : "QR Code Keluar"} </span>
          </div>
          <span className="m-0 p-0 bi-x-lg h4 cursor-pointer" onClick={props.onHide} />
        </Alert>
        <img
          src={props.qrcode}
          className='rounded-4'
          style={{ height: "70%", width: "70%", marginTop: "80px" }}
          alt=" " />
      </Modal.Body>
    </Modal>
  )
}

export default ModalQRCode
