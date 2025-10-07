import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice.jsx"
import { apiConnector } from "../apiconnector.jsx"
import { endpoints } from "../apis.jsx"
import { setUser } from "../../slices/profileSlice.jsx"
import { useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", SENDOTP_API,{
                email, 
                checkUserPresent: true,
            })

            console.log("SENDOTP API RESPONSE......", response);

            console.log(response.data.success);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        }
        catch(error){
            console.log("SENDOTP API ERROR............", error)
            if (error.response?.status === 401) {
                toast.error("User already registered. Try logging in.");
            } else {
                toast.error("Failed to send OTP");
            }
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


// import { toast } from "react-hot-toast";
// import { apiConnector } from "../utils/apiConnector";
// import { SIGNUP_API } from "../apis";
// import { setLoading } from "../slices/authSlice";

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
  
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        });
  
        console.log("SIGNUP API RESPONSE............", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Signup Successful");
  
        // ✅ Safe call to navigate
        if (typeof navigate === "function") {
          navigate("/login");
        } else {
          console.warn("Navigate is not a function");
        }
        navigate("/login");
      } catch (error) {
        console.log("SIGNUP API ERROR............", error);
        toast.error(error?.response?.data?.message || "Signup Failed");
  
        if (typeof navigate === "function") {
          navigate("/signup");
        } else {
          console.warn("Navigate is not a function");
        }
        navigate("/signup")
      }
  
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
}  

  export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Logging in...");
      dispatch(setLoading(true));
  
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        });
  
        console.log("LOGIN API RESPONSE.....", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Login Successful");
  
        const serverUser = response.data.user;
  
        // Safely construct user object
        const userImage = serverUser?.image
          ? serverUser.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${serverUser.firstName} ${serverUser.lastName}`;
  
        const flattenedUser = {
          _id: serverUser._id,
          email: serverUser.email,
          accountType: serverUser.accountType,
          firstName: serverUser.firstName || "",
          lastName: serverUser.lastName || "",
          image: userImage,
        };
  
        // Save to Redux
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
  
        // Save to localStorage
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        navigate("/dashboard");
      } catch (error) {
        console.log("LOGIN API ERROR............", error);
        const errorMessage =
          error.response?.data?.message || error.message || "Login Failed";
        toast.error(errorMessage);
      }
  
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  }
  
export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
}

export function getPasswordResetToken(email, sentEmailSent){
    return async(dispatch) => {
        dispatch(setLoading(true));

        try{
          const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})
    
          console.log("RESET PASSWORD TOKEN RESPONSE....", response);
    
          if(!response.data.success) {
            throw new Error(response.data.message);
          }
    
          toast.success("Reset Email Sent");
          setEmailSent(true);
        }
        catch(error) {
          console.log("RESET PASSWORD TOKEN Error", error);
          toast.error("Failed to send email for resetting password");
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token, navigate) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});
  
        console.log("RESET Password RESPONSE ... ", response);
  
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Password has been reset successfully");
        navigate("/login"); // Navigate after successful reset
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Unable to reset password");
      }
      dispatch(setLoading(false));
    }
}