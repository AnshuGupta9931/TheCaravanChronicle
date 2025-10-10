import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComplaintById, updateComplaint } from "../services/operations/compAPI.jsx";
import StatusPill from "../components/common/StatusPill.jsx";
import { toast } from "react-hot-toast";

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    images: [],
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch complaint by ID
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await getComplaintById(id);
        if (response?.data?.complaint) {
          setComplaint(response.data.complaint);
          setFormData({
            description: response.data.complaint.description || "",
            location: response.data.complaint.location || "",
            images: [],
          });
        } else {
          toast.error("Complaint not found");
          navigate("/dashboard/my-complaints");
        }
      } catch (err) {
        console.error("Error fetching complaint:", err);
        toast.error("Failed to load complaint details");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id, navigate]);

  // ✅ Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  // ✅ Save updates
  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("description", formData.description);
      formDataToSend.append("location", formData.location);

      // ✅ Attach new images (if any)
      if (formData.images && formData.images.length > 0) {
        for (let i = 0; i < formData.images.length; i++) {
          formDataToSend.append("images", formData.images[i]);
        }
      }

      const res = await updateComplaint(id, formDataToSend, true);
      toast.success("Complaint updated successfully");
      setComplaint(res.data.complaint);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating complaint:", err);
      toast.error("Failed to update complaint");
    }
  };

  if (loading)
    return <div className="text-center mt-20 text-gray-500 text-lg">Loading complaint...</div>;

  if (!complaint)
    return <div className="text-center mt-20 text-gray-500 text-lg">Complaint not found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-circus-dark">{complaint.type}</h1>
        <StatusPill status={complaint.status} />
      </div>

      {/* Image Preview */}
      {complaint.images?.length > 0 && (
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-800">Existing Images</label>
          <div className="flex flex-wrap gap-4">
            {complaint.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Complaint Image ${idx + 1}`}
                className="w-40 h-40 object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-gray-800">Description</label>
        {isEditing ? (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-circus-red focus:outline-none"
            rows="4"
          />
        ) : (
          <p className="text-gray-700">{complaint.description}</p>
        )}
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-gray-800">Location</label>
        {isEditing ? (
          <input
            type="text"
            name="location"
            value={formData.location?.address || formData.location || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: {
                  ...(formData.location || {}),
                  address: e.target.value,
                },
              })
            }
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-circus-red focus:outline-none"
          />
        ) : (
          <p className="text-gray-700">
            {complaint.location?.address || "No address available"}
          </p>
        )}
      </div>

      {/* Image Upload (Edit mode only) */}
      {isEditing && (
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-800">Upload New Images</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-circus-red focus:outline-none"
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end space-x-4 mt-8 border-t border-gray-200 pt-4">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 rounded-lg bg-gray-300 text-black font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-circus-red text-yellow font-semibold hover:bg-circus-gold transition"
            >
              Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2 rounded-lg bg-circus-red text-yellow font-semibold hover:bg-circus-gold transition"
          >
            Edit Complaint
          </button>
        )}
      </div>
    </div>
  );
};

export default ComplaintDetails;
