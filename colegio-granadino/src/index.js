// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Reset de estilos básico
const globalStyle = document.createElement("style");
globalStyle.textContent = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', sans-serif; }
  button { font-family: inherit; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #f1f1f1; }
  ::-webkit-scrollbar-thumb { background: #6B0F2B; border-radius: 3px; }
`;
document.head.appendChild(globalStyle);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><App /></React.StrictMode>);
