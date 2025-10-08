import { Complaint } from "../models/complaint.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { User } from "../models/User.js";

// Placeholder for cleanup function (you need to implement this)
const deleteFromCloudinary = async (imageUrls) => {
    // Logic to delete files from Cloudinary using their secure_url or public_id
    console.log("Cleanup function called for:", imageUrls);
    return true; // Assume success for now
};

export const createComplaint = async (req, res) => {
  const citizenId = req.user._id;
  const { type, description, location } = req.body;
  const files = req.files;
  let imageUrls = [];

  try {
    if (!type || !description || !location || !files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields and at least one image are required.",
      });
    }

    // Upload each image to Cloudinary
    const uploadPromises = files.map((file) => uploadOnCloudinary(file.path));
    const uploadResults = await Promise.all(uploadPromises);

    if (uploadResults.some((result) => !result)) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed. Please try again.",
      });
    }

    imageUrls = uploadResults.map((r) => r.secure_url);

    const newComplaint = await Complaint.create({
      citizenId,
      type,
      description,
      location, // simple string, not geo point
      images: imageUrls,
      status: "OPEN",
    });

    await User.findByIdAndUpdate(
      citizenId,
      { $push: { complaints: newComplaint._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Complaint submitted successfully!",
      data: newComplaint,
    });
  } catch (error) {
    console.error("Error while creating complaint:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting complaint.",
    });
  }
};


export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({}).populate("citizenId", "name email").sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Complaints retrieved successfully.",
            count: complaints.length,
            data: complaints,
        });
    } catch (error) {
        console.error("Error while fetching complaints:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching complaints.",
        });
    }
};

export const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ citizenId: req.user._id }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Your complaints retrieved successfully.",
            count: complaints.length,
            data: complaints,
        });
    } catch (error) {
        console.error('Error fetching user complaints:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Failed to fetch your complaints.' 
        });
    }
};


export const updateComplaintStatus = async (req, res) => {
    try {
        // FIX: Correctly extract 'id' from req.params
        const { id: complaintId } = req.params; 
        const { status } = req.body;

        const allowedStatuses = ["OPEN", "IN PROGRESS", "RESOLVED"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid status. Must be one of: OPEN, IN PROGRESS, RESOLVED.' 
            });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            complaintId,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedComplaint) {
            return res.status(404).json({ 
                success: false,
                message: 'Complaint not found.' 
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Complaint status updated successfully.',
            data: updatedComplaint
        });
    } catch (error) {
        console.error('Error updating complaint status:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Failed to update complaint status due to a server error.' 
        });
    }
};