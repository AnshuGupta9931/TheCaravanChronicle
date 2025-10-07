import express from "express";
import { createComplaint,getAllComplaints,
    getMyComplaints,updateComplaintStatus } from "../controllers/complaint.js";
import { auth, isCitizen, isStaff } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/",getAllComplaints);

router.get('/my-complaints', auth, isCitizen ,getMyComplaints);

router.post(
  "/create",
  auth,
  isCitizen,
  upload.array("images", 5), // Using multer middleware
  createComplaint
);

router.patch('/:id/status', auth, isStaff ,updateComplaintStatus);

export default router;