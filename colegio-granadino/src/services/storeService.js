// src/services/storeService.js
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc,
  deleteDoc, query, where, orderBy, limit, serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";

// ─── ITEMS / INVENTARIO ───────────────────────────────────────────────────────

export const getItems = async () => {
  const q = query(collection(db, "items"), orderBy("name"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addItem = async (itemData) => {
  return await addDoc(collection(db, "items"), {
    ...itemData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const updateItem = async (itemId, data) => {
  await updateDoc(doc(db, "items", itemId), {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const deleteItem = async (itemId) => {
  await deleteDoc(doc(db, "items", itemId));
};

// ─── INPUTS (ENTRADAS DE INVENTARIO) ─────────────────────────────────────────

export const registerInput = async (inputData) => {
  const docRef = await addDoc(collection(db, "inputs"), {
    ...inputData,
    createdAt: serverTimestamp()
  });
  // Actualizar stock del item
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
  let q = query(collection(db, "inputs"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── OUTPUTS (SALIDAS DE INVENTARIO) ─────────────────────────────────────────

export const registerOutput = async (outputData) => {
  const docRef = await addDoc(collection(db, "outputs"), {
    ...outputData,
    createdAt: serverTimestamp()
  });
  // Reducir stock del item
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
  const q = query(collection(db, "outputs"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── REQUISITIONS (REQUISICIONES) ────────────────────────────────────────────

export const createRequisition = async (requisitionData) => {
  return await addDoc(collection(db, "requisitions"), {
    ...requisitionData,
    status: "PENDING",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const updateRequisitionStatus = async (reqId, status, notes = "") => {
  await updateDoc(doc(db, "requisitions", reqId), {
    status,
    notes,
    updatedAt: serverTimestamp()
  });
};

export const getRequisitions = async (userId = null) => {
  let q = userId
    ? query(collection(db, "requisitions"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    : query(collection(db, "requisitions"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getLastRequisitions = async (count = 5) => {
  const q = query(collection(db, "requisitions"), orderBy("createdAt", "desc"), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── SPECIAL REQUISITIONS ────────────────────────────────────────────────────

export const createSpecialRequisition = async (data) => {
  return await addDoc(collection(db, "specialRequisitions"), {
    ...data,
    status: "PENDING",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const getSpecialRequisitions = async (userId = null) => {
  let q = userId
    ? query(collection(db, "specialRequisitions"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    : query(collection(db, "specialRequisitions"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── UPLOAD DE IMÁGENES ───────────────────────────────────────────────────────

export const uploadItemImage = async (file, itemId) => {
  if (file.size > 256 * 1024) throw new Error("La imagen supera 256KB");
  const storageRef = ref(storage, `items/${itemId}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// ─── LOW STOCK ────────────────────────────────────────────────────────────────

export const getLowStockItems = async (threshold = 5) => {
  const q = query(collection(db, "items"), where("stock", "<=", threshold));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── USERS ────────────────────────────────────────────────────────────────────

export const getUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateUserRole = async (userId, role) => {
  await updateDoc(doc(db, "users", userId), { role });
};
