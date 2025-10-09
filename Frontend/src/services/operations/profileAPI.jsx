import { apiConnector } from "../apiconnector.jsx";
import { PROFILE_API } from "../apis.jsx";
import { setUser, setLoading } from "../../slices/profileSlice.jsx";
import { toast } from "react-hot-toast";

// 🧠 Fetch user profile
export const fetchUserProfile = (token) => {
  return async (dispatch) => {
    if (!token) return;
    try {
      dispatch(setLoading(true));

      const response = await apiConnector("GET", PROFILE_API.GET_PROFILE, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Profile fetch failed");
      }

      const user = response.data.data;
      if (!user) throw new Error("Empty user data");

      console.log("✅ Profile fetched:", user);
      dispatch(setUser(user));
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};


// ✏️ Update user profile
export const updateProfile = (formData, token) => async (dispatch) => {
  try {
    const isFormData = formData instanceof FormData;

    const response = await apiConnector("PUT", PROFILE_API.UPDATE, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) throw new Error(response?.data?.message);

    toast.success("✅ Profile updated successfully!");
    dispatch(setUser(response.data.user));
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    toast.error("Failed to update profile");
  }
};

