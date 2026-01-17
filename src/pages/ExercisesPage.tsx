import { useParams, useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { BookOpen } from "lucide-react";
import exercisesData from "../data/exercises.json";
import chaptersData from "../data/chapters.json";

export function ExercisesPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();

  // 1. On trouve les infos du chapitre actuel
  const chapter = chaptersData.find((c) => c.id === chapterId);

  // 2. On filtre tous les exercices qui appartiennent à ce chapitre
  const exercises = exercisesData.filter((e) => e.chapterId === chapterId);

  // 3. On les groupe par difficulté (Ta logique est bonne ici !)
  const exercisesByDifficulty = {
    facile: exercises.filter((e) => e.difficulty === "facile"),
    moyen: exercises.filter((e) => e.difficulty === "moyen"),
    difficile: exercises.filter((e) => e.difficulty === "difficile"),
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "facile":
        return "bg-green-100 text-green-700";
      case "moyen":
        return "bg-yellow-100 text-yellow-700";
      case "difficile":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <AppLayout activePage="dashboard">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {chapter?.title || "Exercices"}
            </h1>
            <p className="text-gray-600">
              Entraînez-vous avec des exercices adaptés à votre niveau
            </p>
          </div>

          {/* Bouton pour aller voir les formules du même chapitre */}
          <button
            onClick={() => navigate(`/chapters/${chapterId}/formulas`)}
            className=" cursor-pointer bg-indigo-100 text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-200 transition-all inline-flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Voir le cours
          </button>
        </div>

        {/* Liste des exercices */}
        {exercises.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg italic">
              Aucun exercice trouvé pour "{chapterId}". Vérifiez que le
              chapterId dans exercises.json correspond bien à l'ID du chapitre.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(exercisesByDifficulty).map(([difficulty, exs]) => {
              if (exs.length === 0) return null; // Ne pas afficher le titre "Difficile" s'il n'y a pas d'exos

              return (
                <div key={difficulty}>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 capitalize flex items-center gap-2">
                    Niveau {difficulty}
                    <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      {exs.length}
                    </span>
                  </h2>
                  <div className="grid gap-4">
                    {exs.map((exercise, index) => (
                      <div
                        key={exercise.id}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-indigo-200 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg text-gray-800">
                                Exercice {index + 1}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                                  difficulty,
                                )}`}
                              >
                                {difficulty.charAt(0).toUpperCase() +
                                  difficulty.slice(1)}
                              </span>
                            </div>
                            <p className="text-gray-600 line-clamp-2">
                              {exercise.question}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              navigate(`/exercises/${exercise.id}`)
                            }
                            className=" cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all ml-6"
                          >
                            Démarrer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
