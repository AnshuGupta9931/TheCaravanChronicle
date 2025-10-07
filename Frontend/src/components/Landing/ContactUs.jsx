
import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import imgi from "../../assets/images/ContactUs.png";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl max-w-6xl w-full p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={imgi} 
            alt="Contact Us Illustration"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* Form & Info Section */}
        <div className="w-full md:w-1/2 text-gray-800">
          <h1 className="text-3xl font-bold mb-4 text-indigo-900">Contact Us</h1>
          <p className="mb-6 text-gray-600">
            Have questions, feedback, or need support? We'd love to hear from you.
          </p>

          {/* Contact Info */}
          <div className="mb-6 space-y-3">
            <p className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-indigo-600" /> support@citymanagement.com
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaPhoneAlt className="text-indigo-600" /> +91 98765 43210
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaMapMarkerAlt className="text-indigo-600" /> NIT Allahabad, Prayagraj, India
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
