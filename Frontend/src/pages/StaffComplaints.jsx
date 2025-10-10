import React, { useEffect, useState } from "react";
import { getStaffComplaintsAPI, updateComplaintStatusAPI } from "../services/operations/staffAPI";
import { useSelector } from "react-redux";
import ComplaintCard from "../components/staff/ComplaintCard";

const tabs = [
  { label: "Active", key: "active" },
  { label: "Resolved", key: "resolved" },
  { label: "Overdue", key: "overdue" },
];

const StaffComplaints = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [complaints, setComplaints] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchComplaints = async () => {
      const data = await getStaffComplaintsAPI(token, activeTab);
      setComplaints(data);
    };
    fetchComplaints();
  }, [activeTab, token]);

  const handleStatusChange = async (id, newStatus) => {
    await updateComplaintStatusAPI(token, id, newStatus);
    const data = await getStaffComplaintsAPI(token, activeTab);
    setComplaints(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Complaints</h2>

      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl font-medium ${
              activeTab === tab.key ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {complaints.length === 0 ? (
        <p className="text-gray-600">No complaints found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complaints.map((c) => (
            <ComplaintCard
              key={c._id}
              complaint={c}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffComplaints;
