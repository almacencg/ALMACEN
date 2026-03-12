// src/pages/admin/AdminRequisitions.js
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getRequisitions, updateRequisitionStatus, getUsers } from "../../services/storeService";
import { useLanguage } from "../../context/LanguageContext";

export default function AdminRequisitions() {
  const { t, lang } = useLanguage();
  const [requisitions, setRequisitions] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    Promise.all([getRequisitions(), getUsers()]).then(([r, u]) => {
      setRequisitions(r.filter(req => req.status === "PENDING"));
      const usersMap = {};
      u.forEach(user => usersMap[user.id] = user);
      setUsers(usersMap);
    });
  };

  const handleAction = async (id, status) => {
    setLoading(true);
    try {
      await updateRequisitionStatus(id, status);
      refresh();
    } catch (e) {
      alert(t("common.update_error"));
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>{t("requisitions.pending_requisitions")}</h2>
        <div style={styles.grid}>
          {requisitions.length === 0 ? (
            <p style={styles.empty}>{t("requisitions.no_pending")}</p>
          ) : (
            requisitions.map(req => (
              <div key={req.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.userName}>{users[req.userId]?.name || t("common.local_user")}</span>
                  <span style={styles.date}>{new Date(req.createdAt?.seconds * 1000 || req.createdAt).toLocaleDateString(lang === "es" ? "es-ES" : "en-US")}</span>
                </div>
                <div style={styles.cardBody}>
                  <p><strong>{t("requisitions.activity")}:</strong> {req.activity}</p>
                  <p><strong>{t("requisitions.section")}:</strong> {req.section}</p>
                  <p><strong>{t("requisitions.estimated_budget")}:</strong> ${req.budget}</p>
                  {req.items && (
                    <div style={styles.itemsList}>
                      {req.items.map((item, idx) => (
                        <div key={idx} style={styles.itemRow}>{item.name} x {item.quantity}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div style={styles.cardActions}>
                  <button 
                    style={styles.rejectBtn} 
                    onClick={() => handleAction(req.id, "REJECTED")}
                    disabled={loading}
                  >{t("common.reject")}</button>
                  <button 
                    style={styles.approveBtn} 
                    onClick={() => handleAction(req.id, "APPROVED")}
                    disabled={loading}
                  >{t("common.approve")}</button>
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
  container: { padding: 32 },
  title: { color: "#6B0F2B", fontWeight: "800", marginBottom: 24, textAlign: "center" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 24 },
  card: { background: "#fff", borderRadius: 8, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", overflow: "hidden", display: "flex", flexDirection: "column" },
  cardHeader: { background: "#6B0F2B", color: "#fff", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  userName: { fontWeight: "700", fontSize: 16 },
  date: { fontSize: 12, opacity: 0.8 },
  cardBody: { padding: 20, flex: 1, fontSize: 14, color: "#333", lineHeight: 1.6 },
  itemsList: { marginTop: 12, padding: 12, background: "#f8f8f8", borderRadius: 4 },
  itemRow: { borderBottom: "1px solid #eee", paddingBottom: 4, marginBottom: 4 },
  cardActions: { padding: 16, display: "flex", gap: 12, borderTop: "1px solid #eee" },
  approveBtn: { flex: 1, background: "#0a0", color: "#fff", border: "none", padding: 10, borderRadius: 4, fontWeight: "700", cursor: "pointer" },
  rejectBtn: { flex: 1, background: "#c00", color: "#fff", border: "none", padding: 10, borderRadius: 4, fontWeight: "700", cursor: "pointer" },
  empty: { textAlign: "center", gridColumn: "1 / -1", color: "#999", marginTop: 40 },
};
