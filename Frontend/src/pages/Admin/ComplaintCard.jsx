import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusPill from '../../components/common/StatusPill.jsx';

const ComplaintCard = ({ complaint }) => {
  const navigate = useNavigate();

  // ✅ Get the first uploaded image (if any)
  const imageUrl = complaint?.images?.[0] || null;

  return (
    <div className="flex items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer border border-gray-100">
      
      {/* ✅ Complaint Image or Placeholder */}
      <div className="w-16 h-16 rounded-lg mr-4 flex-shrink-0 overflow-hidden flex items-center justify-center bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={complaint.type || "Complaint image"}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-10 h-10 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 3h-3V1h-2v2h-4V1h-2v2H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 17h8v-2H8v2zm0-4h8v-2H8v2zm0-4h8V7H8v2z" />
          </svg>
        )}
      </div>

      {/* ✅ Complaint Details */}
      <div className="flex-grow">
        <h4 className="text-lg font-semibold text-circus-dark">
          {complaint.type || "Untitled Complaint"}
        </h4>
        <p className="text-sm text-gray-500 mt-1">
          Submitted:{" "}
          {complaint.createdAt
            ? new Date(complaint.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A"}
        </p>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {complaint.description || "No description provided."}
        </p>
      </div>

      {/* ✅ Status + Details Link */}
      <div className="ml-auto flex flex-col items-end">
        <StatusPill status={complaint.status} />
        <button
          onClick={() => navigate(`/admin/complaint/${complaint._id}`)}
          className="text-sm text-circus-red hover:text-circus-gold mt-2 font-medium"
        >
          View Details &rarr;
        </button>
      </div>
    </div>
  );
};

export default ComplaintCard;
