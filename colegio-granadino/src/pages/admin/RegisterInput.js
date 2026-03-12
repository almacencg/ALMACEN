// src/pages/admin/RegisterInput.js
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getItems, registerInput } from "../../services/storeService";
import { useLanguage } from "../../context/LanguageContext";

export default function RegisterInput() {
  const { t } = useLanguage();
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemId || !quantity) return setMessage({ text: t("common.required_fields"), type: "error" });

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await registerInput({
        itemId,
        quantity: Number(quantity),
        supplier,
        date: new Date().toISOString()
      });
      setMessage({ text: t("requisitions.input_success"), type: "success" });
      setQuantity("");
      setSupplier("");
    } catch (error) {
      setMessage({ text: t("requisitions.input_error"), type: "error" });
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>{t("requisitions.register_input_title")}</h2>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          {message.text && (
            <div style={{ ...styles.message, background: message.type === "success" ? "#e6fffa" : "#fff5f5", color: message.type === "success" ? "#2c7a7b" : "#c53030" }}>
              {message.text}
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>{t("common.item")} *</label>
            <select 
              style={styles.input} 
              value={itemId} 
              onChange={e => setItemId(e.target.value)}
              required
            >
              <option value="">{t("common.select_item")}</option>
              {items.map(i => (
                <option key={i.id} value={i.id}>{i.name} ({i.code})</option>
              ))}
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>{t("common.qty")} *</label>
            <input 
              style={styles.input} 
              type="number" 
              value={quantity} 
              onChange={e => setQuantity(e.target.value)}
              placeholder="0"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>{t("common.supplier")}</label>
            <input 
              style={styles.input} 
              type="text" 
              value={supplier} 
              onChange={e => setSupplier(e.target.value)}
              placeholder="..."
            />
          </div>

          <button 
            type="submit" 
            style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? t("common.saving") : t("nav.register_input")}
          </button>
        </form>
      </div>
    </Layout>
  );
}

const styles = {
  container: { padding: 32, maxWidth: 600, margin: "0 auto" },
  title: { color: "#6B0F2B", fontSize: 24, fontWeight: "700", marginBottom: 24, textAlign: "center", letterSpacing: 1 },
  form: { background: "#fff", padding: 32, borderRadius: 8, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: 20 },
  field: { display: "flex", flexDirection: "column", gap: 8 },
  label: { fontSize: 12, fontWeight: "700", color: "#4a0a1e", letterSpacing: 0.5 },
  input: { padding: "12px 16px", borderRadius: 4, border: "1px solid #ddd", fontSize: 16, outline: "none" },
  submitBtn: { background: "#6B0F2B", color: "#fff", padding: "16px", borderRadius: 4, border: "none", fontWeight: "700", fontSize: 16, cursor: "pointer", marginTop: 10, transition: "background 0.2s" },
  message: { padding: 12, borderRadius: 4, fontSize: 14, fontWeight: "600", textAlign: "center" }
};
