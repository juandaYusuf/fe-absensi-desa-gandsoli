const API_URL = (apiParam) => {
  return {
    USER: {
      LOGIN_STAF: "http://127.0.0.1:8000/api/user/login",
      REGISTER_ADMIN_BY_KEPDES: "http://127.0.0.1:8000/api/user/register",
      POST_PROFILE_PICTURE: `http://localhost:8000/api/user/upload-profile-picture/${apiParam}`,
      GET_SINGLE_PROFILE_PICTURE: `http://127.0.0.1:8000/api/user/single/profile-picture/${apiParam}`,
      GET_MULTI_PROFILE_PICTURE: 'http://localhost:8000/api/user/multi/profile-picture/',
      DELETE_PROFILE_PICTURE: `http://localhost:8000/api/user/delete-profile-picture/${apiParam}`,
      GET_SINGLE_USER: `http://127.0.0.1:8000/api/user/single/user/${apiParam}`,
      GET_MULTI_USER: "http://127.0.0.1:8000/api/user/multi/user",
      UPDATE_PROFILE: "http://localhost:8000/api/user/edit-profile",
      CHECK_PASSWORD: "http://127.0.0.1:8000/api/user/check-password",
      UPDATE_PASSWORD: "http://127.0.0.1:8000/api/user/change-password",
      UPDATE_ROLE: "http://127.0.0.1:8000/api/user/single/update-user-role",
      DELETE_USER: `http://127.0.0.1:8000/api/user/single/delete-user/${apiParam}`
    },
    ATTENDANCE: {
      LIST_OF_USER_ATTENDANCE: 'http://127.0.0.1:8000/api/attendance/multi/user-presence-data',
      SINGLE_USER_ATTENDANCE: `http://127.0.0.1:8000/api/attendance/single/user-presence-data/${apiParam}`
    },
    ATTENDANCE_RULES : {
      SHOW_ALL_ATTENDANCE_RULES: "http://127.0.0.1:8000/api/attendance_rule/show-all-attendance-rules",
      ADD_ALL_ATTENDANCE_RULES: "http://127.0.0.1:8000/api/attendance_rule/add-attendance-rule",
      DELETE_ALL_ATTENDANCE_RULES: `http://127.0.0.1:8000/api/attendance_rule/delete-attendance-rules/${apiParam}`,
      UPDATE_USAGE_ATTENDANCE_RULES: "http://127.0.0.1:8000/api/attendance_rule/usage-attendance-rules"
    }
  }
}

export default API_URL
