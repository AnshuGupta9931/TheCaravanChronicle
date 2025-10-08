import React from "react";
import { updateComplaintStatus } from "../../services/operations/compAPI.jsx";

const ComplaintList = ({ complaints, userRole, refresh }) => {
  const handleStatusChange = async (id, newStatus) => {
    await updateComplaintStatus(id, newStatus);
    refresh();
  };

  return (
    <div className="grid gap-4 mt-4">
      {complaints.map((c) => (
        <div key={c._id} className="bg-white p-4 rounded-xl shadow border">
          <div className="flex justify-between">
            <h3 className="font-bold">{c.type}</h3>
            <span
              className={`px-2 py-1 rounded text-sm ${
                c.status === "OPEN"
                  ? "bg-yellow-100 text-yellow-700"
                  : c.status === "IN PROGRESS"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {c.status}
            </span>
          </div>
          <p className="text-gray-600">{c.description}</p>
          <p className="text-sm text-gray-400">📍 {c.location}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {c.images.map((img, i) => (
              <img key={i} src={img} alt="" className="w-24 h-24 object-cover rounded-lg" />
            ))}
          </div>

          {userRole !== "citizen" && (
            <div className="mt-3 flex gap-2">
              {["OPEN", "IN PROGRESS", "RESOLVED"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(c._id, status)}
                  className={`px-3 py-1 rounded text-sm border ${
                    c.status === status ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
