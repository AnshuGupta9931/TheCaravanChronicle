import express from "express";
import {
    sendOTP,
    signup,
    login,
    changePassword
} from "../controllers/Auth.js";
import { auth } from "../middlewares/auth.js"; 
const router = express.Router();

router.post("/send-otp", sendOTP);

router.post("/signup", signup);

router.post("/login", login);

router.post("/change-password", auth, changePassword);


export default router;


    
