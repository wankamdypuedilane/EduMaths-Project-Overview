import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Trophy } from "lucide-react";
import { AppLayout } from "../components/AppLayout";
import { useAuth } from "../hooks/useAuth";

interface LeaderboardEntry {
  user_id: string;
  email: string;
  total_exercises: number;
  success_rate: number;
  current_streak: number;
  rank: number;
}

export function LeaderboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"global" | "class">("class");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      let query;

      if (tab === "class" && user?.classeId) {
        // Leaderboard par classe
        query = supabase
          .from("leaderboard_class")
          .select(
            "user_id, email, total_exercises, success_rate, current_streak",
          )
          .eq("classe_id", user.classeId)
          .order("success_rate", { ascending: false })
          .order("current_streak", { ascending: false })
          .order("total_exercises", { ascending: false })
          .limit(50);
      } else {
        // Leaderboard global
        query = supabase
          .from("leaderboard")
          .select(
            "user_id, email, total_exercises, success_rate, current_streak",
          )
          .order("success_rate", { ascending: false })
          .order("current_streak", { ascending: false })
          .order("total_exercises", { ascending: false })
          .limit(50);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Leaderboard fetch error", error);
      } else {
        const ranked = (data || []).map((entry, idx) => ({
          ...entry,
          rank: idx + 1,
        }));
        setEntries(ranked);
      }
      setLoading(false);
    };

    fetchLeaderboard();

    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, [tab, user?.classeId]);

  return (
    <AppLayout activePage="leaderboard">
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-black text-gray-800">Classement</h1>
          </div>
          <p className="text-gray-600">
            {tab === "class" && user?.classeId
              ? `Classement de la classe ${user.classeId} - Travaille dur pour devenir le premier !`
              : "Top 50 des meilleurs étudiants"}
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex gap-4">
            {user?.classeId && (
              <button
                onClick={() => setTab("class")}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  tab === "class"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                Ma Classe ({user.classeId})
              </button>
            )}
            <button
              onClick={() => setTab("global")}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                tab === "global"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Classement Global
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">Chargement du classement...</p>
              </div>
            ) : entries.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">
                  Aucune donnée disponible pour le moment
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        Rang
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        Utilisateur
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">
                        Taux de réussite
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">
                        Exercices
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">
                        Série
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {entries.map((entry) => (
                      <tr
                        key={entry.user_id}
                        className={`hover:bg-gray-50 transition-colors ${
                          user?.id === entry.user_id ? "bg-indigo-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            {entry.rank <= 3 ? (
                              <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                                  entry.rank === 1
                                    ? "bg-yellow-500"
                                    : entry.rank === 2
                                      ? "bg-gray-400"
                                      : "bg-orange-400"
                                }`}
                              >
                                {entry.rank}
                              </span>
                            ) : (
                              <span className="text-sm font-bold text-gray-500">
                                #{entry.rank}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`font-semibold ${
                              user?.id === entry.user_id
                                ? "text-indigo-600"
                                : "text-gray-800"
                            }`}
                          >
                            {entry.email.split("@")[0]}
                            {user?.id === entry.user_id && " (Toi)"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all"
                                style={{
                                  width: `${entry.success_rate}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-green-600">
                              {entry.success_rate}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm font-bold text-indigo-600">
                            {entry.total_exercises}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm font-bold text-orange-600">
                            {entry.current_streak}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
