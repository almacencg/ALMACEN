# 🏫 Colegio Granadino — Sistema de Gestión de Almacén

App web React + Firebase para gestión de inventario, entradas/salidas y requisiciones.

---

## 🛠️ Stack

| Tecnología | Uso |
|---|---|
| React 18 | Frontend |
| React Router v6 | Navegación |
| Firebase Auth | Login (Email + Google) |
| Firestore | Base de datos |
| Firebase Storage | Imágenes de productos |
| Firebase Hosting | Despliegue en internet |

---

## 🚀 Configuración inicial (paso a paso)

### 1. Instalar dependencias locales

```bash
# Node.js 18+ requerido
npm install
```

### 2. Configurar Firebase

#### A) Crear proyecto en Firebase Console
1. Ve a [https://console.firebase.google.com](https://console.firebase.google.com)
2. Crea un nuevo proyecto: `colegio-granadino-store`
3. Activa **Google Analytics** (opcional)

#### B) Activar servicios
En el menú lateral de Firebase Console:
- **Authentication** → Habilitar proveedores: `Email/Password` y `Google`
- **Firestore Database** → Crear base de datos en modo producción
- **Storage** → Crear bucket de almacenamiento

#### C) Obtener configuración
- Ve a **Configuración del proyecto** (ícono ⚙️)
- Scroll hasta "Tus apps" → Agrega app web (`</>`)
- Copia el objeto `firebaseConfig`

#### D) Pegar configuración en el código
Abre `src/services/firebase.js` y reemplaza:
```js
const firebaseConfig = {
  apiKey: "TU_API_KEY",              // ← reemplaza
  authDomain: "TU_PROJECT_ID...",    // ← reemplaza
  projectId: "TU_PROJECT_ID",        // ← reemplaza
  storageBucket: "TU_PROJECT_ID...", // ← reemplaza
  messagingSenderId: "...",          // ← reemplaza
  appId: "..."                       // ← reemplaza
};
```

#### E) Actualizar .firebaserc
Abre `.firebaserc` y reemplaza `TU_FIREBASE_PROJECT_ID` con tu Project ID real.

### 3. Instalar Firebase CLI

```bash
npm install -g firebase-tools
firebase login       # Abre el navegador para autenticarte con Google
firebase use --add   # Selecciona tu proyecto
```

### 4. Publicar reglas de seguridad

```bash
firebase deploy --only firestore:rules,storage
```

### 5. Crear el primer usuario Admin

Después de hacer login por primera vez, ve a Firebase Console → Firestore → colección `users` → tu documento → cambia `role` de `"user"` a `"admin"`.

---

## 💻 Desarrollo local

```bash
npm start
# Abre http://localhost:3000
```

---

## 🌐 Desplegar en internet

```bash
npm run build        # Genera la carpeta /build optimizada
firebase deploy      # Sube a Firebase Hosting

# URL pública: https://TU_PROJECT_ID.web.app
```

---

## 📁 Estructura del proyecto

```
src/
├── context/
│   └── AuthContext.js        # Estado global del usuario autenticado
├── services/
│   ├── firebase.js           # ⚠️ Configuración Firebase (pon tus claves aquí)
│   ├── authService.js        # Login, logout, Google
│   └── storeService.js       # CRUD: items, inputs, outputs, requisitions
├── components/
│   └── layout/
│       └── Layout.js         # Sidebar + Topbar compartido
├── pages/
│   ├── LoginPage.js
│   ├── admin/
│   │   └── AdminDashboard.js
│   └── user/
│       └── (próximas páginas)
└── App.js                    # Rutas + protección por rol
```

---

## 🔒 Roles de usuario

| Rol | Acceso |
|---|---|
| `admin` | Gestión completa: inventario, inputs, outputs, requisiciones |
| `user` | Solo: submit requisition, view history, special requisition |

El rol se asigna en Firestore → colección `users` → campo `role`.

---

## 📋 Colecciones Firestore

| Colección | Descripción |
|---|---|
| `users` | Perfiles con campo `role` |
| `items` | Productos del almacén |
| `inputs` | Entradas de inventario |
| `outputs` | Salidas de inventario |
| `requisitions` | Requisiciones normales |
| `specialRequisitions` | Requisiciones especiales |

---

## 🔄 Flujo de trabajo Git

```bash
git add .
git commit -m "feat: descripción del cambio"
git push                # Sube a GitHub
npm run deploy          # Despliega en Firebase Hosting
```

---

## ⚠️ Seguridad importante

- **NUNCA** subas `firebase.js` con claves reales a un repositorio público
- Usa variables de entorno `.env` para producción:
  ```
  REACT_APP_FIREBASE_API_KEY=...
  REACT_APP_FIREBASE_PROJECT_ID=...
  ```
- El archivo `.env` ya está en `.gitignore`
