import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    // ✅ Links the complaint to a citizen user
    citizenId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true 
    },

    // ✅ Complaint type with fixed options
    type: { 
      type: String, 
      enum: [
        "Roads & Pathways",
        "Water Issues (Leaks, Drainage)",
        "Electricity & Lighting",
        "Garbage & Sanitation",
        "Other"
      ],
      required: true 
    },

    // ✅ Description and location text
    description: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true  // 🔹 Add this to make sure it's always provided
    },

    // ✅ Array of Cloudinary image URLs
    images: {
      type: [String],
      default: [], // 🔹 Safer than required:true, in case no image is uploaded yet
    },

    // ✅ Complaint status lifecycle
    status: { 
      type: String, 
      enum: ["OPEN", "IN PROGRESS", "RESOLVED"], 
      default: "OPEN" 
    },

    // ✅ Auto timestamps (manual optional)
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  }
);

// ✅ Automatically update `updatedAt` on save
complaintSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});



// ✅ Virtual field for Overdue status
complaintSchema.virtual("isOverdue").get(function () {
  // Overdue if still OPEN or IN PROGRESS and older than 3 days
  const threeDays = 3 * 24 * 60 * 60 * 1000; // ms in 3 days
  // const threeDays = 5000; // ms in 3 days
  const age = Date.now() - this.createdAt.getTime();
  return age > threeDays && this.status !== "RESOLVED";
});

// ✅ Ensure virtuals are included in JSON responses
complaintSchema.set("toJSON", { virtuals: true });
complaintSchema.set("toObject", { virtuals: true });
// ✅ (Optional) Add index for faster geospatial or citizen-based queries
// complaintSchema.index({ citizenId: 1 });
// complaintSchema.index({ location: '2dsphere' });

export const Complaint =
  mongoose.models.Complaint || mongoose.model("Complaint", complaintSchema);
