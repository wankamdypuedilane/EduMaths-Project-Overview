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

alter table exercise_progress enable row level security;
alter table streaks enable row level security;

-- Idempotent policies: drop then recreate to avoid duplicate errors when re-running the script
drop policy if exists "own rows exercise_progress" on exercise_progress;
drop policy if exists "own rows streaks" on streaks;

create policy "own rows exercise_progress" on exercise_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own rows streaks" on streaks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
