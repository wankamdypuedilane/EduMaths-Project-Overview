import {
  Mail,
  Lock,
  User,
  Calculator,
  BookOpen,
  CheckCircle,
  Trophy,
  BarChart3,
  Send,
  MapPin,
  Phone,
  Apple,
  Play,
  Home,
  TrendingUp,
  MessageSquare,
  UserCircle,
  GraduationCap,
  Atom,
  Plus,
  X,
  LogOut,
  ChevronRight,
  Award,
  Target,
  Clock,
  Brain,
  Sparkles,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

interface WebPageProps {
  pageId: string;
}

export function WebPage({ pageId }: WebPageProps) {
  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Browser Chrome */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-300 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1 mx-4">
          <span className="text-xs text-gray-500">
            edumaths.fr/{pageId === "splash" ? "" : pageId}
          </span>
        </div>
      </div>

      {/* Page Content */}
      <div className="h-[600px] overflow-y-auto">
        {pageId === "splash" && <SplashPage />}
        {pageId === "welcome" && <WelcomePage />}
        {pageId === "login" && <LoginPage />}
        {pageId === "signup" && <SignupPage />}
        {pageId === "terms" && <TermsPage />}
        {pageId === "class-selection" && <ClassSelectionPage />}
        {pageId === "dashboard" && <DashboardPage />}
        {pageId === "chapters" && <ChaptersPage />}
        {pageId === "formulas" && <FormulasPage />}
        {pageId === "exercises" && <ExercisesPage />}
        {pageId === "exercise" && <ExercisePage />}
        {pageId === "solution" && <SolutionPage />}
        {pageId === "progression" && <ProgressionPage />}
        {pageId === "tutor" && <TutorPage />}
        {pageId === "profile" && <ProfilePage />}
      </div>
    </div>
  );
}

// 1. Splash Page
function SplashPage() {
  return (
    <div className="min-h-[600px] bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Calculator className="w-16 h-16 text-indigo-600" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">EduMaths</h1>
        <p className="text-xl text-indigo-100">
          Révisez vos maths avec plaisir
        </p>
        <div className="mt-8">
          <div className="animate-bounce">
            <div className="w-2 h-2 bg-white rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Welcome Page
function WelcomePage() {
  return (
    <div className="min-h-[600px] bg-white">
      <div className="max-w-4xl mx-auto px-8 py-16 text-center">
        <div className="bg-indigo-100 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Calculator className="w-12 h-12 text-indigo-600" />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Bienvenue sur EduMaths
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          La plateforme éducative pour réviser vos formules de mathématiques et
          vous entraîner avec des exercices personnalisés de la 6<sup>e</sup> à
          la Terminale.
        </p>

        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="p-6">
            <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Formules</h3>
            <p className="text-sm text-gray-600">
              Toutes les formules essentielles à portée de main
            </p>
          </div>

          <div className="p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Exercices</h3>
            <p className="text-sm text-gray-600">
              Des exercices générés automatiquement pour progresser
            </p>
          </div>

          <div className="p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Progression</h3>
            <p className="text-sm text-gray-600">
              Suivez vos progrès en temps réel
            </p>
          </div>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <button className="w-full bg-indigo-600 text-white h-14 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg">
            Créer un compte
          </button>
          <button className="w-full bg-white border-2 border-gray-300 text-gray-700 h-14 rounded-xl font-semibold hover:bg-gray-50 transition-all">
            J'ai déjà un compte
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. Login Page
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-md mx-auto px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-indigo-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-10 h-10 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Connexion</h1>
            <p className="text-gray-600">Accédez à votre compte EduMaths</p>
          </div>

          <div className="space-y-5 mb-6">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg h-12 flex items-center px-4">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="email"
                  placeholder="exemple@email.com"
                  className="bg-transparent flex-1 outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Mot de passe
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg h-12 flex items-center px-4">
                <Lock className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-transparent flex-1 outline-none text-gray-700"
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

            <div className="text-right">
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Mot de passe oublié ?
              </button>
            </div>
          </div>

          <button className="w-full bg-indigo-600 text-white h-12 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg mb-6">
            Se connecter
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Social Login - Même style que mobile */}
          <div className="space-y-3 mb-6">
            <button className="w-full bg-white border-2 border-gray-300 h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
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
            </button>

            <button className="w-full bg-black h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-900 transition-all">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="text-white font-medium">Apple</span>
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Pas encore de compte ? </span>
            <button className="text-indigo-600 font-semibold hover:text-indigo-700">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Signup Page
function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-md mx-auto px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="bg-indigo-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Calculator className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Créer un compte
            </h1>
            <p className="text-gray-600">Rejoignez EduMaths gratuitement</p>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Nom complet
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg h-12 flex items-center px-4">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Prénom & Nom"
                  className="bg-transparent flex-1 outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg h-12 flex items-center px-4">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="email"
                  placeholder="exemple@email.com"
                  className="bg-transparent flex-1 outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Mot de passe
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg h-12 flex items-center px-4">
                <Lock className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-transparent flex-1 outline-none text-gray-700"
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

            <button className="w-full bg-indigo-600 text-white h-12 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg mt-6">
              Continuer
            </button>
          </div>

          <div className="text-center mt-6">
            <span className="text-gray-600">Déjà un compte ? </span>
            <button className="text-indigo-600 font-semibold hover:text-indigo-700">
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Terms Page
function TermsPage() {
  return (
    <div className="min-h-[600px] bg-white">
      <div className="max-w-3xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Conditions Générales
          </h1>
          <p className="text-lg text-gray-600">
            Veuillez accepter nos CGU pour continuer
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8 min-h-[300px] flex flex-col items-center justify-center">
          <div className="text-center max-w-xl">
            <p className="text-gray-600 mb-6">
              Avant de continuer, veuillez lire attentivement nos conditions
              générales d'utilisation :
            </p>

            <button className="inline-flex items-center gap-3 bg-white border-2 border-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-50 active:scale-95 transition-all shadow-md">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <span className="text-indigo-600 font-semibold text-lg">
                Conditions générales d'utilisation
              </span>
            </button>

            <p className="text-sm text-gray-500 mt-4">
              Cliquez pour consulter le document complet
            </p>
          </div>
        </div>

        {/* Checkbox */}
        <div className="bg-gray-100 p-6 rounded-xl mb-6">
          <label className="flex items-start gap-4 cursor-pointer">
            <div className="w-6 h-6 border-2 border-gray-400 rounded mt-0.5 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-indigo-600 opacity-0" />
            </div>
            <span className="text-gray-700">
              J'ai lu et j'accepte les Conditions Générales d'Utilisation et la
              Politique de Confidentialité
            </span>
          </label>
        </div>

        {/* Button (disabled state) */}
        <button className="w-full bg-gray-300 h-14 rounded-xl font-semibold text-gray-500 cursor-not-allowed">
          Accepter et continuer
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Sans acceptation, le compte ne peut pas être créé
        </p>
      </div>
    </div>
  );
}

// 6. Class Selection Page
function ClassSelectionPage() {
  const classes = [
    { id: "6eme", label: "6ème" },
    { id: "5eme", label: "5ème" },
    { id: "4eme", label: "4ème" },
    { id: "3eme", label: "3ème" },
    { id: "2nde", label: "Seconde" },
    { id: "1ere", label: "Première" },
    { id: "term", label: "Terminale" },
  ];

  return (
    <div className="min-h-[600px] bg-white">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Sélectionnez votre classe
          </h1>
          <p className="text-lg text-gray-600">
            Nous adapterons le contenu à votre niveau
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {classes.map((classe) => (
            <button
              key={classe.id}
              className="bg-white border-2 border-gray-300 rounded-xl p-6 hover:border-indigo-600 hover:bg-indigo-50 transition-all text-center group"
            >
              <span className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                {classe.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sidebar Component for authenticated pages
function Sidebar({ activePage }: { activePage: string }) {
  const menuItems = [
    { id: "dashboard", label: "Accueil", icon: Home },
    { id: "progression", label: "Progression", icon: TrendingUp },
    { id: "tutor", label: "Tuteur IA", icon: MessageSquare },
    { id: "profile", label: "Profil", icon: UserCircle },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">EduMaths</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
}

// 7. Dashboard Page
function DashboardPage() {
  return (
    <div className="flex h-[600px] bg-gray-50">
      <Sidebar activePage="dashboard" />

      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Bonjour, Marie ! 👋
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-gray-600">Prête à réviser aujourd'hui ?</p>
                <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
                  Niveau 3ème
                </span>
              </div>
            </div>
            {/* Streak Badge */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-6 py-4 rounded-xl shadow-lg">
              <p className="text-white/80 text-xs text-center uppercase mb-2">
                Série
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl">⚡</span>
                <span className="text-white text-3xl font-bold">18</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-800">24</span>
              </div>
              <p className="text-sm text-gray-600">Exercices réussis</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-800">87%</span>
              </div>
              <p className="text-sm text-gray-600">Taux de réussite</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-gray-800">2h 34m</span>
              </div>
              <p className="text-sm text-gray-600">Temps d'étude</p>
            </div>
          </div>

          {/* Quick Access */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Accès rapide
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl p-6 text-left text-white hover:shadow-lg transition-all">
                <BookOpen className="w-8 h-8 mb-3" />
                <h3 className="font-semibold text-lg mb-1">Formules</h3>
                <p className="text-sm text-indigo-100">Révisez vos formules</p>
              </button>

              <button className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-6 text-left text-white hover:shadow-lg transition-all">
                <Atom className="w-8 h-8 mb-3" />
                <h3 className="font-semibold text-lg mb-1">Exercices</h3>
                <p className="text-sm text-green-100">
                  Entraînez-vous maintenant
                </p>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Activité récente
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    Théorème de Pythagore
                  </p>
                  <p className="text-sm text-gray-600">
                    Exercice réussi - 18/20
                  </p>
                </div>
                <span className="text-sm text-gray-500">Il y a 2h</span>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    Équations du 1er degré
                  </p>
                  <p className="text-sm text-gray-600">Formule consultée</p>
                </div>
                <span className="text-sm text-gray-500">Hier</span>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    Badge "Étudiant assidu"
                  </p>
                  <p className="text-sm text-gray-600">
                    Nouveau badge débloqué
                  </p>
                </div>
                <span className="text-sm text-gray-500">Il y a 3j</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. Chapters Page
function ChaptersPage() {
  const chapters = [
    { id: 1, title: "Théorème de Pythagore", status: "completed" },
    { id: 2, title: "Équations du 1er degré", status: "in-progress" },
    { id: 3, title: "Fonctions linéaires", status: "not-started" },
    { id: 4, title: "Géométrie dans l'espace", status: "not-started" },
    { id: 5, title: "Probabilités", status: "not-started" },
    { id: 6, title: "Statistiques", status: "not-started" },
  ];

  return (
    <div className="flex h-[600px] bg-gray-50">
      <Sidebar activePage="dashboard" />

      <div className="flex-1 overflow-y-auto">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white text-3xl font-bold text-center mb-2">
              Chapitres
            </h1>
            <p className="text-indigo-200 text-center">
              Sélectionnez un chapitre pour commencer
            </p>
          </div>
        </div>

        {/* Chapters List */}
        <div className="max-w-4xl mx-auto p-6 space-y-3">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              className="w-full bg-white rounded-xl shadow p-5 cursor-pointer hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
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
      </div>
    </div>
  );
}

// 9. Formulas Page
function FormulasPage() {
  return (
    <div className="flex h-[600px] bg-gray-50">
      <Sidebar activePage="dashboard" />

      <div className="flex-1 overflow-y-auto">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white text-3xl font-bold text-center mb-2">
              Théorème de Pythagore
            </h1>
            <p className="text-indigo-200 text-center">12 formules à réviser</p>
          </div>
        </div>

        {/* Formula Cards */}
        <div className="max-w-4xl mx-auto p-6 space-y-4">
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

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <p className="text-center text-2xl font-bold text-gray-800">
                a = √(c² - b²)
              </p>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Calcul d'un côté adjacent
            </h3>
            <p className="text-sm text-gray-600">
              Pour trouver la longueur d'un côté adjacent a, on calcule la
              racine carrée de c² - b².
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 10. Exercises Page
function ExercisesPage() {
  const exercises = [
    {
      id: 1,
      title: "Théorème de Pythagore",
      difficulty: "Facile",
      questions: 10,
    },
    {
      id: 2,
      title: "Équations du 1er degré",
      difficulty: "Moyen",
      questions: 15,
    },
    {
      id: 3,
      title: "Fonctions linéaires",
      difficulty: "Difficile",
      questions: 12,
    },
  ];

  return (
    <div className="flex h-[600px] bg-gray-50">
      <Sidebar activePage="dashboard" />

      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Exercices</h1>
            <p className="text-gray-600">
              Entraînez-vous avec des exercices adaptés à votre niveau
            </p>
          </div>

          {/* Filter */}
          <div className="flex gap-4 mb-6">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold">
              Tous
            </button>
            <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-100">
              Facile
            </button>
            <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-100">
              Moyen
            </button>
            <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-100">
              Difficile
            </button>
          </div>

          {/* Exercises List */}
          <div className="space-y-4">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {exercise.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          exercise.difficulty === "Facile"
                            ? "bg-green-100 text-green-700"
                            : exercise.difficulty === "Moyen"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {exercise.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {exercise.questions} questions
                    </p>
                  </div>
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all">
                    Commencer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 11. Exercise Page
function ExercisePage() {
  return (
    <div className="flex h-[600px] bg-white">
      <Sidebar activePage="dashboard" />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <div className="max-w-4xl mx-auto">
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
        </div>

        {/* Question */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Question
            </h3>
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
        </div>

        {/* Actions */}
        <div className="p-6 space-y-3 border-t max-w-4xl mx-auto w-full">
          <button className="w-full bg-indigo-600 h-12 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-semibold">Valider ma réponse</span>
          </button>
          <button className="w-full bg-white border-2 border-gray-300 h-12 rounded-xl flex items-center justify-center">
            <span className="text-gray-700 font-semibold">Passer</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// 12. Solution Page
function SolutionPage() {
  const exercise = {
    id: 1,
    title: "Théorème de Pythagore",
    difficulty: "Facile",
    questions: 10,
    currentQuestion: 1,
    questionText:
      "Dans un triangle rectangle, si les côtés adjacents mesurent 3 cm et 4 cm, quelle est la longueur de l'hypoténuse ?",
    answer: "5",
    userAnswer: "5",
    isCorrect: true,
  };

  return (
    <div className="flex h-[600px] bg-gray-50">
      <Sidebar activePage="dashboard" />

      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Solution</h1>
            <p className="text-gray-600">Vérifiez votre réponse</p>
          </div>

          {/* Exercise Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {exercise.title}
            </h2>
            <p className="text-sm text-gray-600">
              Difficulté : {exercise.difficulty}
            </p>
            <p className="text-sm text-gray-600">
              Question {exercise.currentQuestion} sur {exercise.questions}
            </p>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <p className="text-lg text-gray-800">{exercise.questionText}</p>
          </div>

          {/* Answer and Feedback */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-lg text-gray-800">
                Votre réponse : {exercise.userAnswer}
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Réponse correcte : {exercise.answer}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Explication : Le théorème de Pythagore stipule que dans un
              triangle rectangle, la somme des carrés des côtés adjacents est
              égale au carré de l'hypoténuse. Ici, 3² + 4² = 9 + 16 = 25, donc
              l'hypoténuse est √25 = 5 cm.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-all">
              Précédent
            </button>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 13. Progression Page
function ProgressionPage() {
  return (
    <div className="flex h-[600px] bg-gray-50">
      <Sidebar activePage="progression" />

      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Ma Progression
            </h1>
            <p className="text-gray-600">
              Suivez vos performances et vos progrès
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">24</div>
              <p className="text-sm text-gray-600">Exercices réussis</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
              <p className="text-sm text-gray-600">Taux de réussite</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                2h 34m
              </div>
              <p className="text-sm text-gray-600">Temps d'étude</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
              <p className="text-sm text-gray-600">Badges</p>
            </div>
          </div>

          {/* Progress by Chapter */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Progression par chapitre
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">
                    Théorème de Pythagore
                  </span>
                  <span className="text-sm font-semibold text-indigo-600">
                    92%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">
                    Équations du 1er degré
                  </span>
                  <span className="text-sm font-semibold text-indigo-600">
                    78%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">
                    Fonctions linéaires
                  </span>
                  <span className="text-sm font-semibold text-indigo-600">
                    65%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">
                    Aires et périmètres
                  </span>
                  <span className="text-sm font-semibold text-indigo-600">
                    85%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Badges débloqués
            </h2>
            <div className="grid grid-cols-4 gap-6">
              {[
                {
                  icon: Trophy,
                  label: "Expert",
                  color: "bg-yellow-100 text-yellow-600",
                },
                {
                  icon: Target,
                  label: "Précision",
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  icon: Award,
                  label: "Assidu",
                  color: "bg-purple-100 text-purple-600",
                },
                {
                  icon: Sparkles,
                  label: "Découvreur",
                  color: "bg-pink-100 text-pink-600",
                },
              ].map((badge, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`${badge.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-2`}
                  >
                    <badge.icon className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 14. Tutor Page
function TutorPage() {
  return (
    <div className="flex h-[600px] bg-gray-50">
      <Sidebar activePage="tutor" />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Tuteur IA</h1>
              <p className="text-sm text-gray-600">
                Posez vos questions, je suis là pour vous aider
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* AI Message */}
          <div className="flex gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🤖</span>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-lg">
              <p className="text-gray-800">
                Bonjour ! 👋 Je suis votre tuteur IA en mathématiques. Comment
                puis-je vous aider aujourd'hui ?
              </p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-3 justify-end">
            <div className="bg-indigo-600 rounded-2xl rounded-tr-none p-4 shadow-sm max-w-lg">
              <p className="text-white">
                Comment résoudre le théorème de Pythagore ?
              </p>
            </div>
            <div className="bg-gray-300 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          {/* AI Message */}
          <div className="flex gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🤖</span>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-lg">
              <p className="text-gray-800 mb-3">
                Excellente question ! Le théorème de Pythagore s'applique aux
                triangles rectangles. Voici la formule :
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-3 text-center">
                <span className="text-xl font-semibold text-gray-800">
                  a² + b² = c²
                </span>
              </div>
              <p className="text-gray-800">
                Où <strong>c</strong> est l'hypoténuse (le côté le plus long) et{" "}
                <strong>a</strong> et <strong>b</strong> sont les deux autres
                côtés.
              </p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Posez votre question..."
              className="flex-1 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 15. Profile Page
function ProfilePage() {
  return (
    <div className="flex h-[600px] bg-gray-50">
      <Sidebar activePage="profile" />

      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Mon Profil
            </h1>
            <p className="text-gray-600">
              Gérez vos informations personnelles et paramètres
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="bg-indigo-100 w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-indigo-600">
                MJ
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  Marie Jeanne
                </h2>
                <p className="text-gray-600 mb-3">marie.jeanne@email.com</p>
                <button className="text-indigo-600 font-semibold hover:text-indigo-700">
                  Modifier la photo
                </button>
              </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Nom complet
                </label>
                <input
                  type="text"
                  defaultValue="Marie Jeanne"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="marie.jeanne@email.com"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full bg-indigo-600 text-white h-12 rounded-xl font-semibold hover:bg-indigo-700 transition-all mb-6">
            Enregistrer les modifications
          </button>

          {/* Settings */}
          <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Paramètres</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Notifications</p>
                  <p className="text-sm text-gray-600">
                    Recevoir des rappels quotidiens
                  </p>
                </div>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Mode sombre</p>
                  <p className="text-sm text-gray-600">
                    Activer le thème sombre
                  </p>
                </div>
                <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Account Button */}
          <button className="w-full bg-white border-2 border-red-600 text-red-600 h-12 rounded-xl font-semibold hover:bg-red-50 transition-all">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
}
