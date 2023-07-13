import React, { useEffect, useState } from 'react'
import { Card, ProgressBar, Table } from 'react-bootstrap'
import ThemingCangerFunc from '../../../Theme'
import axios from 'axios'
import API_URL from '../../../API/API_URL'





const TablePresentHistory = (props) => {

  // const [hadir, setHadir] = useState(false)
  // const [izin, setIzin] = useState(false)
  // const [alfa, setAlfa] = useState(false)
  const [nameSelected, setNameSelected] = useState("")
  const [attendanceList, setAttendanceList] = useState([])



  const rowOnClickHandler = (result) => {
    props.name(result)
    setNameSelected(result)
  }

  useEffect(() => {
    const getListUserAttendace = () => {
      const url = API_URL().ATTENDANCE.LIST_OF_USER_ATTENDANCE
      axios.get(url).then((response) => {
        setAttendanceList(response.data)
      })
    }

    getListUserAttendace()
  }, []);

  return (
    <>
      <Card className={`${ThemingCangerFunc().gradient} add-item-shadow overflow-scroll hide-scrollbar rounded-4 p-0 height-tabel-container`} style={ThemingCangerFunc("white").style}>
        <h3 className='m-3'>Riwayat Absensi</h3>
        <div style={{ height: "510px" }}>
          <Table hover style={{ width: "850px", margin: "10px" }}>
            <thead >
              <tr >
                <th className='text-light border-end border-2' style={{ width: "40px", backgroundColor: "Teal" }} >No</th>
                <th className='text-light border-end border-2' style={{ width: "100px", backgroundColor: "Teal" }}>Tanggal</th>
                <th className='text-light border-end border-2' style={{ backgroundColor: "Teal" }}>Nama</th>
                <th className='text-center text-light border-end border-2' style={{ width: "75px", backgroundColor: "Teal" }}>Hadir</th>
                <th className='text-center text-light border-end border-2' style={{ width: "75px", backgroundColor: "Teal" }}>Izin</th>
                <th className='text-center text-light' style={{ width: "75px", backgroundColor: "Teal" }}>Alfa</th>
              </tr>
            </thead>
            <tbody>
              {
                attendanceList.map((result, i) => {
                  const fullname = `${result.first_name} ${result.last_name}`
                  const originalDateTimeString = result.created_at
                  const [date, time] = originalDateTimeString.split('T')
                  const [year, month, day] = date.split('-')
                  const newFormatDate = `${time} / ${day}-${month}-${year}`

                  return (
                    <tr key={i} className={`cursor-pointer ${fullname === nameSelected && ("bg-light fw-bold ")}`} onClick={() => { rowOnClickHandler(fullname) }}>
                      <td className='text-center border-end border-2'>{i + 1}</td>
                      <td className='border-end border-2'>{newFormatDate}</td>
                      <td className='border-end border-2'>{fullname}</td>
                      {
                        result.presenting === "hadir"
                          ?
                          (<td className='fw-bold text-center text-success h4 border-end border-2'><span className='bi bi-check-circle-fill' /></td>)
                          :
                          (<td className='fw-bold text-center h4 border-end border-2'></td>)
                      }
                      {
                        result.presenting === "izin"
                          ?
                          (<td className='fw-bold text-center text-warning h4 border-end border-2'><span className='bi bi-arrow-up-left-circle-fill' /></td>)
                          :
                          (<td className='fw-bold text-center h4 border-end border-2'></td>)
                      }
                      {
                        result.presenting === "alfa"
                          ?
                          (<td className='fw-bold text-center text-danger h4'><span className='bi bi-x-circle-fill' /></td>)
                          :
                          (<td className='fw-bold text-center h4'></td>)
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          {
            attendanceList.length === 0
            &&
            (<>
              <span className='bi bi-cloud-download mx-3 text-muted'> Memuat daftar hadir...</span>
              <ProgressBar className='mx-3 my-2' variant='success' animated now={100} />
            </>)
          }
        </div>
      </Card>
    </>
  )
}

export default TablePresentHistory


// {
//     result.presenting === "alfa"
//         &&
//         (<span className='bi bi-x-circle-fill' />)
// }