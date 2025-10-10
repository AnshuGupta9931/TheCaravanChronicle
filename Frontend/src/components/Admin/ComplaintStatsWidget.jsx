import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getComplaintStats } from "../../services/operations/compAPI";

const COLORS = ["#ef4444", "#facc15", "#22c55e"]; // Red=open, Yellow=in progress, Green=resolved

const ComplaintStatsWidget = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getComplaintStats();
        console.log("📊 Stats received in widget:", data);
        setStats(data);
      } catch (err) {
        console.error("❌ Error fetching complaint stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center">
        Loading complaint stats...
      </div>
    );
  }

  const pieData = [
    { name: "Open", value: stats.open },
    { name: "In Progress", value: stats.inProgress },
    { name: "Resolved", value: stats.resolved },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center">
      {/* Pie Chart */}
      <div className="w-full md:w-1/2 h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Summary */}
      <div className="w-full md:w-1/2 space-y-3 mt-6 md:mt-0 md:ml-6">
        <h3 className="text-xl font-bold text-gray-800">Complaint Summary</h3>
        <p className="text-gray-700">📌 Total: {stats.total}</p>
        <p className="text-red-500">🟥 Open: {stats.open}</p>
        <p className="text-yellow-500">🟨 In Progress: {stats.inProgress}</p>
        <p className="text-green-500">🟩 Resolved: {stats.resolved}</p>
        <p className="text-purple-500">⚠️ Overdue: {stats.overdue}</p>
      </div>
    </div>
  );
};

export default ComplaintStatsWidget;
