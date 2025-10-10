import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  fetchUserProfile,
  updateProfile,
} from "../../services/operations/profileAPI";
import AdminHeader from "../../components/Header/AdminHeader";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  // -------------------- Local state for modals --------------------
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);

  // -------------------- Local form data --------------------
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    gender: "",
    dateOfBirth: "",
    about: "",
    image: "https://via.placeholder.com/100",
    imageFile: null,
  });

  // ✅ Fetch latest profile from backend when token available
  useEffect(() => {
    // ✅ Fetch only once when no user data but token exists
    if (token && !user) {
      console.log("📡 Fetching profile once...");
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]); // 🚫 remove 'user' from dependency list

  // ✅ Update local form data when Redux user updates
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        contactNumber: user.additionalDetails?.contactNumber || "",
        gender: user.additionalDetails?.gender || "",
        dateOfBirth: user.additionalDetails?.dateOfBirth || "",
        about: user.additionalDetails?.about || "",
        image: user.image || "https://via.placeholder.com/100",
        imageFile: null,
      });
    }
  }, [user]);

  // -------------------- Handlers --------------------
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        image: URL.createObjectURL(file),
      });
    }
  };

  // ✅ Save Handler (update backend + Redux + localStorage)
  const handleSave = async (section) => {
    try {
      let payload;

      // ✅ If an image file is selected, use FormData
      if (formData.imageFile) {
        payload = new FormData();
        payload.append("firstName", formData.firstName);
        payload.append("lastName", formData.lastName);
        payload.append("email", formData.email);
        payload.append("about", formData.about);
        payload.append("contactNumber", formData.contactNumber);
        payload.append("gender", formData.gender);
        payload.append("dateOfBirth", formData.dateOfBirth);
        payload.append("image", formData.imageFile);
      } else {
        // ✅ Otherwise send JSON
        payload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          about: formData.about,
          contactNumber: formData.contactNumber,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          image: formData.image,
        };
      }

      await dispatch(updateProfile(payload, token));
      toast.success(`${section} updated successfully!`);
    } catch (err) {
      console.error("❌ Failed to update profile:", err);
      toast.error("Failed to update profile");
    } finally {
      setIsEditingProfile(false);
      setIsEditingAbout(false);
      setIsEditingPersonal(false);
    }
  };

  const imageUrl = formData?.image || null;

  // -------------------- UI --------------------
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 p-8 text-white">

      <div className="max-w-4xl mx-auto space-y-8">

      <AdminHeader />
        {/* ✅ Page Header */}

        <h1 className="text-4xl font-bold text-center mb-8">My Profile</h1>

        {/* ✅ Profile Card */}
        <div className="bg-gray-900 bg-opacity-70 p-6 rounded-2xl shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={imageUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-green-400 object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-gray-300">{formData.email}</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditingProfile(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg flex items-center space-x-1"
          >
            <span>Edit</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-3 6h12"
              />
            </svg>
          </button>
        </div>

        {/* ✅ About Card */}
        <div className="bg-gray-900 bg-opacity-70 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">About</h3>
            <button
              onClick={() => setIsEditingAbout(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-1.5 rounded-lg"
            >
              Edit
            </button>
          </div>
          <p className="text-gray-300">
            {formData.about || "No bio added yet."}
          </p>
        </div>

        {/* ✅ Personal Details Card */}
        <div className="bg-gray-900 bg-opacity-70 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Personal Details</h3>
            <button
              onClick={() => setIsEditingPersonal(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-1.5 rounded-lg"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-2 gap-y-3 text-gray-300">
            <div>
              <p className="text-sm font-semibold text-gray-400">First Name</p>
              <p>{formData.firstName || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-400">Last Name</p>
              <p>{formData.lastName || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-400">Email</p>
              <p>{formData.email || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-400">
                Phone Number
              </p>
              <p>{formData.contactNumber || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-400">Gender</p>
              <p>{formData.gender || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-400">
                Date of Birth
              </p>
              <p>{formData.dateOfBirth || "-"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- Modals -------------------- */}
      {isEditingProfile && (
        <Modal
          title="Edit Profile"
          onClose={() => setIsEditingProfile(false)}
          onSave={() => handleSave("Profile")}
        >
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <img
                src={formData.image}
                alt="Preview"
                className="w-24 h-24 rounded-full border-2 border-green-400 object-cover mb-3"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-300"
              />
            </div>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
          </div>
        </Modal>
      )}

      {isEditingAbout && (
        <Modal
          title="Edit About"
          onClose={() => setIsEditingAbout(false)}
          onSave={() => handleSave("About")}
        >
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 rounded bg-gray-800 text-white"
            placeholder="Write something about yourself..."
          />
        </Modal>
      )}

      {isEditingPersonal && (
        <Modal
          title="Edit Personal Details"
          onClose={() => setIsEditingPersonal(false)}
          onSave={() => handleSave("Personal Details")}
        >
          <div className="space-y-4">
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            <input
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            <input
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              placeholder="Date of Birth"
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

// -------------------- Reusable Modal --------------------
const Modal = ({ title, onClose, onSave, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-2xl w-96 shadow-lg text-white space-y-4">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      {children}
      <div className="flex justify-end space-x-2 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

export default AdminProfile;
