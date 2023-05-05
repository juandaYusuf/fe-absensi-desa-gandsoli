import React, { useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { TopToBottom } from '../../../Page-transition/ComponentTransitions'
import DashboardHeader from './DashboardHeader'
import PresentStatistic from './PresentStatistic'
import TablePresentHistory from './TablePresentHistory'

const DashboardContent = () => {

	const [stafName, setStafName] = useState("")

	return (
		<Container className='bg-transparent rounded-4 p-0'>
			<DashboardHeader />
			<div className='dashboard-content-container'>
				<div className='w-100'>
					<TopToBottom>
						<Card className='bg-custom-gradient-color add-item-shadow p-3 rounded-4 mt-3 d-flex justify-content-center w-100' style={{ borderTop: "solid 2px white", borderBottom: "solid 1px lightgrey", borderLeft: "solid 2px whitesmoke", borderRight: "solid 2px whitesmoke" }}>
							<h3 className='fw-bold'>Absensi <span className='bi bi-caret-right-fill' />  {stafName}</h3>
						</Card>
					</TopToBottom>
					<br />
					<TablePresentHistory name={setStafName} />
				</div>
				<PresentStatistic />
			</div>
		</Container>
	)
}

export default DashboardContent