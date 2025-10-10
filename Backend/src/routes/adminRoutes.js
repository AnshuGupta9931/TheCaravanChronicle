import express from "express";
import { approveStaffAccount,
    getPendingRequests,
    updateStaffProfile, 
    deleteStaff,
    rejectStaffAccount,
    getComplaintStats
} from "../controllers/adminController.js"
import { auth, isAdmin } from "../middlewares/auth.js"

const router = express.Router();

router.patch(
    "/approve-staff",
    auth, 
    isAdmin,
    approveStaffAccount
);

router.get(
    "/get-pending-requests",
    auth,
    isAdmin,
    getPendingRequests
);

router.patch(
    "/update-staff/:userId",
    auth,
    isAdmin,
    updateStaffProfile
);

router.delete(
    "/delete-staff/:userId",
    auth,
    isAdmin,
    deleteStaff
);

router.delete(
    "/delete-staff/:userId",
    auth,
    isAdmin,
    deleteStaff
);

router.post("/reject-staff", auth, isAdmin, rejectStaffAccount);
// router.get("/pending-staff", auth, isAdmin, getPendingStaffAccounts);

router.get("/complaint-stats", auth, isAdmin, getComplaintStats);


export default router;

