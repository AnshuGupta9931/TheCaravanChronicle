import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../services/operations/authAPI.jsx";
import { setSignupData } from "../../slices/authSlice.jsx";
import { ACCOUNT_TYPE } from "../../utils/constants.jsx";
import { toast } from "react-hot-toast";
import { Tab } from "../common/Tab.jsx";
import signuppage from "../../assets/images/signuppage.png";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.CITIZEN);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    staffId: "",
    staffCategory: "", // ✅ Add this line
  });

  const { firstName, lastName, email, password, confirmPassword, staffId, staffCategory } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validation for staff-specific fields
    if (accountType === ACCOUNT_TYPE.STAFF) {
      if (!staffId) {
        toast.error("Staff ID is required for Staff accounts");
        return;
      }
      if (!staffCategory) {
        toast.error("Please select a staff category");
        return;
      }
    }

    const signupData = {
      ...formData,
      accountType,
    };

    // Remove staff fields if not staff account
    if (accountType !== ACCOUNT_TYPE.STAFF) {
      delete signupData.staffId;
      delete signupData.staffCategory;
    }

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));
  };

  const tabData = [
    { id: 1, tabName: "Citizen", type: ACCOUNT_TYPE.CITIZEN },
    { id: 2, tabName: "Admin", type: ACCOUNT_TYPE.ADMIN },
    { id: 3, tabName: "Staff", type: ACCOUNT_TYPE.STAFF },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">

        {/* Left Side Image */}
        <div className="md:w-[60%] hidden md:block">
          <img
            src={signuppage}
            alt="Signup Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Signup Form Side */}
        <div className="w-full md:w-[40%] flex flex-col p-10">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-10">
            <div className="w-6 h-6 bg-black rounded-full" />
            <h1 className="text-xl font-semibold text-gray-800">Caravan Chronicle</h1>
          </div>

          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Create Account</h2>
          <p className="text-gray-500 mb-6">Please fill the information below</p>

          {/* Google Signup */}
          <button
            onClick={() => (window.location.href = "#")}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium shadow hover:shadow-md mb-6"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          {/* Account Type Tabs */}
          <div className="mb-4">
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />
          </div>

          {/* Signup Form */}
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-1/2 px-4 py-3 border rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600 shadow hover:shadow-xl"
                value={firstName}
                onChange={handleOnChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-1/2 px-4 py-3 border rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600 shadow hover:shadow-xl"
                value={lastName}
                onChange={handleOnChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600 shadow hover:shadow-xl"
              value={email}
              onChange={handleOnChange}
              required
            />

            {/* Staff Fields */}
            {accountType === ACCOUNT_TYPE.STAFF && (
              <>
                <input
                  type="text"
                  name="staffId"
                  placeholder="Staff ID"
                  className="w-full px-4 py-3 border rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600 shadow hover:shadow-xl"
                  value={staffId}
                  onChange={handleOnChange}
                  required
                />

                {/* ✅ Staff Category Dropdown */}
                <select
                  name="staffCategory"
                  value={staffCategory}
                  onChange={handleOnChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600 shadow hover:shadow-xl bg-white"
                >
                  <option value="">Select Staff Category</option>
                  <option value="Sweeper">Sweeper</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Others">Others</option>
                </select>
              </>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600 shadow hover:shadow-xl"
              value={password}
              onChange={handleOnChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600 shadow hover:shadow-xl"
              value={confirmPassword}
              onChange={handleOnChange}
              required
            />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" required className="accent-green-600" />
              <span>
                I agree to the{" "}
                <a
                  href="#"
                  className="text-green-700 font-medium underline underline-offset-2"
                >
                  Terms and Privacy
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-2xl focus:outline-none"
            >
              Sign up
            </button>
          </form>

          {/* Login Redirect */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-green-700 font-semibold hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
