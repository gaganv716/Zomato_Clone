import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    city: { type: String },
    preferences: [{ type: String }],
    cuisines: [{ type: String }],
    diningPreference: { type: String },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
