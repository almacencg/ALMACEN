// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

// Pages
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RegisterInput   from "./pages/admin/RegisterInput";
import RegisterOutput  from "./pages/admin/RegisterOutput";
import InputsHistory   from "./pages/admin/InputsHistory";
import OutputsHistory  from "./pages/admin/OutputsHistory";
import RequisitionHistory from "./pages/admin/RequisitionHistory";
import AdminRequisitions  from "./pages/admin/AdminRequisitions";
import ManageStore        from "./pages/admin/ManageStore";
import UserDashboard      from "./pages/user/UserDashboard";
import SubmitRequisition  from "./pages/user/SubmitRequisition";
import ViewHistory        from "./pages/user/ViewHistory";
import SpecialRequisition from "./pages/user/SpecialRequisition";

function PrivateRoute({ children, requireAdmin = false }) {
  const { user, profile, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && profile?.role !== "admin") return <Navigate to="/user/dashboard" replace />;
  return children;
}

function LoadingScreen() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#6B0F2B",
      color: "#fff",
      fontSize: 20,
      fontWeight: "700",
      letterSpacing: 2,
      fontFamily: "Segoe UI, sans-serif",
    }}>
      COLEGIO GRANADINO...
    </div>
  );
}

function RootRedirect() {
  const { user, profile, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (profile?.role === "admin") return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/user/dashboard" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />

      {/* ── ADMIN ROUTES ── */}
      <Route path="/admin/dashboard" element={
        <PrivateRoute requireAdmin><AdminDashboard /></PrivateRoute>
      } />
      <Route path="/admin/register-input" element={
        <PrivateRoute requireAdmin><RegisterInput /></PrivateRoute>
      } />
      <Route path="/admin/register-output" element={
        <PrivateRoute requireAdmin><RegisterOutput /></PrivateRoute>
      } />
      <Route path="/admin/inputs-history" element={
        <PrivateRoute requireAdmin><InputsHistory /></PrivateRoute>
      } />
      <Route path="/admin/outputs-history" element={
        <PrivateRoute requireAdmin><OutputsHistory /></PrivateRoute>
      } />
      <Route path="/admin/requisition-history" element={
        <PrivateRoute requireAdmin><RequisitionHistory /></PrivateRoute>
      } />
      <Route path="/admin/requisitions" element={
        <PrivateRoute requireAdmin><AdminRequisitions /></PrivateRoute>
      } />
      <Route path="/admin/manage-store" element={
        <PrivateRoute requireAdmin><ManageStore /></PrivateRoute>
      } />

      {/* ── USER ROUTES ── */}
      <Route path="/user/dashboard" element={
        <PrivateRoute><UserDashboard /></PrivateRoute>
      } />
      <Route path="/user/submit-requisition" element={
        <PrivateRoute><SubmitRequisition /></PrivateRoute>
      } />
      <Route path="/user/view-history" element={
        <PrivateRoute><ViewHistory /></PrivateRoute>
      } />
      <Route path="/user/special-requisition" element={
        <PrivateRoute><SpecialRequisition /></PrivateRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
