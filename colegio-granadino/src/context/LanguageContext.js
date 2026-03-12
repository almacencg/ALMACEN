// src/context/LanguageContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../translations/en.json";
import es from "../translations/es.json";

const translations = { en, es };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "es");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[lang];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Fallback to key if not found
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
