import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/auth/ProtectedRoute/ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout/DashboardLayout";
import Login from "../pages/Login/Login";

// Placeholder dashboards
const StudentDashboard = () => <div style={{ color: "white", padding: "20px" }}>Student Dashboard</div>;
const FacultyDashboard = () => <div style={{ color: "white", padding: "20px" }}>Faculty Dashboard</div>;
const AdminDashboard = () => <div style={{ color: "white", padding: "20px" }}>Admin Dashboard</div>;

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={
            user ? (
              user.role === "STUDENT" ? <Navigate to="/student/dashboard" replace /> :
              user.role === "FACULTY" ? <Navigate to="/faculty/dashboard" replace /> :
              user.role === "ADMIN" ? <Navigate to="/admin/dashboard" replace /> :
              <Navigate to="/login" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* Dashboards with Navbar */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/faculty/dashboard"
            element={
              <ProtectedRoute allowedRoles={["FACULTY"]}>
                <FacultyDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Default Route */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "STUDENT" ? <Navigate to="/student/dashboard" replace /> :
              user.role === "FACULTY" ? <Navigate to="/faculty/dashboard" replace /> :
              user.role === "ADMIN" ? <Navigate to="/admin/dashboard" replace /> :
              <Navigate to="/login" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
