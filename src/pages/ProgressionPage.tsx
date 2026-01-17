import { AppLayout } from "../components/AppLayout";
import { Trophy, Target, Award, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useProgress } from "../hooks/useProgress";

// ON IMPORTE LES CHAPITRES POUR QUE LA LISTE SOIT RÉELLE
import chaptersData from "../data/chapters.json";

export function ProgressionPage() {
  const { user } = useAuth();
  const { progress, getTotalStats, getChapterProgress } = useProgress(user?.id);
  const stats = getTotalStats();

  return (
    <AppLayout activePage="progression">
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-3xl font-black text-gray-800 mb-2">
            Ma Progression
          </h1>
          <p className="text-gray-600">
            {stats.completedExercises > 0
              ? `Bravo ! Tu as complété ${stats.completedExercises} exercice${stats.completedExercises > 1 ? "s" : ""}.`
              : "Commence ton aventure ! Aucun exercice complété pour l'instant."}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne de gauche : Stats et Badges */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Grid - Version condensée */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-black text-indigo-600 mb-1">
                  {stats.totalExercises}
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Exercices
                </p>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-black text-green-500 mb-1">
                  {stats.successRate}%
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Succès
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">
                Tes Trophées
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Trophy,
                    label: "Master",
                    color: "bg-yellow-100 text-yellow-600",
                  },
                  {
                    icon: Target,
                    label: "Sniper",
                    color: "bg-blue-100 text-blue-600",
                  },
                  {
                    icon: Award,
                    label: "Major",
                    color: "bg-purple-100 text-purple-600",
                  },
                  {
                    icon: Sparkles,
                    label: "Flash",
                    color: "bg-pink-100 text-pink-600",
                  },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl"
                  >
                    <div
                      className={`${badge.color} w-12 h-12 rounded-xl flex items-center justify-center mb-2`}
                    >
                      <badge.icon className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-gray-700">
                      {badge.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne de droite : Progression par chapitre (Dynamique) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-8">
                Détail par chapitre
              </h2>

              <div className="space-y-8">
                {chaptersData.map((chapter, index) => {
                  const chapterProgress = getChapterProgress(chapter.id);
                  const progress = chapterProgress?.completion || 0;
                  return (
                    <div key={chapter.id} className="group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                            {index + 1}
                          </span>
                          <span className="font-bold text-gray-700">
                            {chapter.title}
                          </span>
                        </div>
                        <span
                          className={`text-sm font-black ${
                            progress > 0 ? "text-indigo-600" : "text-gray-300"
                          }`}
                        >
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-4 p-1">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000 shadow-sm shadow-indigo-200"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
