// src/services/firebase.js
// ⚠️  IMPORTANTE: Reemplaza estos valores con los de tu proyecto Firebase
// Los encuentras en: Firebase Console → Configuración del proyecto → Tus apps

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Forzar que Google pida seleccionar cuenta del colegio
googleProvider.setCustomParameters({
  prompt: "select_account",
  // Opcional: restringir solo a dominio del colegio
  // hd: "colegioGranadino.edu"
});

export default app;
