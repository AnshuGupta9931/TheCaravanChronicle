import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { RxCountdownTimer } from "react-icons/rx";
import { sendOtp, signUp } from "../../services/operations/authAPI.jsx";
import StyledWrapper from "./FormStyles";

export const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Redirect to signup if no data
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();

    if (!signupData) {
      console.error("Signup data missing.");
      navigate("/signup");
      return;
    }

    // ✅ Destructure everything including staffCategory
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      staffId,
      staffCategory, // <-- Fixed
    } = signupData;

    console.log("VERIFYING SIGNUP PAYLOAD:", {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      staffId,
      staffCategory,
    });

    // ✅ Dispatch signup API call
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        staffId,
        staffCategory,
        navigate
      )
    );
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card2">
          <div className="form">
            <p id="heading">Verify Email</p>
            <p className="message">
              A verification code has been sent to your email. Enter the code below.
            </p>

            <form onSubmit={handleVerifyAndSignup}>
              <div className="otp-container">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  isInputNum
                  shouldAutoFocus
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

              <div className="btn mt-4">
                <button type="submit" className="button1" disabled={loading}>
                  {loading ? "Verifying..." : "Verify Email"}
                </button>
              </div>
            </form>

            <p className="signin mt-4">
              ← <Link to="/signup">Back to Signup</Link>
            </p>

            <button
              className="flex items-center text-blue-100 gap-x-2 mt-2"
              onClick={() =>
                signupData?.email && dispatch(sendOtp(signupData.email, navigate))
              }
              disabled={loading}
            >
              <RxCountdownTimer /> Resend it
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default VerifyEmail;
