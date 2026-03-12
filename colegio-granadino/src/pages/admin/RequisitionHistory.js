// src/pages/admin/RequisitionHistory.js
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getRequisitions, getUsers } from "../../services/storeService";
import { useLanguage } from "../../context/LanguageContext";

const STATUS_COLORS = {
  PENDING: "#888",
  APPROVED: "#0a0",
  REJECTED: "#c00",
  IN_PROGRESS: "#f90",
  COMPLETED: "#09c"
};

export default function RequisitionHistory() {
  const { t, lang } = useLanguage();
  const [requisitions, setRequisitions] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    Promise.all([getRequisitions(), getUsers()]).then(([r, u]) => {
      setRequisitions(r);
      const usersMap = {};
      u.forEach(user => usersMap[user.id] = user);
      setUsers(usersMap);
    });
  }, []);

  const formatDate = (ts) => {
    if (!ts) return "—";
    const date = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
    return date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US");
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>{t("nav.requisition_history")}</h2>
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>{t("requisitions.id")}</th>
                <th style={styles.th}>{t("common.date")}</th>
                <th style={styles.th}>{t("requisitions.user")}</th>
                <th style={styles.th}>{t("requisitions.activity")}</th>
                <th style={styles.th}>{t("requisitions.section")}</th>
                <th style={styles.th}>{t("common.status")}</th>
              </tr>
            </thead>
            <tbody>
              {requisitions.map(req => (
                <tr key={req.id} style={styles.tr}>
                  <td style={styles.td}>{req.id.substring(0, 8)}...</td>
                  <td style={styles.td}>{formatDate(req.createdAt)}</td>
                  <td style={styles.td}>{users[req.userId]?.name || t("common.local_user")}</td>
                  <td style={styles.td}>{req.activity}</td>
                  <td style={styles.td}>{req.section}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, background: STATUS_COLORS[req.status] || "#888" }}>
                      {t(`status.${req.status}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: { padding: 32 },
  title: { color: "#6B0F2B", fontWeight: "800", marginBottom: 24 },
  tableCard: { background: "#fff", borderRadius: 8, boxShadow: "0 2px 4px rgba(0,0,0,0.05)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  thead: { background: "#6B0F2B", color: "#fff", textAlign: "left" },
  th: { padding: "16px 20px", fontSize: 13, letterSpacing: 1 },
  tr: { borderBottom: "1px solid #eee" },
  td: { padding: "16px 20px", fontSize: 14, color: "#333" },
  badge: { color: "#fff", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: "700" }
};
