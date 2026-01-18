import { useEffect, useState } from "react";
import { MobileScreen } from "./MobileScreen";

const mobileScreens = [
  {
    id: "splash",
    title: "1. Splash Screen",
    description: "Écran de démarrage avec logo et animation de chargement",
  },
  {
    id: "welcome",
    title: "2. Écran de Bienvenue",
    description:
      "Présentation de l'app avec choix Se connecter / Créer un compte",
  },
  {
    id: "login",
    title: "3. Connexion",
    description:
      "Formulaire de connexion avec email/mot de passe et options Google/Apple",
  },
  {
    id: "signup",
    title: "4. Création de Compte",
    description: "Formulaire d'inscription avec nom, email et mot de passe",
  },
  {
    id: "terms",
    title: "5. Acceptation des CGU",
    description: "Écran obligatoire avec CGU et case à cocher (RGPD compliant)",
  },
  {
    id: "class-selection",
    title: "6. Choix de la Classe",
    description: "Sélection du niveau scolaire de 6ème à Terminale",
  },
  {
    id: "dashboard",
    title: "7. Accueil (Dashboard)",
    description: "Tableau de bord avec actions principales et recommandations",
  },
  {
    id: "chapters",
    title: "8. Liste des Chapitres",
    description: "Chapitres de maths organisés par niveau (6e à Terminale)",
  },
  {
    id: "formulas",
    title: "9. Révision des Formules",
    description: "Fiches de formules mathématiques avec explications",
  },
  {
    id: "exercise",
    title: "10. Exercice Interactif",
    description: "Exercice généré automatiquement avec saisie de réponse",
  },
  {
    id: "result",
    title: "11. Résultat / Correction",
    description: "Affichage du résultat avec correction détaillée",
  },
  {
    id: "profile",
    title: "12. Profil Utilisateur",
    description: "Profil utilisateur avec statistiques et paramètres",
  },
  {
    id: "progress",
    title: "13. Progression Détaillée",
    description: "Page complète avec points, statistiques et activité récente",
  },
  {
    id: "tutor",
    title: "14. Tuteur IA",
    description:
      "Assistant virtuel pour aider l'utilisateur dans son apprentissage",
  },
];

export function MobileApp() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-transition Splash -> Welcome pour mimer un vrai démarrage
  useEffect(() => {
    if (mobileScreens[currentIndex]?.id !== "splash") return;
    const timer = setTimeout(() => setCurrentIndex(1), 1600);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const goNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, mobileScreens.length - 1));
  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const current = mobileScreens[currentIndex];

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="bg-white rounded-lg shadow-lg p-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Parcours mobile
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-1">
            {current.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{current.description}</p>
        </div>
        <div className="text-xs font-medium text-gray-500">
          {currentIndex + 1} / {mobileScreens.length}
        </div>
      </div>

      <MobileScreen screenId={current.id} />

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={`flex-1 h-11 rounded-lg text-sm font-medium border transition ${
            currentIndex === 0
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Précédent
        </button>
        <button
          onClick={goNext}
          disabled={currentIndex === mobileScreens.length - 1}
          className={`flex-1 h-11 rounded-lg text-sm font-medium transition ${
            currentIndex === mobileScreens.length - 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
