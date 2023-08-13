import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Spinner, Table } from 'react-bootstrap'
import API_URL from '../../../API/API_URL'
import axios from 'axios'

const SickUser = () => {

  const [userDatas, setUserDatas] = useState([])
  // const [selectOptionsValue, setSelectOptionsValue] = useState("")
  const [truggerTable, setTruggerTable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchName, setSearchName] = useState("")
  const [searchDate, setSearchDate] = useState("")


  const getDataForUserSickPage = () => {
    const url = API_URL().FOR_USER_SICK.SHOW_ALL_USER
    axios.get(url).then(response => {
      setLoading(false)
      setUserDatas(response.data)
    })
  }

  const dataSearcher = () => {
    const filteredByName = userDatas.filter((itemsForName) => {
      let fullName = `${itemsForName.first_name} ${itemsForName.last_name}`
      return fullName.toLowerCase().startsWith(searchName.toLowerCase())
    })

    const filteredByDate = filteredByName.filter((itemsForDate) => {
      const itemDate = itemsForDate.created_at_in
      const onlyDate = itemDate.split('T')[0]
      return searchDate === '' || onlyDate === searchDate
    })

    return filteredByDate
  }


  const tableBodyComponent = (result, i) => {
    const resultDate = result.created_at_in
    const onlyDate = resultDate.split('T')[0]

    return (
      <tr key={i} className='rounded-4'>
        <td style={{ borderRadius: '15px 0px 0px 15px' }}>{i + 1}</td>
        <td>
          {
            !!result.profile_picture
              ?
              <img
                src={'data:image/jpeg;base64,' + result.profile_picture}
                className='rounded-circle border'
                style={{ height: "40px", width: "40px", objectFit: "cover" }} />
              :
              (<div className='border d-flex justify-content-center rounded-circle align-item-end' style={{ height: "40px", width: "40px", backgroundColor: "#E9E9E9" }} >
                <span className='bi bi-person-fill m-0 p-0 text-secondary' style={{ fontSize: "1.7rem" }} />
              </div>)
          }
        </td>
        <td>{result.first_name} {result.last_name}</td>
        <td>{onlyDate}</td>
        <td>
          {
            !!loading
              ?
              <div className='d-flex align-items-center' style={{ width: "135px", height: "20px" }}>
                <Spinner className='me-2' variant='secondary' size='sm' /> <p className='text-muted mt-3'>Memuat...</p>
              </div>
              :
              <Form.Select className='rounded-4' size="sm" aria-label="Default select" onChange={(e) => { updateUserSick(result.user_id, e.target.value, result.created_at_in) }} style={{ width: "130px" }}>
                {
                  result.presence_status === "sakit"
                  &&
                  <>
                    <option value="sakit">sakit</option>
                    <option value="alfa">alfa</option>
                  </>
                }
                {
                  result.presence_status === "alfa"
                  &&
                  <>
                    <option value="alfa">alfa</option>
                    <option value="sakit">sakit</option>
                  </>
                }
              </Form.Select>
          }
        </td>
        <td>{!!result.updated_at ? result.updated_at : '-'}</td>
        <td style={{ borderRadius: '0px 15px 15px 0px' }}>{!!result.descriptions ? result.descriptions : '-'}</td>
      </tr>
    )
  }


  const updateUserSick = (user_id, selectOptionsValue, date) => {
    setLoading(true)
    const url = API_URL().FOR_USER_SICK.UPDATE_USER_SICK
    const data = {
      "user_id": user_id,
      "descriptions": selectOptionsValue,
      "created_at_in": date,
      "options": selectOptionsValue
    }
    axios.post(url, data).then(response => {
      if (response.data) {
        setTruggerTable(prev => !prev)
      }
    })
  }



  useEffect(() => {
    getDataForUserSickPage()
  }, [truggerTable])



  return (
    <div className='p-3'>
      <h3 className='bi bi-prescription2'>Perizinan sakit</h3>
      <InputGroup className='d-flex justify-content-end mb-3'>
        <Form.Control
          aria-describedby="searchByName"
          placeholder="Cari nama"
          type="text"
          className='add-item-shadow'
          style={{ borderRadius: '15px 0px 0px 15px', maxWidth: "200px" }}
          onChange={(e) => { setSearchName(e.target.value) }}
        />
        <Form.Control
          aria-describedby="searchByName"
          placeholder="Cari tanggal"
          type="date"
          className='add-item-shadow'
          // onFocus={() => { onFocusHandler() }}
          style={{ maxWidth: "200px" }}
          onChange={(e) => { setSearchDate(e.target.value) }}
        />
        <InputGroup.Text
          style={{ borderRadius: '0px 15px 15px 0px' }}
          className='text-muted add-item-shadow'>
          <span className='bi bi-search cursor-pointer' />
        </InputGroup.Text>
      </InputGroup>

      <div>
        <Table borderless hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Foto</th>
              <th>Nama</th>
              <th>tanggal</th>
              <th>status</th>
              <th>Diubah</th>
              <th>deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {
              dataSearcher().map((result, i) => tableBodyComponent(result, i))
            }
          </tbody>
        </Table>
      </div >
    </div >
  )
}

export default SickUser
