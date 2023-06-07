import { useEffect, useState } from 'react'
import { Alert, Card, FloatingLabel, Spinner } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import API_URL from '../../../API/API_URL'
import ModalPopUp from '../../../Global-components/ModalPopUp'

function FormEditProfile(props) {

  const [isServerErr, setIsServerErr] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateProfileSuccess, setIsUpdateProfileSuccess] = useState("")
  const [validated, setValidated] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [userDetail, setUserDetail] = useState({})
  const locaData = JSON.parse(localStorage.getItem('obj'))


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
          pp: response.data.profile_picture
        })
      })
    }

    getUserDetail()

  }, [isLoading]);

  return (
    <>
      <div style={{width: "700px"}}>
        <h3 className='bi bi-pencil-square'> Update profile </h3>
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
          <Card className=' d-flex justify-content-center rounded-4 cursor-pointer mb-4' style={{ height: "58px", backgroundColor: "#E9ECEF" }} onClick={() => { setModalShow(true)}}>
            <p className='px-2 m-0'>password</p>
          </Card>
          {
            !isLoading
              ?
              (<Button type='submit' className="add-item-shadow bi bi-box-arrow-in-right rounded-4 w-100" variant="info" style={{ width: "50%" }}>
                <span> Update profile</span>
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