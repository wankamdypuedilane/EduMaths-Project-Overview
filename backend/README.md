# Backend (Supabase)

Ce dossier est destiné aux ressources backend.

- SQL/Migrations : `sql/` contient `supabase-setup.sql` (tables progression/streaks) et accueillera les futures migrations.
- Fonctions Edge/RPC : créer `backend/functions/` pour les fonctions Supabase ou RPC.
- Clés et variables d’environnement : prévoir un `.env` côté backend (ex: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) séparé du frontend.
- Scripts d’admin : regrouper ici les scripts de maintenance (ex: suppression d’utilisateurs, seeds).

A faire pour finaliser la séparation :

1. Déplacer les fichiers SQL existants.
2. Documenter les commandes `supabase db push`, `supabase functions deploy`, etc.
3. Mettre à jour le README racine pour pointer vers `frontend/` et `backend/`.
