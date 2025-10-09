import mongoose from "mongoose";

const staffProfileSchema = new mongoose.Schema(
  {
    // Reference to the User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Unique Staff ID
    staffId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Staff category
    staffCategory: {
      type: String,
      enum: ["Sweeper", "Plumber", "Carpenter", "Electrician", "Others"],
      default: "Others",
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Ensure indexes for unique constraints
staffProfileSchema.index({ user: 1 }, { unique: true });
staffProfileSchema.index({ staffId: 1 }, { unique: true });

// ✅ Safety check — only allow linking to Staff accounts
staffProfileSchema.pre("save", async function (next) {
  const User = mongoose.model("User");
  const linkedUser = await User.findById(this.user);

  if (!linkedUser) {
    return next(new Error("Linked user not found."));
  }

  if (linkedUser.accountType !== "Staff") {
    return next(new Error("StaffProfile can only be linked to a Staff user."));
  }

  next();
});

export const StaffProfile = mongoose.model("StaffProfile", staffProfileSchema);
