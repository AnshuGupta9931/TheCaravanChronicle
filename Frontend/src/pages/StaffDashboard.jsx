import React, { useEffect, useState } from "react";
import { getStaffDashboardAPI } from "../services/operations/staffAPI.jsx";
import StatsWidget from "../components/staff/StatsWidget.jsx";
import { useSelector } from "react-redux";

const StaffDashboard = () => {
  const [stats, setStats] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStaffDashboardAPI(token);
        console.log("data in staffdash: ",data);
        setStats(data);
      } catch (error) {
        console.error("Dashboard fetch failed:", error);
      }
    };
    fetchData();
  }, [token]);

  if (!stats) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Staff Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsWidget label="Open" value={stats.open} />
        <StatsWidget label="In Progress" value={stats.inProgress} />
        <StatsWidget label="Resolved" value={stats.resolved} />
        <StatsWidget label="Overdue" value={stats.overdue} />
      </div>

      <div className="mt-8">
        <p className="text-gray-600">
          Welcome! Here you can view and manage your assigned complaints.
        </p>
      </div>
    </div>
  );
};

export default StaffDashboard;
