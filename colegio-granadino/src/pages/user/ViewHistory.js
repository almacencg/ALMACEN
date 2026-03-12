// src/pages/user/ViewHistory.js
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getRequisitions } from "../../services/storeService";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

const STATUS_COLORS = { PENDING: "#888", APPROVED: "#0a0", REJECTED: "#c00" };

export default function ViewHistory() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [requisitions, setRequisitions] = useState([]);

  useEffect(() => {
    if (user) {
      getRequisitions(user.uid).then(setRequisitions);
    }
  }, [user]);

  const formatDate = (ts) => {
    if (!ts) return "—";
    const date = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
    return date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US");
  };

  return (
    <Layout showBudget budget={500000} spent={125000}>
      <div style={styles.container}>
        <h2 style={styles.title}>{t("dashboard.my_requisitions")}</h2>
        <div style={styles.list}>
          {requisitions.length === 0 ? (
            <p style={styles.empty}>{t("dashboard.no_requests_found")}</p>
          ) : (
            requisitions.map(req => (
              <div key={req.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.headerMain}>
                    <span style={styles.activity}>{req.activity}</span>
                    <span style={styles.date}>{formatDate(req.createdAt)}</span>
                  </div>
                  <span style={{ ...styles.badge, background: STATUS_COLORS[req.status] || "#888" }}>
                    {t(`status.${req.status}`)}
                  </span>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.infoGrid}>
                    <div><strong>{t("requisitions.section")}:</strong> {req.section}</div>
                    <div><strong>{t("requisitions.estimated_budget")}:</strong> ${req.budget || "—"}</div>
                  </div>
                  {req.items && (
                    <div style={styles.itemsList}>
                      {req.items.map((item, idx) => (
                        <div key={idx} style={styles.itemRow}>{item.name} x {item.quantity}</div>
                      ))}
                    </div>
                  )}
                  {req.notes && (
                    <div style={styles.adminNotes}>
                      <strong>{t("dashboard.admin_notes")}:</strong> {req.notes}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: { padding: 32, maxWidth: 800, margin: "0 auto" },
  title: { color: "#6B0F2B", fontWeight: "800", marginBottom: 32, textAlign: "center" },
  list: { display: "flex", flexDirection: "column", gap: 16 },
  card: { background: "#fff", borderRadius: 8, boxShadow: "0 2px 4px rgba(0,0,0,0.05)", overflow: "hidden" },
  cardHeader: { padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0" },
  headerMain: { display: "flex", flexDirection: "column" },
  activity: { fontWeight: "700", fontSize: 16, color: "#333" },
  date: { fontSize: 12, color: "#999" },
  badge: { color: "#fff", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: "700" },
  cardBody: { padding: 20 },
  infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13, marginBottom: 12 },
  itemsList: { background: "#f8f8f8", padding: 12, borderRadius: 4, fontSize: 13 },
  itemRow: { borderBottom: "1px solid #eee", paddingBottom: 4, marginBottom: 4 },
  adminNotes: { marginTop: 12, padding: 10, borderLeft: "4px solid #f0f0f0", fontSize: 13, color: "#666", fontStyle: "italic" },
  empty: { textAlign: "center", padding: 40, color: "#999" }
};
