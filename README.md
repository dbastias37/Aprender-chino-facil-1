# Aprender Chino Fácil (React + Vite + Tailwind)

Proyecto listo para deploy en **Render** como Static Site.

## Instrucciones (Render - Static Site)
1. Sube este código a un repo en GitHub.
2. Crea un *Static Site* en Render y conecta tu repo.
3. **Build Command:** `npm run build`
4. **Publish Directory:** `dist`
5. (Opcional) Variable de entorno: `NODE_VERSION=18`

## Desarrollo local
```bash
npm install
npm run dev
```

## Estructura
- `src/ChineseLearningApp.jsx` — Tu app (última versión del lienzo, con validaciones en runtime).
- `src/App.jsx` — Wrapper de la app.
- `src/main.jsx` — Punto de entrada de Vite.
- `tailwind.config.js` + `postcss.config.js` + `src/index.css` — Tailwind CSS.

---

Hecho para correr igual que en el canvas del chat, en una Static Page.
