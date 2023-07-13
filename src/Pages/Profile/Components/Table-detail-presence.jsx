import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import API_URL from '../../../API/API_URL'
import ProgresBarLoadingVisual from '../../../Global-components/Progres-bar-loading-visual'

const TableDetailPresence = (props) => {

  const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  const [hadir, setHadir] = useState([])
  const [izin, setIzin] = useState([])
  const [alfa, setAlfa] = useState([])
  const [cuti, setCuti] = useState([])
  const [isPresenceDetailLoading, setIsPetpresenceDetailLoading] = useState(true)

  const getNameOfCurrenMonth = () => {
    const date = new Date()
    const option = { month: 'long' }
    return date.toLocaleString('id-ID', option)
  }


  const tableDataspresenceDetail = (options, monthRow) => {
    // presence datas
    const hadirDatas = hadir.map((result, i) => result.month === monthRow && (<td key={i} style={{ borderLeft: "solid 1px lightgrey" }}>{result.total}</td>))
    const izinDatas = izin.map((result, i) => result.month === monthRow && (<td key={i} style={{ borderLeft: "solid 1px lightgrey" }}>{result.total}</td>))
    const alfaDatas = alfa.map((result, i) => result.month === monthRow && (<td key={i} style={{ borderLeft: "solid 1px lightgrey" }}>{result.total}</td>))
    const cutiDatas = cuti.map((result, i) => result.month === monthRow && (<td key={i} style={{ borderLeft: "solid 1px lightgrey" }}>{result.total}</td>))

    // efective works
    const efectiveWork = hadir.map((result, i) => result.month === monthRow && (<td key={i} style={{ borderLeft: "solid 1px lightgrey" }}>{result.efective_work} hari</td>))

    // percentage
    const hadirPercentageDatas = hadir.map((result, i) => result.month === monthRow && (<td key={i} style={{ width: "50px", borderLeft: "solid 1px lightgrey", borderRight: "solid 1px lightgrey" }}>{result.percentage.toFixed(1)} %</td>))
    const izinPercentageDatas = izin.map((result, i) => result.month === monthRow && (<td key={i} style={{ width: "50px", borderLeft: "solid 1px lightgrey", borderRight: "solid 1px lightgrey" }}>{result.percentage.toFixed(1)}  %</td>))
    const alfaPercentageDatas = alfa.map((result, i) => result.month === monthRow && (<td key={i} style={{ width: "50px", borderLeft: "solid 1px lightgrey", borderRight: "solid 1px lightgrey" }}>{result.percentage.toFixed(1)}  %</td>))
    const cutiPercentageDatas = cuti.map((result, i) => result.month === monthRow && (<td key={i} style={{ width: "50px", borderLeft: "solid 1px lightgrey", borderRight: "solid 1px lightgrey" }}>{result.percentage.toFixed(1)}  %</td>))


    if (options === "hadir") {
      return hadirDatas
    } else if (options === "izin") {
      return izinDatas
    } else if (options === "alfa") {
      return alfaDatas
    } else if (options === "cuti") {
      return cutiDatas
    }

    if (options === "efective-work") {
      return efectiveWork
    }

    if (options === "hadir-percentage") {
      return hadirPercentageDatas
    } else if (options === "izin-percentage") {
      return izinPercentageDatas
    } else if (options === "alfa-percentage") {
      return alfaPercentageDatas
    } else if (options === "cuti-percentage") {
      return cutiPercentageDatas
    }

  }


  const tableBodyOfMonth = () => {
    const tableDatas = month.map((result, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td style={{ borderLeft: "solid 1px lightgrey" }}>{result}</td>
          {
            tableDataspresenceDetail("hadir", result)
          }
          {
            tableDataspresenceDetail("izin", result)
          }
          {
            tableDataspresenceDetail("alfa", result)
          }
          {
            tableDataspresenceDetail("cuti", result)
          }
          {
            tableDataspresenceDetail("efective-work", result)
          }
          <td className='p-0'>
            <Table borderless className='m-0'>
              <tbody className='m-0'>
                <tr >
                  {
                    tableDataspresenceDetail("hadir-percentage", result)
                  }
                  {
                    tableDataspresenceDetail("izin-percentage", result)
                  }
                  {
                    tableDataspresenceDetail("alfa-percentage", result)
                  }
                  {
                    tableDataspresenceDetail("cuti-percentage", result)
                  }
                </tr>
              </tbody>
            </Table>
          </td>
        </tr>
      )
    })

    return tableDatas

  }

  useEffect(() => {
    setIsPetpresenceDetailLoading(true)
    const url = API_URL(props.user_id, props.year).ATTENDANCE.SINGLE_USER_ATTENDANCE_DETAIL
    axios.get(url).then((response) => {
      setTimeout(() => {
        setIsPetpresenceDetailLoading(false)
      }, 500);
      setHadir(response.data.hadir)
      setIzin(response.data.izin)
      setAlfa(response.data.alfa)
      setCuti(response.data.cuti)
    })
  }, [props.year])





  return (
    <div style={{height: "573px"}}>
      <Table hover={!isPresenceDetailLoading} className='m-0' >
        <thead>
          <tr>
            <th className='text-center' style={{ verticalAlign: "middle", backgroundColor: "MistyRose" }}>No</th>
            <th className='text-center' style={{ verticalAlign: "middle", borderLeft: "solid 1px lightgrey", backgroundColor: "MistyRose" }}><span className='bi bi-calendar2-month' />  Bulan </th>
            <th className='text-center' style={{ verticalAlign: "middle", borderLeft: "solid 1px lightgrey", backgroundColor: "LightGreen" }}><span className='bi bi-check-circle-fill text-success' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /> Hadir </th>
            <th className='text-center' style={{ verticalAlign: "middle", borderLeft: "solid 1px lightgrey", backgroundColor: "#FFFF66" }}><span className='bi bi-arrow-up-left-circle-fill text-warning' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /> Izin</th>
            <th className='text-center' style={{ verticalAlign: "middle", borderLeft: "solid 1px lightgrey", backgroundColor: "#ff8a75" }}><span className='bi bi-x-circle-fill text-danger' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /> Alfa</th>
            <th className='text-center' style={{ verticalAlign: "middle", borderLeft: "solid 1px lightgrey", backgroundColor: "LightGreen" }}><span className='bi bi-door-open-fill text-success' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /> Cuti </th>
            <th className='text-center px-0' style={{ verticalAlign: "middle", borderLeft: "solid 1px lightgrey", backgroundColor: "MistyRose" }}><span className='bi bi-plus-slash-minus' /> Efektif kerja</th>
            <th className='text-center p-0 pt-2' style={{ borderLeft: "solid 1px lightgrey", backgroundColor: "MistyRose" }}><span className='bi bi-percent' />
              Persentase
              <Table borderless className='m-0 mt-2'>
                <thead>
                  <tr>
                    <th className='px-0' style={{ width: "50px", backgroundColor: "LightGreen" }}><span className='bi bi-check-circle-fill text-success' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /> </th>
                    <th className='px-0' style={{ width: "50px", borderLeft: "solid 1px lightgrey", borderRight: "solid 1px lightgrey", backgroundColor: "#FFFF66" }}><span className='bi bi-arrow-up-left-circle-fill text-warning' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /></th>
                    <th className='px-0' style={{ width: "50px", backgroundColor: "#ff8a75" }}> <span className='bi bi-x-circle-fill text-danger' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /></th>
                    <th className='px-0' style={{ width: "50px", backgroundColor: "LightGreen" }}> <span className='bi bi-door-open-fill text-success' style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }} /></th>
                  </tr>
                </thead>
              </Table>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            !!isPresenceDetailLoading
              ?
              <tr>
                <td colSpan={11} className='py-5' style={{border: "solid 0px"}}>
                  <ProgresBarLoadingVisual theme={"danger"} titleTxt={"Memuat data presensi..."} />
                </td>
              </tr>
              :
              tableBodyOfMonth()
          }
        </tbody>
      </Table>
    </div>
  )
}

export default TableDetailPresence
