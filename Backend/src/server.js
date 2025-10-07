import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import reportRoutes from "./routes/reports.js";
import complaintRoutes from "./routes/complaints.js"
import userRoutes from "./routes/users.js";


dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/api/v1/reports",reportRoutes);
app.use("/api/v1/complaints", complaintRoutes);
app.use("/api/v1/users", userRoutes);

// sample route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// PORT from .env or default 5000
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MongoDB_URL)
  .then(()=>{
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("DB Connection Error:", err));