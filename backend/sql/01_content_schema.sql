-- Master Schema for EduMaths
-- This script is idempotent (can be run multiple times safely)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLES DE BASE (Profiles, Progress, Streaks)

-- Table Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text NOT NULL,
  name text NOT NULL,
  avatar_url text,
  classe_id text DEFAULT '6eme',
  role text DEFAULT 'student',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table Exercise Progress
CREATE TABLE IF NOT EXISTS public.exercise_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  chapter_id text NOT NULL,
  exercise_id text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  attempts integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  last_attempt timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, exercise_id)
);

-- Table Streaks
CREATE TABLE IF NOT EXISTS public.streaks (
  user_id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  current_streak integer NOT NULL DEFAULT 0,
  last_activity_date date NOT NULL DEFAULT current_date
);

-- 3. TABLES DE CONTENU (Classes, Chapters, Exercises, Formulas)

CREATE TABLE IF NOT EXISTS public.classes (
  id text PRIMARY KEY,
  label text NOT NULL,
  niveau text NOT NULL,
  "order" integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.chapters (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  "order" integer NOT NULL DEFAULT 0,
  icon text,
  color text
);

CREATE TABLE IF NOT EXISTS public.chapter_classes (
  chapter_id text REFERENCES public.chapters(id) ON DELETE CASCADE,
  class_id text REFERENCES public.classes(id) ON DELETE CASCADE,
  PRIMARY KEY (chapter_id, class_id)
);

CREATE TABLE IF NOT EXISTS public.exercises (
  id text PRIMARY KEY,
  chapter_id text REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
  difficulty text NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  unit text,
  solution text,
  hints text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.formulas (
  id text PRIMARY KEY,
  chapter_id text REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  formula text NOT NULL,
  description text,
  tags text[] DEFAULT '{}',
  examples jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- 4. SÉCURITÉ (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formulas ENABLE ROW LEVEL SECURITY;

-- 5. FONCTIONS DE SÉCURITÉ (Helper functions to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. POLITIQUES D'ACCÈS (Nettoyage et Création)

DO $$
BEGIN
    -- Profiles
    DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Admins can view profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Super Admins can update all profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Super Admins full access" ON public.profiles;

    -- Progress & Streaks
    DROP POLICY IF EXISTS "Allow users to read own progress" ON public.exercise_progress;
    DROP POLICY IF EXISTS "Allow users to insert own progress" ON public.exercise_progress;
    DROP POLICY IF EXISTS "Allow users to update own progress" ON public.exercise_progress;
    DROP POLICY IF EXISTS "Allow users to read own streaks" ON public.streaks;
    DROP POLICY IF EXISTS "Allow users to insert own streaks" ON public.streaks;
    DROP POLICY IF EXISTS "Allow users to update own streaks" ON public.streaks;

    -- Content
    DROP POLICY IF EXISTS "Public read classes" ON public.classes;
    DROP POLICY IF EXISTS "Admin manage classes" ON public.classes;
    DROP POLICY IF EXISTS "Public read chapters" ON public.chapters;
    DROP POLICY IF EXISTS "Admin manage chapters" ON public.chapters;
    DROP POLICY IF EXISTS "Public read chapter_classes" ON public.chapter_classes;
    DROP POLICY IF EXISTS "Admin manage chapter_classes" ON public.chapter_classes;
    DROP POLICY IF EXISTS "Public read exercises" ON public.exercises;
    DROP POLICY IF EXISTS "Admin manage exercises" ON public.exercises;
    DROP POLICY IF EXISTS "Public read formulas" ON public.formulas;
    DROP POLICY IF EXISTS "Admin manage formulas" ON public.formulas;
END
$$;

-- Profils
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view profiles" ON public.profiles FOR SELECT USING (public.is_admin());
CREATE POLICY "Super Admins full access" ON public.profiles FOR ALL USING (public.is_super_admin());

-- Progression
CREATE POLICY "Allow users to read own progress" ON public.exercise_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert own progress" ON public.exercise_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to update own progress" ON public.exercise_progress FOR UPDATE USING (auth.uid() = user_id);

-- Streaks
CREATE POLICY "Allow users to read own streaks" ON public.streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert own streaks" ON public.streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to update own streaks" ON public.streaks FOR UPDATE USING (auth.uid() = user_id);

-- Contenu (Public en lecture, Admin/SuperAdmin en écriture)
CREATE POLICY "Public read classes" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Admin manage classes" ON public.classes USING (public.is_admin());

CREATE POLICY "Public read chapters" ON public.chapters FOR SELECT USING (true);
CREATE POLICY "Admin manage chapters" ON public.chapters USING (public.is_admin());

CREATE POLICY "Public read exercises" ON public.exercises FOR SELECT USING (true);
CREATE POLICY "Admin manage exercises" ON public.exercises USING (public.is_admin());

CREATE POLICY "Public read formulas" ON public.formulas FOR SELECT USING (true);
CREATE POLICY "Admin manage formulas" ON public.formulas USING (public.is_admin());

-- 6. TRIGGERS (Automatisation)

-- Profil automatique à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', 'Nouvel élève'), 'student');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 7. INDEXES
CREATE INDEX IF NOT EXISTS idx_exercises_chapter_id ON public.exercises(chapter_id);
CREATE INDEX IF NOT EXISTS idx_formulas_chapter_id ON public.formulas(chapter_id);
CREATE INDEX IF NOT EXISTS idx_chapters_order ON public.chapters("order");
CREATE INDEX IF NOT EXISTS idx_exercise_progress_user_id ON public.exercise_progress(user_id);
