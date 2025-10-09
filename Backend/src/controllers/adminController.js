import { User } from "../models/User.js";
import { StaffProfile } from "../models/StaffProfile.js";

// Approve a pending staff account (Admin Only)
export const approveStaffAccount = async (req, res) => {
  try {
    const { staffId } = req.body;

    if (!staffId) {
      return res.status(400).json({
        success: false,
        message: "Staff ID is required to approve the account.",
      });
    }

    // Find the staff user by staffId
    const staffProfile = await StaffProfile.findOne({ staffId });
    if (!staffProfile) {
      return res.status(404).json({
        success: false,
        message: "Staff profile not found.",
      });
    }

    // Find the linked user
    const user = await User.findById(staffProfile.user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for this staff profile.",
      });
    }

    // Check if already approved
    if (user.isApproved) {
      return res.status(400).json({
        success: false,
        message: "This staff account is already approved.",
      });
    }

    user.isApproved = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `Staff account (${staffId}) approved successfully.`,
      user,
    });
  } catch (error) {
    console.error("Error approving staff account:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while approving staff account.",
    });
  }
};
