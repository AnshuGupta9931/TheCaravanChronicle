import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComplaintById } from "../../services/operations/compAPI.jsx";
import StatusPill from "../../components/common/StatusPill.jsx";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const AdminComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch complaint by ID
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await getComplaintById(id);
        if (response?.data?.complaint) {
          setComplaint(response.data.complaint);
        //   console.log(complaint.citizenId);
        } else {
          toast.error("Complaint not found");
          navigate("/admin/all-complaints");
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

  if (loading)
    return <div className="text-center mt-20 text-gray-500 text-lg">Loading complaint...</div>;

  if (!complaint)
    return <div className="text-center mt-20 text-gray-500 text-lg">Complaint not found.</div>;

//   console.log(complaint, complaint?.citizenId);

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
          <label className="block font-semibold mb-2 text-gray-800">Complaint Images</label>
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
        <p className="text-gray-700">{complaint.description}</p>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-gray-800">Location</label>
        <p className="text-gray-700">{complaint.location}</p>
      </div>

      {/* Citizen Info */}
      {complaint.citizenId && (
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-800">Submitted By</label>
          <p className="text-gray-700">
            {complaint.citizenId.firstName} {complaint.citizenId.lastName} <br />
            <span className="text-sm text-gray-500">{complaint.citizenId.email}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminComplaintDetails;
