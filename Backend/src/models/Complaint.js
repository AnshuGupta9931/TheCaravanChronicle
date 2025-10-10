import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
=======
    citizenId: { 
      type: mongoose.Schema.Types.ObjectId, 
>>>>>>> 3169489 (Staff feature ready)
      ref: "User",
      required: true,
    },
<<<<<<< HEAD

    type: {
      type: String,
=======
    assignedStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StaffProfile",
      default: null,
    },
    type: { 
      type: String, 
>>>>>>> 3169489 (Staff feature ready)
      enum: [
        "Roads & Pathways",
        "Water Issues (Leaks, Drainage)",
        "Electricity & Lighting",
        "Garbage & Sanitation",
        "Other",
      ],
      required: true,
    },
<<<<<<< HEAD

    description: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: {
        type: String,
      },
    },

    images: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["OPEN", "IN PROGRESS", "RESOLVED"],
      default: "OPEN",
    },

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
=======
    description: { type: String, required: true },
    location: { type: String, required: true },
    images: { type: [String], default: [] },
    status: { 
      type: String, 
      enum: ["OPEN", "IN PROGRESS", "RESOLVED"], 
      default: "OPEN" 
    },
    staffNotes: { type: String, default: "", trim: true },
    resolvedAt: { type: Date, default: null },
  },
  { timestamps: true }
>>>>>>> 3169489 (Staff feature ready)
);

complaintSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

complaintSchema.virtual("isOverdue").get(function () {
<<<<<<< HEAD
  // Overdue if still OPEN or IN PROGRESS and older than 3 days
  const threeDays = 3 * 24 * 60 * 60 * 1000; // milliseconds in 3 days
=======
  const threeDays = 3 * 24 * 60 * 60 * 1000;
>>>>>>> 3169489 (Staff feature ready)
  const age = Date.now() - this.createdAt.getTime();
  return age > threeDays && this.status !== "RESOLVED";
});

<<<<<<< HEAD
complaintSchema.index({ location: "2dsphere" });

=======
complaintSchema.set("toJSON", { virtuals: true });
complaintSchema.set("toObject", { virtuals: true });

complaintSchema.index({ citizenId: 1 });
complaintSchema.index({ assignedStaff: 1 });
complaintSchema.index({ status: 1 });

>>>>>>> 3169489 (Staff feature ready)
export const Complaint =
  mongoose.models.Complaint || mongoose.model("Complaint", complaintSchema);
