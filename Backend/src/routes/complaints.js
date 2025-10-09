import express from "express";
import { 
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  updateComplaintStatus,
  getComplaintById,
  updateComplaint,
} from "../controllers/complaint.js";
import { auth, isCitizen, isStaff } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

/**
 * STAFF / ADMIN ROUTES
 */
router.get("/all", auth, isStaff, getAllComplaints);

router.patch("/:id/status", auth, isStaff, updateComplaintStatus);

/**
 * CITIZEN ROUTES
 */
router.get("/my-complaints", auth, isCitizen, getMyComplaints);

router.post(
  "/create",
  auth,
  isCitizen,
  upload.array("images", 5),
  createComplaint
);

router.get('/:id', auth, getComplaintById);
router.put('/:id', auth, upload.array("images", 5), updateComplaint);

export default router;
