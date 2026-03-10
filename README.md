# STORE-ALMACEN
Sistema web de gestión de almacén e inventario para instituciones educativas — permite registrar entradas/salidas, gestionar requisiciones, controlar stock y hacer seguimiento presupuestal por secciones y actividades.
<img width="300" height="168" alt="logo_granadino-removebg-preview" src="https://github.com/user-attachments/assets/ef076bd2-409a-405e-96e3-5282d55a7a2b" />
# 🏫 StoreManager — Colegio Granadino
<!-- LOGO / BANNER -->
> Sistema web de gestión de almacén e inventario institucional — registra entradas y salidas, controla stock, procesa requisiciones y hace seguimiento presupuestal en tiempo real.

---

## 📌 Descripción

**StoreManager** es una plataforma web de gestión de inventario y requisiciones desarrollada para el **Colegio Granadino**. Permite a administradores y usuarios organizar el flujo de materiales del almacén institucional mediante un panel intuitivo, con control de stock, alertas de inventario bajo, seguimiento de presupuesto por actividad y sección, y un sistema completo de requisiciones con estados rastreables.

El sistema soporta **dos idiomas** (Español / Inglés) y está diseñado para ser usado desde cualquier dispositivo.

---

## ✨ Funcionalidades principales

- 📥 **Registro de Entradas** — Alta de ítems con stock, precio, fecha, fuente y foto adjunta
- 📤 **Registro de Salidas** — Despacho de ítems con control de cantidades por ítem
- 📋 **Requisiciones** — Creación, seguimiento y aprobación de solicitudes de materiales
- ⭐ **Requisiciones Especiales** — Flujo extendido con selección de presupuesto alternativo
- 🏪 **Gestión de Almacén** — Vista de catálogo con alertas de *Out of Stock* y *Low Stock*
- 📊 **Historial de Entradas / Salidas** — Consulta con filtros por fecha y búsqueda
- 🕓 **Historial de Requisiciones** — Trazabilidad completa con filtros por doc, fecha y estado
- 💰 **Control Presupuestal** — Indicador visual del presupuesto consumido vs. total asignado
- 🔔 **Estados de Requisición** — Pending → In Progress → Approved → Issued / Cancelled
- 🌐 **Multilenguaje** — Soporte para Español e Inglés desde cualquier vista
- 📱 **Diseño Responsive** — Adaptado para escritorio y dispositivos móviles

---

## 🖼️ Vistas del sistema

| Login | Dashboard Admin | Gestión de Almacén |
|---|---|---|
| Pantalla de acceso con validación y Google Auth | Últimas requisiciones y alertas de stock bajo | Catálogo con indicadores Out of Stock / Low Stock |

| Registrar Entrada | Registrar Salida | Historial de Entradas |
|---|---|---|
| Alta de ítems con foto y precio | Despacho con selector de cantidad | Tabla con filtro por fecha y búsqueda |

| Requisición | Requisición Especial | Historial de Requisiciones |
|---|---|---|
| Solicitud con actividad, sección y presupuesto | Flujo especial con presupuesto alternativo | Consulta con estados por ítem |

---

## 🏗️ Arquitectura

```
StoreManager/
├── frontend/          # React + TypeScript + TailwindCSS
├── backend/           # Node.js + NestJS (API RESTful)
├── database/          # PostgreSQL + Redis (caché/sesiones)
├── docs/              # Documentación técnica y diagramas
└── tests/             # Casos de prueba y validaciones
```

### Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React, TypeScript, TailwindCSS |
| Backend | Node.js, NestJS |
| Base de datos | PostgreSQL |
| ORM | Prisma / TypeORM |
| Autenticación | JWT + Google OAuth |
| Caché | Redis |
| Tiempo real | Socket.io |

---

## 🗃️ Entidades del sistema

| Entidad | Descripción |
|---|---|
| Usuarios | Roles: Administrador / Usuario estándar |
| Ítems | Productos del almacén con stock, precio y foto |
| Entradas | Registro de ingresos de mercancía |
| Salidas | Registro de despachos de mercancía |
| Requisiciones | Solicitudes de materiales con flujo de aprobación |
| Presupuestos | Control de gasto por actividad y sección |
| Historial | Trazabilidad completa de movimientos |

---

## 🔄 Estados de Requisición

```
PENDING  →  IN PROGRESS  →  APPROVED  →  READY  →  ISSUED
                  ↓
              CANCELLED
```

---

## 👥 Roles y permisos

| Rol | Permisos principales |
|---|---|
| **Administrador** | Control total: entradas, salidas, historial, requisiciones, almacén |
| **Usuario** | Enviar requisiciones, ver historial propio, seguimiento presupuestal |

---

## 🚀 Instalación y uso

### Requisitos previos

- Node.js >= 18.x
- PostgreSQL >= 14
- Redis >= 6

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/store-manager.git
cd store-manager

# 2. Instalar dependencias del backend
cd backend
npm install
cp .env.example .env   # Configurar variables de entorno

# 3. Instalar dependencias del frontend
cd ../frontend
npm install

# 4. Ejecutar migraciones de base de datos
cd ../backend
npx prisma migrate dev

# 5. Iniciar en desarrollo
npm run dev            # Backend en http://localhost:3001
cd ../frontend
npm run dev            # Frontend en http://localhost:3000
```

---

## ⚠️ Alertas del sistema

El sistema notifica automáticamente cuando:

- 🔴 **Out of Stock** — Ítem sin unidades disponibles
- 🟡 **Low Stock** — Ítem con stock por debajo del mínimo configurado
- 🔴 **User Limit Reached** — El usuario ha alcanzado su límite de requisición

---

## 📄 Documentación

El proyecto incluye documentación técnica bajo el estándar **IEEE 830** (Especificación de Requisitos de Software), que cubre:

- Introducción, objetivos y alcance
- Descripción general del producto
- Requisitos funcionales y no funcionales
- Casos de prueba y validación
- Prototipos y diagramas de flujo

Consulta la carpeta `/docs` para acceder al documento completo.

---

## 📋 Estado del proyecto

| Fase | Estado |
|---|---|
| Documentación | ✅ Completada |
| Diseño UI/UX | ✅ Completado |
| MVP / Prototipo | 🔄 En progreso |
| Pruebas | ⏳ Pendiente |
| Despliegue | ⏳ Pendiente |

---

## 🤝 Contribución

1. Haz un fork del proyecto
2. Crea tu rama de feature: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y haz commit: `git commit -m 'feat: agrega nueva funcionalidad'`
4. Sube la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto fue desarrollado como evidencia de formación institucional para el **Colegio Granadino**, Colombia.

---

*Desarrollado con ❤️ para el Colegio Granadino · Colombia*
