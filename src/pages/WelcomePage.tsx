import { useNavigate } from "react-router";
import { Calculator, BookOpen, Trophy, BarChart3 } from "lucide-react";

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
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
          <button
            onClick={() => navigate("/signup")}
            className=" cursor-pointer w-full bg-indigo-600 text-white h-14 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg"
          >
            Créer un compte
          </button>
          <button
            onClick={() => navigate("/login")}
            className=" cursor-pointer w-full bg-white border-2 border-gray-300 text-gray-700 h-14 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            J'ai déjà un compte
          </button>
        </div>
      </div>
    </div>
  );
}
