import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/auth/ProtectedRoute/ProtectedRoute';
import Login from '../pages/Login/Login';

// Placeholder components for dashboards (we'll create these later)
const StudentDashboard = () => <div style={{color: 'white', padding: '20px'}}>Student Dashboard</div>;
const FacultyDashboard = () => <div style={{color: 'white', padding: '20px'}}>Faculty Dashboard</div>;
const AdminDashboard = () => <div style={{color: 'white', padding: '20px'}}>Admin Dashboard</div>;

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
              // Redirect to appropriate dashboard if already logged in
              user.role === 'STUDENT' ? <Navigate to="/student/dashboard" replace /> :
              user.role === 'FACULTY' ? <Navigate to="/faculty/dashboard" replace /> :
              user.role === 'ADMIN' ? <Navigate to="/admin/dashboard" replace /> :
              <Navigate to="/login" replace />
            ) : (
              <Login />
            )
          } 
        />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Faculty Routes */}
        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute allowedRoles={['FACULTY']}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route 
          path="/" 
          element={
            user ? (
              user.role === 'STUDENT' ? <Navigate to="/student/dashboard" replace /> :
              user.role === 'FACULTY' ? <Navigate to="/faculty/dashboard" replace /> :
              user.role === 'ADMIN' ? <Navigate to="/admin/dashboard" replace /> :
              <Navigate to="/login" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;