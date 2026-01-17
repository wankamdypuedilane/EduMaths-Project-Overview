import { useParams, useNavigate } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { Atom, ArrowLeft } from "lucide-react";

// ON IMPORTE LES VRAIES DONNÉES DEPUIS LES JSON
import formulasData from "../data/formulas.json";
import chaptersData from "../data/chapters.json";

export function FormulasPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();

  // On cherche le chapitre et les formules correspondantes dans les JSON
  const chapter = chaptersData.find((c) => c.id === chapterId);
  const formulas = formulasData.filter((f) => f.chapterId === chapterId);

  const getColorClasses = (index: number) => {
    const colors = [
      { bg: "bg-indigo-50", text: "text-indigo-600" },
      { bg: "bg-purple-50", text: "text-purple-600" },
      { bg: "bg-green-50", text: "text-green-600" },
      { bg: "bg-blue-50", text: "text-blue-600" },
      { bg: "bg-pink-50", text: "text-pink-600" },
    ];
    return colors[index % colors.length];
  };

  return (
    <AppLayout activePage="dashboard">
      {/* Header avec bouton retour et dégradé */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              const selectedClass =
                localStorage.getItem("selectedClass") || "6eme";
              navigate(`/classes/${selectedClass}/chapters`);
            }}
            className=" cursor-pointer text-white/80 hover:text-white mb-4 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux chapitres
          </button>

          <h1 className="text-white text-3xl font-bold text-center mb-2">
            {chapter ? chapter.title : "Chargement..."}
          </h1>
          <p className="text-indigo-200 text-center">
            {formulas.length} {formulas.length > 1 ? "formules" : "formule"} à
            réviser
          </p>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(`/chapters/${chapterId}/exercises`)}
              className=" cursor-pointer bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <Atom className="w-5 h-5" />
              S'entraîner avec les exercices
            </button>
          </div>
        </div>
      </div>

      {/* Cartes des Formules */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {formulas.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg italic">
              Aucune formule trouvée pour ce chapitre dans formulas.json.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              ID recherché : {chapterId}
            </p>
          </div>
        ) : (
          formulas.map((formula, index) => {
            const colors = getColorClasses(index);
            return (
              <div
                key={formula.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow"
              >
                <div
                  className={`${colors.bg} rounded-2xl p-6 mb-6 border border-transparent`}
                >
                  <p
                    className={`text-center text-3xl font-mono font-bold ${colors.text}`}
                  >
                    {formula.formula}
                  </p>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {formula.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {formula.description}
                </p>

                {/* Tags/catégories */}
                {formula.tags && formula.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formula.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {formula.tags && (
                  <div className="flex flex-wrap gap-2">
                    {formula.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`${colors.bg} ${colors.text} text-xs font-bold px-3 py-1 rounded-lg`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </AppLayout>
  );
}
