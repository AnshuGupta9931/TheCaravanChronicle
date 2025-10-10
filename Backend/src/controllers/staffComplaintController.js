// controllers/staffComplaintController.js
import { Complaint } from "../models/Complaint.js";
import { StaffProfile } from "../models/StaffProfile.js";

// ✅ Get all complaints assigned to this staff (with optional filters)
export const getStaffComplaints = async (req, res) => {
  try {
    // Find the staff profile for the logged-in user
    const staff = await StaffProfile.findOne({ user: req.user._id });
    if (!staff) {
      return res.status(404).json({ message: "Staff profile not found" });
    }

    const { status } = req.query; // Query param: open | in-progress | resolved | overdue
    const filter = { assignedStaff: staff._id };

    // Apply filter conditions
    if (status === "open") filter.status = "OPEN";
    if (status === "in-progress") filter.status = "IN PROGRESS";
    if (status === "resolved") filter.status = "RESOLVED";
    if (status === "overdue") {
      filter.status = { $in: ["OPEN", "IN PROGRESS"] };
      filter.createdAt = { $lt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) };
    }

    // Fetch complaints
    const complaints = await Complaint.find(filter)
      .populate("citizenId", "firstName lastName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching staff complaints:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching complaints",
    });
  }
};

// ✅ Update complaint status (e.g. OPEN → IN PROGRESS → RESOLVED)
export const updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status, staffNotes } = req.body; // optional staffNotes field

    // Only allow valid statuses
    const validStatuses = ["OPEN", "IN PROGRESS", "RESOLVED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Get staff profile
    const staff = await StaffProfile.findOne({ user: req.user._id });
    if (!staff) {
      return res.status(404).json({ message: "Staff profile not found" });
    }

    // Find complaint assigned to this staff
    const complaint = await Complaint.findOne({
      _id: complaintId,
      assignedStaff: staff._id,
    });

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found or not assigned to you",
      });
    }

    // Prevent moving backwards (e.g. from RESOLVED → IN PROGRESS)
    if (complaint.status === "RESOLVED" && status !== "RESOLVED") {
      return res.status(400).json({
        message: "Resolved complaints cannot be reopened",
      });
    }

    // Update status & notes
    complaint.status = status;
    if (staffNotes) complaint.staffNotes = staffNotes;

    // Record resolution time if resolved
    if (status === "RESOLVED") {
      complaint.resolvedAt = new Date();
    }

    await complaint.save();

    return res.status(200).json({
      success: true,
      message: "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating complaint status",
    });
  }
};
