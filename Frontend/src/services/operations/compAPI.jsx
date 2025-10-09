import { apiConnector } from "../apiconnector.jsx";

const BASE_URL = "http://localhost:8000/api/v1";

/* -------------------------------------------------------------------------- */
/* 🌐 Complaint Endpoints */
/* -------------------------------------------------------------------------- */

export const complaintEndpoints = {
  CREATE_COMPLAINT_API: BASE_URL + "/complaints/create",
  GET_MY_COMPLAINTS_API: BASE_URL + "/complaints/my-complaints",
  GET_ALL_COMPLAINTS_API: BASE_URL + "/complaints/all",
  GET_COMPLAINT_BY_ID_API: (id) => BASE_URL + `/complaints/${id}`,
  UPDATE_COMPLAINT_API: (id) => BASE_URL + `/complaints/${id}`,
  UPDATE_COMPLAINT_STATUS_API: (id) => BASE_URL + `/complaints/${id}/status`,
};

/* -------------------------------------------------------------------------- */
/* 🧾 Citizen Operations */
/* -------------------------------------------------------------------------- */

// ✅ Create Complaint
export const createComplaint = async (formData) => {
  const headers = { "Content-Type": "multipart/form-data" };
  return await apiConnector(
    "POST",
    complaintEndpoints.CREATE_COMPLAINT_API,
    formData,
    headers
  );
};

// ✅ Get Complaints for Logged-in Citizen
export const getMyComplaints = async () => {
  const response = await apiConnector("GET", complaintEndpoints.GET_MY_COMPLAINTS_API);
  return response?.data;
};

// ✅ Get Single Complaint by ID
export const getComplaintById = async (id) => {
  return await apiConnector("GET", complaintEndpoints.GET_COMPLAINT_BY_ID_API(id));
};

// ✅ Update Complaint (Citizen can edit description & location)
export const updateComplaint = async (id, data, isMultipart = false) => {
  const headers = isMultipart
    ? { "Content-Type": "multipart/form-data" }
    : { "Content-Type": "application/json" };

  // ✅ fixed: was `complaintsEndpoints` -> now `complaintEndpoints`
  return await apiConnector(
    "PUT",
    complaintEndpoints.UPDATE_COMPLAINT_API(id),
    data,
    headers
  );
};

/* -------------------------------------------------------------------------- */
/* 🧰 Staff / Admin Operations */
/* -------------------------------------------------------------------------- */

// ✅ Get All Complaints
export const getAllComplaints = async () => {
  return await apiConnector("GET", complaintEndpoints.GET_ALL_COMPLAINTS_API);
};

// ✅ Update Complaint Status (Only for Staff/Admin)
export const updateComplaintStatus = async (id, status) => {
  return await apiConnector(
    "PATCH",
    complaintEndpoints.UPDATE_COMPLAINT_STATUS_API(id),
    { status }
  );
};
