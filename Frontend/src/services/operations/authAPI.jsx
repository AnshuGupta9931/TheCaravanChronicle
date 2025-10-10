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

// NOTE: Assuming you have a constant for the Staff account type, 
// for example, ACCOUNT_TYPE.STAFF. I'll use the string "Staff" for now, 
// but you should replace it with your constant.

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    staffId,        // staff ID from form
    staffCategory,  // ✅ ADD THIS PARAMETER
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            // ✅ Build clean payload with correct values
            const payload = {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                ...(staffId && { staffId }),
                ...(staffCategory && { staffCategory }), // ✅ Add this line
            };

            console.log("SIGNUP PAYLOAD SENT:", payload); // Debug log

            const response = await apiConnector("POST", SIGNUP_API, payload);

            console.log("SIGNUP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            if (accountType === "Staff") {
                toast.success("Staff Account Created! Awaiting Admin Approval.");
            } else {
                toast.success("Signup Successful");
            }

            if (typeof navigate === "function") {
                navigate("/login");
            }

        } catch (error) {
            console.log("SIGNUP API ERROR............", error);
            toast.error(error?.response?.data?.message || "Signup Failed");

            if (typeof navigate === "function") {
                navigate("/signup");
            }
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
      const response = await apiConnector("POST", LOGIN_API, { email, password });

      console.log("🔐 LOGIN API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");

      // ✅ Extract user + token from server
      const serverUser = response.data.user;
      const token = response.data.token;

      if (!serverUser || !token) {
        throw new Error("Invalid server response — user or token missing");
      }

      // ✅ Normalize / flatten user object
      const normalizedUser = {
        _id: serverUser._id,
        email: serverUser.email,
        firstName: serverUser.firstName || "",
        lastName: serverUser.lastName || "",
        contactNumber: serverUser.contactNumber || "",
        role: serverUser.accountType?.toLowerCase(),
        accountType: serverUser.accountType, // ✅ ensure always present
        image:
          serverUser.image ||
          `https://api.dicebear.com/5.x/initials/svg?seed=${serverUser.firstName} ${serverUser.lastName}`,
      };

      console.log("✅ Normalized User:", normalizedUser);

      // ✅ Save to Redux
      dispatch(setToken(token));
      dispatch(setUser(normalizedUser));

      // ✅ Save to localStorage (for persistence)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(normalizedUser));

      // ✅ Role-based navigation
      const role = normalizedUser.accountType?.toLowerCase();
      console.log(role);
      if (role === "citizen") {
        console.log("🌍 Redirecting to Citizen Dashboard");
        navigate("/dashboard");
      } else if (role === "staff") {
        console.log("🧰 Redirecting to Staff Dashboard");
        navigate("/staff");
      } else if (role === "admin") {
        console.log("🛠 Redirecting to Admin Dashboard");
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("❌ LOGIN API ERROR:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
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