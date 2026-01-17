import { useState, useEffect } from "react";

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
  lastActivityDate: string; // Format YYYY-MM-DD
}

export function useProgress(userId?: string) {
  const [progress, setProgress] = useState<ChapterProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger la progression depuis localStorage (temporaire)
    // TODO: Charger depuis Supabase
    const storedProgress = localStorage.getItem("userProgress");
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
    setLoading(false);
  }, [userId]);

  const getStreak = (): number => {
    const streakData = localStorage.getItem("userStreak");
    if (!streakData) return 0;

    const { currentStreak, lastActivityDate }: StreakData =
      JSON.parse(streakData);
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    // Si la dernière activité était aujourd'hui ou hier, on garde le streak
    if (lastActivityDate === today || lastActivityDate === yesterday) {
      return currentStreak;
    }

    // Sinon, le streak est cassé
    return 0;
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split("T")[0];
    const streakData = localStorage.getItem("userStreak");

    if (!streakData) {
      // Premier jour
      localStorage.setItem(
        "userStreak",
        JSON.stringify({
          currentStreak: 1,
          lastActivityDate: today,
        }),
      );
      return;
    }

    const { currentStreak, lastActivityDate }: StreakData =
      JSON.parse(streakData);
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    if (lastActivityDate === today) {
      // Déjà compté aujourd'hui
      return;
    } else if (lastActivityDate === yesterday) {
      // Continuation du streak
      localStorage.setItem(
        "userStreak",
        JSON.stringify({
          currentStreak: currentStreak + 1,
          lastActivityDate: today,
        }),
      );
    } else {
      // Streak cassé, recommencer à 1
      localStorage.setItem(
        "userStreak",
        JSON.stringify({
          currentStreak: 1,
          lastActivityDate: today,
        }),
      );
    }
  };

  const getRecentActivities = (): Activity[] => {
    const activities: Activity[] = [];

    // Parcourir tous les exercices complétés et créer des activités
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

    // Trier par date décroissante et prendre les 5 plus récentes
    return activities
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .slice(0, 5);
  };

  const updateExerciseProgress = (
    chapterId: string,
    exerciseId: string,
    score: number,
  ) => {
    // TODO: Sauvegarder dans Supabase
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

    if (exerciseProgress) {
      exerciseProgress.score = Math.max(exerciseProgress.score, score);
      exerciseProgress.attempts += 1;
      exerciseProgress.lastAttempt = new Date();
      exerciseProgress.completed = score >= 50;
    } else {
      chapterProgress.exercises.push({
        exerciseId,
        completed: score >= 50,
        score,
        attempts: 1,
        lastAttempt: new Date(),
      });
    }

    // Calculer le pourcentage de complétion
    const completedExercises = chapterProgress.exercises.filter(
      (ep) => ep.completed,
    ).length;
    chapterProgress.completion = Math.round(
      (completedExercises / chapterProgress.exercises.length) * 100,
    );

    setProgress(newProgress);
    localStorage.setItem("userProgress", JSON.stringify(newProgress));

    // Mettre à jour le streak
    updateStreak();
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
