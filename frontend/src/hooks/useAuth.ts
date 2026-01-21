import { useEffect, useState } from "react";
import type {
  AuthChangeEvent,
  Session,
  User as SupabaseUser,
} from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

interface User {
  id: string;
  name: string;
  email: string;
  classeId: string;
  isFirstLogin: boolean;
  avatarUrl?: string;
}

const toUser = (
  supabaseUser?: SupabaseUser | null,
  profile?: any,
): User | null => {
  if (!supabaseUser) return null;
  const metadata = supabaseUser.user_metadata || {};

  return {
    id: supabaseUser.id,
    name: profile?.name || metadata.name || supabaseUser.email || "Utilisateur",
    email: profile?.email || supabaseUser.email || "",
    classeId: profile?.classe_id || metadata.classeId || "6eme",
    isFirstLogin: Boolean(metadata.isFirstLogin),
    avatarUrl: profile?.avatar_url,
  };
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour charger le profil en arrière-plan (non-bloquante)
  const fetchProfileInBackground = async (userId: string) => {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (profileData) {
        setUser((current) => (current ? { ...current, ...profileData } : null));
      }
    } catch (err) {
      console.warn("Background profile fetch failed:", err);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!mounted) return;

        if (error) {
          console.error("Supabase session error", error);
          setUser(null);
          setLoading(false);
          return;
        }

        if (data.session?.user) {
          // Charger l'user immédiatement, sans bloquer sur le profil
          const quickUser = toUser(data.session.user);
          setUser(quickUser);
          setLoading(false);
          // Ensuite, charger le profil en arrière-plan
          if (mounted) {
            fetchProfileInBackground(data.session.user.id);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (err) {
        console.error("initAuth error:", err);
        setUser(null);
        setLoading(false);
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          const quickUser = toUser(session.user);
          setUser(quickUser);
          setLoading(false);
          // Charger le profil en arrière-plan
          if (mounted) {
            fetchProfileInBackground(session.user.id);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      },
    );

    initAuth();

    return () => {
      mounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    console.log("useAuth.login start", { email });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      console.error("useAuth.login error", error);
      throw error;
    }

    const nextUser = toUser(data.session?.user);
    setUser(nextUser);
    console.log("useAuth.login success", { hasUser: !!nextUser });
    return nextUser;
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    console.log("Starting signup for:", email);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          classeId: "6eme",
          isFirstLogin: true,
        },
        emailRedirectTo: undefined, // Désactiver la redirection email
      },
    });

    console.log("Signup data:", data);
    console.log("Signup error:", error);

    setLoading(false);

    if (error) {
      throw error;
    }

    // Vérifier si l'utilisateur nécessite une confirmation email
    if (data.user && !data.session) {
      console.warn("Email confirmation required");
      throw new Error(
        "Veuillez vérifier votre email pour confirmer votre inscription.",
      );
    }

    // Le profil est maintenant créé automatiquement par le trigger SQL
    // Plus besoin de l'insertion manuelle qui causait l'erreur 409

    const nextUser = toUser(data.user);
    setUser(nextUser);
    console.log("Signup successful, user:", nextUser);
    return nextUser;
  };

  const logout = async () => {
    const userId = user?.id;
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("selectedClass");
    if (userId) {
      localStorage.removeItem(`userProgress_${userId}`);
      localStorage.removeItem(`userStreak_${userId}`);
    }
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return null;

    try {
      // Update auth metadata if email or name changed
      if (updates.email || updates.name) {
        const authUpdate: any = {};
        if (updates.email) authUpdate.email = updates.email;
        if (updates.name) authUpdate.data = { ...user, name: updates.name };

        await supabase.auth.updateUser(authUpdate);
      }

      // Update profiles table
      const profileUpdate: any = {};
      if (updates.name) profileUpdate.name = updates.name;
      if (updates.email) profileUpdate.email = updates.email;
      if (updates.classeId) profileUpdate.classe_id = updates.classeId;
      if (updates.avatarUrl) profileUpdate.avatar_url = updates.avatarUrl;

      if (Object.keys(profileUpdate).length > 0) {
        profileUpdate.updated_at = new Date().toISOString();
        await supabase.from("profiles").update(profileUpdate).eq("id", user.id);
      }

      // Update local state
      const updated = { ...user, ...updates };
      setUser(updated);
      return updated;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      // First verify current password by signing in
      if (!user?.email) throw new Error("User email not found");

      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (verifyError) {
        throw new Error("Current password is incorrect");
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      return true;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      // Construction de l'URL de redirection avec le protocole correct
      const redirectUrl = window.location.origin.includes("localhost")
        ? `http://localhost:${window.location.port || "5173"}/reset-password`
        : `${window.location.origin}/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) throw error;

      return true;
    } catch (error) {
      console.error("Error requesting password reset:", error);
      throw error;
    }
  };

  const resetPassword = async (newPassword: string) => {
    try {
      console.log("Starting password reset...");
      console.log("Appel direct à updateUser...");

      // S'assurer que la session de récupération est bien chargée
      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();
      if (sessionErr) {
        console.error("Session error before update:", sessionErr);
        throw new Error(
          "Erreur de session. Veuillez rouvrir le lien de réinitialisation.",
        );
      }
      if (!sessionData?.session?.user) {
        console.warn("No active session found before password update");
        throw new Error(
          "La session de réinitialisation n'est pas prête. Réessayez depuis le lien envoyé par email.",
        );
      }

      // Appel DIRECT sans vérification préalable
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      console.log("updateUser completed:", { hasData: !!data, error });

      if (error) {
        console.error("Update error:", error);
        throw error;
      }

      console.log("Password reset successful! Returning true...");
      return true;
    } catch (error: any) {
      console.error("Full error object:", error);

      // Don't log AbortError - it's expected when user navigates away
      if (
        error?.name === "AbortError" &&
        error?.message?.includes("aborted without reason")
      ) {
        // Ignorer les AbortError silencieux
        console.warn("AbortError détecté mais ignoré");
        throw new Error(
          "La session a expiré. Veuillez demander un nouveau lien.",
        );
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw error;
      }

      console.error("Error resetting password:", error);
      throw error;
    }
  };

  const deleteAccount = async () => {
    if (!user) return;

    const userId = user.id;

    // Supprimer d'abord les données utilisateur (progression et streaks)
    await supabase.from("exercise_progress").delete().eq("user_id", userId);
    await supabase.from("streaks").delete().eq("user_id", userId);

    // Ensuite supprimer le compte Supabase
    // Note: Supabase ne permet pas de supprimer son propre compte via l'API client
    // Il faut utiliser l'API admin ou faire une RPC côté serveur
    // Pour l'instant on déconnecte l'utilisateur
    await supabase.auth.signOut();

    // Nettoyer le localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("selectedClass");
    localStorage.removeItem(`userProgress_${userId}`);
    localStorage.removeItem(`userStreak_${userId}`);

    setUser(null);
  };

  return {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    updatePassword,
    requestPasswordReset,
    resetPassword,
    deleteAccount,
  };
}
