import { apiConnector } from "../apiconnector.jsx";
const BASE_URL = "http://localhost:8000/api/v1";

// COMPLAINT ENDPOINTS
export const complaintEndpoints = {
  CREATE_COMPLAINT_API: BASE_URL + "/complaints/create",
  GET_MY_COMPLAINTS_API: BASE_URL + "/complaints/my-complaints",
  GET_ALL_COMPLAINTS_API: BASE_URL + "/complaints/all",
  UPDATE_COMPLAINT_STATUS_API: (id) => BASE_URL + `/complaints/${id}/status`,
};

// Create Complaint (Citizen)
export const createComplaint = async (formData) => {
  const headers = { "Content-Type": "multipart/form-data" };
  return await apiConnector(
    "POST",
    complaintEndpoints.CREATE_COMPLAINT_API,
    formData,
    headers
  );
};

// Get Complaints (Citizen)
export const getMyComplaints = async () => {
  return await apiConnector("GET", complaintEndpoints.GET_MY_COMPLAINTS_API);
};

// Get All Complaints (Staff/Admin)
export const getAllComplaints = async () => {
  return await apiConnector("GET", complaintEndpoints.GET_ALL_COMPLAINTS_API);
};

// Update Complaint Status (Staff/Admin)
export const updateComplaintStatus = async (id, status) => {
  return await apiConnector(
    "PATCH",
    complaintEndpoints.UPDATE_COMPLAINT_STATUS_API(id),
    { status }
  );
};
