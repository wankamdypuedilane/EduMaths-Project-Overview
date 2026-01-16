import { useMemo } from 'react';
import classesData from '../data/classes.json';
import chaptersData from '../data/chapters.json';
import formulasData from '../data/formulas.json';
import exercisesData from '../data/exercises.json';

export function useData() {
  const classes = useMemo(() => classesData, []);
  const chapters = useMemo(() => chaptersData, []);
  const formulas = useMemo(() => formulasData, []);
  const exercises = useMemo(() => exercisesData, []);

  const getClassById = (id: string) => {
    return classes.find(c => c.id === id);
  };

  const getChapterById = (id: string) => {
    return chapters.find(c => c.id === id);
  };

  const getChaptersByClass = (classeId: string) => {
    return chapters.filter(c => c.classeIds.includes(classeId));
  };

  const getFormulasByChapter = (chapterId: string) => {
    return formulas.filter(f => f.chapterId === chapterId);
  };

  const getExercisesByChapter = (chapterId: string) => {
    return exercises.filter(e => e.chapterId === chapterId);
  };

  const getExerciseById = (id: string) => {
    return exercises.find(e => e.id === id);
  };

  return {
    classes,
    chapters,
    formulas,
    exercises,
    getClassById,
    getChapterById,
    getChaptersByClass,
    getFormulasByChapter,
    getExercisesByChapter,
    getExerciseById,
  };
}
