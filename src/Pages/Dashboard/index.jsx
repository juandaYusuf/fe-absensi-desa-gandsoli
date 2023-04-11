import React from 'react'
import { ZoomOut } from '../../Page-transition/PageTransitions'
// import tabletIcon from '../../Assets/Icon/tablet.png'
import DashboardContent from './Components/DashboardContent'


const Dashboard = () => {
    return (
        <ZoomOut>
            <DashboardContent />
        </ZoomOut>
    )
}


export default Dashboard