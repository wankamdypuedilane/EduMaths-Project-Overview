import { useState } from 'react';
import { MobileScreen } from './MobileScreen';
import { ChevronRight } from 'lucide-react';

const mobileScreens = [
  {
    id: 'splash',
    title: '1. Splash Screen',
    description: 'Écran de démarrage avec logo et animation de chargement',
  },
  {
    id: 'welcome',
    title: '2. Écran de Bienvenue',
    description: 'Présentation de l\'app avec choix Se connecter / Créer un compte',
  },
  {
    id: 'login',
    title: '3. Connexion',
    description: 'Formulaire de connexion avec email/mot de passe et options Google/Apple',
  },
  {
    id: 'signup',
    title: '4. Création de Compte',
    description: 'Formulaire d\'inscription avec nom, email et mot de passe',
  },
  {
    id: 'terms',
    title: '5. Acceptation des CGU',
    description: 'Écran obligatoire avec CGU et case à cocher (RGPD compliant)',
  },
  {
    id: 'class-selection',
    title: '6. Choix de la Classe',
    description: 'Sélection du niveau scolaire de 6ème à Terminale',
  },
  {
    id: 'dashboard',
    title: '7. Accueil (Dashboard)',
    description: 'Tableau de bord avec actions principales et recommandations',
  },
  {
    id: 'chapters',
    title: '8. Liste des Chapitres',
    description: 'Chapitres de maths organisés par niveau (6e à Terminale)',
  },
  {
    id: 'formulas',
    title: '9. Révision des Formules',
    description: 'Fiches de formules mathématiques avec explications',
  },
  {
    id: 'exercise',
    title: '10. Exercice Interactif',
    description: 'Exercice généré automatiquement avec saisie de réponse',
  },
  {
    id: 'result',
    title: '11. Résultat / Correction',
    description: 'Affichage du résultat avec correction détaillée',
  },
  {
    id: 'profile',
    title: '12. Profil Utilisateur',
    description: 'Profil utilisateur avec statistiques et paramètres',
  },
  {
    id: 'progress',
    title: '13. Progression Détaillée',
    description: 'Page complète avec points, statistiques et activité récente',
  },
  {
    id: 'tutor',
    title: '14. Tuteur IA',
    description: 'Assistant virtuel pour aider l\'utilisateur dans son apprentissage',
  },
];

export function MobileApp() {
  const [selectedScreen, setSelectedScreen] = useState(mobileScreens[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar - Screen List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Écrans de l'Application Mobile
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            14 écrans principaux du parcours utilisateur
          </p>
          
          {/* Info Badge */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-indigo-800">
              <span className="font-semibold">💡 Astuce :</span> Cliquez sur un écran pour voir sa maquette détaillée et ses annotations UX.
            </p>
          </div>
          
          <nav className="space-y-2">
            {mobileScreens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setSelectedScreen(screen)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between group ${
                  selectedScreen.id === screen.id
                    ? 'bg-indigo-100 text-indigo-700 shadow-md'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-medium text-sm">{screen.title}</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    selectedScreen.id === screen.id
                      ? 'text-indigo-600'
                      : 'text-gray-400 group-hover:translate-x-1'
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content - Screen Preview */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{selectedScreen.title}</h2>
            <p className="text-gray-600 mt-2">{selectedScreen.description}</p>
          </div>
          
          {/* UX Notes */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">📋 Notes UX/UI</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              {getUXNotes(selectedScreen.id).map((note, index) => (
                <li key={index}>• {note}</li>
              ))}
            </ul>
          </div>
          
          <MobileScreen screenId={selectedScreen.id} />
        </div>
      </div>
    </div>
  );
}

// Helper function for UX notes
function getUXNotes(screenId: string): string[] {
  const notes: Record<string, string[]> = {
    splash: [
      'Animation de chargement pour une transition fluide',
      'Branding fort avec logo et couleurs principales',
      'Durée optimale : 2-3 secondes'
    ],
    welcome: [
      'Loi de Hick : 2 choix clairs (connexion/inscription)',
      'Call-to-action visibles et hiérarchisés',
      'Illustration pour renforcer le message'
    ],
    login: [
      'Message explicatif pour éviter la confusion avec Gmail',
      'Options de connexion sociale (Google/Apple)',
      'Loi de Fitts : boutons bien espacés et accessibles'
    ],
    signup: [
      'Formulaire minimaliste (réduction charge cognitive)',
      'Choix du niveau scolaire pour personnalisation',
      'Navigation claire vers la connexion'
    ],
    terms: [
      'Case à cocher non pré-cochée (conformité RGPD)',
      'Bouton désactivé tant que CGU non acceptées',
      'Contenu scrollable avec indication visuelle'
    ],
    'class-selection': [
      'Groupement par Collège et Lycée pour clarté',
      'Sélection par radio buttons visuels',
      'État sélectionné clairement indiqué',
      'Tous les niveaux de 6ème à Terminale disponibles'
    ],
    dashboard: [
      'Personnalisation avec nom de l\'utilisateur',
      'Badge de série en haut à droite : ⚡ 18 (éclair + nombre de jours)',
      'Série qui s\'incrémente à chaque jour de progression',
      'Section "Activité récente" avec les derniers chapitres travaillés',
      'Footer avec 4 boutons : Accueil, Progression, Tuteur IA, Profil'
    ],
    chapters: [
      'Organisation par niveau scolaire',
      'Indicateurs visuels de progression',
      'Loi de proximité : informations groupées par chapitre'
    ],
    formulas: [
      'Mise en avant visuelle des formules',
      'Explications contextuelles',
      'Tags pour catégorisation'
    ],
    exercise: [
      'Timer pour gamification',
      'Barre de progression claire',
      'Zone de saisie intuitive avec unités'
    ],
    result: [
      'Feedback positif immédiat',
      'Explication détaillée pas à pas',
      'Actions suivantes proposées'
    ],
    profile: [
      'Modification des informations personnelles : nom, email, niveau scolaire',
      'Section sécurité pour changer le mot de passe',
      'Photo de profil avec bouton de modification',
      'Zone de danger pour suppression du compte (conformité RGPD)',
      'Interface épurée et intuitive'
    ],
    progress: [
      '320 points affichés avec badge trophée',
      'Progression globale à 45% avec barre visuelle',
      'Message motivant pour encourager l\'utilisateur',
      'Statistiques détaillées : chapitres, exercices, badges, taux de réussite'
    ],
    tutor: [
      'Interface de chat simple et intuitive pour aider l\'utilisateur',
      'Messages de l\'IA avec design différencié des messages utilisateur',
      'Suggestions de questions rapides pour faciliter l\'interaction',
      'Champ de saisie avec bouton d\'envoi',
      'Footer avec 4 boutons : Accueil, Progression, Tuteur IA, Profil'
    ]
  };
  
  return notes[screenId] || [];
}