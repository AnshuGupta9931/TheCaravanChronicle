// controllers/staffProfileController.js
import { StaffProfile } from "../models/StaffProfile.js";

export const getStaffProfile = async (req, res) => {
  try {
    const profile = await StaffProfile.findOne({ user: req.user._id }).populate("user", "firstName lastName email contactNumber");
    if (!profile) return res.status(404).json({ message: "Staff profile not found" });

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching profile" });
  }
};

export const updateStaffProfile = async (req, res) => {
  try {
    const updates = (({ staffCategory }) => ({ staffCategory }))(req.body);
    const profile = await StaffProfile.findOneAndUpdate(
      { user: req.user._id },
      updates,
      { new: true }
    );

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating profile" });
  }
};
