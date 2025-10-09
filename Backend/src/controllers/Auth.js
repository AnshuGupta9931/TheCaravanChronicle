import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";
import { StaffProfile } from "../models/StaffProfile.js";
import { OTP } from "../models/OTP.js";
import otpGenerator from "otp-generator";
import { mailSender } from "../../utils/mailSender.js";
import { otpTemplate } from "../../mail_templates/otpTemplate.js";
import { passwordUpdated } from "../../mail_templates/PasswordUpdate.js";

// =======================================================================
// SEND OTP
// =======================================================================
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already registered. Please log in instead.",
      });
    }

    let otp, existingOTP;
    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOTP = await OTP.findOne({ otp });
    } while (existingOTP);

    await OTP.create({ email, otp });

    const emailContent = otpTemplate
      ? otpTemplate(otp)
      : `<p>Your Circus City verification code is <b>${otp}</b>. It will expire in 5 minutes.</p>`;

    await mailSender(email, "Your Circus City OTP Code", emailContent);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please check your email.",
      otp: process.env.NODE_ENV === "development" ? otp : undefined, // show OTP only in dev
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again later.",
    });
  }
};

// =======================================================================
// SIGNUP
// =======================================================================
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
      staffId,         // staff-only
      staffCategory,   // staff-only
    } = req.body;

    console.log("SIGNUP BODY RECEIVED:", req.body);

    // 🧩 Basic validations
    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    if (accountType === "Staff" && (!staffId || !staffCategory)) {
      return res.status(400).json({
        success: false,
        message: "Staff ID and Staff Category are required for staff accounts.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match.",
      });
    }

    // 🧩 Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already registered. Please log in.",
      });
    }

    // 🧩 Verify OTP
    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOtp || otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP. Please try again.",
      });
    }

    await OTP.findByIdAndDelete(recentOtp._id);

    // 🧩 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧩 Create Profile
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: contactNumber || null,
    });

    // 🧩 Default approval for Citizen/Admin, pending for Staff
    const isApprovedStatus = accountType === "Staff" ? false : true;

    // ✅ 1️⃣ Create user first
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType: accountType || "Citizen",
      isApproved: isApprovedStatus,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // ✅ 2️⃣ If Staff, create linked StaffProfile
    if (accountType === "Staff") {
      const staffProfile = await StaffProfile.create({
        user: user._id,       // 👈 REQUIRED FIELD
        staffId,
        staffCategory,
      });

      user.staffProfile = staffProfile._id;
      await user.save();
    }

    // ✅ 3️⃣ Response
    const successMessage =
      accountType === "Staff"
        ? "Staff account created successfully, awaiting Admin approval."
        : "User registered successfully.";

    return res.status(201).json({
      success: true,
      message: successMessage,
      user,
    });
  } catch (err) {
    console.error("Signup Error:", err);

    if (err.code === 11000) {
      const duplicateKey = Object.keys(err.keyValue)[0];
      return res.status(409).json({
        success: false,
        message: `${duplicateKey === "email" ? "Email" : "Staff ID"} already exists.`,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error during signup.",
    });
  }
};


// =======================================================================
// LOGIN
// =======================================================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 🔍 Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not registered. Please sign up first.",
      });
    }

    // 🔑 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // 🚫 Check staff approval
    if (user.accountType === "Staff" && !user.isApproved) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Your Staff account is pending administrative approval.",
      });
    }

    // 🧾 Token payload
    const payload = {
      id: user._id,
      email: user.email,
      accountType: user.accountType,
    };

    // 🔐 Create JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // 🔒 Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
    };

    // 🧼 Remove password before sending response
    user.password = undefined;

    // 🍪 Send token via cookie + return user info
    res.cookie("token", token, options).status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountType: user.accountType, // ✅ important
        image: user.image,
        additionalDetails: user.additionalDetails,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};


// =======================================================================
// CHANGE PASSWORD
// =======================================================================
export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found." });

    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword)
      return res.status(400).json({ success: false, message: "All password fields are required." });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Incorrect old password." });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ success: false, message: "New password and confirmation do not match." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    try {
      await mailSender(
        user.email,
        "Your Circus City account password has been updated",
        passwordUpdated
          ? passwordUpdated(user.email)
          : `<p>Hello ${user.name}, your password was successfully updated.</p>`
      );
    } catch (emailError) {
      console.error("Error sending password change email:", emailError);
    }

    return res.status(200).json({ success: true, message: "Password changed successfully." });
  } catch (err) {
    console.error("Error while changing password:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while changing the password.",
    });
  }
};
