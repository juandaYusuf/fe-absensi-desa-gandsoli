import React, { useState } from 'react'
import { Table } from 'react-bootstrap';
import { BottomToTop, LeftToRight, TopToBottom } from '../../../Page-transition/ComponentTransitions';


const TablePresentHistory = (props) => {


    const [rowOnClick, setRowOnClick] = useState("")

    const rowOnClickHandler = (result) => {
        props.name(result)
        setRowOnClick("bg-secondary text-light")
    }


    return (
        <>
            <LeftToRight>
            </LeftToRight>
            <BottomToTop>
                <div className='add-item-shadow overflow-scroll rounded-4 p-2' style={{ backgroundColor: "beige", border: "solid 2px lightgrey", maxHeight: "265px" }}>
                        <h4>Riwayat Absensi</h4>
                        <Table className='table-hover' style={{ width: "850px" }}>
                            <thead >
                                <tr >
                                    <th className='bg-secondary text-light' style={{ width: "40px", borderRadius: '10px 0px 0px 0px' }} >No</th>
                                    <th className='bg-secondary text-light' style={{ width: "100px" }}>Tanggal</th>
                                    <th className='bg-secondary text-light'>Nama</th>
                                    <th className='bg-secondary text-center text-light' style={{ width: "40px" }}>Hadir</th>
                                    <th className='bg-secondary text-center text-light' style={{ width: "40px" }}>Izin</th>
                                    <th className='bg-secondary text-center text-light' style={{ width: "40px", borderRadius: '0px 10px 0px 0px' }}>Alpha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ["Ahmad dzikril", "Dzikri ahmad", "Abenk Skatepunk", "Carli", "Hilman", "Dadang", "Borokokok", "Beben", "Ijal", "Yudi"].map((result, i) => {
                                        return (
                                            <tr key={i} className={`cursor-pointer`} onClick={() => { rowOnClickHandler(result) }}>
                                                    <td className='text-center'>{i + 1}</td>
                                                    <td>02-des-23</td>
                                                    <td>{result}</td>
                                                    <td className='fw-bold text-center text-success h4'> <span className='bi bi-check-circle-fill' /></td>
                                                    <td className='fw-bold text-center text-warning h4' > <span className='bi bi-arrow-up-left-circle-fill' /></td>
                                                    <td className='fw-bold text-center text-danger h4'> <span className='bi bi-x-circle-fill' /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                </div>
            </BottomToTop>
        </>
    )
}

export default TablePresentHistory