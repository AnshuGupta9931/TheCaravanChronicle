// import express from "express";
// import { auth } from "../middlewares/auth.js";
// import multer from "multer";
// import { updateProfile, getUserProfile } from "../controllers/ProfileController.js";

// const router = express.Router();

// // 🧩 Multer memory storage (safe, flexible)
// const upload = multer({ storage: multer.memoryStorage() });

// // ✅ Get profile
// router.get("/get-profile", auth, getUserProfile);

// // ✅ Update profile (can accept optional image)
// router.put("/update-profile", auth, upload.single("image"), updateProfile);

// export default router;

import express from "express";
import { updateProfile, getUserProfile } from "../controllers/ProfileController.js";
import { auth } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/get-profile", auth, getUserProfile);

router.put("/update-profile", auth, upload.single("image"), updateProfile);

export default router;

