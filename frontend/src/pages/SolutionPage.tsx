import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";

// IMPORT DES DONNÉES DEPUIS LES JSON
import exercisesData from "../data/exercises.json";

export function SolutionPage() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();

  // On récupère l'exercice dans le JSON
  const exercise = exercisesData.find((e) => e.id === exerciseId);

  // On récupère la réponse que l'utilisateur a tapée sur la page précédente
  const userAnswer = localStorage.getItem(`last_answer_${exerciseId}`) || "";

  if (!exercise) {
    return (
      <AppLayout activePage="dashboard">
        <div className="p-8 text-center">
          <p className="text-gray-600">Exercice introuvable</p>
        </div>
      </AppLayout>
    );
  }

  // Comparaison propre (minuscules et sans espaces inutiles)
  const isCorrect =
    userAnswer.trim().toLowerCase() === exercise.answer.trim().toLowerCase();

  return (
    <AppLayout activePage="dashboard">
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto">
          {/* Bannière de Résultat */}
          <div
            className={`rounded-3xl p-8 mb-8 shadow-sm border-b-4 ${
              isCorrect
                ? "bg-white border-green-500"
                : "bg-white border-red-500"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              {isCorrect ? (
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
              ) : (
                <div className="bg-red-100 p-4 rounded-full mb-4">
                  <XCircle className="w-16 h-16 text-red-600" />
                </div>
              )}

              <h2
                className={`text-3xl font-black mb-2 ${
                  isCorrect ? "text-green-700" : "text-red-700"
                }`}
              >
                {isCorrect ? "EXCELLENT !" : "OUPS... PAS TOUT À FAIT"}
              </h2>
              <p className="text-gray-600 text-lg">
                {isCorrect
                  ? "Tu as parfaitement maîtrisé cet exercice !"
                  : "Regarde l'explication ci-dessous pour comprendre ton erreur."}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Ta réponse */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Ta réponse
              </h3>
              <p
                className={`text-3xl font-bold ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {userAnswer || "?"}{" "}
                <span className="text-lg font-normal">{exercise.unit}</span>
              </p>
            </div>

            {/* La correction */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                La bonne réponse
              </h3>
              <p className="text-3xl font-bold text-indigo-600">
                {exercise.answer}{" "}
                <span className="text-lg font-normal">{exercise.unit}</span>
              </p>
            </div>
          </div>

          {/* Explication */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                i
              </span>
              Explication de la solution
            </h3>
            <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap italic">
                "{exercise.solution}"
              </p>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate(`/exercises/${exercise.id}`)}
              className=" cursor-pointer flex-1 bg-gray-100 text-gray-700 px-6 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Réessayer
            </button>

            <button
              onClick={() => {
                const currentIndex = exercisesData.findIndex(
                  (e) => e.id === exerciseId,
                );
                const nextExercise = exercisesData.find(
                  (e, index) =>
                    index > currentIndex && e.chapterId === exercise.chapterId,
                );

                if (nextExercise) {
                  navigate(`/exercises/${nextExercise.id}`);
                } else {
                  navigate(`/chapters/${exercise.chapterId}/exercises`);
                }
              }}
              className=" cursor-pointer flex-1 bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              Suivant
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
