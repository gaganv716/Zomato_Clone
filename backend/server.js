import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import "./config/passport.js"; // Google OAuth config
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; 

dotenv.config();

const app = express();

// ✅ ALLOW frontend domain (adjust for Vercel)
const allowedOrigins = [
  "http://localhost:5173", // for dev
  "https://ey-zomato-clone-lgud0mvbc-gaganv716s-projects.vercel.app/" // ✅ Replace with your actual Vercel frontend URL
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // ✅ if using cookies or Authorization headers
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
