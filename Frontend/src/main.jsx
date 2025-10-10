// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";
import rootReducer from "./reducers/index.jsx";
import "./index.css";

// -------------------- Landing Pages --------------------
import Layout from "./components/Landing/Layout.jsx";
import { Home } from "./components/Landing/Home.jsx";
import { Login } from "./components/Landing/Login.jsx";
import Signup from "./components/Landing/Signup.jsx";
import { VerifyEmail } from "./components/Landing/VerifyEmail.jsx";
import AboutUs from "./components/Landing/AboutUs.jsx";
import ContactUs from "./components/Landing/ContactUs.jsx";

// -------------------- Protected Components --------------------
import PrivateRoute from "./components/core/Auth/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";

// -------------------- Citizen Pages --------------------
import CitizenDashboard from "./pages/CitizenDashboard.jsx";
import ComplaintForm from "./components/Dashboards/ComplaintForm.jsx";
import MyComplaintsView from "./components/Dashboards/MyComplaintsView.jsx";
import ComplaintDetails from "./pages/ComplaintDetails.jsx";

// -------------------- Staff Pages --------------------
import StaffDashboard from "./pages/StaffDashboard.jsx";
import StaffComplaints from "./pages/StaffComplaints.jsx";

// -------------------- Admin Pages --------------------
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";
import AllComplaints from "./pages/Admin/AllComplaints.jsx";
import StaffRequests from "./pages/Admin/StaffRequests.jsx";
import AdminComplaintDetails from "./pages/Admin/AdminComplaintDetails.jsx";

// -------------------- Shared Pages --------------------
import ComplaintHeatmap from "./pages/ComplaintHeatmap.jsx";

// -----------------------------------------------------------------------
// ROUTER CONFIGURATION
// -----------------------------------------------------------------------
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ------------------ 1. PUBLIC ROUTES ------------------ */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
      </Route>

      {/* ------------------ 2. CITIZEN DASHBOARD ------------------ */}
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<Dashboard />} allowedRoles={["Citizen"]} />}
      >
        <Route index element={<CitizenDashboard />} />
        <Route
          path="create-complaint"
          element={<PrivateRoute element={<ComplaintForm />} allowedRoles={["Citizen"]} />}
        />
        <Route
          path="my-complaints"
          element={<PrivateRoute element={<MyComplaintsView />} allowedRoles={["Citizen"]} />}
        />
        <Route
          path="complaint/:id"
          element={<PrivateRoute element={<ComplaintDetails />} allowedRoles={["Citizen", "Admin", "Staff"]} />}
        />
        <Route
          path="profile"
          element={<PrivateRoute element={<Profile />} allowedRoles={["Citizen"]} />}
        />
      </Route>

      {/* ------------------ 3. STAFF DASHBOARD ------------------ */}
      <Route
        path="/staff"
        element={<PrivateRoute element={<Dashboard />} allowedRoles={["Staff"]} />}
      >
        <Route index element={<StaffDashboard />} />
        <Route
          path="complaints"
          element={<PrivateRoute element={<StaffComplaints />} allowedRoles={["Staff"]} />}
        />
        <Route
          path="complaint/:id"
          element={<PrivateRoute element={<ComplaintDetails />} allowedRoles={["Staff"]} />}
        />
        <Route
          path="profile"
          element={<PrivateRoute element={<Profile />} allowedRoles={["Staff"]} />}
        />
      </Route>

      {/* ------------------ 4. ADMIN DASHBOARD ------------------ */}
      <Route
        path="/admin"
        element={<PrivateRoute element={<Dashboard />} allowedRoles={["Admin"]} />}
      >
        <Route index element={<AdminDashboard />} />
        <Route
          path="profile"
          element={<PrivateRoute element={<AdminProfile />} allowedRoles={["Admin"]} />}
        />
        <Route
          path="all-complaints"
          element={<PrivateRoute element={<AllComplaints />} allowedRoles={["Admin"]} />}
        />
        <Route
          path="complaint/:id"
          element={<PrivateRoute element={<AdminComplaintDetails />} allowedRoles={["Admin"]} />}
        />
        <Route
          path="requests"
          element={<PrivateRoute element={<StaffRequests />} allowedRoles={["Admin"]} />}
        />
      </Route>

      {/* ------------------ 5. HEATMAP ------------------ */}
      <Route
        path="/heatmap"
        element={<PrivateRoute element={<ComplaintHeatmap />} allowedRoles={["Admin", "Staff", "Citizen"]} />}
      />

      {/* ------------------ 6. 404 FALLBACK ------------------ */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-gray-700">
            404 - Page Not Found
          </div>
        }
      />
    </>
  )
);

// -----------------------------------------------------------------------
// REDUX STORE SETUP
// -----------------------------------------------------------------------
const store = configureStore({
  reducer: rootReducer,
});

// -----------------------------------------------------------------------
// ROOT RENDER
// -----------------------------------------------------------------------
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500">
        <RouterProvider router={router} />
      </div>
    </Provider>
  </StrictMode>
);
