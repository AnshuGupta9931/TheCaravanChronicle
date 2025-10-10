// controllers/staffManagerController.js
import { Complaint } from "../models/Complaint.js";
import { StaffProfile } from "../models/StaffProfile.js";

// ✅ Fetch all complaints (Manager View)
export const getAllComplaintsForManager = async (req, res) => {
  try {
    const manager = await StaffProfile.findOne({ user: req.user._id });
    if (!manager || manager.role !== "Manager") {
      return res.status(403).json({ message: "Access denied. Only managers can view this." });
    }

    const { status, assigned } = req.query;
    const filter = {};

    if (status) filter.status = status.toUpperCase();
    if (assigned === "false") filter.assignedStaff = { $exists: false };

    const complaints = await Complaint.find(filter)
      .populate("citizenId", "firstName lastName email")
      .populate("assignedStaff", "staffId staffCategory role")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching manager complaints:", error);
    return res.status(500).json({ message: "Failed to fetch complaints" });
  }
};

// ✅ Assign complaint to a staff member
export const assignComplaintToStaff = async (req, res) => {
  try {
    const manager = await StaffProfile.findOne({ user: req.user._id });
    if (!manager || manager.role !== "Manager") {
      return res.status(403).json({ message: "Access denied. Only managers can assign complaints." });
    }

    const { complaintId, staffId } = req.body;

    if (!complaintId || !staffId) {
      return res.status(400).json({ message: "Complaint ID and Staff ID are required" });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const staff = await StaffProfile.findOne({ staffId });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    if (staff.role !== "Staff") {
      return res.status(400).json({ message: "Only normal staff can be assigned complaints." });
    }

    complaint.assignedStaff = staff._id;
    complaint.status = "IN PROGRESS"; // automatically move to in progress once assigned

    await complaint.save();

    return res.status(200).json({
      success: true,
      message: `Complaint assigned to ${staff.staffId}`,
      complaint,
    });
  } catch (error) {
    console.error("Error assigning complaint:", error);
    return res.status(500).json({ message: "Failed to assign complaint" });
  }
};
