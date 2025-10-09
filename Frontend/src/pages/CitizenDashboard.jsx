import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header.jsx';
import SubmitCard from '../components/common/SubmitCard.jsx';
import StatsWidget from '../components/common/StatsWidget.jsx';
import ComplaintList from '../components/Dashboards/ComplaintList.jsx';
import { getMyComplaints } from '../services/operations/compAPI.jsx';
import { Button } from "../components/ui/button.jsx";

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch complaints from backend
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await getMyComplaints();

      console.log("📦 Raw API Response:", response);

      // ✅ Extract complaint array correctly
      const complaintData = response?.data?.complaints || response?.complaints || [];

      // ✅ Sort by date (most recent first) & take top 3
      const sortedComplaints = [...complaintData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const topThree = sortedComplaints.slice(0, 3);

      setComplaints(topThree);
      console.log("✅ Top 3 complaints set:", topThree);
    } catch (error) {
      console.error("❌ Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ✅ Calculate stats (based on all or top 3 visible complaints)
  const activeCount = complaints.filter((c) => c.status !== 'RESOLVED').length;
  const resolvedCount = complaints.filter((c) => c.status === 'RESOLVED').length;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Citizen Dashboard
            </h2>

            <Button
              onClick={() => navigate('/create-complaint')}
              className="bg-circus-red hover:bg-circus-gold text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
            >
              + Submit New Complaint
            </Button>
          </div>

          {/* Dashboard Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Submit Card */}
            <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-4">
              <SubmitCard />
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-md p-4">
              <StatsWidget
                active={activeCount}
                resolved={resolvedCount}
                total={complaints.length}
              />
            </div>

            {/* Complaint List Section */}
            <div className="md:col-span-3 bg-white rounded-2xl shadow-md p-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Recent Complaints
                </h3>
                <button
                  onClick={() => navigate('/dashboard/my-complaints')}
                  className="text-circus-red hover:underline font-medium"
                >
                  View All →
                </button>
              </div>

              {loading ? (
                <p className="text-center text-gray-500">Loading complaints...</p>
              ) : complaints.length === 0 ? (
                <p className="text-center text-gray-500">No recent complaints found.</p>
              ) : (
                <ComplaintList complaints={complaints} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;
