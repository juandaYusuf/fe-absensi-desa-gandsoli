import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Button, Container, FloatingLabel, Form, Spinner } from 'react-bootstrap'
import API_URL from '../../../API/API_URL'
import bcrypt from 'bcryptjs'
import ThemingCangerFunc from '../../../Theme'

const RegisterComponent = () => {

  const [isServerErr, setIsServerErr] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRegisterSuccess, setIsRegisterSuccess] = useState("")
  const [whoIsRegistered, setWhoIsRegistered] = useState("")
  const [validated, setValidated] = useState(false)
  const salt = bcrypt.genSaltSync(10)

  const registerData = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      e.preventDefault()
      setIsLoading(true)
      const encpass = bcrypt.hashSync(e.target.password.value, salt)
      let data = {
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        alamat: e.target.alamat.value,
        no_telepon: e.target.no_telepon.value,
        email: e.target.email.value,
        password: encpass,
        j_kelamin: e.target.jk.value,
        role: "admin"
      }
      const url = API_URL().USER.REGISTER_ADMIN_BY_KEPDES
      axios.post(url, data).then((response) => {
        console.log(response.data)
        setIsRegisterSuccess("success")
        setIsLoading(false)
        setWhoIsRegistered(response.data.name)
        setValidated(false)
        e.target.reset()
      }).catch((err) => {
        if (!err.response) {
          console.log(err)
          setIsServerErr(true)
        } else if (err.response.status === 404) {
          setIsLoading(false)
        } else if (err.response.status === 409) {
          setIsLoading(false)
          setIsRegisterSuccess(err.response.data.detail)
        }
      })
    }
    setValidated(true)
  }

  return (
    <Container className={` ${ThemingCangerFunc().gradient} add-box-shadow p-3 rounded-4 overflow-hidden d-flex justify-content-center`} style={ThemingCangerFunc("white").style} >
      <div className='w-50'>
        <h3 className='bi bi-person-add'> Registrasi admin </h3>
        <hr />
        {
          isServerErr === true
            ?
            (<Alert variant='danger border-danger w-100 rounded-4'>
              <h4 className='fw-bold bi bi-database-x'> Error</h4>
              <hr className='text-danger' />
              <p>Terjadi kesalahan pada server! <span className='bi bi-emoji-frown' /> </p>
            </Alert>)
            :
            isRegisterSuccess === "success"
            &&
            (<Alert variant='success border-sucess w-100 rounded-4'>
              <h4 className='bi bi-check-circle'> Sukses </h4>
              <hr className='text-success' />
              <p>Registrasi berhasil, data <b>"{whoIsRegistered}"</b> berhasil disimpan pada server</p>
            </Alert>)
        }
        <Form noValidate validated={validated} onSubmit={registerData} >
          <FloatingLabel
            label='Nama awal'
            controlId="first_name"
            className="mb-3">
            <Form.Control className='rounded-4' type="text" placeholder="text" required />
          </FloatingLabel>
          <FloatingLabel
            controlId="last_name"
            label="Nama akhir"
            className="mb-3">
            <Form.Control className='rounded-4' type="text" placeholder="text" required />
          </FloatingLabel>
          <FloatingLabel
            controlId="alamat"
            label="Alamat"
            className="mb-3">
            <Form.Control className='rounded-4' type="text" placeholder="text" required />
          </FloatingLabel>
          <FloatingLabel
            controlId="no_telepon"
            label="No Telepon"
            className="mb-3">
            <Form.Control className='rounded-4' type="text" placeholder="text" required />
          </FloatingLabel>
          <FloatingLabel
            controlId="email"
            label={`${isRegisterSuccess === "Email telah digunakan" ? (isRegisterSuccess) : ("Email")} `}
            className={`mb-3 ${isRegisterSuccess === "Email telah digunakan" && ("border-danger text-danger")}`}>
            <Form.Control className={`rounded-4 ${isRegisterSuccess === "Email telah digunakan" && ("border-danger text-danger")}`} type="email" placeholder="name@example.com" required />
            {
              isRegisterSuccess === "Email telah digunakan"
              &&
              <i className='text-danger'> Email yang anda masukan telah terdaftar</i>
            }
          </FloatingLabel>
          <FloatingLabel
            controlId="password"
            label="Password"
            className="mb-3">
            <Form.Control className='rounded-4' type="password" placeholder="Password" required />
            <Form.Text className="text-muted">
              Password yang didaftarkan oleh kepala desa hanya sementara! Dapat diganti setelah dapat login
            </Form.Text>
          </FloatingLabel>
          <FloatingLabel
            controlId="jk"
            label="Jenis Kelamin"
            className="mb-3">
            <Form.Select className='rounded-4' aria-label="Floating label select example" required>
              <option>Pilih jenis kelamin</option>
              <option value="pria">pria</option>
              <option value="wanita">wanita</option>
            </Form.Select>
          </FloatingLabel>
          {/* <FloatingLabel
                        controlId="floatingInput"
                        label="Pass foto"
                        className="mb-3">
                        <Form.Control className='rounded-4' type="file" size="sm" style={{ padding: "35px 0px 25px 20px" }} required/>
                    </FloatingLabel> */}
          {
            !isLoading
              ?
              (<Button type='submit' className="add-item-shadow bi bi-box-arrow-in-right" variant="warning rounded-4" style={{ width: "50%" }}>
                <span> Register</span>
              </Button>)
              :
              <>
                <Button className="add-item-shadow rounded-4" variant={(isServerErr === true) ? "danger" : "warning"} style={{ width: "50%" }} disabled>
                  {
                    isServerErr === true
                      ?
                      (<span>Tidak dapat registrasi</span>)
                      :
                      isRegisterSuccess === "success"
                        ?
                        (<span> registrasi</span>)
                        :
                        (<>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          <span> Loading...</span>
                        </>)
                  }
                </Button>
              </>
          }
        </Form>
      </div>
    </Container>

  )
}

export default RegisterComponent