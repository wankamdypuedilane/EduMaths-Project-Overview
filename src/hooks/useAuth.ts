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
}

const toUser = (supabaseUser?: SupabaseUser | null): User | null => {
  if (!supabaseUser) return null;
  const metadata = supabaseUser.user_metadata || {};

  return {
    id: supabaseUser.id,
    name: metadata.name || supabaseUser.email || "Utilisateur",
    email: supabaseUser.email || "",
    classeId: metadata.classeId || "",
    isFirstLogin: Boolean(metadata.isFirstLogin),
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

      const activeUser = toUser(data.session?.user);

      // Si pas de session Supabase, on ne charge plus l'ancien fallback local (car l'id n'est pas un uuid et bloque Supabase)
      setUser(activeUser);
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(toUser(session?.user));
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
          classeId: "",
          isFirstLogin: true,
        },
      },
    });
    setLoading(false);

    if (error) {
      throw error;
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

    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    });

    if (error) {
      throw error;
    }

    const updated = toUser(data.user) || user;
    const merged = { ...updated, ...updates };
    setUser(merged);
    return merged;
  };

  return {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
  };
}
