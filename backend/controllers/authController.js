import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ email, password });

    res.status(201).json({
      id: user.id,
      email: user.email,
      isProfileComplete: user.isProfileComplete,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user.id,
        email: user.email,
        isProfileComplete: user.isProfileComplete,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
