import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const StaffProfile = () => {
  const [profile, setProfile] = useState(null);
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axios.get(`http://localhost:8000/api/v1/staff/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(data.profile);
    };
    fetchProfile();
  }, [token]);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Staff Profile</h2>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Staff ID:</strong> {profile.staffId}</p>
        <p><strong>Category:</strong> {profile.staffCategory}</p>
        <p><strong>Role:</strong> {profile.role}</p>
      </div>
    </div>
  );
};

export default StaffProfile;
