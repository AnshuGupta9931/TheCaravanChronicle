import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    // Citizen who created the complaint
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Optional assigned staff member
    assignedStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StaffProfile",
      default: null,
    },

    // Complaint category/type
    type: {
      type: String,
      enum: [
        "Roads & Pathways",
        "Water Issues (Leaks, Drainage)",
        "Electricity & Lighting",
        "Garbage & Sanitation",
        "Other",
      ],
      required: true,
    },

    // Description by citizen
    description: {
      type: String,
      required: true,
    },

    // GeoJSON location (for map + queries)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      address: {
        type: String,
      },
    },

    // Uploaded images (array of file URLs)
    images: {
      type: [String],
      default: [],
    },

    // Complaint status
    status: {
      type: String,
      enum: ["OPEN", "IN PROGRESS", "RESOLVED"],
      default: "OPEN",
    },

    // Notes added by staff
    staffNotes: {
      type: String,
      default: "",
      trim: true,
    },

    // Timestamp when resolved
    resolvedAt: {
      type: Date,
      default: null,
    },

    // Auto timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// -------------------------------
// ✅ Middleware: auto-update updatedAt
// -------------------------------
complaintSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// -------------------------------
// ✅ Virtual field: isOverdue
// -------------------------------
complaintSchema.virtual("isOverdue").get(function () {
  // Overdue if OPEN or IN PROGRESS and older than 3 days
  const threeDays = 3 * 24 * 60 * 60 * 1000;
  const age = Date.now() - this.createdAt.getTime();
  return age > threeDays && this.status !== "RESOLVED";
});

// -------------------------------
// ✅ Indexes for performance
// -------------------------------
complaintSchema.index({ location: "2dsphere" });
complaintSchema.index({ citizenId: 1 });
complaintSchema.index({ assignedStaff: 1 });
complaintSchema.index({ status: 1 });

// -------------------------------
// ✅ Export model
// -------------------------------
export const Complaint =
  mongoose.models.Complaint || mongoose.model("Complaint", complaintSchema);
