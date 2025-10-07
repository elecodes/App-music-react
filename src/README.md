# 🎵 Music App

Aplicación de música con React que permite buscar canciones usando la API de iTunes, escucharlas en preview, añadirlas a favoritos y gestionar la lista con paginación y almacenamiento en localStorage.

---

## 🚀 Funcionalidades

- 🔍 **Búsqueda de canciones** por artista o título usando la API pública de iTunes.
- 🎶 **Reproductor de audio** integrado (preview de 30s).
- ⭐ **Lista de favoritos**:
  - Guardada en **LocalStorage** para persistencia.
  - Posibilidad de añadir y quitar canciones.
  - Vista en **sidebar** con paginación independiente.
- 🖼️ **Vista en grid con carátulas**.
- 📱 **Responsive**:
  - En móvil: favoritos aside.
  - En escritorio: favoritos como columna lateral estrecha.
- 📑 **Paginación**:
  - Resultados de canciones.
  - Favoritos.

---

## 🛠️ Tecnologías

- [React](https://react.dev/) con Hooks (`useState`, `useEffect`)
- API pública de [iTunes Search](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html)
- CSS Grid + Flexbox

---

## 📂 Estructura del proyecto

📦 music-app
┣ 📂 src
┃ ┣ 📜 App.jsx
┃ ┣ 📜 App.css
┃ ┗ 📜 index.jsx
┣ 📜 package.json
┣ 📜 README.md
┣ 📜 .gitignore
┗ 📜 vite.config.js (si usas Vite)

---

## ▶️ Ejecución local

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tuusuario/music-app.git
   cd music-app
   ```

   Abre el archivo index.html en tu navegador.
   (no necesita servidor, pero si usas módulos ES6, abre con Live Server en VSCode o similar)

📦 Build

Este proyecto no requiere build, basta con abrir el index.html.

📸 Vista previa

( añadir una captura de pantalla )

📜 Licencia

MIT © 2025
