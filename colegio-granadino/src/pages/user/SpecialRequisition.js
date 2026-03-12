// src/pages/user/SpecialRequisition.js
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { createSpecialRequisition } from "../../services/storeService";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

export default function SpecialRequisition() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ activity: "", section: "", description: "", estimatedCost: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.activity) return setMessage({ text: t("common.required_fields"), type: "error" });

    setLoading(true);
    try {
      await createSpecialRequisition({
        userId: user.uid,
        ...formData,
        date: new Date().toISOString()
      });
      setMessage({ text: t("requisitions.special_success"), type: "success" });
      setFormData({ activity: "", section: "", description: "", estimatedCost: "" });
    } catch (err) {
      setMessage({ text: t("requisitions.error"), type: "error" });
    }
    setLoading(false);
  };

  return (
    <Layout showBudget budget={500000} spent={125000}>
      <div style={styles.container}>
        <h2 style={styles.title}>{t("nav.special_requisition")}</h2>
        <p style={styles.subtitle}>{t("requisitions.special_help")}</p>
        
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
            <label style={styles.label}>{t("requisitions.special_desc")} *</label>
            <textarea 
              style={{ ...styles.input, height: 120, resize: "none" }} 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              placeholder={t("requisitions.special_placeholder")}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>{t("requisitions.special_cost")}</label>
            <input style={styles.input} type="number" value={formData.estimatedCost} onChange={e => setFormData({...formData, estimatedCost: e.target.value})} placeholder="0.00" />
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? t("requisitions.sending") : t("requisitions.submit_special")}
          </button>
        </form>
      </div>
    </Layout>
  );
}

const styles = {
  container: { padding: 32, maxWidth: 600, margin: "0 auto" },
  title: { color: "#6B0F2B", margin: 0, fontWeight: "800", textAlign: "center" },
  subtitle: { textAlign: "center", color: "#666", fontSize: 14, marginBottom: 32, marginTop: 8 },
  panel: { background: "#fff", padding: 32, borderRadius: 8, boxShadow: "0 4px 6px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 20 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, fontWeight: "700", color: "#6B0F2B" },
  input: { padding: "12px 16px", borderRadius: 4, border: "1px solid #ddd", outline: "none", fontSize: 15 },
  submitBtn: { background: "#6B0F2B", color: "#fff", border: "none", padding: 16, borderRadius: 4, fontWeight: "700", cursor: "pointer", marginTop: 10 },
  message: { padding: 12, borderRadius: 4, fontSize: 13, textAlign: "center" }
};
