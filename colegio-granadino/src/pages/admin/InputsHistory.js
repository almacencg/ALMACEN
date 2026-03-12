// src/pages/admin/InputsHistory.js
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getInputsHistory, getItems } from "../../services/storeService";
import { useLanguage } from "../../context/LanguageContext";

export default function InputsHistory() {
  const { t, lang } = useLanguage();
  const [history, setHistory] = useState([]);
  const [items, setItems] = useState({});

  useEffect(() => {
    Promise.all([getInputsHistory(), getItems()]).then(([h, i]) => {
      setHistory(h);
      const itemsMap = {};
      i.forEach(item => itemsMap[item.id] = item);
      setItems(itemsMap);
    });
  }, []);

  const formatDate = (ts) => {
    if (!ts) return "—";
    const date = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
    return date.toLocaleString(lang === "es" ? "es-ES" : "en-US");
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>{t("nav.inputs_history")}</h2>
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>{t("common.date")}</th>
                <th style={styles.th}>{t("common.item")}</th>
                <th style={styles.th}>{t("common.qty")}</th>
                <th style={styles.th}>{t("common.supplier")}</th>
              </tr>
            </thead>
            <tbody>
              {history.map(row => (
                <tr key={row.id} style={styles.tr}>
                  <td style={styles.td}>{formatDate(row.createdAt || row.date)}</td>
                  <td style={styles.td}>{items[row.itemId]?.name || t("common.unknown_item")}</td>
                  <td style={{ ...styles.td, fontWeight: "700", color: "#2c7a7b" }}>+{row.quantity}</td>
                  <td style={styles.td}>{row.supplier || "—"}</td>
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
};
