import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabaseClient";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  // Vérifier et charger le token depuis l'URL
  useEffect(() => {
    const initSession = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      console.log("Current URL:", window.location.href);
      console.log("Access token present:", !!accessToken);

      if (!accessToken) {
        setError(
          "Lien invalide ou expiré. Veuillez demander un nouveau lien de réinitialisation.",
        );
        return;
      }

      // Forcer Supabase à charger la session depuis l'URL
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        console.log("Session loaded:", { data, sessionError });

        if (sessionError) {
          console.error("Session error:", sessionError);
          setError("Erreur de session. Veuillez réessayer.");
          return;
        }

        // Si aucune session active, tenter un setSession explicite avec les tokens de l'URL
        if (!data.session && accessToken && refreshToken) {
          console.warn(
            "No active session. Trying setSession with URL tokens...",
          );
          const { data: setData, error: setErr } =
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
          if (setErr) {
            console.error("setSession error:", setErr);
            setError("Impossible d'initialiser la session de récupération.");
            return;
          }
          console.log("setSession result:", { hasSession: !!setData.session });
        }

        // S'abonner aux changements d'état pour confirmer quand la session est prête
        const { data: sub } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log("Auth event:", event, { hasSession: !!session });
            if (event === "SIGNED_IN" || event === "PASSWORD_RECOVERY") {
              setSessionReady(true);
              // Nettoyer le hash pour éviter de retraiter les tokens
              if (window.location.hash) {
                history.replaceState(
                  null,
                  "",
                  window.location.pathname + window.location.search,
                );
              }
            }

            // Filet de sécurité: si Supabase signale USER_UPDATED, on considère le reset comme réussi
            if (event === "USER_UPDATED") {
              console.log("Auth event USER_UPDATED => mark success");
              setSuccess(true);
              setLoading(false);
            }
          },
        );

        // Si la session est déjà présente, on est prêt
        if ((await supabase.auth.getSession()).data.session) {
          console.log("Session is ready");
          setSessionReady(true);
        }

        // Nettoyage à la sortie
        return () => {
          sub.subscription.unsubscribe();
        };
      } catch (err) {
        console.error("Error loading session:", err);
        setError("Erreur lors du chargement de la session.");
      }
    };

    initSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Vérifier que la session est prête
    if (!sessionReady) {
      setError("Veuillez attendre le chargement de la session...");
      return;
    }

    // Validation
    if (!newPassword || !confirmPassword) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (newPassword.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caractères");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    console.log("Form submitted, attempting password reset...");

    try {
      const result = await resetPassword(newPassword);
      console.log("resetPassword returned:", result);
      console.log(
        "Password reset completed successfully, setting success=true",
      );
      setSuccess(true);
      console.log("Success state updated to true");
      // Sécurité: forcer une déconnexion pour exiger une reconnexion propre
      try {
        await supabase.auth.signOut();
        console.log("Signed out after successful password reset");
      } catch (signOutErr) {
        console.warn("Sign out failed:", signOutErr);
      }
    } catch (err: any) {
      console.error("Password reset error:", err);

      // Ignore AbortError - happens when user navigates away
      if (err?.name === "AbortError") {
        setLoading(false);
        return;
      }

      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
      console.log("Loading state set to false");
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
            Mot de passe réinitialisé !
          </h1>

          <p className="text-gray-600 text-center mb-8">
            Votre mot de passe a été changé avec succès. Vous pouvez maintenant
            vous connecter avec votre nouveau mot de passe.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Aller à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Réinitialiser le mot de passe
        </h1>
        <p className="text-gray-600 mb-8">
          Entrez votre nouveau mot de passe ci-dessous.
        </p>

        {/* Session readiness indicator */}
        {!sessionReady && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg text-sm mb-4">
            Chargement de la session de récupération...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nouveau mot de passe
            </label>
            <div className="bg-gray-50 border border-gray-300 rounded-xl h-12 flex items-center px-4">
              <Lock className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 caractères"
                className="bg-transparent flex-1 outline-none text-gray-700 focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmer le mot de passe
            </label>
            <div className="bg-gray-50 border border-gray-300 rounded-xl h-12 flex items-center px-4">
              <Lock className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmer le mot de passe"
                className="bg-transparent flex-1 outline-none text-gray-700 focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
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
            disabled={loading || !sessionReady}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Traitement..."
              : !sessionReady
                ? "Chargement de la session..."
                : "Réinitialiser le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
}
