import express from "express";
import { 
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  updateComplaintStatus,
  getComplaintById,
  updateComplaint,
  getComplaintsGeoJSON,  
} from "../controllers/complaint.js";
import { auth, isCitizen, isStaff } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/all", auth, isStaff, getAllComplaints);

router.patch("/:id/status", auth, isStaff, updateComplaintStatus);

router.get("/my-complaints", auth, isCitizen, getMyComplaints);

router.post(
  "/create",
  auth,
  isCitizen,
  upload.array("images", 5),
  createComplaint
);

router.get("/:id", auth, getComplaintById);

router.put("/:id", auth, upload.array("images", 5), updateComplaint);


router.get("/heatmap/data", getComplaintsGeoJSON);

export default router;
