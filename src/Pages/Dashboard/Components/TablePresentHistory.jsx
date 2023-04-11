import React from 'react'
import { Table } from 'react-bootstrap';
import { BottomToTop, LeftToRight } from '../../../Page-transition/ComponentTransitions';


const TablePresentHistory = () => {
    return (
        <>
            <LeftToRight>
                <h2 className='text-secondary'>Riwayat Absensi</h2>
            </LeftToRight>
            <BottomToTop>
                <div className='add-item-shadow overflow-scroll rounded-4 p-3' style={{ backgroundColor: "beige", border: "solid 2px lightgrey" }}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Hadir</th>
                                <th>Izin</th>
                                <th>Alpha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>@twitter</td>
                                <td>@twitter</td>
                                <td>@twitter</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </BottomToTop>
        </>
    )
}

export default TablePresentHistory