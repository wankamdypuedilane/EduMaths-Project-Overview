import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  classeId: string;
  isFirstLogin: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si un utilisateur est connecté (localStorage pour l'instant)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Implémenter avec Supabase
    const mockUser: User = {
      id: "1",
      name: "Marie Jeanne",
      email,
      classeId: "3eme",
      isFirstLogin: false,
    };
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const signup = async (name: string, email: string, password: string) => {
    // TODO: Implémenter avec Supabase
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      classeId: "",
      isFirstLogin: true, // IMPORTANT : Tout sera à zéro pour lui
    };
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("selectedClass");
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
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
