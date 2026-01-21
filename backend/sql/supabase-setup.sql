-- 1. NETTOYAGE (On repart sur des bases saines)
drop table if exists public.profiles cascade;
drop table if exists public.exercise_progress cascade;
drop table if exists public.streaks cascade;
-- Note: Pas besoin de table password_reset_tokens, Supabase Auth gère les tokens en interne

-- 2. CRÉATION DES TABLES
-- Table Profiles
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text not null,
  avatar_url text,
  classe_id text default '6eme',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table Exercise Progress
create table public.exercise_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  chapter_id text not null,
  exercise_id text not null,
  score integer not null default 0,
  attempts integer not null default 0,
  completed boolean not null default false,
  last_attempt timestamptz not null default now(),
  unique(user_id, exercise_id) -- Évite les doublons pour un même exercice
);

-- Table Streaks (Séries de jours consécutifs)
create table public.streaks (
  user_id uuid references auth.users on delete cascade primary key,
  current_streak integer not null default 0,
  last_activity_date date not null default current_date
);

-- 3. SÉCURITÉ (RLS)
alter table public.profiles enable row level security;
alter table public.exercise_progress enable row level security;
alter table public.streaks enable row level security;

-- 4. POLITIQUES (Qui a le droit de faire quoi)
-- Profils: permettre SELECT, INSERT et UPDATE sur son propre profil
create policy "Allow users to read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Allow users to insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Allow users to update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Progression: permettre SELECT, INSERT et UPDATE sur sa propre progression
create policy "Allow users to read own progress" on public.exercise_progress
  for select using (auth.uid() = user_id);

create policy "Allow users to insert own progress" on public.exercise_progress
  for insert with check (auth.uid() = user_id);

create policy "Allow users to update own progress" on public.exercise_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Streaks: permettre SELECT, INSERT et UPDATE sur sa propre série
create policy "Allow users to read own streaks" on public.streaks
  for select using (auth.uid() = user_id);

create policy "Allow users to insert own streaks" on public.streaks
  for insert with check (auth.uid() = user_id);

create policy "Allow users to update own streaks" on public.streaks
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 5. TRIGGERS (Mise à jour automatique des timestamps)
-- Fonction pour mettre à jour updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger sur la table profiles
create trigger update_profiles_updated_at
before update on public.profiles
for each row execute function update_updated_at();

-- 6. INDEXES (Optimisation des performances)
create index idx_exercise_progress_user_id on public.exercise_progress(user_id);
create index idx_exercise_progress_chapter_id on public.exercise_progress(chapter_id);
create index idx_exercise_progress_completed on public.exercise_progress(completed);

-- 7. ACCÈS PUBLIC (Nécessaire pour que React puisse parler à la DB)
-- Permissions pour les utilisateurs authentifiés
grant all on public.profiles to authenticated;
grant all on public.exercise_progress to authenticated;
grant all on public.streaks to authenticated;

-- 8. POLICIES PUBLIQUES TEMPORAIRES (DEBUG - à retirer après)
-- Permettre les accès pour les utilisateurs authentifiés et anonymes
create policy "Allow authenticated to read profiles" on public.profiles
  for select using (auth.uid() is not null);

create policy "Allow authenticated to read progress" on public.exercise_progress
  for select using (auth.uid() is not null);

create policy "Allow authenticated to read streaks" on public.streaks
  for select using (auth.uid() is not null);

-- Permissions minimales pour les utilisateurs anonymes (inscription)
grant select on public.profiles to anon;
grant insert on public.profiles to anon;
grant select on public.exercise_progress to anon;

-- 9. TRIGGER POUR CRÉATION AUTOMATIQUE DU PROFIL (Correction Erreur 409)
-- Ce trigger crée le profil automatiquement dès que le compte Auth est créé
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', 'Nouvel élève'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();