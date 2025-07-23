    import express from "express";
    import dotenv from "dotenv";
    import mongoose from "mongoose";
    import cors from "cors"; // Ensure cors is imported
    import passport from "passport";
    import authRoutes from "./routes/authRoutes.js";
    import userRoutes from "./routes/userRoutes.js";
    import "./config/passport.js"; // Google OAuth config
    import cartRoutes from "./routes/cartRoutes.js";
    import orderRoutes from "./routes/orderRoutes.js"; 

    dotenv.config();

    const app = express();

    // ✅ FIX: Correctly specify allowed origins for CORS
    // This list MUST include your deployed Vercel frontend URL without a trailing slash.
    const allowedOrigins = [
      "http://localhost:5173", // For local frontend development
      "https://bitescape.vercel.app" // Your primary Vercel frontend domain (NO TRAILING SLASH)
      // If you have other Vercel preview domains or custom domains, add them here too, e.g.:
      // "https://bitescape-gaganv716s-projects.vercel.app",
      // "https://bitescape-git-master-gaganv716s-projects.vercel.app"
    ];

    app.use(
      cors({
        origin: function (origin, callback) {
          // Allow requests with no origin (like mobile apps or curl requests)
          if (!origin) return callback(null, true);
          if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
          }
          return callback(null, true);
        },
        credentials: true, // Important if you're sending cookies or authorization headers
      })
    );

    // Middleware
    app.use(express.json());
    app.use(passport.initialize());

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/cart", cartRoutes);
    app.use("/api/orders", orderRoutes);

    // DB Connection
    mongoose
      .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("✅ MongoDB connected"))
      .catch((err) => console.error("❌ MongoDB connection error:", err));

    // Basic Route
    app.get("/", (req, res) => {
      res.send("🌍 Bitescape API is running...");
    });

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    