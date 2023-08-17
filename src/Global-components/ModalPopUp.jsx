import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Form, InputGroup, Modal, ProgressBar, Spinner, Table } from 'react-bootstrap'
import API_URL from '../API/API_URL'
import { BottomToTop, RightToLeft, TopToBottom } from '../Page-transition/ComponentTransitions'
import UserContext from '../Context/Context'
import bcrypt from 'bcryptjs'

const ModalPopUp = (props) => {
  const [title, setTitle] = useState('')
  const [secondTitle, setSecondTitle] = useState('')
  const [uploadImage, setUploadImage] = useState(null)
  const localData = JSON.parse(localStorage.getItem('obj'))
  const [isLoading, setIsLoading] = useState(false)
  const [isResponded, setIsResponded] = useState(false)
  const { setContextIsImageUploaded, contextRefreshDraftList, setContextRefreshDraftList } = useContext(UserContext)
  const [currentPassword, setcurrentPassword] = useState("")
  const [isPasswordValidated, setIsPasswordValidated] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [isPasswordCorectly, setIsPasswordCorectly] = useState(null)
  const [isPasswordChangerLoading, setIsPasswordChangerLoading] = useState(false)
  const [isPWDSuccessfulChange, setIsPWDSuccessfulChange] = useState(false)
  const [isNewPasswordMatch, setisNewPasswordMatch] = useState(true)
  const [uploadImageExtentionValidator, setUploadImageExtentionValidator] = useState(true)
  const [disableButton, setDisableButton] = useState(true)
  const [ifExtentionsNotAloowed, setIfExtentionsNotAloowed] = useState('')
  const salt = bcrypt.genSaltSync(10)


  const uploadProfilePicture = () => {
    setIsLoading(true)
    let bodyFormData = new FormData()
    bodyFormData.append("image", uploadImage)
    const url = API_URL(localData.id).USER.POST_PROFILE_PICTURE
    axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      if (!!response.data.message) {
        setIsLoading(false)
        setIsResponded(true)
        setContextIsImageUploaded(true)
      }
    }).catch((err) => {
      if (err.response.status === 400 && err.response.data.detail === "file not allowed") {
        setIsLoading(false)
        setUploadImageExtentionValidator(false)
      }
    })
    setContextIsImageUploaded(false)
    setIsResponded(false)
  }


  const deleteProfilePicture = () => {
    setIsLoading(true)
    const url = API_URL(localData.id).USER.DELETE_PROFILE_PICTURE
    axios.delete(url).then((response) => {
      setIsLoading(false)
      setIsResponded(true)
      setContextIsImageUploaded(true)
    })
    setContextIsImageUploaded(false)
    setIsResponded(false)
  }

  const changeAndConfirmPassword = (options) => {

    setIsPasswordChangerLoading(true)

    if (options === "uncheck") {
      const encPass = bcrypt.hashSync(currentPassword, salt)
      const passCheckerURL = API_URL().USER.CHECK_PASSWORD
      const user_data = {
        user_id: localData.id,
        encpass: encPass
      }
      axios.put(passCheckerURL, user_data).then((response) => {
        if (response) {
          bcrypt.compare(currentPassword, response.data.enc_pass, (err, res) => {
            if (res === true) {
              setIsPasswordValidated(true)
              setIsPasswordCorectly(true)
              setIsPasswordChangerLoading(false)
            } else {
              setIsPasswordValidated(false)
              setIsPasswordCorectly(false)
              setIsPasswordChangerLoading(false)
            }
          })
        }
      })
    }

    if (options === "checked") {
      if (newPassword !== confirmNewPassword || newPassword === "" || confirmNewPassword === "") {
        setisNewPasswordMatch(false)
        setNewPassword("")
        setConfirmNewPassword("")
        setIsPasswordChangerLoading(false)
      } else {
        setisNewPasswordMatch(true)
        const encPass = bcrypt.hashSync(confirmNewPassword, salt)
        const passChangerURL = API_URL().USER.UPDATE_PASSWORD
        const user_data = {
          user_id: localData.id,
          encpass: encPass
        }

        axios.put(passChangerURL, user_data).then((response) => {
          if (response.data.message === "password changed") {
            setcurrentPassword("")
            setNewPassword("")
            setConfirmNewPassword("")
            setIsPasswordChangerLoading(false)
            setIsPWDSuccessfulChange(true)
          }
        })
      }
    }

    setcurrentPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
  }

  const deleteDraftAttendancerule = () => {
    const url = API_URL(props.draft_id).ATTENDANCE_RULES.DELETE_ALL_ATTENDANCE_RULES
    axios.delete(url).then((response) => {
      if (response.message === "data has been deleted")
        setIsResponded(true)
      setContextRefreshDraftList(!contextRefreshDraftList)
    })
  }

  const uploadSickMail = () => {
    setIsLoading(true)
    const url = API_URL().FOR_USER_SICK.UPDATE_USER_SICK
    const data = {
      "user_id": props.user_id,
      "descriptions": props.selectOptionsValue,
      "created_at_in": props.date,
      "options": props.selectOptionsValue
    }

    axios.post(url, data).then(response => {
      if (response.data) {
        const urlSickProof = API_URL(props.user_id).FOR_USER_SICK.UPDATE_USER_SICK_PROOF
        let bodyFormData = new FormData()
        bodyFormData.append("image", uploadImage)
        axios({
          method: "post",
          url: urlSickProof,
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then(resp => {
          setIsLoading(false)
          props.responded()
        })
      }
    })

  }

  useEffect(() => {
    if (props.options === "update picture") {
      setTitle("Upload foto profile")
      setSecondTitle("Silahkan pilih foto profile")
    }
    if (props.options === "delete picture") {
      setTitle("Hapus foto")
      setSecondTitle("Foto profile akan dihapus secara permanen...!")
    }
    if (props.options === "change password") {
      setTitle("Ubah password")
      setSecondTitle("")
    }
    if (props.options === "delete draft attdnc rules") {
      setTitle("Delete draft")
      setSecondTitle("Draft akan di hapus secara permanen")
    }
    if (props.options === "sick proof") {
      setTitle("Surat sakit")
      setSecondTitle("Silahkan unggah surat sakit dalam berbentuk gambar")
    }

  }, [props.options])

  useEffect(() => {
    const extentionsChecker = () => {
      if (uploadImage === null) return
      const extentions = ['jpg', 'png', 'jpeg']
      if (extentions.includes(uploadImage.name.split('.')[1])) {
        setDisableButton(false)
        setIfExtentionsNotAloowed('')
      } else {
        setIfExtentionsNotAloowed('File tidak diizinkan')
        setDisableButton(true)
      }
    }

    extentionsChecker()
  }, [uploadImage])


  const modalUpdatePicture = (<Modal
    {...props}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    size="md"
    backdrop={false}
    onShow={() => {
      setIsLoading(false)
      setIsResponded(false)
    }}
    style={{ zIndex: "9999", backgroundColor: "rgba(0, 0, 0, 0.1)", backdropFilter: "blur(20px)" }}
    contentClassName='rounded-4 bg-transparent overflow-hidden'
  >
    <Modal.Header closeButton style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      <Modal.Title id="contained-modal-title-vcenter">
        <span className='bi bi-cloud-upload' /> {title}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)", borderTop: "solid 1px grey", borderBottom: "solid 1px grey" }}>
      {
        !!isResponded
          ?
          (<div className='overflow-hidden'>
            <RightToLeft>
              <Alert variant='success border-sucess w-100 rounded-4'>
                <h4 className='bi bi-check-circle'> Sukses </h4>
                <hr className='text-success m-0' />
                <p>Upload file berhasil. Silahkan kembali ke halaman profile</p>
              </Alert>
            </RightToLeft>
          </div>)
          :
          (<>
            <h5>{secondTitle}</h5>
            <div className='overflow-hidden'>
              {
                isLoading === true
                  ?
                  (<TopToBottom>
                    <Form.Text id="passwordHelpBlock" muted>
                      Mengunggah gambar, silahkan tunggu...
                    </Form.Text>
                    <ProgressBar variant='success' animated now={100} style={{ marginBottom: "22px" }} />
                  </TopToBottom>)
                  :
                  uploadImageExtentionValidator === true
                    ?
                    (<BottomToTop>
                      <Form.Control
                        className='rounded-4 m-1'
                        type="file"
                        onChange={(e) => { setUploadImage(e.target.files[0]) }}
                        style={{ width: "98%" }}
                      />
                      <Form.Text id="passwordHelpBlock" muted>
                        Masukan gambar dari penyimpanan anda
                      </Form.Text>
                    </BottomToTop>)
                    :
                    (<TopToBottom>
                      <Form.Text id="passwordHelpBlock" className='text-danger fw-bold'>
                        Sepertinya file yang anda unggah bukan gambar...!
                        Harap unggah file jenis gambar. <br />
                        <span className='text-muted fw-normal'> Ekstensi file yang diizinkan '.jpg', '.jpeg', '.png'</span>
                      </Form.Text>
                    </TopToBottom>)
              }
            </div>
          </>)
      }
    </Modal.Body>
    <Modal.Footer style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      {
        !!isResponded
          ?
          <Button className='px-4 rounded-4 add-item-shadow border border-secondary' variant='warning' onClick={() => { props.onHide() }}>Kembali</Button>
          :
          !!isLoading
            ?
            <Button className='rounded-4 add-item-shadow border border-secondary' variant='success' disabled onClick={() => { uploadProfilePicture() }}>
              <Spinner variant='light' size='sm'></Spinner> Loading
            </Button>
            :
            uploadImageExtentionValidator === true
              ?
              <Button className='px-4 rounded-4 add-item-shadow border border-secondary' variant='success' onClick={() => { uploadProfilePicture() }}>Unggah</Button>
              :
              <Button className='px-4 rounded-4 add-item-shadow border border-secondary' variant='warning' onClick={() => { setUploadImageExtentionValidator(true) }}>Pilih gambar</Button>

      }
    </Modal.Footer></Modal>)

  const modalDeletePicture = (<Modal
    {...props}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    size="md"
    backdrop={false}
    onShow={() => {
      setIsLoading(false)
      setIsResponded(false)
    }}
    style={{ zIndex: "9999", backgroundColor: "rgba(0, 0, 0, 0.1)", backdropFilter: "blur(20px)" }}
    contentClassName='rounded-4 bg-transparent overflow-hidden'
  >
    <Modal.Header closeButton style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      <Modal.Title id="contained-modal-title-vcenter">
        <span className='bi bi-trash' /> {title}
      </Modal.Title>
    </Modal.Header>

    <Modal.Body style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)", borderTop: "solid 1px grey", borderBottom: "solid 1px grey" }}>
      {
        !!isResponded
          ?
          (<div className='overflow-hidden'>
            <RightToLeft>
              <Alert variant='warning border-sucess w-100 rounded-4'>
                <h4 className='bi bi-check-circle'> Sukses </h4>
                <hr className='text-success m-0' />
                <p>Foto berhasil dihapus. Silahkan kembali ke halaman profile</p>
              </Alert>
            </RightToLeft>
          </div>)
          :
          (<>
            <h5 className='text-danger bi bi-exclamation-triangle'> {secondTitle}</h5>
            <div className='overflow-hidden'>
              {
                !!isLoading
                  ?
                  <TopToBottom>
                    <Form.Text id="passwordHelpBlock" muted>
                      Menghapus foto, silahkan tunggu...
                    </Form.Text>
                    <ProgressBar variant='danger' animated now={100} />
                  </TopToBottom>
                  :
                  (<p className='text-muted'>Apakah anda yakin ingin menghapus foto profile...?</p>)
              }
            </div>
          </>)
      }
    </Modal.Body>
    <Modal.Footer style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      {
        !!isResponded
          ?
          (<Button variant='success' onClick={() => { props.onHide() }}>Kembali</Button>)
          :
          (<Button variant='danger' onClick={() => { deleteProfilePicture() }}>Ya</Button>)
      }
    </Modal.Footer>
    <div >
    </div>
  </Modal>)

  const changePassword = (<Modal
    {...props}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    size="md"
    backdrop={false}
    onShow={() => {
      setIsPasswordChangerLoading(false)
      setIsPasswordValidated(false)
      setIsPasswordCorectly(true)
      setIsPWDSuccessfulChange(false)
      setisNewPasswordMatch(true)
      setcurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    }}
    style={{ zIndex: "9999", backgroundColor: "rgba(0, 0, 0, 0.1)", backdropFilter: "blur(20px)" }}
    contentClassName='rounded-4 bg-transparent overflow-hidden'
  >
    <Modal.Header closeButton style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      <Modal.Title id="contained-modal-title-vcenter">
        <span className='bi bi-shield-lock' /> {title}
      </Modal.Title>
    </Modal.Header>

    <Modal.Body style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)", borderTop: "solid 1px grey", borderBottom: "solid 1px grey" }}>
      <div className='overflow-hidden'>
        <div>
          {
            !!isPasswordValidated
              ?
              (isPWDSuccessfulChange === true
                ?
                (<RightToLeft>
                  <Alert variant='success border-sucess w-100 rounded-4'>
                    <h4 className='bi bi-check-circle'> Sukses </h4>
                    <hr className='text-success m-0' />
                    <p>Berhasil melakukan perubahan pada password</p>
                  </Alert>
                </RightToLeft>)
                :
                (<BottomToTop>
                  <p className='text-muted'>Masukan password baru</p>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default" style={{ borderRadius: '15px 0px 0px 15px' }}>
                      {
                        !!isPasswordChangerLoading
                          ?
                          <Spinner variant='primary' size='sm' />
                          :
                          <span className='bi bi-lock' />
                      }
                    </InputGroup.Text>
                    <Form.Control placeholder='Masukan password baru' aria-label="Default" aria-describedby="inputGroup-sizing-default" type='password' autoComplete='new-password' value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} style={{ borderRadius: '0px 15px 15px 0px' }} />
                  </InputGroup>
                  <p className='text-muted'>Konfirmasi password baru</p>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default" style={{ borderRadius: '15px 0px 0px 15px' }}>
                      {
                        !!isPasswordChangerLoading
                          ?
                          <Spinner variant='primary' size='sm' />
                          :
                          <span className='bi bi-lock' />
                      }
                    </InputGroup.Text>
                    <Form.Control placeholder='Konfirmasi password' aria-label="Default" aria-describedby="inputGroup-sizing-default" autoComplete='new-password' type='password' value={confirmNewPassword} onChange={(e) => { setConfirmNewPassword(e.target.value) }} style={{ borderRadius: '0px 15px 15px 0px' }} />
                  </InputGroup>
                  {
                    isNewPasswordMatch === false
                    &&
                    <p className='text-danger'>Periksa kembali password baru dan konfirmasi dengan benar</p>
                  }
                </BottomToTop>))
              :
              (<>
                <p className='text-muted'>Masukan password saat ini</p>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default" style={{ borderRadius: '15px 0px 0px 15px' }}>
                    {
                      !!isPasswordChangerLoading
                        ?
                        <Spinner variant='primary' size='sm' />
                        :
                        <span className='bi bi-lock' />
                    }
                  </InputGroup.Text>
                  <Form.Control placeholder='Masukan password saat ini' aria-label="Default" aria-describedby="inputGroup-sizing-default" type='password' autoComplete='new-password' value={currentPassword} onChange={(e) => { setcurrentPassword(e.target.value) }} style={{ borderRadius: '0px 15px 15px 0px' }} />
                </InputGroup>
              </>)
          }
          {
            isPasswordCorectly === false
            &&
            (<p className='text-danger'>Password tidak cocok, silahkan coba lagi</p>)
          }
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      {
        isPWDSuccessfulChange === true
          ?
          (<Button variant='success' onClick={() => { props.onHide() }}>Kembali</Button>)
          :
          (
            <RightToLeft>
              <Button variant='success mx-3' onClick={() => { changeAndConfirmPassword(!!isPasswordValidated ? ("checked") : ("uncheck")) }}>Konfirmasi</Button>
              <Button variant='secondary' onClick={() => { props.onHide() }}>Batal</Button>
            </RightToLeft>

          )
      }
    </Modal.Footer>
    <div >
    </div>
  </Modal>)

  const deleteDraftAttendanceRules = (<Modal
    {...props}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    size="md"
    backdrop={false}
    onShow={() => {
      setIsLoading(false)
      setIsResponded(false)
    }}
    style={{ zIndex: "9999", backgroundColor: "rgba(0, 0, 0, 0.1)", backdropFilter: "blur(20px)" }}
    contentClassName='rounded-4 bg-transparent overflow-hidden'>
    <Modal.Header closeButton style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      <Modal.Title id="contained-modal-title-vcenter">
        <span className='bi bi-trash' /> {title}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)", borderTop: "solid 1px grey", borderBottom: "solid 1px grey" }}>
      <h5 className='text-danger bi bi-exclamation-triangle'> {secondTitle}</h5>

      {
        !!isResponded
          ?
          (<div className='overflow-hidden'>
            <RightToLeft>
              <Alert variant='warning border-sucess w-100 rounded-4'>
                <h4 className='bi bi-check-circle'> Sukses </h4>
                <hr className='text-success m-0' />
                <p>Draft berhasil dihapus. Silahkan kembali</p>
              </Alert>
            </RightToLeft>
          </div>)
          :
          (<div className='overflow-hidden'>
            <p className='text-muted'>Apakah anda yankin ingin menghapus draft aturan absensi "<b>{props.draft_name}</b>"...?</p>
          </div>)
      }
    </Modal.Body>
    <Modal.Footer style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      {
        !!isResponded
          ?
          (<Button variant='success' onClick={() => { props.onHide() }}>Kembali</Button>)
          :
          (<Button variant='danger' onClick={() => { deleteDraftAttendancerule() }}>Hapus</Button>)
      }
    </Modal.Footer>
  </Modal>)


  const modalSickMail = (<Modal
    {...props}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    size="md"
    backdrop={false}
    onShow={() => {
      setIsLoading(false)
      setIsResponded(false)
      setIfExtentionsNotAloowed('')
    }}
    style={{ zIndex: "9999", backgroundColor: "rgba(0, 0, 0, 0.1)", backdropFilter: "blur(20px)" }}
    contentClassName='rounded-4 bg-transparent overflow-hidden'
  >
    <Modal.Header closeButton style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      <Modal.Title id="contained-modal-title-vcenter">
        <span className='bi bi-cloud-upload' /> {title}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)", borderTop: "solid 1px grey", borderBottom: "solid 1px grey" }}>
      {
        !!isResponded
          ?
          (<div className='overflow-hidden'>
            <RightToLeft>
              <Alert variant='success border-sucess w-100 rounded-4'>
                <h4 className='bi bi-check-circle'> Sukses </h4>
                <hr className='text-success m-0' />
                <p>Upload file berhasil. Silahkan kembali ke halaman profile</p>
              </Alert>
            </RightToLeft>
          </div>)
          :
          (<>
            <h5>{secondTitle}</h5>
            <div className='overflow-hidden'>
              {
                isLoading === true
                  ?
                  (<TopToBottom>
                    <Form.Text id="passwordHelpBlock" muted>
                      Mengunggah gambar, silahkan tunggu...
                    </Form.Text>
                    <ProgressBar variant='success' animated now={100} style={{ marginBottom: "22px" }} />
                  </TopToBottom>)
                  :
                  uploadImageExtentionValidator === true
                    ?
                    (<BottomToTop>
                      <Form.Control
                        className='rounded-4 m-1'
                        type="file"
                        onChange={(e) => { setUploadImage(e.target.files[0]) }}
                        style={{ width: "98%" }}
                      />
                      <Form.Text id="passwordHelpBlock" muted>
                        <span className='text-danger fw-bold me-2'> {ifExtentionsNotAloowed} </span>
                        <span>Silahkan masukan gambar dari penyimpanan anda yang berekstensi '.jpg, .jpeg, atau .png'</span>
                      </Form.Text>
                    </BottomToTop>)
                    :
                    (<TopToBottom>
                      <Form.Text id="passwordHelpBlock" className='text-danger fw-bold'>
                        Sepertinya file yang anda unggah bukan gambar...!
                        Harap unggah file jenis gambar. <br />
                        <span className='text-muted fw-normal'> Ekstensi file yang diizinkan '.jpg', '.jpeg', '.png'</span>
                      </Form.Text>
                    </TopToBottom>)
              }
            </div>
          </>)
      }
    </Modal.Body>
    <Modal.Footer style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      {
        !!isResponded
          ?
          <Button className='px-4 rounded-4 add-item-shadow border border-secondary' variant='warning' onClick={() => { props.onHide() }}>Kembali</Button>
          :
          !!isLoading
            ?
            <Button className='rounded-4 add-item-shadow border border-secondary' variant='success' disabled onClick={() => { uploadSickMail() }}>
              <Spinner variant='light' size='sm'></Spinner> Loading
            </Button>
            :
            uploadImageExtentionValidator === true
              ?
              <Button disabled={disableButton} className='px-4 rounded-4 add-item-shadow border border-secondary' variant='success' onClick={() => { uploadSickMail() }}>Unggah</Button>
              :
              <Button className='px-4 rounded-4 add-item-shadow border border-secondary' variant='warning' onClick={() => { setUploadImageExtentionValidator(true) }}>Pilih gambar</Button>

      }
    </Modal.Footer></Modal>)



  return (
    props.options === "update picture"
      ?
      (modalUpdatePicture)
      :
      props.options === "delete picture"
        ?
        (modalDeletePicture)
        :
        props.options === "change password"
          ?
          (changePassword)
          :
          props.options === "delete draft attdnc rules"
            ?
            (deleteDraftAttendanceRules)
            :
            props.options === "sick proof"
            &&
            (modalSickMail)
  )
}

export default ModalPopUp
