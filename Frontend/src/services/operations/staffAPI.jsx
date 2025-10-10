<<<<<<< HEAD
// src/services/operations/staffAPI.js
import { apiConnector } from "../apiconnector.jsx";

const BASE_URL = "http://localhost:8000/api/v1/admin";

export const staffEndpoints = {
  GET_PENDING_REQUESTS: BASE_URL + "/get-pending-requests",
  APPROVE_STAFF: BASE_URL + "/approve-staff",
  REJECT_STAFF: BASE_URL + "/reject-staff",
  UPDATE_STAFF: (userId) => BASE_URL + `/update-staff/${userId}`,
  DELETE_STAFF: (userId) => BASE_URL + `/delete-staff/${userId}`,
};

/* -------------------------------------------------------------------------- */
/* 🧰 Staff / Admin Operations */
/* -------------------------------------------------------------------------- */

// ✅ Get all pending staff requests
export const getPendingRequests = async () => {
  try {
    const response = await apiConnector("GET", staffEndpoints.GET_PENDING_REQUESTS);
    console.log("📡 getPendingRequests response:", response.data);
    return response.data.data; // always array
  } catch (error) {
    console.error("❌ Error fetching pending staff:", error);
    return [];
  }
};

// ✅ Approve staff request
export const approveStaff = async (userId) => {
  try {
    const response = await apiConnector("PATCH", staffEndpoints.APPROVE_STAFF, {
      userId,
    });
    console.log("✅ Staff approved:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error approving staff:", error);
    throw error;
  }
};

// ✅ Reject staff request
export const rejectStaff = async (userId) => {
  try {
    const response = await apiConnector("POST", staffEndpoints.REJECT_STAFF, {
      userId,
    });
    console.log("🚫 Staff rejected:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error rejecting staff:", error);
    throw error;
  }
};

// ✅ Update staff profile
export const updateStaff = async (userId, data) => {
  try {
    const response = await apiConnector("PATCH", staffEndpoints.UPDATE_STAFF(userId), data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating staff:", error);
    throw error;
  }
};

// ✅ Delete staff
export const deleteStaffAccount = async (userId) => {
  try {
    const response = await apiConnector("DELETE", staffEndpoints.DELETE_STAFF(userId));
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting staff:", error);
    throw error;
  }
=======
import axios from "axios";
const BASE_URL = "http://localhost:8000/api/v1/staff";

export const getStaffDashboardAPI = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.dashboard;
};

export const getStaffComplaintsAPI = async (token, status) => {
  const { data } = await axios.get(`${BASE_URL}/complaints?status=${status}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.complaints;
};

export const updateComplaintStatusAPI = async (token, complaintId, status) => {
  const { data } = await axios.put(
    `${BASE_URL}/complaints/${complaintId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data.complaint;
>>>>>>> 3169489 (Staff feature ready)
};
