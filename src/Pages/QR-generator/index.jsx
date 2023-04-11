import React from 'react'
import Generator from './Components/Generator'
import { Container } from 'react-bootstrap'
import { SlideLeft } from '../../Page-transition/PageTransitions'

const QRCodeGenerator = () => {
    return (
        <SlideLeft>
            <Container className='add-box-shadow p-3 bg-light rounded-4'>
                <Generator />
            </Container>
        </SlideLeft>
    )
}

export default QRCodeGenerator

