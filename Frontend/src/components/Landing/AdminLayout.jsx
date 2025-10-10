import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';

/**
 * A layout component for the entire admin section.
 * It renders the shared AdminHeader and provides a content area
 * for specific admin pages to be displayed via React Router's Outlet.
 */
const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* The AdminHeader will be present on all admin pages */}
      <AdminHeader />

      {/* Main content area where nested routes will be rendered */}
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

