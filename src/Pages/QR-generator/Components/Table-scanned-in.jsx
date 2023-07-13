import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import API_URL from '../../../API/API_URL'

const TableScannedIn = (props) => {

  const [scannedOutDetail, setScannedOutDetail] = useState([])


  useEffect(() => {
    const getScannedOutDetail = () => {
      const url = API_URL().SCANNED_DETAIL.DETAIL_IN
      axios.get(url).then(( response ) => {
        setScannedOutDetail(response.data.detail_scan_in)
      })
    }
    getScannedOutDetail()
  }, [props.refresh_table])



  return (
    <Table hover style={{ border: "solid 0px transparent" }}>
      <thead>
        <tr>
          <th className='text-muted'>No</th>
          <th className='text-muted'>Foto</th>
          <th className='text-muted'>Nama</th>
          <th className='text-muted'>Jam masuk</th>
          <th className='text-muted' style={{ width: "200px" }}>Keterangan</th>
        </tr>
      </thead>
      <tbody>
        {
          scannedOutDetail.map((result, i) => {
            return (<tr key={i}>
              <td className='align-middle'>{i + 1}</td>
              <td className='align-middle'>
                {
                  !!result.profile_picture
                    ?
                    (<img
                      src={'data:image/jpeg;base64,' + result.profile_picture}
                      className='rounded-circle border bg-secondary'
                      style={{ height: "40px", width: "40px", objectFit: "cover" }} />)
                    :
                    (<div className='border d-flex justify-content-center rounded-circle align-item-end' style={{ height: "40px", width: "40px", backgroundColor: "#E9E9E9" }} >
                      <span className='bi bi-person-fill m-0 p-0 text-secondary' style={{ fontSize: "1.8rem" }} />
                    </div>)
                }
              </td>
              <td className='align-middle'> {result.first_name} {result.last_name} </td>
              <td className='align-middle'> {result.created_at} </td>
              <td className='align-middle'>{result.descriptions}</td>
            </tr>)
          })
        }
      </tbody>
    </Table>
  )
}

export default TableScannedIn
