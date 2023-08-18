import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import API_URL from '../../../API/API_URL'
import { Button, Col, Container, Form, FormGroup, FormLabel, InputGroup, Row, Table } from 'react-bootstrap'
import TableDetailPresence from './Table-detail-presence'
import UserContext from '../../../Context/Context'

const UserDetailPresence = (props) => {

  const currentUserIdFromVisitor = JSON.parse(localStorage.getItem('visit'))
  const userRole = JSON.parse(localStorage.getItem('obj'))
  const [userDetail, setUserDetail] = useState({})
  const yearOptions = []
  const currentYear = new Date().getFullYear()
  const [valueOfYear, setValueOfYear] = useState(currentYear)
  const [yearTotalBackward, setYearTotalBackward] = useState(2)
  const [yearTotalForward, setYearTotalForward] = useState(2)
  const { setcontextShowPDF, setcontextPDFDatas } = useContext(UserContext)


  const yearOptionValue = () => {
    if (yearTotalForward <= 2) {
      for (let year = currentYear - yearTotalBackward; year <= currentYear + 2; year++) {
        yearOptions.push(
          <option key={year} value={year}>
            {year} {year === currentYear && "📌"}
          </option>
        )
      }

    } else if (yearTotalBackward <= 2) {
      for (let year = currentYear - 2; year <= currentYear + yearTotalForward; year++) {
        yearOptions.push(
          <option key={year} value={year}>
            {year} {year === currentYear && "📌"}
          </option>
        )
      }
    } else {
      for (let year = currentYear - yearTotalBackward; year <= currentYear + yearTotalForward; year++) {
        yearOptions.push(
          <option key={year} value={year}>
            {year} {year === currentYear && "📌"}
          </option>
        )
      }
    }

    return yearOptions
  }

  const showPDF = () => {
    setcontextShowPDF(true)
    setcontextPDFDatas({
      tahun: valueOfYear,
      nama: `${userDetail.first_name} ${userDetail.last_name}`,
      role: userDetail.role,
      alamat: userDetail.alamat,
      email: userDetail.email,
      no_telepon: userDetail.no_telepon,
      user_id: currentUserIdFromVisitor.id
    })
  }





  useEffect(() => {

    const getUserDetail = () => {
      const url = API_URL(currentUserIdFromVisitor.id).USER.GET_SINGLE_USER
      axios.get(url).then((response) => {

        if (props.current_user !== "my-self") {
          props.user_detail({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            alamat: response.data.alamat,
            jk: response.data.j_kelamin,
            pp: response.data.profile_picture
          })
        }

        setUserDetail({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          alamat: response.data.alamat,
          no_telepon: response.data.no_telepon,
          jk: response.data.j_kelamin,
          pp: response.data.profile_picture,
          role: response.data.role
        })
      })
    }

    getUserDetail()
  }, [])


  return (
    <Container className="p-0 py-2 m-0">
      {
        props.current_user === "visitor"
        &&
        <div className='mb-4 rounded-4 w-100 border add-item-shadow py-1'>
          <Container>
            <Row>
              <Col className='mx-2 my-1 rounded-4 d-flex align-items-center border tex-center justify-content-center' style={{ height: "50px", backgroundColor: "cornsilk" }}> <span className="bi bi-person px-2 h4 m-0 p-0" /> <span className="fw-bold h4 m-0 p-0"> PROFILE </span></Col>
            </Row>

            <Row>
              <Col className='mx-2 my-1 rounded-4 d-flex align-items-center border tex-center justify-content-center' style={{ height: "50px", backgroundColor: "Ivory" }}> <span className="bi bi-person-vcard px-2" />  {userDetail.first_name} {userDetail.last_name} </Col>
              <Col className='mx-2 my-1 rounded-4 d-flex align-items-center border tex-center justify-content-center' style={{ height: "50px", backgroundColor: "Ivory" }}> <span className="bi bi-envelope-at px-2" />   {userDetail.email} </Col>
            </Row>

            <Row>
              <Col className='mx-2 my-1 rounded-4 d-flex align-items-center border tex-center justify-content-center' style={{ height: "50px", backgroundColor: "Ivory" }}> <span className="bi bi-telephone px-2" />  {userDetail.no_telepon} </Col>
              <Col className='mx-2 my-1 rounded-4 d-flex align-items-center border tex-center justify-content-center' style={{ height: "50px", backgroundColor: "Ivory" }}> <span className="bi bi-gender-ambiguous px-2" />  {userDetail.jk} </Col>
            </Row>

            <Row>
              <Col className='mx-2 my-1 rounded-4 d-flex align-items-center border tex-center justify-content-center' style={{ height: "50px", backgroundColor: "Ivory" }}> <span className="bi bi-geo-alt px-2" />  {userDetail.alamat} </Col>
            </Row>
          </Container>
        </div>
      }

      <div className='mb-4 rounded-4 w-100 border add-item-shadow py-1'>
        <Container>
          <Row>
            <Col className='mx-2 my-1 rounded-4 d-flex align-items-center border tex-center justify-content-center flex-column' style={{ height: "50px", backgroundColor: "HoneyDew" }}>
              <div className='d-flex justify-content-center w-100 p-0 m-0'>
                <div className='d-flex justify-content-end'>
                  <p className="bi bi-calendar2-week px-2 h4 m-0 p-0" />
                  <p className="fw-bold h4 m-0 p-0 text-center"> KEHADIRAN </p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center'>
              <div className='choese-year-container'>
                <Table borderless className='m-0'>
                  <thead>
                    <tr>
                      <th className='text-center'>Tahun kedepan</th>
                      <th className='text-center'>Tahun kebelakang</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <InputGroup className='overflow-hidden p-0 mx-0' style={{ width: "100%" }}>
                          <InputGroup.Text style={{ borderRadius: '15px 0px 0px 15px' }}><span className='bi bi-arrow-bar-up h5 m-0 p-0' /> </InputGroup.Text>
                          <Form.Control
                            style={{ backgroundColor: "cornsilk", borderRadius: '0px 15px 15px 0px' }}
                            placeholder='Tahun kedepan'
                            type='number'
                            value={yearTotalForward <= 2 ? 2 : yearTotalForward}
                            onChange={(e) => setYearTotalForward(parseInt(e.target.value))}
                          />
                        </InputGroup>
                      </td>
                      <td>
                        <InputGroup className='overflow-hidden p-0 mx-0' style={{ width: "100%" }}>
                          <InputGroup.Text style={{ borderRadius: '15px 0px 0px 15px' }}><span className='bi bi-arrow-bar-down h5 m-0 p-0' /> </InputGroup.Text>
                          <Form.Control
                            style={{ backgroundColor: "cornsilk", borderRadius: '0px 15px 15px 0px' }}
                            placeholder='Tahun kebelakang'
                            value={yearTotalBackward <= 2 ? 2 : yearTotalBackward}
                            onChange={(e) => setYearTotalBackward(parseInt(e.target.value))}
                            type='number'
                          />
                        </InputGroup>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className='text-center'>
                        <InputGroup className='overflow-hidden p-0 mx-0 choese-year-input'>
                          <InputGroup.Text style={{ borderRadius: '15px 0px 0px 15px' }}><span className='bi bi-calendar-month h5 m-0 p-0' /> </InputGroup.Text>
                          <Form.Select style={{ backgroundColor: "cornsilk", width: "100px", borderRadius: '0px 15px 15px 0px' }} aria-label="Default select example" onChange={((e) => { setValueOfYear(e.target.value) })}>
                            <option value={currentYear}>Pilih tahun </option>
                            {yearOptionValue()}
                          </Form.Select>
                        </InputGroup>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <Row>
            {
              userRole.role === "master"
              &&
              <div className='w-100 d-flex justify-content-end'>
                <Button className='rounded-4 ' variant='danger' onClick={() => showPDF()}>Tampilkan PDF</Button>
              </div>
            }
            <Col className='mx-2 my-1 rounded-4 overflow-auto border p-0' style={{ backgroundColor: "Ivory" }}>
              <div className='tabel-detail-container'>
                <TableDetailPresence year={valueOfYear} user_id={currentUserIdFromVisitor.id} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  )
}

export default UserDetailPresence
