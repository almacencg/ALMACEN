// src/services/authService.js
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "./firebase";

// Login con email y contraseña
export const loginWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

// Login con Google
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  // Verificar si el usuario ya existe en Firestore, si no, crearlo
  await ensureUserProfile(user);
  return user;
};

// Cerrar sesión
export const logout = () => signOut(auth);

// Escuchar cambios de autenticación
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);

// Obtener perfil del usuario desde Firestore
export const getUserProfile = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
  return null;
};

// Crear perfil si no existe
const ensureUserProfile = async (user) => {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(docRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: "user", // Por defecto todos son "user", admin se asigna manualmente
      createdAt: new Date().toISOString()
    });
  }
};
