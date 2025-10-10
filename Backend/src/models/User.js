import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.googleId; // Required only if not Google user
      },
      minlength: 6,
    },

    googleId: {
      type: String,
    },

    accountType: {
      type: String,
      enum: ["Citizen", "Staff", "StaffManager","Admin"],
      required: true,
      default: "Citizen",
    },

    // 🔗 Staff profile link
    staffProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StaffProfile",
    },

    active: {
      type: Boolean,
      default: true,
    },

    // 🔒 Staff must be manually approved
    isApproved: {
      type: Boolean,
      default: function () {
        return this.accountType === "Citizen" || this.accountType === "Admin";
      },
    },

    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: false,
    },

    image: {
      type: String,
    },

    token: String,

    resetPasswordExpires: Date,

    theme: {
      type: String,
      enum: ["dark", "light"],
      default: "light",
    },

    notification: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: false },
    },

    complaints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint",
      },
    ],
  },
  { timestamps: true }
);

// ✅ Virtual full name
userSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

export const User = mongoose.model("User", userSchema);
