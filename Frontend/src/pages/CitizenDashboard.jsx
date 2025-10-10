import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header.jsx";
import StatsWidget from "../components/common/StatsWidget.jsx";
import ComplaintList from "../components/Dashboards/ComplaintList.jsx";
import ComplaintHeatmap from "./ComplaintHeatmap.jsx";
import { getMyComplaints } from "../services/operations/compAPI.jsx";
import { Button } from "../components/ui/button.jsx";

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  const [complaints, setComplaints] = useState([]);
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await getMyComplaints();
      const complaintData = response?.data?.complaints || response?.complaints || [];

      // Sort by newest
      const sortedComplaints = [...complaintData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setComplaints(sortedComplaints);
      setRecentComplaints(sortedComplaints.slice(0, 3));
    } catch (error) {
      console.error("❌ Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const activeCount = complaints.filter((c) => c.status !== "RESOLVED").length;
  const resolvedCount = complaints.filter((c) => c.status === "RESOLVED").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 relative">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-10">
          
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-white drop-shadow-md">
              Citizen Dashboard
            </h2>

            <Button
              onClick={() => navigate("/dashboard/create-complaint")}
              className="bg-gradient-to-r from-circus-red to-[#ee5566] hover:from-[#ee5566] hover:to-circus-red text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-transform transform hover:scale-105"
            >
              + Submit New Complaint
            </Button>
          </div>

          {/* Dashboard Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* ✅ Replaced SubmitCard with Heatmap */}
            <div className="md:col-span-2 bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl shadow-lg p-3 hover:shadow-xl transition">
              <ComplaintHeatmap />
            </div>

            {/* Stats Widget */}
            <div className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl shadow-lg p-5 hover:shadow-xl transition">
              <StatsWidget
                active={activeCount}
                resolved={resolvedCount}
                total={complaints.length}
              />
            </div>

            {/* Recent Complaints */}
            <div className="md:col-span-3 bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl shadow-lg p-6 mt-8 hover:shadow-xl transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Recent Complaints
                </h3>
                <button
                  onClick={() => navigate("/dashboard/my-complaints")}
                  className="text-circus-red hover:text-[#ee5566] font-medium transition"
                >
                  View All →
                </button>
              </div>

              {loading ? (
                <p className="text-center text-gray-700">Loading complaints...</p>
              ) : recentComplaints.length === 0 ? (
                <p className="text-center text-gray-700">
                  No recent complaints found.
                </p>
              ) : (
                <ComplaintList complaints={recentComplaints} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;
