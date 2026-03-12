// src/pages/user/UserDashboard.js
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getRequisitions } from "../../services/storeService";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

export default function UserDashboard() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [requisitions, setRequisitions] = useState([]);

  useEffect(() => {
    if (user) {
      getRequisitions(user.uid).then(setRequisitions);
    }
  }, [user]);

  const stats = {
    total: requisitions.length,
    pending: requisitions.filter(r => r.status === "PENDING").length,
    approved: requisitions.filter(r => r.status === "APPROVED").length,
  };

  return (
    <Layout showBudget budget={500000} spent={125000}>
      <div style={styles.container}>
        <div style={styles.welcome}>
          <h2 style={styles.greet}>{t("common.welcome")}</h2>
          <p style={styles.subgreet}>{t("dashboard.user_overview")}</p>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statVal}>{stats.total}</span>
            <span style={styles.statLabel}>{t("dashboard.total_requests")}</span>
          </div>
          <div style={{ ...styles.statCard, borderLeft: "4px solid #f90" }}>
            <span style={styles.statVal}>{stats.pending}</span>
            <span style={styles.statLabel}>{t("dashboard.pending")}</span>
          </div>
          <div style={{ ...styles.statCard, borderLeft: "4px solid #0a0" }}>
            <span style={styles.statVal}>{stats.approved}</span>
            <span style={styles.statLabel}>{t("dashboard.approved")}</span>
          </div>
        </div>

        <div style={styles.panel}>
          <div style={styles.panelHeader}>{t("dashboard.recent_activity")}</div>
          <div style={styles.panelBody}>
            {requisitions.length === 0 ? (
              <p style={styles.empty}>{t("dashboard.no_requests_yet")}</p>
            ) : (
              requisitions.slice(0, 5).map(r => (
                <div key={r.id} style={styles.row}>
                  <div style={styles.rowInfo}>
                    <span style={styles.rowTitle}>{r.activity}</span>
                    <span style={styles.rowDate}>{new Date(r.createdAt?.seconds * 1000 || r.createdAt).toLocaleDateString(lang === "es" ? "es-ES" : "en-US")}</span>
                  </div>
                  <span style={{ ...styles.badge, background: r.status === "APPROVED" ? "#0a0" : r.status === "PENDING" ? "#888" : "#c00" }}>
                    {t(`status.${r.status}`)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: { padding: 32, display: "flex", flexDirection: "column", gap: 32 },
  welcome: { textAlign: "left" },
  greet: { color: "#6B0F2B", fontSize: 28, fontWeight: "800", margin: 0 },
  subgreet: { color: "#666", fontSize: 16, marginTop: 4 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 },
  statCard: { background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 4px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 4 },
  statVal: { fontSize: 32, fontWeight: "800", color: "#6B0F2B" },
  statLabel: { fontSize: 12, fontWeight: "700", color: "#999", letterSpacing: 1 },
  panel: { background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" },
  panelHeader: { background: "#6B0F2B", color: "#fff", padding: "16px 24px", fontWeight: "700", fontSize: 18 },
  panelBody: { padding: 12 },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid #f0f0f0" },
  rowInfo: { display: "flex", flexDirection: "column", gap: 2 },
  rowTitle: { fontWeight: "700", color: "#333" },
  rowDate: { fontSize: 12, color: "#999" },
  badge: { color: "#fff", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: "700" },
  empty: { textAlign: "center", padding: 40, color: "#999" }
};
