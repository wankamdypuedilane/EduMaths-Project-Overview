import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Shield, ShieldCheck, Loader2, Search, RefreshCcw } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";
import { AppLayout } from "../../components/AppLayout";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  classe_id: string;
}

export function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessState, setAccessState] = useState<
    "checking" | "allowed" | "denied"
  >("checking");
  const [effectiveRole, setEffectiveRole] = useState<string>("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<
    "all" | "student" | "admin" | "super_admin"
  >("all");

  const canManageRoles = effectiveRole === "super_admin";

  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, name, role, classe_id")
      .order("created_at", { ascending: false });

    if (!error) {
      setProfiles((data || []) as UserProfile[]);
    } else {
      setError(error.message || "Impossible de charger les utilisateurs");
    }
    setLoading(false);
  };

  const toggleAdminRole = async (targetUserId: string, currentRole: string) => {
    if (!canManageRoles || !user) return;
    if (targetUserId === user.id) return;

    const nextRole = currentRole === "admin" ? "student" : "admin";

    const { error } = await supabase
      .from("profiles")
      .update({ role: nextRole })
      .eq("id", targetUserId);

    if (!error) {
      setProfiles((prev) =>
        prev.map((p) => (p.id === targetUserId ? { ...p, role: nextRole } : p)),
      );
    }
  };

  useEffect(() => {
    let mounted = true;

    const resolveAccess = async () => {
      if (authLoading) return;

      if (!user?.id) {
        if (mounted) {
          setAccessState("denied");
          setEffectiveRole("");
        }
        return;
      }

      if (["admin", "super_admin"].includes(user.role)) {
        if (mounted) {
          setAccessState("allowed");
          setEffectiveRole(user.role);
        }
        return;
      }

      if (mounted) {
        setAccessState("checking");
      }

      const { data, error: roleError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (!mounted) return;

      if (roleError) {
        setAccessState("denied");
        setEffectiveRole(user.role || "");
        return;
      }

      const dbRole = data?.role || user.role || "";
      setEffectiveRole(dbRole);
      setAccessState(
        ["admin", "super_admin"].includes(dbRole) ? "allowed" : "denied",
      );
    };

    resolveAccess();

    return () => {
      mounted = false;
    };
  }, [authLoading, user?.id, user?.role]);

  useEffect(() => {
    if (accessState === "allowed") {
      fetchProfiles();
    }
  }, [accessState]);

  const filteredProfiles = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = profiles.filter((profile) => {
      const matchesRole = roleFilter === "all" || profile.role === roleFilter;
      if (!matchesRole) return false;

      if (!query) return true;
      const name = (profile.name || "").toLowerCase();
      const email = (profile.email || "").toLowerCase();
      const classeId = (profile.classe_id || "").toLowerCase();
      return (
        name.includes(query) ||
        email.includes(query) ||
        classeId.includes(query)
      );
    });

    const roleWeight: Record<string, number> = {
      super_admin: 0,
      admin: 1,
      student: 2,
    };

    return result.sort((a, b) => {
      const roleDiff = (roleWeight[a.role] ?? 99) - (roleWeight[b.role] ?? 99);
      if (roleDiff !== 0) return roleDiff;
      return (a.name || "").localeCompare(b.name || "", "fr", {
        sensitivity: "base",
      });
    });
  }, [profiles, roleFilter, search]);

  if (authLoading || accessState === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (accessState === "denied") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AppLayout activePage="admin">
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Administration
          </h1>
          <p className="text-gray-600 mb-6">
            Ajout/retrait des admins, tri et recherche des utilisateurs.
          </p>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher par nom, email, classe..."
                className="w-full h-11 rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(
                  e.target.value as "all" | "student" | "admin" | "super_admin",
                )
              }
              className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tous les roles</option>
              <option value="student">Students</option>
              <option value="admin">Admins</option>
              <option value="super_admin">Super admins</option>
            </select>
          </div>

          <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
            <p>
              {filteredProfiles.length} utilisateur(s) affiche(s) • role actif:{" "}
              {effectiveRole || user?.role}
            </p>
            <button
              type="button"
              onClick={fetchProfiles}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
            >
              <RefreshCcw className="w-4 h-4" />
              Rafraichir
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-10 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              </div>
            ) : error ? (
              <div className="p-6 text-sm text-red-600 bg-red-50 border-t border-red-100">
                {error}
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                      Utilisateur
                    </th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                      Classe
                    </th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                      Role
                    </th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProfiles.map((profile) => (
                    <tr key={profile.id}>
                      <td className="p-4">
                        <div className="font-semibold text-gray-800">
                          {profile.name || "Sans nom"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {profile.email}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-700">
                        {profile.classe_id || "-"}
                      </td>
                      <td className="p-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            profile.role === "super_admin"
                              ? "bg-purple-100 text-purple-700"
                              : profile.role === "admin"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {profile.role}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {canManageRoles && profile.role !== "super_admin" ? (
                          <button
                            type="button"
                            onClick={() =>
                              toggleAdminRole(profile.id, profile.role)
                            }
                            disabled={profile.id === user?.id}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:opacity-40"
                          >
                            {profile.role === "admin" ? (
                              <Shield className="w-4 h-4" />
                            ) : (
                              <ShieldCheck className="w-4 h-4" />
                            )}
                            {profile.role === "admin"
                              ? "Retirer admin"
                              : "Nommer admin"}
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
