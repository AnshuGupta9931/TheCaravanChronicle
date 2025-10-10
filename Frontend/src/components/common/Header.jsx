import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authAPI'; // ✅ adjust path if needed

const Header = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const username = user?.firstName ? `${user.firstName}` : 'Citizen';
  const avatarUrl = user?.image
    ? user.image
    : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}`;

  const navigation = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'My Complaints', link: '/dashboard/my-complaints' },
    { name: 'Profile', link: '/dashboard/profile' },
  ];

  const handleLogout = () => {
    setShowLogoutModal(false);
    dispatch(logout(navigate));
  };

  return (
    <>
      <header className="bg-gradient-to-r from-circus-red to-[#ee5566] shadow-md text-white py-4 relative">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          
          {/* ---------- Logo ---------- */}
          <div className="flex items-center">
            <svg
              className="w-8 h-8 mr-2 fill-circus-gold"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 80 L50 20 L90 80 Z" />
              <circle fill="#FFC107" cx="50" cy="15" r="5" />
              <rect fill="#DC3545" x="20" y="80" width="60" height="20" />
            </svg>
            <span className="font-display text-2xl tracking-wider">
              GRIEVEASE
            </span>
          </div>

          {/* ---------- Navigation Menu ---------- */}
          <nav className="flex space-x-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                end
                className={({ isActive }) =>
                  `font-semibold transition duration-300 ${
                    isActive
                      ? 'text-circus-gold border-b-2 border-circus-gold pb-1'
                      : 'hover:text-circus-gold text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* ---------- User Info ---------- */}
          <div className="relative">
            <div
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <span className="text-sm font-light">Welcome, {username.trim()}!</span>
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-9 h-9 rounded-full border-2 border-circus-gold object-cover"
              />
            </div>

            {/* ---------- Dropdown ---------- */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg text-gray-800 z-50 backdrop-blur-md bg-opacity-80">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    setShowLogoutModal(true);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ---------- Logout Confirmation Modal ---------- */}
      {showLogoutModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex justify-center items-center z-[100]">
          <div className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl p-6 w-80 text-center shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Do you want to log out?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-5 py-2 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-200 hover:scale-105 transition-transform duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-circus-red to-[#ee5566] text-white shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
