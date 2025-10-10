// src/services/operations/staffAPI.jsx
import axios from "axios";
import { apiConnector } from "../apiconnector.jsx";

/* -------------------------------------------------------------------------- */
/* 🌐 Base URLs */
/* -------------------------------------------------------------------------- */
const ADMIN_BASE_URL = "http://localhost:8000/api/v1/admin";
const STAFF_BASE_URL = "http://localhost:8000/api/v1/staff";

/* -------------------------------------------------------------------------- */
/* 👩‍💼 ADMIN STAFF MANAGEMENT ENDPOINTS */
/* -------------------------------------------------------------------------- */
export const staffEndpoints = {
  GET_PENDING_REQUESTS: ADMIN_BASE_URL + "/get-pending-requests",
  APPROVE_STAFF: ADMIN_BASE_URL + "/approve-staff",
  REJECT_STAFF: ADMIN_BASE_URL + "/reject-staff",
  UPDATE_STAFF: (userId) => ADMIN_BASE_URL + `/update-staff/${userId}`,
  DELETE_STAFF: (userId) => ADMIN_BASE_URL + `/delete-staff/${userId}`,
};

// ✅ Get all pending staff requests
export const getPendingRequests = async () => {
  try {
    const response = await apiConnector("GET", staffEndpoints.GET_PENDING_REQUESTS);
    console.log("📡 getPendingRequests response:", response.data);
    return response.data.data;
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
};

/* -------------------------------------------------------------------------- */
/* 🧰 STAFF DASHBOARD OPERATIONS */
/* -------------------------------------------------------------------------- */

// ✅ Fetch dashboard stats for staff
export const getStaffDashboardAPI = async (token) => {
  const { data } = await axios.get(`${STAFF_BASE_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.dashboard;
};

// ✅ Fetch complaints assigned to staff
export const getStaffComplaintsAPI = async (token, status) => {
  const { data } = await axios.get(`${STAFF_BASE_URL}/complaints?status=${status}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.complaints;
};

// ✅ Update status of a specific complaint
export const updateComplaintStatusAPI = async (token, complaintId, status) => {
  const { data } = await axios.put(
    `${STAFF_BASE_URL}/complaints/${complaintId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data.complaint;
};
