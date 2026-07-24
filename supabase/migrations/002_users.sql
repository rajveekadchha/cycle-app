-- Users table — stores profile data written during onboarding.
-- Accessed by the browser client (anon key) via the Data API, so we need
-- explicit RLS policies and a GRANT for the authenticated role.

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  last_period_date date,
  cycle_length integer default 28,
  address text,
  onboarded boolean default false,
  created_at timestamptz default now()
);

-- Explicit grant required after Supabase's May/Oct 2025 Data API change.
grant select, insert, update on public.users to authenticated;

alter table users enable row level security;

-- Each user can only read and write their own row.
create policy "users: select own row"
  on users for select
  to authenticated
  using (id = auth.uid());

create policy "users: insert own row"
  on users for insert
  to authenticated
  with check (id = auth.uid());

create policy "users: update own row"
  on users for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());
