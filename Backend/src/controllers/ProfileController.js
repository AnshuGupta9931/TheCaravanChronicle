import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";
import path from "path";
import dotenv from "dotenv";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import fs from "fs";


dotenv.config();

export const updateProfile = async (req, res) => {
  try {
    console.log("🔹 Incoming update profile request:", req.body);
    console.log("🖼️ Uploaded file:", req.file?.originalname);

    // 1️⃣ Ensure user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found in request.",
      });
    }

    const userId = req.user.id;
    const {
      firstName,
      lastName,
      email,
      about,
      contactNumber,
      gender,
      dateOfBirth,
    } = req.body;

    // 2️⃣ Fetch user and related profile
    const user = await User.findById(userId).populate("additionalDetails");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const profile = await Profile.findById(user.additionalDetails);

    // 3️⃣ Handle image upload (to Cloudinary)
    if (req.file) {
      console.log("☁️ Uploading image to Cloudinary...");

      const uploadResponse = await uploadOnCloudinary(req.file.path);
      if (uploadResponse && uploadResponse.secure_url) {
        user.image = uploadResponse.secure_url;
        console.log("✅ Cloudinary upload success:", uploadResponse.secure_url);
      }

      // 🧹 Delete temp file after upload
      // fs.unlinkSync(req.file.path);
    }

    // 4️⃣ Update basic user fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    // 5️⃣ Update profile details
    if (profile) {
      if (about !== undefined) profile.about = about;
      if (contactNumber !== undefined) profile.contactNumber = contactNumber;
      if (gender !== undefined) profile.gender = gender;
      if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth;
      await profile.save();
    }

    await user.save();

    // 6️⃣ Return updated user data
    const updatedUser = await User.findById(userId)
      .populate("additionalDetails")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
      error: error.message,
    });
  }
};



// ✅ Get Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .populate("additionalDetails")
      .select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};