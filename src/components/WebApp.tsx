import { useState } from 'react';
import { WebPage } from './WebPage';
import { ChevronRight } from 'lucide-react';

const webPages = [
  {
    id: 'splash',
    title: '1. Page Splash Screen',
    description: 'Écran de chargement initial avec le logo EduMaths',
  },
  {
    id: 'welcome',
    title: '2. Page Bienvenue',
    description: 'Présentation de la plateforme et des fonctionnalités principales',
  },
  {
    id: 'login',
    title: '3. Page de Connexion',
    description: 'Formulaire de connexion avec options sociales (Apple, Google)',
  },
  {
    id: 'signup',
    title: '4. Page d\'inscription',
    description: 'Création de compte avec nom, email et mot de passe',
  },
  {
    id: 'terms',
    title: '5. Conditions Générales',
    description: 'Acceptation des CGU obligatoire avant de créer le compte',
  },
  {
    id: 'class-selection',
    title: '6. Choix de la classe',
    description: 'Sélection du niveau scolaire (6ème à Terminale)',
  },
  {
    id: 'dashboard',
    title: '7. Dashboard',
    description: 'Page d\'accueil utilisateur avec statistiques et accès rapides',
  },
  {
    id: 'chapters',
    title: '8. Liste des Chapitres',
    description: 'Liste complète des chapitres avec statuts de progression',
  },
  {
    id: 'formulas',
    title: '9. Page Formules',
    description: 'Formules mathématiques d\'un chapitre spécifique',
  },
  {
    id: 'exercise',
    title: '10. Page Exercice',
    description: 'Interface d\'exercice avec timer et barre de progression',
  },
  {
    id: 'solution',
    title: '11. Page Solution',
    description: 'Correction détaillée avec explications',
  },
  {
    id: 'progression',
    title: '12. Page Progression',
    description: 'Statistiques et progression par chapitre',
  },
  {
    id: 'tutor',
    title: '13. Tuteur IA',
    description: 'Interface de chat avec l\'assistant IA',
  },
  {
    id: 'profile',
    title: '14. Page Profil',
    description: 'Gestion du profil utilisateur et paramètres',
  },
];

export function WebApp() {
  const [selectedPage, setSelectedPage] = useState(webPages[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar - Page List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Pages du Site Web
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            14 pages du parcours utilisateur
          </p>
          
          {/* Info Badge */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-indigo-800">
              <span className="font-semibold">💡 Astuce :</span> Parcourez les pages pour voir leur structure et leur design responsive.
            </p>
          </div>
          
          <nav className="space-y-2">
            {webPages.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between group ${
                  selectedPage.id === page.id
                    ? 'bg-indigo-100 text-indigo-700 shadow-md'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-medium text-sm">{page.title}</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    selectedPage.id === page.id
                      ? 'text-indigo-600'
                      : 'text-gray-400 group-hover:translate-x-1'
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content - Page Preview */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{selectedPage.title}</h2>
            <p className="text-gray-600 mt-2">{selectedPage.description}</p>
          </div>
          
          {/* Design Notes */}
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">🎨 Notes de Design</h3>
            <ul className="text-sm text-green-800 space-y-1">
              {getDesignNotes(selectedPage.id).map((note, index) => (
                <li key={index}>• {note}</li>
              ))}
            </ul>
          </div>
          
          <WebPage pageId={selectedPage.id} />
        </div>
      </div>
    </div>
  );
}

// Helper function for design notes
function getDesignNotes(pageId: string): string[] {
  const notes: Record<string, string[]> = {
    splash: [
      'Écran de chargement initial avec logo EduMaths',
      'Animation douce pour une expérience utilisateur fluide',
      'Couleurs cohérentes avec la marque EduMaths'
    ],
    welcome: [
      'Présentation de la plateforme et des fonctionnalités principales',
      'Visuels attrayants pour captiver l\'attention',
      'Texte explicatif pour guider l\'utilisateur'
    ],
    login: [
      'Page d\'accueil principale avec double fonction (marketing + connexion)',
      'Formulaire de connexion directement accessible (pas de page séparée)',
      'Navigation cohérente avec toutes les pages du site',
      'Footer simple pour informations légales'
    ],
    signup: [
      'Création de compte avec nom, email et mot de passe',
      'Validation des champs pour éviter les erreurs',
      'Options sociales pour une connexion rapide'
    ],
    terms: [
      'Acceptation des CGU obligatoire avant de créer le compte',
      'Texte clair et structuré pour la compréhension',
      'Bouton de consentement pour valider'
    ],
    'class-selection': [
      'Sélection du niveau scolaire (6ème à Terminale)',
      'Liste déroulante pour une sélection facile',
      'Illustrations pour chaque niveau'
    ],
    dashboard: [
      'Dashboard utilisateur après authentification',
      'Vue d\'ensemble de la progression et des statistiques',
      'Navigation adaptée pour utilisateur connecté',
      'Design cohérent avec l\'application mobile'
    ],
    chapters: [
      'Liste complète des chapitres avec statuts de progression',
      'Icônes colorées pour identification visuelle',
      'Call-to-action clair pour conversion',
      'Layout responsive pour tous les écrans'
    ],
    formulas: [
      'Formules mathématiques d\'un chapitre spécifique',
      'Icônes colorées pour identification visuelle',
      'Call-to-action clair pour conversion',
      'Layout responsive pour tous les écrans'
    ],
    exercise: [
      'Interface d\'exercice avec timer et barre de progression',
      'Feedback immédiat pour l\'utilisateur',
      'Layout responsive pour tous les écrans'
    ],
    solution: [
      'Correction détaillée avec explications',
      'Layout responsive pour tous les écrans'
    ],
    progression: [
      'Statistiques et progression par chapitre',
      'Graphiques pour visualiser la progression',
      'Tableau récapitulatif des performances'
    ],
    tutor: [
      'Interface de chat avec l\'assistant IA',
      'Historique des conversations pour référence',
      'Suggestions d\'exercices personnalisées'
    ],
    profile: [
      'Gestion du profil utilisateur et paramètres',
      'Options pour modifier les informations personnelles',
      'Paramètres de confidentialité et de sécurité'
    ]
  };
  
  return notes[pageId] || [];
}