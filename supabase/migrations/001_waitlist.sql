-- Run this in your Supabase SQL editor once.

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'landing',
  created_at timestamptz default now()
);

create index if not exists waitlist_created_at_idx
  on waitlist (created_at);

-- We use the service-role key in the API route, so RLS isn't strictly
-- required — but enable it as a safety net so direct anon access is blocked.
alter table waitlist enable row level security;

-- No policies = no anon access. Service role bypasses RLS.
