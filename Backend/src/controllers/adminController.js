import mongoose from "mongoose";
import { User } from "../models/User.js";
import { StaffProfile } from "../models/StaffProfile.js";
import { Profile } from "../models/Profile.js";
import { mailSender } from "../../utils/mailSender.js";
import { staffAccountApprovedTemplate } from "../../mail_templates/staffApprovalTemplate.js";
import { staffAccountRejectionTemplate } from "../../mail_templates/staffRejectTemplate.js";

export const approveStaffAccount = async (req, res) => {
  try {
    //  Get the user's MongoDB _id from the request body.
    const { userId } = req.body;

    // console.log(req.body);
    // console.log(userId);

    //  Validate the incoming userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "A valid user ID is required in the request body.",
      });
    }

    //  Find the user directly by their _id
    const user = await User.findById(userId);
    // console.log(user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for the given ID.",
      });
    }

    //  Verify this user is actually a staff member
    if (user.accountType !== "Staff") {
      return res.status(400).json({
        success: false,
        message: "This action is only applicable to Staff accounts.",
      });
    }

    //  Check if the account is already approved
    if (user.isApproved) {
      return res.status(400).json({
        success: false,
        message: "This staff account has already been approved.",
      });
    }

    //  Update the isApproved status and save the user document
    user.isApproved = true;
    await user.save();

    //  Notify the staff member via email
    const emailContent = staffAccountApprovedTemplate(user.firstName);
    await mailSender(
      user.email,
      "Your Circus City Staff Account is Approved!",
      emailContent
    );

    //  Send success response (ensure password is not sent back)
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: `Staff account for ${user.firstName} ${user.lastName} approved successfully.`,
      user,
    });
  } catch (error) {
    console.error("Error approving staff account:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during account approval. Please try again later.",
    });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    // Find all users who are staff and are not yet approved
    const pendingStaff = await User.find({
      accountType: "Staff",
      isApproved: false,
    })
      .populate("staffProfile") // Include details from StaffProfile except password
      .select("-password");

    if (!pendingStaff || pendingStaff.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No pending staff approval requests found.",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pending staff approval requests fetched successfully.",
      data: pendingStaff,
    });
  } catch (error) {
    console.error("Error fetching pending staff requests:", error);
    return res.status(500).json({
      success: false,
      message:
        "Server error while fetching pending requests. Please try again later.",
    });
  }
};

export const updateStaffProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, staffCategory, staffId } = req.body;

    // Validate the incoming userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "A valid user ID is required in the URL parameters.",
      });
    }

    // Find the user and their staff profile
    const user = await User.findById(userId).populate("staffProfile");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for the given ID.",
      });
    }

    // Verify the user is a staff member
    if (user.accountType !== "Staff" || !user.staffProfile) {
      return res.status(400).json({
        success: false,
        message: "This user is not a staff member or has no staff profile.",
      });
    }

    //  Update User model fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    // Update StaffProfile model fields
    const staffProfile = user.staffProfile;

    if (staffCategory) {
      staffProfile.staffCategory = staffCategory;
    }

    if (staffId && staffId !== staffProfile.staffId) {
      // Check if the new staffId is already in use by another profile
      const existingProfile = await StaffProfile.findOne({ staffId });
      if (existingProfile) {
        return res.status(409).json({
          success: false,
          message: "This Staff ID is already in use by another staff member.",
        });
      }
      staffProfile.staffId = staffId;
    }

    // Save the updated documents
    await user.save();
    await staffProfile.save();

    // Send success response
    const updatedUser = await User.findById(userId)
      .populate("staffProfile")
      .select("-password");

    return res.status(200).json({
      success: true,
      message: `Staff profile for ${updatedUser.firstName} ${updatedUser.lastName} updated successfully.`,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating staff profile:", error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.staffId) {
      return res.status(409).json({
        success: false,
        message: "This Staff ID is already in use.",
      });
    }
    return res.status(500).json({
      success: false,
      message:
        "Server error while updating staff profile. Please try again later.",
    });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    //  Validate the incoming userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "A valid user ID is required in the URL parameters.",
      });
    }

    // Find the user to be deleted
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for the given ID.",
      });
    }

    // Safety check: Ensure the user is a staff member
    if (user.accountType !== "Staff") {
      return res.status(403).json({
        success: false,
        message: "Deletion failed: This user is not a staff member.",
      });
    }

    // Delete all associated profiles to prevent orphaned data
    // These checks handle cases where a profile might not exist for some reason

    // console.log("Staff Profile : ", user.staffProfile);
    // console.log("Profile : ", user.Profile);
    if (user.staffProfile) {
      await StaffProfile.findByIdAndDelete(user.staffProfile);
    }
    if (user.additionalDetails) {
      await Profile.findByIdAndDelete(user.additionalDetails);
    }

    // Delete the User document itself
    await User.findByIdAndDelete(userId);

    // Send success response
    return res.status(200).json({
      success: true,
      message: `Staff account for ${user.firstName} ${user.lastName} has been permanently deleted.`,
    });
  } catch (error) {
    console.error("Error deleting staff profile:", error);
    return res.status(500).json({
      success: false,
      message:
        "Server error while deleting staff profile. Please try again later.",
    });
  }
};

export const rejectStaffAccount = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "A valid user ID is required in the request body.",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for the given ID.",
      });
    }
    if (user.accountType !== "Staff") {
      return res.status(403).json({
        success: false,
        message: "Rejection failed: This user is not a staff member.",
      });
    }
    if (user.isApproved) {
      return res.status(400).json({
        success: false,
        message: "Cannot reject an account that has already been approved.",
      });
    }

    // Send rejection email BEFORE deleting the data
    const emailContent = staffAccountRejectionTemplate(user.firstName);
    await mailSender(
      user.email,
      "An Update on Your Circus City Staff Application",
      emailContent
    );

    if (user.staffProfile) {
      await StaffProfile.findByIdAndDelete(user.staffProfile);
    }
    if (user.additionalDetails) {
      await Profile.findByIdAndDelete(user.additionalDetails);
    }

    // Delete the User document itself
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: `Staff account for ${user.firstName} ${user.lastName} has been rejected and deleted successfully.`,
    });
  } catch (error) {
    console.error("Error rejecting staff account:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while rejecting staff account.",
      error: error.message,
    });
  }
};


// controllers/adminComplaintController.js
import { Complaint } from "../models/Complaint.js";

export const getComplaintStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const open = await Complaint.countDocuments({ status: "OPEN" });
    const inProgress = await Complaint.countDocuments({ status: "IN PROGRESS" });
    const resolved = await Complaint.countDocuments({ status: "RESOLVED" });

    // Overdue check using virtual field
    const overdueDocs = await Complaint.find({});
    const overdue = overdueDocs.filter((c) => c.isOverdue).length;

    res.status(200).json({
      success: true,
      data: { total, open, inProgress, resolved, overdue },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching stats" });
  }
};
