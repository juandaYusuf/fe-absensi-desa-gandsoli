const API_URL = (apiParam, apiParam2) => {
  // const baseUrl = 'http://127.0.0.1:8000'
  // const baseUrl = 'https://bedesagandasoli-1-j0924938.deta.app'


  
  // VPS idcloudhost
  const baseUrl = 'https://siaga23.biz.id'

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
      USER_ROLES: `${baseUrl}/api/user-role/multi/role`,
      UPDATE_USER_SIGNATURE: `${baseUrl}/api/user/single/update-signature`
    },
    ATTENDANCE: {
      LIST_OF_USER_ATTENDANCE: `${baseUrl}/api/attendance/multi/user-presence-data`,
      // USER_NOT_SCAN_IN: 'http://127.0.0.1:8000/api/attendance/multi/auto-set-user-as-alfa/',
      SINGLE_USER_ATTENDANCE_DETAIL: `${baseUrl}/api/attendance/single/detail-presence/${apiParam}/${apiParam2}`,
      MULTI_USER_ATTENDANCE_DETAIL: `${baseUrl}/api/attendance/multi/detail-presence/${apiParam}/${apiParam2}`,
    },
    ATTENDANCE_RULES: {
      SHOW_ALL_ATTENDANCE_RULES: `${baseUrl}/api/attendance_rule/show-all-attendance-rules`,
      ADD_ALL_ATTENDANCE_RULES: `${baseUrl}/api/attendance_rule/add-attendance-rule`,
      DELETE_ALL_ATTENDANCE_RULES: `${baseUrl}/api/attendance_rule/delete-attendance-rules/${apiParam}`,
      UPDATE_USAGE_ATTENDANCE_RULES: `${baseUrl}/api/attendance_rule/usage-attendance-rules`
    },
    QRCODE: {
      SHOW_QRCODE_DATA_FOR_TODAY: `${baseUrl}/api/qrcode/today-qrcode-data/${apiParam}`
    },
    PRESENCE: {
      USER_SCANNING_IN: `${baseUrl}/api/scanning/user-scanning-in`,
      USER_SCANNING_OUT: `${baseUrl}/api/scanning/user-scanning-out`,
      USER_NOT_SACANNING_IN_AS_ALFA: `${baseUrl}/api/attendance/multi/auto-set-user-as-alfa/`,
    },
    SCANNED_DETAIL: {
      DETAIL_OUT: `${baseUrl}/api/user-detail-scanned/scaned-out`,
      DETAIL_IN: `${baseUrl}/api/user-detail-scanned/scaned-in`,
      CLEARING_OLD_DATAS: `${baseUrl}/api/scanning/clearing-old-datas`
    },
    QR_SCANNER: {
      QRCODE_SCANNING_IN_DATA: `${baseUrl}/api/qrcode/qrcode-data-scan-in/validator/${apiParam}`,
      QRCODE_SCANNING_OUT_DATA: `${baseUrl}/api/qrcode/qrcode-data-scan-out/validator/${apiParam}`
    },
    PERSONAL_LEAVE: {
      ADD_SUBMISSION: `${baseUrl}/api/personal-leave/submission`,
      GET_PERSONAL_LEAVE_DATAS: `${baseUrl}/api/personal-leave/single/show-personal-leave/${apiParam}`,
      GET_PERSONAL_LEAVE_APPLY_DOC: `${baseUrl}/api/personal-leave/single/apply-docs/${apiParam}/${apiParam2}`,
      GET_ALL_PERSONAL_LEAVE_DATAS: `${baseUrl}/api/personal-leave/multi/personal-leave`,
      PERSONAL_LEAVE_APPROVING: `${baseUrl}/api/personal-leave/agreement/personal-leave`,
      GET_PERSONAL_LEAVE_DOC: `${baseUrl}/api/user-permission/single/approvment-loading/${apiParam}/${apiParam2}`,
    },
    USER_PERMISSION: {
      ADD_SUBMISSION_PERMISSION: `${baseUrl}/api/user-permission/submission`,
      GET_PERMISSION_DATAS: `${baseUrl}/api/user-permission/show-all-user-permission/${apiParam}`,
      PERMISSION_AGREEMENT: `${baseUrl}/api/user-permission/agreement/`,
      GET_SINGLE_DATA: `${baseUrl}/api/user-permission/single/user-permission/${apiParam}/${apiParam2}`,
      GET_SINGLE_DATA_LIST: `${baseUrl}/api/user-permission/single/user-permission-list/${apiParam}`,
      PERMISSION_APPROVING: `${baseUrl}/api/user-permission/agreement/`,
      GET_DOCS: `${baseUrl}/api/user-permission/single/doc/${apiParam}/${apiParam2}`,
    },
    USER_ROLE: {
      SHOW_USER_ROLES: `${baseUrl}/api/user-role/show-all-user-role`
    },
    USER_VERIFICATIONS: {
      VERIFY_CODE: `${baseUrl}/api/verifications/single/user-verification-code/`
    },
    FOR_USER_SICK : {
      SHOW_ALL_USER : `${baseUrl}/api/attendance/presence/multi/user/`,
      UPDATE_USER_SICK : `${baseUrl}/api/attendance/presence/sick-user/`,
      UPDATE_USER_SICK_PROOF : `${baseUrl}/api/attendance/presence/sick-user/sick-proof/${apiParam}`
    }
  }
}

export default API_URL
