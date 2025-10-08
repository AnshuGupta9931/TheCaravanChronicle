import React, { useState } from "react";
import { createComplaint } from "../../services/operations/compAPI.jsx";
import { toast } from "react-hot-toast";

const ComplaintForm = ({ onSubmitted }) => {
  const [form, setForm] = useState({
    type: "",
    description: "",
    location: "",
  });
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", form.type);
    formData.append("description", form.description);
    formData.append("location", form.location);

    // ✅ Must match backend: `images`
    images.forEach((file) => formData.append("images", file));

    try {
      const res = await createComplaint(formData);
      toast.success(res?.data?.message || "Complaint submitted successfully!");
      setForm({ type: "", description: "", location: "" });
      setImages([]);

      if (onSubmitted) onSubmitted();
    } catch (err) {
      console.error("Complaint submit error:", err);
      toast.error(err.response?.data?.message || "Error submitting complaint");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-2xl shadow-lg space-y-4 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800">Submit a Complaint</h2>

      <select
        className="w-full border p-2 rounded"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        required
      >
        <option value="">Select Complaint Type</option>
        <option value="Road Damage">Road Damage</option>
        <option value="Water Leakage">Water Leakage</option>
        <option value="Garbage">Garbage</option>
      </select>

      <textarea
        placeholder="Description"
        className="w-full border p-2 rounded"
        rows={4}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Location"
        className="w-full border p-2 rounded"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        required
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setImages([...e.target.files])}
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Complaint
      </button>
    </form>
  );
};

export default ComplaintForm;
