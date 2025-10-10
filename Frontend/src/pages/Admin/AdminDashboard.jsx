import React from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import ComplaintStatsWidget from "../../components/Admin/ComplaintStatsWidget";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 via-emerald-600 to-rose-500">
      {/* Admin Header */}
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <ComplaintStatsWidget />
      </main>
      {/* Page Body (empty for now) */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white">Welcome to Admin Dashboard</h1>
        <p className="text-white/90 mt-2">
          This is your admin panel. More widgets and stats will be added here later.
        </p>
      </main>
    </div>
  );
};

export default AdminDashboard;
