import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import StaffCard from "../../components/common/StaffCard";
import {
  getPendingRequests,
  approveStaff,
  rejectStaff,
} from "../../services/operations/staffAPI";

const StaffRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch pending staff from backend
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getPendingRequests();
      console.log("📡 Pending staff fetched:", data);
      setRequests(data || []);
    } catch (error) {
      console.error("❌ Error fetching staff requests:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve request
  const handleApprove = async (id) => {
    try {
      await approveStaff(id);
      fetchRequests(); // refresh list
    } catch (error) {
      console.error("❌ Error approving staff:", error);
    }
  };

  // ✅ Reject request
  const handleReject = async (id) => {
    try {
      await rejectStaff(id);
      fetchRequests(); // refresh list
    } catch (error) {
      console.error("❌ Error rejecting staff:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 via-emerald-600 to-rose-500">
      {/* ✅ Admin Navbar */}
      <AdminHeader />

      {/* ✅ Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Pending Staff Requests
          </h2>

          {/* ✅ Loading */}
          {loading ? (
            <p className="text-center text-gray-500">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-center text-gray-500">
              No pending staff requests.
            </p>
          ) : (
            <div className="space-y-4">
              {requests.map((staff) => (
                <div
                  key={staff._id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow"
                >
                  {/* Staff Info */}
                  <StaffCard staff={staff} />

                  {/* Approve / Reject */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(staff._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(staff._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StaffRequests;
