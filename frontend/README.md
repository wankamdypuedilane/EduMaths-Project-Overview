# Frontend

Projet React/Vite existant. Prochaines étapes pour le séparer clairement :

- Déplacer les dossiers/fichiers suivants ici : `src/`, `public/`, `shared/`, `vite.config.ts`, `index.html`, `package.json`, `package-lock.json` et la config associée.
- Mettre à jour les chemins dans `package.json`/scripts si l’app est déplacée dans `frontend/`.
- Conserver les variables d’environnement côté client (ex: SUPABASE_URL, SUPABASE_ANON_KEY) dans un `.env` dédié au frontend.
- Une fois déplacé, lancer depuis `frontend/`: `npm install` puis `npm run dev`.
