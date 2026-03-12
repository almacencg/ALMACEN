// src/pages/admin/ManageStore.js
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getItems, addItem, updateItem, deleteItem } from "../../services/storeService";
import { useLanguage } from "../../context/LanguageContext";

export default function ManageStore() {
  const { t } = useLanguage();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ code: "", name: "", unit: "UND", price: "", category: "", minStock: "" });

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => getItems().then(setItems);

  const filtered = items.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData(item);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("common.delete_confirm"))) {
      await deleteItem(id);
      refresh();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateItem(editingItem, formData);
    } else {
      await addItem(formData);
    }
    setEditingItem(null);
    setIsAdding(false);
    setFormData({ code: "", name: "", unit: "UND", price: "", category: "", minStock: "" });
    refresh();
  };

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>{t("nav.manage_store")}</h2>
          <div style={styles.actions}>
            <input 
              style={styles.search} 
              placeholder={t("common.search_placeholder")} 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button style={styles.addBtn} onClick={() => { setIsAdding(true); setEditingItem(null); }}>{t("inventory.new_item")}</button>
          </div>
        </div>

        {isAdding && (
          <div style={styles.modalOverlay}>
            <form style={styles.modal} onSubmit={handleSubmit}>
              <h3 style={styles.modalTitle}>{editingItem ? t("inventory.edit_item") : t("inventory.add_new_item")}</h3>
              <div style={styles.grid}>
                <div style={styles.field}><label>{t("inventory.code")}</label><input required value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} style={styles.input} /></div>
                <div style={styles.field}><label>{t("inventory.name")}</label><input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={styles.input} /></div>
                <div style={styles.field}><label>{t("inventory.unit")}</label><input required value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} style={styles.input} /></div>
                <div style={styles.field}><label>{t("inventory.price")}</label><input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={styles.input} /></div>
                <div style={styles.field}><label>{t("inventory.category")}</label><input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={styles.input} /></div>
                <div style={styles.field}><label>{t("inventory.min_stock")}</label><input required type="number" value={formData.minStock} onChange={e => setFormData({...formData, minStock: e.target.value})} style={styles.input} /></div>
              </div>
              <div style={styles.modalActions}>
                <button type="button" style={styles.cancelBtn} onClick={() => setIsAdding(false)}>{t("common.cancel")}</button>
                <button type="submit" style={styles.saveBtn}>{t("common.save_item")}</button>
              </div>
            </form>
          </div>
        )}

        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.theadRow}>
                <th style={styles.th}>{t("inventory.code")}</th>
                <th style={styles.th}>{t("inventory.name")}</th>
                <th style={styles.th}>{t("inventory.unit")}</th>
                <th style={styles.th}>{t("inventory.category")}</th>
                <th style={styles.th}>{t("inventory.stock")}</th>
                <th style={styles.th}>{t("inventory.min_stock")}</th>
                <th style={styles.th}>{t("common.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => (
                <tr key={i.id} style={styles.tbodyRow}>
                  <td style={styles.td}>{i.code}</td>
                  <td style={{ ...styles.td, fontWeight: "600" }}>{i.name}</td>
                  <td style={styles.td}>{i.unit}</td>
                  <td style={styles.td}>{i.category}</td>
                  <td style={{ ...styles.td, color: i.stock <= i.minStock ? "#c00" : "#333", fontWeight: "700" }}>{i.stock}</td>
                  <td style={{ ...styles.td, opacity: 0.6 }}>{i.minStock}</td>
                  <td style={{ ...styles.td, ...styles.actionCell }}>
                    <button style={styles.editBtn} onClick={() => handleEdit(i)}>✏️</button>
                    <button style={styles.deleteBtn} onClick={() => handleDelete(i.id)}>🗑️</button>
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
  container: { padding: 24 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 16 },
  title: { color: "#6B0F2B", margin: 0, fontWeight: "800", letterSpacing: 1 },
  actions: { display: "flex", gap: 12, flex: 1, justifyContent: "flex-end" },
  search: { padding: "10px 16px", borderRadius: 4, border: "1px solid #ddd", width: 300, fontSize: 14, outline: "none" },
  addBtn: { background: "#6B0F2B", color: "#fff", padding: "10px 20px", borderRadius: 4, border: "none", fontWeight: "700", cursor: "pointer" },
  tableCard: { background: "#fff", borderRadius: 8, boxShadow: "0 2px 4px rgba(0,0,0,0.05)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 },
  th: { padding: "16px 20px" },
  td: { padding: "16px 20px" },
  theadRow: { background: "#6B0F2B", color: "#fff" },
  tbodyRow: { borderBottom: "1px solid #eee" },
  actionCell: { display: "flex", gap: 8 },
  editBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 16 },
  deleteBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 16 },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#fff", padding: 32, borderRadius: 8, width: 600, maxWidth: "90%" },
  modalTitle: { margin: "0 0 24px 0", color: "#6B0F2B" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 4 },
  input: { padding: "10px", borderRadius: 4, border: "1px solid #ddd", fontSize: 14 },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 },
  cancelBtn: { padding: "10px 20px", border: "none", background: "#eee", borderRadius: 4, cursor: "pointer", fontWeight: "600" },
  saveBtn: { padding: "10px 20px", border: "none", background: "#6B0F2B", color: "#fff", borderRadius: 4, cursor: "pointer", fontWeight: "600" }
};
