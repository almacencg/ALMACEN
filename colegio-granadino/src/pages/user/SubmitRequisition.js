// src/pages/user/SubmitRequisition.js
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getItems, createRequisition } from "../../services/storeService";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

export default function SubmitRequisition() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [allItems, setAllItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({ activity: "", section: "", budget: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    getItems().then(setAllItems);
  }, []);

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) return;
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const updateQty = (id, q) => {
    setCart(cart.map(c => c.id === id ? { ...c, quantity: Math.max(1, q) } : c));
  };

  const removeItem = (id) => setCart(cart.filter(c => c.id !== id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return setMessage({ text: t("requisitions.no_items"), type: "error" });
    if (!formData.activity || !formData.section) return setMessage({ text: t("common.required_fields"), type: "error" });

    setLoading(true);
    try {
      await createRequisition({
        userId: user.uid,
        ...formData,
        items: cart.map(c => ({ id: c.id, name: c.name, quantity: c.quantity })),
        date: new Date().toISOString()
      });
      setMessage({ text: t("requisitions.success"), type: "success" });
      setCart([]);
      setFormData({ activity: "", section: "", budget: "" });
    } catch (err) {
      setMessage({ text: t("requisitions.error"), type: "error" });
    }
    setLoading(false);
  };

  return (
    <Layout showBudget budget={500000} spent={125000}>
      <div style={styles.container}>
        <div style={styles.left}>
          <h2 style={styles.title}>{t("nav.submit_requisition")}</h2>
          <form style={styles.panel} onSubmit={handleSubmit}>
            {message.text && (
              <div style={{ ...styles.message, background: message.type === "success" ? "#e6fffa" : "#fff5f5", color: message.type === "success" ? "#2c7a7b" : "#c53030" }}>
                {message.text}
              </div>
            )}
            <div style={styles.field}>
              <label style={styles.label}>{t("requisitions.activity")} *</label>
              <input style={styles.input} value={formData.activity} onChange={e => setFormData({...formData, activity: e.target.value})} placeholder={t("requisitions.activity_placeholder")} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>{t("requisitions.section")} *</label>
              <input style={styles.input} value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} placeholder={t("requisitions.section_placeholder")} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>{t("requisitions.estimated_budget")}</label>
              <input style={styles.input} type="number" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} placeholder={t("requisitions.budget_placeholder")} />
            </div>

            <div style={styles.cartArea}>
              <h4 style={styles.cartTitle}>{t("requisitions.selected_items")} ({cart.length})</h4>
              {cart.map(c => (
                <div key={c.id} style={styles.cartRow}>
                  <span>{c.name}</span>
                  <div style={styles.qtyControl}>
                    <input style={styles.qtyInput} type="number" value={c.quantity} onChange={e => updateQty(c.id, Number(e.target.value))} />
                    <button type="button" onClick={() => removeItem(c.id)} style={styles.removeBtn}>✕</button>
                  </div>
                </div>
              ))}
              {cart.length === 0 && <p style={styles.emptyCart}>{t("requisitions.no_items_selected")}</p>}
            </div>

            <button type="submit" style={styles.submitBtn} disabled={loading || cart.length === 0}>
              {loading ? t("requisitions.sending") : t("requisitions.submit_request")}
            </button>
          </form>
        </div>

        <div style={styles.right}>
          <h3 style={styles.title}>{t("requisitions.available_items")}</h3>
          <div style={styles.itemList}>
            {allItems.map(item => (
              <div key={item.id} style={styles.itemCard}>
                <div style={styles.itemInfo}>
                  <span style={styles.itemName}>{item.name}</span>
                  <span style={styles.itemStock}>{t("inventory.stock")}: {item.stock}</span>
                </div>
                <button 
                  onClick={() => addToCart(item)} 
                  style={{ ...styles.addBtn, opacity: cart.find(c => c.id === item.id) ? 0.5 : 1 }}
                >
                  {cart.find(c => c.id === item.id) ? t("requisitions.added") : t("requisitions.add")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, padding: 32, height: "100%", boxSizing: "border-box" },
  left: { display: "flex", flexDirection: "column", gap: 20 },
  right: { display: "flex", flexDirection: "column", gap: 20 },
  title: { color: "#6B0F2B", margin: 0, fontWeight: "800" },
  panel: { background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 4px 6px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, fontWeight: "700", color: "#6B0F2B" },
  input: { padding: "10px 14px", borderRadius: 4, border: "1px solid #ddd", outline: "none" },
  cartArea: { marginTop: 20, borderTop: "2px solid #f0f0f0", paddingTop: 20 },
  cartTitle: { margin: "0 0 12px 0", fontSize: 14, color: "#666" },
  cartRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f9f9f9" },
  qtyControl: { display: "flex", gap: 8, alignItems: "center" },
  qtyInput: { width: 50, padding: 6, borderRadius: 4, border: "1px solid #ddd", textAlign: "center" },
  removeBtn: { background: "none", border: "none", color: "#c00", cursor: "pointer", fontWeight: "bold" },
  emptyCart: { textAlign: "center", color: "#999", fontSize: 14, padding: "20px 0" },
  submitBtn: { background: "#6B0F2B", color: "#fff", border: "none", padding: 16, borderRadius: 4, fontWeight: "700", cursor: "pointer", marginTop: 10 },
  itemList: { background: "#fff", borderRadius: 8, height: "calc(100vh - 200px)", overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 },
  itemCard: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, borderRadius: 6, border: "1px solid #eee" },
  itemInfo: { display: "flex", flexDirection: "column", gap: 2 },
  itemName: { fontWeight: "700", fontSize: 14 },
  itemStock: { fontSize: 12, color: "#999" },
  addBtn: { background: "#6B0F2B", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 4, fontSize: 12, fontWeight: "700", cursor: "pointer" },
  message: { padding: 12, borderRadius: 4, fontSize: 13, textAlign: "center", marginBottom: 10 }
};
