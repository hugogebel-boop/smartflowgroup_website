
# SmartFlow — Preview (Vite + React + TS + Tailwind + Framer Motion)

Aperçu du site avec sections **Hero → Nos services → Dév (scroll-scrub typing)**.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvre ensuite l'URL indiquée (par défaut http://localhost:5173).

## Déploiement GitHub Pages (recommandé)

1. **Crée un repo** sur GitHub (ex: `smartflow-site`), push ce projet dessus (branche `main`).  
2. Dans `vite.config.ts`, remplace:

```ts
base: '/REPO_NAME/'
```

par

```ts
base: '/smartflow-site/'
```

> Si tu utilises un **custom domain** ou GitHub Pages pour un **user/organization site** (ex: `username.github.io`), mets simplement:
>
> ```ts
> base: '/'
> ```

3. **Active GitHub Pages**: Dans Settings → Pages → Build and deployment → Source = **GitHub Actions**.
4. Le workflow `Deploy to GitHub Pages` se déclenche sur chaque push vers `main`.  
   La page sera dispo à l’URL fournie par GitHub Pages.

## Stack

- Vite + React + TypeScript
- TailwindCSS
- Framer Motion

## Structure

```
.
├── .github/workflows/deploy.yml
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src
    ├── App.tsx
    ├── index.css
    └── main.tsx
```

---

Besoin d'une version **Next.js** avec export statique ou d’un **header sticky** avec repères actifs ? Dis‑moi ✌️
