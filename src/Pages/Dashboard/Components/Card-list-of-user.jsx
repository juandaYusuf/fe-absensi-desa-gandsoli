import React, { useContext, useEffect, useState } from 'react'
import { Card, ProgressBar, } from 'react-bootstrap'
import ThemingCangerFunc from '../../../Theme'
import axios from 'axios'
import API_URL from '../../../API/API_URL'
import { useNavigate } from 'react-router-dom'




const CardListOfUser = () => {

  const [listOfUser, setListOfUser] = useState([])
  const navigateTo = useNavigate()



  const visitStafProfileByAdmin = (userID) => {
    localStorage.setItem('visit', JSON.stringify({ "id":  userID}))
    navigateTo('/profile')
  }


  useEffect(() => {
    const getListOfUser = () => {
      const url = API_URL().USER.GET_MULTI_USER
      axios.get(url).then((response) => {
        if (!response.data.length !== 0) {
          setListOfUser(response.data)
        }
      })
    }
    getListOfUser()
  }, [])

  return (
    <div>
      <Card className={`${ThemingCangerFunc().gradient} add-item-shadow overflow-hidden rounded-4 mt-3 d-flex align-items-center`} style={ThemingCangerFunc("light").style}>
        <h3 className='p-2 w-100  border-bottom m-0' style={{ backdropFilter: "blur(20px)" }}> Daftar staf</h3>
        <div className=' py-3 w-100' style={{ overflow: "auto" }}>
          <div className='px-3' style={{ width: "100%", height: "200px" }}>
            {
              !!listOfUser.length
                ?
                (listOfUser.map((resultListOfUser) => {
                  return (
                    <div key={resultListOfUser.id} className='cursor-pointer w-100 mb-3 p-2 rounded-4 d-flex align-items-center justify-content-between gap-2 hover-card-list'  onClick={() => {visitStafProfileByAdmin(resultListOfUser.id)}} >
                      <div className='d-flex align-items-center gap-2'>
                        <div className='bg-light border border-2 border-secodary border-secondary overflow-hidden rounded-circle d-flex justify-content-center align-items-center' style={{ height: "40px", width: "40px" }}>
                          {
                            !!resultListOfUser.profile_picture
                              ?
                              (<img className='w-100 h-100' src={'data:image/jpeg;base64,' + resultListOfUser.profile_picture} style={{ objectFit: "cover" }} alt=" " />)
                              :
                              (<span className='bi bi-person-fill m-0 p-0 text-secondary' style={{ fontSize: "1.5rem" }} />)
                          }
                        </div>
                        <span className='fw-bold text-capitalize'>{resultListOfUser.first_name} {resultListOfUser.last_name}</span>
                      </div>
                      <span className='text-end fw-light m-0 p-0'>{resultListOfUser.role}</span>
                    </div>
                  )
                }))
                :
                (<>
                  <p className='bi bi-cloud-download text-muted text-center'> Memuat daftar pengguna...</p>
                  <ProgressBar className='my-2' variant='success' animated now={100} />
                </>)
            }
            <br />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CardListOfUser
