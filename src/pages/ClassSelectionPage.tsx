import { useNavigate } from "react-router";
import { GraduationCap } from "lucide-react";

const classesData = [
  { id: "6eme", label: "6ème", niveau: "Collège", order: 1 },
  { id: "5eme", label: "5ème", niveau: "Collège", order: 2 },
  { id: "4eme", label: "4ème", niveau: "Collège", order: 3 },
  { id: "3eme", label: "3ème", niveau: "Collège", order: 4 },
  { id: "2nde", label: "Seconde", niveau: "Lycée", order: 5 },
  { id: "1ere", label: "Première", niveau: "Lycée", order: 6 },
  { id: "terminale", label: "Terminale", niveau: "Lycée", order: 7 },
];

export function ClassSelectionPage() {
  const navigate = useNavigate();

  const handleSelectClass = (classeId: string) => {
    // TODO: Sauvegarder la classe dans le contexte utilisateur ou Supabase
    localStorage.setItem("selectedClass", classeId);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white">
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
          {classesData.map((classe) => (
            <button
              key={classe.id}
              onClick={() => handleSelectClass(classe.id)}
              className="cursor-pointer bg-white border-2 border-gray-300 rounded-xl p-6 hover:border-indigo-600 hover:bg-indigo-50 transition-all text-center group"
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
