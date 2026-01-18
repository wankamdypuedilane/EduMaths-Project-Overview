import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator } from "lucide-react";

export function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger vers la page welcome après 2 secondes
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Calculator className="w-16 h-16 text-indigo-600" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">EduMaths</h1>
        <p className="text-xl text-indigo-100">
          Révisez vos maths avec plaisir
        </p>
        <div className="mt-8">
          <div className="animate-bounce">
            <div className="w-2 h-2 bg-white rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
