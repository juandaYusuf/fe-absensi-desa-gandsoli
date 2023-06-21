import React, { useContext, useEffect, useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import ModalPopUp from './ModalPopUp'
import API_URL from '../API/API_URL'
import axios from 'axios'
import UserContext from '../Context/Context'

const CardAttendanceRules = (props) => {


  const [isSwitchChecked, setIsSwitchChecked] = useState(props.usage)
  const [modalShow, setModalShow] = useState(false)
  const { setContextRefreshDraftList, contextRefreshDraftList } = useContext(UserContext)

  const turnOnAttendanceRules = (e, draft_id) => {
    const url = API_URL().ATTENDANCE_RULES.UPDATE_USAGE_ATTENDANCE_RULES
    const data = {
      "id": draft_id,
      "usage": e.target.checked
    }

    axios.put(url, data).then((response) => {
      if (response.data.messages === "attendance_rules has been updated") {
        setContextRefreshDraftList(!contextRefreshDraftList)
      }
    }).catch((e) => {
      alert("Gagal update, periksa koneksi")
    })
  }

  useEffect(() => {
    setIsSwitchChecked(props.usage)
  }, [props.usage])



  return (
    <>
      <div
        className={`border rounded-4 p-2 add-item-shadow ${!!isSwitchChecked ? "border-2 border-info" : "border-2"}`}
        style={{ height: "400px", marginLeft: "17px", width: "268px", backgroundColor: ` ${!!isSwitchChecked ? "rgba(39, 245, 245, 0.03)" : ""}` }} >
        <div className={`d-flex justify-content-between mb-2 border-bottom ${!!isSwitchChecked ? "border-2 border-info" : "border-2"}`}>
          {
            !!props.show_action
            &&
            <Form.Check
              type="switch"
              id="custom-switch"
              checked={isSwitchChecked}
              onChange={(e) => turnOnAttendanceRules(e, props.draft_id)} />
          }
          <h6 className='fw-bold w-100 text-center'>{props.title}</h6>
          {
            !!props.show_action
            &&
            <span
              className='bi bi-trash3 text-end cursor-pointer'
              style={{ width: "65px" }}
              onClick={() => { setModalShow(true) }} />
          }
        </div>
        <div className={`border-bottom pb-2 mb-2 ${!!isSwitchChecked ? "border-2 border-info" : "border-2"}`}>
          <table>
            <tbody>
              <tr>
                <td className='bi bi-clock-fill fw-bold'> Jam masuk</td>
                <td className='px-2'> :</td>
                <td> {props.work_start_time}</td>
              </tr>
              <tr>
                <td className='bi bi-clock fw-bold'> Jam keluar</td>
                <td className='px-2'> :</td>
                <td> {props.work_times_up}</td>
              </tr>
              <tr>
                <td className='bi bi-clock-history fw-bold'> Keterlambatan</td>
                <td className='px-2'> :</td>
                <td> {props.late_deadline} menit</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className='bi bi-journal-text  fw-bold p-0 m-0'> Deskripsi</p>
        <div style={{ height: "200px", overflowY: "auto", overflowX: "hidden" }}>
          <p className='p-0 mb-2'>{props.description}</p>
        </div>
        <div  className={`d-flex justify-content-between text-muted w-100 border-top pt-1 ${!!isSwitchChecked ? "border-2 border-info" : "border-2"}`}>
          <p className={`${ props.usage === true ?  "text-success bi bi-circle-fill fw-bold":"bi bi-circle-fill fw-bold"}`} style={{ fontSize: "0.8rem" }}> {props.usage === true ? "Aktif" : "Tidak aktif"} </p>
          <p style={{ fontSize: "0.8rem" }}>{props.created_at}
          </p>
        </div>
      </div>

      <ModalPopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        options="delete draft attdnc rules"
        draft_name={props.title}
        draft_id={props.draft_id}
      />
    </>
  )
}

export default CardAttendanceRules
