const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
import Profile from "../models/Profile.js";
import OTP from "../models/OTP.js";
import otpGenerator from "otp-generator";
import mailSender from "../utils/mailSender.js";
import { otpTemplate } from "../mail/templates/otpTemplate.js"; // optional custom template
import { passwordUpdated } from "../mail/templates/passwordUpdated.js"; // optional email template

// Send OTP to new user's email for registration
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // 1️⃣ Validate email input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already registered. Please log in instead.",
      });
    }

    // 3️⃣ Generate 6-digit numeric OTP
    let otp;
    let existingOTP;
    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOTP = await OTP.findOne({ otp });
    } while (existingOTP);

    // 4️⃣ Save OTP to DB (linked with email)
    const otpEntry = await OTP.create({ email, otp });

    // 5️⃣ Send OTP via Email
    const emailContent = otpTemplate
      ? otpTemplate(otp)
      : `<p>Your Circus City verification code is <b>${otp}</b>. It will expire in 5 minutes.</p>`;

    await mailSender(email, "Your Circus City OTP Code", emailContent);

    // 6️⃣ Respond
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please check your email.",
      otp, // ⚠️ only include in dev mode — remove in production
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again later.",
    });
  }
};

// Signup Controller
export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType, // Citizen | Staff | Admin
      contactNumber,
      otp,
    } = req.body;

    // 1. Validate required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    // 2. Match password & confirmPassword
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match.",
      });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already registered. Please log in.",
      });
    }

    // 4. Validate OTP
    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired. Please request again.",
      });
    }

    if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create empty profile (can be updated later)
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: contactNumber || null,
    });

    // 7. Create new user entry
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      role: accountType || "Citizen", // default role = Citizen
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // 8. Send success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user,
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error during signup.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not registered. Please sign up first.",
      });
    }

    // 3. Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // 4. Prepare JWT payload
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role, // Citizen | Staff | Admin
    };

    // 5. Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // 6. Set cookie
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only https in prod
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };

    // Hide password in response
    user.password = undefined;

    res.cookie("token", token, options).status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    // 1️⃣ Get current user from token (set in authMiddleware)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // 2️⃣ Extract passwords from request body
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required.",
      });
    }

    // 3️⃣ Validate old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect old password.",
      });
    }

    // 4️⃣ Confirm new passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirmation do not match.",
      });
    }

    // 5️⃣ Hash and update the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // 6️⃣ Send password change confirmation email
    try {
      const emailResponse = await mailSender(
        user.email,
        "Your Circus City account password has been updated",
        passwordUpdated
          ? passwordUpdated(user.email)
          : `<p>Hello ${user.name}, your password was successfully updated.</p>`
      );
      console.log("Password change email sent:", emailResponse.response);
    } catch (emailError) {
      console.error("Error sending password change email:", emailError);
      // Continue even if email fails — password was updated
    }

    // ✅ 7️⃣ Final success response
    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (err) {
    console.error("Error while changing password:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while changing the password.",
    });
  }
};
