import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, allowedRoles }) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  console.log("PrivateRoute check -> token:", token, "user:", user);

  // 1️⃣ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Role check (if roles are restricted)
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ Authorized → render the requested element
  return element;
};

export default PrivateRoute;
