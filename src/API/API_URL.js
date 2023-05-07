const API_URL = (apiParam) => {
  return {
    USER: {
      LOGIN_STAF: "http://127.0.0.1:8000/login",
      REGISTER_ADMIN_BY_KEPDES: "http://127.0.0.1:8000/register",
      POST_PROFILE_PICTURE: "http://127.0.0.1:8000/upload-profile-image/",
      GET_PROFILE_PICTURE: `http://127.0.0.1:8000/profile-picture/${apiParam}`,
      GET_USER_DETAIL: `http://127.0.0.1:8000/user-detail/${apiParam}`
    },
    ABSEN: {

    }
  }
}

export default API_URL
