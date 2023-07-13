import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import API_URL from '../API/API_URL'
import axios from 'axios'
import ProgresBarLoadingVisual from '../Global-components/Progres-bar-loading-visual'
import UserContext from '../Context/Context'
import {ZoomOut} from '../Page-transition/PageTransitions'
import {LeftToRight, TopToBottom} from '../Page-transition/ComponentTransitions'



const TableUserPresenceHistory = ({ year, month }) => {

  const [userDatas, setUserDatas] = useState([])
  const [isPresenceLoading, setIsPresenceLoading] = useState(true)
  const {setContextPresenceCounter} = useContext(UserContext)

  let valueOfDay = []


  //  Jumlah hari dalam bulan tertentu
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Nama-nama hari -ID
  const getDayName = (year, month, day) => {
    const date = new Date(year, month, day)
    const options = { weekday: "long" }
    return date.toLocaleDateString("id-ID", options)
  }

  const createTableHeader = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month)
    const dateAndDay = []

    for (let day = 1; day <= daysInMonth; day++) {
      const dayName = getDayName(year, month, day)
      valueOfDay.push(day.toString())
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


  const showTotalPresence = (full_name,total_hadir, total_izin, total_alfa, total_cuti) => {
    setContextPresenceCounter({
      full_name,
      total_hadir,
      total_izin,
      total_alfa,
      total_cuti
    })
  }



  useEffect(() => {
    setIsPresenceLoading(true)
    const url = API_URL(year, 1 + month).ATTENDANCE.MULTI_USER_ATTENDANCE_DETAIL

    axios.get(url).then((response) => {
      if (response.data) {
        setUserDatas(response.data)
        setTimeout(() => {
          setIsPresenceLoading(false)
        }, 500)
      }
    })
  }, [year, month])


  return (
    <div className='overflow-hidden mb-3 border add-item-shadow' style={{ borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px", backgroundColor: "Cornsilk" }}>
      <div style={{ height: "540px", overflow: !!isPresenceLoading ? "hidden" :"auto" }}>
        <Table hover={!isPresenceLoading} className='m-0 p-0' style={{ backgroundColor: "Cornsilk" }}>
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
            {

              !!isPresenceLoading
                ?
                <tr>
                  <td colSpan={9} className='ps-5 overflow-hidden py-5'> <TopToBottom><ProgresBarLoadingVisual /></TopToBottom> </td>
                </tr>
                :
                userDatas.map((user_result, i) => {
                  return (
                    <tr key={i} className='align-middle cursor-pointer' onClick={() => showTotalPresence(user_result.full_name,user_result.total_hadir, user_result.total_izin, user_result.total_alfa, user_result.total_cuti)}>
                      <td className='text-light fw-bold overflow-hidden' style={{ height: "60px", position: "sticky", left: "0px", backgroundColor: "DarkSlateGrey" }}>
                        <LeftToRight>
                          <p className='d-flex gap-3'>
                            <span>{i + 1}. </span>
                            <span>{user_result.full_name}</span>
                          </p>
                        </LeftToRight>
                      </td>
                      {
                        valueOfDay.map((valueOfDay_result, i) => {
                          return (
                            <td key={i} className='text-center border'>
                              {
                                user_result.presence.map((presence_result) => {
                                  let icons = ""
                                  if (presence_result.status === "hadir") {
                                    icons = "bi bi-check-circle-fill text-success fs-4"
                                  } else if (presence_result.status === "izin") {
                                    icons = "bi bi-arrow-up-left-circle-fill text-warning fs-4"
                                  } else if (presence_result.status === "alfa") {
                                    icons = "bi bi-x-circle-fill text-danger fs-4"
                                  } else if (presence_result.status === "cuti") {
                                    icons = " bi bi-door-open-fill text-success fs-4"
                                  }
                                  return (
                                    presence_result.date === parseInt(valueOfDay_result) && presence_result.month === 1 + month && presence_result.year === parseInt(year)
                                    &&
                                    (<ZoomOut >
                                      <span key={i} className={icons} style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} />
                                    </ZoomOut>)
                                  )
                                })
                              }
                            </td>
                          )
                        })
                      }
                    </tr>
                  )
                })
            }
          </tbody>
        </Table>
      </div>
    </div >
  )
}

export default TableUserPresenceHistory
