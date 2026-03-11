// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const COLORS = {
  primary: "#6B0F2B",
  light: "#f0f0f0",
  white: "#ffffff",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("es");
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) return setError("Completa todos los campos");
    setLoading(true);
    setError("");
    try {
      await loginWithEmail(email, password);
      // La redirección la maneja App.js según el rol
    } catch (e) {
      setError("Credenciales inválidas");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle();
    } catch (e) {
      setError("Error al acceder con Google");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* Banderas de idioma */}
      <div style={styles.flags}>
        <button onClick={() => setLang("es")} style={{ ...styles.flagBtn, opacity: lang === "es" ? 1 : 0.5 }}>
          <span style={styles.flag}>🇪🇸</span>
        </button>
        <button onClick={() => setLang("en")} style={{ ...styles.flagBtn, opacity: lang === "en" ? 1 : 0.5 }}>
          <span style={styles.flag}>🇺🇸</span>
        </button>
      </div>

      {/* Logo */}
      <div style={styles.logoContainer}>
        <div style={styles.logoCircle}>
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke={COLORS.primary} strokeWidth="3"/>
            <text x="50" y="45" textAnchor="middle" fontSize="28" fontWeight="bold" fill={COLORS.primary} fontFamily="Georgia, serif">C</text>
            <text x="50" y="70" textAnchor="middle" fontSize="18" fontWeight="bold" fill={COLORS.primary} fontFamily="Georgia, serif">G</text>
          </svg>
        </div>
        <p style={styles.logoText}>Colegio Granadino</p>
      </div>

      {/* Form */}
      <div style={styles.form}>
        {error && <div style={styles.error}>{error}</div>}

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
        />

        <div style={styles.passwordWrapper}>
          <input
            style={{ ...styles.input, paddingRight: 50 }}
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
          <button
            onClick={() => setShowPass(!showPass)}
            style={styles.eyeBtn}
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>

        <div style={styles.buttons}>
          <button
            style={{ ...styles.btn, background: COLORS.primary, opacity: loading ? 0.7 : 1 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "..." : lang === "es" ? "VALIDAR" : "VALIDATE"}
          </button>
          <button
            style={{ ...styles.btn, background: COLORS.white, border: `1px solid #ddd`, color: "#333" }}
            onClick={handleGoogle}
            disabled={loading}
          >
            <span style={{ marginRight: 8 }}>
              <svg width="18" height="18" viewBox="0 0 48 48" style={{ verticalAlign: "middle" }}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </span>
            {lang === "es" ? "ACCEDER" : "ACCESS"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#e8e8e8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    position: "relative",
  },
  flags: {
    position: "absolute",
    top: 20,
    right: 20,
    display: "flex",
    gap: 8,
  },
  flagBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "opacity 0.2s",
  },
  flag: {
    fontSize: 36,
    borderRadius: "50%",
    display: "block",
    width: 44,
    height: 44,
    lineHeight: "44px",
    textAlign: "center",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 32,
  },
  logoCircle: { marginBottom: 8 },
  logoText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primary,
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
    maxWidth: 380,
    padding: "0 24px",
  },
  input: {
    padding: "16px 18px",
    borderRadius: 8,
    border: "none",
    background: COLORS.white,
    fontSize: 16,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    color: "#555",
  },
  passwordWrapper: {
    position: "relative",
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 20,
  },
  buttons: {
    display: "flex",
    gap: 12,
    marginTop: 4,
  },
  btn: {
    flex: 1,
    padding: "16px 0",
    borderRadius: 8,
    border: "none",
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
    cursor: "pointer",
    letterSpacing: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    background: "#fee",
    color: "#c00",
    padding: "10px 14px",
    borderRadius: 6,
    fontSize: 14,
    textAlign: "center",
  },
};
