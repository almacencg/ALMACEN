// src/components/layout/Layout.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const PRIMARY = "#6B0F2B";
const DARK = "#4a0a1e";
const TEXT = "#ffffff";

const ADMIN_NAV = [
  { label: "REGISTER OUTPUT",     path: "/admin/register-output" },
  { label: "REGISTER INPUT",      path: "/admin/register-input" },
  { label: "INPUTS HISTORY",      path: "/admin/inputs-history" },
  { label: "OUTPUTS HISTORY",     path: "/admin/outputs-history" },
  { label: "REQUISITION HISTORY", path: "/admin/requisition-history" },
  { label: "REQUISITIONS",        path: "/admin/requisitions" },
  { label: "MANAGE STORE",        path: "/admin/manage-store" },
];

const USER_NAV = [
  { label: "SUBMIT REQUISITION",  path: "/user/submit-requisition" },
  { label: "VIEW HISTORY",        path: "/user/view-history" },
  { label: "SPECIAL REQUISITION", path: "/user/special-requisition" },
];

export default function Layout({ children, showBudget = false, budget = null, spent = null }) {
  const { user, profile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = isAdmin ? ADMIN_NAV : USER_NAV;
  const mainPath = isAdmin ? "/admin/dashboard" : "/user/dashboard";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const formatTime = (date) =>
    date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

  const formatDate = (date) =>
    date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });

  const getDayName = (date) =>
    date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { weekday: "long" })
      .toUpperCase();

  const budgetPercent = budget && spent ? (spent / budget) * 100 : 0;

  return (
    <div style={styles.shell}>
      {/* TOP BAR */}
      <header style={styles.topbar}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>
            {user?.photoURL
              ? <img src={user.photoURL} alt="avatar" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
              : <svg viewBox="0 0 24 24" fill="white" width="28" height="28"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
            }
          </div>
          <span style={styles.userName}>{profile?.displayName || user?.displayName || "USER NAME"}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>LOGOUT</button>
        </div>

        {showBudget && budget !== null && (
          <div style={styles.budgetContainer}>
            <span style={styles.budgetLabel}>BUDGET:</span>
            <div style={styles.budgetBar}>
              <div style={{ ...styles.budgetFill, width: `${Math.min(budgetPercent, 100)}%` }} />
            </div>
            <span style={styles.budgetText}>${spent?.toFixed(0) || 0}/${budget?.toFixed(0) || 0}</span>
          </div>
        )}

        <div style={styles.clockArea}>
          <span style={styles.clockItem}>{formatTime(time)}</span>
          <span style={styles.clockItem}>{formatDate(time)}</span>
          <span style={styles.clockItem}>{getDayName(time)}</span>
        </div>

        <div style={styles.flags}>
          <button onClick={() => setLang("es")} style={{ ...styles.flagBtn, opacity: lang === "es" ? 1 : 0.6 }}>🇪🇸</button>
          <button onClick={() => setLang("en")} style={{ ...styles.flagBtn, opacity: lang === "en" ? 1 : 0.6 }}>🇺🇸</button>
        </div>
      </header>

      {/* BODY */}
      <div style={styles.body}>
        {/* SIDEBAR */}
        <nav style={styles.sidebar}>
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  ...styles.navItem,
                  background: active ? DARK : "transparent",
                  borderLeft: active ? `4px solid #fff` : "4px solid transparent",
                }}
              >
                {item.label}
              </button>
            );
          })}

          <div style={{ flex: 1 }} />

          <button onClick={() => navigate(mainPath)} style={styles.mainBtn}>
            <span style={styles.mainIcon}>⬅</span>
            <span>MAIN</span>
          </button>
        </nav>

        {/* CONTENT */}
        <main style={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}

const styles = {
  shell: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
    background: PRIMARY,
  },
  topbar: {
    background: PRIMARY,
    display: "flex",
    alignItems: "center",
    padding: "8px 20px",
    gap: 16,
    minHeight: 72,
    borderBottom: `2px solid ${DARK}`,
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  userName: {
    color: TEXT,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  logoutBtn: {
    background: "none",
    border: "none",
    color: TEXT,
    fontWeight: "700",
    cursor: "pointer",
    fontSize: 14,
    opacity: 0.8,
    letterSpacing: 1,
  },
  budgetContainer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  budgetLabel: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
  },
  budgetBar: {
    width: 80,
    height: 20,
    background: "#8B0000",
    borderRadius: 2,
    overflow: "hidden",
  },
  budgetFill: {
    height: "100%",
    background: "#c00",
    transition: "width 0.5s ease",
  },
  budgetText: {
    background: TEXT,
    color: "#333",
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 13,
    fontWeight: "700",
  },
  clockArea: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  clockItem: {
    color: TEXT,
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  flags: {
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  flagBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 30,
    lineHeight: 1,
    padding: 0,
    transition: "opacity 0.2s",
  },
  body: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  sidebar: {
    width: 290,
    background: PRIMARY,
    display: "flex",
    flexDirection: "column",
    padding: "16px 0",
    gap: 4,
    flexShrink: 0,
  },
  navItem: {
    color: TEXT,
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 1,
    padding: "18px 24px",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.15s",
    width: "100%",
  },
  mainBtn: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: TEXT,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "16px 24px",
    marginTop: 8,
  },
  mainIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    background: "#e8e8e8",
    overflow: "auto",
  },
};
