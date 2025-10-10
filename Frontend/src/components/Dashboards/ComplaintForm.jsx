import React, { useState } from "react";
import { createComplaint } from "../../services/operations/compAPI.jsx";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    category: "Roads & Pathways",
    address: "",
    latitude: "",
    longitude: "",
    images: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const categories = [
    "Roads & Pathways",
    "Water Issues (Leaks, Drainage)",
    "Electricity & Lighting",
    "Garbage & Sanitation",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const getCoordinatesFromAddress = async () => {
    if (!formData.address.trim()) {
      alert("Please enter a location name first.");
      return;
    }

    try {
      setIsLocating(true);
      const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

      const res = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
          formData.address
        )}.json?key=${MAPTILER_KEY}`
      );

      const data = await res.json();

      if (data?.features?.length > 0) {
        const { coordinates } = data.features[0].geometry;
        const [lng, lat] = coordinates;

        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));

        alert(`Location found: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      } else {
        alert("Could not find that location. Please try a different name.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      alert("Failed to find coordinates for that location.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("type", formData.category);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("latitude", formData.latitude);
      formDataToSend.append("longitude", formData.longitude);
      formDataToSend.append("address", formData.address);
      if (formData.images) formDataToSend.append("images", formData.images);

      const response = await createComplaint(formDataToSend);

      if (response?.data?.success) {
        alert("Complaint submitted successfully!");
        setFormData({
          description: "",
          category: "Roads & Pathways",
          address: "",
          latitude: "",
          longitude: "",
          images: null,
        });
      } else {
        alert(response?.data?.message || "Failed to submit complaint.");
      }
    } catch (err) {
      console.error("Complaint submission failed:", err);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-red-600">Submit a New Complaint</h2>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
          required
        />
      </div>

      {/* Address (text input) */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Location / Address
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter location name (e.g. MG Road, Pune)"
            className="flex-grow border border-gray-300 rounded-lg p-3"
            required
          />
          <button
            type="button"
            onClick={getCoordinatesFromAddress}
            disabled={isLocating}
            className={`px-4 py-2 rounded-lg font-semibold text-white ${
              isLocating
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLocating ? "Locating..." : "Find"}
          </button>
        </div>
      </div>

      {/* Optional: show lat/lng for clarity */}
      {formData.latitude && formData.longitude && (
        <p className="text-sm text-gray-600">
          📍 Coordinates: {formData.latitude}, {formData.longitude}
        </p>
      )}

      {/* Upload Image */}
      <div>
        <label className="block text-sm font-semibold mb-1">Upload Image</label>
        <input
          type="file"
          name="images"
          onChange={handleChange}
          accept="image/*"
          className="w-full text-gray-600"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 text-white font-semibold rounded-lg transition ${
          isSubmitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit Complaint"}
      </button>
    </form>
  );
};

export default ComplaintForm;
