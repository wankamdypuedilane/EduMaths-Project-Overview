import { supabase } from "../lib/supabaseClient";

interface ExerciseProgressRow {
  user_id: string;
  chapter_id: string;
  exercise_id: string;
  score: number;
  attempts: number;
  completed: boolean;
  last_attempt: string;
}

interface StreakRow {
  user_id: string;
  current_streak: number;
  last_activity_date: string;
}

export const exportUserDataAsJSON = async (userId: string) => {
  const { data: progressData, error: progressError } = await supabase
    .from("exercise_progress")
    .select("*")
    .eq("user_id", userId);

  const { data: streakData, error: streakError } = await supabase
    .from("streaks")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (progressError || streakError) {
    throw new Error("Failed to export user data");
  }

  const exportData = {
    exportDate: new Date().toISOString(),
    userId,
    exerciseProgress: progressData || [],
    streak: streakData || null,
  };

  const json = JSON.stringify(exportData, null, 2);
  downloadFile(json, `edumaths-data-${userId}.json`, "application/json");
};

export const exportUserDataAsCSV = async (userId: string) => {
  const { data: progressData, error: progressError } = await supabase
    .from("exercise_progress")
    .select("*")
    .eq("user_id", userId);

  if (progressError) {
    throw new Error("Failed to export user data");
  }

  if (!progressData || progressData.length === 0) {
    downloadFile("", `edumaths-progress-${userId}.csv`, "text/csv");
    return;
  }

  const headers = [
    "Chapter ID",
    "Exercise ID",
    "Score",
    "Attempts",
    "Completed",
    "Last Attempt",
  ];
  const rows = (progressData as ExerciseProgressRow[]).map((row) => [
    row.chapter_id,
    row.exercise_id,
    row.score,
    row.attempts,
    row.completed ? "Yes" : "No",
    new Date(row.last_attempt).toLocaleString(),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((cell) => (typeof cell === "string" ? `"${cell}"` : cell))
        .join(","),
    ),
  ].join("\n");

  downloadFile(csv, `edumaths-progress-${userId}.csv`, "text/csv");
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
