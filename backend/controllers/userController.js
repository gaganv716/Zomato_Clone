import User from "../models/userModel.js";

// 👤 Complete Profile Controller
export const completeProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      firstName,
      lastName,
      phone,
      city,
      preferences,
      cuisines,
      diningPreference,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        phone,
        city,
        preferences,
        cuisines,
        diningPreference,
        isProfileComplete: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error in completeProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};
