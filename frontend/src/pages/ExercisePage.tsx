import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import exercisesData from "../data/exercises.json";
import { useAuth } from "../hooks/useAuth";
import { useProgress } from "../hooks/useProgress";

export function ExercisePage() {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { updateExerciseProgress, getExerciseProgress } = useProgress(user?.id);

  const [answer, setAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [saving, setSaving] = useState(false);

  const exercise = exercisesData.find((e) => e.id === exerciseId);
  const existingProgress = exercise ? getExerciseProgress(exercise.id) : null;

  // Si non authentifié, on redirige vers la connexion
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  if (!exercise) {
    return (
      <AppLayout activePage="dashboard">
        <div className="p-8 text-center">
          <p className="text-gray-600">Exercice introuvable</p>
        </div>
      </AppLayout>
    );
  }

  const handleValidate = async () => {
    if (!exercise || !user || saving) return;
    setSaving(true);

    const userAns = answer.trim().toLowerCase();
    const correctAns = exercise.answer.toLowerCase();

    const correct = userAns === correctAns;
    setIsCorrect(correct);

    // Calculer le score : 100 si correct, 0 si incorrect
    const score = correct ? 100 : 0;

    try {
      await updateExerciseProgress(exercise.chapterId, exercise.id, score);
    } catch (err) {
      console.error("Erreur en sauvegardant la progression", err);
    }

    // On affiche la solution après avoir cliqué sur Valider
    setShowSolution(true);
    setSaving(false);
  };

  return (
    <AppLayout activePage="dashboard">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold">Exercice en cours</h2>
            <div className="bg-white/20 px-3 py-1 rounded-full">
              <span className="text-white text-sm font-medium">
                {exercise.difficulty.charAt(0).toUpperCase() +
                  exercise.difficulty.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu de la Question */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Question</h3>
          <div className="bg-indigo-50 rounded-xl p-6 mb-6">
            <p className="text-gray-800 text-lg">{exercise.question}</p>
          </div>

          {/* Answer Input */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Votre réponse
            </label>
            <div className="bg-gray-100 h-14 rounded-lg flex items-center px-4 mb-2">
              <input
                type="text"
                placeholder="..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={showSolution} // NOUVEAU : On bloque l'écriture si la solution est affichée
                className="bg-transparent border-none outline-none flex-1 text-lg px-2"
              />
              {exercise.unit && (
                <span className="text-gray-400 text-lg">{exercise.unit}</span>
              )}
            </div>
          </div>

          {/* NOUVEAU : BLOC SOLUTION (S'affiche uniquement après validation) */}
          {showSolution && (
            <div
              className={`mb-6 p-6 rounded-xl border-l-4 shadow-md transition-all ${
                isCorrect
                  ? "bg-green-50 border-green-500"
                  : "bg-red-50 border-red-500"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{isCorrect ? "🎉" : "❌"}</span>
                <h4
                  className={`font-bold text-lg ${
                    isCorrect ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {isCorrect
                    ? "Excellent !"
                    : "Oups, ce n'est pas tout à fait ça..."}
                </h4>
              </div>

              <div className="bg-white/60 p-4 rounded-lg">
                <p className="text-sm font-bold text-gray-500 uppercase mb-2">
                  Explication détaillée :
                </p>
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {exercise.solution} {/* On va chercher le texte du JSON */}
                </p>
              </div>
            </div>
          )}

          {/* Hints Section (cachée si la solution est déjà là) */}
          {!showSolution && exercise.hints && exercise.hints.length > 0 && (
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 Indices</h4>
              <ul className="space-y-1">
                {exercise.hints.map((hint, index) => (
                  <li key={index} className="text-sm text-yellow-700">
                    • {hint}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 space-y-3">
            {!showSolution ? (
              // Bouton Valider : visible au début
              <button
                onClick={handleValidate}
                disabled={!answer.trim() || saving}
                className={`w-full h-12 rounded-xl flex items-center justify-center shadow-lg transition-all ${
                  answer.trim()
                    ? " cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <span className="font-semibold">Valider ma réponse</span>
              </button>
            ) : (
              // Bouton Continuer : remplace le bouton valider après la réponse
              <button
                onClick={() => {
                  const selectedClass =
                    localStorage.getItem("selectedClass") || "6eme";
                  navigate(`/classes/${selectedClass}/chapters`);
                }}
                className=" cursor-pointer w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-gray-900 transition-all"
              >
                <span className="text-gray-700 font-semibold">
                  Continuer vers les chapitres
                </span>
              </button>
            )}

            <button
              onClick={() => navigate(-1)}
              className=" cursor-pointer w-full bg-white border-2 border-gray-300 h-12 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all"
            >
              <span className="text-gray-700 font-semibold">Retour</span>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
