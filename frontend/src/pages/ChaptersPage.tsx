import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { BookOpen, CheckCircle } from "lucide-react";
import chaptersData from "../data/chapters.json";
import { useAuth } from "../hooks/useAuth";
import { useProgress } from "../hooks/useProgress";

export function ChaptersPage() {
  const { classeId } = useParams<{ classeId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getChapterProgress } = useProgress(user?.id);

  const filteredChapters = chaptersData.filter((ch) =>
    ch.classeIds.includes(classeId || ""),
  );

  // Filtrer les chapitres disponibles pour cette classe
  const availableChapters = chaptersData.filter((chapter) =>
    chapter.classeIds.includes(classeId || ""),
  );

  // Obtenir le statut réel de progression depuis useProgress
  const getChapterStatus = (chapterId: string) => {
    const progress = getChapterProgress(chapterId);
    if (!progress || progress.completion === 0) return "not-started";
    if (progress.completion === 100) return "completed";
    return "in-progress";
  };

  return (
    <AppLayout activePage="dashboard">
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
        {availableChapters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Aucun chapitre disponible pour cette classe
            </p>
          </div>
        ) : (
          availableChapters.map((chapter, index) => {
            const status = getChapterStatus(chapter.id);
            const chapterProgress = getChapterProgress(chapter.id);
            const completion = chapterProgress?.completion || 0;
            return (
              <button
                key={chapter.id}
                onClick={() => navigate(`/chapters/${chapter.id}/formulas`)}
                className="w-full bg-white rounded-xl shadow p-5 cursor-pointer hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      status === "completed"
                        ? "bg-green-100"
                        : status === "in-progress"
                          ? "bg-indigo-100"
                          : "bg-gray-100"
                    }`}
                  >
                    {status === "completed" ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <BookOpen
                        className={`w-6 h-6 ${
                          status === "in-progress"
                            ? "text-indigo-600"
                            : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Chapitre {index + 1} : {chapter.title}
                    </h3>
                    {status === "completed" && (
                      <p className="text-xs text-green-600">✓ Terminé</p>
                    )}
                    {status === "in-progress" && (
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 h-1 rounded-full w-20 overflow-hidden">
                          <div
                            className="bg-indigo-600 h-full"
                            style={{ width: `${completion}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-indigo-600">
                          {completion}%
                        </span>
                      </div>
                    )}
                    {status === "not-started" && (
                      <p className="text-xs text-gray-500">À faire</p>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </AppLayout>
  );
}
