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

// -------------------- Dashboard & Protected --------------------
import PrivateRoute from "./components/core/Auth/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardHome from "./components/Dashboards/DashboardHome.jsx";
import ComplaintForm from "./components/Dashboards/ComplaintForm.jsx";
import MyComplaintsView from "./components/Dashboards/MyComplaintsView.jsx";
import AllComplaintsView from "./components/Dashboards/AllComplaintsView.jsx";

// -----------------------------------------------------------------------
// ROUTER DEFINITION
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

      {/* ------------------ 2. DASHBOARD (PROTECTED) ------------------ */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute
            element={<Dashboard />} // Main dashboard layout
            allowedRoles={["citizen", "staff", "admin"]}
          />
        }
      >
        {/* Default dashboard home */}
        <Route index element={<DashboardHome />} />

        {/* Citizen Routes */}
        <Route
          path="create-complaint"
          element={
            <PrivateRoute
              element={<ComplaintForm />}
              allowedRoles={["citizen"]}
            />
          }
        />
        <Route
          path="my-complaints"
          element={
            <PrivateRoute
              element={<MyComplaintsView />}
              allowedRoles={["citizen"]}
            />
          }
        />

        {/* Staff/Admin Routes */}
        <Route
          path="all-complaints"
          element={
            <PrivateRoute
              element={<AllComplaintsView />}
              allowedRoles={["staff", "admin"]}
            />
          }
        />
        <Route
          path="complaint/:id"
          element={
            <PrivateRoute
              element={<AllComplaintsView />}
              allowedRoles={["staff", "admin"]}
            />
          }
        />
      </Route>

      {/* ------------------ 3. 404 FALLBACK ------------------ */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
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
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
