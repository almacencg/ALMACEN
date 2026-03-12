// src/components/layout/Layout.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

const PRIMARY = "#6B0F2B";
const DARK = "#4a0a1e";
const TEXT = "#ffffff";

export default function Layout({ children, showBudget = false, budget = null, spent = null }) {
  const { user, profile, isAdmin } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const ADMIN_NAV = [
    { label: t("nav.register_output"),     path: "/admin/register-output" },
    { label: t("nav.register_input"),      path: "/admin/register-input" },
    { label: t("nav.inputs_history"),      path: "/admin/inputs-history" },
    { label: t("nav.outputs_history"),     path: "/admin/outputs-history" },
    { label: t("nav.requisition_history"), path: "/admin/requisition-history" },
    { label: t("nav.requisitions"),        path: "/admin/requisitions" },
    { label: t("nav.manage_store"),        path: "/admin/manage-store" },
  ];

  const USER_NAV = [
    { label: t("nav.submit_requisition"),  path: "/user/submit-requisition" },
    { label: t("nav.view_history"),        path: "/user/view-history" },
    { label: t("nav.special_requisition"), path: "/user/special-requisition" },
  ];

  const navItems = isAdmin ? ADMIN_NAV : USER_NAV;
  const mainPath = isAdmin ? "/admin/dashboard" : "/user/dashboard";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const formatTime = (date) =>
    date.toLocaleTimeString(lang === "es" ? "es-ES" : "en-US", { hour: "2-digit", minute: "2-digit" });

  const formatDate = (date) =>
    date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { day: "2-digit", month: "2-digit", year: "numeric" });

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
          <button onClick={handleLogout} style={styles.logoutBtn}>{t("nav.logout")}</button>
        </div>

        {showBudget && budget !== null && (
          <div style={styles.budgetContainer}>
            <span style={styles.budgetLabel}>{t("common.budget")}:</span>
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
          <div 
            onClick={() => navigate(mainPath)}
            style={{ 
              ...styles.navItem, 
              background: location.pathname === mainPath ? DARK : "transparent",
              fontWeight: "bold",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              marginBottom: 10
            }}
          >
            {t("nav.dashboard")}
          </div>

          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <div 
                key={item.path} 
                onClick={() => navigate(item.path)}
                style={{ ...styles.navItem, background: active ? DARK : "transparent" }}
              >
                {item.label}
              </div>
            );
          })}
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
  shell: { display: "flex", flexDirection: "column", height: "100vh", fontFamily: "Segoe UI, sans-serif", overflow: "hidden" },
  topbar: { background: PRIMARY, height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", color: TEXT, boxShadow: "0 2px 5px rgba(0,0,0,0.2)", zIndex: 10 },
  userInfo: { display: "flex", alignItems: "center", gap: 12 },
  avatar: { width: 36, height: 36, background: DARK, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  userName: { fontSize: 14, fontWeight: "600", letterSpacing: 0.5 },
  logoutBtn: { background: DARK, color: TEXT, border: "none", padding: "6px 12px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontWeight: "700" },
  clockArea: { display: "flex", gap: 20 },
  clockItem: { fontSize: 13, fontWeight: "600", opacity: 0.9 },
  flags: { display: "flex", gap: 10 },
  flagBtn: { background: "none", border: "none", fontSize: 22, cursor: "pointer", padding: 0 },
  body: { display: "flex", flex: 1, overflow: "hidden" },
  sidebar: { width: 240, background: PRIMARY, padding: "20px 0", display: "flex", flexDirection: "column" },
  navItem: { padding: "14px 24px", color: TEXT, cursor: "pointer", fontSize: 13, letterSpacing: 0.5, transition: "background 0.2s" },
  content: { flex: 1, background: "#f5f7fa", overflowY: "auto" },
  budgetContainer: { display: "flex", alignItems: "center", gap: 10, flex: 1, justifyContent: "center", maxWidth: 400 },
  budgetLabel: { fontSize: 11, fontWeight: "800", opacity: 0.8 },
  budgetBar: { flex: 1, height: 8, background: DARK, borderRadius: 4, overflow: "hidden" },
  budgetFill: { height: "100%", background: "#4CAF50" },
  budgetText: { fontSize: 11, fontWeight: "700" }
};
