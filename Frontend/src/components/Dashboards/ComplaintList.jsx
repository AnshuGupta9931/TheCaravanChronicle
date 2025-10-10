import React from "react";

const statusColors = {
  OPEN: "bg-yellow-200 text-yellow-800",
  "IN PROGRESS": "bg-blue-200 text-blue-800",
  RESOLVED: "bg-green-200 text-green-800",
  REJECTED: "bg-red-200 text-red-800",
};

const ComplaintList = ({ complaints = [] }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Complaints</h3>

      {complaints.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No complaints found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {complaints.map((complaint) => (
            <div
              key={complaint._id || complaint.id}
              className="bg-gray-50 rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              {/* Complaint Image (optional) */}
              {complaint.image && (
                <img
                  src={complaint.image}
                  alt={complaint.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}

              {/* Complaint Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {complaint.type || "Untitled Complaint"}
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(complaint.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {complaint.description || "No description provided."}
                </p>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full self-start ${
                  statusColors[complaint.status?.toUpperCase()] ||
                  "bg-gray-200 text-gray-700"
                }`}
              >
                {complaint.status || "UNKNOWN"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintList;
