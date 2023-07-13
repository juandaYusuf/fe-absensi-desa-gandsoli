import React, { useContext, useEffect, useState } from 'react'
import { Table, ProgressBar } from 'react-bootstrap'
import API_URL from '../API/API_URL'
import axios from 'axios';
import UserContext from '../Context/Context'


const AttendanceTable = ({ year, month }) => {

  const { setContextUserFullNameOfTable, setContextPresenceCounterIsLoading, setContextPresenceCounter } = useContext(UserContext)
  const [attendanceList, setAttendanceList] = useState([])
  const [localMonthAndYear, setLocalMonthAndYear] = useState({})
  const [tableDataIsLoading, setTableDataIsLoading] = useState(true)
  let valueOfDay = []


  //  Jumlah hari dalam bulan tertentu
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  };

  // Nama-nama hari -ID
  const getDayName = (year, month, day) => {
    const date = new Date(year, month, day)
    const options = { weekday: "long" }
    return date.toLocaleDateString("id-ID", options)
  }

  // Tanggal dalam bulan tertentu
  const createTableHeader = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month)
    const dateAndDay = []

    for (let day = 1; day <= daysInMonth; day++) {
      const dayName = getDayName(year, month, day)
      valueOfDay.push(day.toString().padStart(2, "0"))
      let textColorOfDay = ""
      if (dayName === "Minggu" || dayName === "Sabtu") {
        textColorOfDay = "text-danger"
      }
      dateAndDay.push(
        <th key={day} style={{ backgroundColor: "DarkSlateGrey", position: "sticky", top: "0px", textAlign: "center" }}>
          <p className={`${textColorOfDay} text-align-center`} style={{ width: "60px" }}>
            <span style={{ margin: "auto", padding: "0px", textOrientation: "mixed", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{dayName}</span><br />
            <span style={{ textAlign: "center" }} >{day.toString().padStart(2, "0")}</span>
          </p>
        </th>
      )
    }
    return dateAndDay
  }

  // mengisi kolom sesuai dengan tanggal pada table 
  const createTableData = ({ presence }) => {
    const daysInMonth = getDaysInMonth(year, month)
    const tableData = []

    const dataPresence = presence.map((result) => {
      // console.log(result)

      let dateFromDBAtIn = result.created_at_in
      let dateFromDBAtOut = result.created_at_out
      let presenceStatus = result.presence_status
      let working = result.working
      let splitTimeFromDateAtIn = dateFromDBAtIn.split("T")[0]
      let splitTimeFromDateAtOut = null

      if (result.created_at_out !== null) {
        dateFromDBAtOut = result.created_at_out
        splitTimeFromDateAtOut = dateFromDBAtOut.split("T")[0]
      }

      let splitDayFromMonthAndYearAtIn = parseInt(splitTimeFromDateAtIn.split("-")[2])
      let splitMonthFromDayAndYearAtIn = parseInt(splitTimeFromDateAtIn.split("-")[1])
      let splitYearFromDayAndMonthAtIn = parseInt(splitTimeFromDateAtIn.split("-")[0])

      let splitDayFromMonthAndYearAtOut = null
      // let splitMonthFromDayAndYearAtOut = parseInt(splitTimeFromDateAtOut.split("-")[1])
      // let splitYearFromDayAndMonthAtOut = parseInt(splitTimeFromDateAtOut.split("-")[0])

      if (splitTimeFromDateAtOut !== null) {
        splitDayFromMonthAndYearAtOut = parseInt(splitTimeFromDateAtOut.split("-")[2])
      }


      if (splitDayFromMonthAndYearAtIn) {
        return {
          "presence_status": presenceStatus,
          "day_in": splitDayFromMonthAndYearAtIn,
          "day_out": splitDayFromMonthAndYearAtOut,
          "year": splitYearFromDayAndMonthAtIn,
          "month": splitMonthFromDayAndYearAtIn,
          "working": working
        }
      } else {
        return {
          "presence_status": null,
          "day": null,
          "year": null,
          "month": null
        }
      }

    })

    for (let day = 1; day <= daysInMonth; day++) {
      const dayName = getDayName(year, month, day)
      tableData.push(
        <td key={day} className="fw-bold text-center text-success h4 border align-middle" style={{ backgroundColor: `${dayName === "Minggu" || dayName === "Sabtu" ? ("#ff000055") : (" ")}` }}>
          {
            dataPresence.map((result, i) => {
              let iconsChanger = ""

              if (result.presence_status === 'hadir' && result.day_in === result.day_out) {
                iconsChanger = "bi bi-check-circle-fill text-success"
              }

              if (result.working === true) {
                iconsChanger = "bi bi-person-workspace text-success"
              }

              if(result.presence_status === "cuti"){
                iconsChanger = "bi bi-door-open text-success"
              }
              

              if (result.presence_status === 'izin') {
                iconsChanger = "bi bi-arrow-up-left-circle-fill text-warning "
              }
              if (result.presence_status === 'alfa') {
                iconsChanger = "bi bi-x-circle-fill text-danger"
              }

              if (localMonthAndYear.year === result.year && localMonthAndYear.month === result.month) {
                return (
                  day === result.day_in
                  &&
                  (<span key={i} className={iconsChanger} style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} />)
                )
              }
            })
          }
        </td>
      )
    }

    return tableData
  }

  const presenceCounter = (attendanceId, fullname, presenceData) => {
    setContextPresenceCounter({
      "hadir": "belum ada data",
      "izin": "belum ada data",
      "alfa": "belum ada data"
    })
    setContextPresenceCounterIsLoading(true)
    setContextUserFullNameOfTable(fullname)
    const url = API_URL(attendanceId).ATTENDANCE.SINGLE_USER_ATTENDANCE

    const dataPresence = presenceData.presence.map((result) => {
      let dateFromDBAtIn = result.created_at_in
      let dateFromDBAtOut = null
      let presenceStatus = result.presence_status
      let splitTimeFromDateAtIn = dateFromDBAtIn.split("T")[0]
      let splitTimeFromDateAtOut = null

      if (result.created_at_out !== null) {
        dateFromDBAtOut = result.created_at_out
        splitTimeFromDateAtOut = dateFromDBAtOut.split("T")[0]
      }

      let onlyDay = parseInt(splitTimeFromDateAtIn.split("-")[2])
      let onLyMonth = parseInt(splitTimeFromDateAtIn.split("-")[1])
      let onlyYear = parseInt(splitTimeFromDateAtIn.split("-")[0])

      // let splitDayFromMonthAndYearAtOut = parseInt(splitTimeFromDateAtOut.split("-")[2])
      // let splitMonthFromDayAndYearAtOut = parseInt(splitTimeFromDateAtOut.split("-")[1])
      // let splitYearFromDayAndMonthAtOut = parseInt(splitTimeFromDateAtOut.split("-")[0])


      return {
        "day": onlyDay,
        "presence_status": presenceStatus,
        "year": onlyYear,
        "month": onLyMonth,
        "attendanceId": result.attendance_id
      }
    })

    axios.get(url).then((response) => {
      let datas = response.data.presence
      let totalHadir = datas.filter((items) => items.presence_status === "hadir").map((result) => {
        return result
      })
      let totalIzin = datas.filter((items) => items.presence_status === "izin").map((result) => {
        return result
      })
      let totalAlfa = datas.filter((items) => items.presence_status === "alfa").map((result) => {
        return result
      })

      dataPresence.forEach(items => {
        if (items.attendanceId === attendanceId) {
          if (items.year === localMonthAndYear.year && items.month === localMonthAndYear.month) {
            setContextPresenceCounter({
              "hadir": totalHadir.length,
              "izin": totalIzin.length,
              "alfa": totalAlfa.length
            })
          } else {
            console.log(localMonthAndYear.month)
            setContextPresenceCounter({
              "hadir": "belum ada data",
              "izin": "belum ada data",
              "alfa": "belum ada data"
            })
          }
        } else {
          setContextPresenceCounter({
            "hadir": "belum ada data",
            "izin": "belum ada data",
            "alfa": "belum ada data"
          })
        }
      })

      setContextPresenceCounterIsLoading(false)
    })
  }

  useEffect(() => {
    setTableDataIsLoading(true)
    const getListUserAttendace = () => {
      const url = API_URL().ATTENDANCE.LIST_OF_USER_ATTENDANCE
      axios.get(url).then((response) => {
        setAttendanceList(response.data)
        setTableDataIsLoading(false)
      })
    }

    getListUserAttendace()

  }, [])




  useEffect(() => {
    setLocalMonthAndYear({ "year": parseInt(year), "month": parseInt(month) + 1 })
    setContextPresenceCounter({})
    setContextUserFullNameOfTable("")
  }, [month, year])


  return (
    <div className='overflow-hidden mb-3 border add-item-shadow' style={{ borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px", backgroundColor: "Cornsilk" }}>
      <div style={{ height: "540px", overflow: `${!!tableDataIsLoading ? "hidden" : "auto"}` }}>
        <Table hover className='m-0 p-0' style={{ backgroundColor: "Cornsilk" }}>
          <thead className='text-light' style={{ backgroundColor: "DarkSlateGrey" }}>
            <tr>
              <td className='fw-bold text-align-center' style={{ backgroundColor: "DarkSlateGrey", position: "sticky", left: "0px", top: "0px", zIndex: "2", verticalAlign: "middle" }}>
                <p className='d-flex justify-content-center'>
                  <span className='h3 mx-5'> Nama</span>
                </p>
              </td>
              {createTableHeader(year, month)}
            </tr>
          </thead>
          <tbody >
            {attendanceList.map((resultOfAttendanceList, i) => {
              let fullname = `${resultOfAttendanceList.first_name} ${resultOfAttendanceList.last_name}`
              let presence = resultOfAttendanceList.presence
              return (
                <tr className='align-middle cursor-pointer' key={resultOfAttendanceList.id} onClick={() => { presenceCounter(resultOfAttendanceList.id, fullname, presence) }}>
                  <td className='text-light fw-bold ' style={{ height: "60px", position: "sticky", left: "0px", backgroundColor: "DarkSlateGrey" }}>
                    <p className='d-flex gap-3'>
                      <span>{i + 1}. </span>
                      <span> {fullname}</span>
                    </p>
                  </td>
                  {createTableData(presence = { presence })}
                </tr>
              )
            })
            }
          </tbody>
        </Table>
        {
          !!tableDataIsLoading
          &&
          <div className='mx-3'>
            <p className='bi bi-cloud-download text-muted m=0 p-0 text-center w-100'> Memuat daftar data absensi...</p>
            <ProgressBar className='my-3 p-0' variant='success' animated now={100} />
          </div>
        }
      </div>
    </div>
  )
}

export default AttendanceTable
