import { useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import {
  BookOpen,
  Trophy,
  Target,
  Clock,
  CheckCircle,
  Award,
  Atom,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const classesData = [
  { id: "6eme", label: "6ème", niveau: "Collège", order: 1 },
  { id: "5eme", label: "5ème", niveau: "Collège", order: 2 },
  { id: "4eme", label: "4ème", niveau: "Collège", order: 3 },
  { id: "3eme", label: "3ème", niveau: "Collège", order: 4 },
  { id: "2nde", label: "Seconde", niveau: "Lycée", order: 5 },
  { id: "1ere", label: "Première", niveau: "Lycée", order: 6 },
  { id: "terminale", label: "Terminale", niveau: "Lycée", order: 7 },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const selectedClassId = localStorage.getItem("selectedClass") || "6eme";
  const selectedClass = classesData.find((c) => c.id === selectedClassId);

  const isNew = user?.isFirstLogin;

  return (
    <AppLayout activePage="dashboard">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Bonjour, {user?.name.split(" ")[0] || "Étudiant"} ! 👋
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 italic">
                Prêt pour tes exercices de {selectedClass?.label} ?
              </p>
              <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
                Niveau {selectedClass?.label || "6ème"}
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
          <h2 className="text-xl font-bold text-gray-800 mb-4">Accès rapide</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate(`/classes/${selectedClassId}/chapters`)}
              className="cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl p-6 text-left text-white hover:shadow-lg transition-all"
            >
              <BookOpen className="w-8 h-8 mb-3" />
              <h3 className="font-semibold text-lg mb-1">Formules</h3>
              <p className="text-sm text-indigo-100">Révisez vos formules</p>
            </button>

            <button
              onClick={() => navigate(`/classes/${selectedClassId}/chapters`)}
              className="cursor-pointer bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-6 text-left text-white hover:shadow-lg transition-all"
            >
              <Atom className="w-8 h-8 mb-3" />
              <h3 className="font-semibold text-lg mb-1">Exercices</h3>
              <p className="text-sm text-green-100">
                Entraînez-vous maintenant
              </p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Activité récente
            </h2>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">
              Voir tout
            </button>
          </div>

          <div className="space-y-4">
            {/* Activité 1 : Exercice réussi */}
            <div className="flex items-center gap-4 p-4 bg-green-50/50 rounded-2xl border border-green-100/50 transition-all hover:scale-[1.01]">
              <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-green-200">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">Nombres décimaux</p>
                <p className="text-sm text-green-700 font-medium">
                  Exercice réussi • 100%
                </p>
              </div>
              <span className="text-xs font-bold text-gray-400">Il y a 2h</span>
            </div>

            {/* Activité 2 : Lecture de cours */}
            <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 transition-all hover:scale-[1.01]">
              <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-200">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">Les Fractions</p>
                <p className="text-sm text-blue-700 font-medium">
                  Fiche de révision consultée
                </p>
              </div>
              <span className="text-xs font-bold text-gray-400">Hier</span>
            </div>

            {/* Activité 3 : Badge */}
            <div className="flex items-center gap-4 p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50 transition-all hover:scale-[1.01]">
              <div className="bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-purple-200">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">
                  Badge "Mathématicien en herbe"
                </p>
                <p className="text-sm text-purple-700 font-medium">
                  Nouveau trophée débloqué !
                </p>
              </div>
              <span className="text-xs font-bold text-gray-400">Il y a 3j</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
