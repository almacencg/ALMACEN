// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const COLORS = {
  primary: "#6B0F2B",
  light: "#f0f0f0",
  white: "#ffffff",
};

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  React.useEffect(() => {
    if (!authLoading && user) {
      navigate("/", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async () => {
    if (!email || !password) return setError(t("login.error_fields"));
    setLoading(true);
    setError("");
    try {
      await loginWithEmail(email, password);
    } catch (e) {
      setError(t("login.error_credentials"));
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle();
    } catch (e) {
      setError(t("login.error_google"));
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <img 
            src="https://www.colegiogranadino.edu.co/wp-content/uploads/2021/05/logo-colegio-granadino.png" 
            alt="Logo" 
            style={styles.logo} 
          />
          <h1 style={styles.title}>{t("login.title")}</h1>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t("login.email")}</label>
            <input 
              type="email" 
              placeholder={t("login.placeholder_email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>{t("login.password")}</label>
            <div style={styles.passWrapper}>
              <input 
                type={showPass ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.inputPass}
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)} 
                style={styles.toggleBtn}
              >
                {showPass ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button 
            onClick={handleLogin} 
            disabled={loading} 
            style={styles.loginBtn}
          >
            {loading ? t("common.loading") : t("login.validate")}
          </button>

          <div style={styles.divider}>
            <div style={styles.line} />
            <span style={styles.or}>O</span>
            <div style={styles.line} />
          </div>

          <button 
            onClick={handleGoogle} 
            disabled={loading} 
            style={styles.googleBtn}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style={styles.gLogo} />
            {t("login.google")}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.light },
  card: { background: COLORS.white, padding: 40, borderRadius: 12, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", width: 400 },
  header: { textAlign: "center", marginBottom: 30 },
  logo: { width: 100, marginBottom: 15 },
  title: { fontSize: 18, color: COLORS.primary, fontWeight: "800", letterSpacing: 1 },
  error: { background: "#ffebee", color: "#c62828", padding: "10px", borderRadius: 4, marginBottom: 20, fontSize: 13, textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  inputGroup: { display: "flex", flexDirection: "column", gap: 8 },
  label: { fontSize: 12, fontWeight: "700", color: "#666" },
  input: { padding: "12px", borderRadius: 4, border: "1px solid #ddd", outline: "none", fontSize: 14 },
  passWrapper: { display: "flex", border: "1px solid #ddd", borderRadius: 4, overflow: "hidden" },
  inputPass: { flex: 1, padding: "12px", border: "none", outline: "none", fontSize: 14 },
  toggleBtn: { padding: "0 12px", background: "none", border: "none", cursor: "pointer" },
  loginBtn: { background: COLORS.primary, color: COLORS.white, padding: "14px", borderRadius: 4, border: "none", fontWeight: "700", cursor: "pointer" },
  divider: { display: "flex", alignItems: "center", gap: 10, margin: "10px 0" },
  line: { flex: 1, height: 1, background: "#eee" },
  or: { fontSize: 12, color: "#999" },
  googleBtn: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px", border: "1px solid #ddd", background: "white", borderRadius: 4, cursor: "pointer", fontWeight: "600", fontSize: 14 },
  gLogo: { width: 18 }
};
