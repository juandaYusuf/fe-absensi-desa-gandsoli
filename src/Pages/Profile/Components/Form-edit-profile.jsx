import { useEffect, useState } from 'react'
import { Alert, Card, FloatingLabel, Spinner, Collapse } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import API_URL from '../../../API/API_URL'
import ModalPopUp from '../../../Global-components/ModalPopUp'
import SignaturePad from '../../../Global-components/SignaturePad'
import { LeftToRight, RightToLeft } from '../../../Page-transition/ComponentTransitions'
import { ZoomOut } from '../../../Page-transition/PageTransitions'

function FormEditProfile(props) {

  const [isServerErr, setIsServerErr] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateProfileSuccess, setIsUpdateProfileSuccess] = useState("")
  const [validated, setValidated] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [userDetail, setUserDetail] = useState({})
  const locaData = JSON.parse(localStorage.getItem('obj'))
  const [openCollapse, setOpenCollapse] = useState(false)
  const [isSignatureUpdated, setIsSignatureUpdated] = useState(false)
  const [showSignature, setShowSignature] = useState(false)


  const editData = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      e.preventDefault()
      setIsLoading(true)
      const data = {
        user_id: locaData.id,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        alamat: e.target.alamat.value,
        no_telepon: e.target.no_telepon.value,
        email: e.target.email.value
      }
      const url = API_URL().USER.UPDATE_PROFILE
      axios.put(url, data).then(() => {
        setIsUpdateProfileSuccess("success")
        setIsLoading(false)
        setValidated(false)
        e.target.reset()
      }).catch((err) => {
        if (!err.response) {
          setIsServerErr(true)
        } else if (err.response.status === 404) {
          setIsLoading(false)
        } else if (err.response.status === 409) {
          setIsLoading(false)
          setIsUpdateProfileSuccess(err.response.data.detail)
        }
      })
      setIsUpdateProfileSuccess("")
    }
    setValidated(true)
  }


  useEffect(() => {
    const getUserDetail = () => {
      const url = API_URL(locaData.id).USER.GET_SINGLE_USER
      axios.get(url).then((response) => {
        props.user_detail({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          alamat: response.data.alamat,
          jk: response.data.j_kelamin,
          pp: response.data.profile_picture
        })
        setUserDetail({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          alamat: response.data.alamat,
          no_telepon: response.data.no_telepon,
          jk: response.data.j_kelamin,
          pp: response.data.profile_picture,
          signature: response.data.signature,
          signature_data: response.data.signature_data
        })
        if (!!response.data.signature) {
          setIsSignatureUpdated(true)
        } else {
          setIsSignatureUpdated(false)
        }
      })
    }

    getUserDetail()

  }, [isLoading, showSignature]);

  return (
    <>
      <div style={{ width: "700px", marginTop: "15px" }}>
        <h3 className='bi bi-pencil-square mb-3'> Update profile </h3>
        {
          isServerErr === true
            ?
            (<Alert variant='danger border-danger w-100 rounded-4'>
              <h4 className='fw-bold bi bi-database-x'> Error</h4>
              <hr className='text-danger' />
              <p>Terjadi kesalahan pada server! <span className='bi bi-emoji-frown' /> </p>
            </Alert>)
            :
            isUpdateProfileSuccess === "success"
            &&
            (<Alert variant='success border-sucess w-100 rounded-4'>
              <h4 className='bi bi-check-circle'> Sukses </h4>
              <hr className='text-success' />
              <p>Edit data berhasil, Perubahan telah disimpan pada server</p>
            </Alert>)
        }
        <Form noValidate validated={validated} onSubmit={editData}>
          <FloatingLabel
            label='Nama awal'
            controlId="first_name"
            className="mb-3">
            <Form.Control className='rounded-4' type="text" defaultValue={`${!!userDetail.first_name ? userDetail.first_name : ""}`} placeholder="text" required />
          </FloatingLabel>
          <FloatingLabel
            controlId="last_name"
            label="Nama akhir"
            className="mb-3">
            <Form.Control className='rounded-4' type="text" defaultValue={`${!!userDetail.last_name ? userDetail.last_name : ""}`} placeholder="text" required />
          </FloatingLabel>
          <FloatingLabel
            controlId="alamat"
            label="Alamat"
            className="mb-3">
            <Form.Control className='rounded-4' type="text" defaultValue={`${!!userDetail.alamat ? userDetail.alamat : ""}`} placeholder="text" required />
          </FloatingLabel>
          <FloatingLabel
            controlId="no_telepon"
            label="No Telepon"
            className="mb-3">
            <Form.Control className='rounded-4' type="text" defaultValue={`${!!userDetail.no_telepon ? userDetail.no_telepon : ""}`} placeholder="text" required />
          </FloatingLabel>
          <FloatingLabel
            controlId="email"
            label={`${isUpdateProfileSuccess === "Email telah digunakan" ? (isUpdateProfileSuccess) : ("Email")} `}
            className={`mb-3 ${isUpdateProfileSuccess === "Email telah digunakan" && ("border-danger text-danger")}`}>
            <Form.Control className={`rounded-4 ${isUpdateProfileSuccess === "Email telah digunakan" && ("border-danger text-danger")}`} type="email" defaultValue={`${!!userDetail.email ? userDetail.email : ""}`} placeholder="name@example.com" required />
            {
              isUpdateProfileSuccess === "Email telah digunakan"
              &&
              <i className='text-danger'> Email yang anda masukan telah terdaftar</i>
            }
          </FloatingLabel>
          <Card className=' d-flex justify-content-center rounded-4 cursor-pointer mb-4' style={{ height: "58px", backgroundColor: "#E9ECEF" }} onClick={() => { setModalShow(true) }}>
            <p className='px-2 m-0'>password</p>
          </Card>
          <Card className=' d-flex justify-content-center rounded-4 cursor-pointer mb-4 p-0' style={{ minHeight: "58px", backgroundColor: "#E9ECEF" }} >
            <div className="d-flex justify-content-between m-0 p-0" >
              <p className='px-2 mb-1 w-100 text-align-middle' style={{ minHeight: "50px", paddingTop: "15px" }} onClick={() => { setOpenCollapse(true) }}> Tanda tangan</p>
              {
                !!openCollapse
                &&
                <span className="bi bi-x mx-2 h2 m-0" onClick={() => { setOpenCollapse(false) }} />
              }
            </div>
            <Collapse in={openCollapse}>
              <div id="example-collapse-text">
                <div className="m-3 overflow-hidden py-1">
                  {
                    !!isSignatureUpdated
                      ?
                      <RightToLeft>
                        <div className='d-flex align-items-center flex-column'>
                          <div className='d-flex p-2 justify-content-center border rounded-4 bg-white add-item-shadow' style={{ height: "400px", width: "400px" }}>
                            <div className="w-100 overflow-hidden p-1">
                              {
                                !!showSignature
                                  ?
                                  <LeftToRight>
                                    <div className='w-100 d-flex flex-column justify-content-center'>
                                      <div style={{ height: "300px", width: "300px" }}>
                                        <img src={`data:image/jpeg;base64,${userDetail.signature_data}`} style={{ height: "300px", width: "300px" }} alt=" " />
                                      </div>
                                      <Button className='w-100 fw-bold rounded-4 add-item-shadow border border-dark' variant='warning' onClick={() => setShowSignature(false)}>Kembali</Button>
                                    </div>
                                  </LeftToRight>
                                  :
                                  <RightToLeft>
                                    <Alert className='border border-secondary w-100 rounded-4 add-item-shadow' variant='info'>
                                      <Alert.Heading className='bi bi-info-circle'> Pemberitahuan</Alert.Heading>
                                      <hr className='m-0 p-0' />
                                      <p>Anda telah memiiki tanda tangan. Tanda tangan akan digunakan untuk pengajuan perizinan, persetujuan, dan hal lainnya yang membutuhkannya. </p>
                                      <p className='text-muted'>Apakah anda ingin buat ulang tandangan...?</p>
                                    </Alert>
                                    <Button className='w-100 fw-bold rounded-4 add-item-shadow border border-dark' variant='warning' onClick={() => setShowSignature(true)}>Tampilkan</Button>
                                    <Button className='mt-3 w-100 fw-bold rounded-4 add-item-shadow border border-dark' variant='info' onClick={() => setIsSignatureUpdated(false)}>Buat ulang</Button>
                                  </RightToLeft>
                              }
                            </div>
                          </div>
                        </div>
                      </RightToLeft>
                      :
                      <LeftToRight>
                        <SignaturePad is_updated={() => { setIsSignatureUpdated(true) }} />
                        {
                          !!userDetail.signature
                          &&
                          <div className='w-100 d-flex'>
                            <Button className='w-100 fw-bold rounded-4 add-item-shadow border border-dark m-2' variant='info' onClick={() => setIsSignatureUpdated(true)}>Batalkan</Button>
                          </div>
                        }
                      </LeftToRight>
                  }
                </div>
              </div>
            </Collapse>
          </Card>
          {
            !isLoading
              ?
              (<Button type='submit' className="border border-dark add-item-shadow bi bi-box-arrow-in-right rounded-4 w-100" variant="info" style={{ width: "50%" }}>
                <span className='fw-bold'> Update profile</span>
              </Button>)
              :
              <>
                <Button className="add-item-shadow rounded-4 w-100" variant={(isServerErr === true) ? "danger" : "info"} style={{ width: "50%" }} disabled>
                  {
                    isServerErr === true
                      ?
                      (<span>Tidak dapat Update profile</span>)
                      :
                      isUpdateProfileSuccess === "success"
                        ?
                        (<span> Update profile</span>)
                        :
                        (<><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /><span> Loading...</span></>)
                  }
                </Button>
              </>
          }
        </Form>
      </div>
      <ModalPopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        options={"change password"}
      />
    </>
  )
}
export default FormEditProfile;