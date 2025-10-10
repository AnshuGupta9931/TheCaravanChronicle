import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import ComplaintCard from "./ComplaintCard";
import { getAllComplaints } from "../../services/operations/compAPI";

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch complaints
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await getAllComplaints();
      console.log("📡 API Raw Response:", response);

      // complaints are inside response.data.data
      const complaintData = response?.data?.data || [];
      if (Array.isArray(complaintData)) {
        setComplaints(complaintData);
      } else {
        setComplaints([]);
      }
    } catch (error) {
      console.error("❌ Error fetching complaints:", error);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ✅ Filter complaints
  const filteredComplaints = (complaints || []).filter((c) => {
    if (filterStatus === "All") return true;
    if (filterStatus === "OVERDUE") return c.isOverdue;
    return c.status?.toUpperCase() === filterStatus.toUpperCase();
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 via-emerald-600 to-rose-500">
      {/* ✅ Top Header */}
      <AdminHeader />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            All Complaints ({complaints.length})
          </h2>

          {/* ✅ Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8 bg-white p-4 rounded-xl shadow-md">
            {[
              { label: "All", value: "All", activeColor: "bg-blue-600" },
              { label: "Open", value: "OPEN", activeColor: "bg-green-600" },
              {
                label: "In Progress",
                value: "IN PROGRESS",
                activeColor: "bg-yellow-500",
              },
              { label: "Resolved", value: "RESOLVED", activeColor: "bg-gray-700" },
              { label: "Overdue", value: "OVERDUE", activeColor: "bg-red-600" },
            ].map((btn) => {
              const isActive = filterStatus === btn.value;
              const activeClasses = `${btn.activeColor} text-white border-transparent`;
              const inactiveClasses =
                "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:text-gray-900";

              return (
                <button
                  key={btn.value}
                  onClick={() => setFilterStatus(btn.value)}
                  className={`px-4 py-2 rounded-full font-semibold border transition focus:outline-none
                    ${isActive ? activeClasses : inactiveClasses}`}
                >
                  {btn.label} (
                  {btn.value === "All"
                    ? complaints.length
                    : btn.value === "OVERDUE"
                    ? complaints.filter((c) => c.isOverdue).length
                    : complaints.filter(
                        (c) =>
                          c.status?.toUpperCase() === btn.value.toUpperCase()
                      ).length}
                  )
                </button>
              );
            })}
          </div>

          {/* ✅ Complaint List */}
          {loading ? (
            <p className="text-center text-gray-500">Loading complaints...</p>
          ) : filteredComplaints.length === 0 ? (
            <p className="text-center text-gray-500">
              No complaints found matching filter.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <ComplaintCard key={complaint._id} complaint={complaint} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllComplaints;
