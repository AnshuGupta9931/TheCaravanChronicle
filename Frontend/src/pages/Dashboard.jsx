import React, { useEffect, useState } from "react";
import ComplaintForm from "../components/Dashboards/ComplaintForm";
import ComplaintList from "../components/Dashboards/ComplaintList";
import { getMyComplaints, getAllComplaints } from "../services/operations/compAPI.jsx";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
  
    console.log("Dashboard check -> token:", token, "user:", user); // { role: "citizen" | "staff" | "admin" }
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const res =
      user.role === "citizen" ? await getMyComplaints() : await getAllComplaints();
    setComplaints(res.data.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">
        {user.role === "citizen"
          ? "My Complaints"
          : user.role === "staff"
          ? "Staff Complaint Dashboard"
          : "Admin Complaint Dashboard"}
      </h1>

      {user.role === "citizen" && (
        <ComplaintForm onSubmitted={fetchComplaints} />
      )}

      <ComplaintList complaints={complaints} userRole={user.role} refresh={fetchComplaints} />
    </div>
  );
};

export default Dashboard;
