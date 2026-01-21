# EduMaths Project Overview

> Arbo scindée : `frontend/` (app Vite/React) et `backend/` (Supabase SQL, scripts admin). Pour coder côté UI : `cd frontend && npm i && npm run dev`.

## Running the code (nouvelle arbo)

Le projet est séparé en deux dossiers racine :

- `frontend/` : Vite/React (src, public, config Vite, package.json).
- `backend/` : assets Supabase (SQL, scripts admin, futures fonctions Edge).

Pour lancer le frontend :

1. `cd frontend`
2. `npm i`
3. `npm run dev`

## Supabase (auth + progression)

1. Crée un fichier `.env` dans `frontend/` à partir de [frontend/.env](frontend/.env) et renseigne `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
2. Dans Supabase, exécute le SQL du fichier [backend/sql/supabase-setup.sql](backend/sql/supabase-setup.sql) (tables `exercise_progress`, `streaks` + RLS).
3. Auth : `useAuth` utilise Supabase (signup/login/logout) et conserve un fallback local pour les anciens utilisateurs.
4. Progression : `useProgress` lit/écrit la progression et le streak dans Supabase pour l’utilisateur connecté.

## Documentation LaTeX du Projet

```latex
\documentclass[12pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[french]{babel}
\usepackage{geometry}
\usepackage{hyperref}
\usepackage{listings}
\usepackage{xcolor}
\usepackage{tcolorbox}
\usepackage{enumitem}
\usepackage{fancyhdr}

\geometry{margin=2.5cm}
\pagestyle{fancy}
\fancyhf{}
\rhead{EduMaths - Documentation Technique}
\lhead{\thepage}

\title{\textbf{EduMaths Project Overview}\\
\large Documentation Technique Complète}
\author{Projet React - Formation Dyma}
\date{\today}

\definecolor{codegreen}{rgb}{0,0.6,0}
\definecolor{codegray}{rgb}{0.5,0.5,0.5}
\definecolor{codepurple}{rgb}{0.58,0,0.82}
\definecolor{backcolour}{rgb}{0.95,0.95,0.92}

\lstdefinestyle{codestyle}{
    backgroundcolor=\color{backcolour},
    commentstyle=\color{codegreen},
    keywordstyle=\color{magenta},
    numberstyle=\tiny\color{codegray},
    stringstyle=\color{codepurple},
    basicstyle=\ttfamily\footnotesize,
    breakatwhitespace=false,
    breaklines=true,
    captionpos=b,
    keepspaces=true,
    numbers=left,
    numbersep=5pt,
    showspaces=false,
    showstringspaces=false,
    showtabs=false,
    tabsize=2
}

\lstset{style=codestyle}

\begin{document}

\maketitle
\tableofcontents
\newpage

\section{Introduction}

\subsection{Vue d'ensemble du projet}

\textbf{EduMaths} est une application web\footnote{Application web : logiciel accessible via navigateur web sans installation} interactive développée avec React\footnote{React : bibliothèque JavaScript pour construire des interfaces utilisateur, développée par Meta} et TypeScript\footnote{TypeScript : sur-ensemble de JavaScript ajoutant le typage statique}. Elle vise à fournir une plateforme complète d'apprentissage des mathématiques avec une expérience utilisateur moderne et réactive.

Le projet utilise une architecture séparée en deux parties :
\begin{itemize}
    \item \textbf{Frontend} : Application React/Vite avec interface utilisateur complète
    \item \textbf{Backend} : Infrastructure Supabase (authentification, base de données, RLS)
\end{itemize}

\subsection{Objectifs}

\begin{itemize}
    \item Offrir une interface intuitive pour l'apprentissage des mathématiques
    \item Proposer des exercices interactifs et des formules
    \item Suivre la progression des utilisateurs avec persistance cloud (Supabase)
    \item Gérer l'authentification et les données utilisateur de manière sécurisée
    \item Fournir des chapitres structurés par classe
    \item Adapter l'interface aux appareils mobiles et desktop
    \item Implémenter un système de streaks pour motiver l'apprentissage quotidien
\end{itemize}

\subsection{Technologies principales}

\begin{tcolorbox}[colback=blue!5!white,colframe=blue!75!black,title=Stack Technique]
\begin{itemize}[leftmargin=*]
    \item \textbf{React 18.3.1} : Framework UI principal
    \item \textbf{TypeScript} : Langage avec typage statique
    \item \textbf{Vite} : Bundler\footnote{Bundler : outil qui regroupe et optimise les fichiers du projet} moderne et rapide
    \item \textbf{Tailwind CSS} : Framework CSS utility-first\footnote{Utility-first : approche CSS basée sur des classes utilitaires réutilisables}
    \item \textbf{Radix UI} : Composants UI accessibles et non stylisés
    \item \textbf{Lucide React} : Bibliothèque d'icônes
    \item \textbf{React Router} : Gestion de la navigation
    \item \textbf{Supabase} : Backend-as-a-Service pour auth, base de données et RLS
    \item \textbf{PostgreSQL} : Base de données via Supabase
\end{itemize}
\end{tcolorbox}

\section{Structure du Projet}

\subsection{Architecture globale}

Le projet suit une architecture modulaire séparée en deux parties principales :

\begin{lstlisting}[language=bash, caption=Arborescence du projet]
EduMaths Project Overview/
├── frontend/              # Application React/Vite
│   ├── src/              # Code source frontend
│   │   ├── components/   # Composants React
│   │   ├── data/        # Données JSON
│   │   ├── hooks/       # Custom hooks React
│   │   ├── pages/       # Pages de l'application
│   │   ├── lib/         # Utilitaires (Supabase, badges, export)
│   │   ├── styles/      # Fichiers de styles
│   │   ├── guidelines/  # Documentation développeur
│   │   ├── App.tsx      # Composant racine
│   │   ├── main.tsx     # Point d'entrée
│   │   └── index.css    # Styles globaux
│   ├── public/          # Assets statiques
│   ├── package.json     # Dépendances frontend
│   ├── vite.config.ts   # Configuration Vite
│   ├── tsconfig.json    # Configuration TypeScript
│   └── .env             # Variables d'environnement (Supabase)
├── backend/              # Backend Supabase
│   ├── sql/             # Scripts SQL
│   │   └── supabase-setup.sql  # Création tables et RLS
│   ├── scripts/         # Scripts d'administration
│   │   ├── delete-user.js
│   │   └── delete-user.mjs
│   └── README.md        # Documentation backend
├── src/                  # Copie du code source (legacy)
├── docs/                # Documents (CGU, politique, etc.)
│   └── CGU_Politique_Confidentialite.tex
└── README.md            # Documentation projet
\end{lstlisting}

\textbf{Note importante :} L'architecture est maintenant séparée pour faciliter le déploiement et la maintenance. Le dossier \texttt{frontend/} contient l'application React complète, tandis que \texttt{backend/} regroupe tous les éléments liés à Supabase.

\section{Dossiers et Fichiers Détaillés}

\subsection{Répertoire \texttt{src/}}

\textbf{Note :} Les chemins mentionnés ci-dessous correspondent à \texttt{frontend/src/} dans la nouvelle architecture.

\subsubsection{Point d'entrée et configuration}

\begin{tcolorbox}[colback=green!5!white,colframe=green!75!black,title=\texttt{main.tsx}]
\textbf{Rôle :} Point d'entrée de l'application React.

\textbf{Contenu :}
\begin{itemize}
    \item Initialisation du rendu React via \texttt{createRoot}
    \item Montage du composant \texttt{<App />} sur l'élément DOM \texttt{\#root}
    \item Import des styles globaux (\texttt{index.css})
\end{itemize}

\textbf{Importance :} Premier fichier exécuté par le navigateur après compilation.
\end{tcolorbox}

\begin{tcolorbox}[colback=green!5!white,colframe=green!75!black,title=\texttt{App.tsx}]
\textbf{Rôle :} Composant racine de l'application.

\textbf{Responsabilités :}
\begin{itemize}
    \item Gestion du layout principal
    \item Orchestration des vues (mobile/desktop)
    \item Gestion de l'état global de navigation
\end{itemize}
\end{tcolorbox}

\begin{tcolorbox}[colback=green!5!white,colframe=green!75!black,title=\texttt{index.css}]
\textbf{Rôle :} Feuille de styles globale.

\textbf{Contenu :}
\begin{itemize}
    \item Directives Tailwind CSS (\texttt{@tailwind base/components/utilities})
    \item Variables CSS personnalisées (couleurs, espacements)
    \item Styles de réinitialisation et normalisation
    \item Classes utilitaires personnalisées
\end{itemize}
\end{tcolorbox}

\begin{tcolorbox}[colback=green!5!white,colframe=green!75!black,title=\texttt{vite-env.d.ts}]
\textbf{Rôle :} Déclarations de types TypeScript pour Vite.

\textbf{Utilité :}
\begin{itemize}
    \item Permet l'import de fichiers CSS sans erreur TypeScript
    \item Définit les types pour les imports d'assets (images, SVG, etc.)
    \item Fournit les types pour les variables d'environnement Vite
\end{itemize}
\end{tcolorbox}

\subsection{Répertoire \texttt{src/components/}}

Ce dossier contient tous les composants React réutilisables de l'application.

\subsubsection{Composants de layout}

\begin{tcolorbox}[colback=yellow!5!white,colframe=yellow!75!black,title=\texttt{AppLayout.tsx}]
\textbf{Rôle :} Gestionnaire de mise en page adaptatif.

\textbf{Fonctionnalités :}
\begin{itemize}
    \item Détection du type d'appareil (mobile/desktop)
    \item Bascule entre \texttt{MobileApp} et \texttt{WebApp}
    \item Gestion responsive via media queries
\end{itemize}
\end{tcolorbox}

\begin{tcolorbox}[colback=yellow!5!white,colframe=yellow!75!black,title=\texttt{MobileApp.tsx}]
\textbf{Rôle :} Application mobile complète.

\textbf{Caractéristiques :}
\begin{itemize}
    \item Interface optimisée pour smartphones
    \item Navigation par écrans (screens)
    \item Composants tactiles adaptés
\end{itemize}
\end{tcolorbox}

\begin{tcolorbox}[colback=yellow!5!white,colframe=yellow!75!black,title=\texttt{MobileScreen.tsx}]
\textbf{Rôle :} Conteneur pour les écrans mobiles.

\textbf{Responsabilités :}
\begin{itemize}
    \item Affichage de l'interface mobile simulée
    \item Gestion des transitions entre écrans
    \item Intégration des pages mobile
\end{itemize}
\end{tcolorbox}

\begin{tcolorbox}[colback=yellow!5!white,colframe=yellow!75!black,title=\texttt{WebApp.tsx}]
\textbf{Rôle :} Application desktop/web.

\textbf{Fonctionnalités :}
\begin{itemize}
    \item Layout desktop avec sidebar
    \item Navigation horizontale
    \item Optimisation pour grands écrans
\end{itemize}
\end{tcolorbox}

\begin{tcolorbox}[colback=yellow!5!white,colframe=yellow!75!black,title=\texttt{WebPage.tsx}]
\textbf{Rôle :} Conteneur pour les pages web.

\textbf{Caractéristiques :}
\begin{itemize}
    \item Simulation d'un navigateur web
    \item Barre d'adresse et chrome de navigateur
    \item Rendu des pages dans un contexte desktop
\end{itemize}
\end{tcolorbox}

\subsubsection{Sous-dossier \texttt{components/ui/}}

\textbf{Description :} Collection de composants UI de base construits avec Radix UI et stylisés avec Tailwind CSS.

\textbf{Composants principaux :}

\begin{itemize}[leftmargin=2cm]
    \item[\texttt{button.tsx}] Boutons avec variantes (primary, secondary, outline, ghost, link)
    \item[\texttt{input.tsx}] Champs de saisie texte avec validation
    \item[\texttt{card.tsx}] Cartes de contenu avec en-tête, corps et pied
    \item[\texttt{dialog.tsx}] Modales et fenêtres pop-up
    \item[\texttt{dropdown-menu.tsx}] Menus déroulants contextuels
    \item[\texttt{accordion.tsx}] Panneaux extensibles/collapsibles
    \item[\texttt{tabs.tsx}] Navigation par onglets
    \item[\texttt{form.tsx}] Gestion de formulaires avec React Hook Form\footnote{React Hook Form : bibliothèque pour la gestion performante de formulaires}
    \item[\texttt{select.tsx}] Listes déroulantes de sélection
    \item[\texttt{checkbox.tsx}] Cases à cocher
    \item[\texttt{radio-group.tsx}] Boutons radio groupés
    \item[\texttt{switch.tsx}] Interrupteurs on/off
    \item[\texttt{slider.tsx}] Curseurs de sélection de valeur
    \item[\texttt{progress.tsx}] Barres de progression
    \item[\texttt{badge.tsx}] Badges et étiquettes
    \item[\texttt{alert.tsx}] Messages d'alerte
    \item[\texttt{toast.tsx}] Notifications temporaires
    \item[\texttt{tooltip.tsx}] Info-bulles au survol
    \item[\texttt{calendar.tsx}] Sélecteur de date avec React Day Picker
    \item[\texttt{chart.tsx}] Graphiques avec Recharts\footnote{Recharts : bibliothèque de graphiques React}
    \item[\texttt{carousel.tsx}] Carrousels avec Embla Carousel
    \item[\texttt{sidebar.tsx}] Barre latérale de navigation
    \item[\texttt{scroll-area.tsx}] Zones de défilement personnalisées
    \item[\texttt{separator.tsx}] Séparateurs visuels
    \item[\texttt{skeleton.tsx}] Indicateurs de chargement (skeletons)
    \item[\texttt{table.tsx}] Tableaux de données
    \item[\texttt{avatar.tsx}] Images de profil circulaires
    \item[\texttt{breadcrumb.tsx}] Fil d'Ariane de navigation
    \item[\texttt{context-menu.tsx}] Menus contextuels (clic droit)
    \item[\texttt{drawer.tsx}] Tiroirs latéraux avec Vaul
    \item[\texttt{hover-card.tsx}] Cartes au survol
    \item[\texttt{input-otp.tsx}] Champs OTP\footnote{OTP : One-Time Password, code à usage unique}
    \item[\texttt{label.tsx}] Labels de formulaires
    \item[\texttt{menubar.tsx}] Barre de menus
    \item[\texttt{navigation-menu.tsx}] Menu de navigation principal
    \item[\texttt{pagination.tsx}] Pagination de listes
    \item[\texttt{popover.tsx}] Pop-overs positionnés
    \item[\texttt{resizable.tsx}] Panneaux redimensionnables
    \item[\texttt{sheet.tsx}] Panneaux coulissants
    \item[\texttt{sonner.tsx}] Notifications avec Sonner
    \item[\texttt{toggle.tsx}] Boutons à bascule
    \item[\texttt{toggle-group.tsx}] Groupes de boutons à bascule
    \item[\texttt{command.tsx}] Palette de commandes avec CMDK
\end{itemize}

\textbf{Fichiers utilitaires :}
\begin{itemize}[leftmargin=2cm]
    \item[\texttt{utils.ts}] Fonction \texttt{cn()} pour fusionner les classes CSS
    \item[\texttt{use-mobile.ts}] Hook pour détecter les appareils mobiles
\end{itemize}

\subsubsection{Sous-dossier \texttt{components/figma/}}

\begin{tcolorbox}[colback=orange!5!white,colframe=orange!75!black,title=\texttt{ImageWithFallback.tsx}]
\textbf{Rôle :} Composant d'image avec gestion d'erreur.

\textbf{Fonctionnalités :}
\begin{itemize}
    \item Chargement d'images depuis Figma ou autres sources
    \item Affichage d'une image de secours (fallback) en cas d'erreur
    \item Gestion des états de chargement
\end{itemize}
\end{tcolorbox}

\subsection{Répertoire \texttt{src/data/}}

\textbf{Description :} Contient les données structurées en JSON pour l'application.

\begin{tcolorbox}[colback=cyan!5!white,colframe=cyan!75!black,title=\texttt{chapters.json}]
\textbf{Contenu :} Liste des chapitres de mathématiques.

\textbf{Structure :}
\begin{lstlisting}[language=json]
{
  "id": "string",
  "title": "string",
  "classLevel": "string",
  "description": "string",
  "topics": ["string"]
}
\end{lstlisting}
\end{tcolorbox}

\begin{tcolorbox}[colback=cyan!5!white,colframe=cyan!75!black,title=\texttt{classes.json}]
\textbf{Contenu :} Niveaux scolaires disponibles.

\textbf{Structure :}
\begin{lstlisting}[language=json]
{
  "id": "string",
  "name": "string",
  "level": "number",
  "description": "string"
}
\end{lstlisting}
\end{tcolorbox}

\begin{tcolorbox}[colback=cyan!5!white,colframe=cyan!75!black,title=\texttt{exercises.json}]
\textbf{Contenu :} Base d'exercices avec énoncés et solutions.

\textbf{Structure :}
\begin{lstlisting}[language=json]
{
  "id": "string",
  "chapterId": "string",
  "title": "string",
  "difficulty": "easy|medium|hard",
  "question": "string",
  "answer": "string",
  "explanation": "string"
}
\end{lstlisting}
\end{tcolorbox}

\begin{tcolorbox}[colback=cyan!5!white,colframe=cyan!75!black,title=\texttt{formulas.json}]
\textbf{Contenu :} Formules mathématiques avec notation LaTeX.

\textbf{Structure :}
\begin{lstlisting}[language=json]
{
  "id": "string",
  "name": "string",
  "latex": "string",
  "category": "string",
  "description": "string"
}
\end{lstlisting}
\end{tcolorbox}

\subsection{Répertoire \texttt{src/hooks/}}

\textbf{Description :} Custom hooks React\footnote{Custom hooks : fonctions React réutilisables encapsulant de la logique} pour la logique métier.

\begin{tcolorbox}[colback=purple!5!white,colframe=purple!75!black,title=\texttt{useAuth.ts}]
\textbf{Rôle :} Gestion de l'authentification utilisateur avec Supabase.

\textbf{Fonctionnalités :}
\begin{itemize}
    \item Inscription/connexion via Supabase Auth
    \item Gestion de la session utilisateur
    \item Déconnexion et nettoyage de session
    \item Fallback localStorage pour compatibilité anciens utilisateurs
    \item Intégration avec le système RLS de Supabase
\end{itemize}

\textbf{Valeur de retour :}
\begin{lstlisting}[language=typescript]
{
  user: User | null,
  session: Session | null,
  signUp: (email: string, password: string, username: string) => Promise<void>,
  signIn: (email: string, password: string) => Promise<void>,
  signOut: () => Promise<void>,
  loading: boolean
}
\end{lstlisting}
\end{tcolorbox}

\begin{tcolorbox}[colback=purple!5!white,colframe=purple!75!black,title=\texttt{useData.ts}]
\textbf{Rôle :} Chargement et mise en cache des données JSON.

\textbf{Fonctionnalités :}
\begin{itemize}
    \item Chargement asynchrone des fichiers JSON
    \item Mise en cache pour éviter les rechargements
    \item Gestion des états de chargement et d'erreur
\end{itemize}

\textbf{Valeur de retour :}
\begin{lstlisting}[language=typescript]
{
  data: T | null,
  loading: boolean,
  error: Error | null,
  refetch: () => void
}
\end{lstlisting}
\end{tcolorbox}

\begin{tcolorbox}[colback=purple!5!white,colframe=purple!75!black,title=\texttt{useProgress.ts}]
\textbf{Rôle :} Suivi de la progression de l'utilisateur avec Supabase.

\textbf{Fonctionnalités :}
\begin{itemize}
    \item Synchronisation avec la table \texttt{exercise\_progress} de Supabase
    \item Calcul du pourcentage de progression
    \item Gestion du système de streaks dans la table \texttt{streaks}
    \item Sauvegarde automatique dans la base de données cloud
    \item Fallback localStorage pour utilisateurs non connectés
    \item Statistiques de performance et badges
\end{itemize}

\textbf{Valeur de retour :}
\begin{lstlisting}[language=typescript]
{
  progress: number,
  completedExercises: string[],
  currentStreak: number,
  longestStreak: number,
  markAsCompleted: (exerciseId: string) => Promise<void>,
  resetProgress: () => Promise<void>,
  loading: boolean
}
\end{lstlisting}
\end{tcolorbox}

\subsection{Répertoire \texttt{src/pages/}}

\textbf{Description :} Composants de pages principales de l'application.

\begin{tcolorbox}[colback=red!5!white,colframe=red!75!black,title=Pages d'authentification]
\textbf{SplashPage.tsx} : Page d'accueil avec animation

\textbf{WelcomePage.tsx} : Page d'introduction

\textbf{LoginPage.tsx} : Formulaire de connexion

\textbf{SignupPage.tsx} : Formulaire d'inscription
\end{tcolorbox}

\begin{tcolorbox}[colback=red!5!white,colframe=red!75!black,title=Pages principales]
\textbf{DashboardPage.tsx} : Tableau de bord utilisateur
\begin{itemize}
    \item Vue d'ensemble de la progression
    \item Statistiques personnelles
    \item Accès rapide aux chapitres
\end{itemize}

\textbf{ClassSelectionPage.tsx} : Sélection de la classe
\begin{itemize}
    \item Liste des niveaux disponibles
    \item Filtrage par année scolaire
\end{itemize}

\textbf{ChaptersPage.tsx} : Liste des chapitres
\begin{itemize}
    \item Affichage par classe
    \item Indicateurs de progression
    \item Recherche et filtres
\end{itemize}
\end{tcolorbox}

\begin{tcolorbox}[colback=red!5!white,colframe=red!75!black,title=Pages de contenu]
\textbf{ExercisesPage.tsx} : Liste des exercices
\begin{itemize}
    \item Filtrage par difficulté
    \item Tri par chapitres
    \item État de complétion
\end{itemize}

\textbf{ExercisePage.tsx} : Exercice individuel
\begin{itemize}
    \item Affichage de l'énoncé
    \item Zone de réponse
    \item Validation et feedback
\end{itemize}

\textbf{SolutionPage.tsx} : Solution détaillée
\begin{itemize}
    \item Explication pas à pas
    \item Formules utilisées
    \item Conseils méthodologiques
\end{itemize}

\textbf{FormulasPage.tsx} : Formulaire mathématique
\begin{itemize}
    \item Recherche de formules
    \item Rendu LaTeX
    \item Catégorisation
\end{itemize}
\end{tcolorbox}

\begin{tcolorbox}[colback=red!5!white,colframe=red!75!black,title=Pages utilisateur]
\textbf{ProfilePage.tsx} : Profil utilisateur
\begin{itemize}
    \item Informations personnelles
    \item Modification des paramètres
    \item Historique d'activité
\end{itemize}

\textbf{ProgressionPage.tsx} : Suivi de progression
\begin{itemize}
    \item Graphiques de performance
    \item Objectifs et badges
    \item Statistiques détaillées
\end{itemize}
\end{tcolorbox}

\begin{tcolorbox}[colback=red!5!white,colframe=red!75!black,title=Pages utilitaires]
\textbf{TutorPage.tsx} : Tuteur virtuel
\begin{itemize}
    \item Aide contextuelle
    \item Suggestions personnalisées
    \item Chat avec IA (simulation)
\end{itemize}

\textbf{TermsPage.tsx} : Conditions d'utilisation
\begin{itemize}
    \item Mentions légales
    \item Politique de confidentialité
    \item CGU
\end{itemize}
\end{tcolorbox}

\subsection{Répertoire \texttt{src/styles/}}

\begin{tcolorbox}[colback=teal!5!white,colframe=teal!75!black,title=\texttt{globals.css}]
\textbf{Rôle :} Styles CSS globaux additionnels.

\textbf{Contenu :}
\begin{itemize}
    \item Styles de base pour les éléments HTML
    \item Classes utilitaires personnalisées
    \item Animations CSS custom
    \item Variables de thème (light/dark mode)
\end{itemize}
\end{tcolorbox}

\subsection{Répertoire \texttt{src/guidelines/}}

\begin{tcolorbox}[colback=lime!5!white,colframe=lime!75!black,title=\texttt{Guidelines.md}]
\textbf{Rôle :} Documentation pour les développeurs.

\textbf{Contenu :}
\begin{itemize}
    \item Conventions de code
    \item Standards de nommage
    \item Architecture et patterns
    \item Guide de contribution
    \item Best practices React/TypeScript
\end{itemize}
\end{tcolorbox}

\subsection{Répertoire \texttt{src/lib/}}

\begin{tcolorbox}[colback=pink!5!white,colframe=pink!75!black,title=\texttt{supabaseClient.ts}]
\textbf{Rôle :} Configuration du client Supabase.

\textbf{Contenu :}
\begin{itemize}
    \item Initialisation du client Supabase
    \item Configuration de l'authentification
    \item Exports des instances pour utilisation dans l'app
    \item Gestion des variables d'environnement
\end{itemize}

\textbf{Variables d'environnement requises :}
\begin{lstlisting}[language=bash]
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anonyme
\end{lstlisting}
\end{tcolorbox}

\begin{tcolorbox}[colback=pink!5!white,colframe=pink!75!black,title=\texttt{badges.ts}]
\textbf{Rôle :} Système de badges et récompenses.

\textbf{Contenu :}
\begin{itemize}
    \item Définitions des badges disponibles
    \item Logique de déblocage des badges
    \item Calcul des récompenses basé sur la progression
\end{itemize}
\end{tcolorbox}

\begin{tcolorbox}[colback=pink!5!white,colframe=pink!75!black,title=\texttt{exportData.ts}]
\textbf{Rôle :} Exportation des données utilisateur.

\textbf{Contenu :}
\begin{itemize}
    \item Export de la progression en JSON
    \item Export des statistiques
    \item Génération de rapports
\end{itemize}
\end{tcolorbox}

\section{Fichiers de Configuration}

\subsection{Backend Supabase}

\begin{tcolorbox}[colback=gray!5!white,colframe=gray!75!black,title=\texttt{backend/sql/supabase-setup.sql}]
\textbf{Rôle :} Configuration de la base de données Supabase.

\textbf{Contenu :}
\begin{itemize}
    \item Création de la table \texttt{exercise\_progress} :
    \begin{itemize}
        \item Colonnes : \texttt{id}, \texttt{user\_id}, \texttt{exercise\_id}, \texttt{completed\_at}, \texttt{score}
        \item Index sur \texttt{user\_id} et \texttt{exercise\_id}
    \end{itemize}
    \item Création de la table \texttt{streaks} :
    \begin{itemize}
        \item Colonnes : \texttt{id}, \texttt{user\_id}, \texttt{current\_streak}, \texttt{longest\_streak}, \texttt{last\_activity}
        \item Contraintes d'unicité
    \end{itemize}
    \item Configuration Row Level Security (RLS) :
    \begin{itemize}
        \item Politiques de lecture : utilisateur peut lire ses propres données
        \item Politiques d'écriture : utilisateur peut modifier ses propres données
        \item Politiques d'insertion : utilisateur peut insérer ses propres données
    \end{itemize}
\end{itemize}

\textbf{Exécution :}
\begin{lstlisting}[language=sql]
-- Dans le SQL Editor de Supabase
-- Copier et exécuter le contenu du fichier
\end{lstlisting}
\end{tcolorbox}

\begin{tcolorbox}[colback=gray!5!white,colframe=gray!75!black,title=\texttt{backend/scripts/delete-user.js} et \texttt{.mjs}]
\textbf{Rôle :} Scripts d'administration pour la gestion des utilisateurs.

\textbf{Fonctionnalités :}
\begin{itemize}
    \item Suppression d'utilisateurs de test
    \item Nettoyage des données associées
    \item Scripts disponibles en CommonJS (.js) et ES Modules (.mjs)
\end{itemize}
\end{tcolorbox}

\subsection{Configuration Frontend}

\begin{tcolorbox}[colback=gray!5!white,colframe=gray!75!black,title=\texttt{frontend/.env}]
\textbf{Rôle :} Variables d'environnement pour le frontend.

\textbf{Variables requises :}
\begin{lstlisting}[language=bash]
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anonyme_publique
\end{lstlisting}

\textbf{Note :} Ce fichier ne doit PAS être commité dans Git (déjà dans .gitignore).
\end{tcolorbox}

\subsection{Configuration Vite}

\begin{tcolorbox}[colback=gray!5!white,colframe=gray!75!black,title=\texttt{vite.config.ts}]
\textbf{Rôle :} Configuration du bundler Vite.

\textbf{Emplacement :} \texttt{frontend/vite.config.ts}

\textbf{Paramètres clés :}
\begin{itemize}
    \item \textbf{plugins :} React SWC pour compilation rapide
    \item \textbf{resolve.alias :} Alias de chemins (@ pour src/)
    \item \textbf{build.target :} ES Next pour syntaxe moderne
    \item \textbf{server.port :} Port de développement (généralement 5173)
    \item \textbf{server.open :} Ouverture automatique du navigateur
    \item \textbf{envPrefix :} VITE\_ pour les variables d'environnement
\end{itemize}

\textbf{Note importante :} Contient des alias pour résoudre les imports avec versions.
\end{tcolorbox}

\subsection{Configuration TypeScript}

\begin{tcolorbox}[colback=gray!5!white,colframe=gray!75!black,title=\texttt{tsconfig.json}]
\textbf{Rôle :} Configuration du compilateur TypeScript.

\textbf{Emplacement :} \texttt{frontend/tsconfig.json}

\textbf{Options importantes :}
\begin{itemize}
    \item \texttt{target: "ESNext"} : Cible JavaScript moderne
    \item \texttt{lib: ["DOM", "ESNext"]} : APIs disponibles
    \item \texttt{jsx: "react-jsx"} : Transformation JSX moderne
    \item \texttt{module: "ESNext"} : Système de modules ES
    \item \texttt{strict: true} : Mode strict activé
    \item \texttt{moduleResolution: "bundler"} : Résolution pour Vite
    \item \texttt{baseUrl: "."} : Racine pour les chemins relatifs
    \item \texttt{paths} : Mapping des alias de chemins
\end{itemize}
\end{tcolorbox}

\subsection{Configuration npm}

\begin{tcolorbox}[colback=gray!5!white,colframe=gray!75!black,title=\texttt{package.json}]
\textbf{Rôle :} Manifeste du projet npm.

\textbf{Emplacement :} \texttt{frontend/package.json}

\textbf{Sections importantes :}

\textbf{Scripts :}
\begin{itemize}
    \item \texttt{dev} : Lance le serveur de développement
    \item \texttt{build} : Compile pour la production
    \item \texttt{preview} : Prévisualise le build de production
    \item \texttt{lint} : Vérifie le code avec ESLint
\end{itemize}

\textbf{Dépendances principales :}
\begin{itemize}
    \item React 18.3.1 et React DOM
    \item Supabase JS Client (@supabase/supabase-js)
    \item Radix UI (30+ composants)
    \item Lucide React (icônes)
    \item React Hook Form (formulaires)
    \item Recharts (graphiques)
    \item Tailwind CSS (styling)
\end{itemize}

\textbf{Dépendances de développement :}
\begin{itemize}
    \item Vite (bundler)
    \item TypeScript (typage)
    \item ESLint (linting)
    \item PostCSS (traitement CSS)
\end{itemize}
\end{tcolorbox}

\section{Flux de Données}

\subsection{Architecture de l'application}

\begin{tcolorbox}[colback=blue!10!white,colframe=blue!75!black,title=Flux de données principal]
\begin{enumerate}
    \item \textbf{Initialisation :} \texttt{main.tsx} monte \texttt{<App />}
    \item \textbf{Configuration Supabase :} Initialisation du client avec variables d'environnement
    \item \textbf{Authentication :} Vérification de la session Supabase au chargement
    \item \textbf{Layout :} \texttt{AppLayout} détecte le type d'appareil
    \item \textbf{Routing :} React Router gère la navigation entre pages
    \item \textbf{Data Loading :}
    \begin{itemize}
        \item Données statiques : chargement JSON local (chapitres, exercices, formules)
        \item Données utilisateur : requêtes Supabase (progression, streaks)
    \end{itemize}
    \item \textbf{State Management :}
    \begin{itemize}
        \item Gestion locale avec useState/useContext
        \item Synchronisation cloud via Supabase
        \item Fallback localStorage pour mode hors ligne
    \end{itemize}
    \item \textbf{Rendering :} Les composants UI affichent les données
    \item \textbf{Interaction :} Les événements utilisateur mettent à jour l'état local et distant
\end{enumerate}
\end{tcolorbox}

\subsection{Gestion de l'état}

\textbf{État local :} Utilisation de \texttt{useState} pour les états de composant

\textbf{État partagé :} Passage par props ou Context API pour l'état global

\textbf{Persistance locale :} localStorage pour fallback et cache

\textbf{Persistance cloud :} Supabase PostgreSQL avec Row Level Security

\subsection{Architecture Supabase}

\begin{tcolorbox}[colback=green!10!white,colframe=green!75!black,title=Tables et Relations]
\textbf{Table exercise\_progress :}
\begin{itemize}
    \item Stocke la progression de chaque exercice par utilisateur
    \item Relation : \texttt{user\_id} → \texttt{auth.users}
    \item Horodatage de complétion
    \item Score optionnel pour évaluation
\end{itemize}

\textbf{Table streaks :}
\begin{itemize}
    \item Suivi du streak actuel et du record de l'utilisateur
    \item Relation : \texttt{user\_id} → \texttt{auth.users}
    \item Mise à jour automatique à chaque activité
    \item Réinitialisation si inactivité > 24h
\end{itemize}

\textbf{Row Level Security (RLS) :}
\begin{itemize}
    \item Isolation des données par utilisateur
    \item Politiques de sécurité appliquées au niveau base de données
    \item L'utilisateur ne peut accéder qu'à ses propres données
\end{itemize}
\end{tcolorbox}

\subsection{Chargement des données}

\begin{lstlisting}[language=typescript, caption=Exemple d'utilisation des hooks avec Supabase]
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { useData } from '@/hooks/useData';

const ExercisePage = () => {
  // Authentification
  const { user, session } = useAuth();

  // Données statiques
  const { data: exercises, loading: loadingExercises } =
    useData('exercises.json');

  // Progression utilisateur depuis Supabase
  const {
    completedExercises,
    currentStreak,
    markAsCompleted
  } = useProgress();

  const handleComplete = async (exerciseId: string) => {
    await markAsCompleted(exerciseId); // Sync avec Supabase
  };

  if (!user) return <Redirect to="/login" />;
  if (loadingExercises) return <Skeleton />;

  return (
    <div>
      <StreakBadge streak={currentStreak} />
      {exercises.map(ex => (
        <ExerciseCard
          key={ex.id}
          exercise={ex}
          isCompleted={completedExercises.includes(ex.id)}
          onComplete={() => handleComplete(ex.id)}
        />
      ))}
    </div>
  );
};
\end{lstlisting}

\section{Styles et Design}

\subsection{Système de design}

\textbf{Approach :} Utility-first avec Tailwind CSS

\textbf{Personnalisation :} Variables CSS pour le theming

\textbf{Composants :} Radix UI pour l'accessibilité et la logique

\textbf{Icônes :} Lucide React pour une bibliothèque cohérente

\subsection{Thématisation}

L'application supporte deux thèmes :

\begin{itemize}
    \item \textbf{Light mode :} Thème clair par défaut
    \item \textbf{Dark mode :} Thème sombre avec \texttt{next-themes}
\end{itemize}

Les variables CSS sont définies dans \texttt{index.css} :

\begin{lstlisting}[language=css]
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... autres variables ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  /* ... autres variables ... */
}
\end{lstlisting}

\subsection{Responsive Design}

\textbf{Breakpoints Tailwind :}
\begin{itemize}
    \item \texttt{sm:} 640px
    \item \texttt{md:} 768px
    \item \texttt{lg:} 1024px
    \item \texttt{xl:} 1280px
    \item \texttt{2xl:} 1536px
\end{itemize}

\textbf{Stratégie :} Mobile-first avec classes responsive

\section{Bonnes Pratiques Implémentées}

\subsection{TypeScript}

\begin{itemize}
    \item Types stricts activés
    \item Interfaces pour les props de composants
    \item Types génériques pour la réutilisabilité
    \item Éviter \texttt{any} sauf cas exceptionnels
\end{itemize}

\subsection{React}

\begin{itemize}
    \item Composants fonctionnels avec hooks
    \item Mémorisation avec \texttt{useMemo/useCallback} si nécessaire
    \item Éviter les re-renders inutiles
    \item Composition plutôt qu'héritage
    \item Props drilling limité avec Context API
\end{itemize}

\subsection{Performance}

\begin{itemize}
    \item Lazy loading des pages avec \texttt{React.lazy}
    \item Code splitting automatique par Vite
    \item Images optimisées avec fallbacks
    \item Mise en cache des données JSON
\end{itemize}

\subsection{Accessibilité}

\begin{itemize}
    \item Composants Radix UI accessibles par défaut
    \item Attributs ARIA appropriés
    \item Navigation au clavier
    \item Contraste suffisant des couleurs
    \item Labels pour tous les inputs
\end{itemize}

\section{Guide de Démarrage}

\subsection{Installation}

\begin{lstlisting}[language=bash]
# Cloner le dépôt
git clone <url-du-depot>
cd "EduMaths Project Overview"

# Aller dans le dossier frontend
cd frontend

# Installer les dépendances
npm install
\end{lstlisting}

\subsection{Configuration Supabase}

\textbf{Étape 1 : Créer un projet Supabase}
\begin{enumerate}
    \item Aller sur \url{https://supabase.com}
    \item Créer un nouveau projet
    \item Noter l'URL du projet et la clé anonyme (anon key)
\end{enumerate}

\textbf{Étape 2 : Configurer la base de données}
\begin{enumerate}
    \item Ouvrir le SQL Editor dans Supabase
    \item Copier le contenu de \texttt{backend/sql/supabase-setup.sql}
    \item Exécuter le script SQL
    \item Vérifier que les tables \texttt{exercise\_progress} et \texttt{streaks} sont créées
    \item Vérifier que les politiques RLS sont activées
\end{enumerate}

\textbf{Étape 3 : Configurer les variables d'environnement}
\begin{lstlisting}[language=bash]
# Dans le dossier frontend/, créer un fichier .env
cd frontend
touch .env  # ou créer manuellement sous Windows

# Ajouter les variables suivantes :
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anonyme
\end{lstlisting}

\subsection{Lancement de l'application}

\begin{lstlisting}[language=bash]
# Depuis le dossier frontend/
npm run dev

# L'application sera accessible sur http://localhost:5173
# (le port peut varier selon la configuration)
\end{lstlisting}

\subsection{Structure de développement}

\textbf{Workflow typique :}

\begin{enumerate}
    \item Créer une nouvelle branche pour chaque fonctionnalité
    \item S'assurer que Supabase est configuré et accessible
    \item Développer et tester localement avec \texttt{npm run dev}
    \item Tester l'authentification et la synchronisation des données
    \item Vérifier le linting avec \texttt{npm run lint}
    \item Compiler avec \texttt{npm run build}
    \item Tester le build avec \texttt{npm run preview}
    \item Commiter et pusher les changements
\end{enumerate}

\subsection{Ajout d'une nouvelle page}

\begin{enumerate}
    \item Créer le composant dans \texttt{frontend/src/pages/}
    \item Ajouter la route dans \texttt{AppRouter.tsx}
    \item Créer les composants UI nécessaires
    \item Intégrer les données avec les hooks (\texttt{useAuth}, \texttt{useProgress}, \texttt{useData})
    \item Si nécessaire, ajouter des tables/colonnes dans Supabase
    \item Styler avec Tailwind CSS
    \item Tester sur mobile et desktop
    \item Vérifier que les politiques RLS sont correctes
\end{enumerate}

\subsection{Ajout d'une fonctionnalité Supabase}

\begin{enumerate}
    \item Définir le schéma de données (tables, colonnes, relations)
    \item Écrire le script SQL dans \texttt{backend/sql/}
    \item Exécuter le script dans Supabase SQL Editor
    \item Configurer les politiques RLS appropriées
    \item Créer/modifier les hooks pour interagir avec les nouvelles tables
    \item Tester les opérations CRUD
    \item Vérifier l'isolation des données entre utilisateurs
    \item Documenter les changements
\end{enumerate}

\section{Dépannage Courant}

\subsection{Problèmes d'imports}

\textbf{Erreur :} Module non trouvé

\textbf{Solutions :}
\begin{itemize}
    \item Vérifier que le fichier existe dans \texttt{frontend/src/}
    \item Vérifier l'alias de chemin dans \texttt{frontend/vite.config.ts}
    \item Vérifier que \texttt{vite-env.d.ts} est présent
    \item Redémarrer le serveur de développement
\end{itemize}

\subsection{Problèmes de style}

\textbf{Erreur :} Les classes Tailwind ne s'appliquent pas

\textbf{Solutions :}
\begin{itemize}
    \item Vérifier que \texttt{index.css} est importé dans \texttt{main.tsx}
    \item Vérifier la configuration Tailwind dans \texttt{frontend/}
    \item Purger le cache : supprimer \texttt{frontend/node\_modules/.vite}
\end{itemize}

\subsection{Problèmes TypeScript}

\textbf{Erreur :} Types manquants ou incorrects

\textbf{Solutions :}
\begin{itemize}
    \item Installer les types : \texttt{npm i -D @types/package-name}
    \item Vérifier \texttt{frontend/tsconfig.json}
    \item Redémarrer l'éditeur/IDE
\end{itemize}

\subsection{Problèmes Supabase}

\textbf{Erreur :} Cannot connect to Supabase

\textbf{Solutions :}
\begin{itemize}
    \item Vérifier que le fichier \texttt{frontend/.env} existe
    \item Vérifier que les variables \texttt{VITE\_SUPABASE\_URL} et \texttt{VITE\_SUPABASE\_ANON\_KEY} sont correctes
    \item Vérifier que le projet Supabase est actif
    \item Vérifier la connexion internet
    \item Redémarrer le serveur de développement après modification du .env
\end{itemize}

\textbf{Erreur :} Permission denied / RLS error

\textbf{Solutions :}
\begin{itemize}
    \item Vérifier que l'utilisateur est authentifié
    \item Vérifier les politiques RLS dans Supabase Dashboard
    \item Vérifier que les tables ont bien les politiques définies dans \texttt{supabase-setup.sql}
    \item Tester les requêtes directement dans le SQL Editor de Supabase
\end{itemize}

\textbf{Erreur :} Les données ne se synchronisent pas

\textbf{Solutions :}
\begin{itemize}
    \item Vérifier que l'utilisateur est bien connecté (\texttt{session} non null)
    \item Vérifier les logs dans la console du navigateur
    \item Vérifier les logs dans Supabase Dashboard > Logs
    \item Vérifier que les noms de tables et colonnes correspondent
    \item Vérifier que les hooks utilisent bien \texttt{await} pour les opérations async
\end{itemize}

\section{Extensions et Améliorations Futures}

\subsection{Fonctionnalités potentielles}

\begin{itemize}
    \item \textbf{Supabase Edge Functions :} Fonctions serverless pour logique métier complexe
    \item \textbf{Supabase Storage :} Stockage d'images de profil et documents utilisateur
    \item \textbf{Notifications push :} Via Supabase Realtime pour alertes de streak
    \item \textbf{Mode hors ligne :} PWA avec Service Workers et cache Supabase
    \item \textbf{Gamification avancée :} Système de niveaux, achievements, classements temps réel
    \item \textbf{Collaboration :} Partage d'exercices, défis entre amis
    \item \textbf{IA intégrée :} Tuteur virtuel avec GPT via Edge Functions
    \item \textbf{Vidéos :} Intégration de cours vidéo stockés dans Supabase Storage
    \item \textbf{Tests chronométrés :} Mode examen avec horodatage dans base de données
    \item \textbf{Export PDF :} Génération de fiches de révision côté serveur
    \item \textbf{Analytics avancé :} Dashboard admin pour statistiques globales
    \item \textbf{Mode enseignant :} Gestion de classes, assignation d'exercices
    \item \textbf{Forum communautaire :} Discussion entre élèves avec modération
\end{itemize}

\subsection{Optimisations techniques}

\begin{itemize}
    \item State management avec Zustand ou Redux Toolkit
    \item Requêtes avec React Query pour mise en cache avancée et sync Supabase
    \item Tests unitaires avec Vitest
    \item Tests E2E avec Playwright (y compris flows Supabase Auth)
    \item CI/CD avec GitHub Actions et déploiement Vercel/Netlify
    \item Monitoring avec Sentry
    \item Analytics avec Plausible ou Umami (privacy-first)
    \item Optimisation des requêtes Supabase avec indexes et vues matérialisées
    \item Migration vers Supabase Realtime pour mise à jour instantanée
    \item Rate limiting avec Supabase RLS et PostgreSQL functions
\end{itemize}

\subsection{Sécurité}

\begin{itemize}
    \item Audit des politiques RLS
    \item Rotation régulière des clés API
    \item Logging des actions sensibles
    \item Rate limiting par utilisateur
    \item Validation des inputs côté serveur (Edge Functions)
    \item Protection CSRF avec Supabase Auth
    \item Chiffrement des données sensibles
\end{itemize}

\section{Ressources et Références}

\subsection{Documentation officielle}

\begin{itemize}
    \item React : \url{https://react.dev}
    \item TypeScript : \url{https://www.typescriptlang.org/docs/}
    \item Vite : \url{https://vitejs.dev}
    \item Tailwind CSS : \url{https://tailwindcss.com/docs}
    \item Radix UI : \url{https://www.radix-ui.com/primitives/docs}
    \item Supabase : \url{https://supabase.com/docs}
    \item Supabase Auth : \url{https://supabase.com/docs/guides/auth}
    \item Supabase Database : \url{https://supabase.com/docs/guides/database}
    \item Row Level Security : \url{https://supabase.com/docs/guides/auth/row-level-security}
\end{itemize}

\subsection{Outils de développement}

\begin{itemize}
    \item VS Code : Éditeur recommandé
    \item Extensions VS Code :
    \begin{itemize}
        \item ESLint
        \item Prettier
        \item Tailwind CSS IntelliSense
        \item TypeScript Error Translator
    \end{itemize}
    \item React DevTools : Extension navigateur
    \item Figma : Design source du projet
\end{itemize}

\section{Conclusion}

\textbf{EduMaths} est une application moderne et bien structurée qui démontre les meilleures pratiques du développement React/TypeScript avec une infrastructure backend robuste via Supabase. L'architecture modulaire et la séparation frontend/backend facilitent la maintenance et l'évolution du projet.

Les points forts du projet :
\begin{itemize}
    \item Architecture claire avec séparation frontend/backend
    \item Authentification et autorisation sécurisées via Supabase Auth
    \item Base de données PostgreSQL avec Row Level Security pour la protection des données
    \item Composants réutilisables et bien typés
    \item Design system cohérent avec Tailwind CSS et Radix UI
    \item Expérience utilisateur responsive (mobile et desktop)
    \item Code maintenable et évolutif
    \item Système de progression avec synchronisation cloud
    \item Gamification avec streaks et badges
    \item Fallback localStorage pour compatibilité et mode hors ligne
\end{itemize}

\textbf{Architecture technique moderne :}
\begin{itemize}
    \item Frontend : React 18.3.1 + TypeScript + Vite pour des performances optimales
    \item Backend : Supabase (PostgreSQL + Auth + RLS) pour une infrastructure serverless
    \item Styling : Tailwind CSS avec système de thèmes (light/dark)
    \item Components : Radix UI pour accessibilité et composabilité
\end{itemize}

Cette documentation technique fournit une base solide pour comprendre, maintenir et étendre l'application EduMaths. Le choix de Supabase comme backend permet une évolution rapide vers des fonctionnalités avancées (Realtime, Storage, Edge Functions) sans gérer d'infrastructure serveur complexe.

\vspace{1cm}
\hrule
\vspace{0.5cm}

\textit{Document généré le \today}

\textit{Version : 2.0 - Architecture Frontend/Backend avec Supabase}

\end{document}
```
