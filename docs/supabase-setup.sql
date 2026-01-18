-- Profiles table: store user profile information
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text not null,
  avatar_url text,
  classe_id text default '6eme',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Password reset tokens
create table if not exists password_reset_tokens (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  token text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- Exercise progress table
create table if not exists exercise_progress (
  user_id uuid references auth.users not null,
  chapter_id text not null,
  exercise_id text not null,
  score integer not null default 0,
  attempts integer not null default 0,
  completed boolean not null default false,
  last_attempt timestamptz not null default now(),
  primary key (user_id, exercise_id)
);

create table if not exists streaks (
  user_id uuid references auth.users primary key,
  current_streak integer not null default 0,
  last_activity_date date not null default current_date
);

alter table profiles enable row level security;
alter table password_reset_tokens enable row level security;
alter table exercise_progress enable row level security;
alter table streaks enable row level security;

-- RLS Policies for profiles
drop policy if exists "Users can view their own profile" on profiles;
drop policy if exists "Users can update their own profile" on profiles;

create policy "Users can view their own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- RLS Policies for password_reset_tokens
drop policy if exists "Password reset tokens are accessible for token lookup" on password_reset_tokens;

create policy "Password reset tokens are accessible for token lookup" on password_reset_tokens
  for select using (true);

-- Idempotent policies: drop then recreate to avoid duplicate errors when re-running the script
drop policy if exists "own rows exercise_progress" on exercise_progress;
drop policy if exists "own rows streaks" on streaks;

create policy "own rows exercise_progress" on exercise_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own rows streaks" on streaks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
