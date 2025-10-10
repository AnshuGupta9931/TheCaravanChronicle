// models/StaffProfile.js
import mongoose from "mongoose";

const staffProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    staffId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    staffCategory: {
      type: String,
      enum: ["Sweeper", "Plumber", "Carpenter", "Electrician", "Others"],
      default: "Others",
      required: true,
    },

    // 🆕 Added role
    role: {
      type: String,
      enum: ["Staff", "Manager"],
      default: "Staff",
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Validation to ensure link consistency
staffProfileSchema.pre("save", async function (next) {
  const User = mongoose.model("User");
  const linkedUser = await User.findById(this.user);

  if (!linkedUser) return next(new Error("Linked user not found."));

  if (!["Staff", "StaffManager"].includes(linkedUser.accountType)) {
    return next(new Error("Only staff or managers can have a StaffProfile."));
  }

  next();
});

export const StaffProfile = mongoose.model("StaffProfile", staffProfileSchema);
