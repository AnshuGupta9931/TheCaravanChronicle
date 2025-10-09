import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Header = () => {
  // ✅ Get logged-in user from Redux store
  const { user } = useSelector((state) => state.profile);

  // ✅ Show user's name or fallback
  const username = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`
    : 'Citizen';

  // ✅ Navigation links
  const navigation = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'My Complaints', link: '/dashboard/my-complaints' },
    { name: 'Profile', link: '/dashboard/profile' },
  ];

  return (
    <header className="bg-gradient-to-r from-circus-red to-[#ee5566] shadow-md text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        {/* ---------- Logo and Branding ---------- */}
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
            CIRCUS CITY
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
        <div className="flex items-center space-x-3">
          <span className="text-sm font-light">
            Welcome, {username.trim()}!
          </span>
          <div className="bg-circus-gold p-1 rounded-full text-circus-red cursor-pointer">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
              1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 
              1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
