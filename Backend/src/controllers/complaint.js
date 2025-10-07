import { Complaint } from "../models/complaint.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { User } from "../models/User.js";

export const createComplaint = async (req, res) => {
  try {
    const citizenId = req.user._id;

    // const { type, description, image } = req.body;
    const { type, description, location } = req.body;

    const files = req.files;

    // Validate required fields
    if (!type || !description || !location || !files || files.length === 0) {
        return res.status(400).json({
            success: false,
            message: "All fields and at least one image are required.",
        });
    }

    // upload all images
    const uploadPromises = files.map(file => uploadOnCloudinary(file.path));
    const uploadResults = await Promise.all(uploadPromises);

    //checking if any of the images is not uploaded
    if (uploadResults.some(result => !result)) {
        return res.status(500).json({
            success: false,
            message: "One or more image uploads failed. Please try again.",
        });
    }

    const imageUrls = uploadResults.map(result => result.secure_url);

    // creata the complaint in the database
    const newComplaint = await Complaint.create({
        citizenId,
        type,
        description,
        location,
        images: imageUrls, // Save the array of URLs
        status: "OPEN",
    });

    // linking the complaint to the citizen
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
    res
      .status(500)
      .json({ message: "Server error while submitting complaint." });
  }
};


export const getAllComplaints = async (req, res) => {
    try {
        // Find all complaints
        const complaints = await Complaint.find({}).populate("citizenId", "name email") 
            // showing the newest first
            .sort({ createdAt: -1 }); 

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
        //  complaints where citizenId matches the logged-in user and sort them
        const complaints = await Complaint.find({ citizenId: req.user._id }).sort({ createdAt: -1 });
        
        // Respond with the array of complaints
        res.status(200).json(complaints);

    } catch (error) {
        console.error('Error fetching user complaints:', error);
        res.status(500).json({ message: 'Failed to fetch your complaints.' });
    }
};

export const updateComplaintStatus = async (req, res) => {
    try {
        const { id: complaintId } = req.params._id;
        const { status } = req.body;

        // Validate that the status is one of the allowed enum values from your schema
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
            { new: true, runValidators: true } // `new: true` returns the updated document
        );

        // If no complaint is found with that ID, return a 404 error
        if (!updatedComplaint) {
            return res.status(404).json({ 
                success: false,
                message: 'Complaint not found.' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Complaint status updated successfully.',
            data: updatedComplaint
        });
        
    } catch (error) {
        console.error('Error updating complaint status:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to update complaint status due to a server error.' 
        });
    }
};