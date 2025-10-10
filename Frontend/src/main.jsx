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

import Layout from "./components/Landing/Layout.jsx";
import { Home } from "./components/Landing/Home.jsx";
import { Login } from "./components/Landing/Login.jsx";
import Signup from "./components/Landing/Signup.jsx";
import { VerifyEmail } from "./components/Landing/VerifyEmail.jsx";
import AboutUs from "./components/Landing/AboutUs.jsx";
import ContactUs from "./components/Landing/ContactUs.jsx";

<<<<<<< HEAD
=======
// -------------------- Dashboard Layout --------------------
>>>>>>> 3169489 (Staff feature ready)
import PrivateRoute from "./components/core/Auth/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";

// -------------------- Citizen Pages --------------------
import CitizenDashboard from "./pages/CitizenDashboard.jsx";
import ComplaintForm from "./components/Dashboards/ComplaintForm.jsx";
import MyComplaintsView from "./components/Dashboards/MyComplaintsView.jsx";
// -------------------- Staff Pages --------------------
import StaffDashboard from "./pages/StaffDashboard.jsx";
import StaffComplaints from "./pages/StaffComplaints.jsx";
import ComplaintDetails from "./pages/ComplaintDetails.jsx";
<<<<<<< HEAD
import Profile from "./pages/Profile.jsx";

import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";
import AllComplaints from "./pages/Admin/AllComplaints.jsx";
import StaffRequests from "./pages/Admin/StaffRequests.jsx";
import AdminComplaintDetails from "./pages/Admin/AdminComplaintDetails.jsx";

import ComplaintHeatmap from "./pages/ComplaintHeatmap.jsx";
=======

// -------------------- Staff Manager Pages --------------------
// import StaffManagerDashboard from "./pages/StaffManagerDashboard.jsx";
// import AssignComplaints from "./components/StaffManager/AssignComplaints.jsx";

// -------------------- Admin Pages --------------------
//import AdminDashboard from "./pages/AdminDashboard.jsx";
>>>>>>> 3169489 (Staff feature ready)

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
      </Route>

<<<<<<< HEAD
=======
      {/* ------------------ 2. CITIZEN DASHBOARD ------------------ */}
>>>>>>> 3169489 (Staff feature ready)
      <Route
        path="/dashboard"
        element={
          <PrivateRoute element={<Dashboard />} allowedRoles={["Citizen"]} />
        }
      >
        <Route index element={<CitizenDashboard />} />
        <Route
          path="create-complaint"
          element={
            <PrivateRoute
              element={<ComplaintForm />}
              allowedRoles={["Citizen"]}
            />
          }
        />
        <Route
          path="my-complaints"
          element={
            <PrivateRoute
              element={<MyComplaintsView />}
              allowedRoles={["Citizen"]}
            />
          }
        />
        <Route
          path="complaint/:id"
          element={
            <PrivateRoute
              element={<ComplaintDetails />}
              allowedRoles={["Citizen", "Admin", "Staff"]}
            />
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute element={<Profile />} allowedRoles={["Citizen"]} />
          }
        />
      </Route>

<<<<<<< HEAD
=======
      {/* ------------------ 3. STAFF DASHBOARD ------------------ */}
>>>>>>> 3169489 (Staff feature ready)
      <Route
        path="/staff"
        element={
          <PrivateRoute element={<Dashboard />} allowedRoles={["Staff"]} />
        }
      >
<<<<<<< HEAD
=======
        <Route index element={<StaffDashboard />} />
        <Route
          path="complaints"
          element={<PrivateRoute element={<StaffComplaints />} allowedRoles={["Staff"]} />}
        />
        <Route
          path="complaint/:id"
          element={<PrivateRoute element={<ComplaintDetails />} allowedRoles={["Staff"]} />}
        />
>>>>>>> 3169489 (Staff feature ready)
        <Route
          path="profile"
          element={
            <PrivateRoute element={<Profile />} allowedRoles={["Staff"]} />
          }
        />
      </Route>

<<<<<<< HEAD
=======
      {/* ------------------ 4. STAFF MANAGER DASHBOARD ------------------ */}
      <Route
        path="/manager"
        element={<PrivateRoute element={<Dashboard />} allowedRoles={["StaffManager"]} />}
      >
        <Route index element={<StaffDashboard />} />
        {/* <Route
          path="assign"
          element={<PrivateRoute element={<AssignComplaints />} allowedRoles={["StaffManager"]} />}
        /> */}
        <Route
          path="profile"
          element={<PrivateRoute element={<Profile />} allowedRoles={["StaffManager"]} />}
        />
      </Route>

      {/* ------------------ 5. ADMIN DASHBOARD ------------------ */}
>>>>>>> 3169489 (Staff feature ready)
      <Route
        path="/admin"
        element={
          <PrivateRoute element={<Dashboard />} allowedRoles={["Admin"]} />
        }
      >
<<<<<<< HEAD
        <Route index element={<AdminDashboard />} />
=======
        
>>>>>>> 3169489 (Staff feature ready)
        <Route
          path="profile"
          element={
            <PrivateRoute element={<AdminProfile />} allowedRoles={["Admin"]} />
          }
        />
        <Route
          path="all-complaints"
          element={
            <PrivateRoute element={<AllComplaints />} allowedRoles={["Admin"]} />
          }
        />
        <Route
          path="complaint/:id"
          element={
            <PrivateRoute
              element={<AdminComplaintDetails />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="requests"
          element={
            <PrivateRoute element={<StaffRequests />} allowedRoles={["Admin"]} />
          }
        />
      </Route>

<<<<<<< HEAD
      <Route
        path="/heatmap"
        element={
          <PrivateRoute
            element={<ComplaintHeatmap />}
            allowedRoles={["Admin", "Staff", "Citizen"]}
          />
        }
      />

=======
      {/* ------------------ 6. 404 FALLBACK ------------------ */}
>>>>>>> 3169489 (Staff feature ready)
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

const store = configureStore({
  reducer: rootReducer,
});

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
