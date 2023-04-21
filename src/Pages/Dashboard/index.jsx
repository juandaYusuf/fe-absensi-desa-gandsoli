import React from 'react'
import { ZoomOut } from '../../Page-transition/PageTransitions'
import DashboardContent from './Components/DashboardContent'

const Dashboard = () => {

    return (
        <ZoomOut>
            <DashboardContent />
        </ZoomOut>
    )
}


export default Dashboard