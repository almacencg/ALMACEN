// src/pages/admin/AdminDashboard.js
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { getLastRequisitions, getLowStockItems } from "../../services/storeService";

const STATUS_COLORS = {
  PENDING: "#888",
  CANCELLED: "#c00",
  IN_PROGRESS: "#f90",
  APPROVED: "#0a0",
  ISSUED: "#09c",
};

export default function AdminDashboard() {
  const [requisitions, setRequisitions] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    getLastRequisitions(10).then(setRequisitions);
    getLowStockItems(5).then(setLowStock);
  }, []);

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.panel}>
          <div style={styles.panelHeader}>LAST REQUISITIONS</div>
          <div style={styles.panelBody}>
            {requisitions.length === 0
              ? <p style={styles.empty}>No requisitions yet</p>
              : requisitions.map(r => (
                <div key={r.id} style={styles.row}>
                  <span style={styles.rowText}>{r.activity || "—"}</span>
                  <span style={{ ...styles.badge, background: STATUS_COLORS[r.status] || "#888" }}>
                    {r.status}
                  </span>
                </div>
              ))
            }
          </div>
        </div>

        <div style={styles.panel}>
          <div style={styles.panelHeader}>LOW STORE</div>
          <div style={styles.panelBody}>
            {lowStock.length === 0
              ? <p style={styles.empty}>All items well stocked</p>
              : lowStock.map(item => (
                <div key={item.id} style={styles.row}>
                  <span style={styles.rowText}>{item.name}</span>
                  <span style={styles.stockBadge}>
                    {item.stock <= 0 ? "⛔ OUT" : `⚠️ ${item.stock}`}
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    padding: 24,
    height: "100%",
    boxSizing: "border-box",
  },
  panel: {
    background: "#fff",
    borderRadius: 4,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  panelHeader: {
    background: "#6B0F2B",
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    padding: "16px 20px",
    letterSpacing: 1,
  },
  panelBody: {
    flex: 1,
    padding: 12,
    overflowY: "auto",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 8px",
    borderBottom: "1px solid #eee",
  },
  rowText: {
    fontSize: 14,
    color: "#333",
  },
  badge: {
    color: "#fff",
    padding: "3px 10px",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  stockBadge: {
    fontSize: 13,
    fontWeight: "700",
  },
  empty: {
    color: "#999",
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
  },
};
