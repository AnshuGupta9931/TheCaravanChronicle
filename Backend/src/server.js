import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import reportRoutes from "./routes/reports.js";
import complaintRoutes from "./routes/complaints.js";
import userRoutes from "./routes/users.js";
import profileRoutes from "./routes/ProfileRoutes.js";

// ------------------------------
// ✅ Setup __dirname for ES Modules
// ------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------
// ✅ Initialize App & Config
// ------------------------------
dotenv.config();
const app = express();

// ------------------------------
// ✅ Middleware
// ------------------------------
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,               // allow cookies/auth headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ------------------------------
// ✅ Routes
// ------------------------------
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/complaints", complaintRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);

// ------------------------------
// ✅ Serve Uploaded Files (Images)
// ------------------------------
// This lets you access uploaded files from:
// http://localhost:8000/tmp/<filename>.jpg
app.use("/tmp", express.static(path.join(__dirname, "public/tmp")));

// ------------------------------
// ✅ Sample Route
// ------------------------------
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ------------------------------
// ✅ Database Connection & Server Start
// ------------------------------
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));
