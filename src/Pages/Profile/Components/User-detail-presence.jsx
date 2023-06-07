import axios from 'axios'
import React, { useEffect, useState } from 'react'
import API_URL from '../../../API/API_URL'
import { Col, Container, Form, InputGroup, ProgressBar, Row, Table } from 'react-bootstrap'

const UserDetailPresence = (props) => {

  const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  const currentUserIdFromVisitor = JSON.parse(localStorage.getItem('visit'))
  const [userDetail, setUserDetail] = useState({})
  const [presenceData, setPresenceData] = useState({})
  const [isRekapitulasiLoading, setIsRekapitulasiLoading] = useState(true)
  // const [effectiveWorkPerMonth, setEffectiveWorkPerMonth] = useState({})
  const yearOptions = []
  const currentYear = new Date().getFullYear()
  const [valueOfYear, setValueOfYear] = useState(currentYear)
  const [presenceCounterResult, setPresenceCounterResult] = useState({})

  const yearOptionValue = (yearsAhead, yearsBehind) => {

    for (let year = currentYear - yearsBehind; year <= currentYear + yearsAhead; year++) {
      yearOptions.push(
        <option key={year} value={year}>
          {year} {year === currentYear && "📌"}
        </option>
      )
    }

    return yearOptions
  }


  const getNameOfCurrenMonth = () => {
    const date = new Date()
    const option = { month: 'long' }
    return date.toLocaleString('id-ID', option)
  }


  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }


  const getDayName = (year, month, day) => {
    const date = new Date(year, month, day)
    const options = { weekday: "long" }
    return date.toLocaleDateString("id-ID", options)
  }


  const EffectiveWorkingDaysPerMonthCounter = () => {
    let dayInMonth = []
    //!=========================================================================================
    //! Variable hasil kalkulasi efektifi kerja dalan sebulan
    let efectiveWorkOfJanuari = 0
    let efectiveWorkOfFebruary = 0
    let efectiveWorkOfMaret = 0
    let efectiveWorkOfApril = 0
    let efectiveWorkOfMei = 0
    let efectiveWorkOfJuni = 0
    let efectiveWorkOfJuli = 0
    let efectiveWorkOfAgustus = 0
    let efectiveWorkOfSeptember = 0
    let efectiveWorkOfOktober = 0
    let efectiveWorkOfNovember = 0
    let efectiveWorkOfDesember = 0
    //!=========================================================================================



    //!=========================================================================================
    //!  Variable untuk validasi hari sabtu dan minggu
    //! artinya sabtu dan minggu tidak dihitung dalam hari efektif kerja dalam 1 bulan
    let saturdayOfJanuari = 0
    let sundayOfJanuari = 0

    let saturdayOfFebruari = 0
    let sundayOfFebruari = 0

    let saturdayOfMaret = 0
    let sundayOfMaret = 0

    let saturdayOfApril = 0
    let sundayOfApril = 0

    let saturdayOfMei = 0
    let sundayOfMei = 0

    let saturdayOfJuni = 0
    let sundayOfJuni = 0

    let saturdayOfJuli = 0
    let sundayOfJuli = 0

    let saturdayOfAgustus = 0
    let sundayOfAgustus = 0

    let saturdayOfSeptember = 0
    let sundayOfSeptember = 0

    let saturdayOfOktober = 0
    let sundayOfOktober = 0

    let saturdayOfNovember = 0
    let sundayOfNovember = 0

    let saturdayOfDesember = 0
    let sundayOfDesember = 0
    //!=========================================================================================

    //! Loop jumlah bulan dalam satu tahun
    month.forEach((items, i) => {
      let dayNamesPerMonth = []
      for (let day = 1; day <= getDaysInMonth(valueOfYear, i); day++) {
        dayNamesPerMonth.push(getDayName(valueOfYear, i, day))
      }
      dayInMonth.push({
        "month": items,
        "day_total": getDaysInMonth(valueOfYear, i),
        "days_name": dayNamesPerMonth
      })
    })

    //! Htung efektifitas kerja perbulan
    dayInMonth.forEach((itemsOfDayInMonth, i) => {
      if (itemsOfDayInMonth.month === month[i]) {
        itemsOfDayInMonth.days_name.forEach(itemsOfDaysName => {

          //!==================================================================================
          //! Memvalidasi setiap hari minngu dan sabtu pada setiap bulan
          if (itemsOfDayInMonth.month === "Januari") {
            if (itemsOfDaysName === "Sabtu") {
              saturdayOfJanuari += 1
            }
            if (itemsOfDaysName === "Minggu") {
              sundayOfJanuari += 1
            }
          }


          if (itemsOfDayInMonth.month === "Februari") {
            if (itemsOfDaysName === "Sabtu") {
              saturdayOfFebruari += 1
            }
            if (itemsOfDaysName === "Minggu") {
              sundayOfFebruari += 1
            }
          }


          if (itemsOfDayInMonth.month === "Maret") {
            if (itemsOfDaysName === "Sabtu") {
              saturdayOfMaret += 1
            }
            if (itemsOfDaysName === "Minggu") {
              sundayOfMaret += 1
            }
          }


          if (itemsOfDayInMonth.month === "April") {
            if (itemsOfDaysName === "Sabtu") {
              saturdayOfApril += 1
            }
            if (itemsOfDaysName === "Minggu") {
              sundayOfApril += 1
            }
          }


          if (itemsOfDayInMonth.month === "Mei") {
            if (itemsOfDaysName === "Sabtu") {
              saturdayOfMei += 1
            }
            if (itemsOfDaysName === "Minggu") {
              sundayOfMei += 1
            }
          }


          if (itemsOfDayInMonth.month === "Juni") {
            if (itemsOfDaysName === "Sabtu") {
              saturdayOfJuni += 1
            }
            if (itemsOfDaysName === "Minggu") {
              sundayOfJuni += 1
            }
          }


          if (itemsOfDayInMonth.month === "Juli") {
            if (itemsOfDaysName === "Sabtu") {
              saturdayOfJuli += 1
            }
            if (itemsOfDaysName === "Minggu") {
              sundayOfJuli += 1
            }
          }


          if (itemsOfDayInMonth.month === "Agustus") {
            if (itemsOfDaysName === "Sabtu") {
              saturdayOfAgustus += 1
            }
            if (itemsOfDaysName === "Minggu") {
              sundayOfAgustus += 1
            }
          }


          if (itemsOfDayInMonth.month === "September") {
            if (itemsOfDaysName === "Sabtu") {
              saturdayOfSeptember += 1
            }
            if (itemsOfDaysName === "Minggu") {
              sundayOfSeptember += 1
            }
          }


          if (itemsOfDayInMonth.month === "Oktober") {
            if (itemsOfDaysName === "Sabtu") {
              saturdayOfOktober += 1
            }
            if (itemsOfDaysName === "Minggu") {
              sundayOfOktober += 1
            }
          }


          if (itemsOfDayInMonth.month === "November") {
            if (itemsOfDaysName === "Sabtu") {
              saturdayOfNovember += 1
            }
            if (itemsOfDaysName === "Minggu") {
              sundayOfNovember += 1
            }
          }


          if (itemsOfDayInMonth.month === "Desember") {
            if (itemsOfDaysName === "Sabtu") {
              saturdayOfDesember += 1
            }
            if (itemsOfDaysName === "Minggu") {
              sundayOfDesember += 1
            }
          }
          //!====================================================================================

        })
      }


      //!=========================================================================================
      // ! Validasi bulan dan
      // ! Menghitung efektif kerja pada setiap bulannya
      if (itemsOfDayInMonth.month === "Januari") {
        efectiveWorkOfJanuari = itemsOfDayInMonth.day_total - (saturdayOfJanuari + sundayOfJanuari)
      }

      if (itemsOfDayInMonth.month === "Februari") {
        efectiveWorkOfFebruary = itemsOfDayInMonth.day_total - (saturdayOfFebruari + sundayOfFebruari)
      }

      if (itemsOfDayInMonth.month === "Maret") {
        efectiveWorkOfMaret = itemsOfDayInMonth.day_total - (saturdayOfMaret + sundayOfMaret)
      }

      if (itemsOfDayInMonth.month === "April") {
        efectiveWorkOfApril = itemsOfDayInMonth.day_total - (saturdayOfApril + sundayOfApril)
      }

      if (itemsOfDayInMonth.month === "Mei") {
        efectiveWorkOfMei = itemsOfDayInMonth.day_total - (saturdayOfMei + sundayOfMei)
      }

      if (itemsOfDayInMonth.month === "Juni") {
        efectiveWorkOfJuni = itemsOfDayInMonth.day_total - (saturdayOfJuni + sundayOfJuni)
      }

      if (itemsOfDayInMonth.month === "Juli") {
        efectiveWorkOfJuli = itemsOfDayInMonth.day_total - (saturdayOfJuli + sundayOfJuli)
      }

      if (itemsOfDayInMonth.month === "Agustus") {
        efectiveWorkOfAgustus = itemsOfDayInMonth.day_total - (saturdayOfAgustus + sundayOfAgustus)
      }

      if (itemsOfDayInMonth.month === "September") {
        efectiveWorkOfSeptember = itemsOfDayInMonth.day_total - (saturdayOfSeptember + sundayOfSeptember)
      }

      if (itemsOfDayInMonth.month === "Oktober") {
        efectiveWorkOfOktober = itemsOfDayInMonth.day_total - (saturdayOfOktober + sundayOfOktober)
      }

      if (itemsOfDayInMonth.month === "November") {
        efectiveWorkOfNovember = itemsOfDayInMonth.day_total - (saturdayOfNovember + sundayOfNovember)
      }

      if (itemsOfDayInMonth.month === "Desember") {
        efectiveWorkOfDesember = itemsOfDayInMonth.day_total - (saturdayOfDesember + sundayOfDesember)
      }
      //!=========================================================================================

    })


    return [
      {
        "month": "Januari",
        "efective_work": efectiveWorkOfJanuari
      },
      {
        "month": "Februari",
        "efective_work": efectiveWorkOfFebruary
      },
      {
        "month": "Maret",
        "efective_work": efectiveWorkOfMaret
      },
      {
        "month": "April",
        "efective_work": efectiveWorkOfApril
      },
      {
        "month": "Mei",
        "efective_work": efectiveWorkOfMei
      },
      {
        "month": "Juni",
        "efective_work": efectiveWorkOfJuni
      },
      {
        "month": "Juli",
        "efective_work": efectiveWorkOfJuli
      },
      {
        "month": "Agustus",
        "efective_work": efectiveWorkOfAgustus
      },
      {
        "month": "September",
        "efective_work": efectiveWorkOfSeptember
      },
      {
        "month": "Oktober",
        "efective_work": efectiveWorkOfOktober
      },
      {
        "month": "November",
        "efective_work": efectiveWorkOfNovember
      },
      {
        "month": "Desember",
        "efective_work": efectiveWorkOfDesember
      }
    ]


  }

  const tableBodyOfMonth = () => {
    let createTableBodyOfMonth = month.map((resultMonth, i) => {
      let no = i + 1
      let efectiveWorking = EffectiveWorkingDaysPerMonthCounter(valueOfYear)
      return (
        <tr key={no}>
          <td style={{ backgroundColor: `${getNameOfCurrenMonth() === resultMonth ? "Moccasin" : ""}` }}>{no} {getNameOfCurrenMonth() === resultMonth && <span className="text-muted bi bi-pin-angle" />}</td>
          <td style={{ borderLeft: "solid 1px lightgrey", backgroundColor: `${getNameOfCurrenMonth() === resultMonth ? "Moccasin" : ""}` }}>{resultMonth}</td>
          <td style={{ borderLeft: "solid 1px lightgrey", backgroundColor: `${getNameOfCurrenMonth() === resultMonth ? "Moccasin" : ""}` }}>{month[presenceData.month_created_at - 1] === resultMonth && presenceData.year_created_at === parseInt(valueOfYear)? presenceData.hadir : "-"}</td>
          <td style={{ borderLeft: "solid 1px lightgrey", backgroundColor: `${getNameOfCurrenMonth() === resultMonth ? "Moccasin" : ""}` }}>{month[presenceData.month_created_at - 1] === resultMonth && presenceData.year_created_at === parseInt(valueOfYear)? presenceData.izin : "-"}</td>
          <td style={{ borderLeft: "solid 1px lightgrey", backgroundColor: `${getNameOfCurrenMonth() === resultMonth ? "Moccasin" : ""}` }}>{month[presenceData.month_created_at - 1] === resultMonth && presenceData.year_created_at === parseInt(valueOfYear)? presenceData.alfa : "-"}</td>
          <td style={{ borderLeft: "solid 1px lightgrey", borderRight: "solid 1px lightgrey", backgroundColor: `${getNameOfCurrenMonth() === resultMonth ? "Moccasin" : ""}` }}>
            {
              efectiveWorking.map((resultOfEfectiveWorking) => {
                return (
                  resultMonth === resultOfEfectiveWorking.month
                  &&
                  (<span key={no}> {resultOfEfectiveWorking.efective_work} hari</span>)
                )
              })
            }
          </td>
          <td className='p-0' style={{ borderLeft: "solid 1px lightgrey", backgroundColor: `${getNameOfCurrenMonth() === resultMonth ? "Moccasin" : ""}` }}>
            <Table borderless className='m-0'>
              <tbody className='m-0'>
                <tr >
                  <td style={{ width: "50px", }}>
                    {
                      month[presenceData.month_created_at - 1] === resultMonth && presenceData.year_created_at === parseInt(valueOfYear)
                        ?
                        efectiveWorking.map((resultOfEfectiveWorkingForPersentage) => {
                          return (
                            resultMonth === resultOfEfectiveWorkingForPersentage.month
                            &&
                            <span key={no}>{parseInt(presenceCounterResult.hadir / resultOfEfectiveWorkingForPersentage.efective_work * 100)} %</span>
                          )
                        })
                        :
                        <span> - </span>
                    }
                  </td>
                  <td style={{ width: "50px", borderLeft: "solid 1px lightgrey", borderRight: "solid 1px lightgrey" }}>
                    {
                      month[presenceData.month_created_at - 1] === resultMonth && presenceData.year_created_at === parseInt(valueOfYear)
                        ?
                        efectiveWorking.map((resultOfEfectiveWorkingForPersentage) => {
                          return (
                            resultMonth === resultOfEfectiveWorkingForPersentage.month
                            &&
                            <span key={no}>{parseInt(presenceCounterResult.izin / resultOfEfectiveWorkingForPersentage.efective_work * 100)} %</span>
                          )
                        })
                        :
                        <span key={no}> - </span>
                    }
                  </td>
                  <td style={{ width: "50px", }}>
                    {
                      month[presenceData.month_created_at - 1] === resultMonth && presenceData.year_created_at === parseInt(valueOfYear)
                        ?
                        efectiveWorking.map((resultOfEfectiveWorkingForPersentage) => {
                          return (
                            resultMonth === resultOfEfectiveWorkingForPersentage.month
                            &&
                            <span key={no}>{parseInt(presenceCounterResult.alfa / resultOfEfectiveWorkingForPersentage.efective_work * 100)} %</span>
                          )
                        })
                        :
                        <span> - </span>
                    }
                  </td>
                </tr>
              </tbody>
            </Table>
          </td>
        </tr>
      )
    })

    return createTableBodyOfMonth
  }




  useEffect(() => {

    const getUserDetail = () => {
      const url = API_URL(currentUserIdFromVisitor.id).USER.GET_SINGLE_USER
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

    const getAttendanceData = () => {

      const url = API_URL(currentUserIdFromVisitor.id).ATTENDANCE.SINGLE_USER_ATTENDANCE

      axios.get(url).then((response) => {
        let hadir = []
        let izin = []
        let alfa = []

        let splitDayFromMonthAndYearAtIn = null
        let splitYearFromDayAndMonthAtIn = null
        let splitDayFromMonthAndYearAtOut = null

        let monthHasBeenSplit = null
        let yearHasBeenSplit = null
        let hourInHasBeenSplit = null
        let hourOutHasBeenSplit = null

        response.data.presence.forEach((items) => {

          const dateFromDBAtIn = items.created_at_in
          const dateFromDBAtOut = items.created_at_out
          const presenceStatus = items.presence_status
          const splitTimeFromDateAtIn = dateFromDBAtIn.split("T")[0]
          const splitTimeFromDate = dateFromDBAtOut.split("T")[0]
          const timePartsIn = dateFromDBAtIn.split("T")[1].split(":")
          const timePartsOut = dateFromDBAtOut.split("T")[1].split(":")

          splitDayFromMonthAndYearAtOut = parseInt(splitTimeFromDate.split("-")[2])
          splitYearFromDayAndMonthAtIn = parseInt(splitTimeFromDateAtIn.split("-")[0])
          splitDayFromMonthAndYearAtIn = parseInt(splitTimeFromDateAtIn.split("-")[2])


          monthHasBeenSplit = parseInt(splitTimeFromDate.split("-")[1])
          yearHasBeenSplit = parseInt(splitTimeFromDate.split("-")[0])

          hourInHasBeenSplit = parseInt(timePartsIn[0])
          hourOutHasBeenSplit = parseInt(timePartsOut[0])

          if (presenceStatus === "hadir") {
            hadir.push(items)
          }
          if (presenceStatus === "izin") {
            izin.push(items)
          }
          if (presenceStatus === "alfa") {
            alfa.push(items)
          }
        })

        setPresenceData({
          "hadir": hadir.length,
          "izin": izin.length,
          "alfa": alfa.length,
          "hours_created_at_in": hourInHasBeenSplit,
          "hours_created_at_out": hourOutHasBeenSplit,
          "month_created_at": monthHasBeenSplit,
          "year_created_at": yearHasBeenSplit
        })
      })
    }

    const presenceCounter = () => {
      const url = API_URL(currentUserIdFromVisitor.id).ATTENDANCE.SINGLE_USER_ATTENDANCE
      axios.get(url).then((response) => {
        let datas = response.data.presence
        let totalHadir = datas.filter((items) => items.presence_status === "hadir").map((result) => {
          return result.length
        })
        let totalIzin = datas.filter((items) => items.presence_status === "izin").map((result) => {
          return result.length
        })
        let totalAlfa = datas.filter((items) => items.presence_status === "alfa").map((result) => {
          return result.length
        })
        setPresenceCounterResult({
          "hadir": totalHadir.length,
          "izin": totalIzin.length,
          "alfa": totalAlfa.length,
        })
      })
    }

    setTimeout(() => {
      setIsRekapitulasiLoading(false)
    }, 2000)

    presenceCounter()
    getAttendanceData()
    getUserDetail()
  }, [])



  return (
    <Container className="p-0 m-0">
      {
        props.current_user === "visitor"
        &&
        <div className='mb-4 rounded-4 w-100 border add-item-shadow py-1' style={{ backgroundColor: "GhostWhite" }}>
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

      <div className='mb-4 rounded-4 w-100 border add-item-shadow py-1' style={{ backgroundColor: "GhostWhite" }}>
        <Container>
          <Row>
            <Col className='mx-2 my-1 rounded-4 d-flex align-items-center border tex-center justify-content-center' style={{ height: "50px", backgroundColor: "HoneyDew" }}>
              <InputGroup className='overflow-hidden p-1 mx-1' style={{ width: "300px", paddingRight: "4px" }}>
                <InputGroup.Text style={{ borderRadius: '15px 0px 0px 15px' }}><span className='bi bi-calendar-month h5 m-0 p-0' /> </InputGroup.Text>
                <Form.Select style={{ borderRadius: '0px 15px 15px 0px', backgroundColor: "cornsilk" }} aria-label="Default select example" onChange={((e) => { setValueOfYear(e.target.value) })}>
                  <option value={currentYear}>Tahun</option>
                  {yearOptionValue(2, 2)}
                </Form.Select>
              </InputGroup>
              <div className='d-flex  w-100 p-0 m-0'>
                <div className='d-flex justify-content-end' style={{ width: "46%" }}>
                  <p className="bi bi-calendar2-week px-2 h4 m-0 p-0" />
                  <p className="fw-bold h4 m-0 p-0 "> KEHADIRAN </p>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className='mx-2 my-1 rounded-4 overflow-hidden border p-0' style={{ backgroundColor: "Ivory" }}>
              <div className='overflow-auto'>
                <Table hover={isRekapitulasiLoading === false ? true : false} className='m-0'>
                  <thead>
                    <tr>
                      <th className='text-center' style={{ verticalAlign: "middle", backgroundColor: "MistyRose" }}>No</th>
                      <th className='text-center' style={{ verticalAlign: "middle", borderLeft: "solid 1px lightgrey", backgroundColor: "MistyRose" }}><span className='bi bi-calendar2-month' />  Bulan </th>
                      <th className='text-center' style={{ verticalAlign: "middle", borderLeft: "solid 1px lightgrey", backgroundColor: "LightGreen" }}><span className='bi bi-check-circle-fill text-success' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /> Hadir </th>
                      <th className='text-center' style={{ verticalAlign: "middle", borderLeft: "solid 1px lightgrey", backgroundColor: "#FFFF66" }}><span className='bi bi-arrow-up-left-circle-fill text-warning' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /> Izin</th>
                      <th className='text-center' style={{ verticalAlign: "middle", borderLeft: "solid 1px lightgrey", backgroundColor: "#ff8a75" }}><span className='bi bi-x-circle-fill text-danger' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /> Alfa</th>
                      <th className='text-center px-0' style={{ verticalAlign: "middle", borderLeft: "solid 1px lightgrey", backgroundColor: "MistyRose" }}><span className='bi bi-plus-slash-minus' /> Efektif kerja</th>
                      <th className='text-center p-0 pt-2' style={{ borderLeft: "solid 1px lightgrey", backgroundColor: "MistyRose" }}><span className='bi bi-percent' />
                        Persentase
                        <Table borderless className='m-0 mt-2'>
                          <thead>
                            <tr>
                              <th className='px-0' style={{ width: "50px", backgroundColor: "LightGreen" }}><span className='bi bi-check-circle-fill text-success' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /> </th>
                              <th className='px-0' style={{ width: "50px", borderLeft: "solid 1px lightgrey", borderRight: "solid 1px lightgrey", backgroundColor: "#FFFF66" }}><span className='bi bi-arrow-up-left-circle-fill text-warning' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /></th>
                              <th className='px-0' style={{ width: "50px", backgroundColor: "#ff8a75" }}> <span className='bi bi-x-circle-fill text-danger' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /></th>
                            </tr>
                          </thead>
                        </Table>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      isRekapitulasiLoading === false
                        ?
                        tableBodyOfMonth()
                        :
                        <tr>
                          <td colSpan={7} style={{ height: "563px", padding: "20px" }}>
                            <p className='bi bi-cloud-download text-muted m=0 p-0 text-center w-100'> Memuat daftar data absensi...</p>
                            <ProgressBar className='my-3 p-0' variant='success' animated now={100} />
                          </td>
                        </tr>
                    }
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  )
}

export default UserDetailPresence
