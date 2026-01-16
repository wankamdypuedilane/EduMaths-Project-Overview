import { useState, useEffect } from 'react';

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

export function useProgress(userId?: string) {
  const [progress, setProgress] = useState<ChapterProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger la progression depuis localStorage (temporaire)
    // TODO: Charger depuis Supabase
    const storedProgress = localStorage.getItem('userProgress');
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
    setLoading(false);
  }, [userId]);

  const updateExerciseProgress = (
    chapterId: string,
    exerciseId: string,
    score: number
  ) => {
    // TODO: Sauvegarder dans Supabase
    const newProgress = [...progress];
    let chapterProgress = newProgress.find(cp => cp.chapterId === chapterId);

    if (!chapterProgress) {
      chapterProgress = {
        chapterId,
        completion: 0,
        exercises: [],
      };
      newProgress.push(chapterProgress);
    }

    const exerciseProgress = chapterProgress.exercises.find(
      ep => ep.exerciseId === exerciseId
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
      ep => ep.completed
    ).length;
    chapterProgress.completion = Math.round(
      (completedExercises / chapterProgress.exercises.length) * 100
    );

    setProgress(newProgress);
    localStorage.setItem('userProgress', JSON.stringify(newProgress));
  };

  const getChapterProgress = (chapterId: string) => {
    return progress.find(cp => cp.chapterId === chapterId);
  };

  const getExerciseProgress = (exerciseId: string) => {
    for (const chapterProgress of progress) {
      const exerciseProgress = chapterProgress.exercises.find(
        ep => ep.exerciseId === exerciseId
      );
      if (exerciseProgress) return exerciseProgress;
    }
    return null;
  };

  const getTotalStats = () => {
    let totalExercises = 0;
    let completedExercises = 0;
    let totalScore = 0;

    progress.forEach(chapterProgress => {
      chapterProgress.exercises.forEach(exercise => {
        totalExercises++;
        if (exercise.completed) completedExercises++;
        totalScore += exercise.score;
      });
    });

    return {
      totalExercises,
      completedExercises,
      averageScore: totalExercises > 0 ? Math.round(totalScore / totalExercises) : 0,
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
  };
}
