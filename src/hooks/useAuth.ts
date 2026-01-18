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

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;

      if (error) {
        console.error("Supabase session error", error);
        setLoading(false);
        return;
      }

      if (data.session?.user) {
        // Fetch user profile from profiles table
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single();

        const activeUser = toUser(data.session?.user, profileData);
        setUser(activeUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          setUser(toUser(session?.user, profileData));
        } else {
          setUser(null);
        }
      },
    );

    loadSession();

    return () => {
      mounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      throw error;
    }

    const nextUser = toUser(data.session?.user);
    setUser(nextUser);
    return nextUser;
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          classeId: "6eme",
          isFirstLogin: true,
        },
      },
    });
    setLoading(false);

    if (error) {
      throw error;
    }

    // Create profile entry in profiles table
    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        name,
        classe_id: "6eme",
      });
    }

    const nextUser = toUser(data.user);
    setUser(nextUser);
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
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
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
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      return true;
    } catch (error) {
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
