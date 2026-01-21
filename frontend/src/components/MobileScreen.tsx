import {
  CheckCircle,
  BookOpen,
  Calculator,
  Clock,
  TrendingUp,
  Award,
  Target,
  Calendar,
  Zap,
  Mail,
  Lock,
  User,
  BarChart3,
  X,
  Home,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

// Exit Confirmation Modal
interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ExitModal({ isOpen, onClose, onConfirm }: ExitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center">
            <Home className="w-8 h-8 text-amber-600" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
          Quitter l'activité ?
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6">
          Votre progression sera sauvegardée. Voulez-vous vraiment retourner à
          la page d'accueil ?
        </p>

        <div className="space-y-3">
          <button
            onClick={onConfirm}
            className="w-full bg-indigo-600 h-12 rounded-xl flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all"
          >
            <span className="text-white font-semibold">Oui, quitter</span>
          </button>
          <button
            onClick={onClose}
            className="w-full bg-white border-2 border-gray-300 h-12 rounded-xl flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
          >
            <span className="text-gray-700 font-semibold">
              Continuer l'activité
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Footer Component (used from page 7 onwards)
interface FooterProps {
  activePage: "home" | "progress" | "tutor" | "profile";
}

function Footer({ activePage }: FooterProps) {
  return (
    <div className="mt-auto bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex justify-around items-center">
        <button
          className={`flex flex-col items-center gap-1 ${
            activePage === "home" ? "text-indigo-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-10 h-10 ${
              activePage === "home" ? "bg-indigo-100" : "bg-gray-100"
            } rounded-xl flex items-center justify-center`}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium">Accueil</span>
        </button>

        <button
          className={`flex flex-col items-center gap-1 ${
            activePage === "progress" ? "text-indigo-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-10 h-10 ${
              activePage === "progress" ? "bg-indigo-100" : "bg-gray-100"
            } rounded-xl flex items-center justify-center`}
          >
            <BarChart3 className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium">Progression</span>
        </button>

        <button
          className={`flex flex-col items-center gap-1 ${
            activePage === "tutor" ? "text-indigo-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-10 h-10 ${
              activePage === "tutor" ? "bg-indigo-100" : "bg-gray-100"
            } rounded-xl flex items-center justify-center`}
          >
            <span className="text-xl">🤖</span>
          </div>
          <span className="text-xs font-medium">Tuteur IA</span>
        </button>

        <button
          className={`flex flex-col items-center gap-1 ${
            activePage === "profile" ? "text-indigo-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-10 h-10 ${
              activePage === "profile" ? "bg-indigo-100" : "bg-gray-100"
            } rounded-xl flex items-center justify-center`}
          >
            <User className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium">Profil</span>
        </button>
      </div>
    </div>
  );
}

export function MobileScreen({ screenId }: { screenId: string }) {
  return (
    <div className="flex justify-center">
      {/* Mobile Frame */}
      <div className="relative w-full max-w-sm">
        <div className="bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>

          {/* Screen Content */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden h-[600px] relative">
            {screenId === "splash" && <SplashScreen />}
            {screenId === "welcome" && <WelcomeScreen />}
            {screenId === "login" && <LoginScreen />}
            {screenId === "signup" && <SignupScreen />}
            {screenId === "terms" && <TermsScreen />}
            {screenId === "class-selection" && <ClassSelectionScreen />}
            {screenId === "dashboard" && <DashboardScreen />}
            {screenId === "chapters" && <ChaptersScreen />}
            {screenId === "formulas" && <FormulasScreen />}
            {screenId === "exercise" && <ExerciseScreen />}
            {screenId === "result" && <ResultScreen />}
            {screenId === "profile" && <ProfileScreen />}
            {screenId === "progress" && <ProgressScreen />}
            {screenId === "tutor" && <TutorScreen />}
          </div>
        </div>
      </div>
    </div>
  );
}

// 1. Splash Screen
function SplashScreen() {
  return (
    <div className="h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex flex-col items-center justify-center p-8">
      <div className="bg-white w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl mb-8">
        <Calculator className="w-16 h-16 text-indigo-600" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">EduMaths</h1>
      <p className="text-indigo-200 text-center mb-12">Réussis tes maths !</p>

      {/* Loading indicator */}
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
        <div
          className="w-3 h-3 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-3 h-3 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
}

// 2. Welcome Screen
function WelcomeScreen() {
  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="flex flex-col p-8 min-h-full">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-indigo-100 w-24 h-24 rounded-2xl flex items-center justify-center mb-6">
            <Calculator className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Bienvenue sur EduMaths
          </h1>
          <p className="text-gray-600 text-center mb-8 px-4">
            Révisez vos formules et entraînez-vous avec des exercices de la 6e à
            la Terminale
          </p>

          {/* Illustration placeholder */}
          <div className="bg-gray-100 w-full h-48 rounded-2xl mb-8 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-gray-400" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-indigo-600 h-12 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-semibold">Se connecter</span>
          </div>
          <div className="bg-white border-2 border-indigo-600 h-12 rounded-xl flex items-center justify-center">
            <span className="text-indigo-600 font-semibold">
              Créer un compte
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Login Screen
function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="flex flex-col p-8 min-h-full">
        <div className="mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Connexion</h1>
          <p className="text-gray-600">Accédez à votre compte EduMaths</p>
        </div>

        <div className="flex-1 space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Email
            </label>
            <div className="bg-gray-100 h-12 rounded-lg flex items-center px-4">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-gray-400">exemple@email.com</span>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Mot de passe
            </label>
            <div className="bg-gray-100 h-12 rounded-lg flex items-center px-4">
              <Lock className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-transparent flex-1 text-gray-800 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Ce mot de passe correspond à votre compte EduMaths
            </p>
          </div>

          <button className="text-indigo-600 text-sm font-medium">
            Mot de passe oublié ?
          </button>

          <div className="bg-indigo-600 h-12 rounded-xl flex items-center justify-center shadow-lg mt-6">
            <span className="text-white font-semibold">Se connecter</span>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">ou</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="bg-white border-2 border-gray-300 h-12 rounded-xl flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 font-medium">Google</span>
          </div>

          <div className="bg-black h-12 rounded-xl flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <span className="text-white font-medium">Apple</span>
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-600">Pas de compte ? </span>
          <button className="text-indigo-600 font-semibold">
            Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
}

// 4. Signup Screen
function SignupScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="flex flex-col p-8 min-h-full">
        <div className="mb-6">
          <div className="bg-indigo-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Créer un compte
          </h1>
          <p className="text-gray-600">Rejoignez EduMaths gratuitement</p>
        </div>

        <div className="space-y-4 flex-1">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Nom complet
            </label>
            <div className="bg-gray-100 h-12 rounded-lg flex items-center px-4">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-gray-400">Prénom & Nom</span>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Email
            </label>
            <div className="bg-gray-100 h-12 rounded-lg flex items-center px-4">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-gray-400">exemple@email.com</span>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Mot de passe
            </label>
            <div className="bg-gray-100 h-12 rounded-lg flex items-center px-4">
              <Lock className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-transparent flex-1 text-gray-800 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-indigo-600 h-12 rounded-xl flex items-center justify-center shadow-lg mt-6">
            <span className="text-white font-semibold">Continuer</span>
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-600">Déjà un compte ? </span>
          <button className="text-indigo-600 font-semibold">
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}

// 5. Terms Screen
function TermsScreen() {
  return (
    <div className="h-full bg-white flex flex-col p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Conditions Générales
        </h1>
        <p className="text-gray-600">Veuillez accepter nos CGU</p>
      </div>

      {/* Terms Content */}
      <div className="flex-1 bg-gray-50 rounded-lg p-6 overflow-y-auto mb-6 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Avant de continuer, veuillez lire attentivement nos conditions
            générales d'utilisation :
          </p>

          <button className="inline-flex items-center gap-2 bg-white border-2 border-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-50 active:scale-95 transition-all">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-600 font-semibold">
              Conditions générales d'utilisation
            </span>
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Cliquez pour consulter le document complet
          </p>
        </div>
      </div>

      {/* Checkbox */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-indigo-600 opacity-0" />
          </div>
          <span className="text-sm text-gray-700">
            J'ai lu et j'accepte les Conditions Générales d'Utilisation et la
            Politique de Confidentialité
          </span>
        </label>
      </div>

      {/* Button (disabled state) */}
      <div className="bg-gray-300 h-12 rounded-xl flex items-center justify-center">
        <span className="text-gray-500 font-semibold">
          Accepter et continuer
        </span>
      </div>

      <p className="text-xs text-gray-500 text-center mt-3">
        Sans acceptation, le compte ne peut pas être créé
      </p>
    </div>
  );
}

// 6. Class Selection Screen
function ClassSelectionScreen() {
  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="flex flex-col p-8 min-h-full">
        <div className="mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Choisissez votre classe
          </h1>
          <p className="text-gray-600">Sélectionnez votre niveau scolaire</p>
        </div>

        {/* Collège Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Collège
          </h3>
          <div className="space-y-2">
            <button className="w-full bg-white border-2 border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 h-14 rounded-xl flex items-center justify-between px-6 transition-all group">
              <span className="text-gray-700 font-medium group-hover:text-indigo-600">
                6ème
              </span>
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-indigo-600"></div>
            </button>
            <button className="w-full bg-white border-2 border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 h-14 rounded-xl flex items-center justify-between px-6 transition-all group">
              <span className="text-gray-700 font-medium group-hover:text-indigo-600">
                5ème
              </span>
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-indigo-600"></div>
            </button>
            <button className="w-full bg-white border-2 border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 h-14 rounded-xl flex items-center justify-between px-6 transition-all group">
              <span className="text-gray-700 font-medium group-hover:text-indigo-600">
                4ème
              </span>
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-indigo-600"></div>
            </button>
            <button className="w-full bg-indigo-100 border-2 border-indigo-600 h-14 rounded-xl flex items-center justify-between px-6">
              <span className="text-indigo-700 font-semibold">3ème</span>
              <div className="w-6 h-6 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Lycée Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Lycée
          </h3>
          <div className="space-y-2">
            <button className="w-full bg-white border-2 border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 h-14 rounded-xl flex items-center justify-between px-6 transition-all group">
              <span className="text-gray-700 font-medium group-hover:text-indigo-600">
                Seconde
              </span>
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-indigo-600"></div>
            </button>
            <button className="w-full bg-white border-2 border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 h-14 rounded-xl flex items-center justify-between px-6 transition-all group">
              <span className="text-gray-700 font-medium group-hover:text-indigo-600">
                Première
              </span>
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-indigo-600"></div>
            </button>
            <button className="w-full bg-white border-2 border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 h-14 rounded-xl flex items-center justify-between px-6 transition-all group">
              <span className="text-gray-700 font-medium group-hover:text-indigo-600">
                Terminale
              </span>
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-indigo-600"></div>
            </button>
          </div>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl flex items-center justify-center shadow-lg transition-colors mt-auto">
          <span className="text-white font-semibold">Continuer</span>
        </button>
      </div>
    </div>
  );
}

// 7. Dashboard Screen
function DashboardScreen() {
  return (
    <div className="h-full bg-gray-50 overflow-y-auto flex flex-col">
      {/* Zone 1 - En-tête personnalisé */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 pb-8">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-white text-2xl font-bold mb-1">
              👋 Bonjour Thomas
            </h1>
            <div className="bg-white/20 backdrop-blur-sm inline-block px-3 py-1.5 rounded-full">
              <span className="text-white text-sm font-medium">
                Niveau : 4ème
              </span>
            </div>
          </div>
          {/* Streak Badge */}
          <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/30">
            <p className="text-white/80 text-xs text-center uppercase mb-1">
              Série
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-white text-2xl font-bold">18</span>
            </div>
          </div>
        </div>
      </div>

      {/* Zone 3 - Actions principales */}
      <div className="px-6 mb-6 mt-4">
        <h2 className="font-semibold text-gray-800 mb-3">
          Que veux-tu faire ?
        </h2>

        <div className="space-y-3">
          {/* Bouton 1 - Continuer ma progression */}
          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-white font-bold text-lg mb-0.5">
                  Continuer ma progression
                </h3>
                <p className="text-indigo-100 text-sm">
                  Théorème de Pythagore • Exercice 5/10
                </p>
              </div>
            </div>
          </button>

          {/* Bouton 2 - Choisir un chapitre */}
          <button className="w-full bg-white border-2 border-indigo-600 rounded-2xl p-5 shadow cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:bg-indigo-50 active:scale-[0.98] transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calculator className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-indigo-600 font-bold text-lg mb-0.5">
                  Choisir un chapitre
                </h3>
                <p className="text-gray-600 text-sm">
                  Accède à tous les chapitres
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Zone 4 - Activité récente */}
      <div className="px-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Activité récente</h2>
        <div className="space-y-2">
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow">
            <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800 text-sm">
                Théorème de Pythagore
              </p>
              <p className="text-xs text-gray-500">Terminé • Il y a 2h</p>
            </div>
            <span className="text-green-600 font-semibold text-sm">+10</span>
          </div>

          <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow">
            <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800 text-sm">
                Équations 1er degré
              </p>
              <p className="text-xs text-gray-500">En cours • Il y a 1j</p>
            </div>
          </div>
        </div>
      </div>

      {/* Zone 5 - Navigation secondaire (Footer) */}
      <Footer activePage="home" />
    </div>
  );
}

// 8. Chapters Screen
function ChaptersScreen() {
  const [showExitModal, setShowExitModal] = useState(false);

  const chapters = [
    {
      id: 1,
      title: "Théorème de Pythagore",
      status: "completed",
    },
    {
      id: 2,
      title: "Équations du 1er degré",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Fonctions linéaires",
      status: "not-started",
    },
    {
      id: 4,
      title: "Géométrie dans l'espace",
      status: "not-started",
    },
    { id: 5, title: "Probabilités", status: "not-started" },
    { id: 6, title: "Statistiques", status: "not-started" },
  ];

  const handleExit = () => {
    setShowExitModal(false);
    // Navigate to dashboard
    alert("Retour à la page d'accueil");
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto relative">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6">
        <div className="flex items-center justify-between mb-2">
          {/* Exit Button */}
          <button
            onClick={() => setShowExitModal(true)}
            className="bg-white/20 backdrop-blur-sm w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-white text-2xl font-bold">Chapitres</h1>
          </div>

          {/* Spacer for alignment */}
          <div className="w-10"></div>
        </div>
        <p className="text-indigo-200 text-sm text-center">
          Sélectionnez un chapitre pour commencer
        </p>
      </div>

      {/* Chapters List */}
      <div className="p-4 space-y-3">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            className="w-full bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  chapter.status === "completed"
                    ? "bg-green-100"
                    : chapter.status === "in-progress"
                    ? "bg-indigo-100"
                    : "bg-gray-100"
                }`}
              >
                {chapter.status === "completed" ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <BookOpen
                    className={`w-6 h-6 ${
                      chapter.status === "in-progress"
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-800 mb-1">
                  Chapitre {chapter.id} : {chapter.title}
                </h3>
                {chapter.status === "completed" && (
                  <p className="text-xs text-green-600">✓ Terminé</p>
                )}
                {chapter.status === "in-progress" && (
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 h-1 rounded-full w-20 overflow-hidden">
                      <div className="bg-indigo-600 h-full w-1/2"></div>
                    </div>
                    <span className="text-xs text-indigo-600">50%</span>
                  </div>
                )}
                {chapter.status === "not-started" && (
                  <p className="text-xs text-gray-500">À faire</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Exit Modal */}
      <ExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleExit}
      />
    </div>
  );
}

// 9. Formulas Screen
function FormulasScreen() {
  const [showExitModal, setShowExitModal] = useState(false);

  const handleExit = () => {
    setShowExitModal(false);
    alert("Retour à la page d'accueil");
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto relative">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setShowExitModal(true)}
            className="bg-white/20 backdrop-blur-sm w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-white text-xl font-bold">
              Théorème de Pythagore
            </h1>
          </div>

          <div className="w-10"></div>
        </div>
        <p className="text-indigo-200 text-sm text-center">
          12 formules à réviser
        </p>
      </div>

      {/* Formula Cards */}
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="bg-indigo-50 rounded-lg p-4 mb-4">
            <p className="text-center text-2xl font-bold text-gray-800">
              a² + b² = c²
            </p>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Formule principale
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Dans un triangle rectangle, le carré de l'hypoténuse est égal à la
            somme des carrés des deux autres côtés.
          </p>
          <div className="flex gap-2">
            <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full">
              Triangle rectangle
            </span>
            <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
              Géométrie
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="bg-purple-50 rounded-lg p-4 mb-4">
            <p className="text-center text-2xl font-bold text-gray-800">
              c = √(a² + b²)
            </p>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Calcul de l'hypoténuse
          </h3>
          <p className="text-sm text-gray-600">
            Pour trouver la longueur de l'hypoténuse c, on calcule la racine
            carrée de a² + b².
          </p>
        </div>
      </div>

      <ExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleExit}
      />
    </div>
  );
}

// 10. Exercise Screen
function ExerciseScreen() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-semibold">Exercice 3/10</h2>
          <div className="bg-white/20 px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">⏱ 05:32</span>
          </div>
        </div>
        <div className="bg-white/20 h-2 rounded-full overflow-hidden">
          <div className="bg-white h-full w-1/3"></div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Question</h3>
        <div className="bg-indigo-50 rounded-xl p-6 mb-6">
          <p className="text-gray-800 mb-4">
            Dans un triangle rectangle, les côtés adjacents mesurent{" "}
            <span className="font-bold">a = 3 cm</span> et{" "}
            <span className="font-bold">b = 4 cm</span>.
          </p>
          <p className="text-gray-800 font-semibold">
            Calculez la longueur de l'hypoténuse c.
          </p>
        </div>

        {/* Answer Input */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Votre réponse
          </label>
          <div className="bg-gray-100 h-14 rounded-lg flex items-center px-4 mb-2">
            <span className="text-gray-400 text-lg">c = </span>
            <input
              type="text"
              placeholder="..."
              className="bg-transparent border-none outline-none flex-1 text-lg px-2"
            />
            <span className="text-gray-400 text-lg">cm</span>
          </div>
          <p className="text-xs text-gray-500">
            Entrez votre réponse (nombre décimal accepté)
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 space-y-3 border-t">
        <button className="w-full bg-indigo-600 h-12 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-semibold">Valider ma réponse</span>
        </button>
        <button className="w-full bg-white border-2 border-gray-300 h-12 rounded-xl flex items-center justify-center">
          <span className="text-gray-700 font-semibold">Passer</span>
        </button>
      </div>
    </div>
  );
}

// 11. Result Screen
function ResultScreen() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center">
        <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-2xl font-bold mb-2">Bonne réponse !</h1>
        <p className="text-green-100">+10 points</p>
      </div>

      {/* Correction */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">Votre réponse</span>
          </div>
          <p className="text-xl font-bold text-green-900">c = 5 cm</p>
        </div>

        <h3 className="font-semibold text-gray-800 mb-3">
          Explication détaillée
        </h3>
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              1. On applique le théorème de Pythagore :
            </p>
            <div className="bg-white rounded-lg p-3">
              <p className="text-center font-mono text-gray-800">
                c² = a² + b²
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">
              2. On remplace par les valeurs :
            </p>
            <div className="bg-white rounded-lg p-3">
              <p className="text-center font-mono text-gray-800">
                c² = 3² + 4² = 9 + 16 = 25
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">
              3. On calcule la racine carrée :
            </p>
            <div className="bg-white rounded-lg p-3">
              <p className="text-center font-mono text-gray-800">
                c = √25 = 5 cm
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 space-y-3 border-t">
        <button className="w-full bg-indigo-600 h-12 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-semibold">Exercice suivant</span>
        </button>
        <button className="w-full bg-white border-2 border-gray-300 h-12 rounded-xl flex items-center justify-center">
          <span className="text-gray-700 font-semibold">
            Retour au chapitre
          </span>
        </button>
      </div>
    </div>
  );
}

// 12. Profile Screen
function ProfileScreen() {
  return (
    <div className="h-full bg-gray-50 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 pb-12">
        <h1 className="text-white text-2xl font-bold mb-1">Mon Profil</h1>
        <p className="text-indigo-200 text-sm">
          Gérez vos informations personnelles
        </p>
      </div>

      {/* Profile Photo */}
      <div className="px-6 -mt-8 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="bg-indigo-100 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-12 h-12 text-indigo-600" />
          </div>
          <button className="text-indigo-600 text-sm font-semibold">
            Modifier la photo
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="px-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">
          Informations personnelles
        </h2>

        <div className="bg-white rounded-2xl shadow p-5 space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Nom complet
            </label>
            <div className="bg-gray-50 h-12 rounded-lg flex items-center px-4 border border-gray-200">
              <User className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="text"
                defaultValue="Thomas Martin"
                className="bg-transparent flex-1 text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Adresse email
            </label>
            <div className="bg-gray-50 h-12 rounded-lg flex items-center px-4 border border-gray-200">
              <Mail className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="email"
                defaultValue="thomas.martin@email.com"
                className="bg-transparent flex-1 text-gray-800 outline-none"
              />
            </div>
          </div>

          <button className="w-full bg-indigo-600 h-11 rounded-lg flex items-center justify-center mt-4">
            <span className="text-white font-semibold text-sm">
              Enregistrer les modifications
            </span>
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="px-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Sécurité</h2>

        <div className="bg-white rounded-2xl shadow p-5 space-y-4">
          {/* Current Password */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Mot de passe actuel
            </label>
            <div className="bg-gray-50 h-12 rounded-lg flex items-center px-4 border border-gray-200">
              <Lock className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent flex-1 text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Nouveau mot de passe
            </label>
            <div className="bg-gray-50 h-12 rounded-lg flex items-center px-4 border border-gray-200">
              <Lock className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent flex-1 text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Confirmer le mot de passe
            </label>
            <div className="bg-gray-50 h-12 rounded-lg flex items-center px-4 border border-gray-200">
              <Lock className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent flex-1 text-gray-800 outline-none"
              />
            </div>
          </div>

          <button className="w-full bg-indigo-600 h-11 rounded-lg flex items-center justify-center mt-4">
            <span className="text-white font-semibold text-sm">
              Modifier le mot de passe
            </span>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="px-6 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h3 className="font-semibold text-red-800 mb-2 text-sm">
            Zone de danger
          </h3>
          <p className="text-xs text-red-600 mb-3">
            Cette action est irréversible et supprimera définitivement votre
            compte.
          </p>
          <button className="text-red-600 text-sm font-semibold">
            Supprimer mon compte
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer activePage="profile" />
    </div>
  );
}

// 13. Progress Screen
function ProgressScreen() {
  return (
    <div className="h-full bg-gray-50 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6">
        <h1 className="text-white text-2xl font-bold mb-1">Ta Progression</h1>
        <p className="text-indigo-200 text-sm">Suis ton évolution</p>
      </div>

      {/* Carte de progression */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800">Tes points</h2>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-indigo-600 text-xl">
                320 points
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progression globale</span>
              <span className="text-sm font-semibold text-indigo-600">45%</span>
            </div>
            <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full w-[45%] rounded-full"></div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <p className="text-sm text-gray-700 text-center">
              Tu progresses bien, continue comme ça 💪
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="px-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Statistiques</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <BookOpen className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">12</p>
            <p className="text-xs text-gray-500">Chapitres complétés</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">87</p>
            <p className="text-xs text-gray-500">Exercices réussis</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <Award className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">8</p>
            <p className="text-xs text-gray-500">Badges obtenus</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <BarChart3 className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">92%</p>
            <p className="text-xs text-gray-500">Taux de réussite</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer activePage="progress" />
    </div>
  );
}

// 14. Tutor Screen
function TutorScreen() {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">Tuteur IA</h1>
            <p className="text-indigo-200 text-xs">Pose-moi tes questions !</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* AI Message */}
        <div className="flex gap-3">
          <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg">🤖</span>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-2xl rounded-tl-none shadow p-4">
              <p className="text-sm text-gray-800">
                Bonjour Thomas ! 👋 Je suis ton tuteur IA. Comment puis-je
                t'aider aujourd'hui ?
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-2">Maintenant</p>
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-3 justify-end">
          <div className="flex-1">
            <div className="bg-indigo-600 rounded-2xl rounded-tr-none shadow p-4 ml-auto max-w-[80%]">
              <p className="text-sm text-white">
                Je ne comprends pas le théorème de Pythagore
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-1 mr-2 text-right">
              Il y a 2 min
            </p>
          </div>
        </div>

        {/* AI Response */}
        <div className="flex gap-3">
          <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg">🤖</span>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-2xl rounded-tl-none shadow p-4">
              <p className="text-sm text-gray-800 mb-3">
                Pas de problème ! Le théorème de Pythagore est une formule qui
                s'applique aux triangles rectangles.
              </p>
              <div className="bg-indigo-50 rounded-lg p-3 mb-3">
                <p className="text-center font-bold text-gray-800">
                  a² + b² = c²
                </p>
              </div>
              <p className="text-sm text-gray-800">
                Où "c" est l'hypoténuse (le côté le plus long) et "a" et "b"
                sont les deux autres côtés.
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-2">Il y a 1 min</p>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="pt-4">
          <p className="text-xs text-gray-500 mb-2 px-2">Suggestions :</p>
          <div className="space-y-2">
            <button className="w-full bg-white border border-gray-200 rounded-xl p-3 text-left hover:bg-gray-50 active:scale-[0.99] transition-all">
              <p className="text-sm text-gray-700">
                💡 Donne-moi un exemple pratique
              </p>
            </button>
            <button className="w-full bg-white border border-gray-200 rounded-xl p-3 text-left hover:bg-gray-50 active:scale-[0.99] transition-all">
              <p className="text-sm text-gray-700">
                📐 Comment calculer l'hypoténuse ?
              </p>
            </button>
            <button className="w-full bg-white border border-gray-200 rounded-xl p-3 text-left hover:bg-gray-50 active:scale-[0.99] transition-all">
              <p className="text-sm text-gray-700">
                ✏️ Propose-moi un exercice
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 flex items-center">
            <input
              type="text"
              placeholder="Écris ton message..."
              className="bg-transparent flex-1 outline-none text-sm text-gray-800"
            />
          </div>
          <button className="bg-indigo-600 w-11 h-11 rounded-full flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer activePage="tutor" />
    </div>
  );
}
