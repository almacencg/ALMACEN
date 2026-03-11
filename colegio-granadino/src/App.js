// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Lazy load para el resto de páginas (las irás creando)
// import RegisterInput   from "./pages/admin/RegisterInput";
// import RegisterOutput  from "./pages/admin/RegisterOutput";
// import InputsHistory   from "./pages/admin/InputsHistory";
// import OutputsHistory  from "./pages/admin/OutputsHistory";
// import RequisitionHistory from "./pages/admin/RequisitionHistory";
// import AdminRequisitions  from "./pages/admin/AdminRequisitions";
// import ManageStore        from "./pages/admin/ManageStore";
// import UserDashboard      from "./pages/user/UserDashboard";
// import SubmitRequisition  from "./pages/user/SubmitRequisition";
// import ViewHistory        from "./pages/user/ViewHistory";
// import SpecialRequisition from "./pages/user/SpecialRequisition";

function PrivateRoute({ children, requireAdmin = false }) {
  const { user, profile, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && profile?.role !== "admin") return <Navigate to="/user/submit-requisition" replace />;
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
  return <Navigate to="/user/submit-requisition" replace />;
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
        <PrivateRoute requireAdmin><div style={placeholderStyle}>Register Input — Coming Soon</div></PrivateRoute>
      } />
      <Route path="/admin/register-output" element={
        <PrivateRoute requireAdmin><div style={placeholderStyle}>Register Output — Coming Soon</div></PrivateRoute>
      } />
      <Route path="/admin/inputs-history" element={
        <PrivateRoute requireAdmin><div style={placeholderStyle}>Inputs History — Coming Soon</div></PrivateRoute>
      } />
      <Route path="/admin/outputs-history" element={
        <PrivateRoute requireAdmin><div style={placeholderStyle}>Outputs History — Coming Soon</div></PrivateRoute>
      } />
      <Route path="/admin/requisition-history" element={
        <PrivateRoute requireAdmin><div style={placeholderStyle}>Requisition History — Coming Soon</div></PrivateRoute>
      } />
      <Route path="/admin/requisitions" element={
        <PrivateRoute requireAdmin><div style={placeholderStyle}>Requisitions — Coming Soon</div></PrivateRoute>
      } />
      <Route path="/admin/manage-store" element={
        <PrivateRoute requireAdmin><div style={placeholderStyle}>Manage Store — Coming Soon</div></PrivateRoute>
      } />

      {/* ── USER ROUTES ── */}
      <Route path="/user/submit-requisition" element={
        <PrivateRoute><div style={placeholderStyle}>Submit Requisition — Coming Soon</div></PrivateRoute>
      } />
      <Route path="/user/view-history" element={
        <PrivateRoute><div style={placeholderStyle}>View History — Coming Soon</div></PrivateRoute>
      } />
      <Route path="/user/special-requisition" element={
        <PrivateRoute><div style={placeholderStyle}>Special Requisition — Coming Soon</div></PrivateRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

const placeholderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  fontSize: 18,
  color: "#999",
  fontFamily: "Segoe UI, sans-serif",
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
