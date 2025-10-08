import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import StyledWrapper from "./FormStyles";

//
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../../services/operations/authAPI.jsx";
import { useNavigate } from "react-router-dom";
import { RxCountdownTimer } from "react-icons/rx";

export const VerifyEmail = () => {
  // const location = useLocation();
  // const email = location.state?.email || "your email"; // Get email from ResetPassword

  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);

  // const handleVerify = () => {
  //   alert(`Verifying OTP: ${otp} for ${email}`);
  // };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      // Only allow access of this route when user has filled the signup form
      if (!signupData) {
        navigate("/signup");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  

  const handleVerifyAndSignup = (e) => {
    e.preventDefault(); 

    const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    } = signupData;
      
    dispatch(
        signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
        )
    );
  }


  return (
    <StyledWrapper>
      <div className="card">
        <div className="card2">
          <div className="form">
            <p id="heading">Verify Email</p>
            <p className="message">A verification code has been sent to you. Enter the code below.</p>

            {/* OTP Input Fields */}
            <form onSubmit={handleVerifyAndSignup}>

              <div className="otp-container">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: "50px",
                    height: "50px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "center",
                    backgroundColor: "#1a1a1a",
                    color: "#fff",
                    border: "1px solid #ffc107",
                    borderRadius: "5px",
                    margin: "0 5px",
                  }}
                  focusStyle={{ border: "2px solid #ffc107" }}
                />
              </div>

              {/* Verify Button */}
              <div className="btn">
                <button type="submit" className="button1">
                  Verify Email
                </button>
              </div>

            </form>

            {/* Back to Signup */}
            <p className="signin">
              ← <Link to="/signup">Back to Signup</Link>
            </p>

            {/* Resend Button */}
            <button
                className="flex items-center text-blue-100 gap-x-2"
                onClick={() => dispatch(sendOtp(signupData.email, navigate))}
            >
                <RxCountdownTimer />
                Resend it
            </button>

          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};
