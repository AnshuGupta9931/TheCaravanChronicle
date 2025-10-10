import { apiConnector } from "../apiconnector.jsx";

const BASE_URL = "http://localhost:8000/api/v1";

export const complaintEndpoints = {
  CREATE_COMPLAINT_API: BASE_URL + "/complaints/create",
  GET_MY_COMPLAINTS_API: BASE_URL + "/complaints/my-complaints",
  GET_ALL_COMPLAINTS_API: BASE_URL + "/complaints/all",
  GET_COMPLAINT_BY_ID_API: (id) => BASE_URL + `/complaints/${id}`,
  UPDATE_COMPLAINT_API: (id) => BASE_URL + `/complaints/${id}`,
  UPDATE_COMPLAINT_STATUS_API: (id) => BASE_URL + `/complaints/${id}/status`,
  GEOJSON_COMPLAINTS_API: BASE_URL +  "/complaints/heatmap/data",
};


export const createComplaint = async (formData) => {
  const headers = { "Content-Type": "multipart/form-data" };
  return await apiConnector(
    "POST",
    complaintEndpoints.CREATE_COMPLAINT_API,
    formData,
    headers
  );
};

export const getMyComplaints = async () => {
  const response = await apiConnector("GET", complaintEndpoints.GET_MY_COMPLAINTS_API);
  return response?.data;
};

export const getComplaintById = async (id) => {
  return await apiConnector("GET", complaintEndpoints.GET_COMPLAINT_BY_ID_API(id));
};

export const updateComplaint = async (id, data, isMultipart = false) => {
  const headers = isMultipart
    ? { "Content-Type": "multipart/form-data" }
    : { "Content-Type": "application/json" };

  return await apiConnector(
    "PUT",
    complaintEndpoints.UPDATE_COMPLAINT_API(id),
    data,
    headers
  );
};

export const getAllComplaints = async () => {
  return await apiConnector("GET", complaintEndpoints.GET_ALL_COMPLAINTS_API);
};

export const updateComplaintStatus = async (id, status) => {
  return await apiConnector(
    "PATCH",
    complaintEndpoints.UPDATE_COMPLAINT_STATUS_API(id),
    { status }
  );
};

const GEOJSON_COMPLAINTS_API = `${BASE_URL}/complaints/heatmap/data`;

export const getComplaintsGeoJSON = async () => {
  try {
    const response = await apiConnector("GET", GEOJSON_COMPLAINTS_API);
    return response.data;
  } catch (error) {
    console.error("Error fetching GeoJSON complaints:", error);
    return null;
  }
};