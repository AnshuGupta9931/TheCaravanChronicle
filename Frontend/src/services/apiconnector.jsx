// src/services/apiconnector.jsx
import axios from "axios";

export const apiConnector = async (method, url, bodyData = null, headers = {}) => {
  try {
    // 🔒 Add token automatically if available
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      method,
      url,
      data: bodyData,
      headers,
      withCredentials: true,
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("API ERROR ->", error);
    throw error;
  }
};
