const API_URL = (apiParam,apiParam2) => {
  const baseUrl = 'https://bedesagandasoli-1-j0924938.deta.app/'
  return {
    USER: {
      LOGIN_STAF: `${baseUrl}/api/user/login`,
      REGISTER_ADMIN_BY_KEPDES: `${baseUrl}/api/user/register`,
      POST_PROFILE_PICTURE: `${baseUrl}/api/user/upload-profile-picture/${apiParam}`,
      GET_SINGLE_PROFILE_PICTURE: `${baseUrl}/api/user/single/profile-picture/${apiParam}`,
      GET_MULTI_PROFILE_PICTURE: `${baseUrl}/api/user/multi/profile-picture/`,
      DELETE_PROFILE_PICTURE: `${baseUrl}/api/user/delete-profile-picture/${apiParam}`,
      GET_SINGLE_USER: `${baseUrl}/api/user/single/user/${apiParam}`,
      GET_MULTI_USER: `${baseUrl}/api/user/multi/user`,
      UPDATE_PROFILE: `${baseUrl}/api/user/edit-profile`,
      CHECK_PASSWORD: `${baseUrl}/api/user/check-password`,
      UPDATE_PASSWORD: `${baseUrl}/api/user/change-password`,
      UPDATE_ROLE: `${baseUrl}/api/user/single/update-user-role`,
      DELETE_USER: `${baseUrl}/api/user/single/delete-user/${apiParam}`,
      USER_ROLES: `${baseUrl}/api/user-role/multi/role`
    },
    ATTENDANCE: {
      LIST_OF_USER_ATTENDANCE: `${baseUrl}/api/attendance/multi/user-presence-data`,
      // USER_NOT_SCAN_IN: 'http://127.0.0.1:8000/api/attendance/multi/auto-set-user-as-alfa/',
      SINGLE_USER_ATTENDANCE_DETAIL: `${baseUrl}/api/attendance/single/detail-presence/${apiParam}/${apiParam2}`,
      MULTI_USER_ATTENDANCE_DETAIL: `${baseUrl}/api/attendance/multi/detail-presence/${apiParam}/${apiParam2}`,
    },
    ATTENDANCE_RULES : {
      SHOW_ALL_ATTENDANCE_RULES: `${baseUrl}/api/attendance_rule/show-all-attendance-rules`,
      ADD_ALL_ATTENDANCE_RULES: `${baseUrl}/api/attendance_rule/add-attendance-rule`,
      DELETE_ALL_ATTENDANCE_RULES: `${baseUrl}/api/attendance_rule/delete-attendance-rules/${apiParam}`,
      UPDATE_USAGE_ATTENDANCE_RULES: `${baseUrl}/api/attendance_rule/usage-attendance-rules`
    },
    QRCODE : {
      SHOW_QRCODE_DATA_FOR_TODAY: `${baseUrl}/api/qrcode/today-qrcode-data/${apiParam}`      
    },
    PRESENCE :{
      USER_SCANNING_IN : `${baseUrl}/api/scanning/user-scanning-in`,
      USER_SCANNING_OUT : `${baseUrl}/api/scanning/user-scanning-out`,
      USER_NOT_SACANNING_IN_AS_ALFA : `${baseUrl}/api/attendance/multi/auto-set-user-as-alfa/`,
    },
    SCANNED_DETAIL : {
      DETAIL_OUT : `${baseUrl}/api/user-detail-scanned/scaned-out`,
      DETAIL_IN : `${baseUrl}/api/user-detail-scanned/scaned-in`,
      CLEARING_OLD_DATAS : `${baseUrl}/api/scanning/clearing-old-datas`
    },
    QR_SCANNER :{
      QRCODE_SCANNING_IN_DATA: `${baseUrl}/api/qrcode/qrcode-data-scan-in/validator/${apiParam}` ,
      QRCODE_SCANNING_OUT_DATA: `${baseUrl}/api/qrcode/qrcode-data-scan-out/validator/${apiParam}` 
    },
    PERSONAL_LEAVE : {
      ADD_SUBMISSION : `${baseUrl}/api/personal-leave/submission`,
      GET_PERSONAL_LEAVE_DATAS : `${baseUrl}/api/personal-leave/show-all-personal-leave`
    },
    USER_PERMISSION : {
      ADD_SUBMISSION_PERMISSION : `${baseUrl}/api/user-permission/submission`,
      GET_PERMISSION_DATAS : `${baseUrl}/api/user-permission/show-all-user-permission/${apiParam}`,
    }
  }
}

export default API_URL
