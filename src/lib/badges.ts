interface Badge {
  id: string;
  label: string;
  icon: string;
  color: string;
  condition: (
    successRate: number,
    totalExercises: number,
    streak: number,
  ) => boolean;
  description: string;
}

export const BADGES: Badge[] = [
  {
    id: "master",
    label: "Master",
    icon: "🏆",
    color: "bg-yellow-100 text-yellow-600",
    condition: (successRate) => successRate >= 90,
    description: "Atteins 90% de réussite",
  },
  {
    id: "sniper",
    label: "Sniper",
    icon: "🎯",
    color: "bg-blue-100 text-blue-600",
    condition: (_successRate, _totalExercises, streak) => streak >= 7,
    description: "Maintiens une série de 7 jours",
  },
  {
    id: "major",
    label: "Major",
    icon: "🎖️",
    color: "bg-purple-100 text-purple-600",
    condition: (_successRate, totalExercises) => totalExercises >= 50,
    description: "Complète 50 exercices",
  },
  {
    id: "flash",
    label: "Flash",
    icon: "⚡",
    color: "bg-pink-100 text-pink-600",
    condition: (_successRate, totalExercises) => totalExercises >= 100,
    description: "Complète 100 exercices",
  },
  {
    id: "perfectionist",
    label: "Perfectionist",
    icon: "💎",
    color: "bg-indigo-100 text-indigo-600",
    condition: (successRate, totalExercises) =>
      successRate === 100 && totalExercises >= 20,
    description: "100% de réussite sur 20+ exercices",
  },
  {
    id: "speedrunner",
    label: "Speedrunner",
    icon: "🚀",
    color: "bg-red-100 text-red-600",
    condition: (_successRate, _totalExercises, streak) => streak >= 30,
    description: "Atteins une série de 30 jours",
  },
];

export const getUnlockedBadges = (
  successRate: number,
  totalExercises: number,
  streak: number,
): Badge[] => {
  return BADGES.filter((badge) =>
    badge.condition(successRate, totalExercises, streak),
  );
};

export const getLockPercentage = (
  badge: Badge,
  successRate: number,
  totalExercises: number,
  streak: number,
): number => {
  // Logique simple pour montrer la progression vers les badges
  if (badge.id === "master") {
    return Math.min(successRate, 100);
  }
  if (badge.id === "sniper") {
    return Math.min((streak / 7) * 100, 100);
  }
  if (badge.id === "major") {
    return Math.min((totalExercises / 50) * 100, 100);
  }
  if (badge.id === "flash") {
    return Math.min((totalExercises / 100) * 100, 100);
  }
  if (badge.id === "perfectionist") {
    return successRate === 100 ? Math.min((totalExercises / 20) * 100, 100) : 0;
  }
  if (badge.id === "speedrunner") {
    return Math.min((streak / 30) * 100, 100);
  }
  return 0;
};
