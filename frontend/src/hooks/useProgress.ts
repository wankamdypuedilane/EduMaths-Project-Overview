import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttempt: Date;
}

interface ChapterProgress {
  chapterId: string;
  completion: number;
  exercises: ExerciseProgress[];
}

interface Activity {
  id: string;
  type: "exercise" | "chapter" | "badge";
  title: string;
  description: string;
  timestamp: Date;
  score?: number;
}

interface StreakData {
  currentStreak: number;
  lastActivityDate: string; // YYYY-MM-DD
}

interface ExerciseProgressRow {
  user_id: string;
  chapter_id: string;
  exercise_id: string;
  score: number;
  attempts: number;
  completed: boolean;
  last_attempt: string;
}

const toDate = (value: string | Date): Date =>
  value instanceof Date ? value : new Date(value);

const computeStreak = (existing?: StreakData | null): StreakData => {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (!existing) {
    return { currentStreak: 1, lastActivityDate: today };
  }

  if (existing.lastActivityDate === today) {
    return existing;
  }

  if (existing.lastActivityDate === yesterday) {
    return {
      currentStreak: existing.currentStreak + 1,
      lastActivityDate: today,
    };
  }

  return { currentStreak: 1, lastActivityDate: today };
};

export function useProgress(userId?: string) {
  const [progress, setProgress] = useState<ChapterProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState<StreakData | null>(null);

  useEffect(() => {
    if (!userId) {
      setProgress([]);
      setLoading(false);
      return;
    }

    let active = true;

    const fetchProgress = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("exercise_progress")
        .select(
          "user_id, chapter_id, exercise_id, score, attempts, completed, last_attempt",
        )
        .eq("user_id", userId);

      if (!active) return;

      if (error) {
        console.error("Supabase progress fetch error", error);
        setLoading(false);
        return;
      }

      const map = new Map<string, ChapterProgress>();

      (data || []).forEach((row: ExerciseProgressRow) => {
        const existingChapter = map.get(row.chapter_id) || {
          chapterId: row.chapter_id,
          completion: 0,
          exercises: [],
        };

        const exercises = [
          ...existingChapter.exercises,
          {
            exerciseId: row.exercise_id,
            completed: row.completed,
            score: row.score,
            attempts: row.attempts,
            lastAttempt: toDate(row.last_attempt),
          },
        ];

        const completedCount = exercises.filter((ep) => ep.completed).length;
        const completion = Math.round(
          (completedCount / exercises.length) * 100,
        );

        map.set(row.chapter_id, {
          ...existingChapter,
          exercises,
          completion,
        });
      });

      setProgress(Array.from(map.values()));
      setLoading(false);
    };

    const fetchStreak = async () => {
      const { data, error } = await supabase
        .from("streaks")
        .select("user_id, current_streak, last_activity_date")
        .eq("user_id", userId)
        .maybeSingle();

      if (!active) return;

      if (error && error.code !== "PGRST116") {
        console.error("Supabase streak fetch error", error);
        return;
      }

      if (data) {
        setStreak({
          currentStreak: data.current_streak,
          lastActivityDate: data.last_activity_date,
        });
      }
    };

    fetchProgress();
    fetchStreak();

    return () => {
      active = false;
    };
  }, [userId]);

  const persistStreak = async () => {
    if (!userId) return;
    const next = computeStreak(streak);
    setStreak(next);
    const { error } = await supabase.from("streaks").upsert({
      user_id: userId,
      current_streak: next.currentStreak,
      last_activity_date: next.lastActivityDate,
    });
    if (error) {
      console.error("Supabase streak upsert error", error);
    }
  };

  const updateExerciseProgress = async (
    chapterId: string,
    exerciseId: string,
    score: number,
  ) => {
    if (!userId) return;

    const newProgress = [...progress];
    let chapterProgress = newProgress.find((cp) => cp.chapterId === chapterId);

    if (!chapterProgress) {
      chapterProgress = {
        chapterId,
        completion: 0,
        exercises: [],
      };
      newProgress.push(chapterProgress);
    }

    const exerciseProgress = chapterProgress.exercises.find(
      (ep) => ep.exerciseId === exerciseId,
    );

    const now = new Date();
    const attempts = exerciseProgress ? exerciseProgress.attempts + 1 : 1;
    const bestScore = exerciseProgress
      ? Math.max(exerciseProgress.score, score)
      : score;
    const completed = bestScore >= 50;

    if (exerciseProgress) {
      exerciseProgress.score = bestScore;
      exerciseProgress.attempts = attempts;
      exerciseProgress.lastAttempt = now;
      exerciseProgress.completed = completed;
    } else {
      chapterProgress.exercises.push({
        exerciseId,
        completed,
        score: bestScore,
        attempts,
        lastAttempt: now,
      });
    }

    const completedExercises = chapterProgress.exercises.filter(
      (ep) => ep.completed,
    ).length;
    chapterProgress.completion = Math.round(
      (completedExercises / chapterProgress.exercises.length) * 100,
    );

    setProgress(newProgress);

    const { error } = await supabase.from("exercise_progress").upsert({
      user_id: userId,
      chapter_id: chapterId,
      exercise_id: exerciseId,
      score: bestScore,
      attempts,
      completed,
      last_attempt: now.toISOString(),
    });

    if (error) {
      console.error("Supabase progress upsert error", error);
    } else {
      await persistStreak();
    }
  };

  const getStreak = (): number => streak?.currentStreak || 0;

  const getRecentActivities = (): Activity[] => {
    const activities: Activity[] = [];

    progress.forEach((chapterProgress) => {
      chapterProgress.exercises.forEach((exercise) => {
        if (exercise.completed) {
          activities.push({
            id: `${chapterProgress.chapterId}-${exercise.exerciseId}`,
            type: "exercise",
            title: chapterProgress.chapterId
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" "),
            description: `Exercice réussi • ${exercise.score}%`,
            timestamp: new Date(exercise.lastAttempt),
            score: exercise.score,
          });
        }
      });
    });

    return activities
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .slice(0, 5);
  };

  const getChapterProgress = (chapterId: string) => {
    return progress.find((cp) => cp.chapterId === chapterId);
  };

  const getExerciseProgress = (exerciseId: string) => {
    for (const chapterProgress of progress) {
      const exerciseProgress = chapterProgress.exercises.find(
        (ep) => ep.exerciseId === exerciseId,
      );
      if (exerciseProgress) return exerciseProgress;
    }
    return null;
  };

  const getTotalStats = () => {
    let totalExercises = 0;
    let completedExercises = 0;
    let totalScore = 0;

    progress.forEach((chapterProgress) => {
      chapterProgress.exercises.forEach((exercise) => {
        totalExercises++;
        if (exercise.completed) completedExercises++;
        totalScore += exercise.score;
      });
    });

    return {
      totalExercises,
      completedExercises,
      averageScore:
        totalExercises > 0 ? Math.round(totalScore / totalExercises) : 0,
      successRate:
        totalExercises > 0
          ? Math.round((completedExercises / totalExercises) * 100)
          : 0,
    };
  };

  return {
    progress,
    loading,
    updateExerciseProgress,
    getChapterProgress,
    getExerciseProgress,
    getTotalStats,
    getStreak,
    getRecentActivities,
  };
}
