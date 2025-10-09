import React, { useState } from 'react';
import { createComplaint } from '../../services/operations/compAPI.jsx'; // adjust path as needed

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    category: 'Roads & Pathways',
    location: '',
    images: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Roads & Pathways",
    "Water Issues (Leaks, Drainage)",
    "Electricity & Lighting",
    "Garbage & Sanitation",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 🧩 Create FormData for backend
      const formDataToSend = new FormData();
      formDataToSend.append("type", formData.category);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("location", formData.location);
      if (formData.images) {
        formDataToSend.append("images", formData.images); // same fieldname as multer
      } // ✅ must match multer field name

      // 🧠 Call backend
      const response = await createComplaint(formDataToSend);
      console.log("Complaint created:", response.data);
      alert("Complaint submitted successfully!");

      if (response?.data?.success) {
        alert("Complaint submitted successfully!");
        setFormData({
          description: '',
          category: 'Roads & Pathways',
          location: '',
          images: null,
        });
      } else {
        alert("Failed to submit complaint.");
      }
    } catch (err) {
      console.error("Complaint submission failed:", err);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-circus-red">Submit a New Complaint</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Image</label>
        <input
          type="file"
          name="images"
          onChange={handleChange}
          accept="image/*"
          className="w-full text-gray-600"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition 
                    ${isSubmitting ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
      >
        {isSubmitting ? "Submitting..." : "Submit Complaint"}
      </button>
    </form>
  );
};

export default ComplaintForm;
