import express from "express";
import { completeProfile } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// 🌟 Complete profile after Google login
router.post("/complete-profile", protect, completeProfile);

export default router;
