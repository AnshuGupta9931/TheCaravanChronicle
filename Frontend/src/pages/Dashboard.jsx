import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="min-h-screen">
      {/* Optional: a sidebar or header common to all dashboard pages */}
      <h1 className="text-2xl font-bold text-center mt-4">
        Welcome, {user?.firstName || "User"}!
      </h1>

      {/* 👇 This is critical */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
