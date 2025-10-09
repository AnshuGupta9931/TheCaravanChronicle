import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/operations/authAPI.jsx";
import loginbg from "../../assets/images/loginbg.png";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full">
        
        {/* Left Side Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src={loginbg}
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Login Form Side */}
        <div className="w-full md:w-1/2 flex flex-col p-10">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-10">
            <div className="w-6 h-6 bg-green-600 rounded-full" />
            <h1 className="text-xl font-semibold text-gray-800">
              Caravan Chronicle
            </h1>
          </div>

          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Welcome Back!
          </h2>
          <p className="text-gray-500 mb-6">
            Please enter your login details below
          </p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleOnSubmit}>
            <input
              name="email"
              value={email}
              onChange={handleOnChange}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700 text-gray-800 transition-all duration-300 shadow-lg hover:shadow-2xl focus:shadow-xl"
            />
            <div className="relative">
              <input
                name="password"
                value={password}
                onChange={handleOnChange}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700 text-gray-800 transition-all duration-300 shadow-lg hover:shadow-2xl focus:shadow-xl"
              />
              <FaEyeSlash
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-4 text-gray-400 cursor-pointer"
              />
            </div>

            <Link to="/reset-password">
              <div className="text-right text-sm text-gray-500 hover:underline cursor-pointer">
                Forgot password?
              </div>
            </Link>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition duration-300 shadow-lg hover:shadow-2xl focus:outline-none"
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            className="w-full flex items-center justify-center gap-2 border py-3 rounded-xl hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-2xl focus:outline-none"
            onClick={() =>
              (window.location.href =
                "#")
            }
          >
            <FcGoogle className="text-xl" />
            Log in with Google
          </button>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-green-700 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};