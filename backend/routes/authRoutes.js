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

        // IMPORTANT CHANGE: Use the correct frontend URL for redirection after successful Google Auth
        // If your frontend is deployed on Vercel, use its HTTPS URL here.
        // If you are testing locally, use 'http://localhost:5173'.
        // For Vercel, it would be:
        // res.redirect(`https://ey-zomato-clone-lgud0mvbc-gaganv716s-projects.vercel.app/google-auth-success?token=${token}&redirect=${redirectPath}`);
        // For local testing (assuming your Vercel URL is not yet fixed or you want to test locally):
        res.redirect(`http://localhost:5173/google-auth-success?token=${token}&redirect=${redirectPath}`);
      }
    );

    // Optional failure route
    router.get("/google/failure", (req, res) => {
      res.send("Google Login Failed");
    });

    export default router;
    