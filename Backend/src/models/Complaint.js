import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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
);

complaintSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

complaintSchema.virtual("isOverdue").get(function () {
  const threeDays = 3 * 24 * 60 * 60 * 1000;
  const age = Date.now() - this.createdAt.getTime();
  return age > threeDays && this.status !== "RESOLVED";
});

complaintSchema.index({ location: "2dsphere" });

export const Complaint = mongoose.model("Complaint", complaintSchema);
