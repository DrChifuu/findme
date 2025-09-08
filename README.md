# FindMe – Pulsera NFC (Frontend + Backend)

Este repositorio contiene:
- **frontend/**: HTML/Tailwind listo (estático).
- **backend/**: API en Node.js + Express + MySQL.
- **backend/schema.sql**: *Diseño de la base de datos* (DDL + datos de ejemplo).
- **backend/.env.example**: ejemplo de variables de entorno.

## 1) Requisitos
- Node.js 18+
- MySQL 8+
- (Opcional) Postman/Insomnia para probar

## 2) Backend (Express + MySQL)
```bash
cd backend
cp .env.example .env   # edita usuario/clave de MySQL
npm install
# Crea BD y tabla
# abre MySQL y ejecuta:
#   SOURCE /ruta/al/repo/backend/schema.sql;
npm start
```

Endpoints:
- `POST /api/ficha` → crea ficha y devuelve `slug` (UUID) para el NFC.
- `GET /api/ficha/:slug` → obtiene ficha.
- `PUT /api/ficha/:slug` → actualiza ficha.

## 3) Frontend
Abrir `frontend/index.html` en el navegador.  
Pasa el `slug` por URL, ejemplo:
```
frontend/index.html?id=3c5a2e39-8d89-4c6a-9b61-2c9b5b5f7a22
```
El dueño (simulado) puede editar y guardar usando la API.

## 4) Flujo NFC sugerido
- Al crear una ficha (`POST /api/ficha`) te guardas el `slug`.
- Grabas en el chip NFC una URL como:
  `https://tu-dominio.com/frontend/index.html?id=<slug>`
- Al escanear, se abre la vista pública con los datos.

## 5) Calidad de UI (rubrica)
- **Framework moderno**: TailwindCSS (mobile-first, utilidades responsivas).
- **Responsividad**: `max-w-lg`, `p-6`, `grid/flex` y tamaños relativos aseguran buen render en móvil/tablet/escritorio.
- **Accesibilidad/UX**: etiquetas `<label>`, estados de foco por defecto, contraste alto (`text-green-700`, `bg-white`),
  feedback al guardar.
- **Buenas prácticas**: componentes simples, código limpio, separación frontend/backend.

## 6) Estructura
```
findme-project/
├─ frontend/
│  └─ index.html
└─ backend/
   ├─ server.js
   ├─ db.js
   ├─ package.json
   ├─ .env.example
   └─ schema.sql
```

## 7) Git (subir a GitHub)
```bash
cd /ruta/a/findme-project
git init
git add .
git commit -m "FindMe: frontend + backend + schema SQL"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/findme.git
git push -u origin main
```
