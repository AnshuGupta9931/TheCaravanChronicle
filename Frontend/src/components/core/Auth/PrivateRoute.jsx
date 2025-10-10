import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, allowedRoles = [] }) => {
  const { token, loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector((state) => state.profile);

  console.log("🔐 PrivateRoute Debug:", { token, user, allowedRoles });

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg">
        Checking authorization...
      </div>
    );
  }

  if (!token || !user) {
    console.log("🚫 Redirecting: Missing token or user");
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.accountType?.toLowerCase();
  console.log("User role is ", userRole);
  const normalizedAllowedRoles = allowedRoles.map((r) => r.toLowerCase());
  console.log(normalizedAllowedRoles);

  if (allowedRoles.length > 0 && !normalizedAllowedRoles.includes(userRole)) {
    console.warn("🚫 Unauthorized role:", userRole);
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Access Denied – Unauthorized Role
      </div>
    );
  }

  return element;
};

export default PrivateRoute;
