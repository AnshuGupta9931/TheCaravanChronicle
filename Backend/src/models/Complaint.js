import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        citizenId: { type: ObjectId, ref: "User" },
        type: { type: String, enum: ["Road Damage", "Water Leakage", "Garbage"] },
        description: String,
        location: String,
        image: String,
        status: { type: String, enum: ["OPEN", "IN PROGRESS", "RESOLVED"], default: "OPEN" },
        createdAt: { type: Date, default: Date.now },
        updatedAt: Date
    }
)

export const Complaint = mongoose.model("Complaint", complaintSchema);
