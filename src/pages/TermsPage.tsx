import { useState } from "react";
import { useNavigate } from "react-router";
import { BookOpen, CheckCircle } from "lucide-react";

export function TermsPage() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      navigate("/class-selection");
    }
  };

  return (
    <div className="min-h-screen bg-white">
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

            <button className=" cursor-pointer inline-flex items-center gap-3 bg-white border-2 border-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-50 active:scale-95 transition-all shadow-md">
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
            <div
              onClick={() => setAccepted(!accepted)}
              className={` cursor-pointer w-6 h-6 border-2 rounded mt-0.5 flex items-center justify-center flex-shrink-0 transition-all ${
                accepted ? "bg-indigo-600 border-indigo-600" : "border-gray-400"
              }`}
            >
              {accepted && <CheckCircle className="w-5 h-5 text-white" />}
            </div>
            <span className="text-gray-700">
              J'ai lu et j'accepte les Conditions Générales d'Utilisation et la
              Politique de Confidentialité
            </span>
          </label>
        </div>

        {/* Button */}
        <button
          onClick={handleAccept}
          disabled={!accepted}
          className={` cursor-pointer w-full h-14 rounded-xl font-semibold transition-all ${
            accepted
              ? "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Accepter et continuer
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Sans acceptation, le compte ne peut pas être créé
        </p>
      </div>
    </div>
  );
}
