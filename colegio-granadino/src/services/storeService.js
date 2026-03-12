// src/services/storeService.js
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc,
  deleteDoc, query, where, orderBy, limit, serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage, USE_MOCK } from "./firebase";

const USE_LOCAL_API = process.env.REACT_APP_USE_LOCAL_API === "true";
const API_URL = "http://localhost:3001/api";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const MOCK_ITEMS = [
  { id: "item-1", code: "AL-AD2005", name: "BANDERAS", unit: "UND", stock: 6, price: 1059.93, category: "Arte y Decoración", minStock: 3 },
  { id: "item-2", code: "AL-PP1265", name: "LAPICERO", unit: "UND", stock: 56, price: 459.57, category: "Papelería y Útiles", minStock: 8 },
  { id: "item-3", code: "AL-LS8027", name: "BOMBILLO 30W LED", unit: "UND", stock: 3, price: 20840.34, category: "Luminaria", minStock: 5 },
];

const MOCK_REQUISITIONS = [
  { id: "req-1", userId: "admin-uid", type: "NORMAL", status: "PENDING", activity: "Papeleria", section: "Almacen", budget: 150000, createdAt: { seconds: Date.now()/1000 } },
  { id: "req-2", userId: "admin-uid", type: "NORMAL", status: "APPROVED", activity: "Estimulacion", section: "Preescolar", budget: 80000, createdAt: { seconds: Date.now()/1000 - 86400 } },
];

const MOCK_INPUTS = [
  { id: "in-1", itemId: "item-1", quantity: 10, supplier: "Papelería Panamericana", createdAt: { seconds: Date.now()/1000 - 172800 } },
  { id: "in-2", itemId: "item-2", quantity: 50, supplier: "Distribuidora Nacional", createdAt: { seconds: Date.now()/1000 - 259200 } },
];

const MOCK_OUTPUTS = [
  { id: "out-1", itemId: "item-2", quantity: 5, recipient: "Marta Lopez", reason: "Uso administrativo", createdAt: { seconds: Date.now()/1000 - 43200 } },
];

// ─── HELPER PARA LOCAL API ───────────────────────────────────────────────────
const localFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// ─── ITEMS / INVENTARIO ───────────────────────────────────────────────────────

export const getItems = async () => {
  if (USE_LOCAL_API) return localFetch('/items');
  if (USE_MOCK) return MOCK_ITEMS;
  const q = query(collection(db, "items"), orderBy("name"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addItem = async (itemData) => {
  if (USE_LOCAL_API) return localFetch('/items', { method: 'POST', body: JSON.stringify(itemData) });
  if (USE_MOCK) return { id: "new-item-" + Math.random() };
  return await addDoc(collection(db, "items"), {
    ...itemData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const updateItem = async (itemId, data) => {
  if (USE_LOCAL_API) return localFetch(`/items/${itemId}`, { method: 'PUT', body: JSON.stringify(data) });
  if (USE_MOCK) return;
  await updateDoc(doc(db, "items", itemId), {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const deleteItem = async (itemId) => {
  if (USE_LOCAL_API) return localFetch(`/items/${itemId}`, { method: 'DELETE' });
  if (USE_MOCK) return;
  await deleteDoc(doc(db, "items", itemId));
};

// ─── INPUTS (ENTRADAS DE INVENTARIO) ─────────────────────────────────────────

export const registerInput = async (inputData) => {
  if (USE_LOCAL_API) return localFetch('/inputs', { method: 'POST', body: JSON.stringify(inputData) });
  if (USE_MOCK) return { id: "input-" + Math.random() };
  const docRef = await addDoc(collection(db, "inputs"), {
    ...inputData,
    createdAt: serverTimestamp()
  });
  const itemRef = doc(db, "items", inputData.itemId);
  const itemSnap = await getDoc(itemRef);
  if (itemSnap.exists()) {
    const currentStock = itemSnap.data().stock || 0;
    await updateDoc(itemRef, {
      stock: currentStock + inputData.quantity,
      updatedAt: serverTimestamp()
    });
  }
  return docRef;
};

export const getInputsHistory = async (dateFilter = null) => {
  if (USE_LOCAL_API) return localFetch('/history/inputs');
  if (USE_MOCK) return MOCK_INPUTS;
  let q = query(collection(db, "inputs"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── OUTPUTS (SALIDAS DE INVENTARIO) ─────────────────────────────────────────

export const registerOutput = async (outputData) => {
  if (USE_LOCAL_API) return localFetch('/outputs', { method: 'POST', body: JSON.stringify(outputData) });
  if (USE_MOCK) return { id: "output-" + Math.random() };
  const docRef = await addDoc(collection(db, "outputs"), {
    ...outputData,
    createdAt: serverTimestamp()
  });
  const itemRef = doc(db, "items", outputData.itemId);
  const itemSnap = await getDoc(itemRef);
  if (itemSnap.exists()) {
    const currentStock = itemSnap.data().stock || 0;
    await updateDoc(itemRef, {
      stock: Math.max(0, currentStock - outputData.quantity),
      updatedAt: serverTimestamp()
    });
  }
  return docRef;
};

export const getOutputsHistory = async () => {
  if (USE_LOCAL_API) return localFetch('/history/outputs');
  if (USE_MOCK) return MOCK_OUTPUTS;
  const q = query(collection(db, "outputs"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── REQUISITIONS (REQUISICIONES) ────────────────────────────────────────────

export const createRequisition = async (requisitionData) => {
  if (USE_LOCAL_API) return localFetch('/requisitions', { method: 'POST', body: JSON.stringify(requisitionData) });
  if (USE_MOCK) return { id: "req-" + Math.random() };
  return await addDoc(collection(db, "requisitions"), {
    ...requisitionData,
    status: "PENDING",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const updateRequisitionStatus = async (reqId, status, notes = "") => {
  if (USE_LOCAL_API) return localFetch(`/requisitions/${reqId}`, { method: 'PATCH', body: JSON.stringify({ status, notes }) });
  if (USE_MOCK) return;
  await updateDoc(doc(db, "requisitions", reqId), {
    status,
    notes,
    updatedAt: serverTimestamp()
  });
};

export const getRequisitions = async (userId = null) => {
  if (USE_LOCAL_API) return localFetch(`/requisitions${userId ? `?userId=${userId}` : ''}`);
  if (USE_MOCK) return MOCK_REQUISITIONS;
  let q = userId
    ? query(collection(db, "requisitions"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    : query(collection(db, "requisitions"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getLastRequisitions = async (count = 5) => {
  if (USE_LOCAL_API) return (await localFetch('/requisitions')).slice(0, count);
  if (USE_MOCK) return MOCK_REQUISITIONS.slice(0, count);
  const q = query(collection(db, "requisitions"), orderBy("createdAt", "desc"), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── SPECIAL REQUISITIONS ────────────────────────────────────────────────────

export const createSpecialRequisition = async (data) => {
  if (USE_LOCAL_API) return localFetch('/requisitions', { method: 'POST', body: JSON.stringify({ ...data, type: "SPECIAL" }) });
  if (USE_MOCK) return { id: "spec-req-" + Math.random() };
  return await addDoc(collection(db, "specialRequisitions"), {
    ...data,
    status: "PENDING",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const getSpecialRequisitions = async (userId = null) => {
  if (USE_LOCAL_API) return (await localFetch(`/requisitions${userId ? `?userId=${userId}` : ''}`)).filter(r => r.type === "SPECIAL");
  if (USE_MOCK) return [];
  let q = userId
    ? query(collection(db, "specialRequisitions"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    : query(collection(db, "specialRequisitions"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── UPLOAD DE IMÁGENES ───────────────────────────────────────────────────────

export const uploadItemImage = async (file, itemId) => {
  if (USE_MOCK || USE_LOCAL_API) return "https://via.placeholder.com/150";
  if (file.size > 256 * 1024) throw new Error("La imagen supera 256KB");
  const storageRef = ref(storage, `items/${itemId}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// ─── LOW STOCK ────────────────────────────────────────────────────────────────

export const getLowStockItems = async (threshold = 5) => {
  if (USE_LOCAL_API) return (await localFetch('/items')).filter(i => i.stock <= threshold);
  if (USE_MOCK) return MOCK_ITEMS.filter(i => i.stock <= threshold);
  const q = query(collection(db, "items"), where("stock", "<=", threshold));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── USERS ────────────────────────────────────────────────────────────────────

export const getUsers = async () => {
  if (USE_LOCAL_API) return localFetch('/users');
  if (USE_MOCK) return [{ id: "admin-uid", name: "SERGIO FARFAN RICO", email: "admin@colegiogranadino.edu.co", role: "admin" }];
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateUserRole = async (userId, role) => {
  if (USE_LOCAL_API) return localFetch(`/users/${userId}`, { method: 'PATCH', body: JSON.stringify({ role }) });
  if (USE_MOCK) return;
  await updateDoc(doc(db, "users", userId), { role });
};
