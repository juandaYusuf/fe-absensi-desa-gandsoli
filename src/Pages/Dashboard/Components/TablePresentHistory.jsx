import React, { useState } from 'react'
import { Card, Table } from 'react-bootstrap';
import { BottomToTop } from '../../../Page-transition/ComponentTransitions';

const TablePresentHistory = (props) => {

  // const [hadir, setHadir] = useState(false)
  // const [izin, setIzin] = useState(false)
  // const [alfa, setAlfa] = useState(false)
  const [nameSelected, setNameSelected] = useState("")

  const presentingUserData = [
    {
      "id": 1,
      "name": "Ahmad dzikril",
      "presenting": "alfa"
    },
    {
      "id": 2,
      "name": "Dzikri ahmad",
      "presenting": "hadir"
    },
    {
      "id": 3,
      "name": "Abenk Skatepunk",
      "presenting": "izin"
    },
    {
      "id": 4,
      "name": "Carli",
      "presenting": "hadir"
    },
    {
      "id": 5,
      "name": "Hilman",
      "presenting": "alfa"
    },
    {
      "id": 6,
      "name": "Dadang",
      "presenting": "hadir"
    },
    {
      "id": 7,
      "name": "Borokokok",
      "presenting": "alfa"
    },
    {
      "id": 8,
      "name": "Beben",
      "presenting": "izin"
    },
    {
      "id": 9,
      "name": "Bayu",
      "presenting": "alfa"
    }
  ]

  const rowOnClickHandler = (result) => {
    props.name(result)
    setNameSelected(result)
  }

  return (
    <>
      <Card className='bg-custom-gradient-color add-item-shadow overflow-scroll hide-scrollbar rounded-4 p-0' style={{ border: "solid 1px lightgrey", height: "570px", borderTop: "solid 2px white", borderBottom: "solid 1px lightgrey", borderLeft: "solid 2px whitesmoke", borderRight: "solid 2px whitesmoke" }}>
        <h3 className='m-3'>Riwayat Absensi</h3>
        <Table hover style={{ width: "850px", margin: "10px" }}>
          <thead >
            <tr >
              <th className='text-light border-end border-2' style={{ width: "40px", backgroundColor: "Teal" }} >No</th>
              <th className='text-light border-end border-2' style={{ width: "100px", backgroundColor: "Teal" }}>Tanggal</th>
              <th className='text-light border-end border-2' style={{ backgroundColor: "Teal" }}>Nama</th>
              <th className='text-center text-light border-end border-2' style={{ width: "75px", backgroundColor: "Teal" }}>Hadir</th>
              <th className='text-center text-light border-end border-2' style={{ width: "75px", backgroundColor: "Teal" }}>Izin</th>
              <th className='text-center text-light' style={{ width: "75px", backgroundColor: "Teal" }}>Alpha</th>
            </tr>
          </thead>
          <tbody>
            {
              presentingUserData.map((result, i) => {
                return (
                  <tr key={i} className={`cursor-pointer ${result.name === nameSelected && ("bg-light fw-bold ")}`} onClick={() => { rowOnClickHandler(result.name) }}>
                    <td className='text-center border-end border-2'>{i + 1}</td>
                    <td className='border-end border-2'>02-des-23</td>
                    <td className='border-end border-2'>{result.name}</td>
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