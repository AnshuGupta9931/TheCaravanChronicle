// import mongoose from "mongoose";

// const complaintSchema = new mongoose.Schema(
//     {
//         citizenId: { type: ObjectId, ref: "User" },
//         type: { type: String, enum: ["Road Damage", "Water Leakage", "Garbage"] },
//         description: String,
//         location: String,
//         image: [String],
//         status: { type: String, enum: ["OPEN", "IN PROGRESS", "RESOLVED"], default: "OPEN" },
//         createdAt: { type: Date, default: Date.now },
//         updatedAt: Date
//     }
// )

// export const Complaint = mongoose.model("Complaint", complaintSchema);


import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        citizenId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true 
        },
        type: { 
            type: String, 
            enum: ["Road Damage", "Water Leakage", "Garbage"],
            required: true 
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type : String
            // type: {
            //     type: String,
            //     enum: ['Point'],
            //     required: true
            // },
            // coordinates: {
            //     type: [Number], // [longitude, latitude]
            //     required: true
            // }
        },
        images: {
            type: [String],
            required: true
        },
        status: { 
            type: String, 
            enum: ["OPEN", "IN PROGRESS", "RESOLVED"], 
            default: "OPEN" 
        },
        // Manually added createdAt timestamp
        createdAt: {
            type: Date,
            default: Date.now,
        },
        // Manually added updatedAt timestamp
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    }
    // The timestamps: true option has been removed
);

// Middleware hook to automatically update the `updatedAt` field on every save
complaintSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Add a 2dsphere index for efficient geospatial queries
// complaintSchema.index({ location: '2dsphere' });

export const Complaint = mongoose.model("Complaint", complaintSchema);

