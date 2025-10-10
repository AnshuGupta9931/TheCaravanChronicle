// routes/staffRoutes.js
import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  getStaffComplaints,
  updateComplaintStatus,
} from "../controllers/staffComplaintController.js";
import {
  getAllComplaintsForManager,
  assignComplaintToStaff,
} from "../controllers/staffManagerController.js";
import {
    getStaffDashboard
} from "../controllers/staffDashboardController.js"
const router = express.Router();
router.get("/dashboard", auth, getStaffDashboard);
// ✅ Staff routes
router.get("/complaints", auth, getStaffComplaints);
router.put("/complaints/:complaintId/status", auth, updateComplaintStatus);

// ✅ Manager routes
router.get("/manager/complaints", auth, getAllComplaintsForManager);
router.post("/manager/assign", auth, assignComplaintToStaff);

export default router;
