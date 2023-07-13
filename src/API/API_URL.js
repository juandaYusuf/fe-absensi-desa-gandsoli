const API_URL = (apiParam,apiParam2) => {
  return {
    USER: {
      LOGIN_STAF: 'http://127.0.0.1:8000/api/user/login',
      REGISTER_ADMIN_BY_KEPDES: "http://127.0.0.1:8000/api/user/register",
      POST_PROFILE_PICTURE: `http://localhost:8000/api/user/upload-profile-picture/${apiParam}`,
      GET_SINGLE_PROFILE_PICTURE: `http://127.0.0.1:8000/api/user/single/profile-picture/${apiParam}`,
      GET_MULTI_PROFILE_PICTURE: 'http://localhost:8000/api/user/multi/profile-picture/',
      DELETE_PROFILE_PICTURE: `http://localhost:8000/api/user/delete-profile-picture/${apiParam}`,
      GET_SINGLE_USER: `http://127.0.0.1:8000/api/user/single/user/${apiParam}`,
      GET_MULTI_USER: 'http://127.0.0.1:8000/api/user/multi/user',
      UPDATE_PROFILE: 'http://localhost:8000/api/user/edit-profile',
      CHECK_PASSWORD: 'http://127.0.0.1:8000/api/user/check-password',
      UPDATE_PASSWORD: 'http://127.0.0.1:8000/api/user/change-password',
      UPDATE_ROLE: 'http://127.0.0.1:8000/api/user/single/update-user-role',
      DELETE_USER: `http://127.0.0.1:8000/api/user/single/delete-user/${apiParam}`,
      USER_ROLES: 'http://127.0.0.1:8000/api/user-role/multi/role'
    },
    ATTENDANCE: {
      LIST_OF_USER_ATTENDANCE: 'http://127.0.0.1:8000/api/attendance/multi/user-presence-data',
      // USER_NOT_SCAN_IN: 'http://127.0.0.1:8000/api/attendance/multi/auto-set-user-as-alfa/',
      SINGLE_USER_ATTENDANCE_DETAIL: `http://127.0.0.1:8000/api/attendance/single/detail-presence/${apiParam}/${apiParam2}`,
      MULTI_USER_ATTENDANCE_DETAIL: `http://127.0.0.1:8000/api/attendance/multi/detail-presence/${apiParam}/${apiParam2}`,
    },
    ATTENDANCE_RULES : {
      SHOW_ALL_ATTENDANCE_RULES: 'http://127.0.0.1:8000/api/attendance_rule/show-all-attendance-rules',
      ADD_ALL_ATTENDANCE_RULES: 'http://127.0.0.1:8000/api/attendance_rule/add-attendance-rule',
      DELETE_ALL_ATTENDANCE_RULES: `http://127.0.0.1:8000/api/attendance_rule/delete-attendance-rules/${apiParam}`,
      UPDATE_USAGE_ATTENDANCE_RULES: 'http://127.0.0.1:8000/api/attendance_rule/usage-attendance-rules'
    },
    QRCODE : {
      SHOW_QRCODE_DATA_FOR_TODAY: `http://127.0.0.1:8000/api/qrcode/today-qrcode-data/${apiParam}`      
    },
    PRESENCE :{
      USER_SCANNING_IN : 'http://127.0.0.1:8000/api/scanning/user-scanning-in',
      USER_SCANNING_OUT : 'http://127.0.0.1:8000/api/scanning/user-scanning-out',
      USER_NOT_SACANNING_IN_AS_ALFA : 'http://127.0.0.1:8000/api/attendance/multi/auto-set-user-as-alfa/',
    },
    SCANNED_DETAIL : {
      DETAIL_OUT : 'http://127.0.0.1:8000/api/user-detail-scanned/scaned-out',
      DETAIL_IN : 'http://127.0.0.1:8000/api/user-detail-scanned/scaned-in',
      CLEARING_OLD_DATAS : 'http://127.0.0.1:8000/api/scanning/clearing-old-datas'
    },
    QR_SCANNER :{
      QRCODE_SCANNING_IN_DATA: `http://127.0.0.1:8000/api/qrcode/qrcode-data-scan-in/validator/${apiParam}` ,
      QRCODE_SCANNING_OUT_DATA: `http://127.0.0.1:8000/api/qrcode/qrcode-data-scan-out/validator/${apiParam}` 
    },
    PERSONAL_LEAVE : {
      ADD_SUBMISSION : 'http://127.0.0.1:8000/api/personal-leave/submission',
      GET_PERSONAL_LEAVE_DATAS : 'http://127.0.0.1:8000/api/personal-leave/show-all-personal-leave'
    },
    USER_PERMISSION : {
      ADD_SUBMISSION_PERMISSION : 'http://127.0.0.1:8000/api/user-permission/submission',
      GET_PERMISSION_DATAS : `http://127.0.0.1:8000/api/user-permission/show-all-user-permission/${apiParam}`,
    }
  }
}

export default API_URL
