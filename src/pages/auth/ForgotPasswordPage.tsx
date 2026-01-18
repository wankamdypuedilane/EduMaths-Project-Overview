import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email) {
        setError("Veuillez entrer votre adresse email");
        setLoading(false);
        return;
      }

      await requestPasswordReset(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Email envoyé !
          </h1>

          <p className="text-gray-600 text-center mb-6">
            Nous avons envoyé un lien de réinitialisation de mot de passe à{" "}
            <span className="font-semibold">{email}</span>
          </p>

          <p className="text-sm text-gray-500 text-center mb-8">
            Vérifiez votre boîte de réception et suivez les instructions du
            lien. Le lien expire dans 1 heure.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Retour à la connexion
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Pas reçu l'email ?{" "}
            <button
              onClick={() => setSuccess(false)}
              className="text-indigo-600 hover:underline"
            >
              Réessayer
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Mot de passe oublié ?
        </h1>
        <p className="text-gray-600 mb-8">
          Entrez votre adresse email et nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email
            </label>
            <div className="bg-gray-50 border border-gray-300 rounded-xl h-12 flex items-center px-4">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@email.com"
                className="bg-transparent flex-1 outline-none text-gray-700 focus:ring-0"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Envoi en cours..." : "Envoyer le lien"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-6">
          Pas encore inscrit ?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
