import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Signup Route
router.post("/signup", registerUser);

// Login Route
router.post("/login", loginUser);

// ----------------------
// 🌐 Google OAuth Routes
// ----------------------

// Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const redirectPath = req.user.isProfileComplete ? "/homepage" : "/complete-profile";

    // ✅ FIX: Use the FRONTEND_URL environment variable for redirection.
    // This will correctly point to your Vercel frontend when deployed on Render.
    // It will fall back to localhost for local backend testing if FRONTEND_URL is not set.
    const frontendRedirectUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    // Log the URL for debugging in Render logs
    console.log(`Redirecting to frontend: ${frontendRedirectUrl}/google-auth-success?token=${token}&redirect=${redirectPath}`);

    res.redirect(`${frontendRedirectUrl}/google-auth-success?token=${token}&redirect=${redirectPath}`);
  }
);

// Optional failure route
router.get("/google/failure", (req, res) => {
  res.send("Google Login Failed");
});

export default router;
