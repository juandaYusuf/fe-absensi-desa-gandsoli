import axios from 'axios'
import React, { useEffect, useState, Fragment } from 'react'
import { Alert, Button, ButtonGroup, Card, Collapse, Form, InputGroup, Table } from 'react-bootstrap'
import API_URL from '../../../API/API_URL'
import ProgresBarLoadingVisual from '../../../Global-components/Progres-bar-loading-visual'
import { useNavigate } from 'react-router-dom'


const WorkingHours = () => {

  const navigateTo = useNavigate()
  const [category, setCategory] = useState("semua")
  const [listOfUser, setListOfUser] = useState([])
  const [isFocus, setIsFocus] = useState(false)
  const [isLoadingDatas, setIsLoadingDatas] = useState(true)
  const [togleDeleteUser, setTogleDeleteUser] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [iconHover, setIconHover] = useState({})
  const [deletingUserData, setDeletingUserData] = useState({})
  const [deleteFailed, setdeleteFailed] = useState(false)
  const [refreshUserList, setrefreshUserList] = useState(false)
  const [updateUserRole, setUpdateUserRole] = useState({ "id": 0, "show": false })
  const [roleSelected, setRoleSelected] = useState("")

  const visitStafProfileByAdmin = (userID) => {
    localStorage.setItem('visit', JSON.stringify({ "id": userID }))
    navigateTo('/profile')
  }

  const deleteUserContainer = (id, photo, first_name, last_name, email, alamat, telepon, role) => {
    setTogleDeleteUser(!togleDeleteUser)
    setdeleteFailed(false)
    setDeletingUserData({
      "id": id,
      "photo": photo,
      "name": `${first_name} ${last_name}`,
      "email": email,
      "alamat": alamat,
      "telepon": telepon,
      "role": role
    })
  }

  const changeCategory = (options) => {
    setCategory(options)
    setIsFocus(false)
    setTogleDeleteUser(false)
  }

  const DeleteUser = (id) => {
    const url = API_URL(id).USER.DELETE_USER
    axios.delete(url).then((response) => {
      if (response.data.message === "user data has been deleted") {
        setrefreshUserList(!refreshUserList)
        setTogleDeleteUser(false)
        setdeleteFailed(false)
      }
    }).catch(() => {
      setdeleteFailed(true)
    })
  }

  const updateRole = (id) => {
    if (roleSelected === "") return 
    const data = {
      "id": id,
      "role": roleSelected
    }
    const url = API_URL(id).USER.UPDATE_ROLE

    axios.put(url, data).then((response) => {
      if (response.data.message === "user role has been updated") {
        setUpdateUserRole({
          "id": 0,
          "show": false
        })
        setRoleSelected("")
        setrefreshUserList(!refreshUserList)
      }
    })
  }

  const tableBodyComponent = (data, i) => {

    return (<Fragment key={i}>
      <tr>
        <td className='align-middle' style={{ width: "60px", borderRadius: '15px 0px 0px 15px' }}>{i + 1}</td>
        <td className='align-middle' style={{ width: "80px" }}>
          {
            !!data.profile_picture
              ?
              (<img
                src={'data:image/jpeg;base64,' + data.profile_picture}
                className='rounded-circle border'
                style={{ height: "40px", width: "40px", objectFit: "cover" }} />)
              :
              (<div className='border d-flex justify-content-center rounded-circle align-item-end' style={{ height: "40px", width: "40px", backgroundColor: "#E9E9E9" }} >
                <span className='bi bi-person-fill m-0 p-0 text-secondary' style={{ fontSize: "1.6rem" }} />
              </div>)
          }
        </td>
        <td className='align-middle' style={{ width: "250px" }}>{data.first_name} {data.last_name}</td>
        <td className='align-middle' >{data.email}</td>
        <td className='align-middle' >{data.no_telepon}</td>
        <td className='align-middle' style={{ width: "200px" }}>{
          !!updateUserRole.show && updateUserRole.id === data.id
            ?
            <InputGroup >
              <Form.Select
                style={{ borderRadius: '15px 0px 0px 15px' }}
                onChange={(e) => { setRoleSelected(e.target.value) }}>
                <option> Pilih role</option>
                <option value="kepdes"> Kepala desa {data.role === "kepdes" && "📌"}</option>
                <option value="admin">Admin {data.role === "admin" && "📌"}</option>
                <option value="staf">Staf {data.role === "staf" && "📌"}</option>
              </Form.Select>
              <Button
                className='bi bi-arrow-repeat'
                variant='secondary'
                disabled={!!roleSelected ? false : true}
                style={{ borderRadius: '0px 15px 15px 0px' }}
                onClick={() => { updateRole(data.id) }} />
            </InputGroup>
            :
            data.role

        }</td>
        <td className='text-center text-muted align-middle' style={{ borderRadius: '0px 15px 15px 0px' }}>
          <span
            className={`${iconHover.option === "edit" && iconHover.id === data.id ? 'bi bi-pencil-fill' : 'bi bi-pencil'} cursor-pointer text-center h5 mx-2`}
            onMouseEnter={() => { setIconHover({ "option": "edit", "id": data.id }) }}
            onMouseLeave={() => { setIconHover({ "option": "", "id": "" }) }}
            onClick={() => { setUpdateUserRole({ "id": data.id, "show": !updateUserRole.show }) }} />

          <span
            className={`${iconHover.option === "profile" && iconHover.id === data.id ? 'bi bi-person-fill' : 'bi bi-person'} cursor-pointer text-center h5 mx-2`}
            onMouseEnter={() => { setIconHover({ "option": "profile", "id": data.id }) }}
            onMouseLeave={() => { setIconHover({ "option": "", "id": "" }) }}
            onClick={() => { visitStafProfileByAdmin(data.id) }} />

          <span
            className={`${iconHover.option === "delete"
              && iconHover.id === data.id
              || !!togleDeleteUser
              && deletingUserData.id === data.id
              ? 'bi bi-trash-fill'
              : 'bi bi-trash'} cursor-pointer text-center h5 mx-2`}
            onMouseEnter={() => { setIconHover({ "option": "delete", "id": data.id }) }}
            onMouseLeave={() => { setIconHover({ "option": "", "id": "" }) }}
            onClick={() => { deleteUserContainer(data.id, data.profile_picture, data.first_name, data.last_name, data.email, data.alamat, data.no_telepon, data.role) }}
          />
        </td>
      </tr>

      <tr className='p-0 m-0'>
        <td
          className='rounded-4 px-4 p-0 m-0'
          colSpan={7}
          style={{ backgroundColor: "#E9ECEF" }}>
          <Collapse className='m-0 p-0' in={!!togleDeleteUser && deletingUserData.id === data.id ? true : false} >
            <div id="example-collapse-text">
              <div className='d-flex justify-content-center align-item-center p-3'>
                <div className='d-flex flex-column align-items-center' style={{ width: "400px" }}>
                  <span className='fw-bold text-danger bi bi-trash-fill h3' />
                  <span className='fw-bold text-danger text-decoration-underline'>HAPUS DATA PENGGUNA</span>
                  <i className='text-muted text-center mt-2'>Data pengguna yang dihapus tidak akan bisa dikembalikan atau di-restore, harap berhati - hati dalam menggunakanya.</i>
                  <span className='fw-bold mt-2 text-muted'>Hapus pengguna dengan data berikut</span>
                  <div className='add-item-shadow rounded-4 mt-3 flex-column align-items-center d-flex justify-content-center p-2' style={{ backgroundColor: "rgba(255, 255, 255, 0.28)", width: "230px" }}>
                    {
                      !!deletingUserData.photo
                        ?
                        (<img
                          src={'data:image/jpeg;base64,' + deletingUserData.photo}
                          className='rounded-circle border'
                          style={{ height: "80px", width: "80px", objectFit: "cover" }} />)
                        :
                        (<div className='border d-flex justify-content-center rounded-circle align-item-end' style={{ height: "80px", width: "80px", backgroundColor: "#E9E9E9" }} >
                          <span className='bi bi-person-fill m-0 p-0 text-secondary' style={{ fontSize: "3.6rem" }} />
                        </div>)
                    }
                    <span className='fw-bold h5'>{deletingUserData.name}</span>
                    <span className='text-muted'>{deletingUserData.role}</span>
                    <span className='text-muted text-center'>{deletingUserData.email}</span>
                    <span className='text-muted text-center'>{deletingUserData.telepon}</span>
                    <span className='text-muted text-center mt-2'>{deletingUserData.alamat}</span>
                  </div>
                  <ButtonGroup className='w-100 '>
                    <Button
                      className='bi bi-arrow-left mt-3 add-item-shadow-success'
                      variant='outline-success'
                      style={{ width: "120px", borderRadius: '15px 0px 0px 15px' }}
                      onClick={() => { setTogleDeleteUser(false) }}> Kembali
                    </Button>

                    <Button
                      className='bi bi-trash-fill mt-3 add-item-shadow-danger'
                      variant='outline-danger'
                      style={{ width: "120px", borderRadius: '0px 15px 15px 0px' }}
                      onClick={() => { DeleteUser(deletingUserData.id) }}> Hapus
                    </Button>
                  </ButtonGroup>

                  <Collapse in={deleteFailed}>
                    <div>
                      <Alert className=' mt-2 w-100 rounded-4 add-item-shadow-danger' variant='danger'>
                        <Alert.Heading className='bi bi-x-circle'> Gagal
                        </Alert.Heading>
                        Penghapussan data tidak dapat di proses..!
                      </Alert>
                    </div>
                  </Collapse>

                </div>
              </div>
            </div>
          </Collapse>
        </td>
      </tr>
    </Fragment>)
  }

  const dataSearcher = () => {
    const datas = listOfUser.filter((items) => {
      let fullName = `${items.first_name} ${items.last_name}`
      return fullName.toLowerCase().startsWith(searchValue.toLowerCase())
    })

    return datas
  }

  const onFocusHandler = () => {
    setIsFocus(true)
    setTogleDeleteUser(false)
  }

  const searchBoxFocused = () => {
    return dataSearcher().map((result, i) => tableBodyComponent(result, i))
  }

  const searchResult = () => {
    return listOfUser.map((result, i) => tableBodyComponent(result, i))
  }



  useEffect(() => {
    const getListOfUser = () => {
      const url = API_URL().USER.GET_MULTI_USER
      axios.get(url).then((response) => {
        if (!response.data.length !== 0) {
          setListOfUser(response.data)
          setIsLoadingDatas(false)
        }
      })
    }
    getListOfUser()
  }, [refreshUserList])


  return (
    <Card className='p-3 rounded-4 add-item-shadow' style={{ minHeight: "400px" }}>

      <h3>Daftar pengguna</h3>

      <div className='d-flex my-3 justify-content-between'>
        <div className='d-flex gap-2 p-2'>
          <ButtonGroup className='add-item-shadow-success'>
            <Button
              variant={`${category === "staf" && isFocus === false ? "success" : "outline-success"}`}
              style={{ width: "120px", borderRadius: '15px 0px 0px 15px' }}
              onClick={() => { changeCategory("staf") }}>Staf
            </Button>

            <Button
              variant={`${category === "admin" && isFocus === false ? "success" : "outline-success"}`}
              style={{ width: "120px" }}
              onClick={() => { changeCategory("admin") }}>Admin
            </Button>

            <Button
              variant={`${category === "kepdes" && isFocus === false ? "success" : "outline-success"}`}
              style={{ width: "120px" }}
              onClick={() => { changeCategory("kepdes") }}>Kepala desa
            </Button>

            <Button
              variant={`${category === "semua" || isFocus === true ? "success" : "outline-success"}`}
              style={{ width: "120px", borderRadius: '0px 15px 15px 0px' }}
              onClick={() => { changeCategory("semua") }}>semua
            </Button>
          </ButtonGroup>
        </div>

        <div>
          <Form.Group
            className="mb-3 add-item-shadow rounded-4"
            controlId="title">
            <InputGroup>
              <Form.Control
                aria-describedby="searchByName"
                placeholder="Cari nama"
                type="text"
                onFocus={() => { onFocusHandler() }}
                style={{ borderRadius: '15px 0px 0px 15px' }}
                onChange={(e) => { setSearchValue(e.target.value) }}
              />
              <InputGroup.Text
                style={{ borderRadius: '0px 15px 15px 0px' }}
                className='text-muted'>
                <span className='bi bi-search cursor-pointer' />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </div>
      </div>
      <Table hover className='border border-white'>
        <thead>
          <tr>
            <th className='text-muted'>No</th>
            <th className='text-muted'>Foto</th>
            <th className='text-muted'>Name</th>
            <th className='text-muted'>Email</th>
            <th className='text-muted'>Telepon</th>
            <th className='text-muted'>Role</th>
            <th className='text-center text-muted' style={{ width: "150px" }}>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {
            category !== "semua" && isFocus === false
              ?
              listOfUser.filter((items => items.role === category)).map((result, i) => {
                return (tableBodyComponent(result, i))
              })
              :
              isFocus === true
                ?
                (searchBoxFocused())
                :
                (searchResult())
          }
        </tbody>
      </Table>
      {
        isLoadingDatas === true
        &&
        <ProgresBarLoadingVisual theme={"success"} progresValue={100} />
      }
    </Card >

  )
}

export default WorkingHours
