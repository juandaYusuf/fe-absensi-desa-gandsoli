import React from 'react'
import { Alert, Container } from 'react-bootstrap'
import { SlideLeft } from '../Page-transition/PageTransitions'
import ThemingCangerFunc from '../Theme'

const PorbiddenAccess = () => {
  return (
    <SlideLeft>
      <Container className={` ${ThemingCangerFunc().gradient} add-item-shadow rounded-4 p-4 overflow-hidden d-flex flex-column`} style={ThemingCangerFunc("white").style} >
        <div style={{ minHeight: "100vh" }}>
          <Alert className='rounded-4 border border-dark add-item-shadow' variant='danger'>
            <Alert.Heading className='fw-bold bi bi-exclamation-triangle'> Peringatan</Alert.Heading>
            <hr />
            <div className='w-100 d-flex justify-content-center'>
              <span className='bi bi-emoji-frown' style={{ fontSize: "5rem", textShadow: " 0px 7px 15px grey" }} />
            </div>
            <h6 className='fw-bold w-100 text-center text-uppercase' style={{ wordSpacing: '5px', textShadow: " 0px 7px 15px grey" }}>Maaf anda tidak memiliki akses terhadap halaman ini.</h6>
          </Alert>
        </div>
      </Container>
    </SlideLeft>

  )
}

export default PorbiddenAccess
