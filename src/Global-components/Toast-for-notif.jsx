import React from 'react'
import { Toast } from 'react-bootstrap'

const ToastForNotif = (props) => {
  return (
    <Toast
    style={{backgroundColor: "rgba(255, 255, 255, 0.10)", backdropFilter: "blur(20px)"}}
    className="rounded-4"
      onClose={props.onCloseHandler}
      show={props.onShowHandler}
      bg={props.themes}
    >
      <Toast.Header 
      style={{backgroundColor: "rgba(255, 255, 255, 0.0)", backdropFilter: "blur(20px)"}}
      className="rounded-4">
        <span className='bi bi-bell-fill' />
        <span style={{ width: "10px" }} />

        <strong
          className={`
          ${props.themes === 'danger' && 'text-danger'} 
          ${props.themes === 'warning' && 'text-warning'} 
          ${'me-auto'}`}> {props.txtTitle}</strong>

        <small>{props.times}</small>
      </Toast.Header>
      <Toast.Body>{props.txtBody}</Toast.Body>
    </Toast>
  )
}

export default ToastForNotif
