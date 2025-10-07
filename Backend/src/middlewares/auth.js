import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.js";

dotenv.config({ path: "./.env" });

export const auth = async (req, res, next) => {
  try {
    // Get token from multiple possible sources
    const token =
      req.header("Authorization")?.replace("Bearer ", "").trim() ||
      req.query?.token ||
      req.body?.token ||
      req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing.",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

      const userId = decoded._id || decoded.id;
      const user = await User.findById(userId).select("name email accountType");
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      req.user = user; // Set user object in request
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired.",
      });
    }
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token.",
    });
  }
};


export const isCitizen = async (req, res, next) => {
  try {
    // The `auth` middleware should have already attached the user to the request.
    console.log(req.user.accountType);
    if (req.user.accountType != "Citizen") {
      return res.status(403).json({
        success: false,
        message: "Access Denied: This is a protected route for Citizens only.",
      });
    }
    // If the user is a Citizen, pass control to the next middleware or controller.
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role could not be verified. Please try again.",
    });
  }
};

export const isStaff = async (req, res, next) => {
  try {
      if (req.user.accountType !== "Staff" && req.user.accountType !== "Admin") {
          return res.status(403).json({
              success: false,
              message: "Access Denied: This route is for Staff and Admins only.",
          });
      }
      next();
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "User role could not be verified.",
      });
  }
};