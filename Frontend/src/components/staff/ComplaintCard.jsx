import React from "react";

const ComplaintCard = ({ complaint, onStatusChange }) => {
  const { _id, type, description, location, status, createdAt, citizenId } = complaint;

  return (
    <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
      <h3 className="font-semibold text-gray-800">{type}</h3>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      <p className="text-gray-500 text-xs mt-2">📍 {location}</p>
      <p className="text-gray-400 text-xs mt-1">
        Reported by {citizenId?.firstName} {citizenId?.lastName}
      </p>
      <p className="text-gray-400 text-xs mt-1">
        Created: {new Date(createdAt).toLocaleDateString()}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "RESOLVED"
              ? "bg-green-100 text-green-700"
              : status === "IN PROGRESS"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {status}
        </span>

        {status !== "RESOLVED" && (
          <button
            onClick={() => onStatusChange(_id, "RESOLVED")}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700"
          >
            Mark as Resolved
          </button>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;
