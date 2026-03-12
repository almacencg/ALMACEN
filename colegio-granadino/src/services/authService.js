// src/services/authService.js
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider, USE_MOCK } from "./firebase";

const USE_LOCAL_API = process.env.REACT_APP_USE_LOCAL_API === "true";
const API_URL = "http://localhost:3001/api";

// Login con email y contraseña
export const loginWithEmail = async (email, password) => {
  if (USE_LOCAL_API) {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error(await res.text());
    const user = await res.json();
    localStorage.setItem("localUser", JSON.stringify(user));
    window.location.reload();
    return user;
  }

  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 800));
    if (email === "admin@colegiogranadino.edu.co" && password === "Admin2026!") {
      const mockUser = { uid: "admin-uid", email, displayName: "SERGIO FARFAN RICO" };
      localStorage.setItem("mockUser", JSON.stringify(mockUser));
      window.location.reload(); 
      return mockUser;
    }
    throw new Error("Credenciales inválidas");
  }
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

// Login con Google
export const loginWithGoogle = async () => {
  if (USE_LOCAL_API || USE_MOCK) {
    // Para modo local, fingimos un login de admin
    return loginWithEmail("admin@colegiogranadino.edu.co", "Admin2026!");
  }
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  await ensureUserProfile(user);
  return user;
};

// Cerrar sesión
export const logout = () => {
  if (USE_LOCAL_API) {
    localStorage.removeItem("localUser");
    window.location.reload();
    return;
  }
  if (USE_MOCK) {
    localStorage.removeItem("mockUser");
    window.location.reload();
    return;
  }
  return signOut(auth);
}

// Escuchar cambios de autenticación
export const onAuthChange = (callback) => {
  if (USE_LOCAL_API) {
    const savedUser = localStorage.getItem("localUser");
    callback(savedUser ? JSON.parse(savedUser) : null);
    return () => {};
  }
  if (USE_MOCK) {
    const savedUser = localStorage.getItem("mockUser");
    callback(savedUser ? JSON.parse(savedUser) : null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

// Obtener perfil del usuario
export const getUserProfile = async (uid) => {
  if (USE_LOCAL_API) {
    const savedUser = localStorage.getItem("localUser");
    if (savedUser) return JSON.parse(savedUser);
    return null;
  }
  if (USE_MOCK) {
    if (uid === "admin-uid" || uid === "user-uid") {
      return { uid, name: "USER TEST", email: "test@test.com", role: uid === "admin-uid" ? "admin" : "user" };
    }
    return null;
  }
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
  return null;
};

// Crear perfil si no existe
const ensureUserProfile = async (user) => {
  if (USE_LOCAL_API || USE_MOCK) return;
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(docRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: "user",
      createdAt: new Date().toISOString()
    });
  }
};
