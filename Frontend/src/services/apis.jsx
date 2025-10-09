const BASE_URL = "http://localhost:8000/api/v1";

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

const COMPLAINT_ENDENTS = {
    // Assuming your base route is mounted at /api/v1 and the controller is /complaints/my-complaints
    GET_MY_COMPLAINTS_API: BASE_URL + "/complaints/my-complaints",
};

// PROFILE ENDPOINTS
export const PROFILE_API = {
  GET_PROFILE: BASE_URL + "/profile/get-profile",
  UPDATE: BASE_URL + "/profile/update-profile",
};

// export const PROFILE_API = {
//   GET_DETAILS: "/api/v1/profile/get-details", // optional, if you have one
// };