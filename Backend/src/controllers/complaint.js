import { Complaint } from "../models/Complaint.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { User } from "../models/User.js";
import { mailSender } from "../../utils/mailSender.js";

const deleteFromCloudinary = async (imageUrls) => {
  console.log("Cleanup called for:", imageUrls);
  return true; 
};

export const createComplaint = async (req, res) => {
  const citizenId = req.user._id;
  const { type, description, latitude, longitude, address } = req.body;
  const files = req.files || [];
  let imageUrls = [];

  try {
    // Validate input
    if (!type || !description || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Type, description, latitude, and longitude are required.",
      });
    }

    // Upload images to Cloudinary
    if (files.length > 0) {
      const uploadPromises = files.map((file) => uploadOnCloudinary(file.path));
      const uploadResults = await Promise.all(uploadPromises);
      imageUrls = uploadResults.map((r) => r.secure_url);
    }

    // Create new complaint with GeoJSON location
    const newComplaint = await Complaint.create({
      citizenId,
      type,
      description,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
        address,
      },
      images: imageUrls,
      status: "OPEN",
    });

    await User.findByIdAndUpdate(citizenId, {
      $push: { complaints: newComplaint._id },
    });

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
    const complaints = await Complaint.find({})
      .populate("citizenId", "firstName lastName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All complaints retrieved successfully.",
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch complaints.",
    });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ citizenId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Your complaints retrieved successfully.",
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch your complaints.",
    });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Populate citizenId with name + email only
    const complaint = await Complaint.findById(id).populate(
      "citizenId",
      "firstName lastName email"
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // ✅ Restrict citizens from accessing others' complaints
    if (
      req.user.accountType === "Citizen" &&
      complaint.citizenId._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this complaint",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Complaint retrieved successfully",
      complaint,
    });
  } catch (error) {
    console.error("Error fetching complaint by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching complaint",
      error: error.message,
    });
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { type, description, latitude, longitude, address } = req.body;
    const files = req.files || [];
    let imageUrls = [];

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    if (files.length > 0) {
      const uploadPromises = files.map((file) => uploadOnCloudinary(file.path));
      const uploadResults = await Promise.all(uploadPromises);
      imageUrls = uploadResults.map((r) => r.secure_url);
      complaint.images.push(...imageUrls);
    }

    // Update fields
    if (type) complaint.type = type;
    if (description) complaint.description = description;
    if (latitude && longitude) {
      complaint.location = {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
        address: address || complaint.location.address,
      };
    }

    await complaint.save();

    return res.status(200).json({
      success: true,
      message: "Complaint updated successfully.",
      data: complaint,
    });
  } catch (error) {
    console.error("Error updating complaint:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating complaint.",
    });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["OPEN", "IN PROGRESS", "RESOLVED", "REJECTED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be OPEN, IN PROGRESS, RESOLVED, or REJECTED.",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("citizenId", "firstName lastName email");

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    const citizen = complaint.citizenId;
    if (citizen && citizen.email) {
      const htmlTemplate = complaintStatusUpdatedEmail(
        citizen.firstName,
        complaint.type,
        status,
        complaint._id
      );

      console.log("Sending mail to:", citizen.email);

      await mailSender(
        citizen.email,
        `Your Complaint Status Has Been Updated to "${status}"`,
        htmlTemplate
      );

      console.log("Mail sent successfully to:", citizen.email);
    }

    return res.status(200).json({
      success: true,
      message: "Complaint status updated and email sent successfully.",
      data: complaint,
    });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating status.",
    });
  }
};

export const getComplaintsGeoJSON = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      "location.coordinates": { $exists: true, $ne: [] },
    });

    const features = complaints.map((c) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: c.location.coordinates, 
      },
      properties: {
        id: c._id,
        type: c.type,
        status: c.status,
        createdAt: c.createdAt,
        address: c.location.address,
      },
    }));

    return res.status(200).json({
      type: "FeatureCollection",
      features,
    });
  } catch (error) {
    console.error("Error generating GeoJSON:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate GeoJSON data for heatmap.",
    });
  }
};
