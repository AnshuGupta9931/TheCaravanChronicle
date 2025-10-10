// controllers/staffDashboardController.js
import { Complaint } from "../models/Complaint.js";
import { StaffProfile } from "../models/StaffProfile.js";

export const getStaffDashboard = async (req, res) => {
  try {
    // ✅ Find staff profile linked to this user
    const staff = await StaffProfile.findOne({ user: req.user._id });
    if (!staff) {
      return res.status(404).json({ message: "Staff profile not found" });
    }

    // ✅ Define time threshold for overdue (3 days)
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    // ✅ Run all counts in parallel for efficiency
    const [openCount, inProgressCount, resolvedCount, overdueCount] = await Promise.all([
      Complaint.countDocuments({ assignedStaff: staff._id, status: "OPEN" }),
      Complaint.countDocuments({ assignedStaff: staff._id, status: "IN PROGRESS" }),
      Complaint.countDocuments({ assignedStaff: staff._id, status: "RESOLVED" }),
      Complaint.countDocuments({
        assignedStaff: staff._id,
        status: { $in: ["OPEN", "IN PROGRESS"] },
        createdAt: { $lt: threeDaysAgo },
      }),
    ]);

    // ✅ Prepare structured dashboard data
    const dashboard = {
      open: openCount,
      inProgress: inProgressCount,
      resolved: resolvedCount,
      overdue: overdueCount,
      total: openCount + inProgressCount + resolvedCount,
    };

    // ✅ Send response
    res.status(200).json({
      success: true,
      dashboard,
    });

  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch staff dashboard data",
    });
  }
};
