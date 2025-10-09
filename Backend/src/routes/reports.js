// routes/reportRoutes.js
import express from "express";
import { exportMonthlyCSV, exportMonthlyPDF } from "../controllers/reports.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// Admin-only reports
router.get("/csv", auth, exportMonthlyCSV);
router.get("/pdf", auth, exportMonthlyPDF);

export default router;
