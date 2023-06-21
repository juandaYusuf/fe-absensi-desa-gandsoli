import React from 'react'
import { ProgressBar } from 'react-bootstrap'

const ProgresBarLoadingVisual = ({ theme, progresValue }) => {

  let variant = 'primary'
  let progres = 100


  if (theme === 'primary' || theme === 'success' || theme === 'secondary' || theme === 'info' || theme === 'danger') {
    variant = theme
  }


  if (progresValue > 0) {
    progres = progresValue
  }

  return (
    <div className={`${`mx-3 p-0 add-item-shadow-${variant}`}`}>
      <p className='bi bi-cloud-download text-muted m=0 p-0 text-center w-100'> Memuat data pengguna...</p>
      <ProgressBar className='m-0 p-0' variant={variant} animated now={progres} />
    </div>
  )
}

export default ProgresBarLoadingVisual
